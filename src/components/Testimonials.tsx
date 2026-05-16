import { motion } from 'motion/react';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'CEO at TechFuture',
    content: 'Etheris transformed our vision into a digital masterpiece. The attention to detail and futuristic design language exceeded our expectations.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop'
  },
  {
    name: 'Marcus Thorne',
    role: 'Product Lead at Quantum',
    content: 'The most innovative developer we have worked with. The performance of the application is just as stunning as the visuals.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop'
  },
  {
    name: 'Elena Rodriguez',
    role: 'Design Director at Vibe',
    content: 'A rare talent who understands both the art and science of web development. Their work is consistently award-worthy.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop'
  }
];

export default function Testimonials() {
  return (
    <section className="section-padding relative">
      <div className="text-center mb-20">
        <span className="text-electric font-bold tracking-widest uppercase text-sm block mb-4">Feedback</span>
        <h2 className="text-4xl md:text-5xl font-display font-bold">Client <span className="text-gradient">Voices.</span></h2>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial, idx) => (
          <motion.div
            key={testimonial.name}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="glass-card p-10 rounded-[2.5rem] relative group border-white/5"
          >
            <div className="absolute -top-6 -right-6 w-12 h-12 rounded-2xl bg-electric flex items-center justify-center text-white shadow-xl opacity-0 group-hover:opacity-100 transition-opacity">
              <Quote className="w-6 h-6" />
            </div>

            <div className="flex items-center gap-1 mb-6">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-cyan-glow text-cyan-glow" />
              ))}
            </div>

            <p className="text-slate-300 leading-relaxed mb-8 italic">"{testimonial.content}"</p>

            <div className="flex items-center gap-4 pt-6 border-t border-white/5">
              <img 
                src={testimonial.image} 
                alt={testimonial.name} 
                className="w-12 h-12 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              />
              <div>
                <div className="text-white font-bold">{testimonial.name}</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider font-bold">{testimonial.role}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
