import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Router  from 'next/router';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { createSpeechlySpeechRecognition } from '@speechly/speech-recognition-polyfill';
import { segmentStory } from './api/test'
import { FloatingLabel, Form } from 'react-bootstrap';

const appId = 'c57ab291-c024-4587-a197-33ad0ad2a486';
const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(appId);
SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition);

const BookBuilder = () => {
    const { user } = useAuth();

    const DoTheMagic = async (story) => {
        if (story.length < 10) {
            console.log('need more words')
        }
        // loading true
        // pop modal
        await segmentStory(story, user.email);
        // change loading false
    }

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
      } = useSpeechRecognition();

      const startListening = () => SpeechRecognition.startListening({ continuous: true });
    
    //   if (!browserSupportsSpeechRecognition) {
    //     return (<main>Browser doesn't support speech recognition.</main>);
    //   }
    
      return (
        <main>
            <p>Microphone: {listening ? 'on' : 'off'}</p>
            <button
                onTouchStart={startListening}
                onMouseDown={startListening}
                onTouchEnd={SpeechRecognition.stopListening}
                onMouseUp={SpeechRecognition.stopListening}
            >Hold to talk</button>
            <button onClick={resetTranscript}>
                reset 
            </button>


            <textarea value = {transcript}></textarea>

            <button onClick={() => DoTheMagic(transcript)}>
                Do the Magic 
            </button>
        </main>
      );
    
};

export default BookBuilder;
