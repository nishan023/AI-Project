import {
  IForgetPasswordDto,
  ILoginDto,
  IPayload,
  IRegisterDto,
  IResetPasswordDto,
  IUser,
  IgoogleLoginResponse,
  IloginResponse,
} from "../../@types/interfaces";
import { JsonWebTokenUtils } from "../jwt.service";
import { passwordStrength } from "check-password-strength";
import { AuthServiceInterface } from "../implementation/auth.service.interface";
import { HttpStatusCode } from "axios";
import { NextFunction } from "express";

import isEmail from "validator/lib/isEmail";
import User from "../../database/models/User";
import AppError from "../../utils/errorUtils/appError";
import App from "../../server";
import tokenModel from "../../database/models/Token";
import makeRandomString from "../../utils/randomUtils/randomString";
import { sendEmail } from "../../helpers/sendEmail";
import envConfig from "../../config/env.config";
import { htmlEmail, textEmail } from "../../utils/randomUtils/mailContent";
import { OAuth2Client} from "google-auth-library";
import GmailUser from "../../database/models/GmailUsers";

const googleClient = new OAuth2Client(envConfig.GOOGLE_CLIENT_ID);

export async function verifyGoogleToken(token:string) {
  const ticket = await googleClient.verifyIdToken({
    idToken:token,
    audience:envConfig.GOOGLE_CLIENT_ID
  })
  
  return ticket.getPayload();
}

export class AuthService implements AuthServiceInterface {
  public static async registerUser({
    username,
    email,
    password,
  }: Partial<IRegisterDto>): Promise<string | undefined> {
    const checkUser = await User.find({
      $or: [
        {
          username: username,
        },
        {
          email: email,
        },
      ],
    }).countDocuments();
    if (checkUser.toString().startsWith("1"))
      throw new AppError(
        `${username} or ${email} You Entered Is Already Registered`,
        401
      );
    const user: IUser | any = await User.findOne({ username: username });
    // const strengthPass = passwordStrength(password).value;
    // if (strengthPass === "Weak" || strengthPass === "Too weak") {
    //   throw new AppError(
    //     `Dear ${username}, please enter a stronger password`,
    //     401
    //   );
    // }
    // if (password.length < 8)
    //   throw new AppError(`Password Should be 8 Character Long`, 401);
    const hashPassword = await JsonWebTokenUtils.HashPassword(password);
    const newUser = new User({
      username: username,
      email: email,
      password: hashPassword,
    });
    await newUser.save();
    const message = `${username} Has Been Registerd SuccessFully`;
    return message;
  }

  public static async loginUser({
    username,
    password,
  }: ILoginDto): Promise<Partial<IloginResponse>> {
    const checkUser = await User.findOne({
      username: username,
    }).countDocuments();
    if (checkUser.toString().startsWith("0"))
      throw new AppError(`Username Does Not Exists`, 401);

    const user = await User.findOne({ username: username });

    if (user?.get("password") === null || undefined)
      throw new AppError(`Password Field is Empty`, 401);

    const matchPassword = await JsonWebTokenUtils.comparePassword(
      password,
      user?.password
    );

    if (!matchPassword)
      throw new AppError(`The Password You Entered Is Incorrect`, 403);

    const userPayload: IPayload = {
      userId: user?._id,
      username: user?.username,
      email: user?.email,
    };

    const access_token = await JsonWebTokenUtils.createAccessToken(userPayload);
    if (
      access_token.split(" ").length === 0 ||
      access_token.toString().startsWith("0")
    )
      throw new AppError(
        `Token is Empty, Cannot Return An Appopriate Token`,
        HttpStatusCode.BadRequest
      );
    const LoginResponse: Partial<IloginResponse> = {
      _id: user?.id,
      username: user?.username,
      email: user?.email,
      access_token: access_token,
    };
    return LoginResponse;
  }

  public static async loginGmail(token: string){
      const userData = await verifyGoogleToken(token);
      const isUser = await GmailUser.findOne({gMail: userData?.email})
      if(isUser?.get("gMail")== null || undefined)
      {
        const gUser = new GmailUser({
            gMail: userData?.email,
            image: userData?.picture,
            username: userData?.name,
            isActive: true
        })

        await gUser.save();
      }

      const user =await GmailUser.findOne({gMail: userData?.email })

      

      const userPayload: IPayload = {
        email: user?.gMail,
        userId:user?._id,
        username: user?.username,
      }
  
      const access_token = await JsonWebTokenUtils.createAccessToken(userPayload);
      if (
        access_token.split(" ").length === 0 ||
        access_token.toString().startsWith("0")
      )
        throw new AppError(
          `Token is Empty, Cannot Return An Appopriate Token`,
          HttpStatusCode.BadRequest
        );

      const LoginResponse: Partial<IloginResponse> = {
        _id: user?.id,
        username: user?.username,
        email: user?.gMail,
        access_token: access_token,
      };

      return LoginResponse;
  }
  public static async forgetPassoword({ email }: IForgetPasswordDto) {
    const checkEmail = isEmail(email);
    if (!checkEmail) {
      throw new AppError(`Invalid Email`, 401);
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new AppError(
        "Email Does Not Exists,  Please Enter A valid Email",
        401
      );
    }
    if (user) {
      let token = await tokenModel.findOne({ userId: user._id });
      if (!token) {
        token = await new tokenModel({
          userId: user._id,
          token: makeRandomString(32),
        }).save();
      }
      const username = user.get("username");
      const link = `${envConfig.CLIENT_URL}reset-password/${user._id}/${token.token}`;
      const textContent = textEmail(username, link);
      const htmlContent = htmlEmail(username, link);
      await sendEmail(
        user.email,
        "Password Reset Request",
        textContent,
        htmlContent
      );
      return `${user.get(
        "fullname"
      )} Please Check Your Email, We Have Send you Reset Link`;
    }
  }

  public static async checkResetLink(
    userId: string | number,
    token: string | number
  ) {
    const response = await tokenModel.findOne({
      userId: userId,
      token: token,
    });
    if (!token) {
      throw new AppError("Reset link has expired", 400);
    }

    return "Reset link is valid.";
  }

  public static async resetPassword(
    userId: string | number,
    { password }: IResetPasswordDto
  ) {
    if (password.length < 8)
      throw new AppError(`Password Should be at least 8 characters`, 403);

    const user = await User.findOne({ _id: userId });
    if (!user) throw new AppError(`User Does not Exists`, 403);
    const checkExistPassword = await JsonWebTokenUtils.comparePassword(
      password,
      user.password
    );
    if (checkExistPassword) {
      throw new AppError(
        "The Password Match With Your Old Password, Please Enter Strong Password",
        401
      );
    }

    // if (passwordStrength(password).value.match("weak")) {
    //   throw new AppError(
    //     `${passwordStrength(password).value}, Please Enter A Strong Password`,
    //     401
    //   );
    // }
    const hashPass = await JsonWebTokenUtils.HashPassword(password);

    await User.findOneAndUpdate(
      {
        _id: userId,
      },
      { password: hashPass }
    );
    return "Password Changed Successfully";
  }
}
