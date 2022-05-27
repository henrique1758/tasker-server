import { inject, injectable } from "tsyringe";
import { AppError } from "../../../errors/AppError";
import { IUsersRepository } from "../../../repositories/users/IUsersRepository";

interface IRequest {
  userId: string;
  avatar_url?: string;
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject("PrismaUsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ userId, avatar_url }:IRequest): Promise<void> {
    const user = await this.usersRepository.findUserById(userId);

    if (!user) {
      throw new AppError("User does not exists!", 404);
    }

    await this.usersRepository.updateUserAvatar({
      userId,
      avatar_url
    });
  }
}

export { UpdateUserAvatarUseCase };

