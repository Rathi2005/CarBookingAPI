import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "../services/dashboardService";
import { useAuth } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";

export function useDashboard() {
  const { token } = useAuth();

  const decoded = token ? jwtDecode(token) : null;

  const ownerId =
    decoded?.[
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
    ];

  const stats = useQuery({
    queryKey: ["dashboardStats"],

    queryFn: () => dashboardService.getStats(),

    staleTime: 1000 * 60 * 5,
  });

  const trips = useQuery({
    queryKey: ["dashboardTrips", ownerId],

    queryFn: () => dashboardService.getRecentTrips(ownerId),

    enabled: Boolean(ownerId),

    staleTime: 1000 * 60 * 5,
  });

  return {
    stats,
    trips,
  };
}
