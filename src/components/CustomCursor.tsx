import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;
      setIsHovering(
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') !== null || 
        target.closest('button') !== null
      );
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="hidden md:block pointer-events-none fixed inset-0 z-[9999]">
      <motion.div
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
          scale: isHovering ? 2.5 : 1,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 400, mass: 0.5 }}
        className="w-4 h-4 bg-white rounded-full mix-blend-difference"
      />
      <motion.div
        animate={{
          x: mousePosition.x - 24,
          y: mousePosition.y - 24,
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.5 : 0.2,
        }}
        transition={{ type: "spring", damping: 25, stiffness: 200, mass: 0.8 }}
        className="w-12 h-12 border border-white rounded-full mix-blend-difference"
      />
    </div>
  );
}
