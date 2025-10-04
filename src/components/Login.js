import React, { useState } from "react";
import "../css/Login.css";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "HGU" && password === "1111") {
      localStorage.setItem("isAuthenticated", "true");
      onLogin(true);
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-intro">
        <h1>Handong Global University</h1>
        <img 
        src="https://upload.wikimedia.org/wikipedia/commons/0/09/HGU-Emblem-eng2.png" 
        alt="Handong Global University Logo" 
        className="login-logo"
        />
        <p>
          To see more information of HGU CSEE class please login
        </p>
        <ul className="feature-list">
          <li>ID : HGU</li>
          <li>Password : 1111</li>
        </ul>
      </div>
      <div className="login-container">
        <h2>Admin Login</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
