import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import TypingAnimation from "@/components/ui/typing-animation";

interface AdminData {
  name: string;
  email: string;
  password: string; // Fetch from DB
  address: string; // Additional field
  pincode: string; // Additional field
  location: string; // Additional field
}

const AdminProfile = () => {
  const [adminData, setAdminData] = useState<AdminData>({
    name: "Admin Name",
    email: "", // To be fetched
    password: "", // To be fetched
    address: "123 Admin Street, City", // Dummy data
    pincode: "123456", // Dummy data
    location: "New York, USA", // Dummy data
  });

  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch admin details from the backend
  const fetchAdminDetails = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin/details", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setAdminData((prev) => ({
        ...prev,
        email: response.data.email,
        password: response.data.password,
      }));
    } catch (error) {
      console.error("Failed to fetch admin details", error);
    }
  };

  useEffect(() => {
    fetchAdminDetails();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAdminData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await axios.put(
        "http://localhost:5000/api/admin",
        { ...adminData },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setLoading(false);
      setEditMode(false);
    } catch (error) {
      console.error("Failed to save admin data", error);
      setLoading(false);
    }
  };

  return (
    <div className="bg-white">
     <TypingAnimation>Admin Profile</TypingAnimation>
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Admin Name */}
        <div>
          <label className="block text-gray-600 mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={adminData.name}
            onChange={handleChange}
            disabled={!editMode}
            className={`w-[40vw] px-4 py-2 border ${
              editMode ? "border-black" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300`}
          />
        </div>

        {/* Admin Email */}
        <div>
          <label className="block text-gray-600 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={adminData.email}
            onChange={handleChange}
            disabled
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
          />
        </div>

        {/* Admin Password */}
        {editMode && (
          <div>
            <label className="block text-gray-600 mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={adminData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Enter new password"
            />
          </div>
        )}

        {/* Additional Fields */}
        <div>
          <label className="block text-gray-600 mb-2">Address</label>
          <input
            type="text"
            name="address"
            value={adminData.address}
            onChange={handleChange}
            disabled={!editMode}
            className={`w-full px-4 py-2 border ${
              editMode ? "border-blue-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300`}
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-2">Pincode</label>
          <input
            type="text"
            name="pincode"
            value={adminData.pincode}
            onChange={handleChange}
            disabled={!editMode}
            className={`w-full px-4 py-2 border ${
              editMode ? "border-blue-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300`}
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-2">Location</label>
          <input
            type="text"
            name="location"
            value={adminData.location}
            onChange={handleChange}
            disabled={!editMode}
            className={`w-full px-4 py-2 border ${
              editMode ? "border-blue-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300`}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center mt-6">
        
          {!editMode ? (
            <motion.button
              onClick={() => setEditMode(true)}
              className="bg-zinc-900 text-white px-6 py-2 rounded-md"
              whileHover={{ scale: 1.05 }}
            >
              Edit Profile
            </motion.button>
          ) : (
            <motion.div className="flex gap-4">
              <button
                onClick={handleSave}
                className={`px-6 py-2 rounded-md text-white ${
                  loading ? "bg-gray-500" : "bg-zinc-800"
                }`}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>
              <button
                onClick={() => {
                  setEditMode(false);
                  setAdminData((prev) => ({ ...prev, password: "" })); // Clear password
                }}
                className="bg-zinc-900 text-white px-6 py-2 rounded-md"
              >
                Cancel
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AdminProfile;
