import config from "@/config/config";
import { TCheckoutSessionRequest, TOrderState } from "@/types/orderType";
import axios from "axios";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useOrderStore = create<TOrderState>()(persist((set => ({
  loading: false,
  orders: [],
  createCheckoutSession: async (checkoutSession: TCheckoutSessionRequest) => {
    try {
      set({ loading: true });
      const response = await axios.post(`${config.baseUri}/api/v1/order/checkout/create-checkout-session`, checkoutSession, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      
      window.location.href = response.data.session.url;
      set({ loading: false });

    } catch (error) {
      console.error(error);
      set({ loading: false });
    }
  },
  getOrderDetails: async () => {
    try {
      set({loading:true});
      const response = await axios.get(`${config.baseUri}/api/v1/order`);
    
      set({loading:false, orders:response.data.order});
    } catch (error) {
      set({loading:false});
    }
  }
})), {
  name: 'order-name',
  storage: createJSONStorage(() => localStorage)
}))