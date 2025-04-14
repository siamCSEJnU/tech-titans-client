import axios from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
  },
});

// Add auth token interceptor
api.interceptors.request.use((config) => {
  const authToken = localStorage.getItem("auth-storage");
  const parsedToken = JSON.parse(authToken);
  const token = parsedToken.state?.token;
  if (token) {
    try {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error parsing auth token:", error);
    }
  }
  return config;
});

/**
 * Upload product with single image
 */
export const uploadProduct = async (formData) => {
  try {
    const response = await api.post("/products", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data?.message ||
          "Failed to upload product. Please try again."
      );
    }
    throw error;
  }
};

/**
 * Get single product details
 */
export const getProduct = async (productId) => {
  try {
    const response = await api.get(`/products/${productId}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data?.message ||
          "Failed to fetch product details. Please try again."
      );
    }
    throw error;
  }
};

/**
 * Get products of the seller
 */
export const getSellerProducts = async () => {
  try {
    const response = await api.get("/seller/products");
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data?.message ||
          "Failed to fetch products. Please try again."
      );
    }
    throw error;
  }
};

/**
 * Update a product
 */
export const updateProduct = async (productId, formData) => {
  try {
    const response = await api.put(`/products/${productId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data?.message ||
          "Failed to update product. Please try again."
      );
    }
    throw error;
  }
};

/**
 * Delete a product
 */
export const deleteProduct = async (productId) => {
  try {
    const response = await api.delete(`/products/${productId}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data?.message ||
          "Failed to delete product. Please try again."
      );
    }
    throw error;
  }
};
