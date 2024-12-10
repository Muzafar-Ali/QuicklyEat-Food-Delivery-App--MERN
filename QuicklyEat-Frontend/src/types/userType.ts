import { TUserLogin, TUserSignup } from "@/schema/userSchema";

export type TUser = {
  fullname:string;
  email:string;
  contact:number;
  address:string;
  city:string;
  country:string;
  profilePicture:string;
  admin:boolean;
  isVerified:boolean;
}

export type TUserState = {
  user: TUser | null;
  isAuthenticated: boolean;
  isCheckingAuth: boolean;
  loading: boolean;
  signup: (input: TUserSignup) => Promise<boolean | undefined>;
  login: (input: TUserLogin) => Promise<boolean | undefined>;
  verifyEmail: (verificationCode: string) => Promise<boolean | undefined>;
  checkAuthentication: () => Promise<boolean | undefined>;
  logout: () => Promise<boolean | undefined>;
  forgotPassword: (email: string) => Promise<boolean | undefined>; 
  resetPassword: (token: string, newPassword:string) => Promise<boolean | undefined>; 
  updateProfile: (input: any) => Promise<boolean | undefined>;
}