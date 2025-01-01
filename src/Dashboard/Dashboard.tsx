// Dashboard.tsx
import { useNavigate, Outlet } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/Logo.png";
import { FaUser, FaCalendarAlt, FaStore, FaUsers, FaTools } from "react-icons/fa";
import { MdManageAccounts, MdFavorite } from "react-icons/md";
import { IoAnalytics } from "react-icons/io5";
import { AiFillHome } from "react-icons/ai";
import TopBar from "../components/TopBar"; // Import the TopBar

const Dashboard = () => {
  const navigate = useNavigate();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  const role = localStorage.getItem("role") as "customer" | "owner" | "admin";
  const sidebarOptions = {
    customer: [
      { label: "Find Salons", path: "/dashboard/find-salons", icon: <AiFillHome /> },
      { label: "Bookings", path: "/dashboard/bookings", icon: <FaCalendarAlt /> },
      { label: "Favorites", path: "/dashboard/favorites", icon: <MdFavorite /> },
      { label: "Profile", path: "/dashboard/profile", icon: <FaUser /> },
    ],
    owner: [
      { label: "My Salons", path: "/dashboard/my-salons", icon: <FaStore /> },
      { label: "Bookings", path: "/dashboard/bookings", icon: <FaCalendarAlt /> },
      { label: "Analytics", path: "/dashboard/analytics", icon: <IoAnalytics /> },
      { label: "Profile", path: "/dashboard/profile", icon: <FaUser /> },
    ],
    admin: [
      { label: "Manage Users", path: "/dashboard/manage-users", icon: <FaUsers /> },
      { label: "Manage Salons", path: "/dashboard/manage-salons", icon: <MdManageAccounts /> },
      { label: "Reports", path: "/dashboard/reports", icon: <FaTools /> },
      { label: "Analytics", path: "/dashboard/analytics", icon: <IoAnalytics /> },
      { label: "Profile", path: "/dashboard/profile", icon: <FaUser /> },
    ],
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const renderSidebar = () => {
    const options = sidebarOptions[role || "customer"] || [];
    return (
      <>
        {options.map((option) => (
          <button
            key={option.path}
            onClick={() => navigate(option.path)}
            className="flex items-center gap-4 p-3 text-left hover:bg-gray-200 rounded-md"
          >
            <span className="text-xl">{option.icon}</span>
            {isSidebarExpanded && <span>{option.label}</span>}
          </button>
        ))}
        <button
          onClick={handleLogout}
          className="flex items-center gap-4 p-3 text-left hover:bg-red-200 rounded-md text-red-600 font-bold"
        >
          <span className="text-xl"><FaTools /></span>
          {isSidebarExpanded && <span>Logout</span>}
        </button>
      </>
    );
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className={`bg-gray-100 p-4 flex flex-col gap-4 shadow-lg ${isSidebarExpanded ? "w-60" : "w-16"} transition-all duration-300`}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            {isSidebarExpanded && <img src={logo} alt="Brand Logo" className="w-10 h-auto mr-3" />}
            {isSidebarExpanded && <h1 className="text-lg font-bold">Soft@</h1>}
          </div>
          <button onClick={() => setIsSidebarExpanded(!isSidebarExpanded)} className="p-2 hover:bg-gray-200 rounded-md">
            {isSidebarExpanded ? "<" : ">"}
          </button>
        </div>

        {/* Sidebar Content */}
        {renderSidebar()}
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white">
        {/* Top Bar */}
        <TopBar />

        {/* Page Specific Content */}
        <div className="p-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
