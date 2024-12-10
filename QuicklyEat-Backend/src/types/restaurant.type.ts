import mongoose from "mongoose";

export type TRestaurant = {
  user: mongoose.Schema.Types.ObjectId;
  restaurantName:string;
  city:string;
  country:string;
  deliveryTime:number;
  minimumOrder:number;
  deliveryCharges: number;
  cuisines: string[];
  imageUrl:string;
  menus:mongoose.Schema.Types.ObjectId[];
  reviews:mongoose.Schema.Types.ObjectId[];
  averageRating: number;
  topRestuarant: boolean;
}

export type TRestaurantDocument = TRestaurant & mongoose.Document & {
  createdAt:Date;
  updatedAt:Date;
}