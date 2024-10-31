import { Orders } from "./orderType";

export type TMenuItem = {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string;
}
export type Restaurant = {
    _id: string;
    user: string;
    restaurantName: string;
    city: string;
    country: string;
    deliveryTime: number;
    cuisines: string[];
    menus: TMenuItem[];
    imageUrl: string;
}

export type TSearchedRestaurant = {
    data:Restaurant[]
}

export type TRestaurantState = {
    loading: boolean;
    restaurant: Restaurant | null;
    searchedRestaurant: TSearchedRestaurant | null;
    appliedFilter:string[];
    singleRestaurant: Restaurant | null,
    restaurantOrder:Orders[],
    createRestaurant: (formData: FormData) => Promise<void>;
    getRestaurant: () => Promise<void>;
    updateRestaurant: (formData: FormData) => Promise<void>;
    searchRestaurant: (searchText: string, searchQuery: string, selectedCuisines: any) => Promise<void>;
    addMenuToRestaurant: (menu: TMenuItem) => void;
    updateMenuToRestaurant: (menu: TMenuItem) => void;
    setAppliedFilter: (value:string) => void;
    resetAppliedFilter: () => void;
    getSingleRestaurant: (restaurantId:string) => Promise<void>;
    getRestaurantOrders: () => Promise<void>;
    updateRestaurantOrder: (orderId:string, status:string) => Promise<void>;
}