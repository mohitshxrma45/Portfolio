import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioData } from '../data/data';
import { GithubLogo, ArrowUpRight } from '@phosphor-icons/react';

gsap.registerPlugin(ScrollTrigger);

const getImageUrl = (imageName: string) => {
  try {
    return new URL(`../assets/Images/${imageName}`, import.meta.url).href;
  } catch (error) {
    return '';
  }
};

const ProjectCard = ({ project, index }: { project: any, index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [imageError, setImageError] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["0 1", "1.33 1"]
  });

  const scaleProgess = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgess = useTransform(scrollYProgress, [0, 1], [0.4, 1]);

  return (
    <motion.div
      ref={cardRef}
      style={{
        scale: scaleProgess,
        opacity: opacityProgess
      }}
      className="flex flex-col md:flex-row gap-8 lg:gap-16 items-center mb-24 md:mb-40 group"
    >
      <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
        <a href={project.link} target="_blank" rel="noopener noreferrer" className="block relative overflow-hidden rounded-2xl aspect-[4/3] bg-surface shadow-2xl">
          {!imageError ? (
            <motion.img 
              src={getImageUrl(project.image)}
              alt={project.title}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-surface to-[#0a0a0a] text-secondary">
              <span className="font-heading text-2xl text-accent/50 opacity-50 mb-2 tracking-widest">MOHIT SHARMA</span>
              <span className="font-mono text-sm opacity-50 uppercase tracking-widest">Image Source Pending</span>
            </div>
          )}
          <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay pointer-events-none" />
        </a>
      </div>

      <div className={`w-full md:w-1/2 flex flex-col justify-center ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
        <h3 className="text-3xl md:text-5xl font-heading text-text mb-6 group-hover:text-accent transition-colors duration-300">
          {project.title}
        </h3>
        
        {/* Cinematic Card Overlay for Description */}
        <div className="bg-surface/80 p-6 md:p-8 rounded-2xl border border-secondary/20 relative z-10 md:w-[110%] backdrop-blur-md shadow-2xl">
          <p className="text-secondary text-base md:text-lg font-body leading-relaxed">
            {project.description}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-4 mt-8 mb-8 z-10">
          {project.techStack.map((tech: string, i: number) => (
            <span key={i} className="text-accent font-mono text-sm tracking-wider">
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-6 items-center z-10">
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-text hover:text-accent transition-colors flex items-center gap-2 group/link">
            <GithubLogo size={32} weight="regular" />
            <span className="font-mono text-sm opacity-0 group-hover/link:opacity-100 transition-opacity duration-300">Source</span>
          </a>
          <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-text hover:text-accent transition-colors flex items-center gap-2 group/link">
            <ArrowUpRight size={32} weight="regular" />
            <span className="font-mono text-sm opacity-0 group-hover/link:opacity-100 transition-opacity duration-300">Live Demo</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Pin the section when its bottom hits the bottom of the viewport
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "bottom bottom",
      pin: true,
      pinSpacing: false, // Allows Experience section to slide up over it
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-24 md:py-48 bg-background relative z-0">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <h2 className="text-sm md:text-base font-mono text-accent uppercase tracking-widest mb-16 md:mb-32 text-center">
          // Featured Work
        </h2>
        
        <div className="flex flex-col">
          {portfolioData.projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
