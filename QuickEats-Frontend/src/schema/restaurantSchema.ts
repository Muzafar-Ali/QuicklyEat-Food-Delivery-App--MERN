import {z} from "zod";

export const restaurantSchema = z.object({
  restaurantName: z.string({
    invalid_type_error: "Restaurant name must be a string"
  }).min(1, 'Restaurant name is required'),

  city: z.string({
    invalid_type_error: "City must be a string"
  }).min(1, 'City is required'),

  country: z.string({
    invalid_type_error: "Country must be a string"
  }).min(1, 'Country is required'),

  deliveryTime: z.number({
    required_error: "Delivery time is required",
    invalid_type_error: "Delivery time must be a number"
  }).positive(),

  minimumOrder: z.number({
    required_error: "Delivery time is required",
    invalid_type_error: "Delivery time must be a number"
  }).positive(),

  deliveryCharges: z.number({
    invalid_type_error: "Delivery charges must be a number"
  }).default(0).optional(),

  cuisines:z.array(z.string()),
  image:z.instanceof(File).optional().refine((file) => file?.size !== 0, {message:"Image file is required"}),

});
  
export type TRestaurantSchema = z.infer<typeof restaurantSchema>;
