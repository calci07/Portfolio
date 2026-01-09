import React from 'react';

import d1 from '../assets/pictures/3d1.jpg';
import d2 from '../assets/pictures/3d2.jpg';
import d3 from '../assets/pictures/3d3.jpg';
import d4 from '../assets/pictures/3d4.jpg';
import d5 from '../assets/pictures/3d5.jpg';
import d6 from '../assets/pictures/3d6.jpg';
import d7 from '../assets/pictures/3d7.jpg';
import d8 from '../assets/pictures/3d8.jpg';
import d9 from '../assets/pictures/3d9.jpg';

const ThreeDArt = () => {
 
  const arts = [
    { id: 1, title: "3D Artwork 1", src: d1 },
    { id: 2, title: "3D Artwork 2", src: d2 },
    { id: 3, title: "3D Artwork 3", src: d3 },
    { id: 4, title: "3D Artwork 4", src: d4 },
    { id: 5, title: "3D Artwork 5", src: d5 },
    { id: 6, title: "3D Artwork 6", src: d6 },
    { id: 7, title: "3D Artwork 7", src: d7 },
    { id: 8, title: "3D Artwork 8", src: d8 },
    { id: 9, title: "3D Artwork 9", src: d9 },
  ];

  return (
    <section id="3d-art" className="py-20">
      <div className="max-w-7xl mx-auto px-4">
       
        <h2 className="text-3xl font-bold text-slate-800 mb-4 text-center">3D ARTWORKS</h2>
        <div className="w-20 h-1 bg-blue-600 mx-auto mb-12 rounded-full"></div>
        
       
        <div className="flex flex-wrap justify-center gap-4">
          {arts.map((item, index) => (
            <div 
              key={index} 
            
              className="w-[calc(50%-0.5rem)] md:w-[calc(25%-0.75rem)] group relative aspect-square bg-slate-100 rounded-xl overflow-hidden border border-slate-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              
          
              <img 
                src={item.src} 
                alt={item.title}
                className="w-full h-full object-cover"
                loading="lazy"
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
                <span className="text-xs font-mono">Art #{item.id}</span>
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

export default ThreeDArt;