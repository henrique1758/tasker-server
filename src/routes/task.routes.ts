import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateTaskController } from "../modules/tasks/CreateTask/CreateTaskController";
import { DeleteTaskController } from "../modules/tasks/DeleteTask/DeleteTaskController";
import { FindTasksByUserController } from "../modules/tasks/FindTasksByUser/FindTasksByUserController";
import { UpdateTaskController } from "../modules/tasks/UpdateTask/UpdateTaskController";

const taskRouter = Router();

const createTaskController = new CreateTaskController();
const findTasksByUserController = new FindTasksByUserController();
const updateTaskController = new UpdateTaskController();
const deleteTaskController = new DeleteTaskController();

taskRouter.post("/", ensureAuthenticated, createTaskController.handle);

taskRouter.get("/", ensureAuthenticated, findTasksByUserController.handle);

taskRouter.patch("/update/:id", ensureAuthenticated, updateTaskController.handle);

taskRouter.delete("/delete/:id", ensureAuthenticated, deleteTaskController.handle);

export { taskRouter as taskRoutes };

