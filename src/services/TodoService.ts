import { Todo } from ".prisma/client";
import { PrismaClient } from "@prisma/client";
import { inject, injectable, registry } from "tsyringe";
import prisma from "../configs/prisma/client";
import ITodoService from "../interfaces/services/ITodoService";

@registry([{ token: "Repository", useValue: prisma }])
@injectable()
export default class TodoService implements ITodoService {
	private client: PrismaClient;

	constructor(@inject("Repository") client: PrismaClient) {
		this.client = client;
	}

	getTodo(): Promise<Todo[]> {
		return this.client.todo.findMany();
	}

	updateTodo(id: string, text: string): Promise<Todo> {
		return this.client.todo.update({
			where: { id },
			data: {
				text,
			},
		});
	}

	deleteTodo(id: string): Promise<Todo> {
		return this.client.todo.delete({
			where: { id },
		});
	}
}
