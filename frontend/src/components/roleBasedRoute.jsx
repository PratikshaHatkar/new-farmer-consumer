import { Navigate } from "react-router-dom";
import useAuth from "../auth/useAuth";

const RoleBasedRoute = ({ allowedRoles, children }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  return allowedRoles.includes(user.role)
    ? children
    : <Navigate to="/unauthorized" replace />;
};

export default RoleBasedRoute;
