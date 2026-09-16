import axiosClient from "../api/axiosClient";


const tripService = {


    getTrips: async () => {

        const response = await axiosClient.get("/trips");

        return response.data;

    },


    createTrip: async (tripData)=>{

        const response =
        await axiosClient.post("/trips",tripData);

        return response.data;

    },


    completeTrip: async(id)=>{

        const response =
        await axiosClient.put(`/trips/${id}/complete`);

        return response.data;

    },


    cancelTrip: async(id)=>{

        const response =
        await axiosClient.put(`/trips/${id}/cancel`);

        return response.data;

    }


}


export default tripService;