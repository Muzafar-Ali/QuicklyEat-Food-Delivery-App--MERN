import { z } from "zod";


const menuSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: "menu title must be a string"
    }).min(1, "menu title is required"),
    price: z.number({
      invalid_type_error: "price must be a number"
    }).min(1, " price is required").nonnegative({ message: "price must be a positive number" }),
    description: z.string({
      invalid_type_error: "description must be a string"
    }).min(1, "description is required"),
  })
})

export type TMenu = z.infer<typeof menuSchema>;


const updateMenuSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: "menu title must be a string"
    }).optional(),
    price: z.number({
      invalid_type_error: "price must be a number"
    }).optional(),
    description: z.string({
      invalid_type_error: "description must be a string"
    }).optional(),
  })
})

export type TUpdateMenu = z.infer<typeof updateMenuSchema>;

const idSchema = z.object({
  params: z.object({
    id: z.string({
      required_error: "menu id is required",
      invalid_type_error: "menu id must be a string",
    }).min(1, "menu id is required")
  })
});

export type TId = z.infer<typeof idSchema>;



export { updateMenuSchema, menuSchema, idSchema };