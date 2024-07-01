import { NextFunction, Request, Response } from "express";
import { CustomError } from "../@types/customError";
import { statusConstants } from "../constants/statusConstants";
import { HTTPStatusCode } from "../constants/statusCodeConstant";
import Logger from "../lib/logger";

const { InternalServerError } = HTTPStatusCode;
const { ERROR } = statusConstants;
const InternalError = "Internal Server Error";
export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || InternalServerError;
  err.status = err.status || ERROR;

  Logger.error(
    `Error Message : ${err.message} and Status Code : ${err.statusCode} `
  );
  return res.status(err.statusCode).json({
    statuscode: err.statusCode,
    message: err.message,
    status: err.name,
  });
};
