import { Router } from "express";
import {
  addNewFeedback,
  deleteFeedback,
  getAllFeedback,
} from "../controllers/feedback.controller.js";

const feedbackRouter = Router();

feedbackRouter.get("/", getAllFeedback);
feedbackRouter.post("/", addNewFeedback);
feedbackRouter.delete("/:id", deleteFeedback);

export default feedbackRouter;
