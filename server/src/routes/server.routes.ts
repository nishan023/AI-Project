import { Application } from "express";
import { statusConstants } from "../constants/statusConstants";

const { SUCCESS } = statusConstants;
import AppError from "../utils/errorUtils/appError";
import { errorHandler } from "../middlewares/error.middleware";
import authRouter from "./auth.routes";
import userRouter from "./userprofile.routes";
import blogRouter from "./blog.routes";
import commentRouter from "./comment.routes";
import userAnswerRouter from "./userAnswer.routes";
import questionRouter from "./question.routes";

export const initializeRoutes = (expressApplication: Application) => {
  //landing route
  expressApplication.get("/", (_, res) => {
    res.json({ status: SUCCESS, message: "Ai project" });
  });

  expressApplication.use("/api/", [
    authRouter,
    userRouter,
    blogRouter,
    commentRouter,
    userAnswerRouter,
    questionRouter,
    
  ]);

  expressApplication.all("*", (req, res, next) => {
    next(new AppError(`Cannot find ${req.originalUrl}`, 404));
  });

  expressApplication.use(errorHandler);
};
