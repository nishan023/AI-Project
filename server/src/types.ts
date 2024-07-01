import { Request } from "express";

declare global {
    namespace Express {
        interface Request{
            user?:any
        }
    }
}

  export interface UserJWTPayload {
      email: any;
      password: any
  }