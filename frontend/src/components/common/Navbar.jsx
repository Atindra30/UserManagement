import React from "react";
import { Link, useNavigate } from "react-router-dom";
import UserService from "../service/UserService";

function Navbar() {
  const navigate = useNavigate();
  const isAuthenticated = UserService.isAuthenticated();
  const isAdmin = UserService.isAdmin();

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );
    if (confirmLogout) {
      UserService.logout();
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
        <ul className="flex space-x-6">
          {isAuthenticated && (
            <li>
              <Link
                to="/profile"
                className="text-gray-200 hover:text-blue-400 font-semibold transition duration-200"
              >
                Profile
              </Link>
            </li>
          )}
          {isAdmin && (
            <li>
              <Link
                to="/admin/user-management"
                className="text-gray-200 hover:text-blue-400 font-semibold transition duration-200"
              >
                User Management
              </Link>
            </li>
          )}
          {isAuthenticated && (
            <li>
              <button
                onClick={handleLogout}
                className="text-gray-200 hover:text-red-400 font-semibold transition duration-200 focus:outline-none"
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
