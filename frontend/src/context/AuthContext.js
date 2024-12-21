import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize authState from localStorage or default values
  const [authState, setAuthState] = useState(() => {
    const storedAuthState = localStorage.getItem("authState");
    return storedAuthState
      ? JSON.parse(storedAuthState)
      : { isAuthenticated: false, user: null, role: "USER" };
  });

  const login = (userData) => {
    const updatedAuthState = {
      isAuthenticated: true,
      user: userData,
      role: userData.role || "USER",
    };
    setAuthState(updatedAuthState);
    localStorage.setItem("authState", JSON.stringify(updatedAuthState));
  };

  const logout = () => {
    const updatedAuthState = {
      isAuthenticated: false,
      user: null,
      role: null,
    };
    setAuthState(updatedAuthState);
    localStorage.removeItem("authState");
  };

  // Sync authState changes to localStorage
  useEffect(() => {
    localStorage.setItem("authState", JSON.stringify(authState));
  }, [authState]);

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easier access to the context
export const useAuth = () => useContext(AuthContext);
