import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const handleResumeDownload = () => {
    const link = document.createElement('a');
    link.href = '/Suyash_Batham_Resume.pdf';
    link.download = 'Suyash_Batham_Resume.pdf';
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
              <span className="gradient-text">WordPress & React experiences</span> <br />
              that users actually enjoy.
            </h1>

            <p className="home-description fade-in delay-1">
              I'm a Wordpress Developer specializing in creating high-performance,
              visually stunning web applications. I build clean, scalable, and user-friendly
              digital experiences.
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
                  <p><span className="property">title</span>: <span className="string">"Frontend Developer"</span>,</p>
                  <p><span className="property">skills</span>: [<span className="string">"React"</span>, <span className="string">"JavaScript"</span>, <span className="string">"CSS"</span>],</p>
                  <p><span className="property">passion</span>: <span className="string">"Building amazing UX"</span>,</p>
                  <p><span className="property">hardworking</span>: <span className="boolean">true</span></p>
                </div>
                <p><span className="symbol">{"}"}</span></p>
                
                <p><span className="keyword">export default</span> <span className="class">Developer</span>;</p>
              </div>
            </div>
            <div className="code-glow"></div>
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
