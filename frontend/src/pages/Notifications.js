import React from "react";
import { Link } from "react-router-dom";
import { Bell } from "lucide-react"; // Notification icon

const Notifications = () => {
  const student = {
    name: "Charles Cartier",
    regNumber: "ENE212-0654/2020",
    department: "BSc Electronic And Computer Engineering",
    notifications: [
      "Notification 1",
      "Notification 1",
      "Notification 1",
    ],
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

        {/* Notifications Box */}
        <div className="flex justify-center mt-6">
          <div className="bg-purple-200 p-6 rounded-lg shadow-md w-1/2 text-center border-4 border-black">
            <Bell size={40} className="mx-auto mb-3" />
            {student.notifications.map((note, index) => (
              <p key={index} className="text-lg">{note}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
