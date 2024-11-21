import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useRestaurantStore } from "./restaurantStore";
import config from "@/config/config";

type MenuState = {
  loading: boolean,
  menu: null,
  createMenu: (formData: FormData) => Promise<void>;
  updateMenu: (menuId: string, formData: FormData) => Promise<void>;
  deleteMenu: (menuId: string, formData: FormData) => Promise<void>;
}

export const useMenuStore = create<MenuState>()(persist((set) => ({
  loading: false,
  menu: null,
  createMenu: async (formData: FormData) => {
    try {
      set({ loading: true });
      const result = await axios.post(`${config.baseUri}/api/v1/menu`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      if (result.data.success) {
        toast.success(result.data.message);
        set({ loading: false, menu: result.data.menu });
      }
      
    } catch (error: any) {
      toast.error(error.response.data.message);
      set({ loading: false });
    }
  },
  updateMenu: async (menuId:string, formData: FormData) => {
    try {
      set({ loading: true });
      const result = await axios.put(`${config.baseUri}/api/v1/menu/${menuId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
      
      if(result.data.success){
        toast.success(result.data.message);
        set({loading:false, menu:result.data.menu});
      }
      // update restaurant menu
      useRestaurantStore.getState().updateMenuToRestaurant(result.data.menu._id);
    } catch (error: any) {
      toast.error(error.response.data.message);
      set({ loading: false });
    }
  },
  deleteMenu: async (menuId:string, formData: FormData) => {
    try {
      set({ loading: true });
      const result = await axios.delete(`${config.baseUri}/api/v1/menu/${menuId}`, {
        withCredentials: true,
      });

      if(result.data.success){
        toast.success(result.data.message);
        set({loading:false, menu:null});
      }
      // update restaurant menu
      useRestaurantStore.getState().deleteMenuToRestaurant(menuId);
    } catch (error: any) {
      toast.error(error.response.data.message);
      set({ loading: false });
    }
  }
}), {
  name: "menu-name",
  storage: createJSONStorage(() => localStorage)
}))