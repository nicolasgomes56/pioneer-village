import type { PrismaClient } from "@prisma/client";
import { userNamespace } from "../server";

export default (prisma: PrismaClient) => {
	userNamespace.on("connection", (socket) => {
		socket.on("chatSend", (chatMessage) => {
			userNamespace.emit("chatMessage", {
				...chatMessage,
				sender: "Placeholder Name",
				id: socket.data.user.serverId,
			});
		});
	});

	// setInterval(() => {
	//   userNamespace.emit('chatMessage', {
	//     channel: 'general',
	//     sender: 'Server',
	//     text: `Hello world! ${Math.random()}`,
	//     id: 0,
	//   });
	// }, 1000);
};
