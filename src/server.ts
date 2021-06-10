import express, { Application } from "express";
import IServer from "./interfaces/IServer";
import http from "http";
import socketio from "socket.io";
import { container } from "tsyringe";
import HTTPBaseController from "./abstracts/HttpBaseController";
import { registerController } from "./configs/http/controllers";
import SocketBaseController from "./abstracts/SocketBaseController";

export default class Server implements IServer {
	private static instance: Server;
	private app: Application;
	private server: http.Server;
	private io: socketio.Server;

	constructor() {
		this.app = express();
		this.server = http.createServer(this.app);
		this.io = new socketio.Server(this.server);

		this.configMiddlewares();
		this.configControllers();
	}

	public static getInstance(): Server {
		if (!this.instance) {
			this.instance = new Server();
		}

		return this.instance;
	}

	public getSocketIO(): socketio.Server {
		return this.io;
	}

	private configMiddlewares() {
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
	}

	private configControllers() {
		registerController();

		const httpControllers: HTTPBaseController[] = container.resolveAll("HTTPController");
		httpControllers.map((controller) => this.app.use(controller.getPath(), controller.getRoutes()));

		const socketControllers: SocketBaseController[] = container.resolveAll("SocketController");
		socketControllers.map((controller) => controller.init(this.io));
	}

	public start(port: number | string): void {
		this.server.listen(port, () => {
			console.log("listen on port:", port);
		});
	}

	public stop(): void {
		this.server.close();
	}
}
