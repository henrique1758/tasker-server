import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../errors/AppError";
import { IUsersRepository } from "../../repositories/users/IUsersRepository";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    created_at: Date;
  };
}

@injectable()
class SessionUseCase {
  constructor(
    @inject("PrismaUsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findUserByEmail(email);

    if (!user) {
      throw new AppError("Email or password incorrect!");
    };

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Email or password incorrect!");
    };

    const token = sign({}, String(process.env.SECRET_KEY), {
      subject: user.id,
      expiresIn: "1 day"
    });

    const authResult = {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: user.created_at
      }
    };

    return authResult;
  }
}

export { SessionUseCase };

