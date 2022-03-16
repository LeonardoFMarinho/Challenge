import { Client } from "../../../entity/client";
import { IClientRepository, ICreateClientDTO } from "../../IClientRepository";

export class ClientRepositoryInMemory implements IClientRepository {
  clients: Client[] = [];
  async createClient({
    name,
    gender,
    birthDate,
    age,
    city,
  }: ICreateClientDTO): Promise<Client> {
    const client = new Client();
    const result = Object.assign(client, {
      name,
      gender,
      birthDate,
      age,
      city,
    });
    this.clients.push(result);
    return result;
  }
  async deleteClient(id: string): Promise<any> {
    const client = this.clients.find((c) => c.id === id);
    this.clients.splice(this.clients.indexOf(client, 1));
  }
  async getClientById(id: string): Promise<Client> {
    const clientById = this.clients.find((c) => c.id === id);
    return clientById;
  }
  async listClientByName(name: string): Promise<Client[]> {
    const clientByName = this.clients.filter((c) => c.name.includes(name));
    return clientByName;
  }
  async updateClientName(id: string, newName: string): Promise<any> {
    const clientById = this.clients.find((c) => c.id === id);
    clientById.name = newName;
    return clientById;
  }
}
