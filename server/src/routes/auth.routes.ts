import { Router } from "express";
const authRouter: Router = Router();
import { AuthController } from "../controller/auth/auth.controller";

authRouter.post("/auth/register", AuthController.register);

export default authRouter;
