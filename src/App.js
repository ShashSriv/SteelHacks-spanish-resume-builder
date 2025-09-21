import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import VoiceInput from './components/VoiceInput';
import HowItWorksSection from './components/HowItWorksSection';
import AboutSection from './components/AboutSection';
import ApplySection from './components/ApplySection';
import { processVoiceWithVAPI, processTextWithVAPI, generateHTMLResume, htmlToPDF } from './utils/vapiIntegration';
import './App.css';
import ResPrev from './components/ResPrev'

function App() {

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

        <div className="grid grid-2">
          {/* Input Section */}
          <div className="input-section">
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Information Input</h2>
                <p className="card-subtitle">
                  {sessionActive 
                    ? `Current step: ${getStepTitle(currentStep)} - Speak to add information`
                    : 'Start a session to begin building your CV with voice'
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

          {/* Preview Section */}
          <div className="preview-section">
            {/* Resume preview removed */}
          </div>
        </div>

        {/* Live Preview from Backend */}
        <div style={{ marginTop: '40px' }}>
          <h2>Live Backend CV Preview</h2>
          <button className="btn btn-secondary" onClick={resetBackendResume} style={{ marginBottom: 12 }}>
            Reset Backend CV
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
