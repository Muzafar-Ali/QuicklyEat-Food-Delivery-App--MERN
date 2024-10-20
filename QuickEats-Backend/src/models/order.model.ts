import mongoose from "mongoose";
import { TOrder } from "../types/order.type.js";

const orderSchema = new mongoose.Schema<TOrder>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  deliveryDetails:{
    email:{type: String, required: true},
    name:{type: String, required: true},
    address:{type: String, required: true},
    city:{type: String, required: true},
  },
  cartItems:[
    {
      menuId:{type: String, required: true},
      name:{type: String, required: true},
      image:{type: String, required: true},
      price:{type: Number, required: true},
      quantity:{type: Number, required: true},
    }
  ],
  totalAmount: Number,
  status:{
    type: String,
    enum: ["pending" , "confirmed" , "preparing" , "onTheWay" , "delivered"],
    required: true
  }


}, { timestamps: true });

export const OrderModel = mongoose.model<TOrder>("Order", orderSchema)