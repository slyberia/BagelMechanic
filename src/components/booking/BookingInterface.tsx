// src/components/booking/BookingInterface.tsx
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { format, addDays, startOfToday, isSameDay, parse } from 'date-fns';
import { Calendar as CalendarIcon, Clock, X, ChevronLeft, ChevronRight, CheckCircle2, Loader2, Upload, Music, Image as ImageIcon, FileText, Trash2, CalendarPlus } from 'lucide-react';
import { Button } from '../ui/Button';
import { Service } from '../../types';
import { formatCurrency, cn } from '../../lib/utils';
import { db, auth, storage } from '../../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { generateICS } from '../../lib/calendarLink';
import { sendConfirmationEmail } from '../../lib/notifications';

interface BookingInterfaceProps {
  service: Service;
  onClose: () => void;
}

export function BookingInterface({ service, onClose }: BookingInterfaceProps) {
  const [step, setStep] = useState<'schedule' | 'media'>('schedule');
  const [selectedDate, setSelectedDate] = useState<Date>(startOfToday());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Media Upload State
  const [files, setFiles] = useState<{ file: File, progress: number, url?: string }[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const days = Array.from({ length: 14 }, (_, i) => addDays(startOfToday(), i));
  const times = ['09:00 AM', '10:30 AM', '01:00 PM', '02:30 PM', '04:00 PM', '05:30 PM'];

  // Close on Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleConfirm = async () => {
    if (!selectedTime) return;

    setIsLoading(true);
    setError(null);

    try {
      const mediaUrls = files.map(f => f.url).filter(Boolean) as string[];
      
      // Timezone and Timestamp Logic
      const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const clientLocalTime = `${format(selectedDate, 'MMMM d, yyyy')} at ${selectedTime}`;
      const dateTimeStr = `${format(selectedDate, 'yyyy-MM-dd')} ${selectedTime}`;
      const localDateTime = parse(dateTimeStr, 'yyyy-MM-dd hh:mm aa', new Date());
      const utcTimestamp = localDateTime.toISOString();

      const bookingData = {
        userId: auth.currentUser?.uid || 'anonymous',
        userEmail: auth.currentUser?.email || 'anonymous',
        serviceId: service.id,
        serviceTitle: service.title,
        price: service.price,
        date: format(selectedDate, 'yyyy-MM-dd'),
        time: selectedTime,
        clientLocalTime,
        localTimezone,
        utcTimestamp,
        createdAt: serverTimestamp(),
        status: 'pending',
        mediaUrls
      };

      await addDoc(collection(db, 'bookings'), bookingData);

      // Trigger Mock Email Notification
      await sendConfirmationEmail({
        clientName: auth.currentUser?.displayName || 'Elite Client',
        clientEmail: auth.currentUser?.email || 'anonymous@example.com',
        serviceTitle: service.title,
        appointmentTime: `${clientLocalTime} (${localTimezone})`,
        price: service.price
      });

      setIsSuccess(true);
      setTimeout(() => {
        onClose();
      }, 5000); // Give user time to see the "Add to Calendar" button
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to confirm appointment. Please try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCalendar = () => {
    const icsUrl = generateICS({
      title: `Elite Mechanic: ${service.title}`,
      date: format(selectedDate, 'yyyy-MM-dd'),
      time: selectedTime!,
      description: `Elite Performance Consultation: ${service.description}`
    });
    
    const link = document.createElement('a');
    link.href = icsUrl;
    link.download = `elite-mechanic-consultation.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileUpload = async (uploadedFiles: FileList | null) => {
    if (!uploadedFiles) return;
    
    const newFiles = Array.from(uploadedFiles).slice(0, 3 - files.length);
    if (newFiles.length === 0) return;

    const updatedFiles = [...files];
    
    for (const file of newFiles) {
      const fileIndex = updatedFiles.length;
      updatedFiles.push({ file, progress: 0 });
      setFiles([...updatedFiles]);

      const storageRef = ref(storage, `bookings/temp_${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setFiles(prev => {
            const next = [...prev];
            if (next[fileIndex]) next[fileIndex].progress = progress;
            return next;
          });
        },
        (error) => {
          console.error('Upload error:', error);
          setError('Failed to upload some files.');
        },
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          setFiles(prev => {
            const next = [...prev];
            if (next[fileIndex]) next[fileIndex].url = url;
            return next;
          });
        }
      );
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-charcoal/80 backdrop-blur-xl"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-title"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-ink border border-white/10 w-full max-w-4xl overflow-hidden flex flex-col md:flex-row shadow-2xl relative"
      >
        <AnimatePresence>
          {isSuccess && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-10 bg-ink flex flex-col items-center justify-center text-center p-10"
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', damping: 12 }}
                className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mb-8"
              >
                <CheckCircle2 className="text-gold" size={40} />
              </motion.div>
              <h3 className="text-3xl font-serif mb-4 text-text-main">Appointment Confirmed</h3>
              <p className="text-text-muted max-w-sm font-light leading-relaxed">
                Your consultation for {format(selectedDate, 'MMMM d')} at {selectedTime} has been successfully scheduled.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Left: Summary */}
        <div className="md:w-1/3 p-10 bg-white/[0.02] border-r border-white/5">
          <button 
            onClick={onClose} 
            className="mb-12 text-text-muted hover:text-text-main transition-colors focus-visible:outline-gold"
            aria-label="Close booking interface"
          >
            <X size={24} strokeWidth={1.5} />
          </button>
          
          <span className="text-gold text-[10px] tracking-[0.3em] uppercase mb-4 block font-medium">Booking Summary</span>
          <h3 id="booking-title" className="text-2xl font-serif mb-4 text-text-main">{service.title}</h3>
          <p className="text-text-muted text-sm font-light mb-8 leading-relaxed">{service.description}</p>
          
          <div className="space-y-4 pt-8 border-t border-white/5">
            <div className="flex justify-between text-sm">
              <span className="text-text-muted">Duration</span>
              <span className="text-text-main">{service.duration}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-muted">Consultant</span>
              <span className="text-text-main">Senior Engineer</span>
            </div>
            <div className="flex justify-between text-lg pt-4 border-t border-white/5">
              <span className="text-text-muted">Total</span>
              <span className="text-gold font-medium">{formatCurrency(service.price)}</span>
            </div>
          </div>
        </div>

        {/* Right: Selection */}
        <div className="md:w-2/3 p-10 overflow-y-auto max-h-[80vh] md:max-h-none flex flex-col">
          <AnimatePresence mode="wait">
            {step === 'schedule' ? (
              <motion.div
                key="schedule"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1"
              >
                <div className="mb-12">
                  <h4 className="text-sm tracking-[0.2em] uppercase mb-8 flex items-center text-text-main">
                    <CalendarIcon size={16} className="mr-3 text-gold/50" aria-hidden="true" />
                    Select Date
                  </h4>
                  <div 
                    className="flex space-x-4 overflow-x-auto pb-4 no-scrollbar"
                    role="listbox"
                    aria-label="Select a date for your consultation"
                  >
                    {days.map((day) => (
                      <button
                        key={day.toISOString()}
                        onClick={() => setSelectedDate(day)}
                        role="option"
                        aria-selected={isSameDay(day, selectedDate)}
                        className={`flex-shrink-0 w-20 h-24 flex flex-col items-center justify-center border transition-all duration-500 focus-visible:outline-gold ${
                          isSameDay(day, selectedDate)
                            ? 'border-gold bg-gold/5 text-gold'
                            : 'border-white/5 hover:border-white/20 text-text-muted'
                        }`}
                      >
                        <span className="text-[10px] uppercase tracking-widest mb-2">{format(day, 'EEE')}</span>
                        <span className="text-xl font-serif">{format(day, 'd')}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-12">
                  <h4 className="text-sm tracking-[0.2em] uppercase mb-8 flex items-center text-text-main">
                    <Clock size={16} className="mr-3 text-gold/50" aria-hidden="true" />
                    Select Time ({format(selectedDate, 'MMMM d')})
                  </h4>
                  <div 
                    className="grid grid-cols-2 md:grid-cols-3 gap-4"
                    role="listbox"
                    aria-label="Select a time slot"
                  >
                    {times.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        role="option"
                        aria-selected={selectedTime === time}
                        className={`py-4 px-6 border text-xs tracking-widest transition-all duration-500 focus-visible:outline-gold ${
                          selectedTime === time
                            ? 'border-gold bg-gold/5 text-gold'
                            : 'border-white/5 hover:border-white/20 text-text-muted'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  disabled={!selectedTime}
                  className="w-full"
                  onClick={() => setStep('media')}
                >
                  Continue to Media Upload
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="media"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1 flex flex-col"
              >
                <div className="mb-8">
                  <button 
                    onClick={() => setStep('schedule')}
                    className="flex items-center text-[10px] uppercase tracking-[0.2em] text-gold hover:text-gold/80 transition-colors mb-6"
                  >
                    <ChevronLeft size={14} className="mr-1" />
                    Back to Schedule
                  </button>
                  <h4 className="text-sm tracking-[0.2em] uppercase mb-2 flex items-center text-text-main">
                    <Upload size={16} className="mr-3 text-gold/50" aria-hidden="true" />
                    Diagnostic Media
                  </h4>
                  <p className="text-xs text-text-muted font-light">
                    Upload up to 3 photos or audio clips of engine noise to help our engineers prepare.
                  </p>
                </div>

                <div 
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                    handleFileUpload(e.dataTransfer.files);
                  }}
                  className={cn(
                    "flex-1 border-2 border-dashed transition-all duration-500 flex flex-col items-center justify-center p-10 mb-8 min-h-[240px]",
                    isDragging ? "border-gold bg-gold/5" : "border-white/10 bg-white/[0.02] hover:bg-white/[0.04]",
                    files.length >= 3 && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <input 
                    type="file" 
                    id="media-upload"
                    className="hidden"
                    multiple
                    accept="image/*,audio/*"
                    onChange={(e) => handleFileUpload(e.target.files)}
                    disabled={files.length >= 3}
                  />
                  <label 
                    htmlFor="media-upload"
                    className="flex flex-col items-center cursor-pointer"
                  >
                    <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center text-gold mb-4">
                      <Upload size={24} />
                    </div>
                    <p className="text-xs uppercase tracking-widest text-text-main mb-2">Drag & Drop or Click</p>
                    <p className="text-[10px] text-text-muted uppercase tracking-tighter">Images or Audio (Max 3)</p>
                  </label>
                </div>

                {files.length > 0 && (
                  <div className="space-y-4 mb-8">
                    {files.map((fileData, index) => (
                      <div key={index} className="bg-white/[0.03] border border-white/5 p-4 flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gold/10 flex items-center justify-center text-gold shrink-0">
                          {fileData.file.type.startsWith('audio') ? <Music size={18} /> : <ImageIcon size={18} />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-[10px] uppercase tracking-widest text-text-main truncate pr-4">{fileData.file.name}</span>
                            <button 
                              onClick={() => removeFile(index)}
                              className="text-text-muted hover:text-red-500 transition-colors"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                          <div className="h-1 bg-white/5 overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${fileData.progress}%` }}
                              className="h-full bg-gold"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {error && (
                  <p className="text-red-500 text-xs mb-6 tracking-wide uppercase">{error}</p>
                )}

                <Button
                  disabled={!selectedTime || isLoading || files.some(f => f.progress < 100)}
                  className="w-full mt-auto"
                  onClick={handleConfirm}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <Loader2 className="mr-2 animate-spin" size={16} />
                      Processing...
                    </span>
                  ) : (
                    'Confirm Appointment'
                  )}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
