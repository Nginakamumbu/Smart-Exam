import React, { useState } from "react";
import { Link } from "react-router-dom";

const ExamRegistration = () => {
  const student = {
    name: "Charles Cartier",
    regNumber: "ENE212-0654/2020",
    department: "BSc Electronic And Computer Engineering",
    units: [
      { code: "EEE2404", name: "CONTROL 4" },
      { code: "EEE2301", name: "DIGITAL SYSTEMS" },
    ],
  };

  // State to track selected units
  const [selectedUnits, setSelectedUnits] = useState([]);

  // Function to handle checkbox selection
  const handleCheckboxChange = (unitCode) => {
    setSelectedUnits((prevSelected) =>
      prevSelected.includes(unitCode)
        ? prevSelected.filter((code) => code !== unitCode) // Uncheck
        : [...prevSelected, unitCode] // Check
    );
  };

  // Function to handle update button click
  const handleUpdate = () => {
    alert(`Registered Units: ${selectedUnits.join(", ")}`);
    // Here, you can send `selectedUnits` to an API or store them
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

        {/* Exam Registration Table */}
        <div className="flex justify-center mt-6">
          <table className="border-collapse bg-white rounded-lg shadow-md w-2/3">
            <thead>
              <tr className="bg-green-200">
                <th className="border p-2">UNIT CODE</th>
                <th className="border p-2">UNIT</th>
                <th className="border p-2">REGISTER</th>
              </tr>
            </thead>
            <tbody>
              {student.units.map((unit, index) => (
                <tr key={index} className="text-center">
                  <td className="border p-2">{unit.code}</td>
                  <td className="border p-2">{unit.name}</td>
                  <td className="border p-2">
                    <input
                      type="checkbox"
                      className="w-5 h-5"
                      checked={selectedUnits.includes(unit.code)}
                      onChange={() => handleCheckboxChange(unit.code)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Update Button */}
        <div className="flex justify-center mt-6">
          <button
            className="bg-white px-6 py-2 rounded-lg shadow-md text-lg font-bold border"
            onClick={handleUpdate}
          >
            UPDATE
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExamRegistration;
