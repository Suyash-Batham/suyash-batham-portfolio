import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { getContactSubmissions, deleteSubmission } from "../../services/formService";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const [submissions, setSubmissions] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoadingSubmissions, setIsLoadingSubmissions] = useState(false);

  // Check if user is already logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchSubmissions();
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setLoginError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setSubmissions([]);
      setSelectedSubmission(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const fetchSubmissions = async () => {
    setIsLoadingSubmissions(true);
    const data = await getContactSubmissions();
    setSubmissions(data);
    setIsLoadingSubmissions(false);
  };

  const handleDeleteSubmission = async (submissionId) => {
    if (window.confirm("Delete this submission?")) {
      const success = await deleteSubmission(submissionId);
      if (success) {
        setSubmissions(submissions.filter((sub) => sub.id !== submissionId));
        setSelectedSubmission(null);
      }
    }
  };

  const handleClearAll = async () => {
    if (window.confirm("Delete all submissions? This cannot be undone.")) {
      for (const submission of submissions) {
        await deleteSubmission(submission.id);
      }
      setSubmissions([]);
      setSelectedSubmission(null);
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
      new Date(sub.submittedAt).toLocaleString()
    ]);

    const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `contact-submissions-${Date.now()}.csv`;
    a.click();
  };

  const filteredSubmissions = submissions.filter((sub) =>
    sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sub.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sub.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Login View
  if (!user) {
    return (
      <div className="admin-login-container">
        <div className="admin-login-card fade-in">
          <h1 className="admin-title">🔐 Admin Dashboard</h1>
          <p className="admin-subtitle">Sign in to view contact form submissions</p>

          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-input"
              />
            </div>

            {loginError && <p className="error-message">❌ {loginError}</p>}

            <button
              type="submit"
              disabled={isLoading}
              className="login-btn"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="login-note">
            💡 Use your Firebase authentication credentials to log in
          </p>
        </div>

        {/* Background */}
        <div className="skills-background">
          <div className="glow glow-1"></div>
          <div className="glow glow-2"></div>
        </div>
      </div>
    );
  }

  // Dashboard View
  return (
    <div className="admin-dashboard-container">
      <div className="dashboard-header">
        <div className="header-left">
          <h1 className="dashboard-title">📊 Contact Form Submissions</h1>
          <p className="dashboard-subtitle">Logged in as: {user.email}</p>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-controls">
          <input
            type="text"
            placeholder="🔍 Search by name, email, or subject..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <div className="control-actions">
            <button
              className="export-btn"
              onClick={handleExportCSV}
              disabled={submissions.length === 0}
            >
              📥 Export CSV
            </button>
            <button
              className="clear-all-btn"
              onClick={handleClearAll}
              disabled={submissions.length === 0}
            >
              🗑️ Clear All
            </button>
            <button
              className="refresh-btn"
              onClick={fetchSubmissions}
              disabled={isLoadingSubmissions}
            >
              🔄 Refresh
            </button>
          </div>
        </div>

        <div className="submissions-view">
          <div className="submissions-list">
            {isLoadingSubmissions ? (
              <div className="loading">Loading submissions...</div>
            ) : filteredSubmissions.length === 0 ? (
              <div className="no-submissions">
                {searchQuery ? "No matching submissions found" : "No submissions yet"}
              </div>
            ) : (
              filteredSubmissions.map((submission) => (
                <div
                  key={submission.id}
                  className={`submission-card ${selectedSubmission?.id === submission.id ? "selected" : ""}`}
                  onClick={() => setSelectedSubmission(submission)}
                  role="button"
                  tabIndex="0"
                >
                  <div className="submission-summary">
                    <h4 className="submission-name">{submission.name}</h4>
                    <p className="submission-email">{submission.email}</p>
                    <p className="submission-subject">{submission.subject}</p>
                    <small className="submission-date">
                      {new Date(submission.submittedAt).toLocaleString()}
                    </small>
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
                  className="delete-btn"
                  onClick={() => handleDeleteSubmission(selectedSubmission.id)}
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
                <p>{new Date(selectedSubmission.submittedAt).toLocaleString()}</p>
              </div>

              <button
                className="copy-btn"
                onClick={() => {
                  const text = `Name: ${selectedSubmission.name}\nEmail: ${selectedSubmission.email}\nSubject: ${selectedSubmission.subject}\nMessage: ${selectedSubmission.message}`;
                  navigator.clipboard.writeText(text);
                  alert("Copied to clipboard!");
                }}
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

      {/* Background */}
      <div className="skills-background">
        <div className="glow glow-1"></div>
        <div className="glow glow-2"></div>
      </div>
    </div>
  );
}
