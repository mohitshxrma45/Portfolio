import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface LoaderProps {
  onComplete: () => void;
}

export const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // We animate a dummy object to drive the state from 0 to 100
    const counterObj = { value: 0 };
    
    const tl = gsap.timeline({
      onComplete: onComplete
    });

    tl.to(counterObj, {
      value: 100,
      duration: 2.5,
      ease: 'power3.inOut',
      onUpdate: () => {
        setProgress(Math.round(counterObj.value));
      }
    })
    .to(counterRef.current, {
      opacity: 0,
      y: -50,
      scale: 0.9,
      duration: 0.6,
      ease: 'power4.in',
    }, "-=0.2")
    .to(overlayRef.current, {
      yPercent: -100,
      duration: 1.2,
      ease: 'expo.inOut'
    }, "+=0.1");

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div 
      ref={overlayRef} 
      className="fixed inset-0 z-[100] flex items-end justify-end bg-[#050505] p-6 md:p-12 pointer-events-none"
    >
      <div 
        ref={counterRef}
        className="font-heading text-6xl md:text-8xl lg:text-[12rem] text-text font-bold leading-none select-none tracking-tighter"
      >
        {progress}%
      </div>
    </div>
  );
};
