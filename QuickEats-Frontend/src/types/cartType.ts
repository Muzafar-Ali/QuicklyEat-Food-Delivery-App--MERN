import { TMenuItem } from "./restaurantType";

export type CartItem = TMenuItem & { 
    quantity:number;
}

export type CartState = {
    cart: CartItem[];
    addToCart:(item: TMenuItem) => void;
    clearCart: () => void;
    removeFromTheCart: (id: string) => void;
    increaseQuantity: (id: string) => void;
    decreasetQuantity: (id: string) => void;
}