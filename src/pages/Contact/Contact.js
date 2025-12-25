import { useState } from "react";
import { submitContactForm } from "../../services/formService";
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
  const [submitError, setSubmitError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    // Validate form
    if (!form.name || !form.email || !form.subject || !form.message) {
      setSubmitStatus("error");
      setSubmitError("Please fill in all fields");
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 3000);
      return;
    }

    // Submit to Firebase
    const result = await submitContactForm({
      name: form.name.trim(),
      email: form.email.trim(),
      subject: form.subject.trim(),
      message: form.message.trim()
    });

    if (result.success) {
      setSubmitStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitStatus(null), 3000);
    } else {
      setSubmitStatus("error");
      setSubmitError(result.error || "Failed to send message. Please try again.");
      setTimeout(() => setSubmitStatus(null), 5000);
    }

    setIsSubmitting(false);
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
                  ✕ {submitError || "Error sending message. Please try again."}
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

      {/* Background Elements */}
      <div className="skills-background">
        <div className="glow glow-1"></div>
        <div className="glow glow-2"></div>
      </div>
    </div>
  );
}
