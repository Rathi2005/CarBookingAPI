import { useQuery } from "@tanstack/react-query";
import tripService from "../services/tripService";


export function useTrips(){

    return useQuery({

        queryKey:["ownerTrips"],

        queryFn:tripService.getTrips,

        staleTime:1000*60*5

    });

}