import { IResponseObject, statusConstant } from "../@types/interfaces";
import { Response } from "express";
export const sendResposne = (
  res: Response,
  statusCode: number,
  message: string,
  data = null,
  dataLen = null
) => {
  const responseObject: IResponseObject = {
    statusCode,
    message,
    status: statusCode.toString().startsWith("2")
      ? statusConstant.SUCCESS
      : statusConstant.BAD_REQUEST,
  };

  if (data !== null || data) {
    responseObject.data = data;
  }

  return res.status(statusCode).json(responseObject);
};
