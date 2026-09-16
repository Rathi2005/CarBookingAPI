import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

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

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />

        <Route path="/login" element={<Login />} />

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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
