import { Task } from "@prisma/client";
import { ICreateTaskDTO } from "../../dtos/tasks/ICreateTaskDTO";
import { IUpdateTaskDTO } from "../../dtos/tasks/IUpdateTaskDTO";

interface ITasksRepository {
  create(data: ICreateTaskDTO): Promise<void>;
  findById(taskId: string): Promise<Task | null>;
  findByUserId(userId: string): Promise<Task[]>;
  update(data: IUpdateTaskDTO): Promise<void>;
  delete(taskId: string): Promise<void>;
}

export { ITasksRepository };

