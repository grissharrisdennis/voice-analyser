

# Voice Analyzer Application
## Overview
The Voice Analyzer Application is a Django-Vue application that allows users to upload audio files, which are then transcribed into text. The application uses the speech_recognition package for converting audio to text and nltk for analyzing the text data. It provides a user-friendly interface where users can view the transcribed text and perform word analysis.

The Django backend is hosted on PythonAnywhere, while the Vue frontend is hosted on Vercel. JWT authentication is used for securing user interactions

## Features
Audio Transcription: Upload audio files to receive text transcriptions.
Text Analysis: Analyze the transcribed text using nltk for word frequency and other textual metrics.
User Authentication: Secure access with JWT authentication.
User Interface: Intuitive Vue.js frontend for seamless user experience.

## Installation

### Backend (Django)
Clone the Repository
**`git clone https://github.com/yourusername/voice-analyzer-app.git`**

cd voice-analyzer-app/backend

Create a Virtual Environment

bash
Copy code
python -m venv env
source env/bin/activate  # On Windows use `env\Scripts\activate`
Install Dependencies

bash
Copy code
pip install -r requirements.txt
Run Migrations

bash
Copy code
python manage.py migrate
Run the Development Server

bash
Copy code
python manage.py runserver
The backend is hosted on PythonAnywhere and should be deployed as described in their documentation.

### Frontend (Vue.js)
Navigate to the Frontend Directory

bash
Copy code
cd ../frontend
Install Dependencies

bash
Copy code
npm install
Run the Development Server

bash
Copy code
npm run serve
The frontend is hosted on Vercel and should be deployed as described in their documentation.

Dependencies
Django: A high-level Python web framework.
speech_recognition: A library for speech recognition.
nltk: Natural Language Toolkit for text analysis.
Vue.js: A progressive JavaScript framework for building user interfaces.
To install the required Python packages, add the following to your requirements.txt file:

Copy code
Django
speech_recognition
nltk
djangorestframework
djangorestframework-jwt
To install the required Node.js packages, ensure that package.json includes:

json
Copy code
{
  "dependencies": {
    "vue": "^3.0.0",
    "axios": "^0.21.1",
    "vue-router": "^4.0.0",
    // other dependencies
  }
}
JWT Authentication
The application uses JWT (JSON Web Tokens) for authentication. Ensure that your backend is configured to handle JWT tokens properly. Documentation for setting up JWT authentication in Django can be found here.

Deployment
Backend: Deployed on PythonAnywhere. Follow PythonAnywhere's deployment guide for Django.
Frontend: Deployed on Vercel. Follow Vercel's deployment guide for Vue.js applications.
Usage
Upload Audio: Use the frontend to upload an audio file.
View Transcription: Receive and view the transcribed text.
Analyze Text: Perform text analysis using the nltk library.
