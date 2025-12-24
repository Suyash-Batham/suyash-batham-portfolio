import { Link } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="not-found-icon">404</div>
        
        <h1 className="not-found-title">Page Not Found</h1>
        
        <p className="not-found-description">
          Oops! The page you're looking for doesn't exist. 
          It might have been moved or deleted.
        </p>

        {/* <div className="not-found-illustration">
          <div className="error-box">
            <div className="error-header">
              <div className="error-dots">
                <div className="error-dot red"></div>
                <div className="error-dot yellow"></div>
                <div className="error-dot green"></div>
              </div>
              <span className="error-filename">404.tsx</span>
            </div>
            <div className="error-code">
              <p><span className="err-keyword">export</span> <span className="err-keyword">default</span> <span className="err-keyword">function</span> <span className="err-class">NotFound</span>() <span className="err-symbol">{"{"}</span></p>
              <div className="err-block">
                <p><span className="err-keyword">return</span> <span className="err-symbol">{"<"}</span><span className="err-class">Error</span><span className="err-symbol">{">"}</span></p>
              </div>
              <p><span className="err-symbol">{"}"}</span></p>
            </div>
          </div>
        </div> */}

        <div className="not-found-actions">
          <Link to="/" className="btn-home">
            ← Back to Home
          </Link>
          <Link to="/projects" className="btn-explore">
            Explore Projects →
          </Link>
        </div>
      </div>

      {/* Background Elements */}
      <div className="not-found-background">
        <div className="floating-error">404</div>
      </div>
    </div>
  );
}