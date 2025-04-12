import React from "react";

const AdminExamSchedule = () => {
  // Mock exam schedule data
  const examSchedule = [
    { examiner: "XXXXX", unitCode: "EEE2404", unit: "CONTROL 4" },
    { examiner: "XXXXX", unitCode: "EEE2404", unit: "CONTROL 4" },
    { examiner: "XXXXX", unitCode: "EEE2404", unit: "CONTROL 4" },
    { examiner: "XXXXX", unitCode: "EEE2404", unit: "CONTROL 4" },
    { examiner: "XXXXX", unitCode: "EEE2404", unit: "CONTROL 4" },
  ];

  return (
    <div className="flex flex-col items-center p-6 bg-gradient-to-r from-green-300 to-blue-300 min-h-screen">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-white mb-4 border-b-2 pb-2">
        Bsc Electronic And Computer Engineering
      </h1>

      {/* Exam Schedule Container */}
      <div className="bg-white shadow-md rounded-lg w-3/4">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-green-500 text-white">
              <th className="p-3 border">EXAMINER</th>
              <th className="p-3 border">UNIT CODE</th>
              <th className="p-3 border">UNIT</th>
            </tr>
          </thead>
          <tbody>
            {examSchedule.map((row, index) => (
              <tr key={index} className="text-center border hover:bg-green-200">
                <td className="p-3 border">{row.examiner}</td>
                <td className="p-3 border">{row.unitCode}</td>
                <td className="p-3 border">{row.unit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminExamSchedule;
