import { prismaMock } from "../../configs/prisma/context";
import IUserService from "../../interfaces/services/IUserService";
import UserService from "../UserService";

let service: IUserService;

beforeEach(() => {
	service = new UserService(prismaMock);
});

test("should get all users", async () => {
	await service.getUsers();
	expect(prismaMock.user.findMany).toBeCalled();
});

test("should get user by id", async () => {
	await service.getUserById("userId");
	expect(prismaMock.user.findFirst).toBeCalled();
});

test("should create user", async () => {
	await service.createUser("ki mi no no ma wa");
	expect(prismaMock.user.create).toBeCalled();
});

test("should update user", async () => {
	await service.updateUser("userId", "new name");
	expect(prismaMock.user.update).toBeCalled();
});

test("should delete user", async () => {
	await service.deleteUser("userId");
	expect(prismaMock.user.delete).toBeCalled();
});
