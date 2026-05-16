import { motion } from 'motion/react';
import { ArrowRight, Clock } from 'lucide-react';

const posts = [
  {
    title: 'The Future of AI in Web Design',
    date: 'May 12, 2026',
    time: '5 min read',
    category: 'AI / Design',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4628c9757?q=80&w=1964&auto=format&fit=crop'
  },
  {
    title: 'Mastering Framer Motion 12',
    date: 'May 08, 2026',
    time: '8 min read',
    category: 'Development',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop'
  },
  {
    title: 'Fintech UI: Glassmorphism Patterns',
    date: 'April 30, 2026',
    time: '6 min read',
    category: 'UI/UX',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2064&auto=format&fit=crop'
  }
];

export default function Blog() {
  return (
    <section className="section-padding relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
        <div>
          <span className="text-neon font-bold tracking-widest uppercase text-sm block mb-4">Insights</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold">Latest <span className="text-gradient">Articles.</span></h2>
        </div>
        <button className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 font-bold uppercase tracking-widest text-xs">
          View All Posts
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post, idx) => (
          <motion.div
            key={post.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="group glass-card rounded-[2.5rem] overflow-hidden border-white/5 hover:border-white/10 transition-all duration-500"
          >
            <div className="relative aspect-[16/9] overflow-hidden">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
              />
              <div className="absolute top-4 left-4 bg-navy-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white border border-white/10 uppercase tracking-widest">
                {post.category}
              </div>
            </div>
            
            <div className="p-8">
              <div className="flex items-center gap-4 text-slate-500 text-xs font-bold uppercase tracking-wider mb-4">
                <span>{post.date}</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {post.time}
                </span>
              </div>
              
              <h3 className="text-2xl font-display font-bold text-white mb-6 group-hover:text-electric transition-colors leading-tight">
                {post.title}
              </h3>
              
              <button className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-widest group/btn">
                Read More
                <div className="w-8 h-px bg-white/20 group-hover/btn:w-12 group-hover/btn:bg-electric transition-all" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
