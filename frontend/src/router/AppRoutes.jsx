import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import RoleBasedRoute from "../components/RoleBasedRoute";

import Login from "../pages/Login";
import Unauthorized from "../pages/Unauthorized";
import AdminDashboard from "../pages/admin/AdminDashboard";
import FarmerDashboard from "../pages/farmer/FarmerDashbaord";
import ConsumerDashboard from "../pages/consumer/ConsumerDashboard";
import Register from "../pages/Register";
import Home from "../pages/HomePage"
import Profile from "../pages/Profile"

import ProductForm from "../pages/farmer/ProductForm"
import ProductDetails from "../pages/consumer/ProductDetails"


const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/register" element={<Register />} />

      <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <RoleBasedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </RoleBasedRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/farmer"
        element={
          <ProtectedRoute>
            <RoleBasedRoute allowedRoles={["admin", "farmer"]}>
              <FarmerDashboard />
            </RoleBasedRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/consumer"
        element={
          <ProtectedRoute>
            <RoleBasedRoute allowedRoles={["admin", "farmer", "consumer"]}>
              <ConsumerDashboard />
            </RoleBasedRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/farmer/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/consumer/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/consumer/productInfo/:id"
        element={
          <ProtectedRoute>
            < ProductDetails/>
          </ProtectedRoute>
        }
      />
      <Route
        path="/farmer/addProduct"
        element={
          <ProtectedRoute>
            <ProductForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit-product/:id"
        element={
          <ProtectedRoute>
            <ProductForm />
          </ProtectedRoute>
        }
      />


    </Routes>
  );
};

export default AppRoutes;
