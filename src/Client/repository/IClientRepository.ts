import { City } from "../../City/entity/city";
import { Client } from "../entity/client";

export interface ICreateClientDTO {
  name: string;
  gender: string;
  birthDate: Date;
  age: number;
  city: string;
}
export interface IClientRepository {
  createClient({
    name,
    gender,
    birthDate,
    age,
    city,
  }: ICreateClientDTO): Promise<Client>;
  deleteClient(id: string): Promise<any>;
  getClientById(id: string): Promise<Client>;
  listClientByName(name: string): Promise<Client[]>;
  updateClientName(id: string, newName: string): Promise<any>;
}
