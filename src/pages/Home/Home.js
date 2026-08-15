import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const handleResumeDownload = () => {
    const link = document.createElement('a');
    link.href = '/Suyash_Batham.pdf';
    link.download = 'Suyash_Batham.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="home-container">
      <div className="home-content">
        <div className="home-grid">
          {/* Left Section */}
          <div className="home-left fade-in">
            <div className="status-badge">
              <span className="badge-icon">✨</span>
              <span>Seeking a new ORIGIN for my code</span>
            </div>

            <h1 className="home-title fade-in">
              Building scalable <br />
              <span className="gradient-text">React & WordPress solutions</span> <br />
              that drive enterprise performance.
            </h1>

            <p className="home-description fade-in delay-1">
              Full-stack Frontend Engineer with 4 years building enterprise web applications. Specialized in React.js, WordPress/Gutenberg development, and high-performance component architecture. I create clean, accessible, and scalable digital experiences for platforms serving millions.
            </p>

            <div className="cta-buttons fade-in delay-2">
              {/* <Link to="/projects" className="btn btn-primary">
                View My Work
                <span className="arrow">→</span>
              </Link> */}
              <button onClick={handleResumeDownload} className="btn btn-primary">
                Download Resume
              </button>
              <Link to="/contact" className="btn btn-secondary">
                Contact Me
              </Link>
            </div>
          </div>

          {/* Right Section - Code Card */}
          <div className="home-right fade-in delay-3">
            <div className="code-card-container">
              <div className="code-card">
                <div className="code-header">
                  <div className="code-dots">
                    <div className="dot red"></div>
                    <div className="dot yellow"></div>
                    <div className="dot green"></div>
                  </div>
                  <span className="code-filename">developer.js</span>
                </div>
                <div className="code-content">
                  <p><span className="keyword">const</span> <span className="class">Developer</span> = <span className="symbol">{"{"}</span></p>
                  <div className="code-block">
                    <p><span className="property">name</span>: <span className="string">"Suyash Batham"</span>,</p>
                    <p><span className="property">experience</span>: <span className="string">"4 Years"</span>,</p>
                    <p><span className="property">expertise</span>: [<span className="string">"React"</span>, <span className="string">"WordPress"</span>, <span className="string">"Gutenberg"</span>],</p>
                    <p><span className="property">focus</span>: <span className="string">"Performance & Accessibility"</span>,</p>
                    <p><span className="property">buildingAt</span>: <span className="string">"Wipro (Blackstone)"</span></p>
                  </div>
                  <p><span className="symbol">{"}"}</span></p>
                  
                  <p><span className="keyword">export default</span> <span className="class">Developer</span>;</p>
                </div>
              </div>
              <div className="code-glow"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="skills-background">
        <div className="glow glow-1"></div>
        <div className="glow glow-2"></div>
      </div>
    </div>
  );
}
