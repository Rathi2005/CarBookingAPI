import axiosClient from "../api/axiosClient";
import { getOwnerId } from "../utils/auth";

const tripService = {
  getTrips: async () => {
    const ownerId = getOwnerId();
    const response = await axiosClient.get(`/TripBookings/owner/${ownerId}`);

    return response.data;
  },

  getTripById: async (id) => {
    const response = await axiosClient.get(`/TripBookings/${id}`);

    return response.data;
  },

  createTrip: async (tripData) => {
    const response = await axiosClient.post("/TripBookings", tripData);

    return response.data;
  },

  completeTrip: async (id) => {
    const response = await axiosClient.put(`/TripBookings/${id}/complete`);

    return response.data;
  },

  cancelTrip: async (id) => {
    const response = await axiosClient.put(`/TripBookings/${id}/cancel`);

    return response.data;
  },

  getTripsByCarId: async (carId) => {
    const response = await axiosClient.get(`/TripBookings/car/${carId}`);
    return response.data;
  },

};

export default tripService;
