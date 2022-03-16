import "reflect-metadata";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateClientUseCase } from "./createClientUseCase";

export class CreateClientController {
  async handle(req: Request, res: Response) {
    const { fullName, gender, birthDate, age, city } = req.body;

    const createClientUseCase = container.resolve(CreateClientUseCase);
    const createClient = await createClientUseCase.execute(
      fullName,
      gender,
      birthDate,
      age,
      city
    );
    return res.status(201).json(createClient);
  }
}
