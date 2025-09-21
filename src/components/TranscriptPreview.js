import React from 'react';
import { MessageSquare, Languages } from 'lucide-react';

const TranscriptPreview = ({ transcript, translation, isProcessing }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Transcript Preview</h3>
        <p className="card-subtitle">Original text and real-time translation</p>
      </div>

      <div className="transcript-content">
        {transcript ? (
          <>
            <div className="transcript-section">
              <div className="transcript-label">
                <MessageSquare size={16} />
                <span>Original Text (Spanish)</span>
              </div>
              <div className="transcript-text original">
                {transcript}
              </div>
            </div>

            {translation && (
              <div className="transcript-section">
                <div className="transcript-label">
                  <Languages size={16} />
                  <span>Translation (English)</span>
                </div>
                <div className="transcript-text translation">
                  {translation}
                </div>
              </div>
            )}

            {isProcessing && (
              <div className="processing-indicator">
                <div className="loading-spinner"></div>
                <span>Processing and translating...</span>
              </div>
            )}
          </>
        ) : (
          <div className="empty-transcript">
            <MessageSquare size={48} className="empty-icon" />
            <h4>No transcript</h4>
            <p>Speak or write to see the transcript here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TranscriptPreview;
