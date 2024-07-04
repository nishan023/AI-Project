import Boom from "@hapi/boom";
import { Response, NextFunction, Request } from "express";
import {  UserJWTPayload } from "../types";
import { verifyAccessToken } from "../utils/token/token.utils";


// Middleware to authenticate user JWT token.
export async function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {

   const token = req.headers['authorization']
  if (!token) {
    throw Boom.badRequest("Missing authentication token");
  }

  console.log(token+"This is the supposed token")
  try {
    const decodedToken = await verifyAccessToken(token);
    console.log(decodedToken)
    req.user = decodedToken as UserJWTPayload;

    next();
  } catch (error) {
    throw Boom.unauthorized("User is not logged in");
  }
}


