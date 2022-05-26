import { inject, injectable } from "tsyringe";
import { AppError } from "../../../errors/AppError";
import { ITasksRepository } from "../../../repositories/tasks/ITasksRepository";

interface IRequest {
  content: string;
  userId: string;
}

@injectable()
class CreateTaskUseCase {
  constructor(
    @inject("PrismaTasksRepository")
    private tasksRepository: ITasksRepository
  ) {}

  async execute({ content, userId }: IRequest) {
    if (!content) {
      throw new AppError("Content is required!")
    }

    await this.tasksRepository.create({
      content,
      userId
    });
  }
}

export { CreateTaskUseCase };

