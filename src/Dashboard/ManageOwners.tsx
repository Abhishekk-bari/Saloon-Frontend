import  { useEffect, useState } from "react";
import axios from "axios";

interface User {
  _id: string;
  name: string;
  email: string;
}

const ManageOwners = () => {
  const [owners, setOwners] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOwners = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users/owners");
      setOwners(response.data); // TypeScript now knows response.data matches User[]
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch owners", error);
      setLoading(false);
    }
  };

  const deleteOwner = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      setOwners(owners.filter((owner) => owner._id !== id)); // _id is now recognized
    } catch (error) {
      console.error("Failed to delete owner", error);
    }
  };

  useEffect(() => {
    fetchOwners();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-5">Manage Owners</h2>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {owners.map((owner) => (
            <tr key={owner._id}>
              <td className="border border-gray-300 px-4 py-2">{owner.name}</td>
              <td className="border border-gray-300 px-4 py-2">{owner.email}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => deleteOwner(owner._id)}
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

export default ManageOwners;
