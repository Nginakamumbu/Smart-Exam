import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element, allowedRoles }) => {
  const userRole = localStorage.getItem("userRole");

  // If no user role is found in localStorage, redirect to login
  if (!userRole) {
    return <Navigate to="/login" />;
  }

  // Check if the user's role matches the allowed roles
  return allowedRoles.includes(userRole) ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
