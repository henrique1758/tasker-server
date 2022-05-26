import { inject, injectable } from "tsyringe";
import { ITasksRepository } from "../../../repositories/tasks/ITasksRepository";

@injectable()
class FindTasksByUserUseCase {
  constructor(
    @inject("PrismaTasksRepository")
    private tasksRepository: ITasksRepository
  ) {}

  async execute(userId: string) {
    const tasksByUser = await this.tasksRepository.findByUserId(userId);

    return tasksByUser
  }
}

export { FindTasksByUserUseCase };

