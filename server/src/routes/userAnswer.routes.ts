import { Router } from "express";
import { authenticateToken } from "../middlewares/auth.middleware";
import * as userAnswerController from "../controller/userAnswer/userAnswer.controller";
const userAnswerRouter = Router();


 
 //post answer from user
userAnswerRouter.post(
  "/user/answer/",
  authenticateToken,
  userAnswerController.userAnswer
);

export default userAnswerRouter;
