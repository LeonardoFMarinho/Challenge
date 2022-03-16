import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../shared/error/app.error";
import { City } from "../../entity/city";
import { ICityRepository } from "../../repository/ICityRepository";

@injectable()
export class GetCityByNameUseCase {
  constructor(
    @inject("CityRepository")
    private cityRepository: ICityRepository
  ) {}
  async execute(name: string): Promise<City> {
    const city = await this.cityRepository.getCityByName(name);

    if (!city) {
      throw new AppError("There is no registered city with that name", 422);
    }

    return city;
  }
}
