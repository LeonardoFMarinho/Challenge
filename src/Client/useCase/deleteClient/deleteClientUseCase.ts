import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../shared/error/app.error";
import { IClientRepository } from "../../repository/IClientRepository";

@injectable()
export class DeleteClientUseCase {
  constructor(
    @inject("ClientRepository")
    private clientRepository: IClientRepository
  ) {}
  async execute(id: string): Promise<any> {
    const findClient = await this.clientRepository.getClientById(id);
    if (!findClient) {
      throw new AppError(`There is no client with this id`);
    }
    await this.clientRepository.deleteClient(id);
  }
}
