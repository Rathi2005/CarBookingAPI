import { jwtDecode } from "jwt-decode";
import { getToken } from "./storage";


export function getCurrentUser(){

    const token = getToken();

    if(!token){
        return null;
    }

    try{
        return jwtDecode(token);
    }
    catch(error){
        console.error("Invalid token", error);
        return null;
    }
}

export function getOwnerId(){

    const token = getToken();

    if(!token){
        return null;
    }


    const decoded = jwtDecode(token);


    return decoded[
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
    ];

}