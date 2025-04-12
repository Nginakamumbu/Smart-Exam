import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import ExamRegistration from "./ExamRegistration";
import MyExams from "./MyExams";
import Timetable from "./Timetable";
import Notifications from "./Notifications";

const StudentDashboard = () => {
  const student = {
    firstName: "Charles",
    lastName: "Cartier",
    regNumber: "ENE212-0654/2020",
    department: "Electronic and Computer Engineering",
    semester: "2024/2025",
    regEndDate: "4/2/2025",
    feeBalance: "-2600/=",
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear authentication token
    localStorage.removeItem("user");  // Clear stored user data
    window.location.href = "/login";  // Redirect to login page
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-blue-900 text-white p-5">
        <img src="/logo.png" alt="Logo" className="w-20 mx-auto mb-4" />
        <ul className="space-y-4">
          <li className="font-bold">
            <Link to="/student-dashboard" className="hover:underline">Home</Link>
          </li>
          <li>
            <Link to="/student-dashboard/exam-registration" className="hover:underline">Exam Registration</Link>
          </li>
          <li>
            <Link to="/student-dashboard/my-exams" className="hover:underline">My Exams</Link>
          </li>
          <li>
            <Link to="/student-dashboard/timetable" className="hover:underline">Timetable</Link>
          </li>
          <li>
            <Link to="/student-dashboard/notifications" className="hover:underline">Notifications</Link>
          </li>
          <li className="text-red-400">
            <button onClick={handleLogout} className="w-full text-left">
              Log out ➜
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h2 className="text-green-600 text-xl font-bold text-right">
          Welcome Back, <span className="text-green-800">{student.firstName}</span>
        </h2>
        
        <Routes>
          <Route path="/" element={
            <>
              <div className="flex space-x-4 mt-6">
                <div className="w-2/3 bg-gradient-to-r from-purple-400 to-blue-300 p-6 rounded-lg shadow-md">
                  <h3 className="font-bold">Name: <span className="text-black">{student.firstName} {student.lastName}</span></h3>
                  <h3 className="font-bold">Registration Number: <span className="text-black">{student.regNumber}</span></h3>
                  <h3 className="font-bold">Department: <span className="text-black">{student.department}</span></h3>
                </div>
                <div className="w-1/3 bg-green-400 p-4 rounded-lg shadow-md flex justify-center items-center">
                  <img src="/student.png" alt="Profile" className="w-24 h-24 rounded-full" />
                </div>
              </div>

              <div className="flex space-x-4 mt-6">
                <div className="w-1/2 bg-green-300 p-4 rounded-lg shadow-md">
                  <h3 className="font-bold">Current Semester Information</h3>
                  <p>Semester session: {student.semester}</p>
                  <p>Course registration end date: {student.regEndDate}</p>
                </div>
                <div className="w-1/2 bg-purple-300 p-4 rounded-lg shadow-md text-center">
                  <h3 className="font-bold">Your semester fees</h3>
                  <p className="text-2xl font-bold text-red-600">{student.feeBalance}</p>
                </div>
              </div>
            </>
          } />
          <Route path="exam-registration" element={<ExamRegistration />} />
          <Route path="my-exams" element={<MyExams />} />
          <Route path="timetable" element={<Timetable />} />
          <Route path="notifications" element={<Notifications />} />
        </Routes>
      </div>
    </div>
  );
};

export default StudentDashboard;