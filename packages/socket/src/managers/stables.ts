import type { PrismaClient, Horses as PrismaHorses } from "@prisma/client";

class Stables {
	static readonly instance: Stables = new Stables();

	prisma: PrismaClient;

	constructor() {
		if (Stables.instance) {
			throw new Error(
				"Error: Instantiation failed: Use Stables.Instance instead of new.",
			);
		}
	}

	async setDB(prisma: PrismaClient) {
		this.prisma = prisma;
	}

	async loadCharacterHorses(characterId: number): Promise<PrismaHorses[]> {
		return await this.prisma.horses.findMany({
			where: {
				owner: {
					id: characterId,
				},
			},
			include: {
				brand: true,
			},
		});
	}
}

export default Stables.instance;
