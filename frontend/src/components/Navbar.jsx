import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
    setUserMenuOpen(false);
    setProfileOpen(false);
  }, [location]);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!userMenuRef.current?.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    setProfileOpen(false);
    navigate("/login");
  };

  const handleProfileOpen = () => {
    setUserMenuOpen(false);
    setProfileOpen(true);
  };

  const scrollToSection = (id) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__container">
        {/* Logo */}
        <Link to="/" className="navbar__logo">
          <svg className="navbar__logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
          <span>LAWBRIDGE</span>
        </Link>

        {/* Desktop Nav Links */}
        <div className={`navbar__links ${menuOpen ? "navbar__links--open" : ""}`}>
          <button className="navbar__link" onClick={() => scrollToSection("hero")}>Home</button>
          <button className="navbar__link" onClick={() => scrollToSection("services")}>Services</button>
          <button className="navbar__link" onClick={() => scrollToSection("team")}>Team</button>
          <button className="navbar__link" onClick={() => scrollToSection("about")}>About us</button>
          <button className="navbar__link" onClick={() => scrollToSection("news")}>News</button>
          <button className="navbar__link" onClick={() => scrollToSection("quote")}>Contact</button>

          {/* Mobile-only auth */}
          <div className="navbar__mobile-auth">
            {user ? (
              <>
                <span className="navbar__user-greeting">Hi, {user.name}</span>
                <button onClick={handleLogout} className="navbar__cta">Logout</button>
              </>
            ) : (
              <Link to="/login" className="navbar__cta">Login</Link>
            )}
          </div>
        </div>

        {/* Right side */}
        <div className="navbar__right">
          {user ? (
            <div className="navbar__user-menu" ref={userMenuRef}>
              <span className="navbar__user-name">{user.name}</span>
              <button
                type="button"
                className={`navbar__menu-trigger ${userMenuOpen ? "navbar__menu-trigger--active" : ""}`}
                onClick={() => setUserMenuOpen((current) => !current)}
                aria-label="Open account menu"
                aria-expanded={userMenuOpen}
                aria-haspopup="menu"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>

              {userMenuOpen && (
                <div className="navbar__dropdown" role="menu" aria-label="Account menu">
                  <button type="button" className="navbar__dropdown-item" onClick={handleProfileOpen}>
                    <span className="navbar__dropdown-title">Profile</span>
                    <span className="navbar__dropdown-copy">View account details</span>
                  </button>
                  <button type="button" className="navbar__dropdown-item" onClick={() => navigate("/chat")}>
                    <span className="navbar__dropdown-title">AI Workspace</span>
                    <span className="navbar__dropdown-copy">Open your legal assistant</span>
                  </button>
                  <button type="button" className="navbar__dropdown-item navbar__dropdown-item--danger" onClick={handleLogout}>
                    <span className="navbar__dropdown-title">Sign out</span>
                    <span className="navbar__dropdown-copy">End this session securely</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="navbar__cta">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
              Call us
            </Link>
          )}
        </div>

        {/* Hamburger */}
        <button
          className={`navbar__hamburger ${menuOpen ? "navbar__hamburger--active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile overlay */}
      {menuOpen && <div className="navbar__overlay" onClick={() => setMenuOpen(false)} />}

      {profileOpen && (
        <div className="navbar__profile-backdrop" onClick={() => setProfileOpen(false)}>
          <div className="navbar__profile-panel" onClick={(event) => event.stopPropagation()}>
            <span className="navbar__profile-eyebrow">Profile</span>
            <h3 className="navbar__profile-name">{user?.name || "LawBridge user"}</h3>
            <p className="navbar__profile-email">{user?.email || "Signed in account"}</p>
            <p className="navbar__profile-copy">
              Your account is active and ready for secure legal analysis inside LawBridge AI.
            </p>
            <div className="navbar__profile-actions">
              <button type="button" className="navbar__cta" onClick={() => navigate("/chat")}>
                Open AI Workspace
              </button>
              <button type="button" className="navbar__profile-close" onClick={() => setProfileOpen(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
