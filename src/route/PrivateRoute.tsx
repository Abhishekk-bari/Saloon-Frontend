import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  // If there's no role or token, redirect to the login page
  if (!role || !token) {
    return <Navigate to="/login" />;
  }

  return <Outlet />; // Render the children if the user is logged in
};

export default PrivateRoute;
