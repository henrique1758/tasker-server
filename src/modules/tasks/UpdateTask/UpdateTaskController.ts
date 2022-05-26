import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateTaskUseCase } from "./UpdateTaskUseCase";

class UpdateTaskController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id: userId } = req.user;
    const { id: taskId } = req.params;
    const { content } = req.body;

    const updateTaskUseCase = container.resolve(UpdateTaskUseCase);

    await updateTaskUseCase.execute({
      userId,
      taskId,
      content
    });

    return res.json({ message: "Task Updated Successfuly!" });
  }
}

export { UpdateTaskController };

