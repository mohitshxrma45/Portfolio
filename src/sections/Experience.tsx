import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioData } from '../data/data';

gsap.registerPlugin(ScrollTrigger);

const TimelineItem = ({ data, type, isEven }: { data: any, type: 'achievement' | 'edu', isEven: boolean }) => {
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!itemRef.current) return;

    gsap.fromTo(itemRef.current, 
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: itemRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, []);

  return (
    <div 
      ref={itemRef}
      className="relative pl-8 md:pl-0 w-full mb-12 group opacity-0"
    >
      <div className={`md:w-1/2 ${isEven ? 'md:pr-12 md:text-right md:mr-auto' : 'md:pl-12 md:text-left md:ml-auto'}`}>
        {/* Node Dot - Raw SVG */}
        <div className="absolute left-0 md:left-1/2 -translate-x-[7px] md:-translate-x-1/2 mt-1.5 z-10 w-4 h-4 flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:scale-125 transition-transform duration-300">
            <circle cx="8" cy="8" r="6" fill="#050505" stroke="#8A8A8A" strokeWidth="2" className="group-hover:stroke-[#00E5FF] group-hover:fill-[#00E5FF]/20 transition-all duration-300"/>
          </svg>
        </div>
        
        <div className="bg-background/50 p-6 rounded-2xl border border-secondary/10 group-hover:border-accent/30 transition-colors backdrop-blur-sm shadow-xl">
          <span className="font-heading text-accent text-sm tracking-widest uppercase mb-2 block">{data.period}</span>
          <h3 className="text-2xl font-heading text-text mt-2 mb-1">
            {type === 'achievement' ? data.title : data.degree}
          </h3>
          <h4 className="text-lg text-secondary mb-4 font-heading">
            {type === 'achievement' ? data.period : data.institution}
          </h4>
          <p className="text-secondary/80 font-body leading-relaxed">
            {data.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export const Experience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current || !lineRef.current) return;

    gsap.fromTo(lineRef.current, 
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        transformOrigin: 'top',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: true
        }
      }
    );
  }, []);

  // Use the pre-sorted journey array
  const allItems = portfolioData.journey;

  return (
    <section id="experience" className="py-24 md:py-48 bg-surface relative z-10 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
      <div className="container mx-auto px-6 md:px-12 max-w-5xl">
        <h2 className="text-sm md:text-base font-heading text-accent uppercase tracking-widest mb-16 md:mb-32 text-center">
          // Academic Journey & Achievements
        </h2>
        
        <div ref={containerRef} className="relative">
          {/* Main timeline background line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-secondary/10 -translate-x-px md:-translate-x-1/2" />
          
          {/* Animated line representing progress (GSAP) */}
          <div 
            ref={lineRef}
            className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[2px] bg-accent -translate-x-[1px] md:-translate-x-[1px]"
          />

          <div className="flex flex-col">
            {allItems.map((item, i) => (
              <TimelineItem key={`timeline-${i}`} data={item} type={item.type} isEven={i % 2 === 0} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
