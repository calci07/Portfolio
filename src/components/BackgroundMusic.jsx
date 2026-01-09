import React, { useState, useEffect, useRef } from 'react';


const bgMusic = "/assets/audio/bg_music.mp3"; 

const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.6; 

  
    const playAudio = async () => {
      try {
        await audio.play();
        console.log("Audio playing automatically.");
      } catch (err) {
        console.log("Autoplay blocked. Waiting for interaction.");
      }
    };

    playAudio();

    
    const handleUserInteraction = () => {
      if (audio.paused) {
        audio.play().catch(e => console.error("Play failed:", e));
      }
   
      ['click', 'scroll', 'keydown'].forEach(event => 
        document.removeEventListener(event, handleUserInteraction)
      );
    };

   
    ['click', 'scroll', 'keydown'].forEach(event => 
      document.addEventListener(event, handleUserInteraction)
    );

    return () => {
      ['click', 'scroll', 'keydown'].forEach(event => 
        document.removeEventListener(event, handleUserInteraction)
      );
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
   
    <div className="fixed bottom-6 right-6 z-50">
      <audio 
        ref={audioRef} 
        src={bgMusic} 
        loop 
        onError={(e) => console.error("Audio Error:", e)}
      
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <button 
        onClick={togglePlay}
       
        className={`w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-full border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-y-1 active:shadow-none hover:scale-105 ${
          isPlaying ? 'bg-green-500 text-white animate-pulse-slow' : 'bg-white text-gray-800 hover:bg-gray-100'
        }`}
        title={isPlaying ? "Pause Music" : "Play Music"}
      >
        {isPlaying ? (
      
          <svg className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
          </svg>
        ) : (
        
          <svg className="w-7 h-7 ml-1 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        )}
      </button>
    </div>
  );
};

export default BackgroundMusic;