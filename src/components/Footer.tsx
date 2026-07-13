import React from 'react';
import { portfolioData } from '../data/data';
import { GithubLogo, LinkedinLogo, InstagramLogo } from '@phosphor-icons/react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface border-t border-secondary/10 py-8 md:py-12 relative z-10">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between">
        <div className="mb-6 md:mb-0 text-center md:text-left flex flex-col items-center md:items-start">
          <span className="font-heading text-2xl text-text tracking-wide mb-2">{portfolioData.brand.moniker}</span>
          <p className="text-secondary/60 text-xs font-mono">
            &copy; {currentYear} {portfolioData.personalDetails.name}. All rights reserved.
          </p>
        </div>
        
        <div className="flex gap-6 items-center">
          <a href={portfolioData.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-accent transition-colors duration-300 p-2">
            <GithubLogo size={28} />
          </a>
          <a href={portfolioData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-accent transition-colors duration-300 p-2">
            <LinkedinLogo size={28} />
          </a>
          <a href={portfolioData.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-accent transition-colors duration-300 p-2">
            <InstagramLogo size={28} />
          </a>
        </div>
      </div>
    </footer>
  );
};
