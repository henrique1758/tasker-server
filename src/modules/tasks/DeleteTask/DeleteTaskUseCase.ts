import { inject, injectable } from "tsyringe";
import { AppError } from "../../../errors/AppError";
import { ITasksRepository } from "../../../repositories/tasks/ITasksRepository";

@injectable()
class DeleteTaskUseCase {
  constructor(
    @inject("PrismaTasksRepository")
    private tasksRepository: ITasksRepository
  ) {}

  async execute(taskId: string): Promise<void> {
    const taskExists = await this.tasksRepository.findById(taskId);

    if (!taskExists) {
      throw new AppError("Task not found!");
    }

    await this.tasksRepository.delete(taskId);
  }
}

export { DeleteTaskUseCase };
