import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import "./Auth.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      await API.post("/signup", { name, email, password });
      alert("Signup successful");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
  <div className="auth-container">

    {/* LEFT - SIGNUP CARD */}
    <div className="auth-left-section">
      <div className="auth-card">
        <h2>Create Account</h2>
        <p className="subtitle">Join LawBridge AI</p>

        <input
          type="text"
          placeholder="Full Name"
          onChange={(e) => setName(e.target.value)}
        />

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

        <button onClick={handleSignup}>Sign Up</button>

        <p className="signup-text">
          Already have an account?{" "}
          <Link to="/" className="link">
            Login
          </Link>
        </p>
      </div>
    </div>

    {/* RIGHT - SAME QUOTE */}
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

export default Signup;