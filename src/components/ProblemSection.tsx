'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, CheckCircle2, Split, ArrowRight, Zap, Ban, Compass } from 'lucide-react';
import { PaletteConfig, FontConfig } from '../types/theme';

interface ProblemSectionProps {
  palette: PaletteConfig;
  font: FontConfig;
}

export const ProblemSection: React.FC<ProblemSectionProps> = ({ palette, font }) => {
  const [activeTab, setActiveTab] = useState<'rigid' | 'adaptive'>('adaptive');

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 relative border-t border-slate-200/50 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-xs font-semibold text-ink-muted mb-4">
            <Split className="w-3.5 h-3.5" style={{ color: palette.accent }} />
            <span>Interactive Comparison</span>
          </div>
          <h2 className={`text-3xl sm:text-5xl font-extrabold text-ink tracking-tight ${font.displayClass}`}>
            One fixed path doesn't fit every learner.
          </h2>
          <p className="mt-3 text-ink-muted text-base max-w-lg mx-auto">
            Toggle between the traditional one-size-fits-all conveyor belt and Learnova’s evidence-led path.
          </p>

          {/* Interactive Mode Tabs */}
          <div className="mt-8 inline-flex items-center p-1.5 rounded-2xl bg-slate-100/90 border border-slate-200/80 shadow-subtle">
            <button
              onClick={() => setActiveTab('rigid')}
              className={`relative px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === 'rigid' ? 'text-rose-700 shadow-sm' : 'text-ink-muted hover:text-ink'
              }`}
            >
              {activeTab === 'rigid' && (
                <motion.div
                  layoutId="problem-tab-active"
                  className="absolute inset-0 bg-white rounded-xl shadow-sm border border-rose-200"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <Ban className="w-4 h-4 relative z-10" />
              <span className="relative z-10">Traditional Rigid Path</span>
            </button>

            <button
              onClick={() => setActiveTab('adaptive')}
              className={`relative px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === 'adaptive' ? 'text-white shadow-sm' : 'text-ink-muted hover:text-ink'
              }`}
              style={{
                backgroundColor: activeTab === 'adaptive' ? palette.accent : 'transparent',
              }}
            >
              {activeTab === 'adaptive' && (
                <motion.div
                  layoutId="problem-tab-active"
                  className="absolute inset-0 rounded-xl shadow-sm"
                  style={{ backgroundColor: palette.accent }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <Zap className="w-4 h-4 relative z-10 text-white" />
              <span className="relative z-10 text-white">Learnova Adaptive Engine</span>
            </button>
          </div>
        </div>

        {/* Tabbed Interactive Canvas */}
        <AnimatePresence mode="wait">
          {activeTab === 'rigid' ? (
            /* TAB 1: RIGID MODEL */
            <motion.div
              key="rigid"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="bg-white rounded-3xl border border-rose-200 p-6 sm:p-10 shadow-float relative overflow-hidden"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-rose-100">
                <div>
                  <span className="text-xs font-bold font-mono text-rose-600 uppercase tracking-wider">
                    The Conveyor Belt Dilemma
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-ink mt-0.5">
                    Same Pace. Same Questions. Unaddressed Misconceptions.
                  </h3>
                </div>
                <div className="px-3 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold shrink-0">
                  ⚠️ Blind Curriculum Progression
                </div>
              </div>

              {/* Visual Conveyor Belt Simulation */}
              <div className="mt-8 space-y-4">
                {/* Student A (Advanced) */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 font-bold text-xs flex items-center justify-center shrink-0">
                      A
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-ink">Proficient Student (95% Baseline)</h4>
                      <p className="text-[11px] text-ink-muted">Forced to complete 25 identical basic drills before unlocking next unit.</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-amber-50 text-amber-700 text-[11px] font-mono font-semibold shrink-0">
                    Boredom &amp; Wasted Velocity
                  </span>
                </div>

                {/* Student B (Struggling) */}
                <div className="p-4 rounded-xl bg-rose-50/60 border border-rose-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-rose-200 text-rose-900 font-bold text-xs flex items-center justify-center shrink-0">
                      B
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-ink">Struggling Student (48% on Prerequisites)</h4>
                      <p className="text-[11px] text-ink-muted">Advanced into Complex Branching without understanding Boolean operators.</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-rose-100 text-rose-800 text-[11px] font-mono font-semibold shrink-0 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    Compounding Gap
                  </span>
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between text-xs text-ink-muted">
                <span>Result: Linear curriculum ignores topic-level evidence.</span>
                <span className="text-rose-600 font-bold">Rigid System Flaw</span>
              </div>
            </motion.div>
          ) : (
            /* TAB 2: LEARNOVA ADAPTIVE */
            <motion.div
              key="adaptive"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="bg-white rounded-3xl border shadow-float p-6 sm:p-10 relative overflow-hidden"
              style={{ borderColor: palette.accentBorder }}
            >
              <div 
                className="absolute top-0 right-0 w-64 h-64 blur-3xl pointer-events-none rounded-full opacity-20"
                style={{ backgroundColor: palette.accent }}
              />

              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-100 relative z-10">
                <div>
                  <span 
                    className="text-xs font-bold font-mono uppercase tracking-wider"
                    style={{ color: palette.accent }}
                  >
                    Evidence-Led Mastery
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-ink mt-0.5">
                    Tailored Difficulty. Immediate Remediation. Verified Mastery.
                  </h3>
                </div>
                <div 
                  className="px-3 py-1.5 rounded-full text-xs font-semibold shrink-0 flex items-center gap-1.5"
                  style={{ backgroundColor: palette.accentLight, color: palette.accent }}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Prerequisite-Aware Navigation
                </div>
              </div>

              {/* Visual Branching Simulation */}
              <div className="mt-8 space-y-4 relative z-10">
                {/* Student A (Accelerated) */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-8 h-8 rounded-full text-white font-bold text-xs flex items-center justify-center shrink-0"
                      style={{ backgroundColor: palette.accent }}
                    >
                      A
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-ink">Proficient Student (Accelerated Route)</h4>
                      <p className="text-[11px] text-ink-muted">Diagnostic verified Boolean logic mastery. System immediately offered nested algorithms.</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 text-[11px] font-mono font-semibold shrink-0 flex items-center gap-1">
                    <ArrowRight className="w-3 h-3 text-emerald-600" />
                    Unlocked Unit 3 (+120 XP)
                  </span>
                </div>

                {/* Student B (Remediated) */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-500 text-white font-bold text-xs flex items-center justify-center shrink-0">
                      B
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-ink">Supported Student (Remediation Loop)</h4>
                      <p className="text-[11px] text-ink-muted">Routed to 5-minute visual worked example on logic switches, closing the concept gap.</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-amber-50 text-amber-800 text-[11px] font-mono font-semibold shrink-0 flex items-center gap-1">
                    <Compass className="w-3 h-3 text-amber-600" />
                    Prerequisite Healed
                  </span>
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between text-xs text-ink-muted relative z-10">
                <span>Mastery recalculates only after full assessment submission.</span>
                <span className="font-bold" style={{ color: palette.accent }}>
                  Authentic Growth
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
