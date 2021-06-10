import { Router } from "express";

export default abstract class AbstractController {
	protected routes: Router;
	private path: string;

	constructor(path: string) {
		this.routes = Router();
		this.path = path;

		this.configureRoute();
	}

	abstract configureRoute(): void;

	public getRoutes(): Router {
		return this.routes;
	}

	public getPath(): string {
		return this.path;
	}
}
