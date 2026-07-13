import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/data';
import { 
  MonitorPlay,
  Database,
  Wrench
} from '@phosphor-icons/react';

const SkillCard = ({ title, skills, icon: Icon, delay }: { title: string, skills: string[], icon: any, delay: number }) => {
  return (
    <motion.div 
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className="bg-background border border-secondary/20 rounded-2xl p-8 hover:border-accent/30 transition-all duration-300 relative group overflow-hidden"
    >
      <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-surface rounded-xl text-accent shadow-lg">
          <Icon size={32} weight="duotone" />
        </div>
        <h3 className="text-2xl font-heading text-text">{title}</h3>
      </div>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill, i) => (
          <motion.div 
            key={i}
            animate={{ y: [0, -4, 0] }}
            transition={{ 
              duration: 3 + Math.random() * 2, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: Math.random() * 2
            }}
            className="px-4 py-2 bg-surface text-secondary text-sm font-mono rounded-full border border-secondary/10 group-hover:text-text group-hover:border-secondary/30 transition-colors"
          >
            {skill}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-32 md:py-48 bg-background relative z-0">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl pt-16">
        <h2 className="text-sm md:text-base font-mono text-accent uppercase tracking-widest mb-16 md:mb-24 text-center">
          // Technical Arsenal
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <SkillCard 
            title="Frontend" 
            skills={portfolioData.skills.frontend} 
            icon={MonitorPlay}
            delay={0.1}
          />
          <SkillCard 
            title="Backend" 
            skills={portfolioData.skills.backend} 
            icon={Database}
            delay={0.3}
          />
          <SkillCard 
            title="Tools" 
            skills={portfolioData.skills.tools} 
            icon={Wrench}
            delay={0.5}
          />
        </div>
      </div>
    </section>
  );
};
