import { Request, Response } from "express";
import { container, inject, injectable, registry } from "tsyringe";
import HTTPBaseController from "../../abstracts/HttpBaseController";
import ITodoService from "../../interfaces/services/ITodoService";
import TodoService from "../../services/TodoService";

@registry([{ token: "ITodoService", useClass: TodoService }])
@injectable()
export default class TodoController extends HTTPBaseController {
	constructor(@inject("ITodoService") private todoService: ITodoService) {
		super("/todo");
	}

	configureRoute(): void {
		this.routes.get("/", (req, res) => this.getTodo(req, res));
	}

	async getTodo(req: Request, res: Response) {
		res.json(await this.todoService.getTodo());
	}
}

container.register("HTTPController", TodoController);
