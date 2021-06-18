import { prismaMock } from "../../configs/prisma/context";
import ITodoService from "../../interfaces/services/ITodoService";
import TodoService from "../TodoService";

let service: ITodoService;

beforeEach(() => {
	service = new TodoService(prismaMock);
});

test("should get todo", async () => {
	await service.getTodo();
	expect(prismaMock.todo.findMany).toBeCalled();
});

test("should create todo", async () => {
	await service.createTodo("test", "userId");
	expect(prismaMock.todo.create).toBeCalled();
});

test("should update todo", async () => {
	await service.updateTodo("todoId", "new test");
	expect(prismaMock.todo.update).toBeCalled();
});

test("should delete todo", async () => {
	await service.deleteTodo("todoId");
	expect(prismaMock.todo.delete).toBeCalled();
});
