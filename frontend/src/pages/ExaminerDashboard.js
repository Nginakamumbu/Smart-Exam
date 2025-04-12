import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const ExaminerDashboard = () => {
  const location = useLocation(); // Get the current path

  // Updated mock data
  const examiner = {
    name: "Charles Cartier",
    employeeNumber: "XXXXXXXXXX",
    department: "Electronic and Computer Engineering",
    semester: "2024/2025",
    courseUnit: "CONTROL 4",
    enrolledStudents: 5,
  };
  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear authentication token
    localStorage.removeItem("user");  // Clear stored user data
    window.location.href = "/login";  // Redirect to login page
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-gradient-to-r from-blue-700 to-blue-500 p-5 text-white">
        <img src="/logo.png" alt="University Logo" className="w-20 mx-auto mb-4" />
        <ul className="space-y-4">
          <li className={`font-bold ${location.pathname === "/examiner-dashboard" ? "text-yellow-300" : ""}`}>
            <Link to="/examiner-dashboard">Home</Link>
          </li>
          <li className={`${location.pathname.includes("/examiner-dashboard/timetable") ? "text-yellow-300" : ""}`}>
            <Link to="/examiner-dashboard/timetable">Timetable</Link>
          </li>
          <li className={`${location.pathname.includes("/examiner-dashboard/notifications") ? "text-yellow-300" : ""}`}>
            <Link to="/examiner-dashboard/notifications">Notifications</Link>
          </li>
          <li className="text-red-400">
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
           Log out ➜
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 bg-gradient-to-r from-green-300 to-blue-300">
        {/* Show Dashboard content ONLY if on /examiner-dashboard, not on subpages */}
        {location.pathname === "/examiner-dashboard" && (
          <>
            {/* Welcome Message */}
            <h2 className="text-xl font-bold text-white text-right">
              Welcome Back, <span className="text-gray-100">{examiner.name}</span>
            </h2>

            <div className="flex space-x-4 mt-6">
              {/* Examiner Info */}
              <div className="w-2/3 bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-bold">Name: <span className="text-black">{examiner.name}</span></h3>
                <h3 className="font-bold">Employee Number: <span className="text-black">{examiner.employeeNumber}</span></h3>
                <h3 className="font-bold">Department: <span className="text-black">{examiner.department}</span></h3>
              </div>

              {/* Profile Image */}
              <div className="w-1/3 bg-green-400 p-4 rounded-lg shadow-md flex justify-center">
                <img src="/Examiner.png" alt="Examiner" className="w-24 h-24 rounded-full" />
              </div>
            </div>

            {/* Semester Info & Enrolled Students */}
            <div className="flex space-x-4 mt-6">
              <div className="w-1/2 bg-white p-4 rounded-lg shadow-md">
                <h3 className="font-bold">Current Semester Information</h3>
                <p>Semester: {examiner.semester}</p>
                <p>Course Unit: {examiner.courseUnit}</p>
              </div>

              <div className="w-1/2 bg-white p-4 rounded-lg shadow-md text-center">
                <h3 className="font-bold">ENROLLED STUDENTS</h3>
                <p className="text-3xl font-bold text-green-600">{examiner.enrolledStudents}</p>
              </div>
            </div>
          </>
        )}

        {/* Nested Routes (Timetable, Notifications) */}
        <Outlet />
      </div>
    </div>
  );
};

export default ExaminerDashboard;
