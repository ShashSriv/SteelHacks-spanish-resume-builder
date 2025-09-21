import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import VoiceInput from './components/VoiceInput';
import TextInput from './components/TextInput';
import TranscriptPreview from './components/TranscriptPreview';
import ResumePreview from './components/ResumePreview';
import ResumeForm from './components/ResumeForm';
import { processVoiceWithVAPI, processTextWithVAPI, generateLaTeXResume, latexToPDF } from './utils/vapiIntegration';
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
      const latexContent = await generateLaTeXResume(resumeData);
      const pdfBlob = await latexToPDF(latexContent);
      
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

  const startSession = () => {
    setSessionActive(true);
    setCurrentStep('contact');
    setTranscript('');
    setTranslation('');
  };

  const endSession = () => {
    setSessionActive(false);
  };

  return (
    <div className="App">
      <Header onDownloadPDF={handleDownloadPDF} />
      
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

              {!sessionActive ? (
                <div className="session-controls">
                  <button 
                    className="btn btn-primary"
                    onClick={startSession}
                  >
                    Start Session
                  </button>
                </div>
              ) : (
                <>
                  <VoiceInput 
                    onVoiceInput={handleVoiceInput}
                    isProcessing={isProcessing}
                    currentStep={currentStep}
                  />
                  
                  <div className="divider">
                    <span>o</span>
                  </div>
                  
                  <TextInput 
                    onTextInput={handleTextInput}
                    isProcessing={isProcessing}
                    currentStep={currentStep}
                  />
                  
                  <button 
                    className="btn btn-secondary"
                    onClick={endSession}
                    style={{ marginTop: '16px' }}
                  >
                    End Session
                  </button>
                </>
              )}
            </div>

            <TranscriptPreview 
              transcript={transcript}
              translation={translation}
              isProcessing={isProcessing}
            />
          </div>

          {/* Preview Section */}
          <div className="preview-section">
            <ResumePreview 
              resumeData={resumeData}
              currentStep={currentStep}
              onDownloadPDF={handleDownloadPDF}
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

export default App;
