import React from "react";
import { Bell } from "lucide-react"; // Importing a bell icon for notifications

const AdminNotifications = () => {
  // Sample notifications data
  const notifications = [
    "Notification 1",
    "Notification 1",
    "Notification 1",
  ];

  return (
    <div className="flex flex-col items-center p-6 bg-gradient-to-r from-green-300 to-blue-300 min-h-screen">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-white mb-4 border-b-2 pb-2">
        Bsc Electronic And Computer Engineering
      </h1>

      {/* Notifications Container */}
      <div className="bg-white shadow-lg rounded-lg w-3/4 flex justify-center items-center p-6">
        <div className="bg-purple-200 p-6 rounded-lg border-4 border-black w-1/2 text-center">
          <div className="flex justify-center mb-3">
            <div className="bg-white p-3 rounded-full border-2 border-black">
              <Bell size={40} className="text-black" />
            </div>
          </div>

          {/* Display notifications */}
          {notifications.map((note, index) => (
            <p key={index} className="text-black font-bold">{note}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminNotifications;
