import { Router } from "express";
const authRouter: Router = Router();
import { AuthController } from "../controller/auth/auth.controller";

authRouter.post("/auth/register", AuthController.register);
authRouter.post("/auth/login", AuthController.login);
authRouter.post("/auth/forget-password", AuthController.forgetPassword);
authRouter.get("/auth/login-google",AuthController.googleLogin);
authRouter.get(
  "/auth/check-reset-link/:id/:token",
  AuthController.checkResetLink
);
authRouter.post("/auth/reset-password/:id", AuthController.resetPassword);

export default authRouter;
