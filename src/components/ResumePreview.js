import React from 'react';
import { FileText, Download, Eye } from 'lucide-react';

const ResumePreview = ({ resumeData, currentStep, onDownloadPDF }) => {
  const hasContent = resumeData.contact.name || 
                    resumeData.experience.length > 0 || 
                    resumeData.education.length > 0 || 
                    resumeData.skills.length > 0 || 
                    resumeData.summary;

  const handleDownloadPDF = () => {
    if (onDownloadPDF) {
      onDownloadPDF();
    }
  };

  const getStepProgress = () => {
    const steps = ['contact', 'experience', 'education', 'skills', 'summary'];
    const currentIndex = steps.indexOf(currentStep);
    return ((currentIndex + 1) / steps.length) * 100;
  };

  return (
    <div className="card">
      <div className="card-header">
        <div className="resume-preview-header">
          <h3 className="card-title">Resume Preview</h3>
          <div className="preview-actions">
            <button className="btn btn-secondary" onClick={handleDownloadPDF}>
              <Download size={16} />
              PDF
            </button>
          </div>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${getStepProgress()}%` }}
          ></div>
        </div>
        <p className="card-subtitle">
          Step {['contact', 'experience', 'education', 'skills', 'summary'].indexOf(currentStep) + 1} of 5
        </p>
      </div>

      <div className="resume-preview-container">
        {hasContent ? (
          <div className="resume-preview-content">
            {/* Contact Information */}
            {resumeData.contact.name && (
              <div className="resume-section">
                <div className="resume-name">{resumeData.contact.name}</div>
                <div className="resume-contact">
                  {resumeData.contact.email && <span>{resumeData.contact.email}</span>}
                  {resumeData.contact.phone && <span> • {resumeData.contact.phone}</span>}
                  {resumeData.contact.address && <span> • {resumeData.contact.address}</span>}
                  {resumeData.contact.linkedin && <span> • {resumeData.contact.linkedin}</span>}
                </div>
              </div>
            )}

            {/* Professional Summary */}
            {resumeData.summary && (
              <div className="resume-section">
                <div className="resume-section-title">Professional Summary</div>
                <div className="resume-item-description">{resumeData.summary}</div>
              </div>
            )}

            {/* Experience */}
            {resumeData.experience.length > 0 && (
              <div className="resume-section">
                <div className="resume-section-title">Work Experience</div>
                {resumeData.experience.map((exp, index) => (
                  <div key={index} className="resume-item">
                    <div className="resume-item-title">{exp.title}</div>
                    <div className="resume-item-company">{exp.company}</div>
                    <div className="resume-item-dates">{exp.dates}</div>
                    <div className="resume-item-description">{exp.description}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Education */}
            {resumeData.education.length > 0 && (
              <div className="resume-section">
                <div className="resume-section-title">Education</div>
                {resumeData.education.map((edu, index) => (
                  <div key={index} className="resume-item">
                    <div className="resume-item-title">{edu.degree}</div>
                    <div className="resume-item-company">{edu.institution}</div>
                    <div className="resume-item-dates">{edu.dates}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Skills */}
            {resumeData.skills.length > 0 && (
              <div className="resume-section">
                <div className="resume-section-title">Skills</div>
                <div className="resume-skills">
                  {resumeData.skills.map((skill, index) => (
                    <span key={index} className="resume-skill">{skill}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Languages */}
            {resumeData.languages.length > 0 && (
              <div className="resume-section">
                <div className="resume-section-title">Languages</div>
                <div className="resume-skills">
                  {resumeData.languages.map((lang, index) => (
                    <span key={index} className="resume-skill">{lang}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="empty-state">
            <FileText className="empty-state-icon" />
            <h4 className="empty-state-title">Empty Resume</h4>
            <p className="empty-state-description">
              Start adding information using voice or text to see the preview here
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumePreview;
