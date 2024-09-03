

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
#### Clone the Repository

<pre><code> git clone https://github.com/yourusername/voice-analyzer-app.git </code></pre>

<pre><code>cd voice-analyzer-app/backend</code></pre>

#### Create a Virtual Environment

<pre><code>python -m venv env</code></pre>
<pre><code>source env/bin/activate </code></pre>
#### On Windows
use <pre><code>env\Scripts\activate</pre></code>
#### Install Dependencies

<pre><code>pip install -r requirements.txt</code></pre>

#### Run Migrations

<pre><code>python manage.py migrate</code></pre>

#### Run the Development Server

<pre><code>python manage.py runserver</code></pre>

The backend is hosted on PythonAnywhere and should be deployed as described in their documentation.

### Frontend (Vue.js)
#### Navigate to the Frontend Directory

<pre><code>cd voice-analyzer-app/my-vue-app</code></pre>

#### Install Dependencies

<pre><code>npm install</code></pre>

#### Run the Development Server

<pre><code>npm run dev</code></pre>

The frontend is hosted on Vercel and should be deployed as described in their documentation.

#### Dependencies
##### - Django: A high-level Python web framework.
##### - speech_recognition: A library for speech recognition.
##### - nltk: Natural Language Toolkit for text analysis.
##### - Vue.js: A progressive JavaScript framework for building user interfaces.
##### - To install the required Python packages, add the following to your requirements.txt file:


  ###### - Django
  ###### - speech_recognition
  ###### - nltk
  ###### - djangorestframework
  ###### - djangorestframework-jwt


### JWT Authentication
The application uses JWT (JSON Web Tokens) for authentication. Ensure that your backend is configured to handle JWT tokens properly. Documentation for setting up JWT authentication in Django can be found here.

### Deployment

#### Backend 
Deployed on PythonAnywhere. Follow PythonAnywhere's deployment guide for Django.
#### Frontend
Deployed on Vercel. Follow Vercel's deployment guide for Vue.js applications.

#### Upload Audio
Use the frontend to upload an audio file.
#### View Transcription
Receive and view the transcribed text.
#### Analyze Text
Perform text analysis using the nltk library.
