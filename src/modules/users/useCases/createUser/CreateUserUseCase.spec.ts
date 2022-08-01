import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserError } from "./CreateUserError";
import { CreateUserUseCase } from "./CreateUserUseCase"


let createUserUseCase: CreateUserUseCase;
let inMemoryUserRepository: InMemoryUsersRepository;

describe("Create User", () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUsersRepository()
    createUserUseCase = new CreateUserUseCase(inMemoryUserRepository);
  });

  it("should be able to create an user", async () => {
    const user = {
      email: "teste@gmail.com",
      name: "nameTest",
      password: "test"
    };

    const createUser = await createUserUseCase.execute({
      email: user.email,
      name: user.name,
      password: user.password
    });

    const userCreated = await inMemoryUserRepository.findByEmail(user.email);

    console.log("user", createUser);

    expect(userCreated).toHaveProperty("id");
  });

  it("should be not able to create an user with same email", () => {
    expect(async () => {
      const user = {
        email: "teste@gmail.com",
        name: "nameTest",
        password: "test"
      };

      await createUserUseCase.execute({
        email: user.email,
        name: user.name,
        password: user.password
      });

      await createUserUseCase.execute({
        email: user.email,
        name: user.name,
        password: user.password
      });
    }).rejects.toBeInstanceOf(CreateUserError);
  })
})
