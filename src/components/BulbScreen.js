import React, { useEffect, useState, useRef } from 'react';
import LazyLoad from 'react-lazyload';
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css';
import data from './Data';
// import homeBg from "../../public/assets/home.jpeg" 
 
// import '../../public/assets/home.jpeg' 
const BulbScreen = () => {
  const bulbImages = ['bulb_pink.png', 'bulb_green.png', 'bulb_blue.png', 'bulb_orange.png', 'bulb_red.png', 'bulb_yellow.png'
    ,'bulb_pink.png', 'bulb_green.png', 'bulb_blue.png', 'bulb_orange.png', 'bulb_red.png', 'bulb_yellow.png'

  ];
  const navigate = useNavigate();

  // const backgrounds = [
  //   'assets/home.jpeg',
  //   '../public/assets/home.jpeg',
  //   '../public/assets/home.jpeg',
  //   '../public/assets/home.jpeg'
  // ];
  
  // const [currentBg, setCurrentBg] = useState(backgrounds[0]);

//  useEffect(() => {
//     document.body.classList.add('bulbcontain');
//     return () => {
//       document.body.classList.remove('bulbcontain');
//     };
//   }, []);

  // useEffect(() => {
  //   const bgInterval = setInterval(() => {
  //     setCurrentBg(prevBg => {
  //       const nextIndex = (backgrounds.indexOf(prevBg) + 1) % backgrounds.length;
  //       return backgrounds[nextIndex];
  //     });
  //   }, 5000);
  //   return () => clearInterval(bgInterval);
  // }, []);


  // State variables
  const [currentBulbIndex, setCurrentBulbIndex] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const [musicPlayed, setMusicPlayed] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showBannerAfterClick, setShowBannerAfterClick] = useState(false);
  const [showBalloonsButton, setShowBalloonsButton] = useState(false);
  const [showSingleBalloon, setShowSingleBalloon] = useState(false);
  const [showRoamingBalloons, setShowRoamingBalloons] = useState(false);
  const [roamingBalloons, setRoamingBalloons] = useState([]);
  const [showTempButton, setShowTempButton] = useState(true);
  const [showDeliciousCakeButton, setShowDeliciousCakeButton] = useState(false);
  const [showLightCandlesButton, setShowLightCandlesButton] = useState(false);
  const [showIamGre, setShowIamGre] = useState(false);
  const [candleImage, setCandleImage] = useState('/assets/cake.png');
  const [showMessageButton, setShowMessageButton] = useState(false);
  const [isShowingMessage, setIsShowingMessage] = useState(false);
  const [messages, setMessages] = useState(data);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [bgVisible,setBgVisible] = useState(false)

  // Refs for audio and interval
  const audioRef = useRef(null);
  const intervalRef = useRef(null);

  // Bulb and music button effects
  useEffect(() => {
    const bulbInterval = setInterval(() => {
      setCurrentBulbIndex((prevIndex) => (prevIndex + 1) % bulbImages.length);
    }, 3000);

    const musicButtonTimeout = setTimeout(() => {
      setShowButton(true);
    }, 3000);

    return () => {
      clearInterval(bulbInterval);
      clearTimeout(musicButtonTimeout);
      if (intervalRef.current) {
        clearInterval(intervalRef.current); // Clear the message interval on unmount
      }
    };
  }, []);

  const backgrounds = [
    "/assets/home1.jpeg",
    "/assets/home2.jpeg",
    "/assets/home3.jpeg",
    "/assets/home4.jpeg",
    "/assets/home5.jpeg",
    "/assets/home6.jpeg",
    "/assets/home7.jpeg",
    
  ];

  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true); // Start fade-out

      setTimeout(() => {
        setCurrentBgIndex((prev) => (prev + 1) % backgrounds.length);
        setFade(false); // Start fade-in
      }, 1000); // Match animation duration
    }, 10000); // Change every 10 seconds

    return () => clearInterval(interval);
  }, []);


  // Handle music playback
  const handleTurnOnMusic = () => {
    audioRef.current = new Audio('/assets/song.mp4'); // Use your desired song
    audioRef.current.play();

    setBgVisible(true)
    setShowButton(false);
    setMusicPlayed(true);

    // Stop the song after 2 minutes (120,000 milliseconds)
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        navigate('/'); // Navigate to the home page
      }
    }, 236000); // Stop after 236 seconds (3 minutes and 56 seconds)

    setTimeout(() => {
      setShowButton(true);
      setShowBannerAfterClick(true);
    }, 15000);
  };

  // Handle banner display
  const handleBanner = () => {
    setShowButton(false);
    setShowBalloonsButton(true);

    if (showBannerAfterClick) {
      setShowBanner(true);
    }
  };

  // Handle balloon animations
  const handleFlySingleBalloon = () => {
    setShowSingleBalloon(true);
    setShowTempButton(false);

    setTimeout(() => {
      setShowSingleBalloon(false);
      setShowRoamingBalloons(true);

      setRoamingBalloons(
        [...Array(14)].map((_, index) => ({
          id: index,
          image: `/assets/b${index % 2 !== 0 ? (index > 6 ? Math.floor(index / 2) + 1 : index + 1) : (index > 6 ? index / 2 + 1 : index + 1)}.png`,
          position: {
            left: `${Math.random() * 90 + 5}%`,
            bottom: `${Math.random() * 50 + 50}%`,
          },
        }))
      );
    }, 5000);

    setTimeout(() => {
      setShowDeliciousCakeButton(true);
    }, 10000);
  };

  // Handle cake display
  const handleDeliciousCake = () => {
    setShowDeliciousCakeButton(false);
    setShowIamGre(true);
    setCandleImage('/assets/cake.png');

    setTimeout(() => {
      setShowLightCandlesButton(true);
    }, 5000);
  };

  // Handle candle lighting
  const handleLightCandle = () => {
    setShowLightCandlesButton(false);
    setShowIamGre(true);
    setCandleImage('/assets/cake1.png');

    setRoamingBalloons(
      [...Array(7)].map((_, index) => ({
        id: index,
        image: `/assets/b${index + 1}.png`,
        position: {
          left: `${(index + 1) * 10}%`,
          bottom: '80%',
        },
      }))
    );

    setShowMessageButton(true);
  };

  // Handle message display
  const handleShowMessage = () => {
    setIsShowingMessage(true);
    let messageIndex = 0;

    intervalRef.current = setInterval(() => {
      setCurrentMessageIndex(messageIndex); // Update the current message index
      messageIndex = (messageIndex + 1) % messages.length; // Cycle through messages
    }, 3000); // Show each message for 3 seconds
  };

  return (
    // <div className="contain">

      <div 
      className={`bulb-container  ${showButton ? 'show-button' : ''}`} 
      // style={{ backgroundImage: `url(${backgrounds[currentBgIndex]})` }} 
      >
{/*       
      <div
        className={`background previous ${animationClass}`}
        style={{ backgroundImage: `url(${backgrounds[prevBgIndex]})` }}
      ></div>
      <div
        className={`background current ${animationClass}`}
        style={{ backgroundImage: `url(${backgrounds[currentBgIndex]})` }}
      ></div> */}

        {bgVisible && (<div className={`background ${fade ? "fade-out" : "fade-in"}`}
      style={{ backgroundImage: `url(${backgrounds[currentBgIndex]})` }}></div>)}
        {/* Bulb images */}
        {bulbImages.map((imageName, index) => (
          <LazyLoad key={index} height={100} offset={[-100, 100]} placeholder={<div className="bulb" />}>
            <img
              className={`bulb ${index === currentBulbIndex ? 'highlight' : ''}`}
              src={`assets/${index === currentBulbIndex ? 'bulb_white.png' : imageName}`}
              alt="Bulb"
              />
          </LazyLoad>
        ))}

        {/* Cake image */}
        {showIamGre && (
          <div className="iamgre-container">
            <img className="iamgre-image" src={candleImage} alt="Cake" />
          </div>
        )}

        {/* Buttons and animations */}
        {showButton && !musicPlayed && (
          <div className="button-container">
            <button className="button" onClick={handleTurnOnMusic}>
              Turn On Music 🎶
            </button>
          </div>
        )}

        {showButton && musicPlayed && !showBanner && (
          <div className="button-container">
            <button className="button" onClick={handleBanner}>
              Let's Decorate 🎈
            </button>
          </div>
        )}

        {showBanner && (
          <div className="banner-container">
            <img className="banner" src="/assets/banner.png" alt="Banner" />
          </div>
        )}

        {showBalloonsButton && showTempButton && (
          <div className="button-container">
            <button className="button" onClick={handleFlySingleBalloon}>
              Let's Fly Balloons 🎈
            </button>
          </div>
        )}

        {showSingleBalloon && (
          <div className="balloon-container">
            <img className="single-balloon" src="/assets/Balloon-Border.png" alt="Single Balloon" />
          </div>
        )}

        {showRoamingBalloons && (
          <div className="balloon-container">
            {roamingBalloons.map((balloon) => (
              <img
              key={balloon.id}
              className="roaming-balloon"
              src={balloon.image}
              alt={`Roaming Balloon ${balloon.id}`}
              style={{ left: balloon.position.left, bottom: balloon.position.bottom }}
              />
            ))}
          </div>
        )}

        {showDeliciousCakeButton && (
          <div className="button-container">
            <button className="button" onClick={handleDeliciousCake}>
              Delicious Cake 🎂
            </button>
          </div>
        )}

        {showLightCandlesButton && (
          <div className="button-container">
            <button className="button" onClick={handleLightCandle}>
              Light Up Candles 🕯️
            </button>
          </div>
        )}

        {showMessageButton && (
          <div className={`message-container ${isShowingMessage ? 'show-message' : ''}`}>
            <p className="message-line">{messages[currentMessageIndex]}</p>
          </div>
        )}

        {showMessageButton && !isShowingMessage && (
          <div className="button-container">
            <button className="button" onClick={handleShowMessage}>
              Show Message 💌
            </button>
          </div>
        )}
      </div>
    // </div>
  );
};

export default BulbScreen;


// Dress
// oliver
// dont blame me
// lover2a