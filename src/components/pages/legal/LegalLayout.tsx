// src/components/pages/legal/LegalLayout.tsx
import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface LegalLayoutProps {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}

export function LegalLayout({ title, lastUpdated, children }: LegalLayoutProps) {
  return (
    <div className="pt-32 pb-24 bg-charcoal min-h-screen">
      <div className="max-w-3xl mx-auto px-6">
        <header className="mb-24 text-center">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-gold text-[10px] tracking-[0.3em] uppercase mb-4 block font-medium"
          >
            Legal Documentation
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif text-text-main mb-6"
          >
            {title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-text-muted font-mono text-[10px] uppercase tracking-widest"
          >
            Last Updated: {lastUpdated}
          </motion.p>
        </header>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="prose prose-invert prose-gold max-w-none"
        >
          <div className="space-y-12 text-text-muted font-light leading-relaxed">
            {children}
          </div>
        </motion.div>

        <footer className="mt-24 pt-12 border-t border-white/5 text-center">
          <p className="text-[10px] uppercase tracking-widest text-text-muted">
            For legal inquiries, contact legal@elitemechanic.com
          </p>
        </footer>
      </div>
    </div>
  );
}
