import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import { API_BASE_URL } from "../config";

axios.defaults.withCredentials = true;

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      userEmail: null,
      isAuthenticated: false,
      error: null,
      isLoading: false,
      isCheckingAuth: true,
      message: null,

      setUserEmail: (email) => set({ userEmail: email }),

      signup: async (email, password, name) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.post(`${API_BASE_URL}/api/auth/signup`, {
            email,
            password,
            name,
          });
          set({
            user: response.data.user,
            isLoading: false,
          });
        } catch (error) {
          set({
            error: error.response?.data?.message || "Error signing up",
            isLoading: false,
          });
          throw error;
        }
      },

      resendOTP: async (email) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.post(`${API_BASE_URL}/api/auth/resend-otp`, {
            email,
          });
          set({
            message: response.data.message || "OTP resent successfully",
            isLoading: false,
          });
          return response.data;
        } catch (error) {
          set({
            error: error.response?.data?.message || "Error resending OTP",
            isLoading: false,
          });
          throw error;
        }
      },

      verifyEmail: async (code) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.post(`${API_BASE_URL}/api/auth/verify-email`, {
            code,
          });
          set({
            user: response.data.user,
            isAuthenticated: true,
            isLoading: false,
          });
          return response.data;
        } catch (error) {
          set({
            error: error.response?.data?.message || "Error verifying email",
            isLoading: false,
          });
          throw error;
        }
      },

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
            email,
            password,
          });
          set({
            isAuthenticated: true,
            user: response.data.user,
            error: null,
            isLoading: false,
          });
          return response.data;
        } catch (error) {
          set({
            error: error.response?.data?.message || "Error logging in",
            isLoading: false,
          });
          throw error;
        }
      },
      // logout: async () => {
      //   try {
      //     await axios.post(`${API_BASE_URL}/api/auth/logout`);

      //     // ✅ Reset Zustand + clear localStorage
      //     useAuthStore.persist.clearStorage();
      //     window.location.href = "/login";
      //     console.log("logoynn");
      //   } catch (error) {
      //     console.error("Logout error:", error);
      //     throw error;
      //   }
      // },
      logout: async () => {
        try {
          await axios.post(`${API_BASE_URL}/api/auth/logout`);
      
          // ✅ Reset in-memory Zustand state
          set({
            user: null,
            isAuthenticated: false,
            error: null,
            message: null,
          });
      
          // ✅ Clear localStorage
          useAuthStore.persist.clearStorage();
        } catch (error) {
          console.error("Logout error:", error);
          throw error;
        }
      },

      checkAuth: async () => {
        set({ isCheckingAuth: true, error: null });
        try {
          const response = await axios.get(`${API_BASE_URL}/api/auth/check-auth`);
          set({
            user: response.data.user,
            isAuthenticated: true,
            isCheckingAuth: false,
          });
        } catch (error) {
          set({
            error: null,
            isCheckingAuth: false,
            isAuthenticated: false,
            user: null,
          });
        }
      },

      forgotPassword: async (email) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.post(`${API_BASE_URL}/api/auth/forgot-password`, {
            email,
          });
          set({ message: response.data.message, isLoading: false });
        } catch (error) {
          set({
            isLoading: false,
            error:
              error.response?.data?.message ||
              "Error sending reset password email",
          });
          throw error;
        }
      },

      resetPassword: async (token, password) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.post(
            `${API_BASE_URL}/api/auth/reset-password/${token}`,
            {
              password,
            }
          );
          set({ message: response.data.message, isLoading: false });
        } catch (error) {
          set({
            isLoading: false,
            error: error.response?.data?.message || "Error resetting password",
          });
          throw error;
        }
      },
    }),
    {
      name: "auth-store",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
// ✅ Contact Store
export const useContactStore = create((set) => ({
  error: null,
  isLoading: false,
  message: null,

  contactUs: async (email, name, message) => {
    set({ isLoading: true, error: null, message: null });

    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/contact-us`, {
        email,
        name,
        message,
      });

      set({
        message: response.data.message || "Query sent successfully!",
        isLoading: false,
      });

      return response.data;
    } catch (error) {
      console.error("ContactUs Error:", error);
      set({
        error: error.response?.data?.message || "Error sending query",
        isLoading: false,
      });

      throw error;
    }
  },
}));
