// src/components/layout/Footer.tsx
import React from 'react';
import { motion } from 'motion/react';
import { Instagram, Twitter, Linkedin, Mail } from 'lucide-react';

interface FooterProps {
  onViewChange?: (view: any) => void;
}

export function Footer({ onViewChange }: FooterProps) {
  const navigationLinks = [
    { name: 'Services', view: 'landing', scrollId: 'services' },
    { name: 'Process', view: 'process' },
    { name: 'About', view: 'about' },
    { name: 'Contact', view: 'location' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', view: 'privacy' },
    { name: 'Terms of Service', view: 'terms' },
    { name: 'Consultation Agreement', view: 'agreement' },
  ];

  const handleNavClick = (e: React.MouseEvent, link: any) => {
    e.preventDefault();
    if (onViewChange) {
      onViewChange(link.view);
      if (link.scrollId) {
        setTimeout(() => {
          const el = document.getElementById(link.scrollId);
          el?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  };

  return (
    <footer className="py-24 border-t border-white/5 bg-ink/50" aria-label="Site Footer">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-serif tracking-[0.15em] uppercase mb-8 text-text-main">
              Elite <span className="text-gold">Engineer</span>
            </h3>
            <p className="text-text-muted text-sm font-light leading-relaxed max-w-sm mb-10">
              Providing technical stewardship for the world's most significant automotive collections. 
              Engineering excellence, delivered virtually.
            </p>
            <div className="flex space-x-6">
              {[
                { Icon: Instagram, label: 'Instagram' },
                { Icon: Twitter, label: 'Twitter' },
                { Icon: Linkedin, label: 'LinkedIn' },
                { Icon: Mail, label: 'Email' }
              ].map(({ Icon, label }, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="text-text-muted hover:text-gold transition-colors duration-500 focus-visible:outline-gold"
                  aria-label={`Follow us on ${label}`}
                >
                  <Icon size={20} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-text-muted mb-8 font-bold">Navigation</h4>
            <ul className="space-y-4">
              {navigationLinks.map((link) => (
                <li key={link.name}>
                  <button 
                    onClick={(e) => handleNavClick(e, link)}
                    className="text-xs uppercase tracking-widest text-text-muted hover:text-text-main transition-colors focus-visible:outline-gold text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-text-muted mb-8 font-bold">Legal</h4>
            <ul className="space-y-4">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <button 
                    onClick={(e) => handleNavClick(e, link)}
                    className="text-xs uppercase tracking-widest text-text-muted hover:text-text-main transition-colors focus-visible:outline-gold text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] uppercase tracking-[0.2em] text-text-muted">
            © 2026 Elite Mechanic Consultations. All rights reserved.
          </p>
          <p className="text-[10px] uppercase tracking-[0.2em] text-text-muted">
            Designed for the Discerning Enthusiast
          </p>
        </div>
      </div>
    </footer>
  );
}
