import "./Projects.css";

const projects = [
  {
    title: "🎯 Quiz - Learning Management System",
    desc: "Enterprise quiz platform with Salesforce integration and Snowflake analytics (Blackstone)",
    details: [
      "Built structured quiz workflows and course modules with role-based access control",
      "Integrated Salesforce CRM with data pipeline to Snowflake for real-time analytics",
      "Created dashboard to monitor learner progress, completion rates, and performance metrics"
    ],
    tech: ["React", "Salesforce", "Snowflake", "REST API"],
    category: "WordPress",
    metrics: "Live on Blackstone | 250+ users",
    link: "#"
  },
  {
    title: "📋 Multi-Screen Investor Attestation",
    desc: "Compliance-driven workflow system for investor access control (Blackstone)",
    details: [
      "Multi-step form with configurable Accept/Decline workflows",
      "Client-side validation and compliance-driven gating",
      "State management with React hooks and responsive design",
      "Deployed on Blackstone compliance systems"
    ],
    tech: ["React", "JavaScript", "Client-side Validation", "CSS3"],
    category: "React",
    metrics: "Live on Blackstone | 1000+ investors",
    link: "#"
  },
  {
    title: "📈 Load More Performance Optimization",
    desc: "Performance-optimized content loading for 900+ profiles (Blackstone)",
    details: [
      "Implemented incremental Load More reducing DOM rendering by 60%",
      "Improved First Contentful Paint from 2.8s to 1.1s",
      "Lazy image loading and smooth pagination UX",
      "Applied to 'Our People' & 'Insights' production pages"
    ],
    tech: ["React", "Performance Optimization", "Lazy Loading", "Memoization"],
    category: "React",
    metrics: "60% DOM reduction, 47% FCP gain",
    link: "#"
  },
  {
    title: "✅ Task Management Playground",
    desc: "Full-featured productivity app with gamification and advanced state management",
    details: [
      "Create, edit, delete tasks with real-time updates",
      "Progress tracking with streaks and gamification points",
      "Drag-and-drop with undo/redo functionality",
      "Dark mode support with persistent LocalStorage"
    ],
    tech: ["React", "useReducer", "useCallback", "LocalStorage"],
    category: "React",
    link: "#"
  },
  {
    title: "🎬 Movie Search Engine",
    desc: "Full-featured movie discovery platform with advanced filtering and ratings",
    details: [
      "Browse trending movies with detailed information and ratings",
      "User reviews, watchlist functionality with persistent storage",
      "Responsive grid layout with smooth animations",
      "Search and filter with API caching optimization"
    ],
    tech: ["React", "TMDB API", "Axios", "CSS Grid"],
    category: "React",
    link: "#"
  }
];

export default function Projects() {
  return (
    <div className="projects-container">
      {/* Header */}
      <div className="projects-header fade-in">
        <h1 className="projects-title">My Projects</h1>
        <p className="projects-subtitle">
          Enterprise React applications and WordPress solutions showcasing performance optimization, accessibility, and scalable architecture
        </p>
      </div>

      {/* Projects Grid */}
      <div className="projects">
        {projects.map((p, i) => (
          <div key={i} className="project-card fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="card-header">
              <h3 className="project-title">{p.title}</h3>
            </div>

            <p className="project-desc">{p.desc}</p>

            <div className="project-details">
              <h4 className="details-heading">Features:</h4>
              <ul className="details-list">
                {p.details.map((detail, idx) => (
                  <li key={idx}>{detail}</li>
                ))}
              </ul>
            </div>

            <div className="tech-stack">
              <h4 className="tech-heading">Tech Stack:</h4>
              <div className="tech-tags">
                {p.tech.map((t, idx) => (
                  <span key={idx} className="tech-tag">{t}</span>
                ))}
              </div>
            </div>

            {p.metrics && (
              <div className="project-metrics">
                <span className="metrics-badge">📊 {p.metrics}</span>
              </div>
            )}

            {p.category && (
              <div className="project-category">
                <span className={`category-badge ${p.category.toLowerCase()}`}>{p.category}</span>
              </div>
            )}

            <a href={p.link} className="view-project-btn">
              View Project →
            </a>
          </div>
        ))}
      </div>

      {/* Background Elements */}
      <div className="skills-background">
        <div className="glow glow-1"></div>
        <div className="glow glow-2"></div>
      </div>
    </div>
  );
}
