import { useState } from "react";
import { useRef } from "react";
import { useAuth } from "../context/AuthContext";
import Router from "next/router";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { createSpeechlySpeechRecognition } from "@speechly/speech-recognition-polyfill";
import { segmentStory } from "./api/test";
import { FloatingLabel, Form } from "react-bootstrap";
import { Container } from "reactstrap";
import Header from "../components/Header";
import Details from "../pages/books/[pids]";
import Spinner from "react-bootstrap/Spinner";

const appId = "c57ab291-c024-4587-a197-33ad0ad2a486";
const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(appId);
SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition);

const BookBuilder = () => {
  const [text, setText] = useState("");
  const textareaRef = useRef(null);
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(null);
  const [title, setTitle] = useState("");

  const DoTheMagic = async (story) => {
    console.log(text);
    if (story.length < 10) {
      console.log("need more words");
    }
    // loading true
    // pop modal
    setLoading(true);
    let temp = await segmentStory(textareaRef.current.value, user.email, title);
    setId(temp);

    // change loading false
  };

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true });

  if (id) {
    return (
      <>
        <Header></Header>
        <div class="d-flex justify-content-md-center align-items-center vh-100">
          <div>
            <Details pid={id}></Details>
          </div>
        </div>
      </>
    );
  }
  //   if (!browserSupportsSpeechRecognition) {
  //     return (<main>Browser doesn't support speech recognition.</main>);
  //   }

  return (
    <>
      <Header user={user} />
      {loading ? (
        <div class="d-flex justify-content-md-center align-items-center vh-100">
          <div>
            <Spinner animation="border" role="status">
              Generating Images....
              <span className="visually-hidden">Generating Images...</span>
            </Spinner>
          </div>
        </div>
      ) : (
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
            <input
              id="email"
              type="email"
              className="form-control-lg"
              value={title}
              placeholder="Enter Title"
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <br></br>
            <br></br>

            <textarea
              name="postContent"
              id="myTextArea"
              defaultValue={transcript}
              rows={10}
              cols={100}
              onChange={(value) => {
                setText(value);
              }}
              ref={textareaRef}
            ></textarea>

            <p>Microphone: {listening ? "on" : "off"}</p>
            <button
              onTouchStart={startListening}
              onMouseDown={startListening}
              onTouchEnd={SpeechRecognition.stopListening}
              onMouseUp={SpeechRecognition.stopListening}
            >
              Hold to talk
            </button>
            <button onClick={resetTranscript}>reset</button>

            <br></br>
            <br></br>

            <button onClick={() => DoTheMagic(text)}>Do the Magic</button>
          </Container>
        </section>
      )}
    </>
  );
};

export default BookBuilder;
