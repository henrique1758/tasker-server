import { inject, injectable } from "tsyringe";
import { UserDataDTO } from "../../../dtos/user/UserDataDTO";
import { AppError } from "../../../errors/AppError";
import { IUsersRepository } from "../../../repositories/users/IUsersRepository";

@injectable()
class ProfileUserUseCase {
  constructor(
    @inject("PrismaUsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(id: string): Promise<UserDataDTO> {
    const user = await this.usersRepository.findUserById(id);

    if (!user) {
      throw new AppError("User does not exists!", 404);
    }

    delete user.password;

    return user;
  }
}

export { ProfileUserUseCase };

