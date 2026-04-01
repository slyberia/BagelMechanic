// src/components/layout/Navbar.tsx
import { motion } from 'motion/react';
import { ShoppingBag, Menu, X, Sun, Moon, User as UserIcon, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';
import { useTheme } from '../../lib/ThemeContext';
import { auth } from '../../lib/firebase';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { LoginModal } from '../auth/LoginModal';

interface NavbarProps {
  onCartOpen: () => void;
  cartCount: number;
  onViewChange: (view: any) => void;
  currentView: any;
  user: User | null;
  isAdmin: boolean;
}

export function Navbar({ onCartOpen, cartCount, onViewChange, currentView, user, isAdmin }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      onViewChange('landing');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const navLinks = [
    { name: 'Services', type: 'scroll', href: 'services' },
    { name: 'Process', type: 'view', view: 'process' },
    { name: 'About', type: 'view', view: 'about' },
    { name: 'Testimonials', type: 'view', view: 'testimonials' },
    { name: 'Location', type: 'view', view: 'location' },
  ];

  return (
    <>
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only fixed top-4 left-4 z-[100] bg-gold text-charcoal px-4 py-2 text-xs uppercase tracking-widest font-bold"
      >
        Skip to content
      </a>
      
      <nav
        aria-label="Main Navigation"
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-700 px-6 md:px-12',
          isScrolled ? 'py-4 bg-charcoal/90 backdrop-blur-md border-b border-white/5' : 'py-8 bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onViewChange('landing');
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl md:text-2xl font-serif tracking-[0.15em] uppercase focus-visible:outline-gold"
            aria-label="Elite Engineer Home"
          >
            Elite <span className="text-gold">Engineer</span>
          </motion.a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-12">
            <div className="flex items-center space-x-8">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => {
                    if (link.type === 'scroll') {
                      if (currentView !== 'landing') {
                        onViewChange('landing');
                        setTimeout(() => {
                          const el = document.getElementById(link.href);
                          el?.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                      } else {
                        const el = document.getElementById(link.href);
                        el?.scrollIntoView({ behavior: 'smooth' });
                      }
                    } else if (link.type === 'view') {
                      onViewChange(link.view as any);
                    }
                  }}
                  className={cn(
                    "text-xs uppercase tracking-[0.2em] transition-colors focus-visible:outline-gold",
                    (link.type === 'view' && currentView === link.view) 
                      ? "text-gold" 
                      : "text-text-muted hover:text-text-main"
                  )}
                >
                  {link.name}
                </button>
              ))}
            </div>
            
            <div className="flex items-center space-x-6 pl-6 border-l border-white/10">
              <button
                onClick={toggleTheme}
                className="p-2 text-text-muted hover:text-text-main transition-colors focus-visible:outline-gold"
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {theme === 'dark' ? <Sun size={20} strokeWidth={1.5} /> : <Moon size={20} strokeWidth={1.5} />}
              </button>

              <button
                id="nav-cart-toggle"
                onClick={onCartOpen}
                className="relative p-2 text-text-muted hover:text-text-main transition-colors focus-visible:outline-gold"
                aria-label={`Open shopping cart, ${cartCount} items`}
              >
                <ShoppingBag size={20} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span id="cart-count" className="absolute top-0 right-0 w-4 h-4 bg-gold text-charcoal text-[10px] font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
              
              {user ? (
                <div className="flex items-center space-x-4">
                  <button
                    id="nav-dashboard"
                    onClick={() => onViewChange(currentView === 'dashboard' ? 'landing' : 'dashboard')}
                    className="flex items-center space-x-2 text-xs uppercase tracking-widest text-text-muted hover:text-text-main transition-colors focus-visible:outline-gold"
                    aria-label={currentView === 'dashboard' ? 'Return to landing page' : (isAdmin ? 'View admin portal' : 'View your dashboard')}
                  >
                    <UserIcon size={16} strokeWidth={1.5} />
                    <span>{currentView === 'dashboard' ? 'Home' : (isAdmin ? 'Admin Portal' : 'Dashboard')}</span>
                  </button>
                  <button
                    id="nav-sign-out"
                    onClick={handleSignOut}
                    className="flex items-center space-x-2 text-xs uppercase tracking-widest text-text-muted hover:text-text-main transition-colors focus-visible:outline-gold"
                    aria-label="Sign out"
                  >
                    <LogOut size={16} strokeWidth={1.5} />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <button
                  id="nav-client-login"
                  onClick={() => setIsLoginModalOpen(true)}
                  className="flex items-center space-x-2 text-xs uppercase tracking-widest text-text-muted hover:text-text-main transition-colors focus-visible:outline-gold"
                  aria-label="Client login"
                >
                  <UserIcon size={16} strokeWidth={1.5} />
                  <span>Client Login</span>
                </button>
              )}
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                aria-label="Book a consultation"
              >
                Book Now
              </Button>
            </div>
          </div>

          {/* Mobile Toggle */}
          <div className="flex md:hidden items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 text-text-muted"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={20} strokeWidth={1.5} /> : <Moon size={20} strokeWidth={1.5} />}
            </button>
            <button 
              onClick={onCartOpen} 
              className="relative p-2 text-text-muted"
              aria-label={`Open cart, ${cartCount} items`}
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-gold text-charcoal text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle mobile menu"
              className="text-text-main"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 right-0 bg-charcoal border-b border-white/10 p-8 flex flex-col space-y-6 md:hidden"
          >
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => {
                  if (link.type === 'scroll') {
                    if (currentView !== 'landing') {
                      onViewChange('landing');
                      setTimeout(() => {
                        const el = document.getElementById(link.href);
                        el?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    } else {
                      const el = document.getElementById(link.href);
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }
                  } else if (link.type === 'view') {
                    onViewChange(link.view as any);
                  }
                  setIsMobileMenuOpen(false);
                }}
                className={cn(
                  "text-sm uppercase tracking-[0.2em] transition-colors text-left",
                  (link.type === 'view' && currentView === link.view) 
                    ? "text-gold" 
                    : "text-text-muted hover:text-text-main"
                )}
              >
                {link.name}
              </button>
            ))}
            {user ? (
              <>
                <button
                  onClick={() => {
                    onViewChange(currentView === 'dashboard' ? 'landing' : 'dashboard');
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-sm uppercase tracking-[0.2em] text-text-muted hover:text-text-main text-left"
                >
                  {currentView === 'dashboard' ? 'Home' : (isAdmin ? 'Admin Portal' : 'Dashboard')}
                </button>
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-sm uppercase tracking-[0.2em] text-text-muted hover:text-text-main text-left"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setIsLoginModalOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="text-sm uppercase tracking-[0.2em] text-text-muted hover:text-text-main text-left"
              >
                Client Login
              </button>
            )}
          </motion.div>
        )}
      </nav>

      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </>
  );
}
