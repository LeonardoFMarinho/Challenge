import { AppError } from "../../../../shared/error/app.error";
import { CityRepositoryInMemory } from "../../../repository/in-memory/CityRepositoryInMemory";
import { CreateCityUseCase } from "../createCityUseCase";

let createCityUseCase: CreateCityUseCase;
let cityRepositoryInMemory: CityRepositoryInMemory;

describe("CreateClient usecase test", () => {
  beforeEach(() => {
    cityRepositoryInMemory = new CityRepositoryInMemory();
    createCityUseCase = new CreateCityUseCase(cityRepositoryInMemory);
  });
  it("should be able create a city and return ok ", async () => {
    const cityMock = {
      name: "namecityMock",
      state: "statecityMock",
    };

    const result = await createCityUseCase.execute(
      cityMock.name,
      cityMock.state
    );
    expect(result.name).toBe(cityMock.name);
  });

  it("should not be able create a city with a used name", async () => {
    expect(async () => {
      const cityMock = {
        name: "namecityMock",
        state: "statecityMock",
      };
      await createCityUseCase.execute(cityMock.name, cityMock.state);
      await createCityUseCase.execute(cityMock.name, cityMock.state);
    }).rejects.toBeInstanceOf(AppError);
  });
});
