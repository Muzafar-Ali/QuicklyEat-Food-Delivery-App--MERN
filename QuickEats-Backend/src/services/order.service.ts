import ErrorHandler from "../utils/errorClass.js";
import { TCheckoutSessionRequest } from "../types/order.type.js";

export const createLineItems = (CheckoutSessionRequest: TCheckoutSessionRequest, menus: any) => {

  const lineItems = CheckoutSessionRequest.cartItems.map((cartItem: any ) => {
    const menuItem = menus
    .map((item: any) => item.menuItems.find((menuItem: any) => menuItem._id.toString() === cartItem.menuItemId))
    .find((item: any) => item !== undefined);

    if(!menuItem) throw new ErrorHandler(404,"Menu item id not found");

    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: menuItem.title,
          images: [menuItem.image]
        },
        unit_amount: menuItem.price * 100, //
      },
      quantity: cartItem.quantity,
    }
  })

  return lineItems;
}