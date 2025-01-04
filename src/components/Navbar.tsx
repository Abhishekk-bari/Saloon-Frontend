import  { useState } from "react";
import logo from "../assets/Logo.png";
import { navigation } from "../constants/index";
import { useLocation, useNavigate } from "react-router-dom";


function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate('/login');
  }

  return (
    <div className="fixed w-full top-5 z-50 bg-n-8/90 backdrop-blur-xl border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm ">
      <div className="flex items-center lg:px-7.5 xl:px-10 max-lg:py-4">
        {/* Logo */}
        <a className="block xl:mr-8">
          <img src={logo} width={40} height={20} alt="logo" />
        </a>

        {/* Hamburger Button (visible on mobile) */}
        <button
          className="lg:hidden ml-auto text-black focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={
                isMenuOpen
                  ? "M6 18L18 6M6 6l12 12" // Close icon (X)
                  : "M4 6h16M4 12h16m-7 6h7" // Hamburger icon
              }
            />
          </svg>
        </button>

        {/* Navigation Menu */}
        <nav
          className={`${
            isMenuOpen ? "block" : "hidden"
          } lg:flex lg:items-center lg:static lg:mx-auto lg:bg-transparent fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 text-black z-10`}
        >
          <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row ">
            {navigation.map((item) => (
              <a
                key={item.id}
                href={item.url}
                className={`block relative font-mono text-xl uppercase ${
                  item.onlyMobile ? "lg:hidden" : ""
                } px-6 py-1 hover:text-[#c1f497] ${
                  item.url === location.pathname
                    ? "z-2 lg:text-n-1"
                    : "lg:text-n-1/50"
                } lg:leading-5 lg:hover:text-n-1 xl:px-5`}
              >
                {item.title}
              </a>
            ))}
          </div>
          <div className="flex flex-col items-center gap-4 lg:flex-row lg:gap-10 lg:pl-[55vw] text-lg font-mono">
            <button onClick={handleLoginClick}
              className="border border-[#c1f497] text-[#000000] px-5 py-1 rounded-lg"
            >
              Login
            </button>
            <a href="#contact" className="py-1 hover:text-[#c1f497]">Contact</a>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
