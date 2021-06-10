import express, { Application } from "express";
import IServer from "./interfaces/IServer";
import http from "http";
import { container } from "tsyringe";
import AbstractController from "./abstracts/AbstractController";
import { registerController } from "./configs/http/controllers";

export default class Server implements IServer {
	private app: Application;
	private port: number | string;
	private server: http.Server;

	constructor(port: number | string) {
		this.app = express();
		this.server = http.createServer(this.app);
		this.port = port;

		this.configMiddlewares();
		this.configControllers();
	}

	private configMiddlewares() {
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
	}

	private configControllers() {
		registerController();
		const controllers: AbstractController[] = container.resolveAll("Controller");
		controllers.map((controller) => this.app.use(controller.getPath(), controller.getRoutes()));
	}

	public start(): void {
		this.server.listen(this.port, () => {
			console.log("listen on port:", this.port);
		});
	}

	public stop(): void {
		this.server.close();
	}
}
