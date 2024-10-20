import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "../config/config.js";
import { TUserDocument } from "../types/user.type.js";

const userSchema = new mongoose.Schema<TUserDocument>({
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  contact: {
    type: Number,
    required: true
  },
  address: {
    type: String,
    default: "Update your address"
  },
  city:{
    type:String,
    default:"Update your city"
  },
  country:{
    type:String,
    default:"Update your country"
  },
  profilePicture:{
    type:String,
    default:"",
  },
  admin:{type:Boolean, default:false},
  // advanced authentication
  lastLogin:{
    type:Date,
    default:Date.now
  },
  isVerified:{
    type:Boolean,
    default:false
  },    
  resetPasswordToken:String,
  resetPasswordTokenExpiresAt:Date,
  verificationToken:String,
  verificationTokenExpiresAt:Date,
},{timestamps:true});




userSchema.pre('save', async function (next) {
  let user = this as TUserDocument;
  
  if (!user.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(config.saltWorkFactor);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    next();
  } catch (error: any) {
    console.error('Error during password hashing:', error);
    next(error); // Ensure next is called to propagate the error
  }
});

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  const user = this as TUserDocument;
  
  try {
    return await bcrypt.compare(candidatePassword, user.password);
  } catch (error: any) {
    console.error('compared password error = ', error); // Log the error if needed
    return false;
  }
};

const UserModel = mongoose.model<TUserDocument>("User", userSchema);
export default UserModel;