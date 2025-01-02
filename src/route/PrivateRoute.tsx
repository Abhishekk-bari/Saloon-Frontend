import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute = () => {
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const location = useLocation();

  // If there's no role or token, redirect to the login page
  if (!role || !token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Admin-only route protection
  const restrictedAdminRoutes = ["/dashboard/manage-owners", "/dashboard/manage-users"];
  const currentPath = location.pathname;

  if (restrictedAdminRoutes.some((route) => currentPath.startsWith(route)) && role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
