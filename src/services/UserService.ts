import { User } from ".prisma/client";
import IUserService from "../interfaces/services/IUserService";
import { PrismaClient } from "@prisma/client";
import { inject, injectable, registry } from "tsyringe";
import prisma from "../configs/prisma/client";

@registry([{ token: "Repository", useValue: prisma }])
@injectable()
export default class UserService implements IUserService {
	private client: PrismaClient;

	constructor(@inject("Repository") client: PrismaClient) {
		this.client = client;
	}

	getUsers(): Promise<User[]> {
		return this.client.user.findMany();
	}

	getUserById(id: string): Promise<User | null> {
		return this.client.user.findFirst({
			where: { id },
		});
	}

	updateUser(id: string, name: string): Promise<User> {
		return this.client.user.update({
			where: { id },
			data: { name },
		});
	}

	deleteUser(id: string): Promise<User> {
		return this.client.user.delete({
			where: { id },
		});
	}
}
