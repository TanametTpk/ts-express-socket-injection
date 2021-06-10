import { Server } from "socket.io";

export default abstract class SocketBaseController {
	private io!: Server;

	public init(io: Server): void {
		this.io = io;
		this.configureRoute();
	}

	abstract configureRoute(): void;
}
