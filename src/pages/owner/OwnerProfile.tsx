import { useEffect, useState } from "react";
import axios from "axios";

interface Owner {
  _id: string;
  name: string;
  email: string;
  shopAddress?: string;
  location?: string;
  image: string
}

const OwnerProfile = () => {
  const [owner, setOwner] = useState<Owner | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchOwnerDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/owner/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOwner(response.data);
    } catch (error) {
      console.error("Failed to fetch owner details", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOwnerDetails();
  }, []);

  if (loading) return <p>Loading...</p>;

  if (!owner) return <p>Failed to load owner details.</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Owner Profile</h2>
      <div className="bg-gray-100 p-4 rounded shadow-md">
        <p className="mb-2">
          <strong>Name:</strong> {owner.name}
        </p>
        <p className="mb-2">
          <strong>Email:</strong> {owner.email}
        </p>
        {owner.shopAddress && (
          <p className="mb-2">
            <strong>Shop Address:</strong> {owner.shopAddress}
          </p>
        )}
        {owner.location && (
          <p className="mb-2">
            <strong>Location:</strong> {owner.location}
          </p>
        )}
      </div>
    </div>
  );
};

export default OwnerProfile;
