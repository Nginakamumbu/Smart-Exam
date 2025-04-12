import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-green-300 to-blue-300 p-6">
      {/* Navigation Bar */}
      <nav className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center space-x-3">
          <img src="/assets/jkuat-logo.png" alt="JKUAT Logo" className="w-12 h-12" />
          <h1 className="text-xl font-bold text-green-600">JKUAT EXAMINATIONS PORTAL</h1>
        </div>
        <div className="space-x-6">
          <Link to="/login" className="text-gray-700 font-medium hover:text-green-500">Login</Link>
          <Link to="/signup" className="text-gray-700 font-medium hover:text-green-500">Sign up</Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex justify-center items-center mt-10">
        {/* Left Side: Text */}
        <div className="text-white max-w-md">
          <h2 className="text-3xl font-bold mb-4">Transforming Examination Processes with Smart Solutions</h2>
          <p className="text-lg">
            Our web app simplifies your exam experience with tailored dashboards for students, examiners, and administrators, making management seamless.
          </p>
        </div>

        {/* Right Side: Image */}
        <div className="ml-10 bg-white p-4 rounded-lg shadow-lg">
          <img src="/assets/exam-portal.png" alt="Exam Portal" className="w-80 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
