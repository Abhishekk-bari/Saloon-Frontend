import { useState, useEffect } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";


const TopBar = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role") as "customer" | "owner" | "admin";
  const username = localStorage.getItem("username") || "User";
  const ownerImage = localStorage.getItem("image"); // Image path from localStorage

  const [imageError, setImageError] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const getWelcomeMessage = (role: string) => {
    switch (role) {
      case "customer":
        return `Welcome Customer, ${username}`;
      case "owner":
        return `Welcome Shop Owner, ${username}`;
      case "admin":
        return `Welcome Admin, ${username}`;
      default:
        return `Welcome User, ${username}`;
    }
  };

  useEffect(() => {
    setImageError(false);
  }, [ownerImage]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center p-5 bg-white shadow-md">
      <h1 className="text-2xl font-semibold ">{getWelcomeMessage(role || "customer")}</h1>

      {/* Search Bar */}
      <div className="flex h-10 max-w-lg">
        <input
          type="text"
          placeholder="Search something"
          className="w-full px-4 py-2 border rounded-xl border-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="hover:text-gray-300">
        <IoMdNotificationsOutline className="text-2xl" />
      </div>

      {/* Display Owner Info */}
      <div className="relative flex items-center gap-5">
        {role === "owner" && (
          <>
            {ownerImage && !imageError ? (
              <img
                src={`http://localhost:5000${ownerImage}`} // The full image URL from backend response
                alt="Owner"
                className="w-10 h-10 rounded-full object-cover cursor-pointer"
                onError={() => setImageError(true)}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />
            ) : (
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="cursor-pointer"
                />
              </Avatar>
            )}
          </>
        )}

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div className="absolute -right-5  top-5 mt-10 w-20  shadow-lg rounded-md py-2">
            <button
              className="block w-full px-4 py-2 text-left text-zinc-800"
            >
              Profile
            </button>
            <button onClick={handleLogout}
              className="block w-full px-4 py-2 text-left text-zinc-800 "
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;
