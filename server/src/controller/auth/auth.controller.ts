import { NextFunction, Request, Response } from "express";
import { AuthService } from "../../service/auth/auth.service";
import { IRegisterDto } from "../../@types/interfaces";
import { sendResposne } from "../../helpers/send-Response";

import AppError from "../../utils/errorUtils/appError";

export class AuthController {
  public static async register(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const registerDto: Partial<IRegisterDto> =
        Object.entries(req.body).length > 0 ? req.body : {};
      if (Object.values(registerDto).length == 0) {
        throw new AppError("All Fields Are Empty", 401);
      }
      const data: any = await AuthService.registerUser(registerDto);
      return sendResposne(res, 201, "User Register SuccessFully", data);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}
