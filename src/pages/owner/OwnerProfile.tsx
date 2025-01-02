import React, { useEffect, useState } from "react";
import axios from "axios";

interface Profile {
  name: string;
  email: string;
}

const OwnerProfile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Token is missing");
          return;
        }

        const response = await axios.get("http://localhost:5000/api/owner/profile", {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token to the request
          },
        });

        setProfile(response.data);
      } catch (err: any) {
        setError(err.response?.data?.error || "Failed to fetch profile");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Owner Profile</h1>
      {profile && (
        <div>
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
        </div>
      )}
    </div>
  );
};

export default OwnerProfile;
