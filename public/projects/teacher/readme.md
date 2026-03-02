# Overview
English Coach is a FastAPI-based web service that helps users practice and improve their spoken English answers for technical AI interviews. It provides a full voice interaction pipeline:

 1. Speech to Text (STT) via Azure OpenAI’s speech transcription  
 2. Large Language Model (LLM) evaluation and improvement hints  
 3. Text to Speech (TTS) of the improved answer  
 4. A simple browser UI for recording, playback and feedback  

By speaking your answer into your microphone, you’ll receive an improved version of your response, detailed feedback on improvements, and a model “book” answer.

# Sample

[![Sample](https://github.com/aardoiz/aardoiz.github.io/tree/main/public/projects/teacher/logo.png)](https://github.com/aardoiz/aardoiz.github.io/tree/main/public/projects/teacher/function.mp4)


# Features
• Real-time speech transcription (webm → wav → text)  
• AI-driven evaluation and coached improvements  
• Synthesized audio playback of the improved answer  
• Persistent session history and reset capability  
• CORS-enabled for easy integration with single-page front ends

# Configuration
The application reads settings via Pydantic. For now I'm using the following models:

• LLM_MODEL ->  `gpt-4.1-mini`
• STT_MODEL -> `gpt-4o-mini-transcribe`
• TTS_MODEL -> `gpt-4o-mini-TTS`
• AZURE_TTS_VOICE -> `alloy`
