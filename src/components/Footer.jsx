import React from 'react';

const Footer = () => {
  return (
    <footer id="footer" className="bg-slate-900 text-white pt-20 pb-10 border-t-4 border-black">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
       
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-4xl font-black mb-6 tracking-tighter">
              GERALD<span className="text-blue-500">.DEV</span>
            </h2>
            <p className="text-slate-400 max-w-sm mb-6 leading-relaxed">
              3rd-year Mobile & Web Applications student and avid hackathon enthusiast. I love building scalable systems and solving real-world problems through IoT and web technologies.
            </p>
            <div className="flex gap-4">
              <SocialIcon href="https://web.facebook.com/calcikulayitim" icon="FB" />
              <SocialIcon href="https://www.linkedin.com/in/gerald-bitago-0ab95b340/recent-activity/all/" icon="IN" />
              <SocialIcon href="https://github.com/calci07" icon="GH" />
            </div>
          </div>

          
          <div>
            <h3 className="font-bold text-lg mb-6 text-white uppercase tracking-widest border-b-2 border-blue-500 inline-block pb-2">Navigation</h3>
            <ul className="space-y-4 text-slate-400">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Home</a></li>
              <li><a href="#app" className="hover:text-blue-400 transition-colors">Loyalty App</a></li>
              <li><a href="#game" className="hover:text-blue-400 transition-colors">GameDev</a></li>
              <li><a href="#experience" className="hover:text-blue-400 transition-colors">Experience</a></li>
            </ul>
          </div>

         
          <div>
            <h3 className="font-bold text-lg mb-6 text-white uppercase tracking-widest border-b-2 border-blue-500 inline-block pb-2">Contact</h3>
            <ul className="space-y-4 text-slate-400">
              <li className="flex items-center gap-3">
                <span className="text-blue-500">📧</span>
                <span>geraldb2417@gmail.com</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-blue-500">📍</span>
                <span>Quezon City, Philippines</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-blue-500">💼</span>
                <span>Open for Collaboration</span>
              </li>
            </ul>
          </div>
        </div>

   
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm font-mono">
          <p>© {new Date().getFullYear()} Gerald Bitago. All Rights Reserved.</p>
          <p>Designed with <span className="text-blue-500">React</span> & <span className="text-cyan-400">Tailwind</span></p>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ href, icon }) => (
  <a 
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center font-bold text-slate-200 hover:bg-blue-600 hover:text-white transition-all hover:-translate-y-1 shadow-md"
  >
    {icon}
  </a>
);

export default Footer;