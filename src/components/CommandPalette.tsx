import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagnifyingGlass, X } from '@phosphor-icons/react';

const links = [
  { name: 'Home', href: '#' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

export const CommandPalette: React.FC<{ isOpen: boolean; setIsOpen: (val: boolean) => void }> = ({ isOpen, setIsOpen }) => {
  const [search, setSearch] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, setIsOpen]);

  const filteredLinks = links.filter(link => link.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="w-full max-w-lg bg-surface border border-secondary/20 rounded-2xl shadow-2xl overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center px-4 py-4 border-b border-secondary/20">
              <MagnifyingGlass size={20} className="text-secondary mr-3" />
              <input
                type="text"
                autoFocus
                placeholder="Search navigation..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-text placeholder-secondary/50 font-body"
              />
              <button onClick={() => setIsOpen(false)} className="text-secondary hover:text-text transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-2 max-h-[60vh] overflow-y-auto">
              {filteredLinks.length > 0 ? (
                filteredLinks.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center px-4 py-3 rounded-xl text-text hover:bg-accent/10 hover:text-accent transition-colors duration-200 group"
                  >
                    <span className="font-heading tracking-wide text-lg">{link.name}</span>
                    <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-xs font-mono">
                      GO ↵
                    </span>
                  </a>
                ))
              ) : (
                <div className="px-4 py-8 text-center text-secondary font-body">
                  No results found for "{search}"
                </div>
              )}
            </div>
            
            <div className="px-4 py-3 border-t border-secondary/20 bg-background/50 text-xs text-secondary font-mono flex justify-between">
              <span>Navigation Palette</span>
              <span>ESC to close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
