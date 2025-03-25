import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css';

const CelebrationScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('celebration-screen');
    return () => {
      document.body.classList.remove('celebration-screen');
    };
  }, []);

  const handleCelebrateClick = () => {
    navigate('/bulbs');
  };

  return (
    <div className="container celebration-background">
      <h1 className="header">Happy 24th Birthday, Smriti! 🎉</h1>
      <p className="subheader">You're my favorite song, my favorite flower, and my favorite person. Let's make this day magical! 🌸🎶</p>
      <div className="button-container">
        <button className="button" onClick={handleCelebrateClick}>
          Turn On the Lights & Start the Celebration!
        </button>
      </div>
    </div>
  );
};

export default CelebrationScreen;