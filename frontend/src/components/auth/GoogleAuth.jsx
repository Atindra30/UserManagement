import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../service/firebase"; // Updated import path
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import UserService from "../service/UserService";
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";




function SignInwithGoogle({ buttonText = "Sign in with Google"}) {

  const {login} = useAuth();
  const navigate = useNavigate();

  async function googleLogin() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        console.log(result);
        const user = result.user;
        const authData = await UserService.googleAuth(result._tokenResponse.oauthAccessToken);
        console.log(authData);
        if (authData.accessToken) {

          const profileData = await UserService.getYourProfile(authData.accessToken);
          const userRole = profileData.data && profileData.data.role ? profileData.data.role : "USER";
          login({
            accessToken: authData.accessToken,
            refreshToken: authData.refreshToken,
            role: userRole,
          });
          
          toast.success("User logged in Successfully", {
            position: "right-bottom",
          });
          navigate("/profile");
        }else {
          throw new Error(authData.message || "Login failed");
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
        toast.error("Login failed. Please try again.", {
          position: "right-bottom",
        });
      });
  }

  return (
    <div className="mt-4">
      <p className="text-center text-gray-600 mb-4">------------- Or continue -------------</p>
      <div
        className="flex justify-center items-center cursor-pointer bg-white border border-gray-300 rounded-md p-2 hover:shadow-md"
        onClick={googleLogin}
      >
        <img src="/google.png" alt={buttonText} className="h-8" />
        <span className="ml-3 text-gray-700 font-medium">{buttonText}</span>
      </div>
    </div>
  );
}

export default SignInwithGoogle;
