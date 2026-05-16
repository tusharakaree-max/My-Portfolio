import { motion } from 'motion/react';
import { User, Target, Zap, Award } from 'lucide-react';

const stats = [
  { label: 'Major Projects', value: '5+', icon: Target },
  { label: 'Data Skills', value: '10+', icon: Zap },
  { label: 'Certifications', value: '3+', icon: Award },
  { label: 'Learning Hours', value: '500+', icon: User },
];

export default function About() {
  return (
    <section id="about" className="section-padding relative overflow-hidden">
      <div className="grid lg:grid-cols-[0.7fr_1.3fr] gap-12 lg:gap-20 items-center">
        {/* Left: Image / Illustration */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative group max-w-[280px] mx-auto lg:mx-0"
        >
          <div className="absolute -inset-4 bg-gradient-to-r from-electric to-neon rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
          <div className="relative glass-card rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl border-white/10 group-hover:border-electric/30 transition-all duration-500">
            <img 
              src="/input_file_6.png" 
              alt="Tushar Akaree - Portfolio Profile" 
              referrerPolicy="no-referrer"
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.dataset.triedFallback) {
                  target.dataset.triedFallback = "true";
                  target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop";
                }
              }}
              className="w-full h-full object-cover brightness-105 group-hover:scale-105 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-black/40 via-transparent to-transparent opacity-60" />
            
            <div className="absolute bottom-6 left-6 right-6">
              <h3 className="text-xl font-display font-bold text-white mb-1 tracking-tight">Tushar Akaree</h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-glow animate-pulse" />
                <p className="text-slate-300 text-[10px] font-bold uppercase tracking-widest">Data Analyst</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right: Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="mb-0">
            <span className="text-electric font-bold tracking-widest uppercase text-sm block mb-4">About Me</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Transforming Data into <br />
              <span className="text-gradient">Strategic Growth.</span>
            </h2>
            <p className="text-slate-400 leading-relaxed mb-6">
              I am a results-driven Data Analyst passionate about turning raw data into actionable insights. 
              My journey is fueled by a curiosity for complex systems and a commitment to helping 
              businesses make informed, high-impact decisions through sophisticated data modeling.
            </p>
            <p className="text-slate-400 leading-relaxed mb-8">
              As a fresher, I am eager to apply these skills in real‑world projects and grow with data‑driven organizations.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-6 rounded-2xl border-white/5 hover:border-white/10 transition-colors"
              >
                <stat.icon className="w-6 h-6 text-cyan-glow mb-4" />
                <div className="text-3xl font-display font-bold text-white mb-1">{stat.value}</div>
                <div className="text-xs uppercase tracking-wider text-slate-500 font-bold">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
