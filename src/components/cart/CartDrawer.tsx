// src/components/cart/CartDrawer.tsx
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import { useEffect } from 'react';
import { CartItem } from '../../types';
import { formatCurrency } from '../../lib/utils';
import { Button } from '../ui/Button';
import { useCart } from '../../contexts/CartContext';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export function CartDrawer({ isOpen, onClose, onCheckout }: CartDrawerProps) {
  const { cart: items, cartTotal: total, removeFromCart: onRemove, clearCart: onClear } = useCart();

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[150] bg-charcoal/60 backdrop-blur-sm"
            aria-hidden="true"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 z-[200] w-full max-w-md bg-ink border-l border-white/10 flex flex-col shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
          >
            <div className="p-8 border-b border-white/5 flex items-center justify-between">
              <div className="flex flex-col">
                <h2 id="cart-title" className="text-xl font-serif tracking-widest uppercase text-text-main">Your Selection</h2>
                {items.length > 0 && (
                  <button 
                    onClick={onClear}
                    className="text-[10px] uppercase tracking-widest text-gold/60 hover:text-gold transition-colors text-left mt-1"
                  >
                    Clear Selection
                  </button>
                )}
              </div>
              <button 
                onClick={onClose} 
                className="p-2 text-text-muted hover:text-text-main transition-colors focus-visible:outline-gold"
                aria-label="Close cart"
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-8 space-y-8">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-30">
                  <ShoppingBag size={48} strokeWidth={1} className="mb-6 text-text-main" aria-hidden="true" />
                  <p className="text-sm tracking-[0.2em] uppercase text-text-main">Your cart is empty</p>
                </div>
              ) : (
                <ul className="space-y-8" aria-label="Cart items">
                  {items.map((item) => (
                    <li key={item.id} className="flex justify-between items-start group">
                      <div className="max-w-[70%]">
                        <h4 className="text-sm font-serif mb-1 tracking-wide text-text-main">{item.title}</h4>
                        <p className="text-[10px] text-text-muted uppercase tracking-widest mb-2">{item.duration}</p>
                        <span className="text-gold text-sm font-medium">{formatCurrency(item.price)}</span>
                      </div>
                      <button
                        onClick={() => onRemove(item.id)}
                        className="p-2 text-text-muted hover:text-red-400 transition-colors md:opacity-0 group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-gold"
                        aria-label={`Remove ${item.title} from cart`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-8 bg-white/[0.02] border-t border-white/5 space-y-6">
                <div className="flex justify-between items-end">
                  <span className="text-xs text-text-muted uppercase tracking-widest">Subtotal</span>
                  <span className="text-2xl font-serif text-gold font-medium">{formatCurrency(total)}</span>
                </div>
                <Button 
                  className="w-full" 
                  onClick={onCheckout}
                  aria-label={`Proceed to checkout, total ${formatCurrency(total)}`}
                >
                  Proceed to Checkout
                </Button>
                <p className="text-[10px] text-center text-text-muted uppercase tracking-[0.2em]">
                  Secure encrypted transaction
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
