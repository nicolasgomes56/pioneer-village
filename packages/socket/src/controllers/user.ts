import type { PrismaClient } from "@prisma/client";
import { sign } from "jsonwebtoken";
import { logGreen, logInfoC, logInfoS } from "../helpers/log";
import Accounts from "../managers/accounts";
import { serverNamespace, userNamespace } from "../server";

export default (prisma: PrismaClient, userAccessKey: string) => {
	Accounts.setDB(prisma);

	serverNamespace.on("connection", (socket) => {
		logGreen("[User] Game server connected");

		socket.on("connectedPlayers", (players) => {});

		socket.on("getAccount", async (_identifiers, cb) => {
			const account = await Accounts.getOrCreate(_identifiers);
			cb(account);
		});

		socket.on("generateJWT", async (serverId, _identifiers, cb) => {
			// do a db query using identifiers.
			const account = await Accounts.getOrCreate(_identifiers);
			logInfoS("account", account);
			const token = sign(
				{
					serverId,
					userId: account.id,
				},
				userAccessKey,
				{ expiresIn: "1 day" },
			);

			logInfoS("token", token);

			cb(token);
		});
	});

	userNamespace.on("connection", (socket) => {
		logInfoC("user connected", socket.data);
	});
};
