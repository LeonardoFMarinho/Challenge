import "reflect-metadata";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListCityByStateUseCase } from "../../../City/useCase/listCityByState/listCityByStateUseCase";
import { UpdateClientNameUseCase } from "./updateClientNameUseCase";

export class UpdateClientNameController {
  async handle(req: Request, res: Response) {
    const { id, newName } = req.body;

    const updateClientNameUseCase = container.resolve(UpdateClientNameUseCase);
    const clientReturn = await updateClientNameUseCase.execute(id, newName);

    return res.status(200).json(clientReturn);
  }
}
