import { z } from 'zod';

const restaurantSchema = z.object({
  body: z.object({
    restaurantName: z.string().min(1, 'Restaurant name is required'),
    city: z.string().min(1, 'City is required'),
    country: z.string().min(1, 'Country is required'),
    deliveryTime: z.number().positive(),
    cuisines: z.array(z.string()).min(1, 'At least one cuisine is required'),
    imageUrl: z.string().url(),
    menus: z.array(z.string()).min(1, 'At least one menu item is required'),
  })
});

export const RestaurantDocumentSchema = restaurantSchema.extend({
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Update restaurant schema
export const updateRestaurantSchema = z.object({
  body: z.object({
    restaurantName: z.string().min(1, 'Restaurant name is required').optional(),
    city: z.string().min(1, 'City is required').optional(),
    country: z.string().min(1, 'Country is required').optional(),
    deliveryTime: z.number().positive().optional(),
    cuisines: z.array(z.string()).min(1, 'At least one cuisine is required').optional(),
    imageUrl: z.string().url().optional(),
    menus: z.array(z.string()).min(1, 'At least one menu item is required').optional(),
  })
});

export type TRestaurant = z.infer<typeof restaurantSchema>;
export type TRestaurantDocument = z.infer<typeof RestaurantDocumentSchema>;
export type TUpdateRestaurant = z.infer<typeof updateRestaurantSchema>;

export default restaurantSchema;