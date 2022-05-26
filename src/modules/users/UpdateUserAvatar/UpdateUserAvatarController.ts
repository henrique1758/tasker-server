import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase";

class UpdateUserAvatarController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id: userId } = req.user;
    const avatar_file = req.file;   
    
    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);

    await updateUserAvatarUseCase.execute({
      userId,
      avatar_url: avatar_file?.location
    });

    return res.json({ message: "User avatar updated successfuly!" });
  }
}

export { UpdateUserAvatarController };

