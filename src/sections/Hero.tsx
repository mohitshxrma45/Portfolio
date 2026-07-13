import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { portfolioData } from '../data/data';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  isLoaded: boolean;
}

export const Hero: React.FC<HeroProps> = ({ isLoaded }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const monikerRef = useRef<HTMLParagraphElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoaded) return;

    // Split text into characters and lines for staggered animation
    const titleSplit = new SplitType(titleRef.current as HTMLElement, { types: 'chars' });
    const subtitleSplit = new SplitType(subtitleRef.current as HTMLElement, { types: 'lines' });

    const tl = gsap.timeline();

    tl.from(titleSplit.chars, {
      y: 100,
      opacity: 0,
      rotateX: -90,
      stagger: 0.02,
      duration: 1.2,
      ease: 'expo.out',
      transformOrigin: 'bottom center'
    })
    .from(monikerRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out'
    }, "-=0.8")
    .from(subtitleSplit.lines, {
      y: 20,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power2.out'
    }, "-=0.6");

    // Parallax effect on the background radial gradient
    gsap.to(bgRef.current, {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
      titleSplit.revert();
      subtitleSplit.revert();
    };
  }, [isLoaded]);

  return (
    <section ref={containerRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Parallax Background */}
      <div 
        ref={bgRef}
        className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1a1a1a] via-background to-background"
      />
      
      <div className="relative z-10 container mx-auto px-6 md:px-12 flex flex-col items-center text-center">
        <p ref={monikerRef} className="text-accent text-sm md:text-base font-mono tracking-widest uppercase mb-6">
          {portfolioData.brand.moniker} // {portfolioData.personalDetails.title}
        </p>
        
        <div style={{ perspective: '1000px' }}>
          <h1 ref={titleRef} className="text-5xl md:text-7xl lg:text-[9rem] font-heading text-text uppercase leading-[0.9] tracking-tighter" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' }}>
            {portfolioData.personalDetails.name.split(' ').map((word, i) => (
              <span key={i} className="block">{word}</span>
            ))}
          </h1>
        </div>
        
        <div className="mt-8 md:mt-12 overflow-hidden max-w-2xl">
          <p ref={subtitleRef} className="text-secondary text-lg md:text-xl font-body leading-relaxed">
            {portfolioData.brand.tagline}
          </p>
        </div>
      </div>
    </section>
  );
};
