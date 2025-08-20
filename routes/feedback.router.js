import { Router } from "express";
import {
  addNewFeedback,
  deleteFeedback,
  getAllFeedback,
} from "../controllers/feedback.controller.js";
import { authenticateUser } from "../middlewares/authenticateUser.middleware.js";

const feedbackRouter = Router();

feedbackRouter.get("/", authenticateUser, getAllFeedback);
feedbackRouter.post("/", addNewFeedback);
feedbackRouter.delete("/:id", authenticateUser, deleteFeedback);

export default feedbackRouter;
