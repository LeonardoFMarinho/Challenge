import { City } from "../../../../City/entity/city";
import { AppError } from "../../../../shared/error/app.error";
import { CityRepositoryInMemory } from "../../../repository/in-memory/CityRepositoryInMemory";
import { CreateCityUseCase } from "../../CreateCity/createCityUseCase";
import { ListCityByStateUseCase } from "../listCityByStateUseCase";

let createCityUseCase: CreateCityUseCase;
let cityRepositoryInMemory: CityRepositoryInMemory;
let listCityByStateUseCase: ListCityByStateUseCase;

describe("CreateClient usecase test", () => {
  beforeEach(() => {
    cityRepositoryInMemory = new CityRepositoryInMemory();
    createCityUseCase = new CreateCityUseCase(cityRepositoryInMemory);
    listCityByStateUseCase = new ListCityByStateUseCase(cityRepositoryInMemory);
  });
  it("should be able return a array of list cities ", async () => {
    const cityMock1 = {
      name: "namecityMock",
      state: "statecityMock",
    };
    const cityMock2 = {
      name: "namecityMock2",
      state: "statecityMock",
    };
    await createCityUseCase.execute(cityMock1.name, cityMock1.state);
    await createCityUseCase.execute(cityMock2.name, cityMock2.state);

    const result = await listCityByStateUseCase.execute(cityMock1.state);
    const emptyArray = [];
    expect(result).not.toBe(emptyArray);
    expect(result[0]).toBeInstanceOf(City);
  });

  it("should not be able get a city return because the city with same name not exists", async () => {
    const cityMock1 = {
      name: "namecityMock",
      state: "statecityMock",
    };
    const cityMock2 = {
      name: "namecityMock2",
      state: "statecityMock",
    };
    await createCityUseCase.execute(cityMock1.name, cityMock1.state);
    await createCityUseCase.execute(cityMock2.name, cityMock2.state);

    const result = await listCityByStateUseCase.execute("Recife");
    expect(result).toEqual([]);
  });
});
