import {z} from "zod";

export const userSignupSchema = z.object({
    fullname:z.string({
        required_error:"Fullname is required",
        invalid_type_error:"Fullname must be a character"
    }).min(1,"Fullname is required"),

    email:z.string({
        required_error:"Email is required",
    }).email("Invalid email address"),

    password:z.string({
        required_error:"Password is required",
    }).min(8, "Password must be at least 8 characters."),
    
    confirmPassword: z.string({
        required_error: "Confirm password is required",
    }).min(8, "Password must be at least 8 characters."),

    contact: z.number({
        required_error: "Contact is required",
        invalid_type_error: "Contact must be a number",
    }).nonnegative("Contact must be a non-negative number"),

});

export type TSignup = z.infer<typeof userSignupSchema>;

export const userLoginSchema = z.object({ 
    email:z.string({
        required_error:"Email is required",
    }).email("Invalid email address"),
    password:z.string({
        required_error:"Password is required",
    }).min(6, "Password must be at least 6 characters.") 
});

export type TLogin = z.infer<typeof userLoginSchema>;