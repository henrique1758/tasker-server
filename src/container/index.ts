import { container } from "tsyringe";
import { PrismaTasksRepository } from "../repositories/tasks/implementations/PrismaTasksRepository";
import { ITasksRepository } from "../repositories/tasks/ITasksRepository";
import { PrismaUsersRepository } from "../repositories/users/implementations/PrismaUsersRepository";
import { IUsersRepository } from "../repositories/users/IUsersRepository";

container.registerSingleton<IUsersRepository>(
  "PrismaUsersRepository",
  PrismaUsersRepository
);

container.registerSingleton<ITasksRepository>(
  "PrismaTasksRepository",
  PrismaTasksRepository
);