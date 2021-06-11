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
			socket.on("user:get", this.getUsers);
			socket.on("user:getById", this.getUserById);
			socket.on("user:create", this.createUser);
			socket.on("user:update", this.updateUsername);
			socket.on("user:delete", this.deleteUser);
		});
	}

	async getUsers(callback: (user: User[]) => void) {
		callback(await this.userService.getUsers());
	}

	async getUserById(id: string, callback: (user: User | null) => void) {
		callback(await this.userService.getUserById(id));
	}

	async createUser(username: string, callback: (user: User) => void) {
		callback(await this.userService.createUser(username));
	}

	async updateUsername(id: string, username: string, callback: (user: User) => void) {
		callback(await this.userService.updateUser(id, username));
	}

	async deleteUser(id: string, callback: (user: User) => void) {
		callback(await this.userService.deleteUser(id));
	}
}

container.register("SocketController", UserController);
