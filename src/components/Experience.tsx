import { motion } from 'motion/react';
import { Briefcase, Calendar } from 'lucide-react';

const experiences = [
  {
    company: 'Neural Dynamics',
    role: 'Lead Full-Stack Architect',
    period: '2022 - Present',
    description: 'Leading the development of complex AI-driven SaaS solutions. Managed a team of 12 developers to deliver high-scale infrastructure.',
    achievements: ['Reduced latency by 45%', 'Implemented global CDN', 'Architected core AI interface']
  },
  {
    company: 'Quantum Systems',
    role: 'Senior Software Engineer',
    period: '2020 - 2022',
    description: 'Developed high-frequency trading platforms and real-time data visualization engines for institutional clients.',
    achievements: ['99.99% system uptime', 'Integrated multi-cloud strategy', 'Patent holder for data stream compression']
  },
  {
    company: 'Vibe Creative Agency',
    role: 'Product Developer',
    period: '2018 - 2020',
    description: 'Crafted award-winning immersive marketing platforms for top-tier brands like Apple, Tesla, and Nike.',
    achievements: ['3x Awwwards SOTD', 'Led migration to React ecosystem', 'Proprietary animation library']
  }
];

export default function Experience() {
  return (
    <section className="section-padding relative">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-neon font-bold tracking-widest uppercase text-sm block mb-4">Journey</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold">Experience <span className="text-gradient">Timeline.</span></h2>
        </div>

        <div className="relative border-l border-white/10 ml-4 md:ml-0">
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="mb-16 last:mb-0 pl-10 relative group"
            >
              {/* Timeline Dot */}
              <div className="absolute left-[-9px] top-2 w-4 h-4 rounded-full bg-navy-black border-2 border-electric group-hover:bg-electric transition-colors shadow-[0_0_10px_rgba(79,70,229,0.5)]" />
              
              <div className="glass-card p-8 rounded-3xl border-white/5 group-hover:border-white/10 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                  <div>
                    <h3 className="text-2xl font-display font-bold text-white mb-1">{exp.role}</h3>
                    <div className="flex items-center gap-2 text-cyan-glow font-semibold text-sm">
                      <Briefcase className="w-4 h-4" />
                      {exp.company}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-slate-400 text-xs font-bold border border-white/5">
                    <Calendar className="w-3 h-3" />
                    {exp.period}
                  </div>
                </div>

                <p className="text-slate-400 leading-relaxed mb-6">{exp.description}</p>
                
                <div className="flex flex-wrap gap-3">
                  {exp.achievements.map(ach => (
                    <span key={ach} className="text-[10px] uppercase font-bold tracking-wider text-slate-500 bg-white/5 px-3 py-1 rounded-lg border border-white/5">
                      {ach}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
