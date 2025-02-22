import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";
import CharacterController from "./controllers/characters";
import ChatController from "./controllers/chat";
import DoorController from "./controllers/doors";
import InventoryController from "./controllers/inventory";
import StableController from "./controllers/stables";
import UserController from "./controllers/user";
import WorldController from "./controllers/world";
import { seedDB } from "./seed";
import server, { userAccessKey } from "./server";

config({ path: `${__dirname}/../../.env` });

// Refactored hash function as a standalone utility rather than extending String.prototype.
export const getHashKey = (input: string): number => {
	const keyLowered: string = input.toLowerCase();
	let hash = 0;
	const length: number = input.length;

	for (hash = i = 0; i < length; i++) {
		hash += keyLowered.charCodeAt(i);
		hash += hash << 10;
		hash ^= hash >>> 6;
	}

	hash += hash << 3;
	hash ^= hash >>> 11;
	hash += hash << 15;

	return hash;
};

const { DATABASE_URL, SOCKET_PORT } = process.env;

const prisma = new PrismaClient();

seedDB(prisma);

UserController(prisma, userAccessKey);
CharacterController(prisma, userAccessKey);
ChatController(prisma);
DoorController(prisma);
InventoryController(prisma);
StableController(prisma);
WorldController(prisma);

server.listen(Number(SOCKET_PORT), () => {
	const serverAddress = server.address();
	if (typeof serverAddress === "string") {
		console.log(`Server listening on ${serverAddress}`);
	} else if (serverAddress) {
		console.log(
			`Server listening on ${serverAddress.address}:${serverAddress.port}`,
		);
	} else {
		console.log("Server listening");
	}
});
