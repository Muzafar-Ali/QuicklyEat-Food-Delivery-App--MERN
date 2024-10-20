import  omit from "lodash/omit.js";
import UserModel from "../models/user.model.js";
import { TUser } from "../schema/user.schema.js";
import ErrorHandler from "../utils/errorClass.js";
import config from "../config/config.js";

export const createUser = async (userData: TUser["body"], verificationToken: string) => {
 try {
  const UserExist = await UserModel.findOne({email: userData.email});
  if(UserExist) throw new ErrorHandler(409, "User already registered");

  const user = await UserModel.create({
    ...userData,
    verificationToken: verificationToken,
    verificationTokenExpiresAt: new Date(Date.now() + config.verificationTokenExpiry)
  });
  
  return omit(user.toJSON(), "password");

 } catch (error: any) {
  console.log("createUser error = ", error)
  if(error instanceof ErrorHandler) throw error;
  throw new ErrorHandler(500, "Internal server error");
 }
 
}

// export const getUser = async ( email: string, password: string ) => {
  
//   try {
//     const user = await UserModel.findOne({ email }).select("password");
//     // if(!user) throw new ErrorHandler(404, "incorrect email or password");
    
//     const isPasswordValid = await user.comparePassword(password)
//     // if(!isPasswordValid) throw new ErrorHandler(404, "incorrect email or password");
    
//     return user;
    
//   } catch (error) {
//     if(error instanceof ErrorHandler) throw error;
//     throw new ErrorHandler(500, "Internal server error");    
//   }

// }