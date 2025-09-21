// VAPI Integration utilities for LinguaCV
// This file contains mock implementations that would be replaced with actual VAPI calls

const VAPI_CONFIG = {
  // These would be actual VAPI configuration values
  API_KEY: process.env.REACT_APP_VAPI_API_KEY || 'your-vapi-api-key',
  BASE_URL: 'https://api.vapi.ai',
  MODEL: 'gpt-4',
  LANGUAGE: 'es', // Spanish
  TARGET_LANGUAGE: 'en' // English for translation
};

/**
 * Process voice input through VAPI for speech-to-text and translation
 * @param {Blob} audioBlob - Audio recording as Blob
 * @param {string} currentStep - Current resume step (contact, experience, etc.)
 * @param {Object} currentData - Current resume data
 * @returns {Promise<Object>} - Processed result with transcript, translation, and updated data
 */
export const processVoiceWithVAPI = async (audioBlob, currentStep, currentData) => {
  try {
    // Step 1: Convert audio to text using VAPI speech-to-text
    const transcript = await speechToText(audioBlob);
    
    // Step 2: Translate Spanish to English
    const translation = await translateText(transcript, 'es', 'en');
    
    // Step 3: Process the content and extract structured data
    const processedData = await processResumeContent(transcript, translation, currentStep, currentData);
    
    return {
      transcript,
      translation,
      updatedData: processedData.updatedData,
      nextStep: processedData.nextStep,
      confidence: processedData.confidence
    };
  } catch (error) {
    console.error('VAPI processing error:', error);
    throw new Error('Error processing audio. Please try again.');
  }
};

/**
 * Process text input through VAPI for translation and content processing
 * @param {string} text - Input text in Spanish
 * @param {string} currentStep - Current resume step
 * @param {Object} currentData - Current resume data
 * @returns {Promise<Object>} - Processed result
 */
export const processTextWithVAPI = async (text, currentStep, currentData) => {
  try {
    // Step 1: Translate Spanish to English
    const translation = await translateText(text, 'es', 'en');
    
    // Step 2: Process the content and extract structured data
    const processedData = await processResumeContent(text, translation, currentStep, currentData);
    
    return {
      transcript: text,
      translation,
      updatedData: processedData.updatedData,
      nextStep: processedData.nextStep,
      confidence: processedData.confidence
    };
  } catch (error) {
    console.error('VAPI text processing error:', error);
    throw new Error('Error processing text. Please try again.');
  }
};

/**
 * Convert audio blob to text using VAPI speech-to-text
 * @param {Blob} audioBlob - Audio recording
 * @returns {Promise<string>} - Transcribed text
 */
const speechToText = async (audioBlob) => {
  // Mock implementation - replace with actual VAPI call
  const formData = new FormData();
  formData.append('audio', audioBlob, 'recording.wav');
  formData.append('language', VAPI_CONFIG.LANGUAGE);
  
  // This would be the actual VAPI API call:
  /*
  const response = await fetch(`${VAPI_CONFIG.BASE_URL}/speech-to-text`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${VAPI_CONFIG.API_KEY}`,
      'Content-Type': 'multipart/form-data'
    },
    body: formData
  });
  
  const result = await response.json();
  return result.transcript;
  */
  
  // Mock response for development
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockTranscripts = {
        contact: 'Mi nombre es María González, mi correo es maria@example.com y mi teléfono es 555-1234',
        experience: 'Trabajé como desarrolladora de software en TechCorp durante 3 años, desarrollando aplicaciones web con React y Node.js',
        education: 'Soy licenciada en Ciencias de la Computación de la Universidad Nacional, graduada en 2020',
        skills: 'Tengo experiencia en JavaScript, React, Node.js, Python, y bases de datos SQL',
        summary: 'Soy una desarrolladora de software apasionada con 5 años de experiencia en desarrollo web full-stack'
      };
      resolve(mockTranscripts.contact || 'This is a sample transcript');
    }, 2000);
  });
};

/**
 * Translate text using VAPI translation service
 * @param {string} text - Text to translate
 * @param {string} fromLang - Source language code
 * @param {string} toLang - Target language code
 * @returns {Promise<string>} - Translated text
 */
const translateText = async (text, fromLang, toLang) => {
  // Mock implementation - replace with actual VAPI call
  /*
  const response = await fetch(`${VAPI_CONFIG.BASE_URL}/translate`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${VAPI_CONFIG.API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text,
      from: fromLang,
      to: toLang,
      model: VAPI_CONFIG.MODEL
    })
  });
  
  const result = await response.json();
  return result.translation;
  */
  
  // Mock translation for development
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Translated: ${text}`);
    }, 1000);
  });
};

/**
 * Process resume content and extract structured data
 * @param {string} originalText - Original Spanish text
 * @param {string} translatedText - English translation
 * @param {string} currentStep - Current resume step
 * @param {Object} currentData - Current resume data
 * @returns {Promise<Object>} - Processed data with updates
 */
const processResumeContent = async (originalText, translatedText, currentStep, currentData) => {
  // Mock implementation - replace with actual VAPI content processing
  /*
  const response = await fetch(`${VAPI_CONFIG.BASE_URL}/process-resume`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${VAPI_CONFIG.API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text: originalText,
      translation: translatedText,
      currentStep,
      currentData,
      language: VAPI_CONFIG.LANGUAGE
    })
  });
  
  const result = await response.json();
  return result;
  */
  
  // Mock processing for development
  return new Promise((resolve) => {
    setTimeout(() => {
      const updatedData = { ...currentData };
      let nextStep = currentStep;
      
      // Mock data extraction based on current step
      if (currentStep === 'contact') {
        const nameMatch = originalText.match(/nombre es ([^,]+)/i);
        const emailMatch = originalText.match(/correo es ([^\s]+)/i);
        const phoneMatch = originalText.match(/teléfono es ([^\s]+)/i);
        
        if (nameMatch) updatedData.contact.name = nameMatch[1].trim();
        if (emailMatch) updatedData.contact.email = emailMatch[1].trim();
        if (phoneMatch) updatedData.contact.phone = phoneMatch[1].trim();
        
        if (nameMatch || emailMatch) {
          nextStep = 'experience';
        }
      } else if (currentStep === 'experience') {
        // Mock experience extraction
        const experience = {
          title: 'Desarrolladora de Software',
          company: 'TechCorp',
          dates: '2020 - 2023',
          description: 'Desarrollé aplicaciones web utilizando React y Node.js'
        };
        updatedData.experience.push(experience);
        nextStep = 'education';
      } else if (currentStep === 'education') {
        // Mock education extraction
        const education = {
          degree: 'Licenciatura en Ciencias de la Computación',
          institution: 'Universidad Nacional',
          dates: '2016 - 2020'
        };
        updatedData.education.push(education);
        nextStep = 'skills';
      } else if (currentStep === 'skills') {
        // Mock skills extraction
        const skills = ['JavaScript', 'React', 'Node.js', 'Python', 'SQL'];
        updatedData.skills = [...updatedData.skills, ...skills];
        nextStep = 'summary';
      } else if (currentStep === 'summary') {
        updatedData.summary = originalText;
        nextStep = 'complete';
      }
      
      resolve({
        updatedData,
        nextStep,
        confidence: 0.85
      });
    }, 1500);
  });
};

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
            font-family: 'Times New Roman', serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            color: #1f2937;
            background: white;
        }
        .resume-container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 24px;
        }
        .resume-name {
            font-size: 28px;
            font-weight: bold;
            color: #1f2937;
            text-align: center;
            margin-bottom: 8px;
        }
        .resume-contact {
            text-align: center;
            color: #6b7280;
            margin-bottom: 24px;
        }
        .resume-section {
            margin-bottom: 24px;
        }
        .resume-section-title {
            font-size: 18px;
            font-weight: bold;
            color: #1f2937;
            border-bottom: 1px solid #e5e7eb;
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
            border-radius: 4px;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="resume-container">
        <!-- Contact Information -->
        ${resumeData.contact.name ? `
        <div class="resume-section">
            <div class="resume-name">${resumeData.contact.name}</div>
            <div class="resume-contact">
                ${resumeData.contact.email ? `${resumeData.contact.email}` : ''}
                ${resumeData.contact.phone ? ` | ${resumeData.contact.phone}` : ''}
                ${resumeData.contact.address ? ` | ${resumeData.contact.address}` : ''}
                ${resumeData.contact.linkedin ? ` | ${resumeData.contact.linkedin}` : ''}
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
                <div class="resume-item-dates">${exp.dates || 'Dates'}</div>
                ${exp.description ? `
                <div class="resume-item-description">
                    <ul style="margin: 6px 0 0 18px; padding: 0;">
                        ${exp.description.split('\n').filter(line => line.trim()).map(line => 
                            `<li style="margin: 2px 0;">${line.trim()}</li>`
                        ).join('')}
                    </ul>
                </div>
                ` : ''}
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
                <div class="resume-item-title">${edu.institution || 'Institution'}</div>
                <div class="resume-item-company">${edu.degree || 'Degree'}</div>
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
  tempContainer.style.fontFamily = 'Times New Roman, serif';
  document.body.appendChild(tempContainer);
  
  try {
    // Convert HTML to canvas with high quality settings
    const canvas = await html2canvas(tempContainer, {
      scale: 3, // Higher scale for better quality
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      width: 800,
      height: tempContainer.scrollHeight,
      scrollX: 0,
      scrollY: 0
    });
    
    // Create PDF from canvas
    const imgData = canvas.toDataURL('image/png', 1.0); // Maximum quality
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
