import { getRepository, Repository } from "typeorm";
import { AppError } from "../../shared/error/app.error";
import { City } from "../entity/city";

import { ICityRepository, ICreateCityDTO } from "./ICityRepository";

export class CityRepository implements ICityRepository {
  private repository: Repository<City>;
  constructor() {
    this.repository = getRepository(City);
  }
  async getCityByName(name: string): Promise<City> {
    const cityOrNull = await this.repository.findOne({ name });
    return cityOrNull;
  }
  async listCityByState(state: string): Promise<City[]> {
    const cityList = await this.repository.find({ state });
    return cityList;
  }
  async createCity({ name, state }: ICreateCityDTO): Promise<City> {
    const cityOrNull = await this.repository.findOne({ name });

    if (cityOrNull) {
      throw new AppError(`city name has already been registered`, 422);
    }
    const city = this.repository.create({ name, state });

    await this.repository.save(city);

    return city;
  }
}
