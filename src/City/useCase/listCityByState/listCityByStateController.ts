import "reflect-metadata";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListCityByStateUseCase } from "./listCityByStateUseCase";

export class ListCityByStateController {
  async handle(req: Request, res: Response) {
    const { state } = req.body;

    const listCityByStateUseCase = container.resolve(ListCityByStateUseCase);
    const createCity = await listCityByStateUseCase.execute(state);

    return res.status(201).json(createCity);
  }
}
