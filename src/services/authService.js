import axiosClient from "../api/axiosClient";


export const authService = {


    register(data){

        return axiosClient.post(
            "/auth/register",
            data
        );

    },


    login(data){

        return axiosClient.post(
            "/auth/login",
            data
        );

    }


}