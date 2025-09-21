// VAPI Integration utilities for LinguaCV
// This file contains mock implementations that would be replaced with actual VAPI calls

/**
 * Translate text using VAPI translation service
 * @param {string} text - Text to translate
 * @param {string} fromLang - Source language code
 * @param {string} toLang - Target language code
 * @returns {Promise<string>} - Translated text
 */

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
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 40px;
            color: #333;
            background: white;
        }
        .resume-container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
            padding: 40px;
        }
        .header {
            text-align: center;
            border-bottom: 3px solid #2c5aa0;
            padding-bottom: 25px;
            margin-bottom: 35px;
        }
        .name {
            font-size: 32px;
            font-weight: bold;
            color: #2c5aa0;
            margin-bottom: 15px;
            letter-spacing: 1px;
        }
        .contact-info {
            font-size: 16px;
            color: #666;
            line-height: 1.8;
        }
        .contact-info span {
            margin: 0 15px;
            display: inline-block;
        }
        .section {
            margin-bottom: 30px;
            page-break-inside: avoid;
        }
        .section-title {
            font-size: 20px;
            font-weight: bold;
            color: #2c5aa0;
            border-bottom: 2px solid #2c5aa0;
            padding-bottom: 8px;
            margin-bottom: 20px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .item {
            margin-bottom: 20px;
            padding-left: 20px;
            border-left: 3px solid #e8f4fd;
        }
        .item-title {
            font-weight: bold;
            font-size: 18px;
            margin-bottom: 8px;
            color: #2c5aa0;
        }
        .item-company {
            font-style: italic;
            color: #666;
            margin-bottom: 5px;
            font-size: 16px;
        }
        .item-dates {
            color: #888;
            font-size: 14px;
            margin-bottom: 12px;
            font-weight: 500;
        }
        .item-description {
            font-size: 15px;
            line-height: 1.7;
            text-align: justify;
            margin-top: 10px;
        }
        .skills-list {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            justify-content: center;
            margin-top: 15px;
        }
        .skill-tag {
            background: linear-gradient(135deg, #f0f0f0, #e0e0e0);
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 13px;
            color: #333;
            font-weight: 500;
            border: 1px solid #ddd;
        }
        .languages-list {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            justify-content: center;
            margin-top: 15px;
        }
        .language-tag {
            background: linear-gradient(135deg, #e8f4fd, #d1e7f7);
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 13px;
            color: #2c5aa0;
            font-weight: 500;
            border: 1px solid #b8d4f0;
        }
        .summary-section {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #2c5aa0;
            margin: 20px 0;
        }
        .summary-text {
            font-size: 16px;
            line-height: 1.7;
            text-align: justify;
            font-style: italic;
            color: #444;
        }
    </style>
</head>
<body>
    <div class="resume-container">
        <div class="header">
            <div class="name">${resumeData.contact.name || 'Your Name'}</div>
            <div class="contact-info">
                ${resumeData.contact.email ? `<span>${resumeData.contact.email}</span>` : ''}
                ${resumeData.contact.phone ? `<span>${resumeData.contact.phone}</span>` : ''}
                ${resumeData.contact.address ? `<span>${resumeData.contact.address}</span>` : ''}
                ${resumeData.contact.linkedin ? `<span>${resumeData.contact.linkedin}</span>` : ''}
            </div>
        </div>

        ${resumeData.summary ? `
        <div class="section">
            <div class="section-title">Professional Summary</div>
            <div class="summary-section">
                <div class="summary-text">${resumeData.summary}</div>
            </div>
        </div>
        ` : ''}

        ${resumeData.experience.length > 0 ? `
        <div class="section">
            <div class="section-title">Work Experience</div>
            ${resumeData.experience.map(exp => `
            <div class="item">
                <div class="item-title">${exp.title || 'Position'}</div>
                <div class="item-company">${exp.company || 'Company'}</div>
                <div class="item-dates">${exp.dates || 'Dates'}</div>
                <div class="item-description">${exp.description || ''}</div>
            </div>
            `).join('')}
        </div>
        ` : ''}

        ${resumeData.education.length > 0 ? `
        <div class="section">
            <div class="section-title">Education</div>
            ${resumeData.education.map(edu => `
            <div class="item">
                <div class="item-title">${edu.degree || 'Degree'}</div>
                <div class="item-company">${edu.institution || 'Institution'}</div>
                <div class="item-dates">${edu.dates || 'Dates'}</div>
            </div>
            `).join('')}
        </div>
        ` : ''}

        ${resumeData.skills.length > 0 ? `
        <div class="section">
            <div class="section-title">Skills</div>
            <div class="skills-list">
                ${resumeData.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
        </div>
        ` : ''}

        ${resumeData.languages.length > 0 ? `
        <div class="section">
            <div class="section-title">Languages</div>
            <div class="languages-list">
                ${resumeData.languages.map(lang => `<span class="language-tag">${lang}</span>`).join('')}
            </div>
        </div>
        ` : ''}
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

  tempContainer.querySelectorAll('*').forEach(el => {
    el.style.color = '#000';
    el.style.background = '#fff';
    el.style.border = 'none'; // optional: remove colored borders
  });
  
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

export default {
  processVoiceWithVAPI,
  processTextWithVAPI,
  generateHTMLResume,
  htmlToPDF
};
