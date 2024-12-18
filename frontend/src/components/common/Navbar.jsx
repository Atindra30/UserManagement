import React from "react";
import { Link, useNavigate} from "react-router-dom";

import UserService from "../service/UserService";

function Navbar() {
  const navigate = useNavigate();
  const isAuthenticated = UserService.isAuthenticated();
  const isAdmin = UserService.isAdmin();

  const handleLogout = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to logout this user?"
    );
    if (confirmDelete) {
      UserService.logout();
      navigate("/login")
    }
  };

  return (
    <nav className="bg-gray-200 text-gray-800 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo or Brand */}
        <div className="text-xl font-bold">
          {!isAuthenticated && (
            <Link to="/" className="hover:text-gray-600">
              Atindra Development Org.
            </Link>
          )}
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-6">
          {isAuthenticated && (
            <li>
              <Link
                to="/profile"
                className="hover:text-gray-600 transition duration-200"
              >
                Profile
              </Link>
            </li>
          )}
          {isAdmin && (
            <li>
              <Link
                to="/admin/user-management"
                className="hover:text-gray-600 transition duration-200"
              >
                User Management
              </Link>
            </li>
          )}
          {isAuthenticated && (
            <li>
              <button
                onClick={handleLogout}
                className="hover:text-gray-600 transition duration-200 focus:outline-none"
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
