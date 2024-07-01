import { Application } from "express";
import { statusConstants } from "../constants/statusConstants";

const { SUCCESS } = statusConstants;
import AppError from "../utils/errorUtils/appError";
import { errorHandler } from "../middlewares/error.middleware";
import authRouter from "./auth.routes";
import userRouter from "./userprofile.routes";

export const initializeRoutes = (expressApplication: Application) => {
  //landing route
  expressApplication.get("/", (_, res) => {
    res.json({ status: SUCCESS, message: "Intern Management System" });
  });

  expressApplication.use("/api/", [authRouter,userRouter]);

  expressApplication.all("*", (req, res, next) => {
    next(new AppError(`Cannot find ${req.originalUrl}`, 404));
  });

  expressApplication.use(errorHandler);
};
