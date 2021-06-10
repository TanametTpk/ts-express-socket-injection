export default interface IServer {
	start(port: number | string): void;
	stop(): void;
}
