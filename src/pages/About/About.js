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
        "Architected and built a comprehensive qualification and learning management system for Financial Advisors with structured quiz-based workflows, course modules, and email-based Salesforce access control granting permissions based on organizational role and tier.",
        "Designed end-to-end data pipeline: collected raw user interaction payload data, integrated with Salesforce CRM for centralized management, leveraged enterprise connectors to push data to Snowflake for real-time analytics, and built data visualization components to monitor learner progress, completion rates, and performance metrics for stakeholder dashboards.",
        "Architected cookie-based investor eligibility gating system using JavaScript, DOM Manipulation, and REST APIs to dynamically control access to investor-specific content.",
        "Optimized 2 high-traffic production pages by implementing React-based incremental Load More functionality for 900+ profiles, reducing DOM rendering by 60% and improving FCP by 47%.",
        "Developed 20+ reusable React and Gutenberg components using modern patterns, improving consistency across content-driven page development.",
        "Implemented WCAG/ADA accessibility standards across 15+ components and resolved 50+ compliance issues; diagnosed cross-browser and iOS-specific frontend issues.",
        "Integrated Google Analytics 4 and Google Tag Manager tracking for comprehensive user behavior analysis and performance monitoring.",
        "Build clean, responsive user interfaces using React, PHP, and modern CSS with custom WordPress themes and complex Gutenberg blocks from scratch."
      ],
      skills: ["React", "Salesforce", "Snowflake", "Enterprise Connectors", "Data Pipeline", "JavaScript", "PHP", "Wordpress", "Gutenberg", "GA4", "GTM", "REST API", "Accessibility", "Performance Optimization"]
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
                Frontend Software Engineer specializing in React.js and WordPress development, with expertise in building scalable enterprise applications
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
                  I'm a Frontend Software Engineer with 4 years of experience building enterprise web applications. I specialize in React.js for complex interactive applications and WordPress for content-driven platforms, with expertise in Gutenberg block development, PHP, and modern frontend architecture.
                </p>
                
                <p className="bio-text">
                  At Wipro (Blackstone), I've architected performance-optimized React components serving millions of users, implemented cookie-based access control systems, and built scalable WordPress solutions with custom Gutenberg blocks. I focus on clean code, accessibility (WCAG/ADA compliance), and measurable performance improvements—from 60% DOM reduction to improved page load times.
                </p>

                <p className="bio-text">
                  I care deeply about code quality, scalability, and user experience. Whether building a React application, developing WordPress solutions, or optimizing performance, I focus on writing maintainable code that solves real problems. I'm always exploring better patterns, modern frontend practices, and performance optimization techniques to ensure what I build is reliable and future-proof.
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
