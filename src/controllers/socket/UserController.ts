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
			socket.on("user:get", (...args: any) => this.getUsers.apply(this, args));
			socket.on("user:getById", (...args: any) => this.getUserById.apply(this, args));
			socket.on("user:create", (...args: any) => this.getUserById.apply(this, args));
			socket.on("user:update", (...args: any) => this.getUserById.apply(this, args));
			socket.on("user:delete", (...args: any) => this.getUserById.apply(this, args));
		});
	}

	async getUsers(callback: (user: User[]) => void) {
		let users = await this.userService.getUsers();
		this.io.emit("user:boardcast", users);
		callback(users);
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
