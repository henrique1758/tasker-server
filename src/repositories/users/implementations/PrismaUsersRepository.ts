import { User } from "@prisma/client";
import { ICreateUserDTO } from "../../../dtos/user/ICreateUserDTO";
import { IUpdateUserAvatarDTO } from "../../../dtos/user/IUpdateUserAvatarDTO";
import { IUpdateUserDTO } from "../../../dtos/user/IUpdateUserDTO";
import { prisma } from "../../../libs/prisma";
import { IUsersRepository } from "../IUsersRepository";

class PrismaUsersRepository implements IUsersRepository {
  async create({ name, email, password }: ICreateUserDTO): Promise<void> {
    await prisma.user.create({
      data: {
        name,
        email,
        password
      }
    });
  }
  async findUserById(id: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: { id },
      include: {
        tasks: true
      }
    });

    return user;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: { email }
    });

    return user;
  }

  async updateUser(data: IUpdateUserDTO): Promise<void> {
    const updatedUser = await prisma.user.update({
      where: {
        id: data.id
      },
      data: {
        ...data
      }
    });
  }

  async updateUserAvatar(data: IUpdateUserAvatarDTO): Promise<void> {
    await prisma.user.update({
      where: {
        id: data.userId
      },
      data: {
        avatar_url: data.avatar_url
      }
    });
  }
}

export { PrismaUsersRepository };

