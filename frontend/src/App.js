import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage"; 
import AboutUsPage from "./pages/AboutUsPage"; 
import LoginPage from "./pages/LoginPage"; 
import SignUpPage from "./pages/SignUpPage";  
import HelpPage from "./pages/HelpPage"; 
import StudentDashboard from "./pages/StudentDashboard";
import ExamRegistration from "./pages/ExamRegistration"; 
import MyExams from "./pages/MyExams";
import Timetable from "./pages/Timetable"; 
import Notifications from "./pages/Notifications"; 
import AdminDashboard from "./pages/AdminDashboard";
import AdminTimetable from "./pages/AdminTimetable";
import AdminExamSchedule from "./pages/AdminExamSchedule";
import AdminNotifications from "./pages/AdminNotifications";
import FingerprintEnrollment from "./pages/FingerprintEnrollment";
import ExaminerDashboard from "./pages/ExaminerDashboard";
import ExaminerTimetable from "./pages/ExaminerTimetable";
import ExaminerNotifications from "./pages/ExaminerNotifications";
import Navbar from "./components/Navbar"; 
import PrivateRoute from "./components/PrivateRoute"; 



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} /> 
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/help" element={<HelpPage />} />

        {/* Protected Routes */}
        <Route 
          path="/student-dashboard" 
          element={<PrivateRoute element={<StudentDashboard />} allowedRoles={["student"]} />} 
        />
        <Route 
          path="/examiner-dashboard" 
          element={<PrivateRoute element={<ExaminerDashboard />} allowedRoles={["examiner"]} />} 
        />
        <Route 
          path="/admin-dashboard" 
          element={<PrivateRoute element={<AdminDashboard />} allowedRoles={["admin"]} />} 
        />

<Route 
  path="/student-dashboard/*" 
  element={<PrivateRoute element={<StudentDashboard />} allowedRoles={["student"]} />} 
/>
 {/* Examiner Dashboard Nested Routes */}
 <Route 
          path="/examiner-dashboard/*" 
          element={<PrivateRoute element={<ExaminerDashboard />} allowedRoles={["examiner"]} />} 
        >
          <Route path="timetable" element={<ExaminerTimetable />} />
          <Route path="notifications" element={<ExaminerNotifications />} />
        </Route>
        <Route 
   path="/admin-dashboard/*" 
   element={<PrivateRoute element={<AdminDashboard />} allowedRoles={["admin"]} />} 
>
          <Route path="timetable" element={<AdminTimetable />} />
          <Route path="exam-schedule" element={<AdminExamSchedule />} />
          <Route path="notifications" element={<AdminNotifications />} />
          <Route path="fingerprint" element={<FingerprintEnrollment />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
