import React from 'react';
import { FileText, Mic, Globe, Download } from 'lucide-react';

const AboutSection = () => {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">About</h2>
          <p className="section-subtitle">
            Create professional CVs translating Spanish to English using voice input and AI technology
          </p>
        </div>
        
        <div className="about-content">
          <div className="about-grid">
            <div className="about-card">
              <div className="about-icon">
                <Mic size={32} />
              </div>
              <h3>Voice Input</h3>
              <p>Speak naturally in Spanish to add your information. Our AI will process and translate your input to create a professional CV.</p>
            </div>
            
            <div className="about-card">
              <div className="about-icon">
                <FileText size={32} />
              </div>
              <h3>Professional Format</h3>
              <p>Turn your words into opportunity. Generate clean, professional CVs with proper formatting and structure that employers expect to see. </p>
            </div>
            
            <div className="about-card">
              <div className="about-icon">
                <Globe size={32} />
              </div>
              <h3>Bilingual Support</h3>
              <p>Speak into the application in Spanish or English and then watch as the AI creates CVs in English with automatic translation and localization features.</p>
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
