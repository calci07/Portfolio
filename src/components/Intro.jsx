import React, { useEffect, useState } from 'react';

const Intro = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 3500); 
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-orange-100 animate-slide-up pointer-events-none">
      <div className="text-center">
        <div className="text-8xl mb-4 animate-wave inline-block">👋</div>
        <h1 className="text-5xl font-black text-orange-800 tracking-tight">
          Welcome to <span className="text-orange-500">Gerald's</span> World
        </h1>
        <p className="mt-4 text-xl text-orange-400 font-medium">Loading Awesomeness...</p>
        
       {/* loading */}
        <div className="mt-8 w-64 h-4 bg-white rounded-full mx-auto overflow-hidden border-2 border-orange-200">
          <div className="h-full bg-orange-400 animate-[width_2s_ease-in-out_forwards]" style={{width: '100%'}}></div>
        </div>
      </div>
    </div>
  );
};

export default Intro;