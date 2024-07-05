import { NextFunction, Request, Response } from "express";
import User from "../database/models/User";
import AppError from "../utils/errorUtils/appError";

export const checkisActive = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  try {
    if (Object.entries(user).length === 0)
      throw new AppError("User Payload Is Empty", 401);
    const userId = req.user.userId ? req.user.userId : null;
    if (userId === null) throw new AppError(`User Id is Null`, 402);
    const userPayload = await User.findOne({ _id: userId });
    if (!userPayload?.isActive)
      throw new AppError(`Your Account Is Deactivated`, 403);
    next();
  } catch (err: any) {
    next(err);
  }
};
