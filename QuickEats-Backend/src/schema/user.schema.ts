import mongoose from "mongoose";
import { z } from "zod";

 const userSchema = z.object({
  body: z.object({

    fullname: z.string({
      required_error: "Fullname is required",
      invalid_type_error: "Fullname must be a character",
    }).min(3,"Fullname must be at least 3 characters"),
  
    email: z.string({
      required_error: "Email is required",
    }).email({ message: "Invalid email address",}),
    
    password: z.string({
      required_error: "Password is required",
    })
    .min(8, "Password must be at least 8 characters")
    .regex(/(?=.*[a-z])/, "Password must contain at least one lowercase letter")
    .regex(/(?=.*[A-Z])/, "Password must contain at least one uppercase letter")
    .regex(/(?=.*[0-9])/, "Password must contain at least one digit")
    .regex(/(?=.*[!@#$%^&*])/, "Password must contain at least one special character"),
  
    confirmPassword: z.string({
      required_error: "Confirm password is required",
    }).min(8, "Password must be at least 8 characters."),
  
    contact: z.number({
      required_error: "Contact is required",
      invalid_type_error: "Contact must be a number",
    }).nonnegative("Contact must be a non-negative number"),
    
    address: z.string({
      required_error: "Address is required",
    }).min(1, "Address is required"),
  
    city: z.string({
      required_error: "City is required",
    }).min(1, "City is required"),
    
    country: z.string().min(1, "Country is required"),
    
    profilePicture: z.string({
      required_error: "Profile picture is required",
    }).url(),
    
    admin: z.boolean().default(false).optional(),
  })
});


// schema for login 
// export const loginSchema = userSchema.pick({
//   email: true,
//   password: true,
// });
export const loginSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: "Email is required",
    }).email({ message: "Invalid email address",}),
    
    password: z.string({
      required_error: "Password is required",
    })
    .min(8, "Password must be at least 8 characters")
    .regex(/(?=.*[a-z])/, "Password must contain at least one lowercase letter")
    .regex(/(?=.*[A-Z])/, "Password must contain at least one uppercase letter")
    .regex(/(?=.*[0-9])/, "Password must contain at least one digit")
    .regex(/(?=.*[!@#$%^&*])/, "Password must contain at least one special character"),
  })
})

// verify email schema  
export const verifyEmailSchema = z.object({
  body: z.object({
    verificationToken: z.string({
      required_error: "Verification token is required",
      invalid_type_error: "Verification token must be a string",
    }).min(1, "verfication token is missing"),
  })
})

export type TUser = z.infer<typeof userSchema>;
export type TUserLogin = z.infer<typeof loginSchema>;
export type TVerifyEmail = z.infer<typeof verifyEmailSchema>;




export default userSchema;

