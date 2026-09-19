import axiosClient from "../api/axiosClient";

console.log("Auth Service Loaded");

export const authService = {
  login(data) {
    console.log("LOGIN API CALL", data);

    return axiosClient.post("/Auth/login", data);
  },

  register(data) {
    console.log("REGISTER API CALL", data);

    return axiosClient.post("/Auth/register", data);
  },
};
