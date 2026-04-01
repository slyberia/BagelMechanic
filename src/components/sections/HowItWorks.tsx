// src/components/sections/HowItWorks.tsx
import { motion } from 'motion/react';
import { Search, Calendar, Video, FileText } from 'lucide-react';

const STEPS = [
  {
    icon: Search,
    title: 'Select Expertise',
    description: 'Choose the consultation tier that aligns with your mechanical requirements.'
  },
  {
    icon: Calendar,
    title: 'Schedule Session',
    description: 'Select a precise time slot from our secure global availability calendar.'
  },
  {
    icon: Video,
    title: 'Virtual Walkthrough',
    description: 'Connect via high-definition video for a deep-dive technical analysis.'
  },
  {
    icon: FileText,
    title: 'Technical Report',
    description: 'Receive a comprehensive engineering dossier with actionable insights.'
  }
];

export function HowItWorks() {
  return (
    <section id="process" className="py-32 bg-ink/50" aria-labelledby="process-heading">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <h2 id="process-heading" className="text-4xl md:text-5xl mb-6 text-text-main">The Process</h2>
          <div className="w-24 h-[1px] bg-gold mx-auto" aria-hidden="true" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {STEPS.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div 
                className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center mx-auto mb-8 group-hover:border-gold/50 transition-colors duration-500 bg-charcoal"
                aria-hidden="true"
              >
                <step.icon className="w-6 h-6 text-gold/70 group-hover:text-gold transition-colors" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-serif mb-4 tracking-wide text-text-main">{step.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed font-light">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
