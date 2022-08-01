import { hash } from "bcryptjs";
import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { CreateStatementUseCase } from "./CreateStatementUseCase"
import { OperationType } from "../../entities/Statement";

let inMemoryUserRepository: InMemoryUsersRepository;
let inMemoryStatementRepository: InMemoryStatementsRepository;
let createStatementUseCase: CreateStatementUseCase;

describe("Create an Statement deposit/withdwar", () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUsersRepository();
    inMemoryStatementRepository = new InMemoryStatementsRepository();
    createStatementUseCase = new CreateStatementUseCase(inMemoryUserRepository, inMemoryStatementRepository);
  });

  it("should be able to create an deposit statement", async () => {
    const passWordHash = await hash('password', 8);

    const user = {
      email: "teste@gmail.com",
      name: "testName",
      password: passWordHash,
    };


    const response = await inMemoryUserRepository.create(user);

    if (response.id) {

      const deposit = await inMemoryStatementRepository.create({
        type: OperationType.DEPOSIT,
        amount: 1000,
        description: "teste",
        user_id: response.id,
      });

      const withdraw = await inMemoryStatementRepository.create({
        type: OperationType.WITHDRAW,
        amount: 1000,
        description: "teste",
        user_id: response.id,
      });

      expect(deposit).toHaveProperty("id");
      expect(deposit).toHaveProperty("type", "deposit");

      expect(withdraw).toHaveProperty("id");
      expect(withdraw).toHaveProperty("type", "withdraw");

    }

  })

})
