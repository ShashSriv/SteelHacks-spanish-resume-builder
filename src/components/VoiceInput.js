import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Square } from 'lucide-react';

const VoiceInput = ({ onVoiceInput, isProcessing, currentStep, onRecordingChange, isRecording: parentIsRecording }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);

  // Sync with parent recording state
  useEffect(() => {
    if (parentIsRecording && !isRecording) {
      startRecording();
    } else if (!parentIsRecording && isRecording) {
      stopRecording();
    }
  }, [parentIsRecording]);

  const getStepPrompt = (step) => {
    const prompts = {
      contact: 'Tell me your contact information (name, email, phone)',
      experience: 'Describe your most recent work experience',
      education: 'Tell me about your education and training',
      skills: 'Mention your main skills',
      summary: 'Give me a summary of your professional profile'
    };
    return prompts[step] || 'Speak about your professional information';
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setAudioChunks(prev => [...prev, event.data]);
        }
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        processAudio(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      setMediaRecorder(recorder);
      recorder.start();
      setRecordingTime(0);
      setAudioChunks([]);
      if (onRecordingChange) onRecordingChange(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('No se pudo acceder al micrófono. Por favor, verifica los permisos.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
      if (onRecordingChange) onRecordingChange(false);
    }
  };

  const processAudio = async (audioBlob) => {
    // TODO: Integrate with VAPI for real speech-to-text processing
    // This function will send the audioBlob to VAPI for:
    // - Speech-to-text conversion
    // - Spanish language detection and processing
    // - Content extraction and structuring
    // - Translation to English if needed
    
    try {
      // Mock implementation - replace with actual VAPI call
      console.log('Processing audio with VAPI...', audioBlob);
      
      // Simulate VAPI processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock transcript for testing
      const mockTranscript = getMockTranscript(currentStep);
      onVoiceInput(mockTranscript);
      
    } catch (error) {
      console.error('VAPI processing error:', error);
      // Fallback to mock data for testing
      const mockTranscript = getMockTranscript(currentStep);
      onVoiceInput(mockTranscript);
    }
  };

  const getMockTranscript = (step) => {
    const mockTranscripts = {
      contact: 'Mi nombre es María González, mi correo es maria@example.com y mi teléfono es 555-1234',
      experience: 'Trabajé como desarrolladora de software en TechCorp durante 3 años, desarrollando aplicaciones web con React y Node.js',
      education: 'Soy licenciada en Ciencias de la Computación de la Universidad Nacional, graduada en 2020',
      skills: 'Tengo experiencia en JavaScript, React, Node.js, Python, y bases de datos SQL',
      summary: 'Soy una desarrolladora de software apasionada con 5 años de experiencia en desarrollo web full-stack'
    };
    return mockTranscripts[step] || 'This is a sample transcript';
  };

  useEffect(() => {
    let interval = null;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(time => time + 1);
      }, 1000);
    } else if (!isRecording && recordingTime !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRecording, recordingTime]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="voice-input">
      <div className="voice-prompt">
        <h3>Voice Input</h3>
        <p className="prompt-text">{getStepPrompt(currentStep)}</p>
      </div>

      <div className="voice-controls">
        {!isRecording ? (
          <button
            className={`btn ${isProcessing ? 'btn-secondary' : 'btn-primary'}`}
            onClick={startRecording}
            disabled={isProcessing}
          >
            <Mic size={20} />
            {isProcessing ? 'Processing...' : 'Start Recording'}
          </button>
        ) : (
          <div className="recording-controls">
            <button
              className="btn btn-danger"
              onClick={stopRecording}
            >
              <Square size={20} />
              Stop Recording
            </button>
            <div className="recording-timer">
              <div className="recording-indicator"></div>
              <span>{formatTime(recordingTime)}</span>
            </div>
          </div>
        )}
      </div>

      {isProcessing && (
        <div className="processing-status">
          <div className="loading-spinner"></div>
          <span>Processing audio and translating...</span>
        </div>
      )}
    </div>
  );
};

export default VoiceInput;
