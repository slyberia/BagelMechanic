// src/components/pages/About.tsx
import { motion } from 'motion/react';
import { Award, Shield, Globe, Cpu, Users, Zap } from 'lucide-react';

const certifications = [
  { title: 'Master Automotive Engineer', provider: 'SAE International', icon: Cpu },
  { title: 'Certified Concourse Judge', provider: 'FIVA', icon: Shield },
  { title: 'Technical Advisor', provider: 'PCA / FCA / BMW CCA', icon: Award },
  { title: 'Global Logistics Specialist', provider: 'IATA', icon: Globe }
];

export function About() {
  return (
    <div className="pt-32 pb-24 bg-charcoal min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-24 text-center max-w-3xl mx-auto">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-gold text-[10px] tracking-[0.3em] uppercase mb-4 block font-medium"
          >
            The Architect
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-serif text-text-main mb-8"
          >
            Elite <span className="italic text-gold">Background</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-text-muted font-light leading-relaxed text-lg"
          >
            A legacy of precision engineering and uncompromising standards. 
            Dedicated to the preservation of automotive history.
          </motion.p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative aspect-[4/5] bg-white/5 border border-white/10 overflow-hidden"
          >
            <img 
              src="https://picsum.photos/seed/engineer/1200/1500" 
              alt="Lead Engineer" 
              className="w-full h-full object-cover opacity-80 grayscale hover:grayscale-0 transition-all duration-1000"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent" />
            <div className="absolute bottom-12 left-12">
              <h3 className="text-3xl font-serif text-text-main mb-2">Julian Sterling</h3>
              <p className="text-gold text-xs uppercase tracking-widest font-medium">Lead Technical Advisor</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="space-y-6">
              <h2 className="text-3xl font-serif text-text-main">Engineering Excellence</h2>
              <p className="text-text-muted font-light leading-relaxed">
                With over two decades of experience in high-performance automotive engineering, 
                Julian Sterling has built a reputation for technical precision and strategic insight. 
                From managing private collections for the world's most discerning enthusiasts to 
                advising on concourse-level restorations, his approach is rooted in data and 
                historical accuracy.
              </p>
              <p className="text-text-muted font-light leading-relaxed">
                Elite Mechanic Consultations was founded on the principle that technical stewardship 
                should be accessible globally. By leveraging high-definition virtual consultation, 
                we bridge the gap between world-class engineering and your private garage.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {certifications.map((cert, i) => (
                <div key={i} className="p-6 bg-white/[0.02] border border-white/5 flex items-start gap-4">
                  <cert.icon className="text-gold shrink-0" size={20} strokeWidth={1.5} />
                  <div>
                    <h4 className="text-sm font-serif text-text-main mb-1">{cert.title}</h4>
                    <p className="text-[10px] uppercase tracking-widest text-text-muted">{cert.provider}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
          <div className="p-12 bg-white/[0.02] border border-white/5 text-center space-y-6">
            <Zap className="text-gold mx-auto" size={32} strokeWidth={1} />
            <h3 className="text-xl font-serif text-text-main">Precision</h3>
            <p className="text-text-muted text-sm font-light leading-relaxed">
              We don't guess. We analyze. Every recommendation is backed by technical data and historical failure patterns.
            </p>
          </div>
          <div className="p-12 bg-white/[0.02] border border-white/5 text-center space-y-6">
            <Users className="text-gold mx-auto" size={32} strokeWidth={1} />
            <h3 className="text-xl font-serif text-text-main">Advocacy</h3>
            <p className="text-text-muted text-sm font-light leading-relaxed">
              We act as your technical representative when dealing with vendors, restorers, and auction houses.
            </p>
          </div>
          <div className="p-12 bg-white/[0.02] border border-white/5 text-center space-y-6">
            <Globe className="text-gold mx-auto" size={32} strokeWidth={1} />
            <h3 className="text-xl font-serif text-text-main">Global Reach</h3>
            <p className="text-text-muted text-sm font-light leading-relaxed">
              Our virtual platform allows us to provide world-class engineering support to any location on the planet.
            </p>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="p-16 bg-white/[0.01] border border-white/5 text-center max-w-4xl mx-auto"
        >
          <h3 className="text-3xl font-serif text-text-main mb-8 italic">"The difference between a car and a legacy is the quality of its stewardship."</h3>
          <p className="text-gold text-xs uppercase tracking-[0.3em] font-medium">— Julian Sterling</p>
        </motion.div>
      </div>
    </div>
  );
}
