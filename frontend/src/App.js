import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from './components/common/Navbar';
import LoginPage from './components/auth/LoginPage';
import RegistrationPage from './components/auth/RegistrationPage';
import UserService from './components/service/UserService';
import UpdateUser from './components/userspage/UpdateUser';
import UserManagementPage from './components/userspage/UserManagementPage';
import ProfilePage from './components/userspage/ProfilePage';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignUpPage from './components/auth/SignupPage';
import FooterComponent from './components/common/Footer';
import { useAuth } from "./context/AuthContext";
import Logout from './components/auth/Logout';


function App() {


  const { authState } = useAuth();

  const isAdmin = () => {
    const role = localStorage.getItem("role");
    return role === "ADMIN";
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route exact path="/" element={<LoginPage />} />
            <Route exact path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/logout" element={<Logout />} />

            {/* Check if user is authenticated and admin before rendering admin-only routes */}
            {authState.role === "ADMIN" && (
              <>
                <Route path="/register" element={<RegistrationPage />} />
                <Route path="/admin/user-management" element={<UserManagementPage />} />
                <Route path="/update-user/:userId" element={<UpdateUser />} />
              </>
            )}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
          <ToastContainer />
        </div>
        <FooterComponent />
      </div>
    </BrowserRouter>
  );
}

export default App;