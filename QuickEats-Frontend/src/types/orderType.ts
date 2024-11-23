
export type TCheckoutSessionRequest = {
  cartItems:{
    menuItemId:string;
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
  totalAmount:string;
}
export type TOrders =  TCheckoutSessionRequest & {
  _id:string;
  status:string;
  totalAmount:number;
}

export type TOrderState = {
  loading:boolean;
  createCheckoutSession: (checkoutSessionRequest: TCheckoutSessionRequest) => Promise<void>;
  getOrderDetails: () => Promise<[]>;
}

export type TOrder = {
  _id: string,
  status: string,

  cartItems: {
    menuItemId: {
      title: string,
      description: string,
      image: string,
      price: number,
      menu: string,
      _id: string
    },
    price: number,
    quantity: number
    _id: string
  }[],
  deliveryDetails: {
    name: string,
    email: string,
    address: string,
  },
  restaurantId: string,
  userId: string,
  totalAmount: number
}