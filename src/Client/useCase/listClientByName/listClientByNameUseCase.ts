import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { IClient } from "../../entity/client";
import { IClientRepository } from "../../repository/IClientRepository";

@injectable()
export class ListClientByNameUseCase {
  constructor(
    @inject("ClientRepository")
    private clientRepository: IClientRepository
  ) {}
  async execute(name: string): Promise<IClient[]> {
    const listClientResult = await this.clientRepository.listClientByName(name);

    return listClientResult;
  }
}
