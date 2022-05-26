import { Router } from "express";
import { sessionRoute } from "./session.routes";
import { tasksRoutes } from "./tasks.routes";
import { userRoutes } from "./user.routes";

const router = Router();

router.use("/users", userRoutes);
router.use("/tasks", tasksRoutes);
router.use("/sessions", sessionRoute);

export { router as routes };

