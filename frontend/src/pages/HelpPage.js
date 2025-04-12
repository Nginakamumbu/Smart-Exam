import React from "react";

const HelpPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-green-300 to-blue-300">
    
      <div className="flex justify-center items-center mt-10">
        <div className="bg-white p-6 rounded-lg shadow-xl w-10/12 md:w-3/5 lg:w-3/5 text-center">
          <h2 className="text-3xl font-bold text-black">Help & Support</h2>
          <div className="bg-gradient-to-r from-blue-500 to-green-400 p-4 rounded-md mt-4">
            <p className="text-black font-medium">
              Having trouble? Contact the system administrator for assistance.
            </p>
            <p className="text-black mt-2 font-bold">Common Issues:</p>
            <ul className="text-black text-left mx-auto w-10/12 mt-2">
              <li>◆ Missing exam details or timetable? Log in and check again. If still missing, contact admin.</li>
              <li>◆ Exam registration not showing? Ensure it's processed. Reach out if the issue persists.</li>
              <li>◆ Fee balance alert incorrect? If you've paid but still see an alert, contact admin.</li>
            </ul>
            <p className="mt-4">📧 <strong>Admin Contact:</strong> xxxxxx@gmail.com</p>
            <p>📞 <strong>Support Line:</strong> +254 7xxxxxxxx</p>
            <p className="italic font-semibold text-black mt-4">We're here to help!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
