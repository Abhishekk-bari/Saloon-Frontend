import img from "../assets/signup.jpg";
import logo from "../assets/Logo.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer" //default for signup
  });

  const [error, setError] = useState(" ");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/signup", formData);
      alert(response.data.message); // Show success message
      navigate("/login");
    } catch (err: any) {
      setError(err.response?.data?.error || "An error occurred");
    }
  };

  
  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="flex items-start bg-black">
      {/* Left Section */}
      <div className="relative w-1/2 flex flex-col">
        <div className="absolute top-[15%] left-[4%] flex flex-col backdrop-blur-sm">
          <h1 className="text-8xl font-bold text-black">Join the Ultimate Salon Experience</h1>
          <p className="p-5 mt-6 text-3xl text-black">Step into a world of luxury and style. Discover top-rated <span className="bg-[#c1f497] uppercase font-semibold">salons</span> and <span className="bg-[#c1f497] uppercase font-semibold">beauty services</span> near you. Get exclusive deals, book appointments, and transform your look effortlessly!</p>
        </div>

        <img src={img} className="w-full h-screen object-cover" alt="Signup" />
      </div>

      {/* Right Section */}
      <div className="w-1/2 h-screen flex flex-col p-20 justify-between bg-black">
        {/* Logo */}
        <div className="flex items-center mb-8">
          <img src={logo} alt="Brand Logo" className="w-10 h-auto mr-3" />
          <h1 className="text-lg text-white font-bold">Soft@</h1>
        </div>

        {/* Signup Form */}
        <div className="w-full flex flex-col text-white">
          <h2 className="text-4xl font-semibold mb-4">Signup</h2>
          <p className="mb-6">
            Create your account and unlock exclusive salon experiences and offers!
          </p>

          {error && <p className="text-red-500">{error}</p>}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleInputChange}
              className="p-3 rounded-lg bg-gray-200 text-black focus:outline-none"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              className="p-3 rounded-lg bg-gray-200 text-black focus:outline-none"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="p-3 rounded-lg bg-gray-200 text-black focus:outline-none"
            />
            <button
              type="submit"
              className="p-3 rounded-lg bg-white text-black font-semibold hover:bg-[#c1f497]"
            >
              Signup
            </button>
            <div className="w-full text-white mt-4 text-center">
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