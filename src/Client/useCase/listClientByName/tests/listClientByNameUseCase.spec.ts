import { CityRepositoryInMemory } from "../../../../City/repository/in-memory/CityRepositoryInMemory";
import { CreateCityUseCase } from "../../../../City/useCase/CreateCity/createCityUseCase";
import { ClientRepositoryInMemory } from "../../../repository/test/in-memory/ClientRepositoryInMemory";
import { AppError } from "../../../../shared/error/app.error";
import { CreateClientUseCase } from "../../createClient/createClientUseCase";
import { DeleteClientUseCase } from "../../deleteClient/deleteClientUseCase";
import { GetClientByIdUseCase } from "../../../../Client/useCase/getClientById/getClientByIdUseCase";
import { Client } from "../../../../Client/entity/client";
import { ListClientByNameUseCase } from "../listClientByNameUseCase";

let cityRepositoryInMemory: CityRepositoryInMemory;
let createCityUseCase: CreateCityUseCase;
let createClientUseCase: CreateClientUseCase;
let clientRepositoryInMemory: ClientRepositoryInMemory;
let getClientByIdUseCase: GetClientByIdUseCase;
let listClientByNameUseCase: ListClientByNameUseCase;

describe("CreateClient usecase test", () => {
  beforeEach(() => {
    cityRepositoryInMemory = new CityRepositoryInMemory();
    createCityUseCase = new CreateCityUseCase(cityRepositoryInMemory);
    clientRepositoryInMemory = new ClientRepositoryInMemory();
    createClientUseCase = new CreateClientUseCase(clientRepositoryInMemory);
    getClientByIdUseCase = new GetClientByIdUseCase(clientRepositoryInMemory);
    listClientByNameUseCase = new ListClientByNameUseCase(
      clientRepositoryInMemory
    );
  });
  it("should be able list a clients by name ", async () => {
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
    const clientMock2 = {
      name: "name Test",
      age: 25,
      birthDate: new Date("21/07/96"),
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
      clientMock2.name,
      clientMock2.gender,
      clientMock2.birthDate,
      clientMock2.age,
      clientMock2.city
    );

    const listClients = await listClientByNameUseCase.execute("name");
    expect(listClients.length).toBe(2);

    const listOneClient = await listClientByNameUseCase.execute("Client");
    expect(listOneClient.length).toBe(1);
  });

  it("should not be able create a client with a used name", async () => {
    const listClients = await listClientByNameUseCase.execute(
      "nonexistent name"
    );
    expect(listClients).toEqual([]);
  });
});
