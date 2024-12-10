import  omit from "lodash/omit.js";
import UserModel from "../models/user.model.js";
import { TUser } from "../schema/user.schema.js";
import ErrorHandler from "../utils/errorClass.js";
import config from "../config/config.js";

export const createUser = async (userData: TUser["body"], verificationCode: string) => {
 try {
  const UserExist = await UserModel.findOne({email: userData.email});
  if(UserExist) throw new ErrorHandler(409, "User already registered");

  const user = await UserModel.create({
    ...userData,
    verificationCode: verificationCode,
    verificationCodeExpiresAt: new Date(Date.now() + config.verificationTokenExpiry)
  });
  
  return omit(user.toJSON(), "password");

 } catch (error: any) {
  console.error("createUser error = ", error)
  if(error instanceof ErrorHandler) throw error;
  throw new ErrorHandler(500, "Internal server error");
 }
 
}