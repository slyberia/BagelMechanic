// src/components/admin/AdminDashboard.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Save, 
  X, 
  Loader2, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  DollarSign,
  FileText,
  Image as ImageIcon,
  Calendar,
  User as UserIcon,
  ChevronDown,
  Filter,
  Upload,
  Eye,
  Music,
  File
} from 'lucide-react';
import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy,
  Timestamp,
  onSnapshot
} from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, storage, isFirebaseReady } from '../../lib/firebase';
import { Service, Booking } from '../../types';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';
import { toast } from 'sonner';

type AdminTab = 'services' | 'bookings';

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<AdminTab>('bookings');
  const [services, setServices] = useState<Service[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    duration: '',
    features: '',
    image: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [viewingMedia, setViewingMedia] = useState<Booking | null>(null);

  const fetchServices = async () => {
    if (!isFirebaseReady || !db) {
      console.warn('Firestore is not ready. Admin services view will be empty.');
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
      setServices(servicesData);
    } catch (err) {
      console.error('Error fetching services:', err);
      setError('Failed to load services.');
    }
  };

  const fetchBookings = () => {
    if (!isFirebaseReady || !db) {
      console.warn('Firestore is not ready. Admin bookings view will be empty.');
      setLoading(false);
      return;
    }
    try {
      const q = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));
      
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const bookingsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Booking[];
        
        // Handle real-time notifications for new bookings
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            const newBooking = change.doc.data() as Booking;
            // Only notify if it's not the initial load (check createdAt)
            // Or if it's a very recent booking
            const isRecent = newBooking.createdAt && 
              (Date.now() - newBooking.createdAt.toMillis() < 10000);
            
            if (isRecent) {
              toast.success('New Booking Received', {
                description: `${newBooking.userEmail} booked ${newBooking.serviceTitle}`,
                duration: 5000,
              });
            }
          }
        });

        if (bookingsData.length === 0) {
          setBookings(MOCK_BOOKINGS);
        } else {
          setBookings(bookingsData);
        }
        setLoading(false);
      }, (err) => {
        console.error('Error fetching bookings:', err);
        setBookings(MOCK_BOOKINGS);
        setError('Failed to load real-time bookings. Showing mock data.');
        setLoading(false);
      });

      return unsubscribe;
    } catch (err) {
      console.error('Error setting up bookings listener:', err);
      setBookings(MOCK_BOOKINGS);
      setError('Failed to load real-time bookings. Showing mock data.');
      setLoading(false);
      return () => {};
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchServices();
    const unsubscribeBookings = fetchBookings();
    
    return () => {
      unsubscribeBookings();
    };
  }, []);

  const handleOpenModal = (service?: Service) => {
    if (service) {
      setEditingService(service);
      setFormData({
        title: service.title,
        description: service.description,
        price: service.price.toString(),
        duration: service.duration,
        features: service.features.join(', '),
        image: service.image || ''
      });
    } else {
      setEditingService(null);
      setFormData({
        title: '',
        description: '',
        price: '',
        duration: '',
        features: '',
        image: ''
      });
    }
    setIsModalOpen(true);
    setError(null);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setUploadProgress(0);

    const storageRef = ref(storage, `services/${Date.now()}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error('Upload error:', error);
        setError('Failed to upload image.');
        setUploadingImage(false);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setFormData(prev => ({ ...prev, image: downloadURL }));
        setUploadingImage(false);
        setUploadProgress(0);
      }
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const serviceData = {
      title: formData.title,
      description: formData.description,
      price: parseFloat(formData.price),
      duration: formData.duration,
      features: formData.features.split(',').map(f => f.trim()).filter(f => f !== ''),
      image: formData.image || null
    };

    try {
      if (editingService) {
        await updateDoc(doc(db, 'site_services', editingService.id), serviceData);
        setSuccess('Service updated successfully');
      } else {
        await addDoc(collection(db, 'site_services'), serviceData);
        setSuccess('Service created successfully');
      }
      setIsModalOpen(false);
      fetchServices();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error('Error saving service:', err);
      setError('Failed to save service.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    
    try {
      await deleteDoc(doc(db, 'site_services', id));
      setSuccess('Service deleted successfully');
      fetchServices();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error('Error deleting service:', err);
      setError('Failed to delete service.');
    }
  };

  const handleUpdateBookingStatus = async (id: string, newStatus: Booking['status']) => {
    try {
      // Check if it's a mock booking (id starts with 'mock-')
      if (id.startsWith('mock-')) {
        setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
        setSuccess(`Mock status updated to ${newStatus}`);
        setTimeout(() => setSuccess(null), 3000);
        return;
      }

      await updateDoc(doc(db, 'bookings', id), { status: newStatus });
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
      setSuccess(`Booking status updated to ${newStatus}`);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error('Error updating booking status:', err);
      setError('Failed to update status.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-24">
      <header className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <span className="text-gold text-[10px] tracking-[0.3em] uppercase mb-4 block font-medium">
            Administrative Control
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-text-main">
            Elite <span className="italic text-gold">Operations</span>
          </h2>
        </div>
        
        <div className="flex bg-white/[0.03] border border-white/5 p-1">
          <button 
            id="admin-tab-bookings"
            onClick={() => setActiveTab('bookings')}
            className={cn(
              "px-6 py-3 text-[10px] uppercase tracking-[0.2em] transition-all duration-500",
              activeTab === 'bookings' ? "bg-gold text-charcoal font-bold" : "text-text-muted hover:text-text-main"
            )}
          >
            Bookings
          </button>
          <button 
            id="admin-tab-services"
            onClick={() => setActiveTab('services')}
            className={cn(
              "px-6 py-3 text-[10px] uppercase tracking-[0.2em] transition-all duration-500",
              activeTab === 'services' ? "bg-gold text-charcoal font-bold" : "text-text-muted hover:text-text-main"
            )}
          >
            Services
          </button>
        </div>
      </header>

      {success && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-4 bg-gold/10 border border-gold/20 text-gold flex items-center space-x-3"
        >
          <CheckCircle2 size={18} />
          <span className="text-sm tracking-wide">{success}</span>
        </motion.div>
      )}

      {error && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-4 bg-red-500/10 border border-red-500/20 text-red-500 flex items-center space-x-3"
        >
          <AlertCircle size={18} />
          <span className="text-sm tracking-wide">{error}</span>
        </motion.div>
      )}

      <div className="bg-white/[0.02] border border-white/5 overflow-hidden">
        {activeTab === 'services' ? (
          <div className="overflow-x-auto">
            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
              <h3 className="text-sm uppercase tracking-[0.2em] text-text-main font-serif">Service Catalog</h3>
              <Button 
                id="add-service-button"
                onClick={() => handleOpenModal()}
                size="sm"
                className="flex items-center space-x-2"
              >
                <Plus size={16} />
                <span>Add Service</span>
              </Button>
            </div>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.01]">
                  <th className="px-8 py-6 text-[10px] uppercase tracking-[0.2em] text-text-muted font-medium">Service</th>
                  <th className="px-8 py-6 text-[10px] uppercase tracking-[0.2em] text-text-muted font-medium">Duration</th>
                  <th className="px-8 py-6 text-[10px] uppercase tracking-[0.2em] text-text-muted font-medium">Price</th>
                  <th className="px-8 py-6 text-[10px] uppercase tracking-[0.2em] text-text-muted font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loading ? (
                  <tr>
                    <td colSpan={4} className="px-8 py-24 text-center">
                      <Loader2 className="animate-spin mx-auto text-gold mb-4" size={32} />
                      <span className="text-xs uppercase tracking-widest text-text-muted">Loading Services...</span>
                    </td>
                  </tr>
                ) : services.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-8 py-24 text-center">
                      <span className="text-xs uppercase tracking-widest text-text-muted">No services found.</span>
                    </td>
                  </tr>
                ) : (
                  services.map((service) => (
                    <tr key={service.id} className="group hover:bg-white/[0.01] transition-colors">
                      <td className="px-8 py-6">
                        <div className="flex items-center space-x-4">
                          {service.image ? (
                            <div className="w-12 h-12 bg-white/5 border border-white/10 overflow-hidden shrink-0">
                              <img 
                                src={service.image} 
                                alt={service.title} 
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                          ) : (
                            <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                              <ImageIcon size={16} className="text-text-muted/30" />
                            </div>
                          )}
                          <div className="flex flex-col">
                            <span className="text-text-main font-serif tracking-wide mb-1">{service.title}</span>
                            <span className="text-xs text-text-muted line-clamp-1 max-w-md">{service.description}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center text-text-muted text-xs">
                          <Clock size={14} className="mr-2 text-gold/50" />
                          {service.duration}
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center text-text-main font-mono">
                          <DollarSign size={14} className="mr-1 text-gold" />
                          {service.price.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex items-center justify-end space-x-4">
                          <button 
                            onClick={() => handleOpenModal(service)}
                            className="p-2 text-text-muted hover:text-gold transition-colors"
                            title="Edit Service"
                          >
                            <Edit2 size={18} strokeWidth={1.5} />
                          </button>
                          <button 
                            onClick={() => handleDelete(service.id)}
                            className="p-2 text-text-muted hover:text-red-500 transition-colors"
                            title="Delete Service"
                          >
                            <Trash2 size={18} strokeWidth={1.5} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
              <h3 className="text-sm uppercase tracking-[0.2em] text-text-main font-serif">Booking Operations</h3>
              <div className="flex items-center space-x-4">
                <button className="p-2 text-text-muted hover:text-gold transition-colors">
                  <Filter size={18} />
                </button>
              </div>
            </div>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.01]">
                  <th className="px-8 py-6 text-[10px] uppercase tracking-[0.2em] text-text-muted font-medium">Client</th>
                  <th className="px-8 py-6 text-[10px] uppercase tracking-[0.2em] text-text-muted font-medium">Service</th>
                  <th className="px-8 py-6 text-[10px] uppercase tracking-[0.2em] text-text-muted font-medium">Date & Time</th>
                  <th className="px-8 py-6 text-[10px] uppercase tracking-[0.2em] text-text-muted font-medium">Status</th>
                  <th className="px-8 py-6 text-[10px] uppercase tracking-[0.2em] text-text-muted font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-8 py-24 text-center">
                      <Loader2 className="animate-spin mx-auto text-gold mb-4" size={32} />
                      <span className="text-xs uppercase tracking-widest text-text-muted">Loading Bookings...</span>
                    </td>
                  </tr>
                ) : bookings.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-8 py-24 text-center">
                      <span className="text-xs uppercase tracking-widest text-text-muted">No bookings found.</span>
                    </td>
                  </tr>
                ) : (
                  bookings.map((booking) => (
                    <tr key={booking.id} className="group hover:bg-white/[0.01] transition-colors">
                      <td className="px-8 py-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                            <UserIcon size={14} />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-text-main text-xs font-medium">{booking.userEmail || 'Anonymous'}</span>
                            <span className="text-[10px] text-text-muted font-mono uppercase tracking-tighter">{booking.userId.slice(0, 8)}...</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-xs text-text-main font-serif">{booking.serviceTitle}</span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex flex-col space-y-1">
                          <div className="flex items-center text-xs text-text-main">
                            <Calendar size={12} className="mr-2 text-gold/50" />
                            {booking.date}
                          </div>
                          <div className="flex items-center text-[10px] text-text-muted uppercase tracking-widest">
                            <Clock size={10} className="mr-2 text-gold/50" />
                            {booking.time}
                            {booking.localTimezone && (
                              <span className="ml-2 text-gold/70">
                                ({new Intl.DateTimeFormat('en-US', { 
                                  timeZoneName: 'short', 
                                  timeZone: booking.localTimezone 
                                }).formatToParts(new Date())
                                  .find(p => p.type === 'timeZoneName')?.value || booking.localTimezone})
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="relative inline-block">
                          <button
                            onClick={() => setOpenDropdownId(openDropdownId === booking.id ? null : booking.id)}
                            data-testid="status-dropdown"
                            aria-haspopup="true"
                            aria-expanded={openDropdownId === booking.id}
                            className={cn(
                              "px-3 py-1 text-[10px] uppercase tracking-widest font-bold border focus-visible:outline-gold focus-visible:outline-2 focus-visible:outline-offset-2",
                              booking.status === 'pending' && "bg-yellow-500/10 border-yellow-500/20 text-yellow-500",
                              booking.status === 'confirmed' && "bg-blue-500/10 border-blue-500/20 text-blue-500",
                              booking.status === 'completed' && "bg-green-500/10 border-green-500/20 text-green-500",
                              booking.status === 'cancelled' && "bg-red-500/10 border-red-500/20 text-red-500"
                            )}
                          >
                            {booking.status}
                          </button>
                          
                          {openDropdownId === booking.id && (
                            <div className="absolute top-full left-0 mt-2 bg-charcoal border border-white/10 shadow-2xl z-20 block min-w-[120px]">
                              {(['pending', 'confirmed', 'completed', 'cancelled'] as Booking['status'][]).map((status) => (
                                <button
                                  key={status}
                                  onClick={() => {
                                    handleUpdateBookingStatus(booking.id, status);
                                    setOpenDropdownId(null);
                                  }}
                                  className={cn(
                                    "w-full px-4 py-2 text-[10px] uppercase tracking-widest text-left hover:bg-white/5 transition-colors focus-visible:bg-white/5 focus-visible:outline-gold",
                                    booking.status === status ? "text-gold" : "text-text-muted"
                                  )}
                                >
                                  {status}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex items-center justify-end space-x-4">
                          {booking.mediaUrls && booking.mediaUrls.length > 0 && (
                            <button 
                              onClick={() => setViewingMedia(booking)}
                              className="p-2 text-gold hover:text-gold/80 transition-colors"
                              title="View Media"
                            >
                              <Eye size={18} strokeWidth={1.5} />
                            </button>
                          )}
                          <button 
                            className="p-2 text-text-muted hover:text-gold transition-colors"
                            title="View Details"
                          >
                            <ChevronDown size={18} strokeWidth={1.5} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* CMS Modal (Services) */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-charcoal/90 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-charcoal border border-white/10 p-10 shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <header className="flex items-center justify-between mb-10">
                <h3 className="text-2xl font-serif tracking-widest uppercase text-text-main">
                  {editingService ? 'Edit' : 'Create'} <span className="text-gold italic">Service</span>
                </h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-text-muted hover:text-text-main transition-colors"
                >
                  <X size={24} strokeWidth={1.5} />
                </button>
              </header>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-text-muted font-medium">Service Title</label>
                    <div className="relative">
                      <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/50" size={18} />
                      <input 
                        required
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        className="w-full bg-white/[0.03] border border-white/10 px-12 py-4 text-sm text-text-main focus:outline-none focus:border-gold/50 transition-colors"
                        placeholder="e.g. Elite Performance Review"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-[0.2em] text-text-muted font-medium">Price (USD)</label>
                      <div className="relative">
                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/50" size={18} />
                        <input 
                          required
                          type="number"
                          value={formData.price}
                          onChange={(e) => setFormData({...formData, price: e.target.value})}
                          className="w-full bg-white/[0.03] border border-white/10 px-12 py-4 text-sm text-text-main focus:outline-none focus:border-gold/50 transition-colors"
                          placeholder="450"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-[0.2em] text-text-muted font-medium">Duration</label>
                      <div className="relative">
                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/50" size={18} />
                        <input 
                          required
                          type="text"
                          value={formData.duration}
                          onChange={(e) => setFormData({...formData, duration: e.target.value})}
                          className="w-full bg-white/[0.03] border border-white/10 px-12 py-4 text-sm text-text-main focus:outline-none focus:border-gold/50 transition-colors"
                          placeholder="e.g. 60 min"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-text-muted font-medium">Service Image</label>
                    <div className="flex items-center space-x-4">
                      {formData.image && (
                        <div className="w-20 h-20 bg-white/5 border border-white/10 overflow-hidden shrink-0">
                          <img 
                            src={formData.image} 
                            alt="Preview" 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <label className={cn(
                          "flex flex-col items-center justify-center w-full h-20 border-2 border-dashed border-white/10 bg-white/[0.03] cursor-pointer hover:bg-white/[0.05] transition-all",
                          uploadingImage && "opacity-50 cursor-not-allowed"
                        )}>
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            {uploadingImage ? (
                              <div className="flex flex-col items-center space-y-2">
                                <Loader2 className="animate-spin text-gold" size={20} />
                                <span className="text-[10px] text-gold uppercase tracking-widest">{Math.round(uploadProgress)}%</span>
                              </div>
                            ) : (
                              <>
                                <Upload className="text-gold/50 mb-1" size={18} />
                                <p className="text-[10px] text-text-muted uppercase tracking-widest">Upload Image</p>
                              </>
                            )}
                          </div>
                          <input 
                            type="file" 
                            className="hidden" 
                            accept="image/*"
                            onChange={handleImageUpload}
                            disabled={uploadingImage}
                          />
                        </label>
                      </div>
                    </div>
                    <div className="relative mt-2">
                      <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/50" size={18} />
                      <input 
                        type="url"
                        value={formData.image}
                        onChange={(e) => setFormData({...formData, image: e.target.value})}
                        className="w-full bg-white/[0.03] border border-white/10 px-12 py-4 text-sm text-text-main focus:outline-none focus:border-gold/50 transition-colors"
                        placeholder="Or paste image URL..."
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-text-muted font-medium">Description</label>
                    <textarea 
                      required
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="w-full bg-white/[0.03] border border-white/10 p-4 text-sm text-text-main focus:outline-none focus:border-gold/50 transition-colors resize-none"
                      placeholder="Describe the service value proposition..."
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-text-muted font-medium">Features (Comma separated)</label>
                    <textarea 
                      required
                      rows={3}
                      value={formData.features}
                      onChange={(e) => setFormData({...formData, features: e.target.value})}
                      className="w-full bg-white/[0.03] border border-white/10 p-4 text-sm text-text-main focus:outline-none focus:border-gold/50 transition-colors resize-none"
                      placeholder="Feature 1, Feature 2, Feature 3..."
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-4 pt-6 border-t border-white/5">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-8 py-4 text-[10px] uppercase tracking-[0.2em] text-text-muted hover:text-text-main transition-colors"
                  >
                    Cancel
                  </button>
                  <Button 
                    type="submit"
                    disabled={submitting}
                    className="min-w-[160px]"
                  >
                    {submitting ? (
                      <Loader2 className="animate-spin mx-auto" size={18} />
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <Save size={18} />
                        <span>{editingService ? 'Update' : 'Create'} Service</span>
                      </div>
                    )}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* Media Viewer Modal */}
      <AnimatePresence>
        {viewingMedia && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setViewingMedia(null)}
              className="absolute inset-0 bg-charcoal/95 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-4xl bg-charcoal border border-white/10 p-10 shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <header className="flex items-center justify-between mb-10">
                <div>
                  <span className="text-gold text-[10px] tracking-[0.3em] uppercase mb-2 block font-medium">Diagnostic Media</span>
                  <h3 className="text-2xl font-serif text-text-main">
                    Booking for <span className="italic text-gold">{viewingMedia.userEmail}</span>
                  </h3>
                </div>
                <button 
                  onClick={() => setViewingMedia(null)}
                  className="p-2 text-text-muted hover:text-text-main transition-colors"
                >
                  <X size={24} strokeWidth={1.5} />
                </button>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {viewingMedia.mediaUrls?.map((url, index) => {
                  const isAudio = url.includes('.mp3') || url.includes('.wav') || url.includes('.m4a') || url.includes('audio');
                  
                  return (
                    <div key={index} className="bg-white/[0.02] border border-white/5 p-4 flex flex-col">
                      {isAudio ? (
                        <div className="flex flex-col items-center justify-center py-8 space-y-4">
                          <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center text-gold">
                            <Music size={32} />
                          </div>
                          <span className="text-[10px] uppercase tracking-widest text-text-muted">Audio Diagnostic {index + 1}</span>
                          <audio controls className="w-full mt-4">
                            <source src={url} />
                            Your browser does not support the audio element.
                          </audio>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="aspect-square bg-white/5 border border-white/10 overflow-hidden">
                            <img 
                              src={url} 
                              alt={`Diagnostic ${index + 1}`} 
                              className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] uppercase tracking-widest text-text-muted">Photo {index + 1}</span>
                            <a 
                              href={url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-gold hover:underline text-[10px] uppercase tracking-widest"
                            >
                              Open Full
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {(!viewingMedia.mediaUrls || viewingMedia.mediaUrls.length === 0) && (
                <div className="py-24 text-center border border-dashed border-white/10">
                  <FileText className="mx-auto text-text-muted/30 mb-4" size={48} />
                  <p className="text-text-muted uppercase tracking-widest text-xs">No media attached to this booking.</p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

const MOCK_BOOKINGS: Booking[] = [
  {
    id: 'mock-1',
    userId: 'user_987654321',
    userEmail: 'sebastian.vettel@example.com',
    serviceId: 'elite-review',
    serviceTitle: 'Elite Performance Review',
    price: 450,
    date: '2026-04-15',
    time: '10:30 AM',
    clientLocalTime: 'April 15, 2026 at 10:30 AM',
    localTimezone: 'America/New_York',
    utcTimestamp: '2026-04-15T14:30:00Z',
    status: 'pending',
    createdAt: Timestamp.now()
  },
  {
    id: 'mock-2',
    userId: 'user_123456789',
    userEmail: 'lewis.hamilton@example.com',
    serviceId: 'track-prep',
    serviceTitle: 'Track Day Preparation',
    price: 850,
    date: '2026-04-12',
    time: '01:00 PM',
    clientLocalTime: 'April 12, 2026 at 01:00 PM',
    localTimezone: 'America/New_York',
    utcTimestamp: '2026-04-12T17:00:00Z',
    status: 'confirmed',
    createdAt: Timestamp.now()
  },
  {
    id: 'mock-3',
    userId: 'user_456789123',
    userEmail: 'max.verstappen@example.com',
    serviceId: 'full-diagnostic',
    serviceTitle: 'Full System Diagnostic',
    price: 1200,
    date: '2026-03-28',
    time: '09:00 AM',
    clientLocalTime: 'March 28, 2026 at 09:00 AM',
    localTimezone: 'America/New_York',
    utcTimestamp: '2026-03-28T13:00:00Z',
    status: 'completed',
    createdAt: Timestamp.now()
  }
];
