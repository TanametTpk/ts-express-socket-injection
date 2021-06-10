import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();

import Server from "./server";
import prisma from "./configs/prisma/client";

const main = async () => {
	const PORT = process.env.PORT || 8080;
	const server = new Server(PORT);
	server.start();
};

main()
	.catch((e) => {
		throw e;
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
