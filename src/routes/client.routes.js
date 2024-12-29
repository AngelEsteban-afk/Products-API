import { Router } from "express";
import {
  createClient,
  getClients,
  updateClient,
  deleteClient,
  getClient,
  deleteClientDB,
} from "../controller/client.controller.js";

export const clientRouter = Router();

clientRouter.get("/client", getClients);
clientRouter.get("/client/:id", getClient);
clientRouter.post("/client", createClient);
clientRouter.put("/client/:id", updateClient);
clientRouter.delete("/client/:id", deleteClient);
clientRouter.delete("/clientDelete/:id", deleteClientDB);

export default clientRouter;
