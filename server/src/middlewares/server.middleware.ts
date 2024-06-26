import express, { Application } from "express";
import morganMiddleware from "./morgan.middleware";

import cookieParser from "cookie-parser";

export const initializeMiddlewares = (
  expressApplication: Application
): void => {
  expressApplication.use(express.json());
  expressApplication.use(morganMiddleware);

  expressApplication.use(cookieParser());
};
