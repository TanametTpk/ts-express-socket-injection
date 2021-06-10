import { User } from "@prisma/client";

export default interface IUserService {
	getUsers(): Promise<User[]>;
	getUserById(id: string): Promise<User | null>;
	updateUser(id: string, name: string): Promise<User>;
	deleteUser(id: string): Promise<User>;
}
