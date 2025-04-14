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

export const fetchAllUsers = async () => {
  try {
    const response = await api.get("/all_users");
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 403) {
        throw new Error("You need admin privileges to access this resource");
      }
      if (error.response.status === 401) {
        throw new Error("Please login to access this resource");
      }
      throw new Error(
        error.response.data?.message ||
          "Failed to fetch users. Please try again."
      );
    }
  }
};

export const updateProfile = async (profileData) => {
  try {
    const isFormData = profileData instanceof FormData;
    const config = {
      headers: {
        "Content-Type": isFormData ? "multipart/form-data" : "application/json",
      },
    };
    const res = await api.put("/update_profile", profileData, config);
    return res;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Update Profile Failed. Please try again."
    );
  }
};

export const updateUserRole = async (userId, newRole) => {
  try {
    const payload = {
      user_id: userId,
      new_role: newRole,
    };

    const res = await api.put("/update_user_role", payload);
    return res.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 403) {
        throw new Error(error.response.data.message || "Admin access required");
      }
      throw new Error(
        error.response.data?.message ||
          "Failed to update user role. Please try again."
      );
    }
    throw error;
  }
};

export const deleteUser = async (userEmail) => {
  try {
    const response = await api.delete("/delete", {
      data: { email: userEmail },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 403) {
        throw new Error("Admin access required to delete users");
      }
      throw new Error(
        error.response.data?.message ||
          "Failed to delete user. Please try again."
      );
    }
    throw error;
  }
};
