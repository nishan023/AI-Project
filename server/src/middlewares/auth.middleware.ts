import { NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
import AppError from "../utils/errorUtils/appError";
import { HTTPStatusCode } from "../constants/statusCodeConstant";
import envConfig from "../config/env.config";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authToken = req.headers["authorization"];
  if (!authToken)
    throw new AppError(
      `Authentication Token is Missing`,
      HTTPStatusCode.Forbidden
    );

  try {
    const payload: JwtPayload | any = jwt.verify(
      authToken,
      envConfig.ACCESS_TOKEN as string
    );
    if (Object.entries(payload).length === 0)
      throw new AppError(`Payload is empty`, 401);
    req.user = payload;
    next();
  } catch (err: JsonWebTokenError | Error | any) {
    throw new AppError(err.message, err.status);
  }
};
