import React from 'react';

const Organizations = () => {
  const orgs = [
    { role: "FORMER COMMITTEE", name: "Junior Blockchain Education Consortium", acronym: "JBEC", color: "bg-blue-600" },
    { role: "CURRENT MEMBER", name: "AWS Legarda", acronym: "AWS", color: "bg-orange-500" },
    { role: "CURRENT COMMITTEE", name: "National University Student Council", acronym: "NUSC", color: "bg-yellow-500" }
  ];

  return (
    <section id="orgs" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-black text-black italic mb-12 border-l-8 border-black pl-6">ORGANIZATIONS</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {orgs.map((org, index) => (
            <div key={index} className="bg-white border-4 border-black rounded-xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,0.15)] hover:-translate-y-2 transition-transform duration-300">
              <div className={`${org.color} p-4 border-b-4 border-black text-white flex justify-between items-center`}>
                <span className="font-mono font-bold text-sm tracking-widest">ID_CARD_0{index + 1}</span>
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <div className="p-8 relative min-h-[200px] flex flex-col justify-end">
                <div className="absolute top-4 right-4 text-6xl font-black text-gray-100 select-none">{org.acronym}</div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-black leading-tight mb-3">{org.name}</h3>
                  <span className="inline-block px-3 py-1 bg-black text-white text-xs font-bold rounded uppercase">{org.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Organizations;