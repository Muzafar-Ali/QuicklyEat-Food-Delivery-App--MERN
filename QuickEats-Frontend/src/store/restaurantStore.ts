import config from "@/config/config";
import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useRestaurantStore = create<any>()(persist((set) => ({
  loading: false,
  restaurant: null,
  createRestaurant: async(FormData: FormData) => {
    try {
      set({ loading: true })

      const result = await axios.post(`${config.baseUri}/api/v1/restaurant`, FormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      })
      
      if(result.data.success) {
        toast.success(result.data.message);
        set({ restaurant: result.data.restaurant, loading: false });
      }

    } catch (error: any) {
      toast.error(error.response.data.message);
      set({ loading: false });
    } finally {
      set({ loading: false });
    }
  },
  getRestaurant: async () => {
    try {
      set({ loading: true });
      const response = await axios.get(`${config.baseUri}/api/v1/restaurant`, {
        withCredentials: true,
      });
      if (response.data.success) {
        set({ loading: false, restaurant: response.data.restaurant });
      }
    } catch (error: any) {
      if (error.response.status === 404) {
          set({ restaurant: null });
      }
      set({ loading: false });
    }
},
updateRestaurant: async (formData: FormData) => {
  try {
    set({ loading: true });
    const response = await axios.put(`${config.baseUri}/api/v1/restaurant`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      withCredentials: true,
    });
    if (response.data.success) {
      toast.success(response.data.message);
      set({ loading: false });
    }
  } catch (error: any) {
    toast.error(error.response.data.message);
    set({ loading: false });
  }
},
}), {
  name: 'restaurant-name',
  storage: createJSONStorage(() => localStorage)
}))