import { CityRepositoryInMemory } from "../../../../City/repository/in-memory/CityRepositoryInMemory";
import { CreateCityUseCase } from "../../../../City/useCase/CreateCity/createCityUseCase";
import { ClientRepositoryInMemory } from "../../../repository/test/in-memory/ClientRepositoryInMemory";
import { AppError } from "../../../../shared/error/app.error";
import { CreateClientUseCase } from "../../createClient/createClientUseCase";
import { DeleteClientUseCase } from "../deleteClientUseCase";
import { GetClientByIdUseCase } from "../../../../Client/useCase/getClientById/getClientByIdUseCase";

let cityRepositoryInMemory: CityRepositoryInMemory;
let createCityUseCase: CreateCityUseCase;
let createClientUseCase: CreateClientUseCase;
let clientRepositoryInMemory: ClientRepositoryInMemory;
let deleteClientUseCase: DeleteClientUseCase;
let getClientByIdUseCase: GetClientByIdUseCase;

describe("CreateClient usecase test", () => {
  beforeEach(() => {
    cityRepositoryInMemory = new CityRepositoryInMemory();
    createCityUseCase = new CreateCityUseCase(cityRepositoryInMemory);
    clientRepositoryInMemory = new ClientRepositoryInMemory();
    createClientUseCase = new CreateClientUseCase(clientRepositoryInMemory);
    deleteClientUseCase = new DeleteClientUseCase(clientRepositoryInMemory);
    getClientByIdUseCase = new GetClientByIdUseCase(clientRepositoryInMemory);
  });
  it("should be able delete a client ", async () => {
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

    await deleteClientUseCase.execute(clientCreated.id);

    expect(async () => {
      await getClientByIdUseCase.execute(clientCreated.id);
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able delete a client nonexistent", async () => {
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

      await deleteClientUseCase.execute(clientCreated.id);
      await deleteClientUseCase.execute(clientCreated.id);
    }).rejects.toBeInstanceOf(AppError);
  });
});
