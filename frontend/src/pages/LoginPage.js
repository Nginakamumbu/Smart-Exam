import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Simulated authentication (Replace with real backend API)
    const mockUsers = {
      "student123": {
        password: "pass123",
        role: "student"
      },
      "examiner456": {
        password: "examinerPass",
        role: "examiner"
      },
      "admin789": {
        password: "adminPass",
        role: "admin"
      },
    };

    // Check if the username and password match
    if (mockUsers[username] && mockUsers[username].password === password) {
      const userRole = mockUsers[username].role;

      // Store user data in localStorage (or state management)
      localStorage.setItem("userRole", userRole);
      localStorage.setItem("username", username); // Store username

      // Redirect user based on role
      if (userRole === "student") {
        navigate("/student-dashboard");
      } else if (userRole === "examiner") {
        navigate("/examiner-dashboard");
      } else if (userRole === "admin") {
        navigate("/admin-dashboard");
      }
    } else {
      alert("Invalid Username or Password! Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-500 to-green-400 flex flex-col items-center">
      {/* Main Container */}
      <div className="p-6 rounded-lg shadow-xl w-10/12 md:w-3/5 lg:w-3/5 bg-white">
        <h2 className="text-2xl font-bold text-gray-700">LOGIN TO YOUR ACCOUNT</h2>

        <form className="mt-5" onSubmit={handleLogin}>
          {/* Username */}
          <label className="block text-gray-900 font-semibold mt-2">
            Username (Student/Employee No):
          </label>
          <input
            type="text"
            placeholder="Enter your Student/Employee Number"
            className="w-full p-2 border rounded-md mt-1"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          {/* Password */}
          <label className="block text-gray-900 font-semibold mt-2">
            Password:
          </label>
          <input
            type="password"
            placeholder="Enter your Password"
            className="w-full p-2 border rounded-md mt-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Login Button */}
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg mt-3 hover:bg-blue-700 transition"
          >
            LOGIN
          </button>
        </form>

        {/* Sign Up Link */}
        <p className="mt-4 text-gray-700">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 font-bold hover:underline">
            Sign Up now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;