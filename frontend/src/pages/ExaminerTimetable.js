import React from "react";
import { Link } from "react-router-dom";

const ExaminerTimetable = () => {
  const timetable = [
    { day: 1, date: "18/5/2025", time: "8:00-10:00 AM", unitCode: "EEE2404", unit: "CONTROL 4", venue: "001" , examiner: "Dr.Akinyi" },
    { day: 2, date: "19/5/2025", time: "8:00-10:00 AM", unitCode: "EEE2404", unit: "CONTROL 4", venue: "002" , examiner: "Ms Nekesa" },
    { day: 3, date: "22/5/2025", time: "8:00-10:00 AM", unitCode: "EEE2404", unit: "CONTROL 4", venue: "003" , examiner: "Mr.Maina"},
  ];
  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear authentication token
    localStorage.removeItem("user");  // Clear stored user data
    window.location.href = "/login";  // Redirect to login page
  };

  return (
    
      <div>

      {/* Main Content */}
      <div className="flex-1 p-8 bg-gray-100">
        <h2 className="text-right text-green-700 font-bold text-xl">**Examiner Name**</h2>
        <h3 className="text-center font-bold text-lg text-blue-900">Bsc Electronic And Computer Engineering</h3>

        {/* Timetable Table */}
        <div className="mt-6 bg-green-300 p-6 rounded-lg shadow-md">
          <table className="w-full border-collapse border border-gray-400 text-center">
            <thead>
              <tr className="bg-green-500 text-white">
                <th className="border border-gray-400 p-2">DAY</th>
                <th className="border border-gray-400 p-2">DATE</th>
                <th className="border border-gray-400 p-2">TIME</th>
                <th className="border border-gray-400 p-2">UNIT CODE</th>
                <th className="border border-gray-400 p-2">UNIT</th>
                <th className="border border-gray-400 p-2">VENUE</th>
                <th className="border border-gray-400 p-2">EXAMINER</th>
              </tr>
            </thead>
            <tbody>
              {timetable.map((entry, index) => (
                <tr key={index} className="bg-green-200">
                  <td className="border border-gray-400 p-2">{entry.day}</td>
                  <td className="border border-gray-400 p-2">{entry.date}</td>
                  <td className="border border-gray-400 p-2">{entry.time}</td>
                  <td className="border border-gray-400 p-2">{entry.unitCode}</td>
                  <td className="border border-gray-400 p-2">{entry.unit}</td>
                  <td className="border border-gray-400 p-2">{entry.venue}</td>
                  <td className="border border-gray-400 p-2">{entry.examiner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExaminerTimetable;