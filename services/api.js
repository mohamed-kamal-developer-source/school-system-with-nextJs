import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3232/api/v1",
  withCredentials: true,
});


// Normalize errors so callers can just read err.message.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      `Something went wrong. Please try again. ${error.message}`;
    return Promise.reject(new Error(message));
  },
);

export default api;
