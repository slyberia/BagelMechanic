// src/components/checkout/CheckoutModal.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CreditCard, User, Calendar, Lock, Loader2, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Button } from '../ui/Button';
import { formatCurrency } from '../../lib/utils';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  total: number;
  onSuccess: () => void;
}

export function CheckoutModal({ isOpen, total, onClose, onSuccess }: CheckoutModalProps) {
  const [step, setStep] = useState<'form' | 'processing' | 'success'>('form');
  const [formData, setFormData] = useState({
    name: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
  });

  // Close on Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');
    
    // Mock processing delay
    setTimeout(() => {
      setStep('success');
      // Final delay before closing and clearing cart
      setTimeout(() => {
        onSuccess();
        onClose();
        // Reset for next time
        setTimeout(() => setStep('form'), 500);
      }, 2500);
    }, 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[250] flex items-center justify-center p-6 bg-charcoal/90 backdrop-blur-2xl"
          role="dialog"
          aria-modal="true"
          aria-labelledby="checkout-title"
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            className="bg-ink border border-white/10 w-full max-w-lg p-10 shadow-2xl relative overflow-hidden"
          >
            <button 
              onClick={onClose} 
              className="absolute top-6 right-6 text-text-muted hover:text-text-main transition-colors focus-visible:outline-gold z-10"
              aria-label="Close checkout"
            >
              <X size={20} strokeWidth={1.5} />
            </button>

            {step === 'form' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-8"
              >
                <div className="text-center mb-10">
                  <span className="text-gold text-[10px] tracking-[0.3em] uppercase mb-4 block font-medium">Secure Checkout</span>
                  <h3 id="checkout-title" className="text-3xl font-serif text-text-main">Finalize Consultation</h3>
                  <p className="text-text-muted text-xs mt-2 uppercase tracking-widest">Total Amount: {formatCurrency(total)}</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-text-muted ml-1" htmlFor="name">
                      Cardholder Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full bg-white/[0.03] border border-white/10 py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-gold/50 transition-colors text-text-main"
                        placeholder="Johnathan Doe"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-text-muted ml-1" htmlFor="cardNumber">
                      Card Number
                    </label>
                    <div className="relative">
                      <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                      <input
                        id="cardNumber"
                        name="cardNumber"
                        type="text"
                        required
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        className="w-full bg-white/[0.03] border border-white/10 py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-gold/50 transition-colors text-text-main"
                        placeholder="•••• •••• •••• ••••"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-text-muted ml-1" htmlFor="expiry">
                        Expiry Date
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                        <input
                          id="expiry"
                          name="expiry"
                          type="text"
                          required
                          value={formData.expiry}
                          onChange={handleInputChange}
                          className="w-full bg-white/[0.03] border border-white/10 py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-gold/50 transition-colors text-text-main"
                          placeholder="MM / YY"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-text-muted ml-1" htmlFor="cvc">
                        CVC
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                        <input
                          id="cvc"
                          name="cvc"
                          type="text"
                          required
                          value={formData.cvc}
                          onChange={handleInputChange}
                          className="w-full bg-white/[0.03] border border-white/10 py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-gold/50 transition-colors text-text-main"
                          placeholder="•••"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button
                      type="submit"
                      className="w-full py-4"
                    >
                      Complete Purchase
                    </Button>
                  </div>
                </form>

                <div className="flex items-center justify-center space-x-4 pt-4 border-t border-white/5">
                  <div className="flex items-center text-[10px] text-text-muted uppercase tracking-widest">
                    <ShieldCheck size={14} className="mr-2 text-gold/50" />
                    SSL Secure
                  </div>
                  <div className="w-px h-3 bg-white/10" />
                  <div className="text-[10px] text-text-muted uppercase tracking-widest">
                    PCI Compliant
                  </div>
                </div>
              </motion.div>
            )}

            {step === 'processing' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-20 flex flex-col items-center justify-center text-center"
              >
                <Loader2 className="text-gold animate-spin mb-8" size={48} strokeWidth={1} />
                <h3 className="text-2xl font-serif text-text-main mb-2">Processing Transaction</h3>
                <p className="text-text-muted text-xs uppercase tracking-widest">Verifying with secure gateway...</p>
              </motion.div>
            )}

            {step === 'success' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-20 flex flex-col items-center justify-center text-center"
              >
                <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mb-8">
                  <CheckCircle2 className="text-gold" size={40} strokeWidth={1.5} />
                </div>
                <h3 className="text-3xl font-serif text-text-main mb-4">Payment Successful</h3>
                <p className="text-text-muted text-sm font-light leading-relaxed max-w-xs mx-auto">
                  Your consultation has been secured. An engineer will reach out shortly to finalize the technical roadmap.
                </p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
