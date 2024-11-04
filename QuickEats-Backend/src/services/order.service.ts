import mongoose from "mongoose";
import ErrorHandler from "../utils/errorClass.js";

type CheckoutSessionRequest = {
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

export const createLineItems = (CheckoutSessionRequest: CheckoutSessionRequest, menuItems: any) => {

  const lineItems = CheckoutSessionRequest.cartItems.map((cartItem: any ) => {
    const menuItem = menuItems.find((item: any) => item._id.toString() === cartItem.menuId);    
    if(!menuItem) throw new ErrorHandler(404,"Menu item id not found");

    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: menuItem.name,
          images: [menuItem.image]
        },
        unit_amount: menuItem.price * 100, //
      },
      quantity: cartItem.quantity,
    }
  })

  return lineItems;
}