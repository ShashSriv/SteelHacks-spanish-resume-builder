# Spanish Resume Builder

A full-stack web application that generates resumes in **real time using voice input**, built during **SteelHacks 2025 (24-hour hackathon)**. The project integrates a voice AI agent API with a Flask backend and React frontend to create a seamless experience for resume construction.  

---

## 🚀 Features
- 🎙️ **Voice-powered input** — speak in Spanish to add resume details.  
- 🔗 **AI API integration** — backend receives live voice transcription data via RESTful `POST` endpoints.  
- 🛠️ **Object-oriented composition** — backend structures and formats data into reusable resume objects.  
- ⚡ **Real-time updates** — React frontend polls the backend every 2 seconds for near-live resume rendering.  
- 📄 **Export-ready format** — resumes are structured for job platforms like Indeed and Glassdoor.  

---

## 🏗️ Tech Stack
- **Frontend:** React, JavaScript, CSS  
- **Backend:** Flask (Python), RESTful API design  
- **Utilities:** ngrok (for exposing local server), object-oriented helper classes  
- **Other:** Voice AI Agent API, HTML/CSS for layout  

---

## 📂 Project Structure

```
backend/ # Flask backend
├── api.py # REST API routes (POST for AI data, GET for frontend polling)
├── helper_classes.py # Resume object composition logic

public/ # Static assets
├── images/ # App images (Glassdoor, Indeed logos)
└── index.html

src/ # React frontend
├── components/ # UI components (AboutSection, ApplySection, VoiceInput, etc.)
├── utils/ # Helper utilities
├── App.js # Main frontend app
└── index.js # Entry point
```

---

## ⚙️ How It Works
1. **Voice Input** → User speaks in Spanish; the AI agent transcribes and sends structured data to the Flask backend via a `POST` request.  
2. **Backend Processing** → Flask applies OOP composition to organize the raw data into structured resume objects.  
3. **Frontend Updates** → React polls the Flask API every 2 seconds with `GET` requests to fetch the latest resume data.  
4. **Live Resume** → Users see their resume update in real time, ready to export or apply to job sites.  

---

## 🖥️ Setup & Run
```
setup_and_run:
  backend:
    steps:
      - cd backend
      - pip install -r requirements.txt
      - python api.py
    expose_with_ngrok:
      - ngrok http 5000

  frontend:
    steps:
      - cd src
      - npm install
      - npm start
    url: http://localhost:3000

```
