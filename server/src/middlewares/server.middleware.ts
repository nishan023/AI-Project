import express, { Application } from "express";
import morganMiddleware from "./morgan.middleware";
import mongoSanitze from "express-mongo-sanitize";
import cookieParser from "cookie-parser";
import { corsOptionsConfig } from "../config/corsOptions.config";
import cors from "cors";

export const initializeMiddlewares = (
  expressApplication: Application
): void => {
  expressApplication.use(express.json());
  expressApplication.use(express.urlencoded({ extended: true }));
  expressApplication.use(mongoSanitze());
  expressApplication.use(cookieParser());
  expressApplication.use(morganMiddleware);
  expressApplication.use(cors(corsOptionsConfig));
};
