'use client';

import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const BackgroundAmbience = () => {
  // Pre-calculate random values to keep them stable across renders
  const [particles] = React.useState(() => [...Array(5)].map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    width: `${Math.random() * 3 + 1}px`,
    height: `${Math.random() * 3 + 1}px`
  })));

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none fixed">
      {/* Main Gradients */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#0B0F19] via-[#111827] to-[#0B0F19] opacity-90"></div>
      
      {/* Animated Orbs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15],
          rotate: [0, 10, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-indigo-600 rounded-full blur-[120px]"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.2, 0.1],
          rotate: [0, -10, 0]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear", delay: 2 }}
        className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-blue-700 rounded-full blur-[130px]"
      />
      <div className="absolute top-[30%] left-[20%] w-[20vw] h-[20vw] bg-purple-600 rounded-full blur-[100px] opacity-10 animate-pulse-slow"></div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      
      {/* Floating Particles */}
      {particles.map((p, i) => (
        <motion.div
          key={p.id}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute rounded-full bg-white blur-[1px]"
          style={{
            top: p.top,
            left: p.left,
            width: p.width,
            height: p.height,
          }}
        />
      ))}
    </div>
  );
};

export default BackgroundAmbience;
