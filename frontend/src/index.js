import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

function Root() {
  const [appKey, setAppKey] = useState(0); // State for controlling re-renders

  // Function to trigger a re-render of the entire app
  const refreshApp = () => {
    setAppKey((prevKey) => prevKey + 1);
  };

  return (
    <React.StrictMode>
      <App key={appKey} refreshApp={refreshApp} />
    </React.StrictMode>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Root />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
