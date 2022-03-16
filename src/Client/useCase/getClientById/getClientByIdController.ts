import "reflect-metadata";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetClientByIdUseCase } from "./getClientByIdUseCase";

export class GetClientByIdController {
  async handle(req: Request, res: Response) {
    const { id } = req.body;

    const getClientByIdUseCase = container.resolve(GetClientByIdUseCase);
    const clientReturn = await getClientByIdUseCase.execute(id);

    return res.status(200).json(clientReturn);
  }
}
