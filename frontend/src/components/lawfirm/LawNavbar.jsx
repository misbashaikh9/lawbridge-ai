import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const navLinks = [
  { label: "Home", to: "/", id: "hero" },
  { label: "About", to: "/#about", id: "about" },
  { label: "Services", to: "/services" },
  { label: "Practice Areas", to: "/#practice", id: "practice" },
  { label: "Blogs", to: "/#blogs", id: "blogs" },
  { label: "Why Us", to: "/#why-us", id: "why-us" },
];

const LawNavbar = () => {
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const handleNav = (link) => {
    setMenuOpen(false);
    // If we're already on the home page and the link targets a section, scroll to it
    if (link.id && location.pathname === "/") {
      document.getElementById(link.id)?.scrollIntoView({ behavior: "smooth" });
    }
    // Otherwise the <Link to> will navigate, and the hash will trigger scroll on load
  };

  // On mount / route change, scroll to hash if present
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-navy border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-8 lg:px-12 py-5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="font-heading text-[22px] font-semibold tracking-[0.04em] text-white">
            LAW<span className="text-gold">BRIDGE</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              onClick={() => handleNav(link)}
              className="relative text-[13px] tracking-[0.06em] uppercase text-white/60 hover:text-gold transition-colors duration-300 font-medium after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-gold hover:after:w-full after:transition-all after:duration-300"
            >
              {link.label}
            </Link>
          ))}

          {user ? (
            <Link
              to="/chat"
              className="ml-4 px-6 py-2.5 border border-gold text-gold text-[13px] tracking-[0.06em] uppercase font-semibold hover:bg-gold hover:text-navy transition-all duration-300"
            >
              AI Workspace
            </Link>
          ) : (
            <Link
              to="/login"
              className="ml-4 px-6 py-2.5 border border-gold text-gold text-[13px] tracking-[0.06em] uppercase font-semibold hover:bg-gold hover:text-navy transition-all duration-300"
            >
              Contact
            </Link>
          )}
        </div>

        <button
          className="md:hidden text-white/80 p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-navy border-t border-white/[0.06] px-8 py-6 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              onClick={() => handleNav(link)}
              className="block w-full text-left text-white/60 hover:text-gold py-3 text-[13px] tracking-[0.06em] uppercase font-medium transition-colors duration-200 border-b border-white/[0.04]"
            >
              {link.label}
            </Link>
          ))}
          {user ? (
            <Link to="/chat" className="block w-full text-center px-6 py-3 border border-gold text-gold text-[13px] tracking-[0.06em] uppercase font-semibold mt-4 hover:bg-gold hover:text-navy transition-all duration-300">
              AI Workspace
            </Link>
          ) : (
            <Link to="/login" className="block w-full text-center px-6 py-3 border border-gold text-gold text-[13px] tracking-[0.06em] uppercase font-semibold mt-4 hover:bg-gold hover:text-navy transition-all duration-300">
              Contact
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default LawNavbar;
