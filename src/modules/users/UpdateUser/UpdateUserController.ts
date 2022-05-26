import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

class UpdateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { user } = req;
    const { name, email, password } = req.body;

    const updateUserUseCase = container.resolve(UpdateUserUseCase);

    await updateUserUseCase.execute({
      id: user.id,
      name,
      email,
      password
    });

    return res.json({ message: "User updated successfuly!" });
  }
}

export { UpdateUserController };

