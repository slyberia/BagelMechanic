// src/components/dashboard/ClientDashboard.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Calendar, 
  Clock, 
  ChevronRight, 
  User, 
  Settings, 
  LogOut, 
  Loader2, 
  AlertCircle,
  Plus,
  Car,
  Info,
  X,
  CheckCircle2
} from 'lucide-react';
import { db, auth, isFirebaseReady } from '../../lib/firebase';
import { collection, query, where, getDocs, orderBy, addDoc, serverTimestamp } from 'firebase/firestore';
import { format, isAfter, parseISO } from 'date-fns';
import { formatCurrency, cn } from '../../lib/utils';
import { decodeVin, DecodedVehicle } from '../../lib/vinDecoder';
import { Vehicle } from '../../types';
import { Button } from '../ui/Button';
import { AnimatePresence } from 'motion/react';
import { trackEvent } from '../../lib/analytics';

interface Booking {
  id: string;
  serviceTitle: string;
  date: string;
  time: string;
  price: number;
  status: string;
}

export function ClientDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Vehicle Modal State
  const [isVehicleModalOpen, setIsVehicleModalOpen] = useState(false);
  const [vin, setVin] = useState('');
  const [isDecoding, setIsDecoding] = useState(false);
  const [decodedVehicle, setDecodedVehicle] = useState<DecodedVehicle | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const fetchVehicles = async () => {
    if (!isFirebaseReady || !db) {
      console.warn('Firestore is not ready. Skipping vehicle fetch.');
      return;
    }
    try {
      const user = auth.currentUser;
      if (!user) return;

      const q = query(
        collection(db, 'vehicles'),
        where('userId', '==', user.uid),
        orderBy('createdAt', 'desc')
      );

      const querySnapshot = await getDocs(q);
      const fetchedVehicles = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Vehicle[];

      setVehicles(fetchedVehicles);
    } catch (err) {
      console.error('Error fetching vehicles:', err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!isFirebaseReady || !db) {
        console.warn('Firestore is not ready. Using mock dashboard data.');
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      try {
        const user = auth.currentUser;
        if (!user) {
          throw new Error('User not authenticated');
        }

        const q = query(
          collection(db, 'bookings'),
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc')
        );

        const querySnapshot = await getDocs(q);
        const fetchedBookings = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Booking[];

        setBookings(fetchedBookings);
        await fetchVehicles();
      } catch (err: unknown) {
        // Mock Fallback
        const mockData: Booking[] = [
          {
            id: 'mock-1',
            serviceTitle: 'Elite Diagnostic Call',
            date: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
            time: '10:30 AM',
            price: 450,
            status: 'confirmed'
          },
          {
            id: 'mock-2',
            serviceTitle: 'Technical Roadmap Review',
            date: format(addDays(new Date(), -5), 'yyyy-MM-dd'),
            time: '02:00 PM',
            price: 850,
            status: 'completed'
          }
        ];
        setBookings(mockData);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleVinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase().replace(/[IOQ]/g, '');
    if (value.length <= 17) {
      setVin(value);
      setDecodedVehicle(null);
    }
  };

  const handleDecode = async () => {
    if (vin.length !== 17) {
      setError('VIN must be 17 characters.');
      return;
    }
    
    setIsDecoding(true);
    setError(null);
    
    const result = await decodeVin(vin);
    if (result && result.Make !== 'N/A') {
      trackEvent('VIN_Decoded', { vin, make: result.Make, model: result.Model });
      setDecodedVehicle(result);
    } else {
      setError('Invalid VIN or could not decode. Please check and try again.');
    }
    setIsDecoding(false);
  };

  const handleSaveVehicle = async () => {
    if (!decodedVehicle) return;

    try {
      const user = auth.currentUser;
      if (!user) return;

      await addDoc(collection(db, 'vehicles'), {
        userId: user.uid,
        vin,
        year: decodedVehicle.ModelYear,
        make: decodedVehicle.Make,
        model: decodedVehicle.Model,
        cylinders: decodedVehicle.EngineCylinders,
        driveType: decodedVehicle.DriveType,
        createdAt: serverTimestamp()
      });

      setSaveSuccess(true);
      await fetchVehicles();
      
      setTimeout(() => {
        setIsVehicleModalOpen(false);
        setSaveSuccess(false);
        setVin('');
        setDecodedVehicle(null);
      }, 2000);
    } catch (err) {
      console.error('Error saving vehicle:', err);
      setError('Failed to save vehicle to your garage.');
    }
  };

  const upcoming = bookings.filter(b => isAfter(parseISO(b.date), new Date()) || b.status === 'pending');
  const past = bookings.filter(b => !isAfter(parseISO(b.date), new Date()) && b.status !== 'pending');

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="text-gold animate-spin" size={32} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-24">
      <header className="mb-16">
        <span className="text-gold text-[10px] tracking-[0.3em] uppercase mb-4 block font-medium">Client Portal</span>
        <h2 className="text-4xl md:text-5xl font-serif text-text-main mb-4">Your Consultations</h2>
        <p className="text-text-muted font-light max-w-xl">Manage your upcoming technical sessions and review past roadmap discussions.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-16">
          {/* Upcoming */}
          <section>
            <h3 className="text-sm tracking-[0.2em] uppercase mb-8 flex items-center text-text-main">
              <Clock size={16} className="mr-3 text-gold/50" />
              Upcoming Sessions
            </h3>
            {upcoming.length > 0 ? (
              <div className="space-y-4">
                {upcoming.map((booking) => (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="group bg-white/[0.02] border border-white/5 p-8 flex flex-col md:flex-row md:items-center justify-between hover:border-gold/30 transition-all duration-500"
                  >
                    <div>
                      <h4 className="text-xl font-serif mb-2 text-text-main">{booking.serviceTitle}</h4>
                      <div className="flex items-center space-x-6 text-xs text-text-muted tracking-wide">
                        <span className="flex items-center">
                          <Calendar size={14} className="mr-2 text-gold/50" />
                          {format(parseISO(booking.date), 'MMMM d, yyyy')}
                        </span>
                        <span className="flex items-center">
                          <Clock size={14} className="mr-2 text-gold/50" />
                          {booking.time}
                        </span>
                      </div>
                    </div>
                    <div className="mt-6 md:mt-0 flex items-center space-x-8">
                      <div className="text-right">
                        <span className="block text-[10px] uppercase tracking-widest text-text-muted mb-1">Status</span>
                        <span className="text-gold text-xs uppercase tracking-widest">{booking.status}</span>
                      </div>
                      <button className="p-3 bg-white/5 rounded-full text-text-muted group-hover:text-gold group-hover:bg-gold/10 transition-all duration-500">
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="p-12 border border-dashed border-white/10 text-center">
                <p className="text-text-muted text-sm font-light">No upcoming consultations scheduled.</p>
              </div>
            )}
          </section>

          {/* My Garage */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-sm tracking-[0.2em] uppercase flex items-center text-text-main">
                <Car size={16} className="mr-3 text-gold/50" />
                My Garage
              </h3>
              <button 
                id="add-vehicle-modal-button"
                onClick={() => setIsVehicleModalOpen(true)}
                className="flex items-center space-x-2 text-[10px] uppercase tracking-[0.2em] text-gold hover:text-text-main transition-colors"
              >
                <Plus size={14} />
                <span>Add Vehicle</span>
              </button>
            </div>

            {vehicles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {vehicles.map((vehicle) => (
                  <motion.div
                    key={vehicle.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white/[0.02] border border-white/5 p-6 hover:border-gold/30 transition-all duration-500"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-gold mb-1 block">{vehicle.year}</span>
                        <h4 className="text-lg font-serif text-text-main">{vehicle.make} {vehicle.model}</h4>
                      </div>
                      <div className="p-2 bg-white/5 rounded text-text-muted">
                        <Car size={16} />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                      <div>
                        <span className="block text-[8px] uppercase tracking-widest text-text-muted mb-1">Engine</span>
                        <span className="text-[10px] text-text-main uppercase tracking-wider">{vehicle.cylinders} Cylinders</span>
                      </div>
                      <div>
                        <span className="block text-[8px] uppercase tracking-widest text-text-muted mb-1">Drive</span>
                        <span className="text-[10px] text-text-main uppercase tracking-wider">{vehicle.driveType}</span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <span className="block text-[8px] uppercase tracking-widest text-text-muted mb-1">VIN</span>
                      <span className="text-[10px] text-text-muted font-mono tracking-tighter">{vehicle.vin}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="p-12 border border-dashed border-white/10 text-center">
                <p className="text-text-muted text-sm font-light mb-6">Your garage is currently empty.</p>
                <button 
                  onClick={() => setIsVehicleModalOpen(true)}
                  className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold border-b border-gold/30 pb-1 hover:border-gold transition-all"
                >
                  Register First Vehicle
                </button>
              </div>
            )}
          </section>

          {/* Past */}
          <section>
            <h3 className="text-sm tracking-[0.2em] uppercase mb-8 flex items-center text-text-main">
              <Calendar size={16} className="mr-3 text-gold/50" />
              Past Consultations
            </h3>
            {past.length > 0 ? (
              <div className="space-y-4">
                {past.map((booking) => (
                  <div
                    key={booking.id}
                    className="bg-white/[0.01] border border-white/5 p-6 flex items-center justify-between opacity-60 hover:opacity-100 transition-opacity duration-500"
                  >
                    <div>
                      <h4 className="text-lg font-serif mb-1 text-text-main">{booking.serviceTitle}</h4>
                      <p className="text-[10px] text-text-muted uppercase tracking-widest">
                        {format(parseISO(booking.date), 'MMM d, yyyy')} • {booking.time}
                      </p>
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-text-muted">
                      {formatCurrency(booking.price)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 border border-dashed border-white/10 text-center">
                <p className="text-text-muted text-sm font-light">Your consultation history is currently empty.</p>
              </div>
            )}
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-8">
          <div className="bg-white/[0.02] border border-white/5 p-8">
            <h4 className="text-sm tracking-[0.2em] uppercase mb-6 text-text-main">Account Details</h4>
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center text-gold">
                <User size={24} strokeWidth={1.5} />
              </div>
              <div>
                <span className="block text-sm text-text-main">{auth.currentUser?.email}</span>
                <span className="text-[10px] text-text-muted uppercase tracking-widest">Premium Member</span>
              </div>
            </div>
            <div className="space-y-4">
              <button className="w-full flex items-center justify-between p-4 bg-white/5 text-xs tracking-widest uppercase text-text-muted hover:text-text-main transition-colors">
                <span className="flex items-center">
                  <Settings size={14} className="mr-3" />
                  Settings
                </span>
                <ChevronRight size={14} />
              </button>
              <button 
                onClick={() => auth.signOut()}
                className="w-full flex items-center p-4 bg-white/5 text-xs tracking-widest uppercase text-red-500/70 hover:text-red-500 transition-colors"
              >
                <LogOut size={14} className="mr-3" />
                Sign Out
              </button>
            </div>
          </div>

          <div className="bg-gold/5 border border-gold/10 p-8">
            <h4 className="text-sm tracking-[0.2em] uppercase mb-4 text-gold">Need Support?</h4>
            <p className="text-xs text-text-muted leading-relaxed mb-6">
              Our priority support line is available 24/7 for premium consulting clients.
            </p>
            <button className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold border-b border-gold/30 pb-1 hover:border-gold transition-all">
              Contact Engineer
            </button>
          </div>
        </aside>
      </div>

      {/* Add Vehicle Modal */}
      <AnimatePresence>
        {isVehicleModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsVehicleModalOpen(false)}
              className="absolute inset-0 bg-charcoal/90 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-charcoal border border-white/10 p-10 shadow-2xl"
            >
              <header className="flex items-center justify-between mb-10">
                <h3 className="text-2xl font-serif tracking-widest uppercase text-text-main">
                  Register <span className="text-gold italic">Vehicle</span>
                </h3>
                <button 
                  onClick={() => setIsVehicleModalOpen(false)}
                  className="p-2 text-text-muted hover:text-text-main transition-colors"
                >
                  <X size={24} strokeWidth={1.5} />
                </button>
              </header>

              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-text-muted font-medium">17-Character VIN</label>
                    <div className="group relative">
                      <Info size={14} className="text-gold/50 cursor-help" />
                      <div className="absolute bottom-full right-0 mb-2 w-64 p-4 bg-ink border border-white/10 backdrop-blur-xl hidden group-hover:block z-20 shadow-2xl">
                        <p className="text-[10px] font-serif text-gold mb-2 uppercase tracking-widest">Vehicle Identification Number</p>
                        <p className="text-[8px] leading-relaxed text-text-muted uppercase tracking-widest mb-3">
                          A unique 17-character code that serves as your vehicle's fingerprint. It identifies the manufacturer, specifications, and history.
                        </p>
                        <p className="text-[8px] leading-relaxed text-text-muted uppercase tracking-widest mb-3">
                          Located on the driver's side dashboard (visible through the windshield) or the driver's side door jamb.
                        </p>
                        <a 
                          href="https://www.nhtsa.gov/vin-decoder" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-[8px] text-gold hover:underline uppercase tracking-widest block"
                        >
                          Detailed Explanation →
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <input 
                      id="vin-input"
                      type="text"
                      value={vin}
                      onChange={handleVinChange}
                      className="w-full bg-white/[0.03] border border-white/10 px-6 py-4 text-sm text-text-main font-mono focus:outline-none focus:border-gold/50 transition-colors uppercase"
                      placeholder="ENTER VIN..."
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                      <span className={cn(
                        "text-[10px] font-mono",
                        vin.length === 17 ? "text-gold" : "text-text-muted/30"
                      )}>
                        {vin.length}/17
                      </span>
                    </div>
                  </div>
                  <p className="text-[8px] text-text-muted/50 uppercase tracking-widest">Note: Letters I, O, and Q are invalid in VINs.</p>
                </div>

                {error && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 flex items-center space-x-3">
                    <AlertCircle size={16} />
                    <span className="text-[10px] uppercase tracking-widest">{error}</span>
                  </div>
                )}

                {decodedVehicle ? (
                  <motion.div 
                    id="decoded-vehicle-info"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 bg-white/[0.02] border border-gold/30"
                  >
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <span className="block text-[8px] uppercase tracking-widest text-text-muted mb-1">Make</span>
                        <span className="text-xs text-text-main font-serif">{decodedVehicle.Make}</span>
                      </div>
                      <div>
                        <span className="block text-[8px] uppercase tracking-widest text-text-muted mb-1">Model</span>
                        <span className="text-xs text-text-main font-serif">{decodedVehicle.Model}</span>
                      </div>
                      <div>
                        <span className="block text-[8px] uppercase tracking-widest text-text-muted mb-1">Year</span>
                        <span className="text-xs text-text-main font-serif">{decodedVehicle.ModelYear}</span>
                      </div>
                      <div>
                        <span className="block text-[8px] uppercase tracking-widest text-text-muted mb-1">Engine</span>
                        <span className="text-xs text-text-main font-serif">{decodedVehicle.EngineCylinders} Cyl</span>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <div className="flex gap-4">
                    <Button 
                      id="decode-vin-button"
                      disabled={vin.length !== 17 || isDecoding}
                      onClick={handleDecode}
                      className="flex-1"
                    >
                      {isDecoding ? (
                        <Loader2 className="animate-spin mx-auto" size={18} />
                      ) : (
                        'Decode VIN'
                      )}
                    </Button>
                    <Button 
                      id="decode-vin-button-secondary"
                      disabled={vin.length !== 17 || isDecoding}
                      onClick={handleDecode}
                      className="flex-1"
                    >
                      {isDecoding ? (
                        <Loader2 className="animate-spin mx-auto" size={18} />
                      ) : (
                        'Decode VIN'
                      )}
                    </Button>
                  </div>
                )}

                {decodedVehicle && (
                  <div className="flex items-center space-x-4 pt-6 border-t border-white/5">
                    <button 
                      onClick={() => setDecodedVehicle(null)}
                      className="flex-1 px-8 py-4 text-[10px] uppercase tracking-[0.2em] text-text-muted hover:text-text-main transition-colors"
                    >
                      Reset
                    </button>
                    <Button 
                      id="save-vehicle-button"
                      onClick={handleSaveVehicle}
                      disabled={saveSuccess}
                      className="flex-1"
                    >
                      {saveSuccess ? (
                        <div className="flex items-center justify-center space-x-2">
                          <CheckCircle2 size={18} />
                          <span>Saved</span>
                        </div>
                      ) : (
                        'Add to Garage'
                      )}
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
