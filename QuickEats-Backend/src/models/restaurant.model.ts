import mongoose from "mongoose";
import { TRestaurantDocument } from "../types/restaurant.type.js";

const restaurantSchema = new mongoose.Schema<TRestaurantDocument>({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },
  restaurantName:{
    type:String,
    required:true
  },
  city:{
    type:String,
    required:true
  },
  deliveryTime:{
    type:Number,
    required:true
  },
  cuisines:[{
    type:String, 
    required:true
  }],
  menus:[{
    type:mongoose.Schema.Types.ObjectId, 
    ref:'Menu'
  }],
    imageUrl:{
      type:String,
      required:true
    }
},{timestamps:true});

const RestaurantModel = mongoose.model<TRestaurantDocument>('Restaurant', restaurantSchema);

export default RestaurantModel;