import "reflect-metadata";
import { Request, Response } from "express";
import { container, injectable } from "tsyringe";
import { CreateCityUseCase } from "./createCityUseCase";

export class CreateCityController {
  async handle(req: Request, res: Response) {
    const { name, state } = req.body;

    const createCityUseCase = container.resolve(CreateCityUseCase);

    const createCity = await createCityUseCase.execute(name, state);

    return res.status(201).json(createCity);
  }
}
