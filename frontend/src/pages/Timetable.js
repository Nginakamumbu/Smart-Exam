import React from "react";
import { Link } from "react-router-dom";

const Timetable = () => {
  const student = {
    name: "Charles Cartier",
    regNumber: "ENE212-0654/2020",
    department: "BSc Electronic And Computer Engineering",
    timetable: [
      { day: "1", time: "8:00 - 10:00 AM", code: "EEE2404", name: "CONTROL 4", venue: "001" },
      { day: "2", time: "8:00 - 10:00 AM", code: "EEE2404", name: "CONTROL 4", venue: "002" },
      { day: "3", time: "8:00 - 10:00 AM", code: "EEE2404", name: "CONTROL 4", venue: "003" },
    ],
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

        {/* Timetable Table */}
        <div className="flex justify-center mt-6">
          <table className="border-collapse bg-white rounded-lg shadow-md w-2/3">
            <thead>
              <tr className="bg-green-200">
                <th className="border p-2">DAY</th>
                <th className="border p-2">TIME</th>
                <th className="border p-2">UNIT CODE</th>
                <th className="border p-2">UNIT</th>
                <th className="border p-2">VENUE</th>
              </tr>
            </thead>
            <tbody>
              {student.timetable.map((exam, index) => (
                <tr key={index} className="text-center">
                  <td className="border p-2">{exam.day}</td>
                  <td className="border p-2">{exam.time}</td>
                  <td className="border p-2">{exam.code}</td>
                  <td className="border p-2">{exam.name}</td>
                  <td className="border p-2">{exam.venue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Timetable;
