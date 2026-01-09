import React, { useState, useEffect } from 'react';

const TerminalIntro = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("SYSTEM_INIT");
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
   
    const timer = setInterval(() => {
      setProgress((old) => {
        if (old >= 100) {
          clearInterval(timer);
          return 100;
        }
      
        const jump = Math.floor(Math.random() * 25) + 10;
        return Math.min(old + jump, 100);
      });
    }, 30);

    const statuses = [
      { msg: "LOADING...", at: 10 },
      { msg: "COMPILING...", at: 50 },
      { msg: "READY.", at: 90 },
    ];

    const statusChecker = setInterval(() => {
      setProgress(p => {
        const currentStatus = statuses.find(s => s.at <= p && s.at > p - 20);
        if (currentStatus) setStatus(currentStatus.msg);
        return p;
      });
    }, 30);

    const finishTimeout = setTimeout(() => {
      setIsExiting(true); 
      setTimeout(onComplete, 200); 
    }, 500);

    return () => {
      clearInterval(timer);
      clearInterval(statusChecker);
      clearTimeout(finishTimeout);
    };
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-slate-50 transition-transform duration-200 ease-in-out ${
        isExiting ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
          backgroundSize: '20px 20px'
      }}></div>

      <div className={`relative bg-white border-4 border-black p-8 rounded-xl shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] max-w-md w-full mx-4 transition-all duration-150 ${isExiting ? 'scale-90 opacity-0' : 'scale-100 opacity-100'}`}>
        <div className="flex justify-between items-center mb-4 border-b-4 border-black pb-2">
          <div className="flex gap-2">
            <div className="w-4 h-4 rounded-full bg-red-500 border-2 border-black"></div>
            <div className="w-4 h-4 rounded-full bg-yellow-400 border-2 border-black"></div>
            <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-black"></div>
          </div>
          <div className="font-black font-mono text-xl tracking-tighter">
            GERALD<span className="text-blue-600">.OS</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-end font-mono font-bold">
            <span className="text-xl">{status}</span>
            <span className="text-4xl">{progress}%</span>
          </div>
          <div className="w-full h-8 bg-gray-200 border-4 border-black rounded-lg overflow-hidden relative">
            <div 
              className="h-full bg-blue-600 transition-all duration-75 ease-out"
              style={{ width: `${progress}%` }}
            >
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminalIntro;