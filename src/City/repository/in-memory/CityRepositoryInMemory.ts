import { City } from "../../entity/city";
import { ICityRepository, ICreateCityDTO } from "../ICityRepository";

export class CityRepositoryInMemory implements ICityRepository {
  cities: City[] = [];

  async createCity({ name, state }: ICreateCityDTO): Promise<City> {
    const city = new City();
    const result = Object.assign(city, {
      name,
      state,
    });
    this.cities.push(result);
    return result;
  }
  async getCityByName(name: string): Promise<City> {
    const cityFilter = this.cities.find((n) => n.name === name);
    return cityFilter;
  }
  async listCityByState(state: string): Promise<City[]> {
    const listCityByState = this.cities.filter((n) => n.state === state);
    return listCityByState;
  }
}
