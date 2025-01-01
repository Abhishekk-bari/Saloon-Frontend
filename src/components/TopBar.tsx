// components/TopBar.tsx
import  { useState, useEffect } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const TopBar = () => {
  const role = localStorage.getItem("role") as "customer" | "owner" | "admin";
  const username = localStorage.getItem("username") || "User";
  const ownerImage = localStorage.getItem("image"); // Image path from localStorage
  const shopAddress = localStorage.getItem("shopAddress"); // Shop address from localStorage

  const [imageError, setImageError] = useState(false);

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

  return (
    <div className="flex justify-between items-center p-5 bg-white shadow-md">
      <h1 className="text-2xl font-semibold">{getWelcomeMessage(role || "customer")}</h1>

      {/* Search Bar */}
      <div className="flex h-10 max-w-lg">
        <input
          type="text"
          placeholder="Search something"
          className="w-full px-4 py-2 border rounded-xl border-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Display Owner Info */}
      {role === "owner" && (
        <div className="flex items-center gap-5">
          {ownerImage && !imageError ? (
            <img
              src={`http://localhost:5000${ownerImage}`} // The full image URL from backend response
              alt="Owner"
              className="w-10 h-10 rounded-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
            </Avatar>
          )}

          {shopAddress && <p className="mt-2 text-gray-600">{shopAddress}</p>}
        </div>
      )}
    </div>
  );
};

export default TopBar;
