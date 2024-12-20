import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../service/firebase"; // Updated import path
import { toast } from "react-toastify";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import UserService from "../service/UserService";
import React, { useState } from "react";

function SignInwithGoogle({ buttonText = "Sign in with Google", refreshApp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [idToken, setIdToken] = useState("");

  const navigate = useNavigate();

  async function googleLogin() {
    const provider = new GoogleAuthProvider();
    provider.addScope("profile");
    provider.addScope("email");
    signInWithPopup(auth, provider)
      .then(async (result) => {
        console.log(result);
        const user = result.user;

        const authData = await UserService.googleAuth(
          result._tokenResponse.oauthAccessToken
        );
        console.log(authData);
        if (authData.accessToken) {
          localStorage.setItem("accessToken", authData.accessToken);
          localStorage.setItem("refreshToken", authData.refreshToken);
          const profileData = await UserService.getYourProfile(authData.accessToken);
          if(profileData.data){
            localStorage.setItem("role", profileData.data.role?profileData.data.role:"USER");
          }else{
            localStorage.setItem("role", "USER");
          }
          refreshApp();
          toast.success("User logged in Successfully", {
            position: "top-center",
          });
          navigate("/profile");
        }

        if (user) {
          await setDoc(doc(db, "Users", user.uid), {
            email: user.email,
            firstName: user.displayName,
            photo: user.photoURL,
          });
          toast.success("User logged in Successfully", {
            position: "top-center",
          });
          navigate("/profile");
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
        toast.error("Login failed. Please try again.", {
          position: "top-center",
        });
      });
  }

  return (
    <div className="mt-4">
      <p className="text-center text-gray-600 mb-4">-- Or continue with --</p>
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
