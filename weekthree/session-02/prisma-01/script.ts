import { PrismaClient } from "@prisma/client";

// Run file by -  npx ts-node script.ts

const prisma = new PrismaClient({
	log: [{ emit: "event", level: "query" }],
});

prisma.$on("query", (e) => {
	console.log("Query:", e.query);
	console.log("Params:", e.params);
	console.log("Duration:", e.duration + "ms");
});

async function main() {
	// we will write prisma commands

	// creating a new user
	// const user = await prisma.user.create({
	// 	data: {
	// 		name: "Buoy",
	// 		email: "buoy@example.com",
	// 	},
	// });

	// console.log("Created user:", user);

	const allUsers = await prisma.user.findMany();
	console.log("ALL USERS");
	console.table(allUsers);
}

main()
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});

// Assignment
// https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-postgresql
