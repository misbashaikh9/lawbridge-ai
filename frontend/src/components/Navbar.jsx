import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">LawBridge AI</Link>
      <div className="navbar-links">
        {user ? (
          <>
            <span className="navbar-user">{user.name}</span>
            <button onClick={handleLogout} className="navbar-login">Logout</button>
          </>
        ) : (
          <Link to="/login" className="navbar-login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
