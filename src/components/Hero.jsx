import React, { useState } from 'react';

import profileImg from '../assets/profile/profile.jpg';

const Hero = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <section className="min-h-[90vh] flex items-center justify-center pt-28 pb-10 relative overflow-hidden bg-white border-b-4 border-black">
      <div className="max-w-7xl mx-auto px-4 text-center z-10 flex flex-col items-center">
        
      {/* avatar ko */}
        <button onClick={() => setShowModal(true)} className="group relative mb-10 transition-transform duration-300 hover:scale-105" title="Click to View ID">
          <div className="w-48 h-48 rounded-full bg-gray-200 border-4 border-black overflow-hidden relative shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
             
            
             <img 
                src={profileImg} 
                alt="Profile" 
                className="w-full h-full object-cover" 
             />
          </div>
          <div className="absolute bottom-2 right-0 bg-red-600 text-white font-bold px-4 py-1 border-2 border-black rounded-full text-xs transform rotate-12 group-hover:rotate-0 transition-transform z-20">CLICK ME</div>
        </button>

        <h1 className="text-6xl md:text-9xl font-black text-black leading-none mb-6">
          GERALD<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">BITAGO</span>
        </h1>
        
        <p className="text-xl md:text-2xl font-bold text-gray-600 max-w-2xl mx-auto mb-10">
          Building <span className="underline decoration-4 decoration-yellow-400">interactive</span> systems & solving problems with code.
        </p>

        <div className="flex flex-col md:flex-row gap-4">
          <a href="#app" className="btn-neo px-10 py-4 bg-blue-600 text-white font-black text-xl hover:bg-blue-700">LAUNCH APP</a>
          <a href="#experience" className="btn-neo px-10 py-4 bg-white text-black font-black text-xl hover:bg-gray-100">VIEW JOURNEY</a>
        </div>
      </div>

      {/* id modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] modal-overlay flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white p-2 rounded-xl border-4 border-black shadow-[10px_10px_0px_0px_rgba(255,255,255,0.2)] max-w-sm w-full relative">
            <button onClick={() => setShowModal(false)} className="absolute -top-4 -right-4 bg-red-500 text-white w-10 h-10 rounded-full border-2 border-black font-bold hover:scale-110">X</button>
            <div className="bg-gray-100 border-2 border-black p-6 text-center rounded-lg">
              <h3 className="font-black text-2xl mb-1">GERALD BITAGO</h3>
              <p className="font-mono text-xs text-gray-500 mb-4">DEV_ID: 2003-07-24</p>
              
              {/* img modal */}
              <div className="w-full aspect-square bg-gray-300 border-2 border-black mb-4 flex items-center justify-center overflow-hidden relative">
                 <img src={profileImg} alt="Profile ID" className="w-full h-full object-cover" />
              </div>
              
              <div className="bg-black text-white py-2 font-mono font-bold tracking-widest rounded text-sm">ACCESS GRANTED</div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;