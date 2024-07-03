import User from "../../database/models/User";
import Boom from "@hapi/boom";
import bcrypt from "bcryptjs";
import AppError from "../../utils/errorUtils/appError";
import { appendFile } from "fs";

//Get user profile
export const getUserProfile = async (userId: any) => {
  const user = await User.findById(userId).select("-password");
  if (!user) throw new AppError(`Not Found`, 403);
  return user;
};

// Update user profile (email, username, secondaryEmail)
export const updateUserProfile = async (userId: any, body: any) => {
  const { email, username, secondaryEmail } = body;

  // Check if email or username is already in use by another user
  const checkCommon = await User.findOne({
    $or: [{ email: email }, { username: username }],
    _id: { $ne: userId },
  });

  if (checkCommon) {
    throw new AppError(`Username or Email is already in use`, 401);
  }

  // Update user profile
  const updateFields: any = { username, email };
  if (secondaryEmail) {
    updateFields.secondaryEmail = secondaryEmail;
  }

  await User.updateOne({ _id: userId }, { $set: updateFields });

  const message = `User profile updated successfully`;
  return { message };
};

// Function to compare passwords
async function comparePasswords(enteredPassword: any, hashedPassword: any) {
  try {
    const passwordMatch = await bcrypt.compare(enteredPassword, hashedPassword);
    return passwordMatch;
  } catch (error) {
    throw new Error("Password comparison failed");
  }
}

export async function updatePassword(userId: any, body: any) {
  const { currentPassword, newPassword } = body;
  const user = await User.findOne({ _id: userId });

  if (!user) {
    throw new Error("User not found");
  }

  // Compare the current password with the stored hashed password
  const passwordMatch = await comparePasswords(currentPassword, user.password);

  if (!passwordMatch) {
    throw new AppError("Current password is incorrect", 403);
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  console.log(hashedPassword);

  await User.updateOne(
    { _id: userId },
    { password: hashedPassword },
    { new: true }
  );
  const message = `Password has been changed SuccessFully`;
  return { message: message };
}

// Deactivate user account
export const deactivateAccount = async (userId: string) => {
  await User.findByIdAndUpdate(userId, { isActive: false });
  const message = `Your account has been successfully deactivated`;
  return { message: message };
};

// Check if user account is deactivated
export const isAccountDeactivated = async (
  userId: string
): Promise<boolean> => {
  const user = await User.findById({ _id: userId });
  if (!user) {
    throw new Error("User not found");
  }
  return !user.isActive;
};

// Check if user account is active
export const isAccountActive = async (userId: string): Promise<boolean> => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  return user.isActive;
};

// Reactivate user account
export const reactivateAccount = async (userId: string) => {
  await User.findByIdAndUpdate(userId, { isActive: true });
};
