import { Request, Response } from "express";
import { container, inject, injectable, registry } from "tsyringe";
import AbstractController from "../abstracts/AbstractController";
import IUserService from "../interfaces/services/IUserService";
import UserService from "../services/UserService";

@registry([{ token: "IUserService", useClass: UserService }])
@injectable()
export default class UserController extends AbstractController {
	constructor(@inject("IUserService") private userService: IUserService) {
		super("/users");
	}

	configureRoute(): void {
		this.routes.get("/", (req, res) => this.getUsers(req, res));
		this.routes.get("/:id", (req, res) => this.getUserById(req, res));
		this.routes.put("/:id", (req, res) => this.updateUsername(req, res));
		this.routes.delete("/:id", (req, res) => this.deleteUser(req, res));
	}

	async getUsers(req: Request, res: Response) {
		res.json(await this.userService.getUsers());
	}

	async getUserById(req: Request, res: Response) {
		let userId: string = req.params.id;
		res.json(await this.userService.getUserById(userId));
	}

	async updateUsername(req: Request, res: Response) {
		let id: string = req.params.id;
		let username: string = req.body.username;
		res.json(await this.userService.updateUser(id, username));
	}

	async deleteUser(req: Request, res: Response) {
		let id: string = req.params.id;
		res.json(await this.userService.deleteUser(id));
	}
}

container.register("Controller", UserController);
