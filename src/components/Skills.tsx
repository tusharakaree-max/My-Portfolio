import { motion } from 'motion/react';
import { Cpu, Code2, Palette, Globe, Layers, Database } from 'lucide-react';

const skillCategories = [
  {
    name: 'Data Analysis',
    icon: Database,
    skills: ['Python (Pandas/NumPy)', 'SQL (PostgreSQL)', 'Excel', 'Statistics'],
    color: 'from-blue-500 to-cyan-400'
  },
  {
    name: 'Visualization',
    icon: Palette,
    skills: ['Tableau', 'Power BI'],
    color: 'from-purple-500 to-pink-500'
  },
  {
    name: 'Web Basics',
    icon: Code2,
    skills: ['HTML5', 'CSS3'],
    color: 'from-emerald-500 to-teal-400'
  },
  {
    name: 'Professional',
    icon: Cpu,
    skills: ['Critical Thinking', 'Problem Solving', 'Team Collaboration', 'Quick Learner'],
    color: 'from-indigo-500 to-blue-600'
  }
];

export default function Skills() {
  return (
    <section id="skills" className="section-padding relative">
      <div className="text-center mb-20">
        <span className="text-neon font-bold tracking-widest uppercase text-sm block mb-4">Stack & Tools</span>
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Technical <span className="text-gradient">Arsenal.</span></h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          A comprehensive suite of technical tools and core competencies I leverage 
          to derive meaningful insights and solve complex business problems.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skillCategories.map((category, idx) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="group relative"
          >
            {/* Glow Effect */}
            <div className={`absolute -inset-1 bg-gradient-to-r ${category.color} rounded-3xl blur opacity-0 group-hover:opacity-20 transition duration-500`} />
            
            <div className="relative glass-card p-10 rounded-3xl h-full border-white/5 group-hover:border-white/10 transition-colors">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center text-white mb-8 shadow-lg transform group-hover:rotate-6 transition-transform`}>
                <category.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-display font-bold text-white mb-6 uppercase tracking-tight">{category.name}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span 
                    key={skill} 
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/5 border border-white/5 text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
