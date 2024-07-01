import bcrypt from "bcryptjs";
import { IPayload } from "../@types/interfaces";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { JwkKeyExportOptions, hash } from "crypto";
import envConfig from "../config/env.config";
import { rejects } from "assert";
import AppError from "../utils/errorUtils/appError";
import { HttpStatusCode } from "axios";
import { HTTPStatusCode } from "../constants/statusCodeConstant";

export class JsonWebTokenUtils {
  private static async GenerateSalt(salt: any) {
    return await bcrypt.genSalt(salt);
  }

  public static async HashPassword(password: string) {
    return bcrypt.hash(password, await this.GenerateSalt(10));
  }

  public static async comparePassword(
    oldPassword: string,
    hashPassword: string | any
  ) {
    return await bcrypt.compare(oldPassword, hashPassword);
  }

  public static async createAccessToken({ userId, username, email }: IPayload) {
    const payload: Required<IPayload> = {
      userId: userId,
      username: username,
      email: email,
    };
    const options = {
      issuer: "Project",
      expiresIn: "1h",
    };
    const SecretKey = envConfig.ACCESS_TOKEN;
    const token = await this.generateToken(
      payload,
      SecretKey as string,
      options
    );
    return token;
  }

  private static async generateToken(
    payload: any,
    SecretKey: string,
    options: {}
  ) {
    try {
      return jwt.sign(payload, SecretKey, options);
    } catch (err) {
      if (err instanceof JsonWebTokenError) {
        throw new AppError(err.message, HTTPStatusCode.BadGateway);
      }
      throw new AppError(
        `Internal Server Error`,
        HttpStatusCode.InternalServerError
      );
    }
  }
}
