import axios from "axios";
import { create } from "zustand";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const authToken = localStorage.getItem("auth-storage");
  const parsedToken = JSON.parse(authToken);
  const token = parsedToken.state?.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const useWishlistStore = create((set, get) => ({
  items: [],
  loading: false,
  error: null,

  fetchWishlist: async (email) => {
    try {
      set({ loading: true });
      const res = await api.get("/wishlist/show", {
        params: { email },
      });
      set({ items: res.data || [], loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message,
        loading: false,
      });
      throw error;
    }
  },

  addToWishlist: async (email, productId) => {
    try {
      const res = await api.post("/wishlist/register", {
        email,
        product_id: productId,
      });

      // Optimistically update the UI
      set((prev) => ({
        items: [
          ...prev.items,
          {
            id: res.data.data?.id,
            product_id: productId,
            product: { id: productId }, // Minimal product data
            created_at: res.data.data?.created_at,
          },
        ],
      }));

      return {
        success: true,
        message: res.data.message,
        isAlreadyInWishlist: res.data.message === "Already in wishlist",
      };
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message,
      });
      return {
        success: false,
        message: error.response?.data?.message || "Failed to add to wishlist",
      };
    }
  },

  removeFromWishlist: async (email, productId) => {
    try {
      // Optimistically update the UI
      set((prev) => ({
        items: prev.items.filter((item) => item.product_id !== productId),
      }));

      const res = await api.delete("/wishlist/delete", {
        data: { email, product_id: productId },
      });

      return {
        success: true,
        message: res.data.message,
      };
    } catch (error) {
      // Revert optimistic update on error
      get().fetchWishlist(email);
      return {
        success: false,
        message:
          error.response?.data?.message || "Failed to remove from wishlist",
      };
    }
  },

  resetWishlist: () => {
    set({ items: [], loading: false, error: null });
  },

  isInWishlist: (productId) => {
    return get().items.some((item) => item.product_id === productId);
  },
}));
