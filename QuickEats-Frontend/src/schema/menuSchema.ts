import {z} from "zod";

export const menuSchema = z.object({
    name:z.string({
      invalid_type_error:"Name must be a string"
    }).min(1, "Name is required"),

    description:z.string({
      invalid_type_error:"Description must be a string"
    }).min(1, "Description is required"),

    price: z.number({
      invalid_type_error: "Price must be a number"
  }).positive({
      message: "Price must be a positive number"
  }).max(9999.99, "Price cannot exceed $9999.99"),
  
  image:z.instanceof(File).optional().refine((file) => file?.size !== 0, {message:"Image file is required"}),

});
export type TMenuSchema = z.infer<typeof menuSchema>;