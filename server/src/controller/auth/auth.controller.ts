import { NextFunction, Request, Response } from "express";
import { AuthService } from "../../service/auth/auth.service";
import {
  IForgetPasswordDto,
  ILoginDto,
  IRegisterDto,
  IResetPasswordDto,
} from "../../@types/interfaces";
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

  public static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const LoginDTO: ILoginDto =
        Object.entries(req.body).length > 0 ? req.body : {};
      if (Object.keys(LoginDTO).length === 0)
        throw new AppError(`All Fields Are Empty`, 401);
      const data: any = await AuthService.loginUser(LoginDTO);
      return sendResposne(
        res,
        201,
        `${LoginDTO.username} Has Logged In SuccessFully At ${new Date().toLocaleDateString()}`,
        data
      );
    } catch (err) {
      next(err);
    }
  }

  public static async forgetPassword(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const ForgetPasswordDto: IForgetPasswordDto = req.body;
      const data: any = await AuthService.forgetPassoword(ForgetPasswordDto);
      return sendResposne(
        res,
        201,
        "Password Verification Sended SuccessFully, Check Your Email",
        data
      );
    } catch (err) {
      next(err);
    }
  }

  public static async checkResetLink(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const params = Object.entries(req.params).length > 0 ? req.params : null;
      if (typeof params === null)
        throw new AppError(`Path Parameter is empty, Invalid Operation`, 401);
      const userId = req.params.id;
      const token = req.params.token;
      const data: any = await AuthService.checkResetLink(userId, token);
      return sendResposne(res, 201, "Verification of Reset Link", data);
    } catch (err) {
      next(err);
    }
  }

  public static async resetPassword(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.params.id;
      const ResetPasswordDto: IResetPasswordDto =
        Object.entries(req.body).length > 0 ? req.body : {};
      if (Object.entries(ResetPasswordDto).length === 0)
        throw new AppError(`All Fields Are Empty`, 401);
      const data: any = await AuthService.resetPassword(
        userId,
        ResetPasswordDto
      );
      return sendResposne(res, 201, "Password Reset SuccessFully", data);
    } catch (err) {
      next(err);
    }
  }
}
