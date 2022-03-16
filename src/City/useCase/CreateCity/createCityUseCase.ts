import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../shared/error/app.error";
import { City } from "../../entity/city";
import { ICityRepository } from "../../repository/ICityRepository";

@injectable()
export class CreateCityUseCase {
  constructor(
    @inject("CityRepository")
    private cityRepository: ICityRepository
  ) {}
  async execute(name: string, state: string): Promise<City> {
    const verifyCity = await this.cityRepository.getCityByName(name);

    if (verifyCity) {
      throw new AppError(`city name has already been registered`, 422);
    }
    const newCity = await this.cityRepository.createCity({ name, state });

    return newCity;
  }
}
