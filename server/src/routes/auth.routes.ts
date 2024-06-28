import { Router } from "express";
const authRouter: Router = Router();
import { AuthController } from "../controller/auth.controller";

authRouter.post("/auth/register", AuthController.register);

export default authRouter;
