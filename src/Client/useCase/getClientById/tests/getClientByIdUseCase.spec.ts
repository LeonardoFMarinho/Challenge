import { CityRepositoryInMemory } from "../../../../City/repository/in-memory/CityRepositoryInMemory";
import { CreateCityUseCase } from "../../../../City/useCase/CreateCity/createCityUseCase";
import { ClientRepositoryInMemory } from "../../../repository/test/in-memory/ClientRepositoryInMemory";
import { AppError } from "../../../../shared/error/app.error";
import { CreateClientUseCase } from "../../createClient/createClientUseCase";
import { DeleteClientUseCase } from "../../deleteClient/deleteClientUseCase";
import { GetClientByIdUseCase } from "../../../../Client/useCase/getClientById/getClientByIdUseCase";
import { Client } from "../../../../Client/entity/client";

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
  it("should be able get a client by id", async () => {
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

    const getClient = await getClientByIdUseCase.execute(clientCreated.id);

    expect(getClient).toBe(clientCreated);
    expect(getClient).toBeInstanceOf(Client);
  });

  it("should not be able delete a client nonexistent", async () => {
    expect(async () => {
      await getClientByIdUseCase.execute("id-inexistente");
    }).rejects.toBeInstanceOf(AppError);
  });
});
