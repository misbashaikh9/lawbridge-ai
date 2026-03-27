import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">LawBridge AI</Link>
      <div className="navbar-links">
        <Link to="/login" className="navbar-login">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
