import { hash } from "bcryptjs";
import exp from "constants";
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { AuthenticateUserUseCase } from "../authenticateUser/AuthenticateUserUseCase";
import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase"

let inMemoryUsersRepository: InMemoryUsersRepository;
let showUserProfileUseCase: ShowUserProfileUseCase;

describe("show profile information", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    showUserProfileUseCase = new ShowUserProfileUseCase(inMemoryUsersRepository);
  });

  it("should to be able to see profile information", async () => {

    const passWordHash = await hash('password', 8);

    const user = {
      email: "teste@gmail.com",
      name: "testName",
      password: passWordHash,
    };

    const userCreated = await inMemoryUsersRepository.create(user);

    if (userCreated.id) {
      const response = await showUserProfileUseCase.execute(userCreated.id);

      expect(response).toHaveProperty("name");
    }

  })

})
