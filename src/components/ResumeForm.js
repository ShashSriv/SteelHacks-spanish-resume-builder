import React, { useState } from 'react';
import { Edit3, Save, Plus, Trash2 } from 'lucide-react';

const ResumeForm = ({ resumeData, setResumeData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(resumeData);

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleArrayInputChange = (section, index, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const addArrayItem = (section, template) => {
    setFormData(prev => ({
      ...prev,
      [section]: [...prev[section], template]
    }));
  };

  const removeArrayItem = (section, index) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  const handleSave = () => {
    setResumeData(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(resumeData);
    setIsEditing(false);
  };

  return (
    <div className="card">
      <div className="card-header">
        <div className="form-header">
          <h3 className="card-title">Resume Editor</h3>
          <div className="form-actions">
            {!isEditing ? (
              <button 
                className="btn btn-primary"
                onClick={() => setIsEditing(true)}
              >
                <Edit3 size={16} />
                Edit
              </button>
            ) : (
              <div className="edit-actions">
                <button 
                  className="btn btn-success"
                  onClick={handleSave}
                >
                  <Save size={16} />
                  Save
                </button>
                <button 
                  className="btn btn-secondary"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
        <p className="card-subtitle">
          Manually edit your resume information
        </p>
      </div>

      {isEditing ? (
        <div className="resume-form">
          {/* Contact Information */}
          <div className="form-section">
            <h4 className="section-title">Contact Information</h4>
            <div className="grid grid-2">
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.contact.name}
                  onChange={(e) => handleInputChange('contact', 'name', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-input"
                  value={formData.contact.email}
                  onChange={(e) => handleInputChange('contact', 'email', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Phone</label>
                <input
                  type="tel"
                  className="form-input"
                  value={formData.contact.phone}
                  onChange={(e) => handleInputChange('contact', 'phone', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.contact.address}
                  onChange={(e) => handleInputChange('contact', 'address', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">LinkedIn</label>
                <input
                  type="url"
                  className="form-input"
                  value={formData.contact.linkedin}
                  onChange={(e) => handleInputChange('contact', 'linkedin', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="form-section">
            <h4 className="section-title">Professional Summary</h4>
            <div className="form-group">
              <textarea
                className="form-textarea"
                value={formData.summary}
                onChange={(e) => setFormData(prev => ({ ...prev, summary: e.target.value }))}
                placeholder="Write a summary of your professional profile..."
                rows={4}
              />
            </div>
          </div>

          {/* Experience */}
          <div className="form-section">
            <div className="section-header">
              <h4 className="section-title">Work Experience</h4>
              <button 
                className="btn btn-primary"
                onClick={() => addArrayItem('experience', { title: '', company: '', dates: '', description: '' })}
              >
                <Plus size={16} />
                Add Experience
              </button>
            </div>
            {formData.experience.map((exp, index) => (
              <div key={index} className="form-item">
                <div className="form-item-header">
                  <h5>Experience {index + 1}</h5>
                  <button 
                    className="btn btn-danger"
                    onClick={() => removeArrayItem('experience', index)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="grid grid-2">
                  <div className="form-group">
                    <label className="form-label">Position</label>
                    <input
                      type="text"
                      className="form-input"
                      value={exp.title}
                      onChange={(e) => handleArrayInputChange('experience', index, 'title', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Company</label>
                    <input
                      type="text"
                      className="form-input"
                      value={exp.company}
                      onChange={(e) => handleArrayInputChange('experience', index, 'company', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Dates</label>
                    <input
                      type="text"
                      className="form-input"
                      value={exp.dates}
                      onChange={(e) => handleArrayInputChange('experience', index, 'dates', e.target.value)}
                      placeholder="Ex: 2020 - 2023"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-textarea"
                    value={exp.description}
                    onChange={(e) => handleArrayInputChange('experience', index, 'description', e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Education */}
          <div className="form-section">
            <div className="section-header">
              <h4 className="section-title">Education</h4>
              <button 
                className="btn btn-primary"
                onClick={() => addArrayItem('education', { degree: '', institution: '', dates: '' })}
              >
                <Plus size={16} />
                Add Education
              </button>
            </div>
            {formData.education.map((edu, index) => (
              <div key={index} className="form-item">
                <div className="form-item-header">
                  <h5>Education {index + 1}</h5>
                  <button 
                    className="btn btn-danger"
                    onClick={() => removeArrayItem('education', index)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="grid grid-2">
                  <div className="form-group">
                    <label className="form-label">Degree</label>
                    <input
                      type="text"
                      className="form-input"
                      value={edu.degree}
                      onChange={(e) => handleArrayInputChange('education', index, 'degree', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Institution</label>
                    <input
                      type="text"
                      className="form-input"
                      value={edu.institution}
                      onChange={(e) => handleArrayInputChange('education', index, 'institution', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Dates</label>
                    <input
                      type="text"
                      className="form-input"
                      value={edu.dates}
                      onChange={(e) => handleArrayInputChange('education', index, 'dates', e.target.value)}
                      placeholder="Ex: 2016 - 2020"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Skills */}
          <div className="form-section">
            <h4 className="section-title">Skills</h4>
            <div className="form-group">
              <label className="form-label">Skills (separated by commas)</label>
              <input
                type="text"
                className="form-input"
                value={formData.skills.join(', ')}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  skills: e.target.value.split(',').map(skill => skill.trim()).filter(skill => skill)
                }))}
                placeholder="JavaScript, React, Node.js, Python..."
              />
            </div>
          </div>

          {/* Languages */}
          <div className="form-section">
            <h4 className="section-title">Languages</h4>
            <div className="form-group">
              <label className="form-label">Languages (separated by commas)</label>
              <input
                type="text"
                className="form-input"
                value={formData.languages.join(', ')}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  languages: e.target.value.split(',').map(lang => lang.trim()).filter(lang => lang)
                }))}
                placeholder="Spanish (Native), English (Advanced)..."
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="form-preview">
          <p>Click "Edit" to manually modify your resume information.</p>
        </div>
      )}
    </div>
  );
};

export default ResumeForm;
