import { inject, injectable } from "tsyringe";
import { AppError } from "../../../errors/AppError";
import { ITasksRepository } from "../../../repositories/tasks/ITasksRepository";

interface IRequest {
  userId: string;
  taskId: string;
  content: string;
}

@injectable()
class UpdateTaskUseCase {
  constructor(
    @inject("PrismaTasksRepository")
    private tasksRepository: ITasksRepository
  ) {}

  async execute({ userId, taskId, content }: IRequest): Promise<void> {
    const tasks = await this.tasksRepository.findByUserId(userId);

    const task = tasks.find(task => task.id === taskId);

    if (!task) {
      throw new AppError("Task not found!");
    }

    await this.tasksRepository.update({ taskId: task.id, content });
  }
}

export { UpdateTaskUseCase };

