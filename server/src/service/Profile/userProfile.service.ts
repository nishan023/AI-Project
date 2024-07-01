import User from "../../database/models/User";
import Boom from "@hapi/boom";
import bcrypt from "bcryptjs";
import AppError from "../../utils/errorUtils/appError";
import { appendFile } from "fs";

//Get user profile
export const getUserProfile = (userId: any) => {
  const user =  User.findOne({_id:userId})
  if(!user) throw new AppError(`Not Found`,403)
    return user;
};

// Update user profile (email or username)
export const updateUserProfile = async (userId: any, body: any) => {
  const { email, username } = body;

  const checkCommon = await User.findOne({$or:[{
    email:email
  },{
    username:username
  }]})
  // Check email
  if(checkCommon) throw new AppError(`Username or Email Is Already Use`,401)
  

  // Update user profile
  const updatedUser =await User.updateOne({_id : userId},{$set:{username:username,email:email}})
  console.log(updatedUser.matchedCount)
  return `user has been updated`
};

// // Update user password
// export const updatePassword = async (userId: string, body: any) => {
//   const { currentPassword, newPassword } = body;
//   // Find the user by ID
//   const user = await User.findById(userId);
//   if (!user) {
//     throw Boom.notFound("User not found");
//   }

//   // Check if the current password matches
//   const isMatch = await currentPassword; // need to fix
//   if (!isMatch) {
//     throw Boom.badRequest("Current password is incorrect");
//   }

//   // Update the password
//   user.password = newPassword;
//   await user.save();
// };

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
  const {currentPassword, newPassword }= body;
    const user = await User.findOne({_id :userId})

    if (!user) {
      throw new Error("User not found");
    }

    // Compare the current password with the stored hashed password
    const passwordMatch = await comparePasswords(
      currentPassword,
      user.password
    );

    if (!passwordMatch) {
 

      throw new AppError("Current password is incorrect",403);
      
    } 
    const hashedPassword = await bcrypt.hash(newPassword, 10);
 
    await User.updateOne({_id : userId}, {password:hashedPassword}, {new :true})
   const message = `Password has been changed SuccessFully`
   return {message : message}

}

// Deactivate user account
export const deactivateAccount = async (userId: string) => {
  await User.findByIdAndUpdate(userId, { isActive: false });
};
