import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Router  from 'next/router';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { createSpeechlySpeechRecognition } from '@speechly/speech-recognition-polyfill';
import { segmentStory } from './api/test'
import { FloatingLabel, Form } from 'react-bootstrap';
import { Container } from 'reactstrap';
import Header from '../components/Header'

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
        <>
        <Header/>
        <section
        className="jumbotron text-center"
        style={{ marginTop: 80, marginLeft: 200, marginRight: 200 }}
      >
        <Container color="primary" className="text-center">
          <h1 className="jumbotron-heading"> Build A Book </h1>
          <p className="lead text-muted mb-1">
            Press the talk button bellow to start recording.
          </p>
          <p className="lead text-muted mb-1">
            Reset at anytime and start over or edit manually.
          </p>
          <p className="lead text-muted mb-1">
            Ready to create your book? Click the magic button.
          </p>
          <br></br>

          <textarea name="postContent" value = {transcript} rows={10} cols={100}></textarea>

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

            <br></br>
            <br></br>

            <button onClick={() => DoTheMagic(transcript)}>
                Do the Magic 
            </button>
        </Container>
      </section>
      </>

      );
    
};

export default BookBuilder;
