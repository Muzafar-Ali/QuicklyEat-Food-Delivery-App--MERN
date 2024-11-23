import { TOrders } from "./orderType";

export type TMenuItem = {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  menu: string;
}

export type TMenu = {
  _id: string;
  name: string;
  description: string;
  menuItems: TMenuItem[]
}

export type TRestaurant = {
  _id: string;
  user: string;
  restaurantName: string;
  city: string;
  country: string;
  deliveryTime: number;
  cuisines: string[];
  menus: TMenu[];
  imageUrl: string;
}

export type TSearchedRestaurant = {
  data: TRestaurant[]
}

export type TAllRestaurants = {
  data: TRestaurant[]
}

export type TRestaurantState = {
  loading: boolean;
  userRestaurant: TRestaurant | null;
  appliedFilter: string[];
  createRestaurant: (formData: FormData) => Promise<void>;
  getRestaurant?: () => Promise<void>;
  getRestaurantbyUserId: () => Promise<void>;
  getAllRestaurant: () => Promise<TRestaurant[]>
  getRestaurantOrders: () => Promise<TOrders[]>;
  getSingleRestaurant: (restaurantId:string) => Promise<TRestaurant>;
  getSearchedRestaurant: (searchQuery?: string) => Promise<TRestaurant[]>
  updateRestaurant: (formData: FormData) => Promise<void>;
  addMenuToRestaurant: (menu: TMenuItem) => void;
  updateMenuToRestaurant: (menu: TMenuItem) => void;
  manageAppliedFilter: (value:string) => void;
  removeAppliedFilter: () => void;
  updateRestaurantOrderStatus: (orderId:string, status:string) => Promise<void>;
}
