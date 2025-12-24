import { useState } from "react";
import "./About.css";

export default function About() {
  const [activeTab, setActiveTab] = useState("bio");

  const experiences = [
    {
      role: "Software Developer",
      company: "Wipro Ltd. ( Blackstone Account )",
      period: "October 2022 - Present",
      description: [
        "Build clean, responsive user interfaces using React, PHP, and modern CSS.",
        "Develop custom WordPress themes and complex Gutenberg blocks from scratch.",
        "Create dynamic content systems using templates, custom post types, and reusable components.",
        "Integrate third-party tools and REST APIs to extend WordPress beyond default capabilities.",
        "Implement ADA accessibility standards and performance best practices.",
        "Improve cross-browser compatibility, including smooth experiences on iOS devices.",
        "Design reusable data visualization components using Highcharts.",
        "Track and analyze user behavior with Google Analytics 4.",
        "Work with Digital Asset Management (DAM) systems to centralize and streamline media handling."
      ],
      skills: ["Wordpress", "React", "JavaScript", "PHP", "CSS", "GIT", "Web Performance"]
    },
    {
      role: "Machine Learning Intern",
      company: "TCS-iON",
      period: "May 2020 - August 2020",
       description: [
        "Worked on sentiment analysis projects using rule-based and deep learning algorithms.",
        "Predicted sentiment of sentences and entire paragraphs accurately.",
        "Completed 15+ sentiment analysis projects leveraging Lexical-Based, VADER, TF-IDF, Count-Vectorizer, and deep learning techniques."
      ],
      skills: ["Machine Learning", "Python", "NLP", "Deep Learning", "Data Analysis"]
    }
  ];

  const education = [
    {
      degree: "Bachelor of Technology in Computer Science",
      institution: "GLA University",
      period: "2018 - 2022",
      description: "Specialization in Data Analytics ( by IBM). Graduated with Honors.",
      gpa: "3.8/4.0"
    }
  ];

  const certifications = [
    {
      name: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services",
      date: "2024",
      credentialUrl: "#"
    },
    {
      name: "Security Fundamentals (98-367) Exam",
      issuer: "Microsoft Technical Associate",
      date: "2019",
      credentialUrl: "#"
    },
    // {
    //   name: "Responsive Web Design",
    //   issuer: "freeCodeCamp",
    //   date: "2021",
    //   credentialUrl: "#"
    // }
  ];

  const awards = [
    {
      title: "Rockstar Rookie Developer",
      organization: "Unit Awards 2025",
      date: "2025",
      description: "Recognized for exceptional frontend development and innovative UI solutions."
    },
    {
      title: "Dream Team Player",
      organization: "Wipro Ltd.",
      date: "2023",
      description: "Awarded for outstanding collaboration and team contribution on high-impact projects."
    },
    {
      title: "HacktoberFest 2020 Contributor",
      organization: "DigitalOcean, Intel",
      date: "2020",
      description: "Contributed to open-source projects during the HacktoberFest 2020 event."
    },
    {
      title: "IBM ICE Award",
      organization: "IBM ICE Day Competition",
      date: "2019",
      description: "My team won first place in university-level competition organized by IBM."
    }
  ];

  return (
    <div className="about-container">
      <div className="about-content">
        {/* Header with Image */}
        <div className="about-header fade-in">
          <div className="header-wrapper">
            <div className="header-text">
              <h1 className="about-title">About Me</h1>
              <p className="about-subtitle">
                Wordpress Developer building scalable, high-performance user interfaces with product thinking.
              </p>
            </div>
            <div className="header-image">
              <img 
                src="/Image4.jpg" 
                alt="Profile" 
                className="profile-image"
              />
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="tabs-container">
          <div className="tabs-list">
            {["bio", "experience", "education", "certifications", "awards"].map((tab) => (
              <button
                key={tab}
                className={`tab-trigger ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="tabs-content">
          {/* Bio Tab */}
          {activeTab === "bio" && (
            <div className="tab-pane fade-in">
              <div className="bio-card">
                <p className="bio-text">
                  Hello! I’m a WordPress Developer who enjoys building thoughtful, well-structured, and user-focused web experiences. I work primarily on custom WordPress themes and plugins, with an emphasis on performance, maintainability, and clean design that actually serves real users.
                </p>
                
                <p className="bio-text">
                  Beyond standard WordPress setups, I often build custom plugin logic, extend core functionality, and integrate third-party REST APIs to connect WordPress with external tools, services, and dashboards. I like making WordPress behave more like a flexible application platform rather than just a CMS.
                </p>

                <p className="bio-text">
                  I care a lot about code quality and long-term scalability. Whether it’s a marketing site, a content-heavy platform, or a product-driven build, I focus on writing code that’s easy to understand, easy to extend, and reliable for teams over time. I’m always refining my approach—exploring better patterns, modern frontend practices, and performance improvements—to make sure what I build stays solid well into the future.
                </p>

                <div className="bio-info">
                  <div className="info-item">
                    <span className="info-dot"></span>
                    <span>Passionate about Web Development</span>
                  </div>
                  <div className="info-item">
                    <span className="info-dot"></span>
                    <span>Curious by default, learning by habit</span>
                  </div>
                  <div className="info-item">
                    <span className="info-dot"></span>
                    <span>Open to Freelance & Remote Work</span>
                  </div>
                  
                </div>

                {/* <div className="about-section">
                  <h3 className="section-title">Skills</h3>
                  <Skills />
                </div> */}
              </div>
            </div>
          )}

          {/* Experience Tab */}
          {activeTab === "experience" && (
            <div className="tab-pane fade-in">
              <div className="experience-list">
                {experiences.map((job, index) => (
                  <div key={index} className="experience-card">
                    <div className="experience-header">
                      <div className="experience-info">
                        <h3 className="job-title">{job.role}</h3>
                        <p className="company-name">📍 {job.company}</p>
                      </div>
                      <div className="experience-period">{job.period}</div>
                    </div>
                    
                    {/* Handle both string and array descriptions */}
                    {Array.isArray(job.description) ? (
                      <ul className="job-description-list">
                        {job.description.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="job-description">{job.description}</p>
                    )}
                    
                    <div className="skills-tags">
                      {job.skills.map((skill) => (
                        <span key={skill} className="skill-tag">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education Tab */}
          {activeTab === "education" && (
            <div className="tab-pane fade-in">
              <div className="education-list">
                {education.map((edu, index) => (
                  <div key={index} className="education-card">
                    <div className="education-icon">🎓</div>
                    <div className="education-content">
                      <h3 className="degree-title">{edu.degree}</h3>
                      <p className="institution-name">{edu.institution}</p>
                      <p className="education-period">{edu.period}</p>
                      <p className="education-description">{edu.description}</p>
                      {/* <p className="education-gpa">GPA: {edu.gpa}</p> */}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications Tab */}
          {activeTab === "certifications" && (
            <div className="tab-pane fade-in">
              <div className="certifications-list">
                {certifications.map((cert, index) => (
                  <div key={index} className="certification-card">
                    <div className="cert-icon">🏅</div>
                    <div className="cert-content">
                      <h3 className="cert-name">{cert.name}</h3>
                      <p className="cert-issuer">{cert.issuer}</p>
                      <p className="cert-date">{cert.date}</p>
                      <a href={cert.credentialUrl} className="cert-link">
                        View Credential →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Awards Tab */}
          {activeTab === "awards" && (
            <div className="tab-pane fade-in">
              <div className="awards-list">
                {awards.map((award, index) => (
                  <div key={index} className="award-card">
                    <div className="award-icon">🏆</div>
                    <div className="award-content">
                      <h3 className="award-title">{award.title}</h3>
                      <p className="award-organization">{award.organization}</p>
                      <p className="award-date">{award.date}</p>
                      <p className="award-description">{award.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
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
