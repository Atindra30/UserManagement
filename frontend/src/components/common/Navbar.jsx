import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import UserService from "../service/UserService";

function Navbar() {
  const { authState, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
      navigate("/login");
    }
  };

  return (
    <nav className="bg-gray-800 text-gray-200 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo/Brand */}
        <div className="text-2xl font-bold">
          <Link to="/" className="text-gray-100 hover:text-blue-400 transition duration-200">
            Atindra Development
          </Link>
        </div>

        {/* Navigation Links */}
        <ul className="flex items-center space-x-6">
          {authState.isAuthenticated && (
            <li>
              <Link
                to="/profile"
                className="flex items-center justify-center px-6 py-2 h-12 rounded-md bg-gray-700 hover:bg-blue-500 transition duration-200 font-semibold"
              >
                Profile
              </Link>
            </li>
          )}
          {authState.role === "ADMIN" && (
            <li>
              <Link
                to="/admin/user-management"
                className="flex items-center justify-center px-6 py-2 h-12 rounded-md bg-gray-700 hover:bg-blue-500 transition duration-200 font-semibold"
              >
                User Management
              </Link>
            </li>
          )}
          {authState.isAuthenticated && (
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center justify-center px-6 py-2 h-12 rounded-md bg-gray-700 hover:bg-red-500 transition duration-200 font-semibold focus:outline-none"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
