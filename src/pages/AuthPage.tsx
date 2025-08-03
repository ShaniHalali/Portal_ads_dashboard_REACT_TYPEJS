import "./AuthPage.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

const AuthPage = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setError("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      navigate("/create");
    } else {
      setError("❌ Incorrect password. Please try again.");
      setPassword("");
    }
  };

  return (
    <div className="main-div">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2 className="auth-h2">🔐 Enter Admin Password</h2>

        <input
          className="password-input"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={handlePasswordChange}
        />

        {error && <div className="error-message">{error}</div>}

        <button className="continue-button" type="submit">
          Continue
        </button>

        <button
          className="back-button"
          onClick={() => navigate("/")}
          type="button"
        >
          Back to Dashboard
        </button>
      </form>
    </div>
  );
};

export default AuthPage;
