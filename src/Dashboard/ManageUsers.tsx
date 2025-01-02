import { useEffect, useState } from "react";
import axios from "axios";
import { Outlet } from "react-router-dom";
import TypingAnimation from "@/components/ui/typing-animation";
import InteractiveHoverButton from "@/components/ui/interactive-hover-button";

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
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/api/users/users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch users", error);
      setLoading(false);
    }
  };

  const deleteUser = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.filter((user) => user._id !== id));
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
      <TypingAnimation className="text-3xl font-mono">
        Admin Profile
      </TypingAnimation>
      <p className="pb-20 font-normal text-lg">
        A list of all the users in your account including their name, title,
        email and role.
      </p>
      <table className=" w-[80vw]">
        <thead>
          <tr className="text-xl border-b border-zinc-900">
            <th className=" px-4 py-2">Name</th>
            <th className=" px-4 py-2">Email</th>
            <th className=" px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody className="text-lg text-center">
          {users.map((user) => (
            <tr key={user._id}>
              <td className="border-b border-zinc-800 px-4 py-2">
                {user.name}
              </td>
              <td className="border-b border-zinc-800 px-4 py-2">
                {user.email}
              </td>
              <td className="border-b border-zinc-800 px-4 py-2">
                <InteractiveHoverButton onClick={() => deleteUser(user._id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Outlet />
    </div>
  );
};

export default ManageUsers;
