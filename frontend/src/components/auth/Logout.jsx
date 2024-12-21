import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear local storage
    localStorage.clear();

    // Navigate to the login page
    navigate("/login");

    // Optionally reload to reset the app state
    // window.location.reload();
  }, [navigate]);

  return null; // This component does not need to render anything
}

export default Logout;
