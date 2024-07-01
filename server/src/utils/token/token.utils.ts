import * as jwt from "jsonwebtoken";
import envConfig from "../../config/env.config";

export const createAccessToken = (userId: any) => {
  return jwt.sign({ userId }, process.env.JWT_ACCESS_TOKEN_SECRET as string, {
    expiresIn: "1d",
  });
};

export const createRefreshToken = (userId: any) => {
  return jwt.sign({ userId }, process.env.JWT_REFRESH_TOKEN_SECRET as string, {
    expiresIn: "1d",
  });
};

export const verifyAccessToken = async (accessToken: string) => {
  return await jwt.verify(accessToken, envConfig.ACCESS_TOKEN as string);
};

export const verifyRefreshToken = (refreshToken: string) => {
  return jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_TOKEN_SECRET as string
  );
};
