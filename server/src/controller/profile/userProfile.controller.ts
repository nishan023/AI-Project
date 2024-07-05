import { Request, Response, NextFunction } from "express";
import * as userProfileService from "../../service/Profile/userProfile.service";

//get profile
export const getUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user.userId;
    const isActive = await userProfileService.isAccountActive(userId);
    if (!isActive) {
      return res.status(403).json({
        message:
          "Your account is deactivated and cannot access profile information.",
      });
    }
    const userProfile = await userProfileService.getUserProfile(userId);
    res.json(userProfile);
  } catch (error) {
    next(error);
  }
};

// update email or username
export const updateUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user.userId;
    // Check if the account is active
    const isActive = await userProfileService.isAccountActive(userId);
    if (!isActive) {
      return res.status(403).json({
        message:
          "Your account is deactivated and cannot update profile information.",
      });
    }
    const updatedProfile = await userProfileService.updateUserProfile(
      userId,
      req.body
    );
    res.json(updatedProfile);
  } catch (err) {
    next(err);
  }
};

//  update password
export const updatePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user.userId;
    // Check if the account is active
    const isActive = await userProfileService.isAccountActive(userId);
    if (!isActive) {
      return res.status(403).json({
        message: "Your account is deactivated and cannot update password.",
      });
    }
    const data = await userProfileService.updatePassword(userId, req.body);
    return res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

//  deactivate account
export const deactivateAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user.userId;

    const isDeactivated = await userProfileService.isAccountDeactivated(userId);
    if (isDeactivated) {
      return res.status(400).json({
        message: "Your account is already deactivated.",
      });
    }

    const data = await userProfileService.deactivateAccount(userId);
    return res.status(203).json({
      message: "Your account is Deactivated.",
    });
  } catch (err) {
    next(err);
  }
};

//  reactivate account
export const reactivateAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user.userId;

    // Check if the account is already active
    const isActive = await userProfileService.isAccountActive(userId);
    if (isActive) {
      return res.status(400).json({
        message: "Your account is already active.",
      });
    }

    await userProfileService.reactivateAccount(userId);
    res.status(200).json({
      message: "Your account has been successfully reactivated.",
    });
  } catch (err) {
    next(err);
  }
};
