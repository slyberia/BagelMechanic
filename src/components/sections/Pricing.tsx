// src/components/sections/Pricing.tsx
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db, isFirebaseReady } from '../../lib/firebase';
import { SERVICES } from '../../constants/services';
import { Button } from '../ui/Button';
import { Check, Loader2 } from 'lucide-react';
import { formatCurrency } from '../../lib/utils';
import { Service } from '../../types';

interface PricingProps {
  onSelect: (service: Service) => void;
}

export function Pricing({ onSelect }: PricingProps) {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      if (!isFirebaseReady || !db) {
        console.warn('Firestore is not ready. Using local services fallback.');
        setServices(SERVICES);
        setLoading(false);
        return;
      }

      try {
        const q = query(collection(db, 'site_services'), orderBy('price', 'asc'));
        const querySnapshot = await getDocs(q);
        const servicesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Service[];
        
        // If no services in Firestore, fallback to constants for initial setup
        if (servicesData.length === 0) {
          setServices(SERVICES);
        } else {
          setServices(servicesData);
        }
      } catch (err) {
        console.error('Error fetching services:', err);
        setServices(SERVICES); // Fallback on error
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <section id="services" className="py-32" aria-labelledby="services-heading">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
          <div className="max-w-xl">
            <h2 id="services-heading" className="text-4xl md:text-6xl mb-6 text-text-main">Service Tiers</h2>
            <p className="text-text-muted font-light leading-relaxed">
              Select a consultation level tailored to your vehicle's specific engineering needs. 
              Each session is conducted by a senior automotive engineer.
            </p>
          </div>
          <div className="text-right hidden md:block">
            <span className="text-gold text-sm tracking-[0.3em] uppercase font-medium">Bespoke Options Available</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {loading ? (
            // Loading Skeletons
            [...Array(3)].map((_, i) => (
              <div key={i} className="p-10 bg-white/[0.02] border border-white/5 animate-pulse flex flex-col h-[600px]">
                <div className="h-8 w-3/4 bg-white/5 mb-4" />
                <div className="h-4 w-1/4 bg-white/5 mb-8" />
                <div className="h-10 w-1/2 bg-white/5 mb-8" />
                <div className="h-20 w-full bg-white/5 mb-10" />
                <div className="space-y-4 flex-grow">
                  {[...Array(5)].map((_, j) => (
                    <div key={j} className="h-3 w-full bg-white/5" />
                  ))}
                </div>
                <div className="h-12 w-full bg-white/5 mt-12" />
              </div>
            ))
          ) : (
            services.map((service, index) => (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative p-10 bg-white/[0.02] border border-white/5 hover:border-gold/30 transition-all duration-700 flex flex-col group overflow-hidden"
              >
                {service.image && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gold/0 group-hover:bg-gold transition-all duration-700 z-10" />
                )}
                
                {service.image && (
                  <div className="mb-8 -mx-10 -mt-10 h-48 overflow-hidden border-b border-white/5">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}

                <div className="mb-8">
                  <h3 className="text-2xl font-serif mb-2 text-text-main">{service.title}</h3>
                  <span className="text-xs text-text-muted uppercase tracking-widest">{service.duration}</span>
                </div>
                
                <div className="mb-8">
                  <span className="text-4xl font-light text-text-main">{formatCurrency(service.price)}</span>
                  {service.id.includes('elite') && <span className="text-text-muted text-sm ml-2">/ starting</span>}
                </div>

                <p className="text-text-muted text-sm mb-10 font-light leading-relaxed min-h-[60px]">
                  {service.description}
                </p>

                <ul className="space-y-4 mb-12 flex-grow" aria-label={`Features of ${service.title}`}>
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start text-xs text-text-muted font-light tracking-wide">
                      <Check className="w-4 h-4 text-gold/50 mr-3 shrink-0" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button 
                  variant={index === 1 ? 'primary' : 'outline'} 
                  className="w-full"
                  onClick={() => onSelect(service)}
                  aria-label={`Select ${service.title} for ${formatCurrency(service.price)}`}
                >
                  Book Now
                </Button>
              </motion.article>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
