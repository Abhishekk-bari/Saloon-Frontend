import img from "../assets/login.png";
import logo from "../assets/Logo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", formData);
      const { token, role, username, image, shopAddress } = response.data; // capture image and shopAddress

      // Save token, role, username, image, and shopAddress in local storage
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("username", username);
      if (image) localStorage.setItem("image", image); // save image path if it exists
      if (shopAddress) localStorage.setItem("shopAddress", shopAddress); // save shop address if it exists

      // Navigate based on role
      if (role === "customer") navigate("/find-saloon");
      else if (role === "owner") navigate("/dashboard/my-salons");
      else if (role === "admin") navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.error || "An error occurred");
    }
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  return (
    <div className="flex items-start bg-white">
      {/* Left Section */}
      <div className="relative w-1/2 flex flex-col">
        <div className="absolute top-[25%] left-[4%] flex flex-col backdrop-blur-sm">
          <h1 className="text-[6.5vw] font-bold text-black">Welcome Back!</h1>
          <p className="p-5 mt-6 text-3xl text-black">
            Reconnect with the best{" "}
            <span className="bg-[#c1f497] uppercase font-semibold">beauty</span> and{" "}
            <span className="bg-[#c1f497] uppercase font-semibold">grooming</span> services.
          </p>
        </div>
        <img src={img} className="w-full h-screen object-cover" alt="Login" />
      </div>

      {/* Right Section */}
      <div className="w-1/2 h-screen flex flex-col p-20 justify-between bg-white">
        {/* Logo */}
        <div className="flex items-center mb-8">
          <img src={logo} alt="Brand Logo" className="w-10 h-auto mr-3" />
          <h1 className="text-lg text-black font-bold">Soft@</h1>
        </div>

        {/* Login Form */}
        <div className="w-full flex flex-col text-black">
          <h2 className="text-4xl font-semibold mb-4">Login</h2>
          <p className="mb-6">Sign in to access your personalized salon experience.</p>

          {error && <p className="text-red-500">{error}</p>}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
              className="p-3 rounded-lg  border border-black text-black focus:outline-none"
            />
            <button
              type="submit"
              className="p-3 rounded-lg bg-black text-white font-semibold hover:bg-[#c1f497] hover:text-black"
            >
              Login
            </button>
          </form>
        </div>

        {/* Signup Link */}
        <div className="w-full text-black mt-4 text-center">
          <p>
            Don't have an account?{" "}
            <button
              onClick={handleSignupClick}
              className="text-blue-400 hover:underline"
            >
              Sign up here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
