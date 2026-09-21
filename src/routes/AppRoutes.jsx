import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/dashboard/Dashboard";
import Cars from "../pages/cars/Cars";
import AddCar from "../pages/cars/AddCar";
import EditCar from "../pages/cars/EditCar";
import DashboardLayout from "../layouts/DashboardLayout";
import Trips from "../pages/trips/Trips";
import CreateTrip from "../pages/trips/CreateTrip";
import Reports from "../pages/reports/Reports";
import ProtectedRoute from "./ProtectedRoute";
import CarTrips from "../pages/trips/CarTrips";

function AppRoutes() {
  console.log("🔍 DEBUG 4: AppRoutes component has executed!");

  return (
    <Routes>
      <Route
        path="/"
        element={(() => {
          console.log(
            "🔍 DEBUG 5: Root Route reached, redirecting to /login...",
          );
          return <Navigate to="/login" replace />;
        })()}
      />

      <Route
        path="/login"
        element={(() => {
          console.log(
            "🔍 DEBUG 6: Router is attempting to render the Login Route Element!",
          );
          return <Login />;
        })()}
      />

      <Route path="/register" element={<Register />} />

      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/cars/add" element={<AddCar />} />
        <Route path="/cars/edit/:id" element={<EditCar />} />
        <Route path="/trips/create" element={<CreateTrip />} />
        <Route path="/trips" element={<Trips />} />
        <Route path="/reports/daily" element={<Reports />} />
        <Route path="/cars/:carId/trips" element={<CarTrips />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
