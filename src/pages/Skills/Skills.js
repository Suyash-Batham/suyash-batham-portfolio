import { useState, useEffect } from "react";
import "./Skills.css";

export default function Skills() {
  const [animateProgress, setAnimateProgress] = useState(false);

  useEffect(() => {
    // Trigger animation when component mounts
    setAnimateProgress(true);
  }, []);

  const skillsData = [
    {
      category: "React & JavaScript",
      icon: "⚛️",
      skills: [
        { name: "React.js", proficiency: 92 },
        { name: "React Hooks & Context API", proficiency: 90 },
        { name: "Redux", proficiency: 88 },
        { name: "JavaScript (ES6+)", proficiency: 89 },
        { name: "JSX & Component Architecture", proficiency: 91 }
      ]
    },
    {
      category: "WordPress & Gutenberg",
      icon: "📄",
      skills: [
        { name: "WordPress Development", proficiency: 94 },
        { name: "Gutenberg Block Development", proficiency: 92 },
        { name: "PHP", proficiency: 95 },
        { name: "WordPress REST API", proficiency: 89 },
        { name: "Custom Post Types & Taxonomies", proficiency: 91 }
      ]
    },
    {
      category: "Frontend Performance & UX",
      icon: "⚡",
      skills: [
        { name: "Performance Optimization", proficiency: 89 },
        { name: "Lazy Loading & Code Splitting", proficiency: 88 },
        { name: "Responsive Design", proficiency: 92 },
        { name: "CSS3 & Animations", proficiency: 90 },
        { name: "Accessibility (WCAG/ADA)", proficiency: 88 }
      ]
    },
    {
      category: "Tools & DevOps",
      icon: "🛠️",
      skills: [
        { name: "Git/GitHub", proficiency: 94 },
        { name: "VS Code", proficiency: 95 },
        { name: "NPM/Yarn", proficiency: 88 },
        { name: "CI/CD Pipelines", proficiency: 80 },
        { name: "Docker (Basics)", proficiency: 72 }
      ]
    },
    {
      category: "Analytics & Testing",
      icon: "📊",
      skills: [
        { name: "Google Analytics 4 (GA4)", proficiency: 87 },
        { name: "Google Tag Manager (GTM)", proficiency: 86 },
        { name: "Jest & React Testing Library", proficiency: 82 },
        { name: "Debugging & Chrome DevTools", proficiency: 91 },
        { name: "Cross-browser Testing", proficiency: 88 }
      ]
    },
    {
      category: "Professional Skills",
      icon: "💼",
      skills: [
        { name: "Team Collaboration", proficiency: 92 },
        { name: "Agile Development", proficiency: 89 },
        { name: "Code Reviews & Mentoring", proficiency: 85 },
        { name: "Client Communication", proficiency: 93 },
        { name: "Problem Solving", proficiency: 90 }
      ]
    }
  ];

  return (
    <div className="skills-container">
      {/* Header */}
      <div className="skills-header fade-in">
        <h1 className="skills-title">Skills and Expertise</h1>
        <p className="skills-subtitle">
          My proficiency and expertise across the development stack
        </p>
      </div>

      {/* Skills Grid */}
      <div className="skills-content">
        <div className="skills-grid">
          {skillsData.map((skillGroup, index) => (
            <div
              key={index}
              className={`skill-card fade-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Card Header */}
              <div className="skill-card-header">
                <span className="skill-icon">{skillGroup.icon}</span>
                <h2 className="skill-category">{skillGroup.category}</h2>
              </div>

              {/* Skills List */}
              <div className="skills-list">
                {skillGroup.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="skill-item">
                    <div className="skill-name-row">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-percentage">
                        {animateProgress ? skill.proficiency : 0}%
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="progress-bar-container">
                      <div
                        className={`progress-bar ${animateProgress ? "active" : ""}`}
                        style={{
                          "--progress": `${skill.proficiency}%`,
                          "--delay": `${skillIndex * 0.1}s`
                        }}
                      >
                        <div className="progress-fill"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
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