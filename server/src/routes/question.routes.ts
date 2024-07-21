import { Router } from "express";
import { getQuestionsByExperienceLevel } from "../controller/question/question.controller";
import { authenticateToken } from "../middlewares/auth.middleware";
const questionRouter = Router();

questionRouter.get("/questions/:level",authenticateToken, getQuestionsByExperienceLevel);

export default questionRouter;
