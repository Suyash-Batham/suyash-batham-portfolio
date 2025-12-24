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
      category: "Frontend Development",
      icon: "🎨",
      skills: [
        { name: "React", proficiency: 90 },
        { name: "JavaScript", proficiency: 87 },
        { name: "Wordpress", proficiency: 94 },
        { name: "HTML/CSS", proficiency: 90 },
        { name: "PHP", proficiency: 95 }
      ]
    },
    {
      category: "Tools & Technologies",
      icon: "🛠️",
      skills: [
        { name: "Git/GitHub", proficiency: 94 },
        { name: "VS Code", proficiency: 95 },
        { name: "Docker (Basics)", proficiency: 70 },
        { name: "npm/yarn", proficiency: 88 },
        { name: "CI/CD Pipelines", proficiency: 75 }
      ]
    },
    {
      category: "Design & UX",
      icon: "✨",
      skills: [
        { name: "UI/UX Design Principles", proficiency: 85 },
        { name: "Figma", proficiency: 82 },
        { name: "Web Design", proficiency: 88 },
        { name: "Responsive Layout", proficiency: 92 },
        { name: "Animation / Microinteractions", proficiency: 75 }
      ]
    },
    {
      category: "Performance & SEO",
      icon: "⚡",
      skills: [
        { name: "Web Performance", proficiency: 87 },
        { name: "SEO Optimization", proficiency: 84 },
        { name: "Accessibility (a11y)", proficiency: 86 },
        { name: "Testing", proficiency: 80 }
      ]
    },
    {
      category: "Professional & Soft Skills",
      icon: "💼",
      skills: [
        { name: "Team Collaboration", proficiency: 90 },
        { name: "AI-Powered Development", proficiency: 85 },
        { name: "Problem Solving", proficiency: 88 },
        { name: "Mentoring / Code Reviews", proficiency: 80 },
        { name: "Client Communication", proficiency: 97 }
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