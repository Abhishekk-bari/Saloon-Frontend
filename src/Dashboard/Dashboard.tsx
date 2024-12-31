import { useNavigate, Outlet } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  // Get role from local storage
  const role = localStorage.getItem("role") as "customer" | "owner" | "admin";

  // Define sidebar options based on role
  const sidebarOptions: Record<"customer" | "owner" | "admin", { label: string; path: string }[]> = {
    customer: [
      { label: "Find Salons", path: "/dashboard/find-salons" },
      { label: "Bookings", path: "/dashboard/bookings" },
      { label: "Favorites", path: "/dashboard/favorites" },
      { label: "Profile", path: "/dashboard/profile" },
    ],
    owner: [
      { label: "My Salons", path: "/dashboard/my-salons" },
      { label: "Bookings", path: "/dashboard/owner-bookings" },
      { label: "Analytics", path: "/dashboard/analytics" },
      { label: "Profile", path: "/dashboard/profile" },
    ],
    admin: [
      { label: "Manage Users", path: "/dashboard/manage-users" },
      { label: "Manage Salons", path: "/dashboard/manage-salons" },
      { label: "Reports", path: "/dashboard/reports" },
      { label: "Analytics", path: "/dashboard/analytics" },
      { label: "Profile", path: "/dashboard/profile" },
    ],
  };

  const renderSidebar = () => {
    const options = sidebarOptions[role || "customer"] || [];
    return (
      <>
        {options.map((option) => (
          <button
            key={option.path}
            onClick={() => navigate(option.path)}
            className="p-3 text-left hover:bg-gray-200 rounded-md"
          >
            {option.label}
          </button>
        ))}
        <button
          onClick={handleLogout}
          className="p-3 text-left hover:bg-red-200 rounded-md text-red-600 font-bold"
        >
          Logout
        </button>
      </>
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Display a welcome message based on the role
  const getWelcomeMessage = (role: string) => {
    switch (role) {
      case "customer":
        return "Welcome Customer";
      case "owner":
        return "Welcome Shop Owner";
      case "admin":
        return "Welcome Admin";
      default:
        return "Welcome User";
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-100 p-5 flex flex-col gap-4 shadow-lg">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        {renderSidebar()}
      </div>

      {/* Main Content */}
      <div className="w-3/4 bg-white p-10">
        <h1 className="text-2xl font-semibold">{getWelcomeMessage(role || "customer")}</h1>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
