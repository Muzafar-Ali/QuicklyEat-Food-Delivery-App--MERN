import { z } from 'zod';

const restaurantSchema = z.object({
  user: z.string().uuid(),
  restaurantName: z.string().min(1, 'Restaurant name is required'),
  city: z.string().min(1, 'City is required'),
  country: z.string().min(1, 'Country is required'),
  deliveryTime: z.number().positive(),
  cuisines: z.array(z.string()).min(1, 'At least one cuisine is required'),
  imageUrl: z.string().url(),
  menus: z.array(z.string()).min(1, 'At least one menu item is required'),
});

const RestaurantDocumentSchema = restaurantSchema.extend({
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type TRestaurantDocument = z.infer<typeof RestaurantDocumentSchema>;
export default restaurantSchema;