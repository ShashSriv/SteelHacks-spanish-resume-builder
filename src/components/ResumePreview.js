import React from 'react';
import { FileText, Download, Eye, X } from 'lucide-react';

const ResumePreview = ({ resumeData, currentStep, onDownloadPDF, showTemplate, onHideTemplate }) => {
  const hasContent = resumeData.contact.name || 
                    resumeData.experience.length > 0 || 
                    resumeData.education.length > 0 || 
                    resumeData.skills.length > 0 || 
                    resumeData.summary;

  // Template data to show as example
  const templateData = {
    contact: {
      name: 'María González',
      email: 'maria.gonzalez@email.com',
      phone: '+1 (555) 123-4567',
      address: 'Madrid, España',
      linkedin: 'linkedin.com/in/mariagonzalez'
    },
    experience: [
      {
        title: 'Desarrolladora de Software Senior',
        company: 'TechCorp Solutions',
        dates: '2020 - Presente',
        description: 'Lideré el desarrollo de aplicaciones web utilizando React, Node.js y bases de datos SQL. Colaboré con equipos multidisciplinarios para entregar soluciones escalables.'
      },
      {
        title: 'Desarrolladora Frontend',
        company: 'StartupXYZ',
        dates: '2018 - 2020',
        description: 'Desarrollé interfaces de usuario responsivas y optimicé el rendimiento de aplicaciones web. Trabajé con metodologías ágiles y herramientas de CI/CD.'
      }
    ],
    education: [
      {
        degree: 'Licenciatura en Ciencias de la Computación',
        institution: 'Universidad Politécnica de Madrid',
        dates: '2014 - 2018'
      }
    ],
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'Git', 'Docker', 'AWS'],
    languages: ['Español (Nativo)', 'Inglés (Avanzado)', 'Francés (Intermedio)'],
    summary: 'Desarrolladora de software apasionada con más de 5 años de experiencia en desarrollo web full-stack. Especializada en tecnologías modernas y metodologías ágiles, con un enfoque en crear soluciones escalables y de alta calidad.'
  };

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

  const renderResumeContent = (data) => (
    <div className="resume-preview-content">
      {/* Contact Information */}
      {data.contact.name && (
        <div className="resume-section">
          <div className="resume-name">{data.contact.name}</div>
          <div className="resume-contact">
            {data.contact.email && <span>{data.contact.email}</span>}
            {data.contact.phone && <span> • {data.contact.phone}</span>}
            {data.contact.address && <span> • {data.contact.address}</span>}
            {data.contact.linkedin && <span> • {data.contact.linkedin}</span>}
          </div>
        </div>
      )}

      {/* Professional Summary */}
      {data.summary && (
        <div className="resume-section">
          <div className="resume-section-title">Resumen Profesional</div>
          <div className="resume-item-description">{data.summary}</div>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="resume-section">
          <div className="resume-section-title">Experiencia Laboral</div>
          {data.experience.map((exp, index) => (
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
      {data.education.length > 0 && (
        <div className="resume-section">
          <div className="resume-section-title">Educación</div>
          {data.education.map((edu, index) => (
            <div key={index} className="resume-item">
              <div className="resume-item-title">{edu.degree}</div>
              <div className="resume-item-company">{edu.institution}</div>
              <div className="resume-item-dates">{edu.dates}</div>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className="resume-section">
          <div className="resume-section-title">Habilidades</div>
          <div className="resume-skills">
            {data.skills.map((skill, index) => (
              <span key={index} className="resume-skill">{skill}</span>
            ))}
          </div>
        </div>
      )}

      {/* Languages */}
      {data.languages.length > 0 && (
        <div className="resume-section">
          <div className="resume-section-title">Idiomas</div>
          <div className="resume-skills">
            {data.languages.map((lang, index) => (
              <span key={index} className="resume-skill">{lang}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="card">
      <div className="card-header">
        <div className="resume-preview-header">
          <h3 className="card-title">
            {showTemplate ? 'Resume Template Preview' : 'Resume Preview'}
          </h3>
          <div className="preview-actions">
            {showTemplate && (
              <button 
                className="btn btn-secondary" 
                onClick={onHideTemplate}
                style={{ marginRight: '8px' }}
              >
                <X size={16} />
                Hide Template
              </button>
            )}
            <button className="btn btn-secondary" onClick={handleDownloadPDF}>
              <Download size={16} />
              PDF
            </button>
          </div>
        </div>
        {!showTemplate && (
          <>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${getStepProgress()}%` }}
              ></div>
            </div>
            <p className="card-subtitle">
              Step {['contact', 'experience', 'education', 'skills', 'summary'].indexOf(currentStep) + 1} of 5
            </p>
          </>
        )}
        {!hasContent && !showTemplate && (
          <p className="card-subtitle">
            Start speaking to build your resume step by step
          </p>
        )}
        {showTemplate && (
          <p className="card-subtitle">
            This is an example of how your resume will look. Start speaking to fill in your own information.
          </p>
        )}
      </div>

      <div className="resume-preview-container">
        {showTemplate ? (
          renderResumeContent(templateData)
        ) : hasContent ? (
          renderResumeContent(resumeData)
        ) : (
          <div className="empty-state">
            <FileText className="empty-state-icon" />
            <h4 className="empty-state-title">Ready to Build Your Resume</h4>
            <p className="empty-state-description">
              Click the microphone and start speaking to add your information step by step
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumePreview;
