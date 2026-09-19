import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

console.log("ProtectedRoute Loaded");

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  console.log("Protected Status:", isAuthenticated);

  if (!isAuthenticated) {
    console.log("Redirecting Login");

    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;
