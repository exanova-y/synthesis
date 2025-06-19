import React, { useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const SpeakButton = ({ onLive, onFinal }) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  // push live transcript up for display
  useEffect(() => {
    if (onLive && transcript) onLive(transcript);
  }, [transcript, onLive]);

  // when microphone stops listening, emit final transcript once
  useEffect(() => {
    if (!listening && transcript && onFinal) {
      onFinal(transcript);
    }
  }, [listening, transcript, onFinal]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
    </div>
  );
};
export default SpeakButton;