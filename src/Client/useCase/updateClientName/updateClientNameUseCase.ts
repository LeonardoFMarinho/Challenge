import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../shared/error/app.error";
import { Client, IClient } from "../../entity/client";
import { IClientRepository } from "../../repository/IClientRepository";

@injectable()
export class UpdateClientNameUseCase {
  constructor(
    @inject("ClientRepository")
    private clientRepository: IClientRepository
  ) {}
  async execute(id: string, newName: string): Promise<Client> {
    const clientBeforeUpdate = await this.clientRepository.getClientById(id);

    if (clientBeforeUpdate.name === newName) {
      throw new AppError(
        `The name:${newName} already belongs to this client `,
        422
      );
    }
    await this.clientRepository.updateClientName(id, newName);

    const clientAfterUpdate = await this.clientRepository.getClientById(id);
    if (clientAfterUpdate.name !== newName) {
      throw new AppError(` sorry we couldn't change the name`, 400);
    }

    return clientAfterUpdate;
  }
}
