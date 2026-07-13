import  { useState, useEffect } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { SmoothScroll } from './layouts/SmoothScroll';
import { Loader } from './components/Loader';
import { Hero } from './sections/Hero';
import { Marquee } from './components/Marquee';
import { About } from './sections/About';
import { Skills } from './sections/Skills';
import { Projects } from './sections/Projects';
import { Experience } from './sections/Experience';
import { Contact } from './sections/Contact';
import { Footer } from './components/Footer';
import { CommandPalette } from './components/CommandPalette';
import { List } from '@phosphor-icons/react';
import { Toaster } from 'sonner';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);

  // Prevent scrolling while loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isLoading]);

  return (
    <>
      <Toaster position="bottom-right" />
      <CustomCursor />
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      
      <CommandPalette isOpen={isPaletteOpen} setIsOpen={setIsPaletteOpen} />

      {/* Floating Menu Button (Visible after load) */}
      <div className={`fixed top-6 right-6 z-50 transition-opacity duration-1000 delay-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <button 
          onClick={() => setIsPaletteOpen(true)}
          className="flex items-center gap-2 bg-surface/80 backdrop-blur-md border border-secondary/20 px-4 py-2 rounded-full text-text hover:text-accent hover:border-accent/50 transition-all duration-300"
        >
          <span className="font-mono text-xs hidden md:inline">CTRL+K</span>
          <List size={20} />
        </button>
      </div>
      
      <SmoothScroll>
        <main className={`min-h-screen transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
          <Hero isLoaded={!isLoading} />
          <Marquee />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
          <Footer />
        </main>
      </SmoothScroll>
    </>
  );
}

export default App;
