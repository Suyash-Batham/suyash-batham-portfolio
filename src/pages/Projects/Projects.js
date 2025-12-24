import "./Projects.css";

const projects = [
  {
    title: "🌤️ Weather App",
    desc: "Real-time weather forecasting application with location-based services",
    details: [
      "Live weather data with 7-day forecast",
      "Geolocation & search functionality",
      "Weather alerts and notifications",
      "Beautiful animated UI"
    ],
    tech: ["React", "OpenWeatherMap API", "Geolocation API", "CSS Animations"],
    link: "#"
  },
  {
    title: "💭 Sentiment Analysis Tool",
    desc: "NLP-powered tool to analyze emotional sentiment in text",
    details: [
      "Real-time sentiment detection",
      "Emotion categorization (positive/negative/neutral)",
      "Confidence score visualization",
      "Text history & analytics"
    ],
    tech: ["React", "NLP.js", "Chart.js", "LocalStorage"],
    link: "#"
  },
  {
    title: "📊 Interactive Dashboard",
    desc: "Data visualization dashboard with real-time analytics",
    details: [
      "Dynamic chart generation",
      "Filter & search capabilities",
      "Export data to CSV/PDF",
      "Responsive grid layout"
    ],
    tech: ["React", "Chart.js", "D3.js", "Tailwind CSS"],
    link: "#"
  },
  {
    title: "✅ Task Management App",
    desc: "Full-featured productivity app with advanced task organization",
    details: [
      "Create, edit, delete tasks",
      "Priority & category tagging",
      "Progress tracking & statistics",
      "Dark mode support"
    ],
    tech: ["React", "Redux", "Firebase", "Material-UI"],
    link: "#"
  },
  {
    title: "🎬 Movie Search Engine",
    desc: "Search & discover movies with ratings, reviews, and details",
    details: [
      "Browse trending movies",
      "Detailed movie information",
      "User ratings & reviews",
      "Watchlist feature"
    ],
    tech: ["React", "TMDB API", "Axios", "CSS Grid"],
    link: "#"
  },
  {
    title: "🛒 E-Commerce Frontend",
    desc: "Modern shopping interface with cart management and checkout flow",
    details: [
      "Product filtering & search",
      "Shopping cart with quantities",
      "Wishlist functionality",
      "Responsive checkout design"
    ],
    tech: ["React", "Context API", "Stripe API", "CSS Modules"],
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
          A showcase of my best work demonstrating React, API integration, and modern web development
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
