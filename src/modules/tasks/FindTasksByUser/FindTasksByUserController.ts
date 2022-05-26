import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindTasksByUserUseCase } from "./FindTasksByUserUseCase";

class FindTasksByUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;

    const findTasksByUserUseCase = container.resolve(FindTasksByUserUseCase);

    const result = await findTasksByUserUseCase.execute(id);

    return res.json(result);
  }
}

export { FindTasksByUserController };

