import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export const Contact: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSubmitting(true);
    
    // Note: To use EmailJS, install @emailjs/browser and uncomment:
    // import emailjs from '@emailjs/browser';
    // emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formRef.current, 'YOUR_PUBLIC_KEY')
    
    // Simulating network request for the UI
    setTimeout(() => {
      toast.success('Transmission successful. I will be in touch shortly.', {
        style: {
          background: '#111111',
          color: '#F5F5F5',
          border: '1px solid #00E5FF'
        }
      });
      setIsSubmitting(false);
      formRef.current?.reset();
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 md:py-48 bg-background relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl aspect-square bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 max-w-4xl relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-sm md:text-base font-mono text-accent uppercase tracking-widest mb-4">
            // Initiate Contact
          </h2>
          <h3 className="text-4xl md:text-6xl lg:text-7xl font-heading text-text tracking-tight mb-6">
            Let's build something <span className="text-accent italic">extraordinary</span>.
          </h3>
          <p className="text-secondary font-body max-w-2xl mx-auto leading-relaxed">
            I'm currently looking for Full-Time Full Stack Developer opportunities, freelance projects, and collaborations. If you're building something meaningful or looking for a developer who enjoys solving complex problems and crafting modern user experiences, let's connect.
          </p>
        </div>

        <motion.form 
          ref={formRef}
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="space-y-6 md:space-y-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="flex flex-col group">
              <label htmlFor="user_name" className="text-secondary font-mono text-sm mb-3 group-focus-within:text-accent transition-colors">Name</label>
              <input 
                type="text" 
                name="user_name" 
                id="user_name"
                required
                className="bg-surface/50 border border-secondary/20 rounded-xl px-5 py-4 text-text font-body outline-none focus:border-accent/50 focus:bg-surface transition-all duration-300"
                placeholder="John Doe"
              />
            </div>
            <div className="flex flex-col group">
              <label htmlFor="user_email" className="text-secondary font-mono text-sm mb-3 group-focus-within:text-accent transition-colors">Email</label>
              <input 
                type="email" 
                name="user_email" 
                id="user_email"
                required
                className="bg-surface/50 border border-secondary/20 rounded-xl px-5 py-4 text-text font-body outline-none focus:border-accent/50 focus:bg-surface transition-all duration-300"
                placeholder="john@example.com"
              />
            </div>
          </div>
          <div className="flex flex-col group">
            <label htmlFor="message" className="text-secondary font-mono text-sm mb-3 group-focus-within:text-accent transition-colors">Message</label>
            <textarea 
              name="message" 
              id="message"
              required
              rows={5}
              className="bg-surface/50 border border-secondary/20 rounded-xl px-5 py-4 text-text font-body outline-none focus:border-accent/50 focus:bg-surface transition-all duration-300 resize-none"
              placeholder="How can I help you?"
            />
          </div>
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-text text-background font-heading tracking-wide text-xl py-5 rounded-xl hover:bg-accent hover:text-background transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Sending Transmission...' : 'Send Message'}
          </button>
        </motion.form>
      </div>
    </section>
  );
};
