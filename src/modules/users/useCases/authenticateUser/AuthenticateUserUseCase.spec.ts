
import { User } from "../../entities/User";
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { ICreateUserDTO } from "../createUser/ICreateUserDTO";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"

let createUserUseCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;
let userRepository: InMemoryUsersRepository;

describe("Authenticate User", () => {

  beforeEach(() => {
    userRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(userRepository);
    authenticateUserUseCase = new AuthenticateUserUseCase(userRepository);
  });

  it("should be able to authenticate an session", async () => {

    const user: ICreateUserDTO = await createUserUseCase.execute({
      email: "teste@gmail.com",
      name: "testName",
      password: "aaa123",
    });

    expect(user).toBeInstanceOf(User); // Usuario criado e guardado no repositorio.

    const result = await authenticateUserUseCase.execute({
      email: 'teste@gmail.com',
      password: 'aaa123',
    });
    console.log("token", result.token)
    expect(result).toHaveProperty("token");

  });
})
