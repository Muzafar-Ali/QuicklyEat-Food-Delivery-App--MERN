import ErrorHandler from "../utils/errorClass.js";

const cartItems = [
  {
    id: 1,
    name: "Product 1",
    price: 10,
    quantity: 2,
  },
  {
    id: 2,
    name: "Product 2",
    price: 15,
    quantity: 1,
  },
  {
    id: 3,
    name: "Product 3",
    price: 20,
    quantity: 3,
  },
];

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
    const menuItem = menuItems.find((item: any) => item._id === cartItem.menuId);
    if(!menuItem) throw new ErrorHandler(404,"Menu item id not found");
    

    return {
      price_data: {
        currency: "US",
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