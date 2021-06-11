import { Socket } from "socket.io";
import { container, inject, injectable, registry } from "tsyringe";
import SocketBaseController from "../../abstracts/SocketBaseController";
import { Todo } from ".prisma/client";
import TodoService from "../../services/TodoService";

@registry([{ token: "ITodoService", useClass: TodoService }])
@injectable()
export default class ToDoController extends SocketBaseController {
	constructor(@inject("ITodoService") private todoService: TodoService) {
		super();
	}

	configureRoute(): void {
		this.io.on("connection", (socket: Socket) => {
			socket.on("todo:get", (...args: any) => this.getTodo.apply(this, args));
		});
	}

	async getTodo(callback: (user: Todo[]) => void) {
		callback(await this.todoService.getTodo());
	}
}

container.register("SocketController", ToDoController);
