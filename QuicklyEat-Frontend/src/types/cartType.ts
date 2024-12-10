import { TMenuItem } from "./menuType";

export type CartItem = TMenuItem & { 
    quantity:number;
}

export type CartState = {
    cart: CartItem[];
    restaurantId: string;
    addToCart:(item: TMenuItem, restaurantId: string) => void;
    clearCart: () => void;
    removeFromTheCart: (id: string) => void;
    increaseQuantity: (id: string) => void;
    decreasetQuantity: (id: string) => void;
}