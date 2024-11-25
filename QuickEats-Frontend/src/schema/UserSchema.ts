import {z} from "zod";

export const userSignupSchema = z.object({
  fullname:z.string({
    invalid_type_error:"Fullname must be a character"
  }).min(1,"Full name is required"),

  email:z.string({
      required_error:"Email is required",
  }).email("Invalid email address"),

  // password:z.string({
  //   required_error:"Password is required",
  // }).min(8, "Password must be at least 8 characters."),
  
  password: z.string({
    required_error: "Password is required",
  })
  .min(8, "Password must be at least 8 characters")
  .regex(/(?=.*[a-z])/, "Password must contain at least one lowercase letter")
  .regex(/(?=.*[A-Z])/, "Password must contain at least one uppercase letter")
  .regex(/(?=.*[0-9])/, "Password must contain at least one digit")
  .regex(/(?=.*[!@#$%^&*])/, "Password must contain at least one special character"),
  
  // confirmPassword: z.string({
  //   required_error: "Confirm password is required",
  // }).min(8, "Password must be at least 8 characters."),

  contact: z.number({
    required_error: "Contact is required",
    invalid_type_error: "Contact must be a number",
  }).nonnegative("Contact must be a non-negative number"),
  admin: z.boolean().optional(),
});

export type TUserSignup = z.infer<typeof userSignupSchema>;

export const userLoginSchema = z.object({ 
  email:z.string({
    required_error:"Email is required",
  }).email("Invalid email address"),
  password:z.string({
    required_error:"Password is required",
  }).min(1, "Password is required") 
});

export type TUserLogin = z.infer<typeof userLoginSchema>;