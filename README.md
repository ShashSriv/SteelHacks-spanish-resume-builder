# Spanish Resume Builder

A React.js front-end application that allows Spanish-speaking users to create professional resumes using voice or text input, with automatic translation and LaTeX PDF generation.

## Key Features

### ✅ Implemented Features

1. **Voice Input**
   - Microphone button to start recording
   - Real-time audio recording with visual indicator
   - Ready for VAPI (Voice AI Platform) integration

2. **Text Input**
   - Text field for manual Spanish input
   - Quick send support with Ctrl+Enter

3. **Transcript Preview**
   - Shows original Spanish text
   - Shows real-time English translation
   - Processing indicator

4. **Resume Preview**
   - Real-time resume preview
   - Progress bar showing current step
   - Clean professional format

5. **Manual Resume Editor**
   - Complete form for manual editing
   - Sections: Contact, Experience, Education, Skills, Languages
   - Intuitive English interface

6. **PDF Generation**
   - LaTeX generation from structured data
   - Direct PDF download
   - Professional one-page format

7. **English Interface**
   - Complete English localization
   - Professional and academic design
   - Responsive design for mobile

## Project Structure

```
src/
├── components/
│   ├── Header.js              # Header with logo and download button
│   ├── VoiceInput.js          # Voice input component
│   ├── TextInput.js           # Text input component
│   ├── TranscriptPreview.js   # Transcript preview
│   ├── ResumePreview.js       # Resume preview
│   └── ResumeForm.js          # Manual resume editor
├── utils/
│   └── vapiIntegration.js     # VAPI integration utilities
├── App.js                     # Main component
├── App.css                    # Main styles
├── index.js                   # Entry point
└── index.css                  # Global styles
```

## Installation and Setup

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd SteelHacks-spanish-resume-builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   # Create .env file in project root
   REACT_APP_VAPI_API_KEY=your_vapi_api_key
   ```

4. **Run the application**
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000`

## Application Usage

### Workflow

1. **Start Session**: Click "Start Session" to begin
2. **Contact Information**: Provide your name, email, and phone
3. **Work Experience**: Describe your professional experience
4. **Education**: Mention your academic background
5. **Skills**: List your technical competencies
6. **Professional Summary**: Write a summary of your profile
7. **Download PDF**: Generate and download your resume in PDF format

### Input Methods

#### Voice Input
- Click "Start Recording"
- Speak clearly in Spanish
- Click "Stop Recording" when finished
- The system will process and translate automatically

#### Text Input
- Type directly in the text field
- Use Ctrl+Enter to send quickly
- The system will process and translate automatically

## VAPI Integration

The application is ready to integrate with VAPI (Voice AI Platform) for:

- **Speech-to-Text**: Audio to text conversion
- **Translation**: Automatic Spanish-English translation
- **Content Processing**: Structured data extraction
- **LaTeX Generation**: LaTeX document creation

### VAPI Configuration

1. Get your VAPI API key
2. Configure the environment variable `REACT_APP_VAPI_API_KEY`
3. Update functions in `src/utils/vapiIntegration.js` with real VAPI URLs

## Data Structure

The resume is stored in JSON format with the following structure:

```json
{
  "contact": {
    "name": "María González",
    "email": "maria@example.com",
    "phone": "555-1234",
    "address": "Ciudad, País",
    "linkedin": "linkedin.com/in/maria"
  },
  "experience": [
    {
      "title": "Desarrolladora de Software",
      "company": "TechCorp",
      "dates": "2020 - 2023",
      "description": "Desarrollé aplicaciones web..."
    }
  ],
  "education": [
    {
      "degree": "Licenciatura en Ciencias de la Computación",
      "institution": "Universidad Nacional",
      "dates": "2016 - 2020"
    }
  ],
  "skills": ["JavaScript", "React", "Node.js"],
  "languages": ["Español (Nativo)", "Inglés (Avanzado)"],
  "summary": "Desarrolladora apasionada con 5 años de experiencia..."
}
```

## Technologies Used

- **React.js 18**: Main framework
- **Lucide React**: Icons
- **CSS3**: Styles and responsive design
- **VAPI**: Voice and AI integration (ready)
- **LaTeX**: PDF generation (ready)

## Technical Features

### Responsive Design
- Mobile and tablet adaptive design
- Flexible grid system
- Components optimized for different screen sizes

### Accessibility
- Complete English interface
- Clear visual indicators
- Intuitive navigation

### Performance
- React optimized components
- Asynchronous data loading
- Processing state indicators

## Next Steps

### Complete VAPI Integration
1. Implement real VAPI API calls
2. Configure AI models specific to Spanish
3. Optimize transcription and translation accuracy

### Functionality Improvements
1. Customizable resume templates
2. Multiple export formats
3. LinkedIn integration
4. Enhanced data validation

### Optimizations
1. Local data cache
2. Offline processing
3. Performance improvements

## Contributing

This project was developed for SteelHacks. To contribute:

1. Fork the repository
2. Create a branch for your feature
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is under the MIT license. See the LICENSE file for more details.

## Contact

For questions or support, contact the development team.

---

**Note**: This is the front-end version of the project. Complete VAPI integration and real PDF generation require additional backend service configuration.