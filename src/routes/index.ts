import { Router } from "express";
import { sessionRoute } from "./session.routes";
import { taskRoutes } from "./task.routes";
import { userRoutes } from "./user.routes";

const router = Router();

router.use("/users", userRoutes);
router.use("/tasks", taskRoutes);
router.use("/sessions", sessionRoute);

export { router as routes };

