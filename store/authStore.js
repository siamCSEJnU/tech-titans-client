import Cookies from "js-cookie";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      user: null,
      isLoading: false,
      error: null,
      intendedPath: "/",
      avatar: null,

      setIntendedPath: (path) => set({ intendedPath: path }),
      setToken: (token) => set({ token }),
      setUser: (userData) => set({ user: userData }),
      setAvatar: (avatarUrl) => set({ avatar: avatarUrl }),

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const res = await fetch("http://127.0.0.1:8000/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({ email, password }),
          });

          if (!res?.ok) {
            const errorData = await res.json();
            throw new Error(
              errorData.message || "Login failed. Check your credentials."
            );
          }

          const { access_token } = await res.json();
          set({ token: access_token, isLoading: false });
          Cookies.set("auth-token", access_token);
          return access_token;
        } catch (error) {
          set({ isLoading: false, error: error.message });
          throw error; // Rethrow the error to be handled in the component
        }
      },

      logout: () => {
        set({
          token: null,
          user: null,
          isLoading: false,
          error: null,
          intendedPath: "/",
          avatar: null,
        });
        // setAvatar(null);
        localStorage.removeItem("auth-storage"); // Clear the persisted state
        Cookies.remove("auth-token");
      },

      isAuthenticated: () => {
        const { token } = useAuthStore.getState();
        return token !== null;
      },

      getMe: async () => {
        const { token } = useAuthStore.getState();
        if (!token) return;

        try {
          const res = await fetch("http://127.0.0.1:8000/api/me", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          });

          if (!res.ok) throw new Error("Failed to fetch user data.");

          const user = await res.json();
          set({ user });
          return user;
        } catch (err) {
          console.error(err);
          set({ error: err.message });
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        intendedPath: state.intendedPath,
        avatar: state.avatar,
      }),
    }
  )
);
