import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../service/UserService";
import { toast } from "react-toastify";
import GoogleAuth from "./GoogleAuth";

function SignUpPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authData = await UserService.signup(formData);

      if (authData.success) {
        localStorage.setItem("accessToken", authData.accessToken);
        localStorage.setItem("refreshToken", authData.refreshToken);
        localStorage.setItem("role", "ADMIN");
        // Clear the form fields after successful registration
        setFormData({
            name: "",
            email: "",
            password: "",
        });
        toast.success("User signed up successfully!", {
            position: "top-center",
          });
        navigate("/profile");
      } else {
        setError(authData.message);
        setTimeout(() => {
            setError("");
          }, 5000);
      }
    } catch (error) {
      console.error("Error signing up user:", error);
      setError("An error occurred during sign-up");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6 relative">
        {/* Form */}
        <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">
          Sign Up
        </h2>
        
        {error && (
          <p className="text-red-500 text-center text-sm mb-4">{error}</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
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
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="mb-4">
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
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Sign Up
          </button>
          {/* Bottom-right corner link */}
            <div className="mt-4 flex justify-end">
            <p className="text-sm text-gray-600">
                Already registered ?{" "}
                <span
                className="text-blue-500 underline hover:underline cursor-pointer"
                onClick={() => navigate("/login")}
                >
                Login
                </span>
            </p>
            </div>
          <div className="mt-4">
            <GoogleAuth buttonText="Sign up with Google" />
          </div>
          
        </form>

        
      </div>
    </div>
  );
}

export default SignUpPage;
