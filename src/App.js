import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import VoiceInput from './components/VoiceInput';
import ResumePreview from './components/ResumePreview';
import ResumeForm from './components/ResumeForm';
import { processVoiceWithVAPI, processTextWithVAPI, generateHTMLResume, htmlToPDF } from './utils/vapiIntegration';
import { Mic } from 'lucide-react';
import './App.css';

function App() {
  const [resumeData, setResumeData] = useState({
    contact: {
      name: '',
      email: '',
      phone: '',
      address: '',
      linkedin: ''
    },
    experience: [],
    education: [],
    skills: [],
    languages: [],
    summary: ''
  });
  
  const [transcript, setTranscript] = useState('');
  const [translation, setTranslation] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState('contact'); // contact, experience, education, skills, summary
  const [sessionActive, setSessionActive] = useState(false);
  const [showTemplate, setShowTemplate] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  // Handle voice input processing
  const handleVoiceInput = async (transcriptText) => {
    setTranscript(transcriptText);
    setIsProcessing(true);
    
    try {
      const response = await processTextWithVAPI(transcriptText, currentStep, resumeData);
      
      if (response.translation) {
        setTranslation(response.translation);
      }
      
      if (response.updatedData) {
        setResumeData(response.updatedData);
      }
      
      if (response.nextStep) {
        setCurrentStep(response.nextStep);
      }
    } catch (error) {
      console.error('Error processing voice input:', error);
      alert('Error processing voice input. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle text input processing
  const handleTextInput = async (text) => {
    setTranscript(text);
    setIsProcessing(true);
    
    try {
      const response = await processTextWithVAPI(text, currentStep, resumeData);
      
      if (response.translation) {
        setTranslation(response.translation);
      }
      
      if (response.updatedData) {
        setResumeData(response.updatedData);
      }
      
      if (response.nextStep) {
        setCurrentStep(response.nextStep);
      }
    } catch (error) {
      console.error('Error processing text input:', error);
      alert('Error processing text. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle PDF download
  const handleDownloadPDF = async () => {
    try {
      setIsProcessing(true);
      const htmlContent = await generateHTMLResume(resumeData);
      const pdfBlob = await htmlToPDF(htmlContent);
      
      // Create download link
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `CV_${resumeData.contact.name || 'Resume'}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      alert('PDF generated successfully');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const toggleRecording = () => {
    if (!sessionActive) {
      // Start session and begin recording
      setSessionActive(true);
      setCurrentStep('contact');
      setTranscript('');
      setTranslation('');
      setShowTemplate(false);
      setIsRecording(true);
    } else {
      // Toggle recording state
      setIsRecording(!isRecording);
    }
  };

  const endSession = () => {
    setSessionActive(false);
    setIsRecording(false);
  };

  return (
    <div className="App">
      <Header />
      
      <main className="container">
        <div className="hero-section">
          <h1>Spanish Resume Builder</h1>
          <p>Speak or type in Spanish to create your professional resume</p>
        </div>

        <div className="grid grid-2">
          {/* Input Section */}
          <div className="input-section">
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Information Input</h2>
                <p className="card-subtitle">
                  {sessionActive 
                    ? `Current step: ${getStepTitle(currentStep)}`
                    : 'Start a session to begin'
                  }
                </p>
              </div>

              <div className="session-controls">
                <div className="mic-button-container">
                  <button 
                    className={`mic-button ${isRecording ? 'recording' : ''}`}
                    onClick={toggleRecording}
                  >
                    <Mic className="mic-icon" />
                  </button>
                  <div className="mic-labels">
                    <p className="mic-label-en">
                      {!sessionActive ? 'Press to Start' : (isRecording ? 'Recording...' : 'Press to Record')}
                    </p>
                    <p className="mic-label-es">
                      {!sessionActive ? 'Presiona para Empezar' : (isRecording ? 'Grabando...' : 'Presiona para Grabar')}
                    </p>
                  </div>
                  
                  {sessionActive && (
                    <div className="recording-instructions">
                      <p className="instruction-text">
                        {getStepInstruction(currentStep)}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {sessionActive && (
                <VoiceInput 
                  onVoiceInput={handleVoiceInput}
                  isProcessing={isProcessing}
                  currentStep={currentStep}
                  onRecordingChange={setIsRecording}
                  isRecording={isRecording}
                />
              )}
            </div>

          </div>

          {/* Preview Section */}
          <div className="preview-section">
            <ResumePreview 
              resumeData={resumeData}
              currentStep={currentStep}
              onDownloadPDF={handleDownloadPDF}
              showTemplate={showTemplate}
              onHideTemplate={() => setShowTemplate(false)}
            />
          </div>
        </div>

        {/* Resume Form for Manual Editing */}
        <ResumeForm 
          resumeData={resumeData}
          setResumeData={setResumeData}
        />
      </main>
    </div>
  );
}

// Helper function to get step titles in English
const getStepTitle = (step) => {
  const titles = {
    contact: 'Contact Information',
    experience: 'Work Experience',
    education: 'Education',
    skills: 'Skills',
    summary: 'Professional Summary'
  };
  return titles[step] || step;
};

// Helper function to get Spanish instructions for each step
const getStepInstruction = (step) => {
  const instructions = {
    contact: 'Di tu nombre completo, correo electrónico, teléfono y dirección. Ejemplo: "Mi nombre es María González, mi correo es maria@email.com, mi teléfono es 555-1234 y vivo en Madrid, España."',
    experience: 'Describe tu experiencia laboral más reciente. Incluye el puesto, empresa, fechas y responsabilidades. Ejemplo: "Trabajé como desarrolladora de software en TechCorp desde 2020 hasta 2023, desarrollando aplicaciones web con React y Node.js."',
    education: 'Menciona tu educación y formación. Incluye títulos, instituciones y fechas. Ejemplo: "Soy licenciada en Ciencias de la Computación de la Universidad Politécnica de Madrid, graduada en 2020."',
    skills: 'Lista tus habilidades principales. Ejemplo: "Tengo experiencia en JavaScript, React, Node.js, Python, bases de datos SQL, Git y metodologías ágiles."',
    summary: 'Proporciona un resumen profesional de 2-3 oraciones sobre tu perfil. Ejemplo: "Soy una desarrolladora de software apasionada con 5 años de experiencia en desarrollo web full-stack, especializada en tecnologías modernas y metodologías ágiles."'
  };
  return instructions[step] || 'Habla sobre tu información profesional';
};

export default App;
