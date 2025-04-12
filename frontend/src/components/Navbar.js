import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-teal-500 to-green-400 p-4 shadow-md flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center">
        <img src="/logo.png" alt="JKUAT Logo" className="h-12 mr-3" />
        <h1 className="text-lg font-bold text-white">JKUAT EXAMINATIONS PORTAL</h1>
      </div>

      {/* Navigation Links */}
      <div className="space-x-4">
        <Link to="/" className="px-4 py-2 bg-white text-black rounded-lg border border-gray-300 hover:bg-gray-200 transition">
          Home
        </Link>
        <Link to="/about" className="px-4 py-2 bg-white text-black rounded-lg border border-gray-300 hover:bg-gray-200 transition">
          About Us
        </Link>
        <Link to="/help" className="px-4 py-2 bg-white text-black rounded-lg border border-gray-300 hover:bg-gray-200 transition">
          Help
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
