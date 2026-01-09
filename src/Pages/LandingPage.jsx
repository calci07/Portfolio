import React, { useState, useEffect } from 'react';
import TerminalIntro from '../components/TerminalIntro';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import LoyaltyApp from '../components/LoyaltyApp';
import Organizations from '../components/Organizations';
import Experience from '../components/Experience';
import GameShowcase from '../components/GameShowcase';
import TechStack from '../components/TechStack';
import Gallery from '../components/Gallery';
import Footer from '../components/Footer';
import BackgroundMusic from '../components/BackgroundMusic';
import ThreeDArt from '../components/ThreeDArt';

const LandingPage = () => {
  const [introFinished, setIntroFinished] = useState(false);

  useEffect(() => {
 
    if (!introFinished) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [introFinished]);

  return (
    <>
   {/* intro */}
      {!introFinished && <TerminalIntro onComplete={() => setIntroFinished(true)} />}
      
      {/* content */}
      <div className={`transition-opacity duration-500 ${introFinished ? 'opacity-100' : 'opacity-0'}`}>
        <Navbar />
        <Hero />
        
       {/* minecraft */}
        {introFinished && <BackgroundMusic />}

        <div className="space-y-12 md:space-y-24 pb-12 md:pb-24">
          <LoyaltyApp />
          <GameShowcase />
          <ThreeDArt />
          <Organizations />
          <Experience />
          <TechStack />
          <Gallery />
        </div>
        
        <Footer />
      </div>
    </>
  );
};

export default LandingPage;