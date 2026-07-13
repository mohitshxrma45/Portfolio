import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const Marquee: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef1 = useRef<HTMLDivElement>(null);
  const textRef2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef1.current || !textRef2.current) return;

    // Use GSAP horizontal infinite scroll
    const tl = gsap.timeline({ repeat: -1 });
    
    tl.to([textRef1.current, textRef2.current], {
      xPercent: -100,
      ease: 'none',
      duration: 15
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section className="w-full bg-[#050505] text-white py-12 md:py-16 lg:py-24 overflow-hidden relative z-10 border-y border-white/10 flex">
      <div className="flex whitespace-nowrap" ref={containerRef}>
        <div ref={textRef1} className="font-heading text-5xl md:text-7xl lg:text-[7rem] font-black uppercase tracking-tighter px-8 shrink-0 flex items-center">
          <span className="text-accent mx-6 md:mx-12">•</span> MERN STACK DEVELOPER <span className="text-accent mx-6 md:mx-12">•</span> JAVA DEVELOPER <span className="text-accent mx-6 md:mx-12">•</span> MERN STACK DEVELOPER <span className="text-accent mx-6 md:mx-12">•</span> JAVA DEVELOPER
        </div>
        <div ref={textRef2} className="font-heading text-5xl md:text-7xl lg:text-[7rem] font-black uppercase tracking-tighter px-8 shrink-0 flex items-center">
          <span className="text-accent mx-6 md:mx-12">•</span> MERN STACK DEVELOPER <span className="text-accent mx-6 md:mx-12">•</span> JAVA DEVELOPER <span className="text-accent mx-6 md:mx-12">•</span> MERN STACK DEVELOPER <span className="text-accent mx-6 md:mx-12">•</span> JAVA DEVELOPER
        </div>
      </div>
    </section>
  );
};
