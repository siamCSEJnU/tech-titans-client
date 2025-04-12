import axios from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";

const api = axios.create({
  baseURL: BASE_URL,
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

export const createPayment = async (paymentData) => {
  try {
    const res = await api.post("/payment/register", paymentData);
    return res.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Payment registration failed. Please try again."
    );
  }
};

export const getPaymentHistory = async (email) => {
  try {
    const response = await api.get("/payment/show", { params: { email } });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to load payment history"
    );
  }
};
