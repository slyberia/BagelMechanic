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
import { Service } from './types/index';
import { ThemeProvider } from './lib/ThemeContext';
import { ErrorBoundary } from './components/layout/ErrorBoundary';
import { AnimatePresence } from 'motion/react';
import { Toaster } from 'sonner';

import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CartProvider, useCart } from './contexts/CartContext';

function AppContent() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const { currentView, setCurrentView, isAdmin } = useAuth();
  const { cartTotal, clearCart, addToCart } = useCart();

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  const handleBookNow = (service: Service) => {
    addToCart(service);
    setIsCartOpen(true);
  };

  const handleCheckoutSuccess = () => {
    clearCart();
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
    <div className="min-h-screen bg-charcoal text-text-main selection:bg-gold selection:text-charcoal transition-colors duration-500">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-gold focus:text-charcoal focus:font-bold"
      >
        Skip to content
      </a>

      <Navbar
        onCartOpen={() => setIsCartOpen(true)}
      />

      <main id="main-content">
        {renderView()}
      </main>

      <Footer onViewChange={setCurrentView} />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        total={cartTotal}
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
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            <Toaster position="top-right" theme="dark" richColors />
            <AppContent />
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;