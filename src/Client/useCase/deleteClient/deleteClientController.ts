import "reflect-metadata";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteClientUseCase } from "./deleteClientUseCase";

export class DeleteClientController {
  async handle(req: Request, res: Response) {
    const { id } = req.body;

    const deleteClientUseCase = container.resolve(DeleteClientUseCase);
    await deleteClientUseCase.execute(id);

    return res.status(200).send();
  }
}
