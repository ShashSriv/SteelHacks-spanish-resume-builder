import React from 'react';
import { FileText, Mic, Globe, Download } from 'lucide-react';

const AboutSection = () => {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">About</h2>
          <p className="section-subtitle">
            Create professional resumes in Spanish using voice input and AI technology
          </p>
        </div>
        
        <div className="about-content">
          <div className="about-grid">
            <div className="about-card">
              <div className="about-icon">
                <Mic size={32} />
              </div>
              <h3>Voice Input</h3>
              <p>Speak naturally in Spanish to add your information. Our AI will process and translate your input to create a professional resume.</p>
            </div>
            
            <div className="about-card">
              <div className="about-icon">
                <FileText size={32} />
              </div>
              <h3>Professional Format</h3>
              <p>Generate clean, professional resumes with proper formatting and structure that employers expect to see.</p>
            </div>
            
            <div className="about-card">
              <div className="about-icon">
                <Globe size={32} />
              </div>
              <h3>Bilingual Support</h3>
              <p>Create resumes in both Spanish and English, with automatic translation and localization features.</p>
            </div>
            
            <div className="about-card">
              <div className="about-icon">
                <Download size={32} />
              </div>
              <h3>PDF Export</h3>
              <p>Download your completed resume as a professional PDF document ready for job applications.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
