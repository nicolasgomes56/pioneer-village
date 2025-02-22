export {
	awaitServer,
	emitServer,
	onServer,
	onServerCall,
} from "./comms/server";
export { awaitUI, emitUI, focusUI, onUI, onUICall } from "./comms/ui";
export * from "./events";
export { DrawLine, DrawTxt, TxtAtWorldCoord } from "./functions";
export * from "./game";
export * from "./resources";

// @ts-ignore
export const exports: ClientExports = global.exports;
