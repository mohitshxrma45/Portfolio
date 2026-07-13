import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { portfolioData } from '../data/data';

gsap.registerPlugin(ScrollTrigger);

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!textRef.current || !sectionRef.current) return;

    const splitText = new SplitType(textRef.current, { types: 'lines,words', wordClass: 'opacity-20 transition-colors duration-300' });

    gsap.to(splitText.words, {
      opacity: 1,
      stagger: 0.1,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        end: 'center center',
        scrub: true,
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      splitText.revert();
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-32 md:py-48 bg-surface">
      <div className="container mx-auto px-6 md:px-12 max-w-5xl">
        <h2 className="text-sm md:text-base font-mono text-accent uppercase tracking-widest mb-12">
          // About Me
        </h2>
        <p ref={textRef} className="text-2xl md:text-3xl lg:text-4xl font-heading text-text leading-[1.4] md:leading-[1.3]">
          {portfolioData.personalDetails.bio}
        </p>
      </div>
    </section>
  );
};
