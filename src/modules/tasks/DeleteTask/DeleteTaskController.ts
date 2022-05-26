import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteTaskUseCase } from "./DeleteTaskUseCase";

class DeleteTaskController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteTaskUseCase = container.resolve(DeleteTaskUseCase);

    await deleteTaskUseCase.execute(id);

    return res.status(200).send();
  }
}

export { DeleteTaskController };
