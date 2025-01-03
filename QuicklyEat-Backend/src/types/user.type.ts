import mongoose, { Document } from "mongoose";

export type TUser = {
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string
  contact: number;
  address: string;
  city: string;
  country: string;
  profilePicture: string;  
  admin: boolean;
  favourite: mongoose.Schema.Types.ObjectId[];
  comparePassword(candidatePassword: string): Promise<boolean>;
  // optional properties
  lastLogin?: Date;
  isVerified?: boolean;
  resetPasswordToken?: string,
  resetPasswordTokenExpiresAt?: Date;
  verificationCode: string | null;
  verificationCodeExpiresAt: Date | null,
}

export type TUserDocument = TUser & Document & {
  createdAt: Date;
  updatedAt: Date;
}; 

