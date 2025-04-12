import React from "react";
import { Link } from "react-router-dom";
import { Bell } from "lucide-react"; // Using lucide-react for the bell icon

const ExaminerNotifications = () => {
  // Sample notifications
  const notifications = ["Exam Scheduled for EEE2404", "Meeting on Friday at 10 AM", "New Assignment Uploaded"];
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

        {/* Notification Box */}
        <div className="flex justify-center items-center mt-6">
          <div className="bg-purple-200 p-6 rounded-lg shadow-md text-center border-2 border-black relative w-3/4">
            {/* Notification Icon */}
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white p-3 rounded-full border-2 border-black">
              <Bell size={30} className="text-black" />
            </div>

            {/* Notification List */}
            <ul className="mt-8 text-lg font-semibold">
              {notifications.length > 0 ? (
                notifications.map((notification, index) => (
                  <li key={index} className="mb-2">{notification}</li>
                ))
              ) : (
                <li className="text-gray-500">No new notifications</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExaminerNotifications;
