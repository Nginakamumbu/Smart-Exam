import React from "react";
import { Link } from "react-router-dom";

const MyExams = () => {
  const student = {
    name: "Charles Cartier",
    regNumber: "ENE212-0654/2020",
    department: "BSc Electronic And Computer Engineering",
    exams: [
        { code: "EEE2404", name: "CONTROL 4" },
        { code: "EEE2501", name: "DIGITAL SYSTEMS" },
      ]
      
  };
  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear authentication token
    localStorage.removeItem("user");  // Clear stored user data
    window.location.href = "/login";  // Redirect to login page
  };
  return (
    
    <div>
      {/* Main Content */}
      <div className="flex-1 p-8 bg-gradient-to-r from-green-300 to-blue-300 rounded-lg">
        <h2 className="text-xl font-bold text-center">
          <span className="text-black">**{student.name}**</span> <br />
          <span className="text-black">**{student.regNumber}**</span>
        </h2>

        <h3 className="text-lg font-bold text-center mt-4">{student.department}</h3>

        {/* Exam Table */}
        <div className="flex justify-center mt-6">
          <table className="border-collapse bg-white rounded-lg shadow-md w-2/3">
            <thead>
              <tr className="bg-green-200">
                <th className="border p-2">UNIT CODE</th>
                <th className="border p-2">UNIT</th>
              </tr>
            </thead>
            <tbody>
              {student.exams.map((exam, index) => (
                <tr key={index} className="text-center">
                  <td className="border p-2">{exam.code}</td>
                  <td className="border p-2">{exam.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyExams;
