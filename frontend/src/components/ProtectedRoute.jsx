import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useAuth();

  // User not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // User has wrong role
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;