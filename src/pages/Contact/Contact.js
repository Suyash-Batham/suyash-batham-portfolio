import { useState, useEffect } from "react";
import "./Contact.css";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [showSubmissions, setShowSubmissions] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [searchSubmission, setSearchSubmission] = useState("");
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Load submissions from localStorage on mount
  useEffect(() => {
    const savedSubmissions = localStorage.getItem("contactSubmissions");
    if (savedSubmissions) {
      try {
        setSubmissions(JSON.parse(savedSubmissions));
      } catch (e) {
        console.error("Failed to load submissions:", e);
      }
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Create submission object with timestamp
      const newSubmission = {
        id: Date.now(),
        ...form,
        submittedAt: new Date().toLocaleString()
      };
      
      // Save to localStorage
      const updatedSubmissions = [newSubmission, ...submissions];
      localStorage.setItem("contactSubmissions", JSON.stringify(updatedSubmissions));
      setSubmissions(updatedSubmissions);
      
      console.log("Form submitted:", newSubmission);
      setSubmitStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitStatus(null), 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteSubmission = (id) => {
    if (window.confirm("Delete this submission?")) {
      const updatedSubmissions = submissions.filter((sub) => sub.id !== id);
      localStorage.setItem("contactSubmissions", JSON.stringify(updatedSubmissions));
      setSubmissions(updatedSubmissions);
      setSelectedSubmission(null);
    }
  };

  const handleClearAll = () => {
    if (window.confirm("Clear all submissions? This cannot be undone.")) {
      localStorage.removeItem("contactSubmissions");
      setSubmissions([]);
      setSelectedSubmission(null);
      setShowSubmissions(false);
    }
  };

  const handleExportCSV = () => {
    if (submissions.length === 0) return;
    
    const headers = ["ID", "Name", "Email", "Subject", "Message", "Submitted At"];
    const rows = submissions.map((sub) => [
      sub.id,
      `"${sub.name}"`,
      sub.email,
      `"${sub.subject}"`,
      `"${sub.message.replace(/"/g, '""')}"`,
      sub.submittedAt
    ]);
    
    const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `contact-submissions-${Date.now()}.csv`;
    a.click();
  };

  const filteredSubmissions = submissions.filter(
    (sub) =>
      sub.name.toLowerCase().includes(searchSubmission.toLowerCase()) ||
      sub.email.toLowerCase().includes(searchSubmission.toLowerCase()) ||
      sub.subject.toLowerCase().includes(searchSubmission.toLowerCase())
  );

  const handleAdminLogin = () => {
    // Change this to your secure password
    const ADMIN_PASSWORD = "portfolio_admin_2024";
    
    if (adminPassword === ADMIN_PASSWORD) {
      setIsAdminAuthenticated(true);
      setAdminPassword("");
      setPasswordError("");
      sessionStorage.setItem("adminAuth", "true");
    } else {
      setPasswordError("Invalid password");
      setAdminPassword("");
    }
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    setShowSubmissions(false);
    setSelectedSubmission(null);
    sessionStorage.removeItem("adminAuth");
  };

  const contactInfo = [
    {
      icon: "✉️",
      label: "Email",
      value: "suyashbatham001@gmail.com",
      href: "mailto:suyashbatham001@gmail.com"
    },
    {
      icon: "📱",
      label: "Phone",
      value: "+91 9336***569",
      href: "tel:+919336***569"
    },
    {
      icon: "📍",
      label: "Location",
      value: "Gurugram, India",
      href: "#"
    }
  ];

  const socialLinks = [
    { name: "GitHub", icon: "🐙", url: "https://github.com/Suyash-Batham" },
    { name: "LinkedIn", icon: "💼", url: "https://www.linkedin.com/in/suyash-batham/" },
    { name: "Twitter", icon: "𝕏", url: "https://twitter.com" }
  ];

  return (
    <div className="contact-container">
      {/* Header Section */}
      <div className="contact-header fade-in">
        <h1 className="contact-title">Let's Work Together</h1>
        <p className="contact-subtitle">
          Have a project in mind? I'd love to hear about it. Let's create something amazing together.
        </p>
      </div>

      {/* Main Content */}
      <div className="contact-content">
        <div className="contact-grid">
          {/* Left Section - Contact Info */}
          <div className="contact-info-section fade-in">
            <h2 className="section-heading">Get In Touch</h2>
            <p className="section-description">
              I'm always interested in hearing about new projects and opportunities. 
              Whether you want to discuss web development, collaboration, or just say hello, 
              feel free to reach out!
            </p>

            {/* Contact Info Items */}
            <div className="contact-info-list">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.href}
                  className="contact-info-item"
                  target={info.label === "Email" ? "_self" : "_blank"}
                  rel="noopener noreferrer"
                >
                  <div className="contact-icon">{info.icon}</div>
                  <div className="contact-details">
                    <div className="contact-label">{info.label}</div>
                    <div className="contact-value">{info.value}</div>
                  </div>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div className="contact-social">
              <h3 className="social-heading">Follow Me On</h3>
              <div className="social-links-container">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    title={link.name}
                    aria-label={link.name}
                  >
                    <span className="social-icon">{link.icon}</span>
                    <span className="social-name">{link.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Section - Contact Form */}
          <div className="contact-form-section fade-in">
            <form className="contact-form" onSubmit={handleSubmit}>
              <h2 className="form-heading">Send Me a Message</h2>

              {submitStatus === "success" && (
                <div className="form-message success">
                  ✓ Message sent successfully! I'll get back to you soon.
                </div>
              )}

              {submitStatus === "error" && (
                <div className="form-message error">
                  ✕ Error sending message. Please try again.
                </div>
              )}

              <div className="form-group">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="your.email@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject" className="form-label">Subject</label>
                <input
                  id="subject"
                  type="text"
                  name="subject"
                  placeholder="What is this about?"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell me more about your project or inquiry..."
                  value={form.message}
                  onChange={handleChange}
                  required
                  className="form-textarea"
                  rows="6"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`form-submit ${isSubmitting ? "submitting" : ""}`}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>

              <p className="form-note">
                I'll try to get back to you within 24 hours.
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Admin Access Button - Only show if not authenticated */}
      {!isAdminAuthenticated && submissions.length > 0 && (
        <div className="admin-access-button-container fade-in">
          <button
            className="admin-access-btn"
            onClick={() => setShowSubmissions(!showSubmissions)}
            title="Admin only"
            aria-label="Admin dashboard"
          >
            🔒 Admin
          </button>
        </div>
      )}

      {/* Admin Password Modal */}
      {!isAdminAuthenticated && showSubmissions && (
        <div className="admin-modal-overlay" onClick={() => setShowSubmissions(false)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <h2>🔐 Admin Access</h2>
            <p>Enter your admin password to view submissions</p>
            
            <input
              type="password"
              placeholder="Enter admin password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAdminLogin()}
              className="admin-password-input"
              autoFocus
              aria-label="Admin password"
            />
            
            {passwordError && (
              <p className="password-error">❌ {passwordError}</p>
            )}
            
            <div className="admin-modal-buttons">
              <button className="admin-login-btn" onClick={handleAdminLogin}>
                Unlock
              </button>
              <button
                className="admin-cancel-btn"
                onClick={() => {
                  setShowSubmissions(false);
                  setAdminPassword("");
                  setPasswordError("");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Submissions Dashboard - Only show if authenticated */}
      {isAdminAuthenticated && showSubmissions && (
        <div className="submissions-dashboard">
          <div className="submissions-header">
            <h2 className="submissions-title">📊 Contact Form Submissions</h2>
            <div className="submissions-header-actions">
              <button
                className="logout-btn"
                onClick={handleAdminLogout}
                aria-label="Logout from admin"
                title="Logout"
              >
                🚪 Logout
              </button>
              <button
                className="close-btn"
                onClick={() => setShowSubmissions(false)}
                aria-label="Close submissions dashboard"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="submissions-controls">
            <input
              type="text"
              placeholder="🔍 Search by name, email, or subject..."
              value={searchSubmission}
              onChange={(e) => setSearchSubmission(e.target.value)}
              className="search-submissions-input"
              aria-label="Search submissions"
            />
            <div className="submissions-actions">
              <button
                className="export-btn"
                onClick={handleExportCSV}
                disabled={submissions.length === 0}
                aria-label="Export submissions as CSV"
              >
                📥 Export CSV
              </button>
              <button
                className="clear-all-btn"
                onClick={handleClearAll}
                disabled={submissions.length === 0}
                aria-label="Clear all submissions"
              >
                🗑️ Clear All
              </button>
            </div>
          </div>

          <div className="submissions-content">
            <div className="submissions-list">
              {filteredSubmissions.length === 0 ? (
                <div className="no-submissions">
                  {searchSubmission ? "No matching submissions found" : "No submissions yet"}
                </div>
              ) : (
                filteredSubmissions.map((submission) => (
                  <div
                    key={submission.id}
                    className={`submission-card ${
                      selectedSubmission?.id === submission.id ? "selected" : ""
                    }`}
                    onClick={() => setSelectedSubmission(submission)}
                    role="button"
                    tabIndex="0"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        setSelectedSubmission(submission);
                      }
                    }}
                  >
                    <div className="submission-summary">
                      <h4 className="submission-name">{submission.name}</h4>
                      <p className="submission-email">{submission.email}</p>
                      <p className="submission-subject">{submission.subject}</p>
                      <small className="submission-date">{submission.submittedAt}</small>
                    </div>
                  </div>
                ))
              )}
            </div>

            {selectedSubmission && (
              <div className="submission-detail">
                <div className="detail-header">
                  <h3>Submission Details</h3>
                  <button
                    className="delete-submission-btn"
                    onClick={() => handleDeleteSubmission(selectedSubmission.id)}
                    aria-label="Delete submission"
                    title="Delete this submission"
                  >
                    🗑️
                  </button>
                </div>

                <div className="detail-field">
                  <label>Name</label>
                  <p>{selectedSubmission.name}</p>
                </div>

                <div className="detail-field">
                  <label>Email</label>
                  <p>
                    <a href={`mailto:${selectedSubmission.email}`}>
                      {selectedSubmission.email}
                    </a>
                  </p>
                </div>

                <div className="detail-field">
                  <label>Subject</label>
                  <p>{selectedSubmission.subject}</p>
                </div>

                <div className="detail-field">
                  <label>Message</label>
                  <p className="message-content">{selectedSubmission.message}</p>
                </div>

                <div className="detail-field">
                  <label>Submitted At</label>
                  <p>{selectedSubmission.submittedAt}</p>
                </div>

                <button
                  className="copy-btn"
                  onClick={() => {
                    const text = `Name: ${selectedSubmission.name}\nEmail: ${selectedSubmission.email}\nSubject: ${selectedSubmission.subject}\nMessage: ${selectedSubmission.message}`;
                    navigator.clipboard.writeText(text);
                    alert("Copied to clipboard!");
                  }}
                  aria-label="Copy submission details"
                >
                  📋 Copy
                </button>
              </div>
            )}
          </div>

          <div className="submissions-stats">
            <div className="stat-box">
              <span className="stat-number">{submissions.length}</span>
              <span className="stat-label">Total</span>
            </div>
            <div className="stat-box">
              <span className="stat-number">{filteredSubmissions.length}</span>
              <span className="stat-label">Shown</span>
            </div>
          </div>
        </div>
      )}

      {/* Background Elements */}
      <div className="skills-background">
        <div className="glow glow-1"></div>
        <div className="glow glow-2"></div>
      </div>
    </div>
  );
}
