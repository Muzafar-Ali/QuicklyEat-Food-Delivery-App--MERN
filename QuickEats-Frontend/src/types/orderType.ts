export type TCheckoutSessionRequest = {
  cartItems:{
      menuId:string;
      name:string;
      image:string;
      price:string;
      quantity:string;
  }[];
  deliveryDetails:{
      name:string;
      email:string;
      contact:string;
      address:string;
      city:string;
      country:string
  },
  restaurantId:string;
}
export type TOrders =  TCheckoutSessionRequest & {
  _id:string;
  status:string;
  totalAmount:number;
}

export type TOrderState = {
  loading:boolean;
  orders: TOrders[];
  createCheckoutSession: (checkoutSessionRequest: TCheckoutSessionRequest) => Promise<void>;
  getOrderDetails: () => Promise<void>;
}