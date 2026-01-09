import React from 'react';


import img1 from '../assets/pictures/1.jpg';
import img2 from '../assets/pictures/2.jpg';
import img3 from '../assets/pictures/3.jpg';
import img4 from '../assets/pictures/4.jpg';
import img5 from '../assets/pictures/5.jpg';
import img6 from '../assets/pictures/6.jpg';

const Gallery = () => {
  
  const proofs = [
    { id: 1, title: "Arduino Hackathon", src: img1 }, 
    { id: 2, title: "Hiraya Ideathon", src: img2 },
    { id: 3, title: "IoT Conference", src: img3 },
    { id: 4, title: "AI Challenge", src: img4 },
    { id: 5, title: "Hackathon Proof 5", src: img5 },
    { id: 6, title: "Hackathon Proof 6", src: img6 },
  ];

  return (
    <section id="gallery" className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-slate-800 mb-4 text-center">Hackathon Awards</h2>
        <div className="w-20 h-1 bg-blue-600 mx-auto mb-12 rounded-full"></div>
        
      
        <div className="flex flex-wrap justify-center gap-4">
          {proofs.map((item, index) => (
            <div 
              key={index} 
         
              className="w-[calc(50%-0.5rem)] md:w-[calc(25%-0.75rem)] group relative aspect-square bg-slate-100 rounded-xl overflow-hidden border border-slate-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
             
              <img 
                src={item.src} 
                alt={item.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                    e.target.style.display = 'none'; 
                    if (e.target.nextSibling) {
                        e.target.nextSibling.style.display = 'flex';
                        e.target.nextSibling.classList.remove('hidden');
                    }
                }}
              />

           
              <div className="w-full h-full hidden flex-col items-center justify-center text-slate-400 bg-slate-50 absolute inset-0 -z-10">
                <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                <span className="text-xs font-mono">Proof #{item.id}</span>
              </div>
              
            
              <div className="absolute inset-0 bg-blue-600/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-bold tracking-wider text-center px-2">{item.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;