import React, { useState, useEffect } from "react";
import UserService from "../service/UserService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

function ProfilePage() {

  const { authState } = useAuth();
  const [profileInfo, setProfileInfo] = useState({});

  useEffect(() => {
    fetchProfileInfo();
  }, []);

  const fetchProfileInfo = async () => {
    try {
      const token = authState.user.accessToken // Retrieve the token from localStorage
      const response = await UserService.getYourProfile(token);
      console.log(response);
      if (response.success) {
        setProfileInfo(response.data);
      }else {
        throw new Error(response.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error fetching profile information:", error);
      toast.error(error, {
        position: "bottom-right",
      });
      
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">
          Profile Information
        </h2>
        <div className="space-y-4">
          <p className="text-gray-600">
            <span className="font-medium">Name:</span> {profileInfo.name || "N/A"}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Email:</span> {profileInfo.email || "N/A"}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Role:</span> {profileInfo.role || "N/A"}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Provider:</span> {profileInfo.provider || "N/A"}
          </p>
          {profileInfo.role === "ADMIN" && (
            <div className="flex justify-center">
              <Link
                to={`/update-user/${profileInfo.id}`}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Update This Profile
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
