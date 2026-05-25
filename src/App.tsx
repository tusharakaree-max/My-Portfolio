/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import { motion, useScroll, useSpring } from 'motion/react';

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <main className="relative selection:bg-neon/30 selection:text-white">
      <CustomCursor />
      <Navbar />
      
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-electric via-neon to-cyan-glow z-[60] origin-left"
        style={{ scaleX }}
      />
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.05)_0%,transparent_70%)]" />
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-neon/10 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-electric/10 rounded-full blur-[120px] animate-pulse-slow" />
      </div>

      <Hero />
      <About />
      <Skills />
      <Projects />
      <Certificates />
      
      <Contact />
      <Footer />
    </main>
  );
}
