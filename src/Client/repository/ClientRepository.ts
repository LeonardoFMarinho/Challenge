import { getManager, getRepository, Repository } from "typeorm";
import { City } from "../../City/entity/city";
import { Client, IClient } from "../entity/client";
import { IClientRepository, ICreateClientDTO } from "./IClientRepository";

export class ClientRepository implements IClientRepository {
  private repository: Repository<Client>;

  constructor() {
    this.repository = getRepository(Client);
  }
  async createClient({
    name,
    gender,
    birthDate,
    age,
    city,
  }: ICreateClientDTO): Promise<Client> {
    const createClient = this.repository.create({
      name,
      gender,
      birthDate,
      age,
      city,
    });
    await this.repository.save(createClient);
    return createClient;
  }
  async deleteClient(id: string): Promise<any> {
    const clientDeleted = await this.repository.query(
      `DELETE FROM client WHERE id = '${id}'`
    );
    return clientDeleted;
  }
  async getClientById(id: string): Promise<Client> {
    const clientOrUndef = await this.repository.findOne({ id: id });
    return clientOrUndef;
  }
  async listClientByName(name: string): Promise<Client[]> {
    const clients = await this.repository.query(
      `SELECT name,* FROM client WHERE name LIKE '%${name}%' `
    );

    return clients;
  }
  async updateClientName(id: string, newName: string): Promise<any> {
    const clientUpdate = await this.repository.query(
      `UPDATE client SET name = '${newName}' WHERE id = '${id}'`
    );
    return clientUpdate;
  }
}
