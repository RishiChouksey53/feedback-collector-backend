import { Router } from "express";
import {
  login,
  register,
  userProfile,
} from "../controllers/user.controller.js";
import validate from "../middlewares/validate.middleware.js";
import registerSchema from "../validations/register.validation.js";
import loginSchema from "../validations/login.validation.js";
import { authenticateUser } from "../middlewares/authenticateUser.middleware.js";

const userRouter = Router();

userRouter.post("/register", validate(registerSchema), register);
userRouter.post("/login", validate(loginSchema), login);
userRouter.get("/profile", authenticateUser, userProfile);

export default userRouter;
