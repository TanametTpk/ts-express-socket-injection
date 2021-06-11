import { Server, Socket } from "socket.io";

export default abstract class SocketBaseController {
	protected io!: Server;

	public init(io: Server): void {
		this.io = io;
		this.configureRoute();
	}

	abstract configureRoute(): void;
}
