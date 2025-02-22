const path = require("node:path");
const HotReloadPlugin = require("./rspack.hot-reload");

module.exports = () => ({
	entry: path.resolve("./src/client/client.ts"),
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: [/node_modules/, /build/],
				loader: "builtin:swc-loader",
				options: {
					jsc: {
						parser: {
							syntax: "typescript",
						},
					},
				},
				type: "javascript/auto",
			},
		],
	},
	plugins: [new HotReloadPlugin("client")],
	optimization: {
		minimize: false,
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
		tsConfig: { configFile: path.resolve("./src/client/tsconfig.json") },
		fallback: {
			buffer: require.resolve("buffer/"),
			stream: require.resolve("stream-browserify"),
		},
	},
	builtins: {
		provide: {
			Buffer: ["buffer", "Buffer"],
			process: "process/browser.js",
		},
	},
	output: {
		path: path.resolve("./build"),
		filename: "client.js",
	},
});
