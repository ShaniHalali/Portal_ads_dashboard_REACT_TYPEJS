import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "CreateAd1234") {
      navigate("/create");
    } else {
      setError("❌ Incorrect password. Please try again.");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "100px" }}>
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "#F5F5DC",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          width: "320px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>🔐 Enter Admin Password</h2>
    
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "95%",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            marginBottom: "15px",
       
          }}
        />

        {error && (
          <div style={{ color: "red", marginBottom: "10px", textAlign: "center" }}>
            {error}
          </div>
        )}

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#4D2C91",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
        
          }}
          
        >
          Continue
        </button>
        
        <button
        onClick={() => navigate("/")}
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#8884d8",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            marginTop: "20px"
          }}
        >
          Back to Dashboard
        </button>
      </form>
    </div>
  );
};

export default AuthPage;
