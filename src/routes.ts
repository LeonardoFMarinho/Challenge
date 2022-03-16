import { Router } from "express";
import { CreateCityController } from "./City/useCase/CreateCity/createCityController";
import { GetCityByNameController } from "./City/useCase/getCityByName/getCityByNameController";
import { ListCityByStateController } from "./City/useCase/listCityByState/listCityByStateController";
import { CreateClientController } from "./Client/useCase/createClient/createClientController";
import { DeleteClientController } from "./Client/useCase/deleteClient/deleteClientController";
import { GetClientByIdController } from "./Client/useCase/getClientById/getClientByIdController";
import { ListClientByNameController } from "./Client/useCase/listClientByName/listClientByNameController";
import { UpdateClientNameController } from "./Client/useCase/updateClientName/updateClientNameController";

const router = Router();

const createCityController = new CreateCityController();
const getCityByNameController = new GetCityByNameController();
const listCityByStateController = new ListCityByStateController();
const createClientController = new CreateClientController();
const getClientByIdController = new GetClientByIdController();
const listClientByNameController = new ListClientByNameController();
const updateClientNameController = new UpdateClientNameController();
const deleteClientController = new DeleteClientController();

router.post("/city", createCityController.handle);
router.get("/city", getCityByNameController.handle);
router.get("/city/list", listCityByStateController.handle);
router.post("/client", createClientController.handle);
router.get("/client/id", getClientByIdController.handle);
router.get("/client/list", listClientByNameController.handle);
router.patch("/client", updateClientNameController.handle);
router.delete("/client", deleteClientController.handle);

export { router };
