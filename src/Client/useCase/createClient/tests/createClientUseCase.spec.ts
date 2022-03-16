import { CityRepositoryInMemory } from "../../../../City/repository/in-memory/CityRepositoryInMemory";
import { CreateCityUseCase } from "../../../../City/useCase/CreateCity/createCityUseCase";
import { ClientRepositoryInMemory } from "../../../repository/test/in-memory/ClientRepositoryInMemory";
import { AppError } from "../../../../shared/error/app.error";
import { CreateClientUseCase } from "../createClientUseCase";

let cityRepositoryInMemory: CityRepositoryInMemory;
let createCityUseCase: CreateCityUseCase;
let createClientUseCase: CreateClientUseCase;
let clientRepositoryInMemory: ClientRepositoryInMemory;

describe("CreateClient usecase test", () => {
  beforeEach(() => {
    cityRepositoryInMemory = new CityRepositoryInMemory();
    createCityUseCase = new CreateCityUseCase(cityRepositoryInMemory);
    clientRepositoryInMemory = new ClientRepositoryInMemory();
    createClientUseCase = new CreateClientUseCase(clientRepositoryInMemory);
  });
  it("should be able create a client and return him ", async () => {
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

    const result = await createClientUseCase.execute(
      clientMock.name,
      clientMock.gender,
      clientMock.birthDate,
      clientMock.age,
      clientMock.city
    );
    expect(result.name).toBe(clientMock.name);
    expect(result.id).not.toBeUndefined();
  });

  it("should not be able create a client with a used name", async () => {
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

      await createClientUseCase.execute(
        clientMock.name,
        clientMock.gender,
        clientMock.birthDate,
        clientMock.age,
        clientMock.city
      );
      await createClientUseCase.execute(
        clientMock.name,
        clientMock.gender,
        clientMock.birthDate,
        clientMock.age,
        clientMock.city
      );
    }).rejects.toBeInstanceOf(AppError);
  });
});
