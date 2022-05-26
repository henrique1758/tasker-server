import { Router } from "express";
import multer from "multer";
import { multerConfig } from "../config/multer";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateUserController } from "../modules/users/CreateUser/CreateUserController";
import { ProfileUserController } from "../modules/users/ProfileUser/ProfileUserController";
import { UpdateUserController } from "../modules/users/UpdateUser/UpdateUserController";
import { UpdateUserAvatarController } from "../modules/users/UpdateUserAvatar/UpdateUserAvatarController";

const userRoute = Router();

const createUserController = new CreateUserController();
const profileUserController = new ProfileUserController();
const updateUserController = new UpdateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

userRoute.post("/", createUserController.handle);

userRoute.get(
"/profile", 
ensureAuthenticated, 
profileUserController.handle);

userRoute.put(
"/update", 
ensureAuthenticated,
updateUserController.handle
);

userRoute.patch(
"/update/avatar",
ensureAuthenticated,
multer(multerConfig).single("avatar"),
updateUserAvatarController.handle
);

export { userRoute as userRoutes };

