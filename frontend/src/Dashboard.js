import React from "react";

const Dashboard = () => {
    const role = localStorage.getItem("role");

    return (
        <div>
            <h1>Dashboard</h1>
            {role === "admin" && (
                <p>Admin Panel: Upload Timetables, Manage Exams, View Surveillance</p>
            )}
            {role === "examiner" && (
                <p>Examiner Panel: Monitor Exams, Verify Attendance, View Surveillance</p>
            )}
            {role === "student" && (
                <p>Student Panel: Register for Exams, View Timetable, Receive Notifications</p>
            )}
        </div>
    );
};

export default Dashboard;
