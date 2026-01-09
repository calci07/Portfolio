import React, { useState, useRef } from 'react';
// IMPORT VIDEO
import gameVideo from '../assets/video/gamedev.mp4'; 

const GameShowcase = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section id="game" className="py-16 md:py-24 px-4 bg-slate-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-end gap-4 mb-8 md:mb-12">
          <div>
             <span className="bg-purple-600 text-white px-3 py-1 font-bold text-[10px] md:text-xs rounded uppercase tracking-widest mb-2 inline-block shadow-sm">
               Java Project
             </span>
             <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
            JAVA GAME DEV
             </h2>
          </div>
          <div className="h-1 bg-slate-300 w-full md:flex-1 mb-2 md:mb-3 rounded-full"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          <div className="w-full lg:w-1/2 relative">
             
             <div 
                className="relative w-full aspect-video rounded-2xl overflow-hidden border-[3px] md:border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)] bg-black group cursor-pointer"
                onClick={togglePlay}
             >
                <video 
                  ref={videoRef}
                  src={gameVideo} 
                  muted 
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />
                
               
                <div 
                  className={`absolute inset-0 flex flex-col items-center justify-center bg-slate-900/80 text-white transition-opacity duration-300 ${isPlaying ? 'opacity-0' : 'opacity-100'}`}
                >
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-red-600 flex items-center justify-center mb-4 shadow-lg border-2 border-white transform group-hover:scale-110 transition-transform">
                        <svg className="w-8 h-8 md:w-10 md:h-10 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    </div>
                    <span className="font-mono text-xs md:text-sm tracking-widest text-slate-300 bg-black/50 px-2 py-1 rounded">
                      WATCH GAMEPLAY
                    </span>
                </div>
             </div>
             <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-purple-500 rounded-full border-4 border-black -z-10 hidden md:block"></div>
          </div>

          <div className="w-full lg:w-1/2 space-y-4 md:space-y-6 text-left">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-800 leading-tight">
              Built from Scratch. <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                No Game Engine.
              </span>
            </h3>
            <p className="text-slate-600 text-base md:text-lg leading-relaxed">
                This immersive 3D game was developed entirely on <span className="font-bold text-black bg-yellow-100 px-1 rounded">Android Studio</span> using <span className="font-bold text-black bg-yellow-100 px-1 rounded">Java</span>. 
                Every physics calculation and rendering loop was written from pure code.
            </p>
            <div className="flex flex-wrap gap-2 md:gap-3 pt-2">
               {['Java', 'Android Studio', 'Blender', 'OpenGL'].map(tag => (
                 <span key={tag} className="px-3 py-1.5 md:px-4 md:py-2 bg-white border-2 border-black rounded shadow-[3px_3px_0px_0px_rgba(0,0,0,0.1)] font-bold text-xs md:text-sm text-slate-800">
                   {tag}
                 </span>
               ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GameShowcase;