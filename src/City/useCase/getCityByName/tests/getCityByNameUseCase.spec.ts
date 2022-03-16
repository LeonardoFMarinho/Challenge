import { AppError } from "../../../../shared/error/app.error";
import { CityRepositoryInMemory } from "../../../repository/in-memory/CityRepositoryInMemory";
import { CreateCityUseCase } from "../../CreateCity/createCityUseCase";
import { GetCityByNameUseCase } from "../getCityByNameUseCase";

let createCityUseCase: CreateCityUseCase;
let cityRepositoryInMemory: CityRepositoryInMemory;
let getCityByNameUseCase: GetCityByNameUseCase;

describe("CreateClient usecase test", () => {
  beforeEach(() => {
    cityRepositoryInMemory = new CityRepositoryInMemory();
    createCityUseCase = new CreateCityUseCase(cityRepositoryInMemory);
    getCityByNameUseCase = new GetCityByNameUseCase(cityRepositoryInMemory);
  });
  it("should be able get a city return", async () => {
    const cityMock = {
      name: "namecityMock",
      state: "statecityMock",
    };

    await createCityUseCase.execute(cityMock.name, cityMock.state);
    const result = await getCityByNameUseCase.execute(cityMock.name);
    expect(result).not.toBeUndefined();
    expect(result).toHaveProperty("id");
  });

  it("should not be able get a city return because the city with same name not exists", async () => {
    expect(async () => {
      const cityMock = {
        name: "namecityMock",
        state: "statecityMock",
      };
      await getCityByNameUseCase.execute(cityMock.name);
    }).rejects.toBeInstanceOf(AppError);
  });
});
