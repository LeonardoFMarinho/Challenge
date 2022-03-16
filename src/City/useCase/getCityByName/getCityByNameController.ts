import "reflect-metadata";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetCityByNameUseCase } from "./getCityByNameUseCase";

export class GetCityByNameController {
  async handle(req: Request, res: Response) {
    const { name } = req.body;

    const getCityByNameUseCase = container.resolve(GetCityByNameUseCase);
    const createCity = await getCityByNameUseCase.execute(name);

    return res.status(201).json(createCity);
  }
}
