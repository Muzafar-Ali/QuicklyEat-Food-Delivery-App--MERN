import { create } from 'zustand'
import { createJSONStorage, persist } from "zustand/middleware";
import { TUserLogin, TUserSignup } from '@/schema/userSchema';
import { toast } from 'sonner';
import axios from 'axios';
import config from '../config/config';
import { TUserState } from '@/types/userType';


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
      toast.error(error.response.data.message)
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
      })

      if(response.data.success) {
        set({
          user: response.data.user,
          isAuthenticated: true,
          loading: false
        })
        return true;
      }

    } catch (error: any) {
      toast.error(error.response.data.message);
      set({ loading: false })
    }
  },
  logout: async () => {
    try {
      set({ loading: true })
      const response = await axios.post(`${config.baseUri}/api/v1/logout`);
      
      if(response.data.success) {
        toast.success(response.data.message)
        set({
          user: null,
          isAuthenticated: false,
          loading: false
        })

        // Clear the cookie
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        // Clear the local storage entry
        localStorage.removeItem("user-name");

        return true;
      }

    } catch (error: any) {
      toast.error(error.response.data.message);
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
      toast.error(error.response.data.message);
      set({ loading: false });
    }
  },
  // resetPassword: async (token: string, newPassword: string) => {
  //   try {
  //     set({ loading: true });
  //     const response = await axios.post(`${config.baseUri}/api/v1/reset-password/${token}`, { newPassword });
  //     if (response.data.success) {
  //       toast.success(response.data.message);
  //       set({ loading: false });
  //       return true;
  //     }
  //   } catch (error: any) {
  //     toast.error(error.response.data.message);
  //     set({ loading: false });
  //   }
  // },
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
      toast.error(error.response.data.message)
      set({ loading: false })
    } finally {
      set({ loading: false })
    }
  },

  // updateProfile: async (input:any) => {
  //   try { 
  //     const response = await axios.put(`${config.baseUri}/api/v1/profile/update`, input,{
  //       headers:{
  //         'Content-Type':'application/json'
  //       }
  //     });
  //     if(response.data.success){
  //       toast.success(response.data.message);
  //       set({user:response.data.user, isAuthenticated:true});
  //       return true;
  //     }
  //   } catch (error:any) { 
  //     toast.error(error.response.data.message);
  //   }
  // },

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