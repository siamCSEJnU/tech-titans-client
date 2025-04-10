import { create } from "zustand";

export const useRegistrationSore = create((set) => ({
  // Initial state
  formData: {
    name: "",
    email: "",
    contact: "",
    password: "",
    confirmPassword: "",
  },
  errors: {},
  isSubmitting: false,
  showPassword: false,
  showConfirmPassword: false,

  // Actions to update state
  setFormData: (data) =>
    set((state) => ({
      formData: {
        ...state.formData,
        ...data,
      },
    })),

  setErrors: (errors) => set({ errors }),

  setIsSubmitting: (isSubmitting) => set({ isSubmitting }),

  togglePasswordVisibility: () =>
    set((state) => ({
      showPassword: !state.showPassword,
    })),

  toggleConfirmPasswordVisibility: () =>
    set((state) => ({
      showConfirmPassword: !state.showConfirmPassword,
    })),

  resetForm: () =>
    set(() => ({
      formData: {
        name: "",
        email: "",
        contact: "",
        password: "",
        confirmPassword: "",
      },
      errors: {},
      isSubmitting: false,
      showPassword: false,
      showConfirmPassword: false,
    })),
}));
