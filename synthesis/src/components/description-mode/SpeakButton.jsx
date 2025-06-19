import React, { useEffect, useRef } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const SpeakButton = ({ onLive, onFinal }) => { // onLive and onFinal are callback functions


  // the hook returns an object that contains
  const {
    transcript, // string, current live text recognized from speech
    listening, // boolean, if microphone is active
    resetTranscript, // function
    browserSupportsSpeechRecognition // boolean
  } = useSpeechRecognition();

  // a reference value that persists between function calls.
  const finalSentRef = useRef(false);


  // useEffect: when conditions change, perform effects alongside rendering
  // this runs whenever the transcript value changes
  useEffect(() => {
    if (onLive && transcript) onLive(transcript);
  }, [transcript, onLive]);

  // this runs whenever the microphone listening status changes
  useEffect(() => {
    if (!listening && transcript && onFinal && !finalSentRef.current) {
      finalSentRef.current = true;
      onFinal(transcript);
    }
    if (listening) {
      finalSentRef.current = false; // reset when starting new recording
    }
  }, [listening, transcript, onFinal]);


  const handleReset = () => {
    resetTranscript();
    finalSentRef.current = false;
  };

  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};
export default SpeakButton;