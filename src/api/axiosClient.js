import axios from "axios";
import { storage } from "../utils/storage";


const axiosClient = axios.create({

    baseURL:
    import.meta.env.VITE_API_BASE_URL,

    headers:{
        "Content-Type":"application/json"
    }

});



// Attach JWT automatically

axiosClient.interceptors.request.use(

(config)=>{

    const token =
    storage.getToken();


    if(token){

        config.headers.Authorization =
        `Bearer ${token}`;

    }


    return config;

},


(error)=>{

    return Promise.reject(error);

}

);




// Handle unauthorized

axiosClient.interceptors.response.use(

(response)=>response,


(error)=>{


    if(error.response?.status===401){

        storage.clear();

        window.location.href="/login";

    }


    return Promise.reject(error);

}

);


export default axiosClient;