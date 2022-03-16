import "reflect-metadata";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListClientByNameUseCase } from "./listClientByNameUseCase";

export class ListClientByNameController {
  async handle(req: Request, res: Response) {
    const { name } = req.body;
    const listClientByNameUseCase = container.resolve(ListClientByNameUseCase);

    const listClientReturn = await listClientByNameUseCase.execute(name);

    return res.status(200).json(listClientReturn);
  }
}
