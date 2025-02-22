import type { PrismaClient } from "@prisma/client";

import { logInfoC } from "../helpers/log";
import { serverNamespace, userNamespace } from "../server";

import Inventories from "../managers/inventories";

// TODO: Ability to re-key doors via a version number or something.

export default (prisma: PrismaClient) => {
	const DoorState = new Map<number, number>();

	prisma.door.findMany().then((doors) => {
		// logInfo('[doors]', doors);

		for (const door of doors) {
			DoorState.set(door.hash << 0, door.state);
			// logInfo('[Door State]', door.hash, door.hash >>> 0, door.state);
		}
	});

	serverNamespace.on("connection", (socket) => {
		//
	});

	userNamespace.on("connection", (socket) => {
		socket.on("doors.get-door-states", (cb) => {
			cb(Array.from(DoorState.entries()));
		});

		socket.on("doors.set-door-state", async (doorHash, state) => {
			logInfoC("doors.set-door-state", doorHash, state);
			if (state < -1 || state > 4) {
				return;
			}
			const currentDoorState = DoorState.get(doorHash);
			if (currentDoorState === state) {
				return;
			}

			if (currentDoorState === undefined) {
				await prisma.door.create({
					data: {
						hash: doorHash << 0,
						state,
					},
				});
			}

			const inventoryIdentifier = `character:${socket.data?.character?.id || 0}`;
			const hasKey = await Inventories.hasDoorKey(
				inventoryIdentifier,
				doorHash,
			);
			if (hasKey || currentDoorState === undefined) {
				DoorState.set(doorHash << 0, state);
				userNamespace.emit(
					"__client__",
					"doors.set-door-state",
					doorHash,
					state,
				);
				// TODO: Update DB
			} else {
				userNamespace.emit(
					"__client__",
					"doors.set-door-state",
					doorHash,
					currentDoorState,
				);
			}
		});
	});
};
