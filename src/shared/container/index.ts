import { container } from "tsyringe";
import { CityRepository } from "../../City/repository/CityRepository";
import { ICityRepository } from "../../City/repository/ICityRepository";
import { ClientRepository } from "../../Client/repository/ClientRepository";
import { IClientRepository } from "../../Client/repository/IClientRepository";

container.registerSingleton<ICityRepository>("CityRepository", CityRepository);

container.registerSingleton<IClientRepository>(
  "ClientRepository",
  ClientRepository
);
