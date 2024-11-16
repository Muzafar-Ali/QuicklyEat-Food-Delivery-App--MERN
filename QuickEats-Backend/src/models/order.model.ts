import mongoose from "mongoose";
import { TOrderDocument } from "../types/order.type.js";

const orderSchema = new mongoose.Schema<TOrderDocument>({
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
  },
  cartItems: [
    {
      menuItem: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'MenuItem', // Referencing MenuItem (not Menu)
        required: true 
      },
      quantity: { 
        type: Number, 
        required: true 
      },
      price: { 
        type: Number, 
        required: true 
      },
    },
  ],
  totalAmount: Number,
  status:{
    type: String,
    enum: ["pending" , "confirmed" , "preparing" , "onTheWay" , "delivered"],
    required: true
  }

}, { timestamps: true });

const OrderModel = mongoose.model<TOrderDocument>("Order", orderSchema)

export default OrderModel