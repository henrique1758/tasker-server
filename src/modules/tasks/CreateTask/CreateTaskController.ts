import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateTaskUseCase } from "./CreateTaskUseCase";

class CreateTaskController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { user } = req;
    const { content } = req.body;

    const createTaskUseCase = container.resolve(CreateTaskUseCase);

    await createTaskUseCase.execute({
      content,
      userId: user.id
    });

    return res.json({ message: "Task Created Successfuly!" })
  }
}

export { CreateTaskController };

