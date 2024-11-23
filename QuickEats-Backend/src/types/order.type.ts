import mongoose from "mongoose";

type DeliveryDetails = {
  email: string;
  name: string;
  address: string;
}

type CartItem = {
  menuItem: mongoose.Schema.Types.ObjectId;  // Reference to the MenuItem model
  quantity: number;  // Quantity of the item in the order
  price: number;     
}

export type TOrder = {
  user: mongoose.Schema.Types.ObjectId;      
  restaurant: mongoose.Schema.Types.ObjectId; 
  deliveryDetails: DeliveryDetails;           
  cartItems: CartItem[];                     
  totalAmount: number;                        
  status: "pending" | "confirmed" | "preparing" | "onTheWay" | "delivered";  // Order status
}

export type TOrderDocument = TOrder & mongoose.Document & {
  createdAt:Date;
  updatedAt:Date;
}

export type TCheckoutSessionRequest = {
  cartItems: {
    menuItemId: mongoose.Schema.Types.ObjectId;  
    quantity: number;                          
  }[],
  deliveryDetails: {
    name: string;
    email: string;
    address: string;
    city: string;
  },
  restaurantId: string;  
}
