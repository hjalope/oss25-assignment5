// src/index.js
import React from "react";
import ReactDOM from "react-dom/client"; // Import createRoot from react-dom/client
import "./index.css";
import App from "./App";

// Create the root and render the App component
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
