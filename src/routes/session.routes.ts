import { Router } from "express";
import { SessionController } from "../modules/Session/SessionController";

const sessionRoute = Router();

const sessionController = new SessionController();

sessionRoute.post("/", sessionController.handle);

export { sessionRoute };

