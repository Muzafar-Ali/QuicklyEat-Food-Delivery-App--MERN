import UserModel from "../models/user.model.js";
import ErrorHandler from "../utils/errorClass.js";
import omit from "lodash/omit.js";
import mongoose from "mongoose";
import { NextFunction, Request, Response } from "express";
import { TUser, TUserLogin, TUserUpdate, TVerifyEmail, verifyEmailSchema } from "../schema/user.schema.js";
import { createUser } from "../services/user.service.js";
import { generateAndSetJwtToken } from "../utils/generateJwtToken.js";
import { generateVerificationCode } from "../utils/generateVerificationToken.js";
import config from "../config/config.js";
import { sendVerificationEmail, sendWelcomeEmail } from "../mailtrap/emails.js";

export const signupHandler = async (req: Request<{}, {}, TUser["body"]>, res: Response, next: NextFunction) => {
  try {
    const userData = req.body;

    const verificationCode = generateVerificationCode()

    const user = await createUser(userData, verificationCode);
    if(!user) throw new ErrorHandler(404, "Failed to create user");

    const userId = user._id as mongoose.Types.ObjectId;
    generateAndSetJwtToken(res, userId);

    // send welcome email
    // await sendWelcomeEmail(user.email, user.fullname)

    res.status(201).json({ 
      success: true,
      message: 'User created successfully',
      user: user, 
    });

  } catch (error: any) {
    console.log("signupHandler error = ", error)
    next(error);   
  }  
}

export const loginHanlder = async (req: Request<{}, {}, TUserLogin["body"]>, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
  
    if(!email || !password) throw new ErrorHandler(400, "Email and password are required");

    const user = await UserModel.findOne({ email });  
    if(!user) throw new ErrorHandler(404, "incorrect email or password");

    const isPasswordValid = await user.comparePassword(password)
    if(!isPasswordValid) throw new ErrorHandler(404, "incorrect email or password");

    const userId = user._id as mongoose.Types.ObjectId;
    generateAndSetJwtToken(res, userId)

    user.lastLogin = new Date();
    await user.save();

    res.status(200).json({
      success: true,
      message: `Welcome Back ${user.fullname}`,
      user:  omit(user.toJSON(), "password"),
    })
  
  } catch (error) {
    console.log("loginHanlder error = ", error)
    next(error)
 
  }
}

export const verifyEmailHandler = async (req: Request<{}, {}, TVerifyEmail["body"]>, res: Response, next: NextFunction) => {
  try {    
    const { verificationCode } = req.body;
    console.log('verificationCode', verificationCode);
    
    if(!verificationCode) throw new ErrorHandler(400, "Verification token is required");
    
    const user = await UserModel.findOne({
      verificationCode: verificationCode, 
      verificationCodeExpiresAt: {$gt: new Date()}
    }).select("-password");

    if(!user) throw new ErrorHandler(404, "Invalid or expired verification token");
    
    user.isVerified = true;
    user.verificationCode = null;
    user.verificationCodeExpiresAt = null;
    await user.save();
    
    // send verification email
    // await sendVerificationEmail(user.email, verificationToken)

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: user,
    })

  } catch (error) {
    console.log("verifyEmailHandler error = ", error)
    next(error)
  }
}

export const logoutHandler = async (_: Request, res: Response, next: NextFunction) => {
  try {
    // res.cookie("token", "", { expires: new Date(Date.now()) });
     res.clearCookie("token").status(200).json({
      success: true, 
      message: "Logged out successfully"
    });

  } catch (error) {
    console.log("logoutHandler error = ", error)
    next(error)
  }
}

export const forgotPasswordHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {email} = req.body;

    const user = await UserModel.findOne({email});
    if(!user) throw new ErrorHandler(404, "User doesn't exist");

    // const resetToken = Crypto.randomBytes(20).toString("hex");
    const resetToken = crypto.getRandomValues(new Uint8Array(20)).join('').toString();
    console.log("resetToken = ", resetToken)

    const resetTokenExpiresAt = new Date(Date.now() + config.passwordResetTokenTokenExpiry); // 1 hour

    user.resetPasswordToken = resetToken,
    user.resetPasswordTokenExpiresAt = resetTokenExpiresAt,
    user.save();

     // send reset paaword email
    //  await sendPasswordResetEmail(user.email, `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`); 
    
    res.status(200).json({
      success: true,
      message: "Password reset link sent to your email"
    })

  } catch (error) {
    console.log("forgotPasswordHandler error = ", error)
    next(error)    
  }
}

export const resetPassword = async (req: Request, res: Response) => {}

export const checkAuth = async (req: Request, res: Response) => {}

export const updateProfileHandler = async (req: Request<{}, {}, TUserUpdate["body"]>, res: Response, next: NextFunction) => {
  try {
    const userId = req.id;
    const image = req.file;
    const {fullname, email, contact, country } = req.body;

    const updateData: any = {};
    if (fullname) updateData.fullname = fullname;
    if (email) updateData.email = email;
    if (contact) updateData.contact = contact;
    if (country) updateData.country = country;

    const user = await UserModel.findByIdAndUpdate(userId, updateData, {new: true}).select("-password");
    if(!user) throw new ErrorHandler(404, "User not found");

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: user,
    })
    
  } catch (error) {
    console.log("updateProfileHandler error = ", error)
    next(error)
  }
}