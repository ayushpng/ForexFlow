import { BrowserRouter, Routes, Route } from "react-router-dom";
import Receipt from "../pages/shop/Receipt";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Transactions from "../pages/shop/Transactions";
import CustomerDashboard from "../pages/customer/Dashboard";
import ShopDashboard from "../pages/shop/Dashboard";
import AdminDashboard from "../pages/admin/Dashboard";
import ManageRates from "../pages/admin/ManageRates";
import ProtectedRoute from "../components/ProtectedRoute";
import ShopManageRates from "../pages/shop/ManageRates";
import CompareRates from "../pages/customer/CompareRates";
import ShopDetails from "../pages/customer/ShopDetails";
import Profile from "../pages/shop/Profile";
function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Customer */}
        <Route
          path="/customer/dashboard"
          element={
            <ProtectedRoute allowedRoles={["customer"]}>
              <CustomerDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/customer/compare-rates" element={<CompareRates />} />

        {/* Shopkeeper */}
        <Route
          path="/shop/rates"
          element={
            <ProtectedRoute allowedRoles={["shopkeeper"]}>
              <ShopManageRates />
            </ProtectedRoute>
          }
        />
        <Route path="/shop/profile" element={<Profile />} />
        <Route path="/shop/transactions" element={<Transactions />} />
        <Route path="/customer/shop/:id" element={<ShopDetails />} />
        <Route path="/shop/receipt/:receiptNumber" element={<Receipt />} />
        <Route
          path="/shop/dashboard"
          element={
            <ProtectedRoute allowedRoles={["shopkeeper"]}>
              <ShopDashboard />
            </ProtectedRoute>
          }
        />

        {/* Admin */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        {/* Manage Rates */}
        <Route
          path="/admin/rates"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <ManageRates />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
