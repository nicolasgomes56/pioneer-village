declare namespace SocketServer {
	interface Server {
		["stable.load-character-horses"]: (
			characterId: number,
			callback: (data: Horse.Data[]) => void,
		) => void;
	}

	type ServerEvents = {};

	type Client = {};

	interface ClientEvents {
		["stable.load-character-horses"]: (
			characterId: number,
			callback: (data: Horse.Data[]) => void,
		) => void;
	}
}
