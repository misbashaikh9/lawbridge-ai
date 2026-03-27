import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <Navbar />
      <div style={{ padding: "60px 40px", textAlign: "center" }}>
        <h1>Welcome, {user?.name}</h1>
        <p style={{ color: "#64748b", marginBottom: "24px" }}>You are now logged in to LawBridge AI</p>
        <button
          onClick={handleLogout}
          style={{
            padding: "10px 28px",
            background: "#0f172a",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontSize: "14px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
