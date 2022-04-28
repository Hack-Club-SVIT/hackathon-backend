import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import userSeed from "./seeds/users";
const prisma = new PrismaClient();

dotenv.config();

async function main() {
	await userSeed(prisma);
}

main()
	.catch(e => {
		throw e;
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
