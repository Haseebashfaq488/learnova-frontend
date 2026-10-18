'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, CheckCircle2, Sparkles } from 'lucide-react';
import { PaletteConfig } from '../types/theme';

interface EducationalTomeVisualProps {
  palette: PaletteConfig;
}

export const EducationalTomeVisual: React.FC<EducationalTomeVisualProps> = ({ palette }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div 
      className="relative w-full max-w-lg mx-auto py-6 flex items-center justify-center select-none"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* 1. Large Ambient Radiant Aura (Borderless) */}
      <div 
        className="absolute inset-0 blur-3xl pointer-events-none rounded-full opacity-30 transition-all duration-700"
        style={{
          background: `radial-gradient(circle, ${palette.accent} 0%, transparent 70%)`
        }}
      />

      {/* 2. Free-Floating Interactive Container with Subtle Tilt */}
      <motion.div
        animate={{
          y: [-6, 6, -6],
          rotateX: isHovered ? mousePos.y : 0,
          rotateY: isHovered ? mousePos.x : 0,
        }}
        transition={{
          y: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
          rotateX: { type: 'spring', stiffness: 200, damping: 20 },
          rotateY: { type: 'spring', stiffness: 200, damping: 20 },
        }}
        style={{ perspective: 1000 }}
        className="relative z-10 w-full flex flex-col items-center justify-center"
      >
        
        {/* Core Illustrated Open Knowledge Tome (Borderless Vector Art) */}
        <div className="relative w-full max-w-[420px] aspect-[4/3] flex items-center justify-center">
          <svg
            viewBox="0 0 500 380"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full drop-shadow-2xl overflow-visible"
          >
            <defs>
              {/* Cover Gradient */}
              <linearGradient id="coverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1E1610" />
                <stop offset="100%" stopColor="#38291F" />
              </linearGradient>

              {/* Parchment Left Page */}
              <linearGradient id="leftPageGrad" x1="100%" y1="0%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#F5EFE6" />
                <stop offset="50%" stopColor="#FAF7F2" />
                <stop offset="100%" stopColor="#FFFDF9" />
              </linearGradient>

              {/* Parchment Right Page */}
              <linearGradient id="rightPageGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ECE5DA" />
                <stop offset="50%" stopColor="#FAF7F2" />
                <stop offset="100%" stopColor="#FFFDF9" />
              </linearGradient>

              {/* Gold Ribbon Glow */}
              <linearGradient id="goldRibbon" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={palette.accent} />
                <stop offset="100%" stopColor="#F59E0B" />
              </linearGradient>

              {/* Ambient Page Shadow */}
              <radialGradient id="spineShadow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(0,0,0,0.22)" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>

            {/* Book Base Under-Shadow */}
            <ellipse cx="250" cy="330" rx="200" ry="24" fill="rgba(0,0,0,0.12)" filter="blur(10px)" />

            {/* Hardcover Back Spine & Wings */}
            <path
              d="M 50 280 Q 250 310 450 280 L 460 290 Q 250 325 40 290 Z"
              fill="url(#coverGrad)"
            />

            {/* Left Block Page Layers */}
            <path
              d="M 60 270 Q 248 296 248 296 L 248 95 Q 60 70 60 270 Z"
              fill="url(#leftPageGrad)"
              stroke="rgba(0,0,0,0.08)"
              strokeWidth="1.5"
            />
            {/* Left Page Curved Lines (Text Simulation) */}
            <path d="M 95 130 Q 170 142 220 145" stroke="rgba(30,22,16,0.18)" strokeWidth="3" strokeLinecap="round" />
            <path d="M 95 155 Q 170 167 220 170" stroke="rgba(30,22,16,0.18)" strokeWidth="3" strokeLinecap="round" />
            <path d="M 95 180 Q 170 192 220 195" stroke="rgba(30,22,16,0.18)" strokeWidth="3" strokeLinecap="round" />
            <path d="M 95 205 Q 150 215 180 217" stroke="rgba(30,22,16,0.15)" strokeWidth="3" strokeLinecap="round" />
            
            {/* Left Diagram Glyph (Prerequisite Tree Outline) */}
            <circle cx="120" cy="245" r="8" fill={palette.accent} fillOpacity="0.2" stroke={palette.accent} strokeWidth="2" />
            <circle cx="160" cy="235" r="8" fill={palette.accent} fillOpacity="0.2" stroke={palette.accent} strokeWidth="2" />
            <circle cx="200" cy="250" r="8" fill={palette.accent} stroke={palette.accent} strokeWidth="2" />
            <line x1="128" y1="243" x2="152" y2="237" stroke={palette.accent} strokeWidth="2" strokeDasharray="2 2" />
            <line x1="168" y1="237" x2="192" y2="247" stroke={palette.accent} strokeWidth="2" />

            {/* Right Block Page Layers */}
            <path
              d="M 440 270 Q 252 296 252 296 L 252 95 Q 440 70 440 270 Z"
              fill="url(#rightPageGrad)"
              stroke="rgba(0,0,0,0.08)"
              strokeWidth="1.5"
            />
            {/* Right Page Lines */}
            <path d="M 280 130 Q 340 128 405 120" stroke="rgba(30,22,16,0.18)" strokeWidth="3" strokeLinecap="round" />
            <path d="M 280 155 Q 340 153 405 145" stroke="rgba(30,22,16,0.18)" strokeWidth="3" strokeLinecap="round" />
            <path d="M 280 180 Q 340 178 405 170" stroke="rgba(30,22,16,0.18)" strokeWidth="3" strokeLinecap="round" />
            <path d="M 280 205 Q 330 203 360 197" stroke="rgba(30,22,16,0.15)" strokeWidth="3" strokeLinecap="round" />

            {/* Right Page Interactive Math Formula: ∑(knowledge) */}
            <text x="285" y="252" fontFamily="'Fraunces', Georgia, serif" fontSize="28" fill={palette.accent} fontWeight="bold">
              ∑
            </text>
            <text x="315" y="246" fontFamily="monospace" fontSize="13" fill="#1E1610" fontWeight="600">
              f(mastery) → 1.0
            </text>

            {/* Spine Crease Depth Shadow */}
            <rect x="246" y="90" width="8" height="208" fill="url(#spineShadow)" />

            {/* Golden Bookmark Ribbon Cascading Down */}
            <path
              d="M 248 90 Q 252 160 262 230 Q 268 280 278 320 L 290 310 L 292 335 Q 275 320 260 280 Q 250 200 248 90 Z"
              fill="url(#goldRibbon)"
              opacity="0.95"
            />

            {/* Floating Ascending Knowledge Sparks (SVG Particles) */}
            <g className="animate-pulse">
              <circle cx="210" cy="70" r="3" fill={palette.accent} />
              <circle cx="290" cy="55" r="4" fill="#F59E0B" />
              <circle cx="250" cy="40" r="2.5" fill={palette.accent} />
              <circle cx="340" cy="80" r="3" fill="#10B981" />
            </g>
          </svg>
        </div>

        {/* 3. Floating Glassmorphic Micro-Chips (Completely Borderless Placement) */}
        
        {/* Chip 1: Daily Habit & Streak (Top Right) */}
        <motion.div
          animate={{ y: [-4, 4, -4] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-3 sm:top-2 right-0 sm:-right-4 px-3.5 py-2 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-float flex items-center gap-2.5 z-20"
        >
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
            <Flame className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-left">
            <span className="text-[10px] text-ink-muted font-mono uppercase block font-semibold">Consistency</span>
            <span className="text-xs font-extrabold text-ink block">14-Day Streak • Level 6</span>
          </div>
        </motion.div>

        {/* Chip 2: Dynamic Topic Mastery (Bottom Left) */}
        <motion.div
          animate={{ y: [4, -4, 4] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="absolute -bottom-4 sm:bottom-0 left-0 sm:-left-6 p-3.5 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-float z-20 max-w-[220px] text-left"
        >
          <div className="flex items-center justify-between text-xs font-bold mb-1.5">
            <span className="text-ink flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Topic Mastery
            </span>
            <span className="text-emerald-700 font-mono text-[11px]">94%</span>
          </div>
          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full w-[94%]" />
          </div>
          <span className="text-[10px] text-ink-muted mt-1.5 block font-mono">
            Advanced Unit Unlocked
          </span>
        </motion.div>

        {/* Chip 3: AI Scaffolding Prompt (Bottom Right) */}
        <motion.div
          animate={{ y: [-3, 5, -3] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-6 -right-2 sm:-right-8 p-3 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-float z-20 max-w-[210px] text-left hidden sm:block"
        >
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-brand-indigo mb-1">
            <Sparkles className="w-3 h-3" style={{ color: palette.accent }} />
            <span>Contextual Analogy</span>
          </div>
          <p className="text-[11px] text-ink-muted leading-tight">
            “Stack unwinds in reverse order like cafeteria trays.”
          </p>
        </motion.div>

      </motion.div>
    </div>
  );
};
