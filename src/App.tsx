import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import PrivateRoute from "./route/PrivateRoute";
import Navbar from "./components/Navbar";
import Home from "./components/Home";



import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./Dashboard/Dashboard";

// For admin
import ManageOwners from "./Dashboard/ManageOwners";
import ManageUsers from "./Dashboard/ManageUsers";
import AdminProfile from "./pages/admin/AdminProfile";

// for customer
import MySalons from "./pages/customer/MySalons";

// for owner
// Import owner-specific pages here, e.g. MySalons for owner
import OwnerProfile from "./pages/owner/OwnerProfile"; // Sample OwnerProfile

function App() {
  const location = useLocation();
  const role = localStorage.getItem("role");
  const hideNavbarRoutes = ["/login", "/signup", "/dashboard"];
  const shouldHideNavbar = hideNavbarRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  return (
    <div className="lg:pt-[5.25rem overflow-hidden]">
      {!shouldHideNavbar && <Navbar />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />

        {/* Protect Dashboard and all nested routes */}
        <Route element={<PrivateRoute />}>
          <Route path="dashboard" element={<Dashboard />}>
            {/* Role-Specific Routes */}

            {/* Admin Routes */}
            {role === "admin" && (
              <>
                <Route path="manage-users" element={<ManageUsers />} />
                <Route path="manage-owners" element={<ManageOwners />} />
                <Route path="profile" element={<AdminProfile />} />
              </>
            )}

            {/* Owner Routes */}
            {role === "owner" && (
              <>
                {/* Add the MySalons route here for owners */}
                <Route path="my-salons" element={<MySalons />} />
                <Route path="profile" element={<OwnerProfile />} />
                {/* Add other owner-related routes */}
              </>
            )}

            {/* Customer Routes */}
            {role === "customer" && (
              <>
                <Route path="my-salons" element={<MySalons />} />
                {/* Add other customer-related routes */}
              </>
            )}
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
