import { motion } from 'motion/react';
import { Mail, MapPin, Phone, Github, Linkedin, Twitter } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-electric/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-3xl mx-auto">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center flex flex-col items-center"
        >
          <span className="text-electric font-bold tracking-widest uppercase text-sm block mb-4">Connect</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">Let's build something <br /><span className="text-gradient">Extraordinary.</span></h2>
          <p className="text-slate-400 mb-12 max-w-lg leading-relaxed">
            I'm currently available for Open to internships, projects, and full-time roles. 
            Have an idea that needs a data-driven perspective? Let's talk.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12 w-full">
            {[
              { icon: Mail, label: 'Email', value: 'tusharakaree@gmail.com' },
              { icon: MapPin, label: 'Location', value: 'Open to Remote / Relocation' },
              { icon: Phone, label: 'Phone', value: '+91 7498912587' }
            ].map(item => (
              <div key={item.label} className="flex flex-col items-center gap-4 group glass-card p-6 rounded-3xl border-white/5 hover:border-electric/30 transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-cyan-glow group-hover:bg-electric group-hover:text-white transition-all duration-300">
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold tracking-widest text-slate-500 mb-1">{item.label}</div>
                  <div className="text-white font-medium text-sm">{item.value}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-4">
            {[
              { icon: Github, href: 'https://github.com' },
              { icon: Linkedin, href: 'https://www.linkedin.com/in/tushar-akare-13482b281' },
              { icon: Twitter, href: 'https://twitter.com' }
            ].map((social, idx) => (
              <a 
                key={idx} 
                href={social.href} 
                target="_blank" 
                rel="noreferrer" 
                className="w-12 h-12 rounded-2xl glass-card flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 transition-all"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
