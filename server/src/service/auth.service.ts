import { IRegisterDto, IUser } from "../@types/interfaces";
import { JsonWebTokenUtils } from "./jwt.service";
import { passwordStrength } from "check-password-strength";
import User from "../database/models/User";
import AppError from "../utils/errorUtils/appError";
import App from "../server";
import { AuthServiceInterface } from "./implementation/auth.service.interface";

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
}
