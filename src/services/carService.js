import axiosClient from "../api/axiosClient";

export const carService = {
  getCars() {
    return axiosClient.get("/cars");
  },

  getCarById(id) {
    return axiosClient.get(`/cars/${id}`);
  },

  createCar(data) {
    return axiosClient.post("/cars", data);
  },

  updateCar(id, data) {
    return axiosClient.put(`/cars/${id}`, data);
  },

  deleteCar(id) {
    return axiosClient.delete(`/cars/${id}`);
  },
};
