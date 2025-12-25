import { Link } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";

export default function Navbar({ theme, setTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/skills", label: "Skills" },
    { href: "/projects", label: "Projects" },
    { href: "/playground", label: "Playground" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
            <div className="logo-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-code-xml h-6 w-6 text-primary">
                <path d="m18 16 4-4-4-4"></path>
                <path d="m6 8-4 4 4 4"></path>
                <path d="m14.5 4-5 16"></path>
                </svg>
            </div>
            <span className="logo-text">
                Suyash<span className="logo-highlight">Portfolio</span>
            </span>
        </Link>

        {/* Desktop Nav */}
        <div className="nav-desktop">
          {links.map((link) => (
            <Link key={link.href} to={link.href} className="nav-link" onClick={scrollToTop}>
              {link.label}
            </Link>
          ))}
          <button
            className="theme-toggle"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            aria-label="Toggle theme"
          >
            {theme === "light" ? "☾" : "☀︎"}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="nav-mobile-controls">
          <button
            className="theme-toggle"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            aria-label="Toggle theme"
          >
            {theme === "light" ? "☾" : "☀︎"}
          </button>
          <button
            className="menu-toggle"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="nav-mobile-menu">
          <div className="mobile-menu-content">
            {links.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="mobile-nav-link"
                onClick={() => {
                  closeMenu();
                  scrollToTop();
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
