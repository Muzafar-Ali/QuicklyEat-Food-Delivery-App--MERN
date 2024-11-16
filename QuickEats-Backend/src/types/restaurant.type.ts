import mongoose from "mongoose";

export type TRestaurant = {
  user: mongoose.Schema.Types.ObjectId;
  restaurantName:string;
  city:string;
  country:string;
  deliveryTime:number;
  cuisines: string[];
  imageUrl:string;
  menus:mongoose.Schema.Types.ObjectId[]
}

export type TRestaurantDocument = TRestaurant & mongoose.Document & {
  createdAt:Date;
  updatedAt:Date;
}