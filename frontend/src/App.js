import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
// import Homepage from './pages/Homepage';
import AdminDashboard from './pages/admin/AdminDashboard';
import StudentDashboard from './pages/student/StudentDashboard';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import LoginPage from './pages/LoginPage';
import AdminRegisterPage from './pages/admin/AdminRegisterPage';
import ChooseUser from './pages/ChooseUser';
import UploadAssignment from './pages/teacher/TeacherAssignment';
import Landing from './views/Landing';
import "@fortawesome/fontawesome-free/css/all.min.css";



const App = () => {
  const { currentRole } = useSelector(state => state.user);

  return (
    <Router>
      {currentRole === null &&
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/choose" element={<ChooseUser visitor="normal" />} />
          <Route path="/chooseasguest" element={<ChooseUser visitor="guest" />} />

          <Route path="/Adminlogin" element={<LoginPage role="Admin" />} />
          <Route path="/Studentlogin" element={<LoginPage role="Student" />} />
          <Route path="/Teacherlogin" element={<LoginPage role="Teacher" />} />

          <Route path="/Adminregister" element={<AdminRegisterPage />} />

          <Route path='*' element={<Navigate to="/" />} />
          <Route path="/Teacher/class/assignment" element={<UploadAssignment/>} />

        </Routes>}

      {currentRole === "Admin" &&
        <>
          <AdminDashboard />
        </>
      }

      {currentRole === "Student" &&
        <>
          <StudentDashboard />
        </>
      }

      {currentRole === "Teacher" &&
        <>
          <TeacherDashboard />
        </>
      }
    </Router>
  )
}

export default App