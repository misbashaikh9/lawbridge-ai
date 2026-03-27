import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import "./Auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await API.post("/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login successful");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

 return (
  <div className="auth-container">

    {/* LEFT - LOGIN CARD */}
    <div className="auth-left-section">
      <div className="auth-card">
        <h2>LawBridge AI</h2>
        <p className="subtitle">Secure legal access platform</p>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="options">
          <label>
            <input type="checkbox" /> Remember me
          </label>
          <span className="forgot">Forgot?</span>
        </div>

        <button onClick={handleLogin}>Login</button>

        <p className="signup-text">
          Don’t have an account?{" "}
          <Link to="/signup" className="link">
            Sign up
          </Link>
        </p>
      </div>
    </div>

    {/* RIGHT - QUOTE / TRUST TEXT */}
    <div className="auth-right-section">
      <h1>Justice begins with clarity.</h1>
      <p>
        LawBridge AI helps you navigate legal systems with confidence,
        security, and intelligence.
      </p>
    </div>

  </div>
);
};

export default Login;