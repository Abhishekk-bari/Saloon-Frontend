import img from "../assets/signup.jpg";
import logo from "../assets/Logo.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

type FormDataType = {
  name: string;
  email: string;
  password: string;
  role: string;
  image: File | null;
  location: string;
  shopAddress: string;
};

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    email: "",
    password: "",
    role: "customer", // default to customer
    image: null as File | null,
    location: "",
    shopAddress: "",
  });

  const [error, setError] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      setFormData({
        ...formData,
        [name]: (e.target as HTMLInputElement).files?.[0] || null,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Check for required fields dynamically
      if (!formData.name || !formData.email || !formData.password) {
        setError("All fields are required.");
        return;
      }
      if (formData.role === "owner" && (!formData.shopAddress || !formData.location)) {
        setError("Shop address and location are required for owners.");
        return;
      }

      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== "") {
          payload.append(key, value as string | Blob);
        }
      });

      const response = await axios.post("http://localhost:5000/api/auth/signup", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(response.data.message); // Show success message
      navigate("/login");
    } catch (err: any) {
      setError(err.response?.data?.error || "An error occurred");
    }
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const cities = [
    "Delhi",
    "Mumbai",
    "Bangalore",
    "Hyderabad",
    "Chennai",
    "Kolkata",
    "Pune",
    "Ahmedabad",
    "Jaipur",
    "Surat",
    "Jalgaon",
    "Yawal",
  ]; // Add more cities if needed

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      role: e.target.value,
    });
  };

  return (
    <div className="flex items-start">
      {/* Left Section */}
      <div className="relative w-1/2 flex flex-col">
        <div className="absolute top-[15%] left-[4%] flex flex-col backdrop-blur-sm">
          <h1 className="text-8xl font-bold text-black">Join the Ultimate Salon Experience</h1>
          <p className="p-5 mt-6 text-3xl font-semibold text-black">
            Step into a world of luxury and style. Discover top-rated{" "}
            <span className="bg-[#c1f497] uppercase font-semibold">salons</span> and{" "}
            <span className="bg-[#c1f497] uppercase font-semibold">beauty services</span> near you.
            Get exclusive deals, book appointments, and transform your look effortlessly!
          </p>
        </div>

        <img src={img} className="w-full h-screen object-cover" alt="Signup" />
      </div>

      {/* Right Section */}
      <div className="w-1/2 h-screen flex flex-col p-8 justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <img src={logo} alt="Brand Logo" className="w-10 h-auto mr-3" />
          <h1 className="text-lg text-black font-bold">Soft@</h1>
        </div>

        {/* Signup Form */}
        <div className="w-full flex flex-col text-black pb-8">
          <h2 className="text-4xl font-semibold mb-4">Signup</h2>
          <p className="mb-6">
            Create your account and unlock exclusive salon experiences and offers!
          </p>

          {error && <p className="text-red-500">{error}</p>}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  value="customer"
                  checked={formData.role === "customer"}
                  onChange={handleRoleChange}
                />
                Customer
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  value="owner"
                  checked={formData.role === "owner"}
                  onChange={handleRoleChange}
                />
                Owner
              </label>
            </div>

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleInputChange}
              className="p-3 rounded-lg border border-black text-black focus:outline-none"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              className="p-3 rounded-lg border border-black text-black focus:outline-none"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="p-3 rounded-lg border border-black text-black focus:outline-none"
            />

            {formData.role === "owner" && (
              <>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleInputChange}
                  className="p-3 rounded-lg border border-black text-black focus:outline-none"
                />
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="p-3 rounded-lg border border-black text-black focus:outline-none"
                >
                  <option value="">Select City</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
                <textarea
                  name="shopAddress"
                  placeholder="Shop Address"
                  value={formData.shopAddress}
                  onChange={handleInputChange}
                  className="p-3 rounded-lg border border-black text-black focus:outline-none"
                />
              </>
            )}

            <button
              type="submit"
              className="p-3 rounded-lg bg-black text-white font-semibold hover:bg-[#c1f497] hover:text-black"
            >
              Signup
            </button>
            <div className="w-full text-black mt-1 text-center">
              <p>
                Already have an account?{" "}
                <button
                  onClick={handleLoginClick}
                  className="text-blue-400 hover:underline"
                >
                  Login
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
