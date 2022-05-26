import { Task } from "@prisma/client";
import { ICreateTaskDTO } from "../../../dtos/tasks/ICreateTaskDTO";
import { IUpdateTaskDTO } from "../../../dtos/tasks/IUpdateTaskDTO";
import { prisma } from "../../../libs/prisma";
import { ITasksRepository } from "../ITasksRepository";

class PrismaTasksRepository implements ITasksRepository {
  async create({ content, userId }: ICreateTaskDTO): Promise<void> {
    await prisma.task.create({
      data: {
        content,
        userId
      }
    });
  }
  
  async update({ taskId, content }: IUpdateTaskDTO): Promise<void> {
    await prisma.task.update({
      where: { 
        id: taskId 
      },
      data: {
        content
      }
    });
  }

  async delete(taskId: string): Promise<void> {
    await prisma.task.delete({
      where: {
        id: taskId
      }
    });
  }

  async findById(taskId: string): Promise<Task | null> {
    const task = await prisma.task.findFirst({
      where: { id: taskId }
    });

    return task;
  }

  async findByUserId(userId: string): Promise<Task[]> {
    const tasks = await prisma.task.findMany({
      where: {
        userId
      }
    });

    return tasks
  }
}

export { PrismaTasksRepository };

