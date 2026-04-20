import React from 'react';
import { motion } from 'framer-motion';

const BackgroundAmbient: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Brass Ambient Orb */}
      <motion.div
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -100, 50, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-brass/10 rounded-full blur-[120px]"
      />
      
      {/* Ivory Ambient Orb */}
      <motion.div
        animate={{
          x: [0, -120, 80, 0],
          y: [0, 80, -120, 0],
          scale: [1, 0.8, 1.3, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] bg-white rounded-full blur-[100px] opacity-40"
      />

      {/* Subtle Sage Highlight */}
      <motion.div
        animate={{
          x: [0, 50, -50, 0],
          y: [0, 50, -50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[40%] right-[30%] w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[150px]"
      />
      
      {/* Grounding Charcoal Depth */}
      <div className="absolute inset-0 bg-slate-50/80" />
    </div>
  );
};

export default BackgroundAmbient;
