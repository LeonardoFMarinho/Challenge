import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { City } from "../../../City/entity/city";
import { AppError } from "../../../shared/error/app.error";
import { Client, IClient } from "../../entity/client";
import { IClientRepository } from "../../repository/IClientRepository";

export interface ClientUseCaseReturn extends Omit<IClient, "city"> {
  cityId: string;
  state: string;
  created_at: Date;
}
@injectable()
export class CreateClientUseCase {
  constructor(
    @inject("ClientRepository")
    private clientRepository: IClientRepository
  ) {}
  async execute(
    fullName: string,
    gender: string,
    birthDate: Date,
    age: number,
    city: string
  ): Promise<Client> {
    const clientExist = await this.clientRepository.listClientByName(fullName);
    if (clientExist.length > 0) {
      throw new AppError(`a client with name ${fullName} already exists`);
    }

    const newClient = await this.clientRepository.createClient({
      name: fullName,
      gender,
      birthDate,
      age,
      city,
    });

    return newClient;
  }
}
