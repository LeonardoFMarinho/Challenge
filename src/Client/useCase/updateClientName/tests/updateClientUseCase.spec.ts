import { CityRepositoryInMemory } from "../../../../City/repository/in-memory/CityRepositoryInMemory";
import { CreateCityUseCase } from "../../../../City/useCase/CreateCity/createCityUseCase";
import { ClientRepositoryInMemory } from "../../../repository/test/in-memory/ClientRepositoryInMemory";
import { AppError } from "../../../../shared/error/app.error";
import { CreateClientUseCase } from "../../createClient/createClientUseCase";
import { UpdateClientNameUseCase } from "../updateClientNameUseCase";

let cityRepositoryInMemory: CityRepositoryInMemory;
let createCityUseCase: CreateCityUseCase;
let createClientUseCase: CreateClientUseCase;
let clientRepositoryInMemory: ClientRepositoryInMemory;
let updateClientNameUseCase: UpdateClientNameUseCase;

describe("CreateClient usecase test", () => {
  beforeEach(() => {
    cityRepositoryInMemory = new CityRepositoryInMemory();
    createCityUseCase = new CreateCityUseCase(cityRepositoryInMemory);
    clientRepositoryInMemory = new ClientRepositoryInMemory();
    createClientUseCase = new CreateClientUseCase(clientRepositoryInMemory);
    updateClientNameUseCase = new UpdateClientNameUseCase(
      clientRepositoryInMemory
    );
  });
  it("should be able update a name client ", async () => {
    const cityMock = {
      name: "nameCityMock",
      state: "stateMock",
    };
    const cityCreated = await createCityUseCase.execute(
      cityMock.name,
      cityMock.state
    );
    const clientMock = {
      name: "name Client Mock",
      age: 24,
      birthDate: new Date("21/07/97"),
      city: cityCreated.id,
      gender: "Male",
    };
    const clientCreated = await createClientUseCase.execute(
      clientMock.name,
      clientMock.gender,
      clientMock.birthDate,
      clientMock.age,
      clientMock.city
    );
    await updateClientNameUseCase.execute(clientCreated.id, "new Name");

    expect(clientCreated.name).not.toBe(clientMock.name);
  });

  it("should not be able update a client to same name", async () => {
    expect(async () => {
      const cityMock = {
        name: "nameCityMock",
        state: "stateMock",
      };
      const cityCreated = await createCityUseCase.execute(
        cityMock.name,
        cityMock.state
      );
      const clientMock = {
        name: "name Client Mock",
        age: 24,
        birthDate: new Date("21/07/97"),
        city: cityCreated.id,
        gender: "Male",
      };
      const clientCreated = await createClientUseCase.execute(
        clientMock.name,
        clientMock.gender,
        clientMock.birthDate,
        clientMock.age,
        clientMock.city
      );
      await updateClientNameUseCase.execute(
        clientCreated.id,
        "name Client Mock"
      );
    }).rejects.toBeInstanceOf(AppError);
  });
});
