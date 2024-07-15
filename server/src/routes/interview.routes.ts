import { Router } from "express";
import { InterviewController } from "../controller/interview/interview.controller";
import { authenticateToken } from "../middlewares/auth.middleware";
import { checkisActive } from "../middlewares/check-isActive.middleware";
const interviewRouter: Router = Router();

interviewRouter.post(
  "/interview",
  authenticateToken,
  checkisActive,
  InterviewController.createInterview
);

interviewRouter.get(
  "/interview/:mockId",
  authenticateToken,
  checkisActive,
  InterviewController.getInterviewDetails
);

interviewRouter.get(
  "/interview/:mockId/start",
  authenticateToken,
  checkisActive,
  InterviewController.getInterviewDetailsJson
);

export default interviewRouter;
