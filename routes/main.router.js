import { Router } from "express";
import feedbackRouter from "./feedback.router.js";
import userRouter from "./user.router.js";

const mainRouter = Router();

mainRouter.use("/feedback", feedbackRouter);
mainRouter.use("/user", userRouter);

export default mainRouter;
