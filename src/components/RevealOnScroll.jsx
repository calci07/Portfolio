
import React, { useEffect, useRef, useState } from 'react';

const RevealOnScroll = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [directionClass, setDirectionClass] = useState('translate-y-20'); // Default: slide up from bottom
  const ref = useRef(null);

  useEffect(() => {
    const scrollObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        
        if (entry.boundingClientRect.top > 0) {
            setDirectionClass('translate-y-20'); 
        } else {
           
            setDirectionClass('-translate-y-20'); 
        }
      }
    }, {
      threshold: 0.15, 
      rootMargin: "0px 0px -50px 0px" 
    });

    if (ref.current) {
      scrollObserver.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        scrollObserver.unobserve(ref.current);
      }
    };
  }, []);


  return (
    <div ref={ref} className={`transform transition-all duration-1000 ease-[cubic-bezier(0.17,0.55,0.55,1)] 
      ${isVisible ? 'opacity-100 translate-y-0' : `opacity-0 ${directionClass}`}`}>
      {children}
    </div>
  );
};

export default RevealOnScroll;