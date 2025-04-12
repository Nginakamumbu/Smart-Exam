import React from "react";


const AboutUsPage= () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-500 to-green-400">a
      
      {/* Content Section */}
      <div className="flex justify-center items-center mt-10">
        <div className="bg-white p-6 rounded-lg shadow-xl w-10/12 md:w-3/5 lg:w-3/5 text-center">
          <h2 className="text-3xl font-bold text-black">About Us</h2>
          <div className="bg-gradient-to-r from-blue-400 to-green-300 p-4 rounded-md mt-4">
            <p className="text-black font-medium">
              Welcome to <span className="font-bold">Smart Examination System</span>, a platform designed to enhance exam management through efficiency, security, and automation.
            </p>
            <p className="text-black mt-2">
              Our system streamlines scheduling, student registration, examiner assignments, and notifications, ensuring a smooth examination process for all users. With real-time monitoring and smart alerts, we help maintain exam integrity while reducing administrative workload.
            </p>
            <p className="text-black mt-2">
              Whether you're an administrator, examiner, or student, our system provides the tools you need for a well-organized and transparent exam experience.
            </p>
            <p className="italic font-semibold text-black mt-4">
              Effortless Exam Management. Smarter, Faster, and Secure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
