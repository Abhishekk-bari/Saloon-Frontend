import  { useEffect, useState } from "react";
import axios from "axios";

interface User {
    _id: string;
    name: string;
    email: string;
  }

const ManageUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users/users");
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch users", error);
      setLoading(false);
    }
  };

  const deleteUser = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      setUsers(users.filter((user) => user._id !== id)); // Remove from state
    } catch (error) {
      console.error("Failed to delete user", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-5">Manage Users</h2>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
        {users.map((user) => (
  <tr key={user._id}>
    <td className="border border-gray-300 px-4 py-2">{user.name}</td>
    <td className="border border-gray-300 px-4 py-2">{user.email}</td>
    <td className="border border-gray-300 px-4 py-2">
      <button
        className="bg-red-500 text-white px-3 py-1 rounded"
        onClick={() => deleteUser(user._id)}
      >
        Delete
      </button>
    </td>
  </tr>
))}

        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
