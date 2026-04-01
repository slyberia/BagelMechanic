// src/components/pages/Location.tsx
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Globe } from 'lucide-react';

export function Location() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-24">
      <header className="mb-20 text-center">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-gold text-[10px] tracking-[0.3em] uppercase mb-4 block font-medium"
        >
          Our Presence
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-serif text-text-main mb-6"
        >
          Where <span className="italic">Excellence</span> Resides
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-text-muted font-light max-w-2xl mx-auto leading-relaxed"
        >
          Our flagship consultation studio is located in the heart of the automotive district, 
          designed to provide a serene and professional environment for your technical strategy.
        </motion.p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Contact Info */}
        <div className="space-y-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex items-start space-x-6 group">
              <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center text-gold group-hover:bg-gold/20 transition-colors">
                <MapPin size={24} strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="text-sm tracking-[0.2em] uppercase mb-2 text-text-main">Flagship Studio</h4>
                <p className="text-text-muted text-sm font-light leading-relaxed">
                  123 Precision Way, Suite 400<br />
                  Automotive District, CA 90210
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-6 group">
              <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center text-gold group-hover:bg-gold/20 transition-colors">
                <Phone size={24} strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="text-sm tracking-[0.2em] uppercase mb-2 text-text-main">Direct Line</h4>
                <p className="text-text-muted text-sm font-light leading-relaxed">
                  +1 (555) 123-4567<br />
                  <span className="text-[10px] uppercase tracking-widest text-gold opacity-70">Priority Support Available</span>
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-6 group">
              <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center text-gold group-hover:bg-gold/20 transition-colors">
                <Mail size={24} strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="text-sm tracking-[0.2em] uppercase mb-2 text-text-main">Email Correspondence</h4>
                <p className="text-text-muted text-sm font-light leading-relaxed">
                  consult@elite-engineer.com<br />
                  support@elite-engineer.com
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-6 group">
              <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center text-gold group-hover:bg-gold/20 transition-colors">
                <Clock size={24} strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="text-sm tracking-[0.2em] uppercase mb-2 text-text-main">Consultation Hours</h4>
                <p className="text-text-muted text-sm font-light leading-relaxed">
                  Monday — Friday: 09:00 - 18:00<br />
                  Saturday: By Appointment Only
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="p-8 bg-white/[0.02] border border-white/5 space-y-6"
          >
            <h4 className="text-sm tracking-[0.2em] uppercase text-text-main">Global Consultations</h4>
            <p className="text-xs text-text-muted leading-relaxed">
              For clients outside of our primary region, we offer remote technical consultations via secure video link. 
              Our engineers are also available for on-site visits for heritage collections worldwide.
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-[10px] text-text-muted uppercase tracking-widest">
                <Globe size={14} className="mr-2 text-gold/50" />
                Worldwide Service
              </div>
              <div className="w-px h-3 bg-white/10" />
              <div className="flex items-center text-[10px] text-text-muted uppercase tracking-widest">
                <ShieldCheck size={14} className="mr-2 text-gold/50" />
                Secure Link
              </div>
            </div>
          </motion.div>
        </div>

        {/* Mock Map */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative h-[600px] bg-white/[0.02] border border-white/5 overflow-hidden group"
        >
          {/* Mock Map Background */}
          <div className="absolute inset-0 opacity-40 grayscale group-hover:grayscale-0 transition-all duration-1000">
            <img 
              src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1000" 
              alt="Map Background"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          
          {/* Map Overlay */}
          <div className="absolute inset-0 bg-ink/60 group-hover:bg-ink/40 transition-all duration-1000" />
          
          {/* Map Pin UI */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute inset-0 bg-gold/20 rounded-full blur-xl"
              />
              <div className="relative w-16 h-16 bg-ink border border-gold/50 rounded-full flex items-center justify-center text-gold shadow-2xl">
                <MapPin size={32} strokeWidth={1.5} />
              </div>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 bg-ink border border-white/10 px-4 py-2 whitespace-nowrap shadow-2xl">
                <span className="text-[10px] uppercase tracking-[0.2em] text-text-main">Elite Engineer Studio</span>
              </div>
            </div>
          </div>

          {/* Map Controls Mock */}
          <div className="absolute bottom-8 right-8 flex flex-col space-y-2">
            <button className="w-10 h-10 bg-ink border border-white/10 flex items-center justify-center text-text-muted hover:text-gold hover:border-gold/50 transition-all">
              +
            </button>
            <button className="w-10 h-10 bg-ink border border-white/10 flex items-center justify-center text-text-muted hover:text-gold hover:border-gold/50 transition-all">
              -
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
