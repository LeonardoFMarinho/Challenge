import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../shared/error/app.error";
import { Client } from "../../entity/client";
import { IClientRepository } from "../../repository/IClientRepository";

@injectable()
export class GetClientByIdUseCase {
  constructor(
    @inject("ClientRepository")
    private clientRepository: IClientRepository
  ) {}
  async execute(id: string): Promise<Client> {
    const clientResult = await this.clientRepository.getClientById(id);

    if (!clientResult) {
      throw new AppError(`The client with id ${id} not exist`);
    }

    return clientResult;
  }
}
