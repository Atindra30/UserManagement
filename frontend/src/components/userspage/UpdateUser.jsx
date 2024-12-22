import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserService from "../service/UserService";
import { useAuth } from "../../context/AuthContext";

function UpdateUser() {

  const { authState } = useAuth();
  const navigate = useNavigate();
  const { userId } = useParams();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    role: "",
    provider: "",
  });

  useEffect(() => {
    fetchUserDataById(userId);
  }, [userId]);

  const fetchUserDataById = async (userId) => {
    try {
      const token = authState.user.accessToken // Retrieve the token from localStorage
      const response = await UserService.getUserById(userId, token);
      const { name, email, role, provider } = response.data;
      setUserData({ name, email, role, provider });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const confirmUpdate = window.confirm(
        "Are you sure you want to update this user?"
      );
      if (confirmUpdate) {
        const token = localStorage.getItem("accessToken");
        const res = await UserService.updateUser(userId, {
          name: userData.name,
          role: userData.role,
        }, token); // Only update `name` and `role`
        console.log(res);
        navigate("/admin/user-management");
      }
    } catch (error) {
      console.error("Error updating user profile:", error);
      alert(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">
          Update User
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={userData.name}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              placeholder="Enter user's name"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              disabled
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-700 cursor-not-allowed"
            />
          </div>
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Role
            </label>
            <input
              type="text"
              id="role"
              name="role"
              value={userData.role}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              placeholder="Enter user's role"
            />
          </div>
          <div>
            <label
              htmlFor="provider"
              className="block text-sm font-medium text-gray-700"
            >
              Provider
            </label>
            <input
              type="text"
              id="provider"
              name="provider"
              value={userData.provider}
              disabled
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-700 cursor-not-allowed"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Update User
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateUser;
