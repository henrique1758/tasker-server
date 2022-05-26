import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateTaskController } from "../modules/tasks/CreateTask/CreateTaskController";
import { DeleteTaskController } from "../modules/tasks/DeleteTask/DeleteTaskController";
import { FindTasksByUserController } from "../modules/tasks/FindTasksByUser/FindTasksByUserController";
import { UpdateTaskController } from "../modules/tasks/UpdateTask/UpdateTaskController";

const tasksRouter = Router();

const createTaskController = new CreateTaskController();
const findTasksByUserController = new FindTasksByUserController();
const updateTaskController = new UpdateTaskController();
const deleteTaskController = new DeleteTaskController();

tasksRouter.post("/", ensureAuthenticated, createTaskController.handle);

tasksRouter.get("/", ensureAuthenticated, findTasksByUserController.handle);

tasksRouter.patch("/update/:id", ensureAuthenticated, updateTaskController.handle);

tasksRouter.delete("/delete/:id", ensureAuthenticated, deleteTaskController.handle);

export { tasksRouter as tasksRoutes };

