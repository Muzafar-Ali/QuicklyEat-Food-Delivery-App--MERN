import { z } from 'zod';

const restaurantSchema = z.object({
  body: z.object({
    restaurantName: z.string({
      required_error: 'Restaurant name is required',
      invalid_type_error: "Restaurant name must be a string"
    }).min(1, 'Restaurant name is required'),

    city: z.string({
      required_error: 'City is required',
      invalid_type_error: "City must be a string"
    }).min(1, 'City is required'),

    country: z.string({
      required_error: 'Country is required',
      invalid_type_error: "Country must be a string"
    }).min(1, 'Country is required'),
   
    // Since delivery time is always received as a string from FormData, 
    // After validation, transform the string into a number to match the restaurant model requirements.
    deliveryTime: z.string().refine((val) => !isNaN(Number(val)), {
      message: "Delivery time must be a number"
    }).transform((val) => Number(val)), // Converts string to number after validation
   
    minimumOrder: z.string().refine((val) => !isNaN(Number(val)), {
      message: "Delivery time must be a number"
    }).transform((val) => Number(val)), // Converts string to number after validation
    
    deliveryCharges: z.string().refine((val) => !isNaN(Number(val)), {
      message: "Delivery time must be a number"
    }).transform((val) => Number(val)), // Converts string to number after validation

    cuisines: z.string({
      required_error: 'At least one cuisine is required',
      invalid_type_error: "Cuisines must be a string"
    }).array(),

    menus: z.string({
      required_error: 'At least one menu item is required',
      invalid_type_error: "Menus must be a string"
    }).array().optional(),

  })
});

export const RestaurantDocumentSchema = restaurantSchema.extend({
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Update restaurant schema
export const updateRestaurantSchema = z.object({
  body: z.object({
    restaurantName: z.string({
      required_error: 'Restaurant name is required',
      invalid_type_error: "Restaurant name must be a string"
    }).min(1, 'Restaurant name is required').optional(),

    city: z.string({
      required_error: 'City is required',
      invalid_type_error: "City must be a string"
    }).min(1, 'City is required').optional(),

    country: z.string({
      required_error: 'Country is required',
      invalid_type_error: "Country must be a string"
    }).min(1, 'Country is required').optional(),
   
    // Since delivery time is always received as a string from FormData, 
    // After validation, transform the string into a number to match the restaurant model requirements.
    deliveryTime: z.string().refine((val) => !isNaN(Number(val)), {
      message: "Delivery time must be a number"
    }).transform((val) => Number(val)).optional(), // Converts string to number after validation

    minimumOrder: z.string().refine((val) => !isNaN(Number(val)), {
      message: "Delivery time must be a number"
    }).transform((val) => Number(val)).optional(), // Converts string to number after validation
    
    deliveryCharges: z.string().refine((val) => !isNaN(Number(val)), {
      message: "Delivery time must be a number"
    }).transform((val) => Number(val)).optional(), // Converts string to number after validation

    cuisines: z.string({
      required_error: 'At least one cuisine is required',
      invalid_type_error: "Cuisines must be a string"
    }).array().optional(),

    menus: z.string({
      required_error: 'At least one menu item is required',
      invalid_type_error: "Menus must be a string"
    }).array().optional(),
  })
});

export type TRestaurant = z.infer<typeof restaurantSchema>;
export type TRestaurantDocument = z.infer<typeof RestaurantDocumentSchema>;
export type TUpdateRestaurant = z.infer<typeof updateRestaurantSchema>;

export default restaurantSchema;