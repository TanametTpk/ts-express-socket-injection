import { Request, Response } from "express";
import { Socket } from "socket.io";
import { container, inject, injectable, registry } from "tsyringe";
import SocketBaseController from "../../abstracts/SocketBaseController";
import IUserService from "../../interfaces/services/IUserService";
import UserService from "../../services/UserService";
import { User } from ".prisma/client";

@registry([{ token: "IUserService", useClass: UserService }])
@injectable()
export default class UserController extends SocketBaseController {
	constructor(@inject("IUserService") private userService: IUserService) {
		super();
	}

	configureRoute(): void {
		this.io.on("connection", (socket: Socket) => {
			socket.on("user:update", this.updateUsername);
		});
	}

	async getUsers(req: Request, res: Response) {
		res.json(await this.userService.getUsers());
	}

	async getUserById(req: Request, res: Response) {
		let userId: string = req.params.id;
		res.json(await this.userService.getUserById(userId));
	}

	async updateUsername(id: string, username: string, callback: (user: User) => void) {
		callback(await this.userService.updateUser(id, username));
	}

	async deleteUser(req: Request, res: Response) {
		let id: string = req.params.id;
		res.json(await this.userService.deleteUser(id));
	}
}

container.register("SocketController", UserController);
