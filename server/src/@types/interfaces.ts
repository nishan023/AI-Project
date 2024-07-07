import { ObjectId } from "mongoose";
import { string } from "zod";

type StrUnd = string | undefined;

export interface IRegisterDto {
  username: string;
  email: string;
  password: string | any;
}

export enum statusConstant {
  SUCCESS = "SUCCESS",
  BAD_REQUEST = "BAD_REQUEST",
}

export interface IResponseObject {
  statusCode: number;
  message: string;
  status: string;
  data?: any;
  dataLe?: any;
}

export interface IUser {
  _id?: any;
  username: StrUnd;
  email: StrUnd;
  password: string;
}

export interface IPayload {
  userId: string | ObjectId | any;
  username: StrUnd;
  email: StrUnd;
}

export interface IResetPasswordDto {
  password: string;
}

export interface IForgetPasswordDto {
  email: string;
}

export interface IloginResponse extends IUser {
  access_token: string;
}

export interface IgoogleLoginResponse extends IPayload{
  picture: StrUnd;
}

export interface ILoginDto  {
  username: StrUnd;
  password:string;
}
