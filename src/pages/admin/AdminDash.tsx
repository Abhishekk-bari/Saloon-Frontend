import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
// import { Calendar } from "react-calendar";
// import "react-calendar/dist/Calendar.css";

const AdminDash = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalOwners, setTotalOwners] = useState(0);
  const [progress, setProgress] = useState(70); // Dummy progress value
//   const [date, setDate] = useState<Date>(new Date());

  // Fetch total users and owners
  const fetchData = async () => {
    try {
      const userResponse = await axios.get("http://localhost:5000/api/users/count");
      const ownerResponse = await axios.get("http://localhost:5000/api/owners/count");

      setTotalUsers(userResponse.data.total);
      setTotalOwners(ownerResponse.data.total);
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <motion.h1
        className="text-3xl font-bold mb-6 text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Admin Dashboard
      </motion.h1>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {/* Total Users */}
        <motion.div
          className="p-6 bg-white shadow-md rounded-lg flex flex-col items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-semibold text-gray-700">Total Users</h2>
          <p className="text-4xl font-bold text-blue-500 mt-4">{totalUsers}</p>
        </motion.div>

        {/* Total Owners */}
        <motion.div
          className="p-6 bg-white shadow-md rounded-lg flex flex-col items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="text-xl font-semibold text-gray-700">Total Owners</h2>
          <p className="text-4xl font-bold text-green-500 mt-4">{totalOwners}</p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          className="p-6 bg-white shadow-md rounded-lg flex flex-col items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold text-gray-700">Platform Progress</h2>
          <div className="w-full bg-gray-300 rounded-full h-6 mt-4">
            <motion.div
              className="bg-blue-500 h-6 rounded-full"
              style={{ width: `${progress}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1 }}
            ></motion.div>
          </div>
          <p className="text-gray-500 mt-2">{progress}% completed</p>
        </motion.div>

        {/* Calendar */}
        <motion.div
          className="p-6 bg-white shadow-md rounded-lg flex flex-col items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-xl font-semibold text-gray-700">Calendar</h2>
          {/* <Calendar
            onChange={(date) => setDate(date as Date)}
            value={date}
            className="mt-4"
          /> */}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDash;
