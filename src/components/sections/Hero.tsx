// src/components/sections/Hero.tsx
import { motion } from 'motion/react';
import { Button } from '../ui/Button';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onBookNow: () => void;
}

export function Hero({ onBookNow }: HeroProps) {
  return (
    <section 
      className="relative h-screen flex items-center justify-center overflow-hidden pt-20"
      aria-labelledby="hero-heading"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=2000"
          alt="" // Decorative image
          className="w-full h-full object-cover opacity-30 grayscale"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/50 via-charcoal to-charcoal" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-gold text-xs md:text-sm tracking-[0.4em] uppercase mb-6 block font-medium">
            Precision Engineering • Bespoke Consultation
          </span>
          <h1 
            id="hero-heading"
            className="text-5xl md:text-8xl font-serif leading-[1.1] mb-8 tracking-tight text-text-main"
          >
            The Art of <br />
            <span className="italic text-text-main/90">Automotive Excellence</span>
          </h1>
          <p className="text-text-muted text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light leading-relaxed">
            Expert engineering consultation for high-performance vehicles and heritage collections. 
            Where mechanical mastery meets discerning stewardship.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <Button 
              onClick={onBookNow}
              aria-label="Book an elite consultation"
            >
              Book Now
            </Button>
            <Button 
              variant="outline" 
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              aria-label="View our consultation services"
            >
              View Services
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center"
        aria-hidden="true"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-text-muted mb-4">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-gold/50 to-transparent" />
      </motion.div>
    </section>
  );
}
