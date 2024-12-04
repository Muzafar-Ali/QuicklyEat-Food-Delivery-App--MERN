import { TCheckoutSessionRequest, TOrderState } from "@/types/orderType";
import { toast } from "sonner";
import { create } from "zustand";
import config from "@/config/config";
import axios from "axios";

export const useOrderStore = create<TOrderState>()((set => ({
  loading: false,
  createCheckoutSession: async (checkoutSession: TCheckoutSessionRequest) => {
    try {
      set({ loading: true });
      const response = await axios.post(`${config.baseUri}/api/v1/order/checkout/create-checkout-session`, checkoutSession, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      
      if(response.data.success) {
        toast.success(response.data.message);
      }
      
      window.location.href = response.data.session.url;
      set({ loading: false });

    } catch (error: any) {
      toast.error(error.response.data.message);
      console.error(error);
      set({ loading: false });
    }
  },
  getOrderDetails: async () => {
    try {
      set({loading: true});
      const response = await axios.get(`${config.baseUri}/api/v1/order/all`, {
        withCredentials: true
      });
      if(response.data.success) {
        set({loading: false});
      }

      return response.data.orders;
      
    } catch (error) {
      set({loading: false});
    }
  },
  getOrderByUserId: async () => {
    try {
      set({loading: true});
      const response = await axios.get(`${config.baseUri}/api/v1/order/user`, {
        withCredentials: true
      });
      
      if(response.data.success) {
        set({loading: false});
      }

      return response.data.order;
      
    } catch (error) {
      set({loading: false});
    }
  }
})),)