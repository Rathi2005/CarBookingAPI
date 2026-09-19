import axiosClient from "../api/axiosClient";

export const carService = {
  getCars() {
    return axiosClient.get("/Cars/me");
  },

  getCarById(id) {
    return axiosClient.get(`/Cars/${id}`);
  },

  createCar(data) {
    return axiosClient.post("/Cars", data);
  },

  updateCar(id, data) {
    return axiosClient.put(`/Cars/${id}`, data);
  },

  deleteCar(id) {
    return axiosClient.delete(`/Cars/${id}`);
  },

  availableCars() {
    return axiosClient.get("/Cars/me/available");
  }
};
