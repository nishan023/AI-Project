import { Request } from "express";

declare global {
    namespace Express {
        interface Request{
            user?:any
        }
    }
}

  export interface UserJWTPayload {
      id: any;
      email: any;
      password: any
  }