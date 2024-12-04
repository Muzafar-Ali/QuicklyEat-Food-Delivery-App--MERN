import {z} from "zod";

export const menuSchema = z.object({
  name:z.string({
    invalid_type_error:"Name must be a string"
  }).min(1, "Name is required"),

  description:z.string({
    invalid_type_error:"Description must be a string"
  }).min(1, "Description is required"),
  
  image:z.instanceof(File).optional().refine((file) => file?.size !== 0, {message:"Image file is required"}),

});

export type TMenuSchema = z.infer<typeof menuSchema>;

export const menuItemSchema = z.object({
  title: z.string({
    invalid_type_error:"Title must be a string"
  }).min(1, "Title is required"),

  description: z.string({
    invalid_type_error:"Description must be a string"
  }).min(1, "Description is required"),

  price: z.number({
    invalid_type_error:"Price must be a number"
  }).min(1, "Price is required"),
  
  menu: z.string({
    invalid_type_error:"Menu must be a string"
  }).min(1, "Menu is required"),

  image:z.instanceof(File).optional().refine((file) => file?.size !== 0, {message:"Image file is required"}),

})

export type TMenuItemSchema = z.infer<typeof menuItemSchema>;

