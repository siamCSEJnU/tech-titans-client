import axios from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
    // "Content-Type": "application/json",
  },
});

// Add auth token interceptor
api.interceptors.request.use((config) => {
  const authToken = localStorage.getItem("auth-storage");
  const parsedToken = JSON.parse(authToken);
  const token = parsedToken.state?.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const updateProfile = async (profileData) => {
  try {
    const isFormData = profileData instanceof FormData;
    const config = {
      headers: {
        "Content-Type": isFormData ? "multipart/form-data" : "application/json",
      },
    };
    const res = await api.put("/update_profile", profileData, config);
    return res.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Update Profile Failed. Please try again."
    );
  }
};
