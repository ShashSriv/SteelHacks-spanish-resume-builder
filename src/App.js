import React, { useState } from 'react';
import Header from './components/Header';
import VoiceInput from './components/VoiceInput';
import HowItWorksSection from './components/HowItWorksSection';
import AboutSection from './components/AboutSection';
import ApplySection from './components/ApplySection';
import { generateHTMLResume, htmlToPDF } from './utils/vapiIntegration';
import './App.css';
import ResPrev from './components/ResPrev'

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
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState('contact'); // contact, experience, education, skills, summary
  const [sessionActive, setSessionActive] = useState(false);

  // Handle voice input processing - receives processed data from VAPI backend
  const handleVoiceInput = async (processedData) => {
    setIsProcessing(true);
    
    try {
      console.log('Received processed data from VAPI backend:', processedData);
      
      // VAPI backend has already processed the audio and sent structured data
      if (processedData) {
        // Update resume data with structured information from VAPI
        setResumeData(prevData => ({
          ...prevData,
          ...processedData
        }));
      }
      
      // Move to next step if specified
      if (processedData?.nextStep) {
        setCurrentStep(processedData.nextStep);
      }
      
      console.log('Resume data updated with VAPI processed data');
    } catch (error) {
      console.error('Error handling processed data from VAPI:', error);
      alert('Error processing voice input. Please try again.');
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

  const startSession = () => {
    setSessionActive(true);
    setCurrentStep('contact');
  };

  const endSession = () => {
    setSessionActive(false);
  };

  const resetBackendResume = async () => {
  try {
    const res = await fetch('http://localhost:8000/reset', { method: 'POST' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    alert('Backend resume reset.');
  } catch (e) {
    alert(e?.message || 'Reset failed');
  }
};

  return (
    <div className="App">
      <Header />
      
      <main className="container">
        <div className="hero-section">
          <h1>LinguaCV</h1>
          <p>Speak in Spanish to create your professional CV</p>
        </div>

        {/* Voice Input Section - Full Width */}
        <div className="voice-input-section">
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Voice Input</h2>
              <p className="card-subtitle">
                {sessionActive 
                  ? 'Our assistant will guide you through the process - Just speak when asked'
                  : 'Start a session to begin building your resume with voice'
                }
              </p>
            </div>

            {!sessionActive ? (
              <div className="session-controls">
                <button 
                  className="btn btn-primary"
                  onClick={startSession}
                >
                  Start Voice Session
                </button>
              </div>
            ) : (
              <>
                <VoiceInput 
                  onVoiceInput={handleVoiceInput}
                  isProcessing={isProcessing}
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
        </div>

        {/* Live Preview from Backend - Directly Under Voice Input */}

        <div className="live-preview-section">
          <button className="btn btn-secondary" onClick={resetBackendResume} style={{ marginBottom: 12 }}>
            Reset Resume
          </button>
          <ResPrev/>
        </div>
      </main>

      {/* Additional Sections */}
      <HowItWorksSection />
      <AboutSection />
      <ApplySection />
    </div>
  );
}


export default App;
