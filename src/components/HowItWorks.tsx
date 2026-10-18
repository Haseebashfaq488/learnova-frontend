'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Compass, GitBranch, Sliders, Trophy, Activity } from 'lucide-react';
import { PaletteConfig, FontConfig } from '../types/theme';

interface HowItWorksProps {
  palette: PaletteConfig;
  font: FontConfig;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ palette, font }) => {
  return (
    <section id="how-it-works" className="py-24 sm:py-32 px-4 sm:px-8 lg:px-12 relative border-t border-slate-200/50 overflow-hidden">
      <div className="max-w-7xl mx-auto relative">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-xs font-semibold text-ink-muted mb-4">
            <Activity className="w-3.5 h-3.5" style={{ color: palette.accent }} />
            <span>The Continuous Adaptation Loop</span>
          </div>
          <h2 className={`text-3xl sm:text-5xl font-extrabold text-ink tracking-tight ${font.displayClass}`}>
            How adaptation works in practice.
          </h2>
          <p className="mt-3 text-ink-muted text-base max-w-lg mx-auto">
            A winding evidence path where every assessment dynamically shapes your next learning step.
          </p>
        </div>

        {/* Winding Snake SVG Path Guide (Desktop) */}
        <div className="hidden md:block absolute top-[280px] bottom-[150px] left-1/2 -translate-x-1/2 w-48 pointer-events-none -z-0">
          <svg className="w-full h-full" viewBox="0 0 100 800" fill="none" preserveAspectRatio="none">
            {/* Base snake track */}
            <path
              d="M 50,0 C 0,150 100,250 50,400 C 0,550 100,650 50,800"
              stroke="#E2E8F0"
              strokeWidth="4"
              strokeDasharray="6 6"
            />
            {/* Animated glowing snake beam */}
            <motion.path
              d="M 50,0 C 0,150 100,250 50,400 C 0,550 100,650 50,800"
              stroke={palette.accent}
              strokeWidth="4"
              strokeLinecap="round"
              initial={{ pathLength: 0.1, pathOffset: 0 }}
              animate={{ pathOffset: [0, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            />
          </svg>
        </div>

        {/* Zig-Zag Milestone Steps */}
        <div className="space-y-16 sm:space-y-24 relative z-10">
          
          {/* STEP 1: Diagnostic Assessment (Left) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6 }}
              className="md:col-span-6 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-float"
            >
              <div className="flex items-center justify-between mb-4">
                <span 
                  className="font-mono text-xs font-bold px-2.5 py-1 rounded-full"
                  style={{ backgroundColor: palette.accentLight, color: palette.accent }}
                >
                  Step 01
                </span>
                <Compass className="w-5 h-5 text-ink-muted" />
              </div>
              <h3 className="text-xl font-bold text-ink">Diagnostic Baseline</h3>
              <p className="mt-2 text-sm text-ink-muted leading-relaxed">
                Before any study begins, targeted diagnostic questions probe concept edges without grade penalties.
              </p>

              {/* Graphic: Confidence Bars */}
              <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200/60 space-y-2.5 text-xs font-mono">
                <div>
                  <div className="flex justify-between text-[11px] text-ink-muted mb-1">
                    <span>Loops &amp; Iteration</span>
                    <span className="font-bold text-ink">88% (Proficient)</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: palette.masteryColor }}
                      initial={{ width: 0 }}
                      whileInView={{ width: '88%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] text-ink-muted mb-1">
                    <span>Boolean Operators</span>
                    <span className="font-bold text-amber-600">52% (Focus Area)</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-amber-500"
                      initial={{ width: 0 }}
                      whileInView={{ width: '52%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Empty column for snake balance */}
            <div className="hidden md:block md:col-span-6 pl-12">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-ink-subtle">
                <span>01 Probe</span>
                <span className="text-slate-300">─────►</span>
                <span className="text-ink-muted font-semibold">Identifies exact starting knowledge</span>
              </div>
            </div>
          </div>

          {/* STEP 2: Structured Pathway (Right) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="hidden md:block md:col-span-6 pr-12 text-right">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-ink-subtle">
                <span className="text-ink-muted font-semibold">Validates prerequisite DAG relationships</span>
                <span className="text-slate-300">◄─────</span>
                <span>02 Route</span>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6 }}
              className="md:col-span-6 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-float"
            >
              <div className="flex items-center justify-between mb-4">
                <span 
                  className="font-mono text-xs font-bold px-2.5 py-1 rounded-full"
                  style={{ backgroundColor: palette.accentLight, color: palette.accent }}
                >
                  Step 02
                </span>
                <GitBranch className="w-5 h-5 text-ink-muted" />
              </div>
              <h3 className="text-xl font-bold text-ink">Personalized DAG Sequence</h3>
              <p className="mt-2 text-sm text-ink-muted leading-relaxed">
                The platform builds a personalized learning path with prerequisite validation, avoiding cycle deadlocks.
              </p>

              {/* Graphic: Branching Node Tree */}
              <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-between text-xs font-mono">
                <div className="flex flex-col items-center gap-1">
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-[11px]">
                    Variables
                  </span>
                  <span className="text-[10px] text-emerald-700">✓ Passed</span>
                </div>
                <span className="text-slate-300">──►</span>
                <div className="flex flex-col items-center gap-1">
                  <span 
                    className="px-2.5 py-1 rounded-lg text-white font-bold text-[11px] shadow-sm animate-pulse"
                    style={{ backgroundColor: palette.accent }}
                  >
                    Conditionals
                  </span>
                  <span className="text-[10px] text-ink font-semibold">Active Unit</span>
                </div>
                <span className="text-slate-300">──►</span>
                <div className="flex flex-col items-center gap-1 opacity-50">
                  <span className="px-2.5 py-1 rounded-lg bg-slate-200 text-ink-muted font-bold text-[11px]">
                    Loops
                  </span>
                  <span className="text-[10px] text-ink-muted">Locked</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* STEP 3: Adaptive Practice (Left) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6 }}
              className="md:col-span-6 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-float"
            >
              <div className="flex items-center justify-between mb-4">
                <span 
                  className="font-mono text-xs font-bold px-2.5 py-1 rounded-full"
                  style={{ backgroundColor: palette.accentLight, color: palette.accent }}
                >
                  Step 03
                </span>
                <Sliders className="w-5 h-5 text-ink-muted" />
              </div>
              <h3 className="text-xl font-bold text-ink">Calibrated Adaptive Practice</h3>
              <p className="mt-2 text-sm text-ink-muted leading-relaxed">
                As responses and latency are recorded, question difficulty calibrates to keep you in the optimal zone of challenge.
              </p>

              {/* Graphic: Difficulty Dial */}
              <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200/60">
                <div className="flex justify-between text-xs font-bold text-ink mb-2">
                  <span>Dynamic Difficulty Level</span>
                  <span style={{ color: palette.accent }}>Level 2.4 (Medium-High)</span>
                </div>
                <div className="w-full h-3 bg-slate-200 rounded-full relative overflow-hidden">
                  <motion.div 
                    className="h-full rounded-full"
                    style={{ backgroundColor: palette.accent }}
                    initial={{ width: '30%' }}
                    whileInView={{ width: '68%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                  />
                </div>
                <div className="flex justify-between text-[10px] font-mono text-ink-subtle mt-1.5">
                  <span>Foundational</span>
                  <span>Intermediate</span>
                  <span>Advanced</span>
                </div>
              </div>
            </motion.div>

            <div className="hidden md:block md:col-span-6 pl-12">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-ink-subtle">
                <span>03 Practice</span>
                <span className="text-slate-300">─────►</span>
                <span className="text-ink-muted font-semibold">Prevents both boredom and cognitive overload</span>
              </div>
            </div>
          </div>

          {/* STEP 4: Recalculated Mastery (Right) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="hidden md:block md:col-span-6 pr-12 text-right">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-ink-subtle">
                <span className="text-ink-muted font-semibold">Recalculates mastery only upon full submission</span>
                <span className="text-slate-300">◄─────</span>
                <span>04 Master</span>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6 }}
              className="md:col-span-6 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-float"
            >
              <div className="flex items-center justify-between mb-4">
                <span 
                  className="font-mono text-xs font-bold px-2.5 py-1 rounded-full"
                  style={{ backgroundColor: palette.accentLight, color: palette.accent }}
                >
                  Step 04
                </span>
                <Trophy className="w-5 h-5 text-amber-500" />
              </div>
              <h3 className="text-xl font-bold text-ink">Assessment Submission &amp; Recalculation</h3>
              <p className="mt-2 text-sm text-ink-muted leading-relaxed">
                Mastery recalculates when a complete assessment is submitted. The next node unlocks with accompanying XP habit rewards.
              </p>

              {/* Graphic: Mastery Unlocked Badge */}
              <div className="mt-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-emerald-800 font-mono tracking-wider">
                    Unit Complete
                  </span>
                  <h4 className="text-sm font-bold text-emerald-950 mt-0.5">
                    Conditional Logic Mastery: 92%
                  </h4>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-white border border-emerald-300 text-xs font-mono font-bold text-emerald-800">
                    +150 XP
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
};
