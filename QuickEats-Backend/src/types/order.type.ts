import mongoose from "mongoose";

type DeliveryDetails = {
    email: string;
    name: string;
    address: string;
    city: string;
}

type CartItems = {
    menuId: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
}

export type TOrder =  mongoose.Document & {
    user: mongoose.Schema.Types.ObjectId;
    restaurant: mongoose.Schema.Types.ObjectId;
    deliveryDetails: DeliveryDetails,
    cartItems: CartItems;
    totalAmount: number;
    status: "pending" | "confirmed" | "preparing" | "onTheWay" | "delivered"
}


export type TCheckoutSessionRequest = {
    cartItems: {
        menuId: string;
        name: string;
        image: string;
        price: number;
        quantity: number
    }[],
    deliveryDetails: {
        name: string;
        email: string;
        address: string;
        city: string
    },
    restaurantId: string
  }
  