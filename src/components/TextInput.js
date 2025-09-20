import React, { useState } from 'react';
import { Type, Send } from 'lucide-react';

const TextInput = ({ onTextInput, isProcessing, currentStep }) => {
  const [text, setText] = useState('');

  const getStepPrompt = (step) => {
    const prompts = {
      contact: 'Write your contact information (name, email, phone)',
      experience: 'Describe your most recent work experience',
      education: 'Tell me about your education and training',
      skills: 'Mention your main skills',
      summary: 'Give me a summary of your professional profile'
    };
    return prompts[step] || 'Write about your professional information';
  };

  const getPlaceholder = (step) => {
    const placeholders = {
      contact: 'Ex: Mi nombre es María González, mi correo es maria@example.com...',
      experience: 'Ex: Trabajé como desarrolladora en TechCorp durante 3 años...',
      education: 'Ex: Soy licenciada en Ciencias de la Computación...',
      skills: 'Ex: Tengo experiencia en JavaScript, React, Node.js...',
      summary: 'Ex: Soy una desarrolladora apasionada con 5 años de experiencia...'
    };
    return placeholders[step] || 'Write your information here...';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() && !isProcessing) {
      onTextInput(text.trim());
      setText('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSubmit(e);
    }
  };

  return (
    <div className="text-input">
      <div className="text-prompt">
        <h3>Text Input</h3>
        <p className="prompt-text">{getStepPrompt(currentStep)}</p>
      </div>

      <form onSubmit={handleSubmit} className="text-form">
        <div className="form-group">
          <textarea
            className="form-textarea"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={getPlaceholder(currentStep)}
            onKeyPress={handleKeyPress}
            disabled={isProcessing}
            rows={4}
          />
          <div className="text-hint">
            <small>Press Ctrl + Enter to send quickly</small>
          </div>
        </div>

        <button
          type="submit"
          className={`btn ${isProcessing ? 'btn-secondary' : 'btn-primary'}`}
          disabled={!text.trim() || isProcessing}
        >
          <Send size={20} />
          {isProcessing ? 'Processing...' : 'Send Text'}
        </button>
      </form>
    </div>
  );
};

export default TextInput;
