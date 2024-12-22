import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Logout() {
  
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {

    logout();
    // Clear local storage

    // Navigate to the login page
    navigate("/login");

    // Optionally reload to reset the app state
    // window.location.reload();
  }, [navigate]);

  return null; // This component does not need to render anything
}

export default Logout;
