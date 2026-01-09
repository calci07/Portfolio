import React from 'react';

const TechStack = () => {
 
  const items = [
    "HTML", "CSS", "JavaScript", "Java", "Java Swing", 
    "React", "C/C++ (IoT)", "MSSQL", "Flutter", 
    "MySQL", "MongoDB", "Tailwind CSS", "Node.js", "Express.js"
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
     
        <h2 className="text-4xl font-black text-slate-900 mb-12 uppercase tracking-tight">
          System Inventory
        </h2>
        
        <div className="flex flex-wrap justify-center gap-4">
          {items.map((item, i) => (
            <div 
              key={i} 
          
              className="px-6 py-3 bg-white border-2 border-slate-900 rounded-lg font-bold text-slate-900 
                         shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
                         hover:bg-yellow-300 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
                         transition-all duration-200 cursor-default"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;