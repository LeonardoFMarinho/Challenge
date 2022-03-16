import { City } from "../entity/city";
export interface ICreateCityDTO {
  name: string;
  state: string;
}

export interface ICityRepository {
  createCity({ name, state }: ICreateCityDTO): Promise<City>;
  getCityByName(name: string): Promise<City>;
  listCityByState(state: string): Promise<City[]>;
}
