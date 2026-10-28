# Voice AI Interview Coach

A voice AI application for practicing technical interviews in English. Built with FastAPI and Azure, it connects browser recording, speech recognition, LLM feedback and speech synthesis in one workflow:

 1. Speech to Text (STT) via Azure OpenAI’s speech transcription
 2. Large Language Model (LLM) evaluation and improvement hints
 3. Text to Speech (TTS) of the improved answer
 4. A simple browser UI for recording, playback and feedback


Record an answer to an AI interview question, review its transcription and model-generated feedback, then listen to a suggested response.

# Features

- Recorded speech transcription (webm → wav → text)
- LLM-generated answer feedback and suggested improvements
- Synthesized audio playback of the improved answer
- Persistent session history and reset capability
- CORS-enabled for easy integration with single-page front ends

# Configuration

The application reads settings via Pydantic. The documented model configuration is:

- LLM_MODEL ->  `gpt-4.1-mini`
- STT_MODEL -> `gpt-4o-mini-transcribe`
- TTS_MODEL -> `gpt-4o-mini-TTS`
- AZURE_TTS_VOICE -> `alloy`


# Project context

Built for personal interview practice. Transcription accuracy and learning outcomes have not been formally benchmarked. Model-generated feedback may need correction and is not a validated language or pronunciation assessment.
