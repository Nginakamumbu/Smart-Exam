import React, { useState } from "react";

const FingerprintEnrollment = () => {
  // State variables
  const [regNo, setRegNo] = useState("");
  const [fullName, setFullName] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [fingerprintCaptured, setFingerprintCaptured] = useState(false);
  const [message, setMessage] = useState("");

  // Simulate fingerprint capture (Mock)
  const captureFingerprint = () => {
    setFingerprintCaptured(true);
    setMessage("✅ Fingerprint Captured Successfully!");
  };

  // Simulate form submission (Mock)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!regNo || !fullName || !contact || !password || !fingerprintCaptured) {
      setMessage("⚠️ All fields including fingerprint are required!");
      return;
    }

    setMessage(`🎉 Student ${fullName} (Reg: ${regNo}) registered successfully!`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Fingerprint Enrollment</h2>

        {/* Student Registration Form */}
        <form onSubmit={handleSubmit}>
          <label className="block font-semibold">Registration Number:</label>
          <input
            type="text"
            className="w-full p-2 border rounded-md mb-2"
            value={regNo}
            onChange={(e) => setRegNo(e.target.value)}
            required
          />

          <label className="block font-semibold">Full Name:</label>
          <input
            type="text"
            className="w-full p-2 border rounded-md mb-2"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          <label className="block font-semibold">Contact:</label>
          <input
            type="text"
            className="w-full p-2 border rounded-md mb-2"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
          />

          <label className="block font-semibold">Password:</label>
          <input
            type="password"
            className="w-full p-2 border rounded-md mb-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Fingerprint Capture Section */}
          <div className="flex items-center space-x-4 my-4">
            <button
              type="button"
              className={`px-4 py-2 rounded-lg ${fingerprintCaptured ? "bg-green-600" : "bg-blue-600"} text-white hover:opacity-80`}
              onClick={captureFingerprint}
            >
              {fingerprintCaptured ? "Fingerprint Captured ✅" : "Capture Fingerprint"}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 w-full rounded-lg hover:bg-green-700"
          >
            Register Student
          </button>
        </form>

        {/* Message Display */}
        {message && <p className="mt-4 text-center text-blue-700 font-semibold">{message}</p>}
      </div>
    </div>
  );
};

export default FingerprintEnrollment;
