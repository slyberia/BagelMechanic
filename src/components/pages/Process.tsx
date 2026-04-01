// src/components/pages/Process.tsx
import { motion } from 'motion/react';
import { CheckCircle2, Search, Calendar, Video, FileText, Settings } from 'lucide-react';

const steps = [
  {
    title: 'Technical Discovery',
    description: 'We begin with a deep-dive analysis of your vehicle\'s history, documentation, and current technical state. This phase ensures we have all necessary data before the live consultation.',
    icon: Search,
  },
  {
    title: 'Consultation Scheduling',
    description: 'Select a time that suits your global schedule. Our platform handles time-zone synchronization automatically to ensure seamless connection with our lead engineer.',
    icon: Calendar,
  },
  {
    title: 'Live Virtual Inspection',
    description: 'A high-definition video session where we walk through the vehicle together. We guide you through specific failure points, mechanical nuances, and performance metrics.',
    icon: Video,
  },
  {
    title: 'Engineering Analysis',
    description: 'Post-consultation, our team synthesizes the findings. We cross-reference data with manufacturer specifications and historical failure databases.',
    icon: Settings,
  },
  {
    title: 'Strategic Roadmap',
    description: 'Receive a comprehensive technical report detailing immediate requirements, long-term maintenance strategies, and value preservation advice.',
    icon: FileText,
  },
  {
    title: 'Ongoing Stewardship',
    description: 'Access our priority support for follow-up questions or vendor management. We remain your technical advocate throughout the vehicle\'s lifecycle.',
    icon: CheckCircle2,
  }
];

export function Process() {
  return (
    <div className="pt-32 pb-24 bg-charcoal min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-24 text-center max-w-3xl mx-auto">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-gold text-[10px] tracking-[0.3em] uppercase mb-4 block font-medium"
          >
            The Methodology
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-serif text-text-main mb-8"
          >
            Our <span className="italic text-gold">Workflow</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-text-muted font-light leading-relaxed text-lg"
          >
            A rigorous, engineering-led approach to virtual automotive stewardship. 
            Precision at every touchpoint.
          </motion.p>
        </header>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-white/5 hidden md:block" />

          <div className="space-y-24">
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`flex flex-col md:flex-row items-center gap-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <div className="flex-1 w-full">
                  <div className={`p-10 bg-white/[0.02] border border-white/5 hover:border-gold/20 transition-colors duration-500 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className={`flex items-center gap-4 mb-6 ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                      <span className="text-gold/30 font-serif text-4xl italic">0{index + 1}</span>
                      <h3 className="text-2xl font-serif text-text-main">{step.title}</h3>
                    </div>
                    <p className="text-text-muted font-light leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                <div className="relative z-10 flex items-center justify-center w-16 h-16 bg-charcoal border border-gold/30 rounded-full shrink-0">
                  <step.icon className="text-gold" size={24} strokeWidth={1.5} />
                </div>

                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-32 p-12 bg-gold/5 border border-gold/10 text-center max-w-4xl mx-auto"
        >
          <h3 className="text-2xl font-serif text-text-main mb-6">Ready to begin the process?</h3>
          <p className="text-text-muted font-light mb-10 max-w-2xl mx-auto">
            Experience the gold standard in virtual automotive consultation. 
            Our engineers are ready to provide the clarity you need.
          </p>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-12 py-4 bg-gold text-charcoal text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-white transition-colors duration-500"
          >
            Schedule Consultation
          </button>
        </motion.div>
      </div>
    </div>
  );
}
