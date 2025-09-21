import React, { useState, useEffect } from 'react';
import { Mic, Square } from 'lucide-react';
import  Vapi  from '@vapi-ai/web';
const vapi = new Vapi("4567fa6a-0035-4262-9fd9-81b3afb4bb34");

const VoiceInput = ({ onVoiceInput, isProcessing }) => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [callTime, setCallTime] = useState(0);

  const handleButtonClick = async () => {
    if (!isCallActive) {
      // Start recording
      try {
        console.log('Starting voice session...');
        await vapi.start("72e746cd-4a01-472e-a086-4cec4bad8f6f");
        setIsCallActive(true);
        setCallTime(0);
        console.log('Voice session started');
      } catch (error) {
        console.error('Error starting voice session:', error);
        alert('Could not start voice session. Please check your configuration.');
      }
    } else {
      // Stop recording
      try {
        console.log('Stopping voice session...');
        vapi.stop();
        setIsCallActive(false);
        console.log('Voice session stopped');
        
        // VAPI will handle processing and send data to backend
        // Backend will send processed data back to frontend
        // Data processing is handled separately
      } catch (error) {
        console.error('Error stopping voice session:', error);
        setIsCallActive(false);
      }
    }
  };

  // Timer for recording duration
  useEffect(() => {
    let interval = null;
    if (isCallActive) {
      interval = setInterval(() => {
        setCallTime(time => time + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCallActive]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (isCallActive) {
        stopVAPICall();
      }
    };
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="voice-input">
      <div className="voice-prompt">
        <h3>Voice Input</h3>
        <p className="prompt-text">Our assistant will ask you questions in Spanish</p>
      </div>

      <div className="voice-controls">
        <button
          className={`btn ${isCallActive ? 'btn-danger' : 'btn-primary'}`}
          onClick={handleButtonClick}
          disabled={isProcessing}
        >
          {isCallActive ? <Square size={20} /> : <Mic size={20} />}
          {isProcessing ? 'Processing...' : (isCallActive ? 'Stop Recording' : 'Start Recording')}
        </button>
        
        {isCallActive && (
          <div className="recording-timer">
            <div className="recording-indicator"></div>
            <span>{formatTime(callTime)}</span>
          </div>
        )}
      </div>

      {isCallActive && (
        <div className="recording-status">
          <div className="recording-indicator"></div>
          <span>Recording - Speak naturally in Spanish</span>
        </div>
      )}
    </div>
  );
};

export default VoiceInput;
