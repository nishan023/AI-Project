import Boom from "@hapi/boom";
import { Response, NextFunction, Request } from "express";
import { UserJWTPayload } from "../types";
import { verifyAccessToken } from "../utils/token/token.utils";

// Middleware to authenticate user JWT token.
//  async function authenticateToken(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(' ')[1];
//   if (!token) {
//     throw Boom.badRequest("Missing authentication token");
//   }

//   try {
//     const decodedToken = await verifyAccessToken(token);
//     console.log(decodedToken);
//     req.user = decodedToken as UserJWTPayload;

//     next();
//   } catch (error) {
//     console.log(error)
    
//     throw Boom.unauthorized("User is not logged in");
//   }
// }


export async function authenticateToken(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const token =
        req.headers.authorization && req.headers.authorization.split(' ')[1]
        console.log(token);
        
    if (!token) {
        throw Boom.badRequest('Missing authentication token')
    }

    try {
        const decodedToken = await verifyAccessToken(token)
        req.user = decodedToken as UserJWTPayload

        next()
    } catch (error) {
        throw Boom.unauthorized('User is not logged in')
    }
}