import chalk from "chalk";
import { inspect } from "node:util";

/**
 * Console Log with auto color formating objects
 */
export const log = (...args: any[]) => {
	console.log(
		...args.map((arg) =>
			typeof arg === "string" ? arg : inspect(arg, { depth: 4, colors: false }),
		),
	);
};

/**
 * Log first argument in green
 */
export const logGreen = (name: string, ...args: any[]) => {
	log(chalk.green(name), ...args);
};

export const logEvent = (event: string, ...args: any[]) => {
	// log(chalk.yellow(event), ...args);
};

/**
 * Log first argument in blue
 */
export const logInfo = (name: string, ...args: any[]) => {
	log(chalk.blue(name), ...args);
};

/**
 * Log Info Server Prefix
 */
export const logInfoS = (name: string, ...args: any[]) => {
	log(chalk.green("|S|"), chalk.blue(name), ...args);
};

/**
 * Log Info Client Prefix
 */
export const logInfoC = (name: string, ...args: any[]) => {
	log(chalk.yellow("|C|"), chalk.blue(name), ...args);
};
