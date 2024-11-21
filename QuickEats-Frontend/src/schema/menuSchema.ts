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

export type TMenu = z.infer<typeof menuSchema>;