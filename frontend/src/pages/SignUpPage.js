import React from "react";
import { Link } from "react-router-dom";

const SignUpPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-500 to-green-400 flex flex-col items-center">
      {/* Main Container */}
      <div className="p-6 rounded-lg shadow-xl w-10/12 md:w-3/5 lg:w-3/5 bg-gradient-to-r from-teal-500 to-green-400">
        <h2 className="text-2xl font-bold text-blue-900 text-center">REGISTER YOUR ACCOUNT</h2>

        {/* Name Inputs (Side by Side) */}
        <div className="flex gap-2 mt-4">
          <input type="text" placeholder="Enter First Name" className="w-1/2 p-2 border rounded-md" />
          <input type="text" placeholder="Enter Second Name" className="w-1/2 p-2 border rounded-md" />
        </div>

        {/* Other Input Fields */}
        <input type="text" placeholder="Username" className="w-full p-2 border rounded-md mt-3" />
        <input type="email" placeholder="Email Address" className="w-full p-2 border rounded-md mt-3" />
        <input type="password" placeholder="Password" className="w-full p-2 border rounded-md mt-3" />

        {/* Login Link */}
        <p className="text-sm mt-3 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold hover:underline">Login here</Link>
        </p>

        {/* Sign Up Button */}
        <button className="w-full bg-blue-600 text-white py-2 rounded-md mt-4 hover:bg-blue-700">
          SIGN UP
        </button>
      </div>
    </div>
  );
};

export default SignUpPage;
