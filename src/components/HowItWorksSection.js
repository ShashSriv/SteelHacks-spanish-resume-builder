import React from 'react';

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Process</h2>
          <p className="section-subtitle">
            Simple steps to create your professional Spanish resume
          </p>
        </div>
        
        <div className="steps-container">
          <div className="steps">
            <div className="step-item">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4>Start a Session</h4>
                <p>Click "Start Session" to begin building your resume with voice input.</p>
              </div>
            </div>
            
            <div className="step-item">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4>Speak Your Information</h4>
                <p>Follow the prompts and speak your contact details, experience, education, and skills in Spanish.</p>
              </div>
            </div>
            
            <div className="step-item">
              <div className="step-number">3</div>
              <div className="step-content">
                <h4>Review & Edit</h4>
                <p>Review the generated content and make any necessary edits using the manual editor.</p>
              </div>
            </div>
            
            <div className="step-item">
              <div className="step-number">4</div>
              <div className="step-content">
                <h4>Download PDF</h4>
                <p>Export your completed resume as a professional PDF document.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
