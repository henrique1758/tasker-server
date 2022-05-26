import { User } from "@prisma/client";
import { ICreateUserDTO } from "../../dtos/user/ICreateUserDTO";
import { IUpdateUserAvatarDTO } from "../../dtos/user/IUpdateUserAvatarDTO";
import { IUpdateUserDTO } from "../../dtos/user/IUpdateUserDTO";

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>;
  findUserById(id: string): Promise<User | null>;
  findUserByEmail(email: string): Promise<User | null>;
  updateUser(data: IUpdateUserDTO): Promise<void>;
  updateUserAvatar(data: IUpdateUserAvatarDTO): Promise<void>;
}

export { IUsersRepository };

