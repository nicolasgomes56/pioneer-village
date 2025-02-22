import { emitClient } from "@lib/ui";
import type { Socket } from "socket.io-client";

export default (
	socket: Socket<
		UISocketEvents,
		SocketServer.Client & SocketServer.ClientEvents
	>,
) => {
	socket.on("character-client-update.getCharacter", (character) => {
		emitClient("character-client-update.getCharacter", character);
	});
	socket.on("character-client-update.updateAttribute", (...args) => {
		emitClient("character-client-update.updateAttribute", ...args);
	});
};
