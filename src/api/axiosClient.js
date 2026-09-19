import axios from "axios";

import { getToken, removeToken } from "../utils/storage";

console.log("Axios Client Loaded");

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,

  headers: {
    "Content-Type": "application/json",
  },
});

console.log("API BASE URL:", import.meta.env.VITE_API_BASE_URL);

axiosClient.interceptors.request.use(
  (config) => {
    console.log("REQUEST:", config.url);

    const token = getToken();

    if (token) {
      console.log("Attaching JWT");

      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    console.log("REQUEST ERROR", error);

    return Promise.reject(error);
  },
);

axiosClient.interceptors.response.use(
  (response) => {
    console.log("API RESPONSE:", response);

    return response;
  },

  (error) => {
    console.log("API ERROR:", error);

    if (error.response?.status === 401) {
      removeToken();

      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);

export default axiosClient;
