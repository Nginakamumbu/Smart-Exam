import React from "react";

const AdminTimetable = () => {
  // Mock timetable data
  const timetable = [
    { day: 1, time: "8:00-10:00 AM", unitCode: "EEE2404", unit: "CONTROL 4", venue: "001" },
    { day: 2, time: "8:00-10:00 AM", unitCode: "EEE2404", unit: "CONTROL 4", venue: "002" },
    { day: 3, time: "8:00-10:00 AM", unitCode: "EEE2404", unit: "CONTROL 4", venue: "003" },
    { day: 4, time: "8:00-10:00 AM", unitCode: "EEE2404", unit: "CONTROL 4", venue: "004" },
    { day: 5, time: "8:00-10:00 AM", unitCode: "EEE2404", unit: "CONTROL 4", venue: "005" },
  ];

  return (
    <div className="flex flex-col items-center p-6 bg-gradient-to-r from-green-300 to-blue-300 min-h-screen">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-white mb-4 border-b-2 pb-2">Bsc Electronic And Computer Engineering</h1>

      {/* Timetable Container */}
      <div className="bg-white shadow-md rounded-lg w-3/4">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-green-500 text-white">
              <th className="p-3 border">DAY</th>
              <th className="p-3 border">TIME</th>
              <th className="p-3 border">UNIT CODE</th>
              <th className="p-3 border">UNIT</th>
              <th className="p-3 border">VENUE</th>
            </tr>
          </thead>
          <tbody>
            {timetable.map((row, index) => (
              <tr key={index} className="text-center border hover:bg-green-200">
                <td className="p-3 border">{row.day}</td>
                <td className="p-3 border">{row.time}</td>
                <td className="p-3 border">{row.unitCode}</td>
                <td className="p-3 border">{row.unit}</td>
                <td className="p-3 border">{row.venue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTimetable;
