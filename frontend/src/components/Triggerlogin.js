import React, { useState } from 'react';
import LoginPopup from './LoginPopup';

const HomePage = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const handleTranscribeClick = () => {
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  return (
    <div className="App">
      <header className="App-header">
      <div style={styles.container}>
      <h1>Welcome to the Voice Analyzer</h1>
      <button style={styles.transcribeButton} onClick={handleTranscribeClick}>
        Transcribe
      </button>
      <LoginPopup isOpen={isPopupOpen} onClose={handleClosePopup} />
    </div>
      </header>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
  },
  transcribeButton: {
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default HomePage;
