// src/components/ui/Button.tsx
import { motion, HTMLMotionProps } from 'motion/react';
import { cn } from '../../lib/utils';
import React from 'react';

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const variants = {
      primary: 'bg-gold text-charcoal hover:bg-white transition-colors duration-500',
      outline: 'border border-gold/50 text-gold hover:border-white hover:text-white transition-all duration-500',
      ghost: 'text-white/70 hover:text-white transition-colors duration-500',
    };

    const sizes = {
      sm: 'px-4 py-2 text-xs tracking-widest uppercase',
      md: 'px-8 py-4 text-sm tracking-[0.2em] uppercase font-medium',
      lg: 'px-12 py-6 text-base tracking-[0.3em] uppercase font-semibold',
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          'inline-flex items-center justify-center focus:outline-none disabled:opacity-50 disabled:pointer-events-none',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
