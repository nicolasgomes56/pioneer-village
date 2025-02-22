import { onClientCall } from "@lib/ui";
import type { SocketServer } from "@socket/src/types.d.ts";
import type { Socket } from "socket.io-client";
export default (
	socket: Socket<
		UISocketEvents,
		SocketServer.Client & SocketServer.ClientEvents
	>,
) => {
	onClientCall("doors.get-door-states", () => {
		return new Promise((resolve) => {
			socket.emit("doors.get-door-states", (data) => {
				resolve(data);
			});
		});
	});
};
