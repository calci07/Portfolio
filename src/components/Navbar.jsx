import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'App', href: '#app' },
    { name: 'GameDev', href: '#game' }, 
    { name: 'Orgs', href: '#orgs' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#footer' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 header-solid h-20 flex items-center shadow-sm">
      <div className="max-w-7xl mx-auto px-4 w-full flex justify-between items-center">
        
      
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-black text-white flex items-center justify-center font-black text-xl rounded shadow-md group-hover:scale-110 transition-transform">
            G
          </div>
          <span className="font-black text-2xl tracking-tighter hidden md:block">
            GERALD<span className="text-blue-600">.DEV</span>
          </span>
        </a>

        {/* nav sa pc */}
        <div className="hidden md:flex gap-8">
          {navItems.map((item) => (
            <a 
              key={item.name} 
              href={item.href}
              className="font-bold text-sm text-gray-600 hover:text-black uppercase tracking-wider hover:underline decoration-4 decoration-blue-500 underline-offset-8 transition-all"
            >
              {item.name}
            </a>
          ))}
        </div>

      {/* toggle sa mobile */}
        <button 
          className="md:hidden p-2 border-2 border-black rounded bg-white active:bg-gray-100"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
      </div>

      {/* sa mobile */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b-4 border-black p-6 shadow-2xl md:hidden flex flex-col gap-4">
          {navItems.map((item) => (
            <a 
              key={item.name} 
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="font-black text-2xl text-gray-800 hover:text-blue-600"
            >
              {item.name.toUpperCase()}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;