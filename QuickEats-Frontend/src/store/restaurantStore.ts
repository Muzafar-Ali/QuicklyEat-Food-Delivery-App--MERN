import config from "@/config/config";
import { TOrders } from "@/types/orderType";
import { TMenuItem, TRestaurantState } from "@/types/restaurantType";
import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useRestaurantStore = create<TRestaurantState>()(persist((set, get) => ({
  loading: false,
  restaurant: null,
  appliedFilter: [],
  searchedRestaurant: null,
  singleRestaurant: null,
  restaurantOrder: [],
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
  getRestaurantbyUserId: async () => {
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
getSingleRestaurant: async (restaurantId: string) => {
  try {
    const response = await axios.get(`${config.baseUri}/api/v1/restaurant/${restaurantId}`);
    if (response.data.success) {
      set({ singleRestaurant: response.data.restaurant })
    }
  } catch (error) { }
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
addMenuToRestaurant: (menu: TMenuItem) => {
  set((state: any) => ({
    restaurant: state.restaurant ? { ...state.restaurant, menus: [...state.restaurant.menus, menu] } : null,
  }))
},
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
      set({ restaurantOrder: response.data.order });
    }
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
      const updatedOrder = get().restaurantOrder.map((order: TOrders) => {
        return order._id === orderId ? { ...order, status: response.data.status } : order;
      })
      set({ restaurantOrder: updatedOrder });
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
searchRestaurant: async (searchText: string, searchQuery: string, selectedCuisines: any) => {
  try {
    console.error("working 1");
    
    set({ loading: true });

    const params = new URLSearchParams();
    params.set("searchQuery", searchQuery);
    params.set("selectedCuisines", selectedCuisines.join(","));

    // await new Promise((resolve) => setTimeout(resolve, 2000));
    const response = await axios.get(`${config.baseUri}/api/v1/restaurant/search/${searchText}?${params.toString()}`);
    console.error('response =', response);
    

    if (response.data.success) {
        set({ loading: false, searchedRestaurant: response.data });
    }
    
  } catch (error) {
    set({ loading: false });
  }
},

}), {
  name: 'restaurant-name',
  storage: createJSONStorage(() => localStorage)
}))