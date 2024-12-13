import { create } from 'zustand'
import { createJSONStorage, persist } from "zustand/middleware";
import { toast } from 'sonner';
import { TUserState } from '@/types/userType';
import { TUserLogin, TUserSignup } from '@/schema/userSchema';
import config from '../config/config';
import axios from 'axios';
import { useRestaurantStore } from './restaurantStore';

console.log(config.baseUri);

export const useUserStore = create<TUserState>()(persist((set) => ({
  user: null,
  isAuthenticated: false,
  isCheckingAuth: true,
  loading: false,
  signup: async (userInut: TUserSignup) => {
    try {
      set({ loading: true })
      
      const response = await axios.post(`${config.baseUri}/api/v1/signup`, userInut , {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true,
      })

      if(response.data.success) {       
        toast.success(response.data.message)
        set({ 
          user: response.data.user, 
          isAuthenticated: true, 
          loading: false 
        })
        return true;
      }

    } catch (error: any) {
      const errorMessage = error.response?.data?.message ?? "server not responding. Please try again later.";
      toast.error(errorMessage)
      set({ loading: false })
    }
  },

  login: async (userInut: TUserLogin) => {
    try {      
      set({ loading: true })
      const response = await axios.post(`${config.baseUri}/api/v1/login`, userInut , {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true,
      })

      if(response.data.success) {
        set({
          user: response?.data?.user,
          isAuthenticated: true,
          loading: false
        })
        return true;
      }

    } catch (error: any) {
      const errorMessage = error.response?.data?.message ?? "server not responding. Please try again later.";
      toast.error(errorMessage)
      set({ loading: false })
    }
  },

  logout: async () => {
    try {
      set({ loading: true })
      const response = await axios.post(`${config.baseUri}/api/v1/logout`);
      
      if(response.data.success) {
        toast.success(response?.data?.message)
        set({
          user: null,
          isAuthenticated: false,
          loading: false
        })

        useRestaurantStore.getState().userRestaurant = null
        localStorage.removeItem("user-name");
        localStorage.removeItem("restaurant");

        return true;
      }
      return false;

    } catch (error: any) {
      const errorMessage = error.response?.data?.message ?? "server not responding. Please try again later.";
      toast.error(errorMessage)
      set({ loading: false })
    }
  },

  forgotPassword: async (email: string) => {
    try {
      set({ loading: true });
      const response = await axios.post(`${config.baseUri}/api/v1/forgot-password`, { email });

      if (response.data.success) {
        toast.success(response.data.message);
        set({ loading: false });
        return true;
      }

    } catch (error: any) {
      const errorMessage = error.response?.data?.message ?? "server not responding. Please try again later.";
      toast.error(errorMessage)
      set({ loading: false });
    }
  },

  resetPassword: async (token: string, newPassword: string) => {
    try {
      set({ loading: true });
      
      const response = await axios.post(`${config.baseUri}/api/v1//reset-password/${token}`, { newPassword });
      
      if (response.data.success) {
        toast.success(response.data.message);
        set({ loading: false });
        return true;
      }
      
    } catch (error: any) {
      const errorMessage = error.response?.data?.message ?? "server not responding. Please try again later.";
      toast.error(errorMessage)
      set({ loading: false });
    }
  },

  verifyEmail: async (verificationCode: string) => {
    try {
      set({ loading: true })      
      const response = await axios.post(`${config.baseUri}/api/v1/verify`, { verificationCode }, {
        headers: {
          'Content-Type': 'application/json'
        },
      });

      if(response.data.success) {
        toast.success(response.data.message)
        set({
          user: response.data.user,
          isAuthenticated: true,
          loading: false
        })
        return true;
      }

    } catch (error: any) {
      const errorMessage = error.response?.data?.message ?? "server not responding. Please try again later.";
      toast.error(errorMessage)
      set({ loading: false })
    } finally {
      set({ loading: false })
    }
  },
  
  updateProfile: async (userInut: TUserSignup) => {
    console.log('userInut', userInut);
    
    try {
      set({ loading: true })
      
      const response = await axios.put(`${config.baseUri}/api/v1/update`, userInut,{
        headers:{
          'Content-Type':'application/json'
        },
        withCredentials: true
      });

      if(response.data.success) {       
        toast.success(response.data.message)
        set({ 
          user: response.data.user, 
          isAuthenticated: true, 
          loading: false 
        })
        return true;
      }
      return false;

    } catch (error: any) {
      const errorMessage = error.response?.data?.message ?? "server not responding. Please try again later.";
      toast.error(errorMessage)
      set({ loading: false })
      return false;
    }
  },

  checkAuthentication: async () => {
    try {
      set({ isCheckingAuth: true });
      const response = await axios.get(`${config.baseUri}/api/v1/check-auth`);
      if (response.data.success) {
        set({user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
        return true;
      }
    } catch (error) {
      set({isAuthenticated: false, isCheckingAuth: false });
    }
  },
  
}),
  {
    name: 'user-name',
    storage: createJSONStorage(() => localStorage),
  }
))