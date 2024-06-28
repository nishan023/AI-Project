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
  _id?: string | number;
  username: string;
  email: string;
  password: string;
}
