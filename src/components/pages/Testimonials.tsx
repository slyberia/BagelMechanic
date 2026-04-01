// src/components/pages/Testimonials.tsx
import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Alexander Sterling",
    role: "Collector, Heritage Fleet",
    content: "The technical depth provided during our diagnostic session was unparalleled. They didn't just find issues; they provided a multi-year roadmap for preservation that respects the vehicle's history.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: 2,
    name: "Elena Vance",
    role: "CEO, Vance Logistics",
    content: "As someone who demands precision in every aspect of my life, I found their consultation service to be exactly what I needed for my performance collection. Efficient, expert, and entirely professional.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: 3,
    name: "Julian Thorne",
    role: "Restoration Enthusiast",
    content: "I've worked with many engineers, but none possess the intuitive understanding of mechanical systems displayed here. The 'Elite Diagnostic' saved me months of trial and error on my latest project.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: 4,
    name: "Marcus Chen",
    role: "Track Day Competitor",
    content: "The performance optimization strategy they developed for my GT3 was a game-changer. Every adjustment was backed by data and explained with absolute clarity. Highly recommended.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"
  }
];

export function Testimonials() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-24">
      <header className="mb-20 text-center">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-gold text-[10px] tracking-[0.3em] uppercase mb-4 block font-medium"
        >
          Client Experiences
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-serif text-text-main mb-6"
        >
          Voices of <span className="italic">Excellence</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-text-muted font-light max-w-2xl mx-auto leading-relaxed"
        >
          We pride ourselves on the relationships we build with our clients. 
          Hear from those who have experienced our bespoke engineering consultations.
        </motion.p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/[0.02] border border-white/5 p-10 relative group hover:border-gold/30 transition-all duration-700"
          >
            <Quote className="absolute top-8 right-8 text-gold/10 group-hover:text-gold/20 transition-colors" size={60} strokeWidth={1} />
            
            <div className="flex items-center space-x-1 mb-6">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} size={12} className="fill-gold text-gold" />
              ))}
            </div>

            <p className="text-text-main text-lg font-light leading-relaxed mb-10 italic">
              "{testimonial.content}"
            </p>

            <div className="flex items-center space-x-4">
              <img 
                src={testimonial.image} 
                alt={testimonial.name}
                className="w-12 h-12 rounded-full grayscale group-hover:grayscale-0 transition-all duration-700 object-cover border border-white/10"
                referrerPolicy="no-referrer"
              />
              <div>
                <h4 className="text-sm font-serif text-text-main tracking-wide">{testimonial.name}</h4>
                <span className="text-[10px] text-text-muted uppercase tracking-widest">{testimonial.role}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="mt-24 text-center p-12 border border-dashed border-white/10"
      >
        <p className="text-text-muted text-sm font-light italic mb-6">
          "True engineering is not just about fixing what is broken, but perfecting what is already exceptional."
        </p>
        <span className="text-[10px] uppercase tracking-[0.3em] text-gold">— Our Philosophy</span>
      </motion.div>
    </div>
  );
}
