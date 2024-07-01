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
      const updatedProfile = await userProfileService.updateUserProfile(userId, req.body);
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
      const userId = req.params.id; 
      await userProfileService.deactivateAccount(userId);
      res.status(204).send();
  } catch (err) {
      next(err);
  }
};

