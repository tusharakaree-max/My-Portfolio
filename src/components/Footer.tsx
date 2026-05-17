import { Github, Linkedin, Twitter, ArrowUp, BarChart3 } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-20 px-6 border-t border-white/5 relative bg-navy-black">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="flex flex-col items-center md:items-start gap-4">
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-electric to-neon flex items-center justify-center text-white">
              <BarChart3 className="w-5 h-5" />
            </div>
            <span className="font-display font-bold text-xl tracking-tighter text-white">Tushar | Data Analyst</span>
          </a>
          <p className="text-slate-500 text-sm max-w-xs text-center md:text-left">
            Empowering businesses through data-driven insights and strategic analysis.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-12 text-sm font-medium">
          <div className="flex flex-col gap-4 items-center md:items-start">
            <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Navigation</span>
            <a href="#home" className="text-slate-500 hover:text-white transition-colors">Home</a>
            <a href="#about" className="text-slate-500 hover:text-white transition-colors">About</a>
            <a href="#projects" className="text-slate-500 hover:text-white transition-colors">Projects</a>
          </div>
          <div className="flex flex-col gap-4 items-center md:items-start">
            <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Social</span>
            <a href="#" className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors">
              <Github className="w-4 h-4" /> Github
            </a>
            <a href="#" className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors">
              <Linkedin className="w-4 h-4" /> Linkedin
            </a>
            <a href="#" className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors">
              <Twitter className="w-4 h-4" /> Twitter
            </a>
          </div>
        </div>

        <button 
          onClick={scrollToTop}
          className="w-16 h-16 rounded-full glass-card flex items-center justify-center text-white hover:bg-electric hover:shadow-[0_0_20px_rgba(79,70,229,0.4)] transition-all group"
        >
          <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
        </button>
      </div>

      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] uppercase tracking-[0.2em] font-bold text-slate-600">
        <span>© 2026 TUSHAR PORTFOLIO. ALL RIGHTS RESERVED.</span>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
