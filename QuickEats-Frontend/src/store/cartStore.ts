import { CartState } from "@/types/cartType";
import { TMenuItem } from "@/types/restaurantType";
import { stat } from "fs";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";


export const useCartStore = create<CartState>()(persist((set, get) => ({
  cart: [],
  restaurantId: '',
  addToCart: (item: TMenuItem, restaurantId: string) => {
    set((state) => {
      state.restaurantId = restaurantId;
      const exisitingItem = state.cart.find((cartItem) => cartItem._id === item._id);
      if (exisitingItem) {
        // already added in cart then inc qty
        return {
          cart: state?.cart.map((cartItem) => cartItem._id === item._id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
          )
        };
      } else {
        // add cart
        return {
          cart: [...state.cart, { ...item, quantity: 1 }]
        };
      };
    })
  },
  clearCart: () => {
    set({ cart: [], restaurantId: '' });
  },
  removeFromTheCart: (id: string) => {
    set((state) => ({
      cart: state.cart.filter((item) => item._id !== id)
    }))
    if(get().cart.length === 0){
      set({restaurantId: ''})
    }
  },
  increaseQuantity: (id: string) => {
    set((state) => ({
      cart: state.cart.map((item) => item._id === id ? { ...item, quantity: item.quantity + 1 } : item)
    }))
  },
  decreasetQuantity: (id: string) => {
    set((state) => ({
      cart: state.cart.map((item) => item._id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item)
    }))
  }
}),
  {
    name: 'cartitems',
    storage: createJSONStorage(() => localStorage)
  }
))