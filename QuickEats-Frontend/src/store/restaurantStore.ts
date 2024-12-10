import { TRestaurantState } from "@/types/restaurantType";
import { TMenuItem } from "@/types/menuType";
import { toast } from "sonner";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useUserStore } from "./userStore";
import config from "@/config/config";
import axios from "axios";

export const useRestaurantStore = create<TRestaurantState>()(persist((set, get) => ({
  loading: false,
  userRestaurant: null,
  appliedFilter: [],
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
        set({ loading: false });
        useUserStore.getState().updateProfile({admin:true})
      }

    } catch (error: any) {
      toast.error(error.response.data.message);
      set({ loading: false });
    } finally {
      set({ loading: false });
    }
  },
  getRestaurantbyUserId: async () => {
    try {
      set({ loading: true });
      const response = await axios.get(`${config.baseUri}/api/v1/restaurant`, {
        withCredentials: true,
      });
      
      if (response.data.success) {
        set({ loading: false, userRestaurant: response.data.restaurant });
      }
    } catch (error: any) {
      if (error.response.status === 404) {
        set({ userRestaurant: null });
      }
      set({ loading: false });
    }
},
getSingleRestaurant: async (restaurantId: string) => {
  try {
    set({ loading: true });
    const response = await axios.get(`${config.baseUri}/api/v1/restaurant/${restaurantId}`);

    if (response.data.success) {
      set({ loading: false})
    }  
    return response.data.restaurant;
  } catch (error) { 
    console.error(error);
    set({ loading: false });
  }
},
getAllRestaurant: async () => {
  try {
    set({ loading: true });
    
    const response = await axios.get(`${config.baseUri}/api/v1/restaurant/all`);
    if (response.data.success) {
      set({ loading: false });
    }

    return response.data.restaurants;
  } catch (error) {
    console.error(error);
  } finally {
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
addMenuToRestaurant: async (menu: TMenuItem) => {
  try {
    set({ loading: true });

    const response = await axios.put(`${config.baseUri}/api/v1/restaurant`, menu, {
      headers: {
        'Content-Type': 'application/json'
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

// addMenuToRestaurant: (menu: TMenuItem) => {
//   set((state: any) => ({
//     restaurant: state.restaurant ? { ...state.restaurant, menus: [...state.restaurant.menus, menu] } : null,
//   }))
// },
updateMenuToRestaurant: (updatedMenu: TMenuItem) => {
  set((state: any) => {
      
    if (state.restaurant) {
      const updatedMenuList = state.restaurant.menus.map((menu: any) => menu._id === updatedMenu._id ? updatedMenu : menu);
      return {
        restaurant: {
          ...state.restaurant,
          menus: updatedMenuList
        }
      }
    }
    // if state.restaruant is undefined then return state
    return state;
  })
},
getRestaurantOrders: async () => {
  try {
    const response = await axios.get(`${config.baseUri}/api/v1/restaurant/order`, {
      withCredentials: true
    });
    
    if (response.data.success) {
      set({ loading: false });
    }
    
    return response.data.order
  } catch (error: any) {
    toast.error(error.response.data.message);
    console.error(error);
  }
},
updateRestaurantOrderStatus: async (orderId: string, status: string) => {
  try {
    const response = await axios.put(`${config.baseUri}/api/v1/order/status/${orderId}`, { status }, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    });
    
    if (response.data.success) {
      toast.success(response.data.message);
    }

  } catch (error: any) {
    toast.error(error.response.data.message);
  }
},
manageAppliedFilter: (selectedValue: string) => {
  set((state: any) => {
    // Check if the selectedValue is already in the appliedFilter array 
    const isFilterApplied = state.appliedFilter.includes(selectedValue);
        
    // Update the filter based on whether selectedValue is already applied
    // If it's already applied, remove it from the filter
    // If it's not applied, add it to the filter
    const updatedFilter = isFilterApplied ? state.appliedFilter.filter((item: string) => item !== selectedValue) : [...state.appliedFilter, selectedValue]; 
    
    // Return the updated state with the new appliedFilter
    return { appliedFilter: updatedFilter }
  })
},
removeAppliedFilter: () => {
  set({ appliedFilter: [] })
},
getSearchedRestaurant: async (searchQuery?: string) => {
  try {
    set({ loading: true });
    const params = new URLSearchParams();
    
    if(get().appliedFilter.length > 0) {
      params.set("cuisines", get().appliedFilter?.join(","));   
      const response = await axios.get(`${config.baseUri}/api/v1/restaurant/search/?${params.toString()}`);
      if (response.data.success) {
        set({ loading: false });
      }
      return response.data.restaurants;
    }
    
    if(searchQuery) {
      params.set("searchQuery", searchQuery!);
      const response = await axios.get(`${config.baseUri}/api/v1/restaurant/search/?${params.toString()}`);
      if (response.data.success) {
        set({ loading: false });
      }
      return response.data.restaurants;
    }
    
  } catch (error) {
    set({ loading: false });
  }
},

}), {
  name: 'restaurant',
  storage: createJSONStorage(() => localStorage)
}))