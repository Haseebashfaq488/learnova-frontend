'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Network, 
  HelpCircle, 
  Sparkles, 
  Flame, 
  CheckCircle2, 
  AlertCircle, 
  Lock, 
  Shuffle, 
  GraduationCap, 
  ShieldCheck,
  Cpu
} from 'lucide-react';
import { PaletteConfig, FontConfig } from '../types/theme';

interface FeaturesSectionProps {
  palette: PaletteConfig;
  font: FontConfig;
}

type TabKey = 'dag' | 'assessment' | 'ai' | 'gamification';

interface TabItem {
  id: TabKey;
  label: string;
  shortDesc: string;
  icon: React.ElementType;
  badge: string;
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({ palette, font }) => {
  const [activeTab, setActiveTab] = useState<TabKey>('dag');

  // Interactive DAG state
  const [callStackMastered, setCallStackMastered] = useState<boolean>(false);

  // Interactive Assessment state
  const [assessmentFormat, setAssessmentFormat] = useState<'mcq' | 'matching' | 'short'>('mcq');
  const [difficultyTier, setDifficultyTier] = useState<'calibrated-1' | 'calibrated-2' | 'calibrated-3'>('calibrated-2');

  // Interactive AI mode
  const [tutorView, setTutorView] = useState<'concept' | 'analogy' | 'worked'>('analogy');

  // Interactive Gamification state
  const [streakCount, setStreakCount] = useState<number>(14);
  const [streakClicked, setStreakClicked] = useState<boolean>(false);

  const tabs: TabItem[] = [
    {
      id: 'dag',
      label: 'Learning Pathways',
      shortDesc: 'Foundations mapped before advanced topics',
      icon: Network,
      badge: 'Path Engine'
    },
    {
      id: 'assessment',
      label: 'Smart Practice Bank',
      shortDesc: 'Varied questions matched to your level',
      icon: HelpCircle,
      badge: 'Item Bank'
    },
    {
      id: 'ai',
      label: 'Contextual AI Support',
      shortDesc: 'Clear mental models & guided scaffolding',
      icon: Sparkles,
      badge: 'Scaffolding'
    },
    {
      id: 'gamification',
      label: 'Daily Study Habits',
      shortDesc: 'Streaks & XP cleanly isolated from grades',
      icon: Flame,
      badge: 'Fair Grades'
    }
  ];

  return (
    <section id="engine" className="py-24 sm:py-32 px-4 sm:px-8 lg:px-12 relative border-t border-slate-200/50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-xs font-semibold text-ink-muted mb-4">
            <Cpu className="w-3.5 h-3.5" style={{ color: palette.accent }} />
            <span>Platform Capabilities</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-extrabold text-ink tracking-tight ${font.displayClass}`}>
            Engineered for genuine academic mastery.
          </h2>
          <p className="mt-3 text-ink-muted text-base leading-relaxed">
            Explore how Learnova's learning engine guides, assesses, and supports your academic progress in real time.
          </p>
        </div>

        {/* Studio / Blueprint Layout */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden">
          
          {/* Top Pill Tab Bar */}
          <div className="border-b border-slate-200/80 bg-slate-50/70 p-2 sm:p-3">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex items-center gap-3 p-3.5 rounded-2xl text-left transition-all duration-300 ${
                      isActive 
                        ? 'bg-white shadow-sm border border-slate-200/80' 
                        : 'hover:bg-white/60 text-ink-muted'
                    }`}
                  >
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors"
                      style={{ 
                        backgroundColor: isActive ? palette.accentLight : '#f1f5f9',
                        color: isActive ? palette.accent : '#64748b'
                      }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className={`text-xs font-bold truncate ${isActive ? 'text-ink' : 'text-ink-muted'}`}>
                          {tab.label}
                        </span>
                      </div>
                      <span className="text-[11px] text-ink-subtle truncate block">
                        {tab.badge}
                      </span>
                    </div>

                    {isActive && (
                      <motion.div
                        layoutId="activeFeatureIndicator"
                        className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full"
                        style={{ backgroundColor: palette.accent }}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Blueprint Interactive Display Area */}
          <div className="p-6 sm:p-10 min-h-[460px] flex flex-col justify-center bg-gradient-to-b from-white to-slate-50/50">
            <AnimatePresence mode="wait">
              
              {/* TAB 1: INTELLIGENT LEARNING PATHWAYS */}
              {activeTab === 'dag' && (
                <motion.div
                  key="dag"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/70">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-ink">Intelligent Learning Pathways</h3>
                        <span className="px-2 py-0.5 text-[10px] font-mono font-semibold rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                          Prerequisite Mapping
                        </span>
                      </div>
                      <p className="text-xs text-ink-muted mt-1 leading-relaxed">
                        When a concept feels challenging, Learnova maps out foundational topics first, ensuring you build real mastery step by step.
                      </p>
                    </div>

                    {/* Interactive Toggle for the graph state */}
                    <button
                      onClick={() => setCallStackMastered(!callStackMastered)}
                      className="px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-2 self-start sm:self-auto shadow-sm"
                      style={{
                        backgroundColor: callStackMastered ? '#ecfdf5' : '#fff',
                        borderColor: callStackMastered ? '#a7f3d0' : '#cbd5e1',
                        color: callStackMastered ? '#065f46' : '#334155'
                      }}
                    >
                      <Shuffle className="w-3.5 h-3.5" />
                      <span>{callStackMastered ? 'Show Initial Concept Gap' : 'Simulate Foundations Completed'}</span>
                    </button>
                  </div>

                  {/* Visual Node Diagram */}
                  <div className="relative p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/80 shadow-subtle overflow-x-auto">
                    <div className="min-w-[580px] flex items-center justify-between relative">
                      
                      {/* Node 1: Functions */}
                      <div className="flex flex-col items-center z-10">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-md ring-4 ring-emerald-100">
                          <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-bold text-ink mt-2">Functions &amp; Scope</span>
                        <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full mt-0.5">
                          100% Completed
                        </span>
                      </div>

                      {/* Line 1 -> 2 */}
                      <div className="flex-1 h-0.5 bg-emerald-300 mx-2 relative">
                        <div className="absolute right-0 -top-1 w-2 h-2 border-t-2 border-r-2 border-emerald-500 rotate-45" />
                      </div>

                      {/* Node 2: Call Stack Fundamentals (Interactive) */}
                      <div className="flex flex-col items-center z-10">
                        <div 
                          className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-md transition-all duration-300 ring-4 ${
                            callStackMastered 
                              ? 'bg-emerald-500 text-white ring-emerald-100' 
                              : 'bg-amber-500 text-white ring-amber-100 animate-pulse'
                          }`}
                        >
                          {callStackMastered ? (
                            <CheckCircle2 className="w-7 h-7" />
                          ) : (
                            <AlertCircle className="w-7 h-7" />
                          )}
                        </div>
                        <span className="text-xs font-bold text-ink mt-2">Call Stack Fundamentals</span>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full mt-0.5 ${
                          callStackMastered 
                            ? 'text-emerald-600 bg-emerald-50' 
                            : 'text-amber-700 bg-amber-50 font-semibold'
                        }`}>
                          {callStackMastered ? 'Mastery Verified' : 'Recommended First'}
                        </span>
                      </div>

                      {/* Line 2 -> 3 */}
                      <div className={`flex-1 h-0.5 mx-2 relative transition-colors duration-300 ${
                        callStackMastered ? 'bg-emerald-300' : 'bg-slate-200'
                      }`}>
                        <div className={`absolute right-0 -top-1 w-2 h-2 border-t-2 border-r-2 rotate-45 transition-colors ${
                          callStackMastered ? 'border-emerald-500' : 'border-slate-300'
                        }`} />
                      </div>

                      {/* Node 3: Recursion Target */}
                      <div className="flex flex-col items-center z-10">
                        <div 
                          className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-md transition-all duration-300 ring-4 ${
                            callStackMastered 
                              ? 'text-white ring-opacity-30' 
                              : 'bg-slate-100 text-slate-400 ring-slate-100'
                          }`}
                          style={{
                            backgroundColor: callStackMastered ? palette.accent : undefined,
                            borderColor: callStackMastered ? palette.accent : undefined
                          }}
                        >
                          {callStackMastered ? (
                            <Sparkles className="w-6 h-6 animate-spin-slow" />
                          ) : (
                            <Lock className="w-6 h-6" />
                          )}
                        </div>
                        <span className="text-xs font-bold text-ink mt-2">Recursive Functions</span>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full mt-0.5 ${
                          callStackMastered 
                            ? 'text-indigo-700 bg-indigo-50 font-semibold' 
                            : 'text-slate-500 bg-slate-100'
                        }`}>
                          {callStackMastered ? 'Ready to Learn' : 'Foundations First'}
                        </span>
                      </div>

                      {/* Line 3 -> 4 */}
                      <div className="flex-1 h-0.5 bg-slate-200 mx-2 relative">
                        <div className="absolute right-0 -top-1 w-2 h-2 border-t-2 border-r-2 border-slate-300 rotate-45" />
                      </div>

                      {/* Node 4: Binary Trees */}
                      <div className="flex flex-col items-center z-10 opacity-50">
                        <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center border border-slate-200">
                          <Lock className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-bold text-ink mt-2">Binary Tree Algorithms</span>
                        <span className="text-[10px] font-mono text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full mt-0.5">
                          Upcoming Unit
                        </span>
                      </div>

                    </div>
                  </div>

                  {/* Adaptive Status Output */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] font-bold text-ink uppercase">Learning Path Status:</span>
                      <span className="text-ink-muted">
                        {callStackMastered 
                          ? 'Foundations verified. You are ready to explore [Recursive Functions].' 
                          : 'Quick refresher suggested: 2 short exercises on call stack execution before starting recursion.'}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-ink-subtle">Adaptive Mode</span>
                  </div>
                </motion.div>
              )}

              {/* TAB 2: SMART PRACTICE BANK */}
              {activeTab === 'assessment' && (
                <motion.div
                  key="assessment"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/70">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-ink">Varied, High-Signal Practice</h3>
                        <span className="px-2 py-0.5 text-[10px] font-mono font-semibold rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Verified Rubrics
                        </span>
                      </div>
                      <p className="text-xs text-ink-muted mt-1 leading-relaxed">
                        Practice with multiple choice, concept matching, and short-answer questions tailored to your learning stage.
                      </p>
                    </div>

                    {/* Format Selector Pills */}
                    <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl self-start sm:self-auto">
                      {(['mcq', 'matching', 'short'] as const).map((fmt) => (
                        <button
                          key={fmt}
                          onClick={() => setAssessmentFormat(fmt)}
                          className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                            assessmentFormat === fmt
                              ? 'bg-white shadow-sm text-ink'
                              : 'text-ink-muted hover:text-ink'
                          }`}
                        >
                          {fmt === 'mcq' ? 'Multiple Choice' : fmt === 'matching' ? 'Concept Matching' : 'Short Answer'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Interactive Question Card Simulation */}
                  <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-subtle">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded bg-slate-100 text-ink">
                          Topic: Function Execution
                        </span>
                        <span className="text-xs text-ink-subtle">• Practice Question</span>
                      </div>
                      
                      {/* Difficulty Selector */}
                      <div className="flex items-center gap-1">
                        <span className="text-[11px] text-ink-muted mr-1">Question Level:</span>
                        <button
                          onClick={() => setDifficultyTier('calibrated-1')}
                          className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold transition-colors ${
                            difficultyTier === 'calibrated-1' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                          }`}
                        >
                          Foundational
                        </button>
                        <button
                          onClick={() => setDifficultyTier('calibrated-2')}
                          className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold transition-colors ${
                            difficultyTier === 'calibrated-2' ? 'bg-indigo-100 text-indigo-800' : 'bg-slate-100 text-slate-500'
                          }`}
                        >
                          Practical
                        </button>
                        <button
                          onClick={() => setDifficultyTier('calibrated-3')}
                          className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold transition-colors ${
                            difficultyTier === 'calibrated-3' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-500'
                          }`}
                        >
                          Advanced
                        </button>
                      </div>
                    </div>

                    {/* Question Content Display */}
                    <div className="mt-4">
                      {assessmentFormat === 'mcq' && (
                        <div>
                          <p className="text-sm font-semibold text-ink">
                            {difficultyTier === 'calibrated-1'
                              ? 'Which memory area stores active function calls and local variables during execution?'
                              : difficultyTier === 'calibrated-2'
                              ? 'When a function calls itself deeply without a stopping point, what causes the call stack to overflow?'
                              : 'When computing recursive Fibonacci fib(5), which call branch results in the deepest stack frame allocation?'}
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 text-xs font-mono">
                            <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 hover:border-slate-300 cursor-pointer">
                              A) Heap dynamic storage
                            </div>
                            <div className="p-3 rounded-xl border border-emerald-300 bg-emerald-50/50 text-emerald-900 font-semibold flex items-center justify-between">
                              <span>B) Call stack activation frames</span>
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            </div>
                            <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 hover:border-slate-300 cursor-pointer">
                              C) Static instruction cache
                            </div>
                            <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 hover:border-slate-300 cursor-pointer">
                              D) Constant string pool
                            </div>
                          </div>
                        </div>
                      )}

                      {assessmentFormat === 'matching' && (
                        <div>
                          <p className="text-sm font-semibold text-ink mb-3">
                            Match each step with what happens during execution:
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                              <span className="font-bold text-ink">1. Function Invoked</span>
                              <p className="text-slate-500 text-[11px] mt-1">→ Pushes a new frame with return address onto the stack</p>
                            </div>
                            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                              <span className="font-bold text-ink">2. Base Case Reached</span>
                              <p className="text-slate-500 text-[11px] mt-1">→ Stops deeper calls and begins returning values back up</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {assessmentFormat === 'short' && (
                        <div>
                          <p className="text-sm font-semibold text-ink mb-2">
                            In your own words, why do recursive functions require a base case condition?
                          </p>
                          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs text-ink-muted">
                            <span className="text-ink font-semibold">Your Answer: </span>
                            "To terminate recursive invocations and prevent indefinite stack growth resulting in a stack overflow."
                          </div>
                          <div className="mt-2 text-[11px] flex items-center gap-1.5 text-emerald-700 font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Concept Check: All 3 core points clearly explained (termination, base case, stack overflow).</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-ink-muted pt-1">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      Verified assessment performance directly updates your topic mastery—no arbitrary guesswork.
                    </span>
                    <span className="font-mono text-[10px]">100% Curriculum Aligned</span>
                  </div>
                </motion.div>
              )}

              {/* TAB 3: CONTEXTUAL AI SUPPORT */}
              {activeTab === 'ai' && (
                <motion.div
                  key="ai"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/70">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-ink">Step-by-Step Conceptual Scaffolding</h3>
                        <span className="px-2 py-0.5 text-[10px] font-mono font-semibold rounded bg-amber-50 text-amber-700 border border-amber-200">
                          Guided Learning
                        </span>
                      </div>
                      <p className="text-xs text-ink-muted mt-1 leading-relaxed">
                        When a concept feels confusing, get clear mental models, visual analogies, and worked examples that teach you how to think.
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl self-start sm:self-auto">
                      {(['analogy', 'worked', 'concept'] as const).map((mode) => (
                        <button
                          key={mode}
                          onClick={() => setTutorView(mode)}
                          className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                            tutorView === mode
                              ? 'bg-white shadow-sm text-ink'
                              : 'text-ink-muted hover:text-ink'
                          }`}
                        >
                          {mode === 'analogy' ? 'Everyday Analogy' : mode === 'worked' ? 'Step-by-Step' : 'Technical Concepts'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Interactive Scaffold View */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    {/* Left: Question in Focus */}
                    <div className="md:col-span-5 p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-mono font-bold text-ink-subtle uppercase">Concept in Focus</span>
                        <h4 className="text-sm font-bold text-ink mt-1">Understanding Recursion Execution Order</h4>
                        <div className="mt-3 p-3 rounded-xl bg-white border border-slate-200 font-mono text-xs text-ink-muted">
                          <code>
                            def countdown(n):<br />
                            &nbsp;&nbsp;if n == 0: return<br />
                            &nbsp;&nbsp;countdown(n - 1)<br />
                            &nbsp;&nbsp;print(n) # when does this execute?
                          </code>
                        </div>
                      </div>
                      <div className="mt-4 pt-3 border-t border-slate-200/60 text-[11px] text-ink-subtle flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                        <span>Common Question: "Why does it print in reverse order (1, 2, 3)?"</span>
                      </div>
                    </div>

                    {/* Right: Scaffold Response */}
                    <div className="md:col-span-7 p-5 rounded-2xl bg-white border border-slate-200/80 shadow-subtle flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-mono font-bold uppercase" style={{ color: palette.accent }}>
                            Contextual Scaffolding Guide
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold">
                            Teacher Verified
                          </span>
                        </div>

                        {tutorView === 'analogy' && (
                          <div className="space-y-2">
                            <p className="text-xs font-semibold text-ink">
                              🥞 The Cafeteria Tray Stack:
                            </p>
                            <p className="text-xs text-ink-muted leading-relaxed">
                              Imagine placing clean trays onto a spring dispenser in a cafeteria. Each recursive call places another tray on top. You cannot print or use <code className="font-mono text-ink">n</code> until the top tray is lifted off in reverse order.
                            </p>
                            <div className="p-2.5 rounded-lg bg-indigo-50/60 border border-indigo-100 text-[11px] text-indigo-900 font-medium">
                              💡 Key Intuition: The base case stops stacking trays. Only then do you pop them off the stack from top to bottom.
                            </div>
                          </div>
                        )}

                        {tutorView === 'worked' && (
                          <div className="space-y-2 text-xs">
                            <div className="flex items-start gap-2">
                              <span className="w-5 h-5 rounded-full bg-slate-100 text-ink font-bold flex items-center justify-center shrink-0 text-[10px]">1</span>
                              <p className="text-ink-muted"><strong className="text-ink">Step 1:</strong> countdown(3) pauses at line 3, waiting for countdown(2) to complete.</p>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="w-5 h-5 rounded-full bg-slate-100 text-ink font-bold flex items-center justify-center shrink-0 text-[10px]">2</span>
                              <p className="text-ink-muted"><strong className="text-ink">Step 2:</strong> countdown(1) reaches countdown(0), which hits the base return condition.</p>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 text-[10px]">3</span>
                              <p className="text-ink-muted"><strong className="text-ink">Step 3:</strong> Unwinding begins: countdown(1) resumes and prints 1, then 2, then 3.</p>
                            </div>
                          </div>
                        )}

                        {tutorView === 'concept' && (
                          <div className="space-y-2">
                            <p className="text-xs text-ink-muted leading-relaxed">
                              In call stack mechanics, statements placed after a recursive call execute during the return phase. Each call frame preserves its own local variables and return address.
                            </p>
                            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 font-mono text-[11px] text-slate-700">
                              LIFO: Last-In, First-Out Execution Order.
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-ink-muted">
                        <span>Guidance Level: Step 1 of 3</span>
                        <span className="text-brand-indigo font-medium">Next: Follow-up check question →</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 4: ETHICAL GAMIFICATION */}
              {activeTab === 'gamification' && (
                <motion.div
                  key="gamification"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/70">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-ink">Habit Motivation with Academic Integrity</h3>
                        <span className="px-2 py-0.5 text-[10px] font-mono font-semibold rounded bg-amber-50 text-amber-700 border border-amber-200">
                          Protected Grades
                        </span>
                      </div>
                      <p className="text-xs text-ink-muted mt-1 leading-relaxed">
                        Celebrate daily study consistency with streaks and achievements—while your academic grades remain strictly based on verified mastery.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setStreakCount(c => c + 1);
                        setStreakClicked(true);
                        setTimeout(() => setStreakClicked(false), 800);
                      }}
                      className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-white transition-all shadow-sm flex items-center gap-1.5 self-start sm:self-auto"
                    >
                      <Flame className={`w-4 h-4 ${streakClicked ? 'scale-125' : ''} transition-transform`} />
                      <span>Log Daily Study Session</span>
                    </button>
                  </div>

                  {/* Dual Meters: Mastery vs. Habit */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    
                    {/* Meter 1: Genuine Academic Mastery (Strict) */}
                    <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-subtle flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-bold text-ink uppercase tracking-wider flex items-center gap-1.5">
                            <GraduationCap className="w-4 h-4 text-emerald-600" />
                            Academic Mastery Score
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-bold">
                            Official Grade Weight
                          </span>
                        </div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-4xl font-extrabold text-ink">88.4%</span>
                          <span className="text-xs font-semibold text-emerald-600">+2.1% this week</span>
                        </div>
                        <p className="text-xs text-ink-muted mt-2 leading-relaxed">
                          Calculated exclusively from verified assessment questions. No points can be farmed through repetition.
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-ink-subtle">
                        <span>Verified questions completed: 48</span>
                        <span>Confidence: High (0.94)</span>
                      </div>
                    </div>

                    {/* Meter 2: Habit Motivation & Streaks (Decoupled) */}
                    <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-subtle flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-bold text-ink uppercase tracking-wider flex items-center gap-1.5">
                            <Flame className="w-4 h-4 text-amber-500" />
                            Daily Study Habit Streak
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-50 text-amber-800 font-bold">
                            Motivation Reward
                          </span>
                        </div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-4xl font-extrabold text-amber-600">
                            {streakCount} Days
                          </span>
                          <span className="text-xs font-semibold text-amber-700">🔥 Active Streak</span>
                        </div>
                        <p className="text-xs text-ink-muted mt-2 leading-relaxed">
                          XP and badges reward regular, deliberate practice discipline—without artificially inflating your course GPA.
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-ink-subtle">
                        <span>Milestone: Silver Scholar</span>
                        <span>Next Milestone: 20 Days</span>
                      </div>
                    </div>

                  </div>

                  {/* Firewall Guarantee Bar */}
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs">
                    <span className="flex items-center gap-2 text-ink font-semibold">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      Academic Integrity Guarantee: 0% Grade Inflation from Gamification
                    </span>
                    <span className="font-mono text-[10px] text-ink-subtle">FAST-NUCES FYP Specification</span>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};
