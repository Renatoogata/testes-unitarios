import { hash } from "bcryptjs";
import { AppError } from "../../../../shared/errors/AppError";
import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { GetBalanceUseCase } from "./GetBalanceUseCase"


let inMemoryUserRepository: InMemoryUsersRepository;
let inMemoryStatementsRepository: InMemoryStatementsRepository;
let getBalanceUseCase: GetBalanceUseCase;

describe("Get Balance", () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUsersRepository();
    inMemoryStatementsRepository = new InMemoryStatementsRepository();
    getBalanceUseCase = new GetBalanceUseCase(inMemoryStatementsRepository, inMemoryUserRepository);
  })

  it("should be able to get balance", async () => {

    const passWordHash = await hash('password', 8);

    const user = {
      email: "teste@gmail.com",
      name: "testName",
      password: passWordHash,
    };

    const userCreated = await inMemoryUserRepository.create(user);

    const balance = await getBalanceUseCase.execute({
      user_id: userCreated.id as string
    });
    console.log(balance);
    expect(balance).toHaveProperty("balance");
    expect(balance).toHaveProperty("statement");
  });

  it("should not be able to get balance an non existent user", async () => {

    expect(async () => {
      await getBalanceUseCase.execute({ user_id: 'non existent id' });
    }).rejects.toBeInstanceOf(AppError);
  })
})
