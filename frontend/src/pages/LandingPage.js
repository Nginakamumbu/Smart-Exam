import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 flex flex-col items-center justify-center text-white">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center max-w-5xl p-8">
        {/* Left Side: Text */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-3xl font-bold">Transforming Examination Processes with Smart Solutions</h2>
          <p className="mt-4 text-lg">
            Our web app simplifies your exam experience with tailored dashboards for students, examiners, and administrators, making management seamless.
          </p>
        </div>

        {/* Right Side: Image Placeholder */}
        <div className="flex-1.5 flex justify-center">
  <img
    src="/landing.png"
    alt="landing photo"
    className="w-full max-w-[800px] h-auto rounded-xl shadow-lg"
  />
</div>

      </div>

      {/* Login & Sign Up Buttons */}
      <div className="mt-6 space-x-4">
        <Link to="/login">
          <button className="px-4 py-2 bg-white text-black rounded-lg border border-gray-300 hover:bg-gray-200 transition">
            Login
          </button>
        </Link>
        <Link to="/signup">
          <button className="px-4 py-2 bg-white text-black rounded-lg border border-gray-300 hover:bg-gray-200 transition">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
