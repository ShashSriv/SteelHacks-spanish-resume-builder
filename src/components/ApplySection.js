import React from 'react';
import { Briefcase, MapPin, Calendar, Users, MessageSquare, ExternalLink } from 'lucide-react';

const ApplySection = () => {
  return (
    <section id="apply" className="section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Apply for Jobs</h2>
          <p className="section-subtitle">
            Use your Spanish resume to apply for positions and advance your career
          </p>
        </div>
        
        <div className="apply-content">
          <div className="apply-grid">
            <div className="apply-card">
              <div className="apply-icon">
                <Briefcase size={32} />
              </div>
              <h3>Job Search Tips</h3>
              <ul>
                <li>Customize your resume for each position</li>
                <li>Use keywords from job descriptions</li>
                <li>Highlight relevant experience and skills</li>
                <li>Include quantifiable achievements</li>
              </ul>
            </div>
            
            <div className="apply-card">
              <div className="apply-icon">
                <MapPin size={32} />
              </div>
              <h3>Spanish-Speaking Markets</h3>
              <ul>
                <li>Latin American companies</li>
                <li>Spanish multinational corporations</li>
                <li>Bilingual positions in the US</li>
                <li>International organizations</li>
              </ul>
            </div>
            
            <div className="apply-card">
              <div className="apply-icon">
                <Calendar size={32} />
              </div>
              <h3>Application Timeline</h3>
              <ul>
                <li>Apply within 48 hours of posting</li>
                <li>Follow up after 1-2 weeks</li>
                <li>Prepare for interviews in both languages</li>
                <li>Keep your resume updated regularly</li>
              </ul>
            </div>
            
            <div className="apply-card">
              <div className="apply-icon">
                <Users size={32} />
              </div>
              <h3>Networking</h3>
              <ul>
                <li>Join Spanish professional groups</li>
                <li>Attend bilingual networking events</li>
                <li>Connect on LinkedIn in Spanish</li>
                <li>Build relationships with recruiters</li>
              </ul>
            </div>
            
            <div className="apply-card">
              <div className="apply-icon">
                <MessageSquare size={32} />
              </div>
              <h3>Interview Preparation</h3>
              <ul>
                <li>Practice common interview questions</li>
                <li>Prepare answers in both languages</li>
                <li>Research company culture and values</li>
                <li>Prepare questions to ask the interviewer</li>
              </ul>
            </div>
          </div>
          
          <div className="job-boards-section">
            <h3>Popular Job Boards</h3>
            <div className="job-boards-grid">
              <div className="job-board-card">
                <div className="job-board-logo">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" alt="LinkedIn Logo" className="company-logo" />
                </div>
                <div className="job-board-header">
                  <h4>LinkedIn</h4>
                  <ExternalLink size={16} />
                </div>
                <p>Professional networking and job search platform with Spanish-speaking opportunities worldwide.</p>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="job-board-link">
                  Visit LinkedIn
                </a>
              </div>
              
              <div className="job-board-card">
                <div className="job-board-logo">
                  <img src="/images/glassdoor.png" alt="Glassdoor Logo" className="company-logo" />
                </div>
                <div className="job-board-header">
                  <h4>Glassdoor</h4>
                  <ExternalLink size={16} />
                </div>
                <p>Find jobs with company reviews and salary insights. Great for researching potential employers.</p>
                <a href="https://glassdoor.com" target="_blank" rel="noopener noreferrer" className="job-board-link">
                  Visit Glassdoor
                </a>
              </div>
              
              <div className="job-board-card">
                <div className="job-board-logo">
                  <img src="/images/indeed.png" alt="Indeed Logo" className="company-logo" />
                </div>
                <div className="job-board-header">
                  <h4>Indeed</h4>
                  <ExternalLink size={16} />
                </div>
                <p>One of the largest job search engines with millions of job postings in multiple languages.</p>
                <a href="https://indeed.com" target="_blank" rel="noopener noreferrer" className="job-board-link">
                  Visit Indeed
                </a>
              </div>
              
        
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApplySection;
