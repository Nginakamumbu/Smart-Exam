import React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const admin = {
    name: "Charles Cartier",
    employeeNumber: "XXXXXXXXXX",
    department: "Electronic and Computer Engineering",
    semester: "2024/2025",
    examCount: 3,
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear session data
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-blue-900 text-white p-5">
        <img src="/logo.png" alt="University Logo" className="w-20 mx-auto mb-4" />
        <ul className="space-y-4">
          <li className={`font-bold ${location.pathname === "/admin-dashboard" ? "text-yellow-300" : ""}`}>
            <Link to="/admin-dashboard">Home</Link>
          </li>
          <li className={location.pathname.includes("/admin-dashboard/timetable") ? "text-yellow-300" : ""}>
            <Link to="/admin-dashboard/timetable">Timetable</Link>
          </li>
          <li className={location.pathname.includes("/admin-dashboard/exam-schedule") ? "text-yellow-300" : ""}>
            <Link to="/admin-dashboard/exam-schedule">Exam Schedule</Link>
          </li>
          <li className={location.pathname.includes("/admin-dashboard/notifications") ? "text-yellow-300" : ""}>
            <Link to="/admin-dashboard/notifications">Notifications</Link>
          </li>
          <li className={location.pathname.includes("/admin-dashboard/fingerprint") ? "text-yellow-300" : ""}>
            <Link to="/admin-dashboard/fingerprint">Enroll Fingerprint</Link>
          </li>
          <li className="text-red-400">
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Log out ➜
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 bg-gradient-to-r from-green-300 to-blue-300">
        {/* Show dashboard content only on main page */}
        {location.pathname === "/admin-dashboard" && (
          <>
            <h2 className="text-xl font-bold text-white text-right">
              Welcome Back, <span className="text-gray-100">{admin.name}</span>
            </h2>

            <div className="flex space-x-4 mt-6">
              {/* Admin Info */}
              <div className="w-2/3 bg-white p-6 rounded-lg shadow-md flex justify-between">
                <div>
                  <h3 className="font-bold">Name: <span className="text-black">{admin.name}</span></h3>
                  <h3 className="font-bold">Employee Number: <span className="text-black">{admin.employeeNumber}</span></h3>
                  <h3 className="font-bold">Department: <span className="text-black">{admin.department}</span></h3>
                </div>
                </div>
                <div className="w-1/3 bg-green-400 p-4 rounded-lg shadow-md flex justify-center">
                <img src="/admin.png" alt="Examiner" className="w-24 h-24 rounded-full" />
              </div>
            </div>
            

            {/* Semester Info & Exam Stats */}
            <div className="flex space-x-4 mt-6">
              <div className="w-1/2 bg-white p-4 rounded-lg shadow-md">
                <h3 className="font-bold">Current Semester Information</h3>
                <p>Semester session: <span className="font-bold">{admin.semester}</span></p>
              </div>

              <div className="w-1/2 bg-white p-4 rounded-lg shadow-md text-center">
                <h3 className="font-bold">Number of Examinations</h3>
                <p className="text-3xl font-bold text-green-600">{admin.examCount}</p>
              </div>
            </div>
          </>
        )}

        
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;