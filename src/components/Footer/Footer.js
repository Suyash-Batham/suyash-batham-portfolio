import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Skills", path: "/skills" },
    { label: "Projects", path: "/projects" },
    { label: "Contact", path: "/contact" }
  ];

  const socialLinks = [
    { name: "GitHub", icon: "🐙", url: "https://github.com/Suyash-Batham" },
    { name: "LinkedIn", icon: "💼", url: "https://www.linkedin.com/in/suyash-batham/" },
    { name: "Twitter", icon: "𝕏", url: "https://twitter.com" },
    { name: "Email", icon: "✉️", url: "mailto:suyashbatham001@gmail.com" }
  ];

  const resources = [
    { label: "Privacy Policy", url: "#" },
    { label: "Terms of Service", url: "#" },
    { label: "Sitemap", url: "#" }
  ];

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-grid">
          {/* Column 1 - About */}
          <div className="footer-column">
            <h3 className="footer-heading">Console.log(' Dev Humor ');</h3>
            <p className="footer-description">
              Hand-coded with precision. Every bug 🐛 here was meticulously placed for your entertainment.
            </p>
            <div className="footer-social">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-link"
                  title={link.name}
                  aria-label={link.name}
                >
                  <span className="social-icon">{link.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div className="footer-column">
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-links">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Resources */}
          <div className="footer-column">
            <h3 className="footer-heading">Resources</h3>
            <ul className="footer-links">
              {resources.map((resource, index) => (
                <li key={index}>
                  <a href={resource.url} className="footer-link">
                    {resource.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div className="footer-column">
            <h3 className="footer-heading">Get In Touch</h3>
            <ul className="footer-contact">
              <li>
                <a href="mailto:suyashbatham001@gmail.com" className="footer-link">
                  📧 suyashbatham001@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+919336***569" className="footer-link">
                  📱 +91 9336***569
                </a>
              </li>
              <li className="footer-location">
                📍 Gurugram, India
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="footer-divider"></div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            <p>
              © {currentYear} <span className="brand-name">Suyash Batham</span>. All rights reserved.
            </p>
          </div>

          <div className="footer-credits right-aligned">
            <p>
              Crafted with <span className="heart">❤️</span> No AI was harmed in the making of this footer (maybe).
            </p>
          </div>
        </div>
      </div>

      {/* Background Gradient */}
      <div className="footer-gradient"></div>
    </footer>
  );
}