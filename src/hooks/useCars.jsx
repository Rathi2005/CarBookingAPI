import { useQuery } from "@tanstack/react-query";
import { carService } from "../services/carService";

export function useCars() {
  return useQuery({
    queryKey: ["cars"],

    queryFn: async () => {
      const response = await carService.getCars();

      return response.data;
    },
  });
}
