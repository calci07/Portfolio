import React from 'react';

const Experience = () => {
  const levels = [
    { title: "Arduino Hackathon", rank: "1st Runner Up", color: "bg-red-400" },
    { title: "Hiraya Ideathon", rank: "1st Runner Up", color: "bg-orange-400" },
    { title: "IoT Conference", rank: "Finalist", color: "bg-yellow-400" },
    { title: "Hackada AI", rank: "Semi-Finalist", color: "bg-green-400" },
  ];

  return (
    <section id="experience" className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-black text-slate-900 mb-12 text-center">HACKATHON JOURNEY</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {levels.map((lvl, index) => (
            <div key={index} className="game-card bg-white p-6 rounded-2xl border-4 border-black relative overflow-hidden group cursor-pointer">
              <div className={`absolute top-0 right-0 w-16 h-16 ${lvl.color} rounded-bl-full border-l-4 border-b-4 border-black z-10`}></div>
              
              <div className="relative z-20">
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Mission {index + 1}</span>
                <h3 className="text-2xl font-black text-slate-800 mt-1">{lvl.title}</h3>
                <div className="mt-4 inline-block px-4 py-2 bg-slate-900 text-white font-bold rounded-lg border-b-4 border-slate-700">
                  RANK: {lvl.rank}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;