import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();

import Server from "./server";
import prisma from "./configs/prisma/client";

const main = async () => {
	const server = Server.getInstance();
	server.start(process.env.PORT || 8080);
};

main()
	.catch((e) => {
		throw e;
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
