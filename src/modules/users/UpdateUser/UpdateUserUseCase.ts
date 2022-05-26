import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../errors/AppError";
import { IUsersRepository } from "../../../repositories/users/IUsersRepository";

interface IRequest {
  id: string;
  name: string;
  email: string;
  password: string;
}

@injectable()
class UpdateUserUseCase {
  constructor(
    @inject("PrismaUsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ id, name, email, password }: IRequest): Promise<void> {
    if (!name) {
      throw new AppError("name is required!");
    }

    if (!email) {
      throw new AppError("email is required!");
    }

    if (!password) {
      throw new AppError("password is required!");
    }
    
    const user = await this.usersRepository.findUserById(id);

    if (!user) {
      throw new AppError("User does not exists!", 404);
    };

    const passwordHash = await hash(password, 8);

    await this.usersRepository.updateUser({
      id,
      name,
      email, 
      password: passwordHash
    });
  }
}

export { UpdateUserUseCase };

