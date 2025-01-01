// App.tsx
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import PrivateRoute from './route/PrivateRoute'; 
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./Dashboard/Dashboard";
import Profile from "./Dashboard/Profile";
import Bookings from "./Dashboard/Bookings";

function App() {
  const location = useLocation();
  const hideNavbarRoutes = ["/login", "/signup", "/dashboard"];
  const shouldHideNavbar = hideNavbarRoutes.some((route) => location.pathname.startsWith(route));

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
          <Route path="dashboard/*" element={<Dashboard />}>
            <Route path="profile" element={<Profile />} />
            <Route path="bookings" element={<Bookings />} />
          </Route>
        </Route>

        {/* Redirect any incorrect access to profile */}
        <Route path="profile" element={<Navigate to="/dashboard/profile" replace />} />
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
