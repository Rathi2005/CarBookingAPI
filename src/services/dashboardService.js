import axiosClient from "../api/axiosClient";

export const dashboardService = {
  async getStats() {
    const response = await axiosClient.get("/TripBookings/me/dashboard");

    console.log("Dashboard stats API:", response.data);

    return response.data;
  },

  getRecentTrips(ownerId){
    return axiosClient.get(`/TripBookings/owner/${ownerId}`);
  }
};
