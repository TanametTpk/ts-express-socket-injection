import { Todo } from ".prisma/client";

export default interface ITodoService {
	getTodo(): Promise<Todo[]>;
	updateTodo(id: string, text: string): Promise<Todo>;
	deleteTodo(id: string): Promise<Todo>;
}
