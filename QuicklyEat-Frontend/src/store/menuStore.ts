import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useRestaurantStore } from "./restaurantStore";
import config from "@/config/config";

type MenuState = {
  loading: boolean,
  menu: null,
  createMenu: (formData: FormData) => Promise<boolean>;
  getAllMenus: () => Promise<any>;
  updateMenu: (menuId: string, formData: FormData) => Promise<void>;
  // deleteMenu: (menuId: string, formData: FormData) => Promise<void>;
  createMenuItem: (formData: FormData) => Promise<boolean>;

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
        return result.data.success;
      }
      
    } catch (error: any) {
      toast.error(error.response.data.message);
      set({ loading: false });
    }
  },
  getAllMenus: async () => {
    try {
      set({ loading: true });
      const result = await axios.get(`${config.baseUri}/api/v1/menu/all`);

      if(result.data.success){
        set({loading:false});
        return result.data.menus;
      }
      set({ loading: false });
      return;
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
      useRestaurantStore.getState().updateRestaurantMenu(result.data.menu._id);
    } catch (error: any) {
      toast.error(error.response.data.message);
      set({ loading: false });
    }
  },
  // deleteMenu: async (menuId:string) => {
  //   try {
  //     set({ loading: true });
  //     const result = await axios.delete(`${config.baseUri}/api/v1/menu/${menuId}`, {
  //       withCredentials: true,
  //     });

  //     if(result.data.success){
  //       toast.success(result.data.message);
  //       set({loading:false, menu:null});
  //     }
  //     // update restaurant menu
  //     useRestaurantStore.getState().deleteMenuToRestaurant(menuId);
  //   } catch (error: any) {
  //     toast.error(error.response.data.message);
  //     set({ loading: false });
  //   }
  // }, 
  createMenuItem: async (formData: FormData) => {
    try {
      set({ loading: true });
      const result = await axios.post(`${config.baseUri}/api/v1/menu/item`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
      
      console.log('result', result.data);
      
      if(result.data.success){
        toast.success(result.data.message);
        set({loading:false});
        return result.data.success;
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
      set({ loading: false });
    }
  },
}), {
  name: "menu-name",
  storage: createJSONStorage(() => localStorage)
}))