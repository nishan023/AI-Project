import { Router } from "express";
import * as userProfileController from "../controller/profile/userProfile.controller";
import { authenticateToken } from "../middlewares/auth.middleware";
const userRouter = Router();

//Get profile
userRouter.get(
  "/user/profile",
  authenticateToken,
  userProfileController.getUserProfile
);

//  update email and username
userRouter.patch(
  "/user/profile/updateusername",
  authenticateToken,
  userProfileController.updateUserProfile
);

//  update password
userRouter.patch(
  "/user/profile/updatepassword",
  authenticateToken,
  userProfileController.updatePassword
);

// deactivate account
userRouter.delete(
  "/user/profile/deactivate",
  authenticateToken,
  userProfileController.deactivateAccount
);

// POST reactivate account
userRouter.post(
  "/user/profile/reactivate",
  authenticateToken,
  userProfileController.reactivateAccount
);

export default userRouter;
