import { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { HowItWorks } from './components/sections/HowItWorks';
import { Pricing } from './components/sections/Pricing';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/cart/CartDrawer';
import { BookingInterface } from './components/booking/BookingInterface';
import { ClientDashboard } from './components/dashboard/ClientDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { CheckoutModal } from './components/checkout/CheckoutModal';
import { Testimonials } from './components/pages/Testimonials';
import { Location } from './components/pages/Location';
import { Process } from './components/pages/Process';
import { About } from './components/pages/About';
import { PrivacyPolicy } from './components/pages/legal/PrivacyPolicy';
import { TermsOfService } from './components/pages/legal/TermsOfService';
import { ConsultationAgreement } from './components/pages/legal/ConsultationAgreement';
import { Service, CartItem } from './types/index';
import { ThemeProvider } from './lib/ThemeContext';
import { ErrorBoundary } from './components/layout/ErrorBoundary';
import { AnimatePresence } from 'motion/react';
import { auth, isFirebaseReady } from './lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { Toaster } from 'sonner';
import { trackEvent } from './lib/analytics';

type View = 
  | 'landing' 
  | 'dashboard' 
  | 'testimonials' 
  | 'location' 
  | 'process' 
  | 'about' 
  | 'privacy' 
  | 'terms' 
  | 'agreement';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [currentView, setCurrentView] = useState<View>('landing');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!isFirebaseReady || !auth) {
      console.warn('Firebase is not ready. Defaulting to logged-out state.');
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
      setIsAdmin(!!currentUser && !!adminEmail && currentUser.email === adminEmail);
      
      if (!currentUser && currentView === 'dashboard') {
        setCurrentView('landing');
      }
    });

    return () => unsubscribe();
  }, [currentView]);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  const addToCart = (service: Service) => {
    trackEvent('Cart_Added', { service: service.title, price: service.price });
    setCart(prev => {
      const existing = prev.find(item => item.id === service.id);
      if (existing) {
        return prev.map(item => 
          item.id === service.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...service, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    trackEvent('Cart_Cleared');
    setCart([]);
  };

  const handleBookNow = (service: Service) => {
    addToCart(service);
  };

  const handleCheckoutSuccess = () => {
    setCart([]);
    // Optionally redirect to dashboard or show a success message
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return isAdmin ? <AdminDashboard /> : <ClientDashboard />;
      case 'testimonials':
        return <Testimonials />;
      case 'location':
        return <Location />;
      case 'process':
        return <Process />;
      case 'about':
        return <About />;
      case 'privacy':
        return <PrivacyPolicy />;
      case 'terms':
        return <TermsOfService />;
      case 'agreement':
        return <ConsultationAgreement />;
      case 'landing':
      default:
        return (
          <>
            <Hero onBookNow={() => handleBookNow({ 
              id: 'consult', 
              title: 'Elite Consultation', 
              price: 450, 
              description: 'Initial deep-dive consultation',
              duration: '60 min',
              features: ['Full diagnostic', 'Technical roadmap']
            })} />
            <HowItWorks />
            <Pricing onSelect={handleBookNow} />
          </>
        );
    }
  };

  return (
    <ErrorBoundary>
      <ThemeProvider>
      <Toaster position="top-right" theme="dark" richColors />
      <div className="min-h-screen bg-charcoal text-text-main selection:bg-gold selection:text-charcoal transition-colors duration-500">
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-gold focus:text-charcoal focus:font-bold"
        >
          Skip to content
        </a>
        
        <Navbar 
          onCartOpen={() => setIsCartOpen(true)} 
          cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} 
          onViewChange={setCurrentView}
          currentView={currentView}
          user={user}
          isAdmin={isAdmin}
        />
        
        <main id="main-content">
          {renderView()}
        </main>

        <Footer onViewChange={setCurrentView} />

        <CartDrawer 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
          items={cart}
          onRemove={removeFromCart}
          onClear={clearCart}
          onCheckout={() => {
            setIsCartOpen(false);
            setIsCheckoutOpen(true);
          }}
        />

        <CheckoutModal 
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          total={cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}
          onSuccess={handleCheckoutSuccess}
        />

        <AnimatePresence>
          {isBookingOpen && selectedService && (
            <BookingInterface 
              service={selectedService}
              onClose={() => setIsBookingOpen(false)}
            />
          )}
        </AnimatePresence>
      </div>
    </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

