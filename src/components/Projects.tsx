import { motion } from 'motion/react';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';

const projects = [
  {
    title: 'IPL Analysis Dashboard',
    category: 'Power BI',
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=2067&auto=format&fit=crop',
    tags: ['Power BI', 'DAX', 'Cricket Data', 'Visualization'],
    liveUrl: '#',
    githubUrl: '#',
    description: 'Comprehensive analysis of IPL seasons, player performances, and match statistics using interactive visualizations and DAX measures.'
  },
  {
    title: 'Company Employee Dashboard',
    category: 'Advanced Excel',
    image: 'https://images.unsplash.com/photo-1543269664-56d93c1b41a6?q=80&w=2070&auto=format&fit=crop',
    tags: ['Excel', 'Pivot Tables', 'Power Query', 'VBA'],
    liveUrl: '#',
    githubUrl: '#',
    description: 'Dynamic HR tracker for monitoring employee productivity, attendance trends, and department-wise headcount distribution.'
  },
  {
    title: 'Hospital Emergency Room Dashboard',
    category: 'Advanced Excel',
    image: 'input_file_0.png',
    tags: ['Excel', 'Data Analysis', 'Healthcare', 'Visualizations'],
    liveUrl: '#',
    githubUrl: '#',
    description: 'Dynamic ER tracker for monitoring patient volume, average wait times, and satisfaction scores with department-wise performance analysis.'
  },
  {
    title: 'Financial Sales Performance',
    category: 'Power BI',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2011&auto=format&fit=crop',
    tags: ['Power BI', 'Financial Modeling', 'ETL', 'Forecasting'],
    liveUrl: '#',
    githubUrl: '#',
    description: 'Strategic dashboard for tracking revenue growth, profit margins, and regional sales targets with year-over-year comparisons.'
  },
  {
    title: 'Hospital Management System',
    category: 'Excel Dashboard',
    image: 'https://images.unsplash.com/photo-1586770110170-59832176d637?q=80&w=1947&auto=format&fit=crop',
    tags: ['Excel', 'Data Validation', 'Slicers', 'Healthcare'],
    liveUrl: '#',
    githubUrl: '#',
    description: 'Operational tracker for managing patient flow, doctor availability, and medical inventory using automated Excel workflows.'
  },
  {
    title: 'E-commerce Trends Analysis',
    category: 'Power BI',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
    tags: ['Power BI', 'SQL', 'Market Analysis', 'Customer Journey'],
    liveUrl: '#',
    githubUrl: '#',
    description: 'Interactive dashboard analyzing online consumer behavior, basket size trends, and marketing campaign effectiveness.'
  }
];

export default function Projects() {
  return (
    <section id="projects" className="section-padding relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
        <div>
          <span className="text-electric font-bold tracking-widest uppercase text-sm block mb-4">Portfolio</span>
          <h2 className="text-4xl md:text-6xl font-display font-bold">Featured <span className="text-gradient">Projects.</span></h2>
        </div>
        <p className="text-slate-400 max-w-md md:text-right leading-relaxed">
          A selection of my most challenging and innovative work, where technology meets craftsmanship.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {projects.map((project, idx) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2, duration: 0.8 }}
            viewport={{ once: true }}
            className="group block relative"
          >
            <div className="relative overflow-hidden rounded-[2rem] aspect-[16/10] glass-card border-white/5 group-hover:border-white/20 transition-all duration-500">
              {/* Image with zoom effect */}
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 brightness-75 group-hover:brightness-100"
              />
              
              {/* Overlay with details on hover */}
              <div className="absolute inset-x-0 bottom-0 p-10 bg-gradient-to-t from-navy-black via-navy-black/80 to-transparent translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-cyan-glow">{project.category}</span>
                  <div className="flex gap-4">
                    <a href={project.githubUrl} className="p-2 rounded-full glass-card hover:bg-white/10 transition-colors">
                      <Github className="w-4 h-4 text-white" />
                    </a>
                    <a href={project.liveUrl} className="p-2 rounded-full glass-card hover:bg-white/10 transition-colors">
                      <ExternalLink className="w-4 h-4 text-white" />
                    </a>
                  </div>
                </div>
                
                <h3 className="text-3xl font-display font-bold text-white mb-4 group-hover:text-cyan-glow transition-colors">{project.title}</h3>
                <p className="text-slate-400 text-sm mb-6 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-700">{project.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-bold text-slate-300 border border-white/10 px-3 py-1 rounded-full uppercase tracking-tighter">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* View Project Arrow */}
              <div className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white text-navy-black flex items-center justify-center opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-500 shadow-2xl">
                <ArrowUpRight className="w-6 h-6" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-20 text-center">
        <button className="btn-outline group inline-flex items-center gap-2">
          View Archive
          <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
        </button>
      </div>
    </section>
  );
}
