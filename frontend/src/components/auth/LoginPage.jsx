import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../service/UserService";
import { toast } from "react-toastify";
import GoogleAuth from "./GoogleAuth";
import { useAuth } from "../../context/AuthContext";

function LoginPage() {

  const navigate = useNavigate();
  const { authState, login } = useAuth();


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [userData, setUserData] = useState({
    accessToken: "",
    refreshToken: "",
    role: "",
  })

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const authData = await UserService.login(email, password);
      console.log(authData);
      if (authData.accessToken) {
        
        const profileData = await UserService.getYourProfile(authData.accessToken);
        const userRole = profileData.data && profileData.data.role ? profileData.data.role : "USER";
        localStorage.setItem("accessToken", authData.accessToken);
        localStorage.setItem("refreshToken", authData.refreshToken);
        localStorage.setItem("role", userRole);
        setUserData({
          accessToken: authData.accessToken,
          refreshToken: authData.refreshToken,
          role: userRole,
        });
        login({
          accessToken: authData.accessToken,
          refreshToken: authData.refreshToken,
          role: userRole,
        });
        //for notification
        toast.success("User logged in Successfully", {
          position: "bottom-right",
        });
        navigate("/profile");        
      } else {
        throw new Error(authData.message || "Login failed");
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-8">
        <h2 className="text-3xl font-bold text-gray-700 text-center mb-6">
          Login
        </h2>
        {error && (
          <p className="text-red-500 text-center text-sm mb-4">{error}</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Login
          </button>
          {/* Bottom-right corner link */}
          <div className="mt-4 flex justify-end">
            <p className="text-sm text-gray-600">
              New user{" "}
              <span
                className="text-blue-500 underline hover:underline cursor-pointer"
                onClick={() => navigate("/signup")}
              >
                Register Here
              </span>
            </p>
          </div>
          <div className="mt-6">
            <GoogleAuth buttonText="Sign in with Google"/>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
