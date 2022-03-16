import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../shared/error/app.error";
import { City } from "../../entity/city";
import { ICityRepository } from "../../repository/ICityRepository";

@injectable()
export class ListCityByStateUseCase {
  constructor(
    @inject("CityRepository")
    private cityRepository: ICityRepository
  ) {}
  async execute(state: string): Promise<City[]> {
    const listCity = await this.cityRepository.listCityByState(state);

    return listCity;
  }
}
