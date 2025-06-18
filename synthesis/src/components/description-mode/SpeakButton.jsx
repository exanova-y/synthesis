import { useState, useEffect } from 'react';
import './SpeakButton.css';

export default function SpeakButton({ onTranscriptReady }) {
  const [buttonState, setButtonState] = useState('ready'); // ready, recording, complete
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState(null);
  const [recognition, setRecognition] = useState(null);

  // Initialize speech recognition on component mount
  useEffect(() => {
    
    // Check browser support
    if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      setError('Speech recognition not supported in this browser');
      return;
    }
    
    console.log('initializing speech recognition');
    // Initialize the SpeechRecognition instance
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const newRecognition = new SpeechRecognition();
    
    // Configure
    newRecognition.lang = 'en-US';
    newRecognition.interimResults = true;
    newRecognition.continuous = false;
    
    setRecognition(newRecognition);

    // Clean up on unmount
    return () => {
      if (newRecognition) {
        try {
          newRecognition.stop();
        } catch (err) {
          // Ignore errors when stopping
        }
      }
    };
  }, []);

  // Set up recognition event handlers when recognition object is available
  useEffect(() => {
    if (!recognition) return;

    const handleResult = (event) => {
      const current = event.resultIndex;
      const result = event.results[current];
      const text = result[0].transcript;
      setTranscript(text);
    };

    const handleError = (event) => {
      setError(event.error);
      setButtonState('ready');
    };

    const handleEnd = () => {
      if (buttonState === 'recording') {
        setButtonState('complete');
        // Only call onTranscriptReady when we have a final result
        if (transcript) {
          onTranscriptReady?.(transcript);
        }
      }
    };

    // Add event listeners
    recognition.addEventListener('result', handleResult);
    recognition.addEventListener('error', handleError);
    recognition.addEventListener('end', handleEnd);

    // Clean up event listeners
    return () => {
      recognition.removeEventListener('result', handleResult);
      recognition.removeEventListener('error', handleError);
      recognition.removeEventListener('end', handleEnd);
    };
  }, [recognition, buttonState, transcript, onTranscriptReady]);

  const startListening = () => {
    if (!recognition || buttonState === 'recording') return;
    
    setError(null);
    setTranscript('');
    setButtonState('recording');
    
    try {
      recognition.start();
    } catch (err) {
      setError(err.message);
      setButtonState('ready');
    }
  };

  const stopListening = () => {
    if (!recognition || buttonState !== 'recording') return;
    
    try {
      recognition.stop();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleClick = () => {
    if (buttonState === 'ready') {
      startListening();
    } else if (buttonState === 'recording') {
      stopListening();
    } else if (buttonState === 'complete') {
      // Reset to ready state
      setButtonState('ready');
      setTranscript('');
    }
  };

  if (error === 'Speech recognition not supported in this browser') {
    return <div className="error-message">Speech recognition not supported in this browser</div>;
  }

  return (
    <div className="speak-button-container">
      <button 
        className={`speak-button speak-button--${buttonState} ${error ? 'speak-button--error' : ''}`}
        onClick={handleClick}
      >
        <div className="cat-image"></div>
        <div className="button-text">
          {buttonState === 'ready' && 'Click to describe a scent'}
          {buttonState === 'recording' && 'Listening to your description...'}
          {buttonState === 'complete' && transcript}
        </div>
        
        {buttonState === 'recording' && <div className="listening-animation"></div>}
      </button>
      
      {error && <div className="speak-button__error">{error}</div>}
    </div>
  );
}