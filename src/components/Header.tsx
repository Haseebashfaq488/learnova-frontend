'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Compass,
  CheckCircle2,
  BookOpen
} from 'lucide-react';
import { PaletteConfig } from '../types/theme';
import { ThreeBackground } from './ThreeBackground';
import { EducationalTomeVisual } from './EducationalTomeVisual';

interface HeaderProps {
  palette: PaletteConfig;
  onNavigateCourses?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ palette, onNavigateCourses }) => {
  return (
    <section className="relative pt-28 sm:pt-36 pb-20 sm:pb-28 px-4 sm:px-8 lg:px-12 overflow-hidden min-h-[90vh] flex flex-col justify-center">
      {/* Ambient background particle constellation */}
      <ThreeBackground palette={palette} />

      {/* Atmospheric radial glow behind split hero */}
      <div 
        className="absolute top-1/2 left-3/4 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[550px] blur-3xl pointer-events-none rounded-full opacity-25 transition-all duration-700"
        style={{
          background: `radial-gradient(circle, ${palette.accent} 0%, transparent 70%)`
        }}
      />
      
      {/* Expansive Widescreen Container: max-w-7xl */}
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* ================= LEFT COLUMN: Minimal Text & Actions ================= */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            
            {/* Status Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-subtle mb-6"
            >
              <span 
                className="flex h-2 w-2 rounded-full animate-pulse" 
                style={{ backgroundColor: palette.accent }}
              />
              <span className="text-xs font-semibold tracking-wide text-ink">
                Adaptive Learning Platform • FAST-NUCES 2026
              </span>
            </motion.div>

            {/* Powerful, Minimal Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-ink leading-[1.08]"
            >
              Education shaped to <br />
              <span 
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage: `linear-gradient(to right, ${palette.textPrimary}, ${palette.accent})`
                }}
              >
                how you actually learn.
              </span>
            </motion.h1>

            {/* Exactly 1 Sentence of High-Impact Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-base sm:text-lg text-ink-muted font-normal leading-relaxed max-w-xl"
            >
              Structured curriculum, real-time topic mastery, and contextual AI support working together in one evidence-led syllabus.
            </motion.p>

            {/* Action Buttons with Signature Hover Shine */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              {/* Primary Action Button with Signature Shimmer */}
              <motion.a
                href="#early-access"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative group overflow-hidden px-7 py-4 rounded-xl text-white text-sm font-semibold tracking-wide flex items-center gap-2.5 shadow-md hover:shadow-lg transition-all"
                style={{ backgroundColor: palette.accent }}
              >
                <span className="relative z-10">Request Early Access</span>
                <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-200 group-hover:translate-x-0.5" />
                {/* Signature Shimmer Layer */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"
                />
              </motion.a>

              <motion.a
                href="#how-it-works"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-4 rounded-xl bg-white/90 backdrop-blur-md text-ink text-sm font-semibold tracking-wide border border-slate-200 shadow-subtle hover:bg-slate-50 transition-colors flex items-center gap-2"
              >
                <Compass className="w-4 h-4" style={{ color: palette.accent }} />
                <span>See Progression</span>
              </motion.a>

              {onNavigateCourses && (
                <motion.button
                  onClick={onNavigateCourses}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-4 rounded-xl bg-white/90 backdrop-blur-md text-ink text-sm font-semibold tracking-wide border border-slate-200 shadow-subtle hover:bg-slate-50 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" style={{ color: palette.accent }} />
                  <span>Browse Courses</span>
                </motion.button>
              )}
            </motion.div>

            {/* Quick Proof Micro-Pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 pt-6 border-t border-slate-200/60 flex flex-wrap items-center gap-5 text-xs font-mono text-ink-muted"
            >
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Clear Prerequisites</span>
              </div>
              <span className="text-slate-300">•</span>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Topic Mastery</span>
              </div>
              <span className="text-slate-300">•</span>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Teacher Governed</span>
              </div>
            </motion.div>

          </div>


          {/* ================= RIGHT COLUMN: Free-Floating Illuminated Tome (No Card Borders) ================= */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative w-full flex items-center justify-center"
          >
            <EducationalTomeVisual palette={palette} />
          </motion.div>

        </div>
      </div>
    </section>
  );
};
