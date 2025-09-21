// Simple VAPI Integration for Spanish Resume Builder
// This file uses @vapi-ai/web SDK for basic voice recording

import  Vapi  from '@vapi-ai/web';

// =============================================================================
// VAPI CONFIGURATION
// =============================================================================
// Single configuration object - replace with your actual values
const VAPI_CONFIG = {
  API_KEY: "4567fa6a-0035-4262-9fd9-81b3afb4bb34",
  ASSISTANT_ID: "72e746cd-4a01-472e-a086-4cec4bad8f6f",
};

// Initialize VAPI client
let vapiClient = null;

// =============================================================================
// SIMPLE VAPI FUNCTIONS
// =============================================================================

/**
 * Start VAPI call
 * @returns {Promise<Object>} - Call information
 */
export const startVAPICall = async () => {
  try {
    console.log('Starting voice session...');
    
    if (!vapiClient) {
      vapiClient = new Vapi("4567fa6a-0035-4262-9fd9-81b3afb4bb34");
    }
    
    const callConfig = {
      assistant: {
        assistantId: "72e746cd-4a01-472e-a086-4cec4bad8f6f"
      }
    };
    
    const call = await vapiClient.start("72e746cd-4a01-472e-a086-4cec4bad8f6f");
    
    return {
      callId: call.id,
      status: 'active'
    };
    
  } catch (error) {
    console.error('Error starting voice session:', error);
    throw new Error('Failed to start voice session');
  }
};

/**
 * Stop VAPI call
 * @returns {Promise<Object>} - Stop confirmation
 */
export const stopVAPICall = async () => {
  try {
    console.log('Stopping voice session...');
    
    if (vapiClient) {
      await vapiClient.stop();
      return { status: 'stopped' };
    } else {
      throw new Error('No active call to stop');
    }
    
  } catch (error) {
    console.error('Error stopping voice session:', error);
    throw new Error('Failed to stop voice session');
  }
};

/**
 * Check if VAPI call is active
 * @returns {boolean} - Whether call is active
 */
export const isVAPICallActive = () => {
  return vapiClient && vapiClient.isActive();
};

// Data processing is handled separately by your backend
// This file only handles VAPI start/stop calls


// =============================================================================
// PDF GENERATION (Keep existing functionality)
// =============================================================================

/**
 * Generate HTML resume from structured data
 * @param {Object} resumeData - Structured resume data
 * @returns {Promise<string>} - HTML formatted resume
 */
export const generateHTMLResume = async (resumeData) => {
  const htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resume - ${resumeData.contact.name || 'Resume'}</title>
    <style>
        /* Resume Preview Styling - Consistent with App.css */
        body {
            margin: 0;
            padding: 0;
            background: white;
            font-family: 'Times New Roman', serif;
            line-height: 1.6;
            color: #374151;
        }
        
        .resume-preview-container {
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            overflow: hidden;
            min-height: 400px;
            max-width: 800px;
            margin: 0 auto;
        }
        
        .resume-preview-content {
            padding: 24px;
            font-family: 'Times New Roman', serif;
            line-height: 1.6;
            color: #374151;
        }
        
        .resume-name {
            font-size: 28px;
            font-weight: bold;
            color: #1f2937;
            margin-bottom: 8px;
            text-align: center;
        }
        
        .resume-contact {
            text-align: center;
            color: #6b7280;
            margin-bottom: 24px;
            font-size: 14px;
        }
        
        .resume-section {
            margin-bottom: 24px;
        }
        
        .resume-section-title {
            font-size: 18px;
            font-weight: bold;
            color: #1f2937;
            border-bottom: 2px solid #3b82f6;
            padding-bottom: 4px;
            margin-bottom: 12px;
        }
        
        .resume-item {
            margin-bottom: 16px;
        }
        
        .resume-item-title {
            font-weight: bold;
            color: #1f2937;
            margin-bottom: 4px;
        }
        
        .resume-item-company {
            color: #6b7280;
            font-style: italic;
            margin-bottom: 4px;
        }
        
        .resume-item-dates {
            color: #6b7280;
            font-size: 14px;
            margin-bottom: 8px;
        }
        
        .resume-item-description {
            color: #374151;
            font-size: 14px;
        }
        
        .resume-skills {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }
        
        .resume-skill {
            background-color: #f3f4f6;
            color: #374151;
            padding: 4px 12px;
            border-radius: 16px;
            font-size: 14px;
            font-weight: 500;
        }
        
        /* PDF-specific adjustments */
        @media print {
            .resume-preview-container {
                box-shadow: none;
                border-radius: 0;
                max-width: none;
                margin: 0;
            }
            
            .resume-preview-content {
                padding: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="resume-preview-container">
        <div class="resume-preview-content">
            <!-- Contact Information -->
            ${resumeData.contact.name ? `
            <div class="resume-section">
                <div class="resume-name">${resumeData.contact.name}</div>
                <div class="resume-contact">
                    ${resumeData.contact.email ? `<span>${resumeData.contact.email}</span>` : ''}
                    ${resumeData.contact.phone ? `<span> • ${resumeData.contact.phone}</span>` : ''}
                    ${resumeData.contact.address ? `<span> • ${resumeData.contact.address}</span>` : ''}
                    ${resumeData.contact.linkedin ? `<span> • ${resumeData.contact.linkedin}</span>` : ''}
                </div>
            </div>
            ` : ''}

            <!-- Professional Summary -->
            ${resumeData.summary ? `
            <div class="resume-section">
                <div class="resume-section-title">Professional Summary</div>
                <div class="resume-item-description">${resumeData.summary}</div>
            </div>
            ` : ''}

            <!-- Work Experience -->
            ${resumeData.experience.length > 0 ? `
            <div class="resume-section">
                <div class="resume-section-title">Work Experience</div>
                ${resumeData.experience.map(exp => `
                <div class="resume-item">
                    <div class="resume-item-title">${exp.title || 'Position'}</div>
                    <div class="resume-item-company">${exp.company || 'Company'}</div>
                    <div class="resume-item-dates">${exp.dates || 'Dates'}</div>
                    <div class="resume-item-description">${exp.description || ''}</div>
                </div>
                `).join('')}
            </div>
            ` : ''}

            <!-- Education -->
            ${resumeData.education.length > 0 ? `
            <div class="resume-section">
                <div class="resume-section-title">Education</div>
                ${resumeData.education.map(edu => `
                <div class="resume-item">
                    <div class="resume-item-title">${edu.degree || 'Degree'}</div>
                    <div class="resume-item-company">${edu.institution || 'Institution'}</div>
                    <div class="resume-item-dates">${edu.dates || 'Dates'}</div>
                </div>
                `).join('')}
            </div>
            ` : ''}

            <!-- Skills -->
            ${resumeData.skills.length > 0 ? `
            <div class="resume-section">
                <div class="resume-section-title">Skills</div>
                <div class="resume-skills">
                    ${resumeData.skills.map(skill => `<span class="resume-skill">${skill}</span>`).join('')}
                </div>
            </div>
            ` : ''}

            <!-- Languages -->
            ${resumeData.languages.length > 0 ? `
            <div class="resume-section">
                <div class="resume-section-title">Languages</div>
                <div class="resume-skills">
                    ${resumeData.languages.map(lang => `<span class="resume-skill">${lang}</span>`).join('')}
                </div>
            </div>
            ` : ''}
        </div>
    </div>
</body>
</html>`;

  return htmlTemplate;
};

/**
 * Convert HTML to PDF using jsPDF and html2canvas
 * @param {string} htmlContent - HTML content
 * @returns {Promise<Blob>} - PDF blob
 */
export const htmlToPDF = async (htmlContent) => {
  // Import required libraries dynamically
  const { jsPDF } = await import('jspdf');
  const html2canvas = (await import('html2canvas')).default;
  
  // Create a temporary container for the HTML
  const tempContainer = document.createElement('div');
  tempContainer.innerHTML = htmlContent;
  tempContainer.style.position = 'absolute';
  tempContainer.style.left = '-9999px';
  tempContainer.style.top = '0';
  tempContainer.style.width = '800px';
  tempContainer.style.backgroundColor = 'white';
  document.body.appendChild(tempContainer);
  
  try {
    // Convert HTML to canvas
    const canvas = await html2canvas(tempContainer, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff'
    });
    
    // Create PDF from canvas
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 295; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    
    let position = 0;
    
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
    
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    
    return pdf.output('blob');
  } finally {
    // Clean up temporary container
    document.body.removeChild(tempContainer);
  }
};

// =============================================================================
// EXPORTS
// =============================================================================
export default {
  startVAPICall,
  stopVAPICall,
  isVAPICallActive,
  generateHTMLResume,
  htmlToPDF
};