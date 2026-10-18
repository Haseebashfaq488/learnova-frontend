import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  GitFork, 
  CheckCircle2, 
  Flame, 
  Sliders, 
  Lightbulb, 
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { PaletteConfig, FontConfig } from '../types/theme';

interface AnimatedFeatureReelProps {
  palette: PaletteConfig;
  font: FontConfig;
}

export const AnimatedFeatureReel: React.FC<AnimatedFeatureReelProps> = ({ palette, font }) => {
  // Feature 1: Adaptive route state
  const [routeState, setRouteState] = useState<'standard' | 'remediation'>('standard');

  // Feature 2: Assessment interactive answer
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  // Feature 3: AI Analogy Slider
  const [analogyMode, setAnalogyMode] = useState<'analogy' | 'jargon'>('analogy');

  // Feature 4: Streak pulse
  const [streakDays, setStreakDays] = useState<number>(14);
  const [streakPulsing, setStreakPulsing] = useState<boolean>(false);

  const handleStreakClick = () => {
    setStreakDays((prev) => prev + 1);
    setStreakPulsing(true);
    setTimeout(() => setStreakPulsing(false), 600);
  };

  return (
    <section id="features-reel" className="py-20 sm:py-24 px-4 sm:px-6 relative border-t border-slate-200/60 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header with Minimal Copy */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-xs font-semibold text-ink-muted mb-3">
            <Sparkles className="w-3.5 h-3.5" style={{ color: palette.accent }} />
            <span>Platform Capabilities</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-extrabold text-ink tracking-tight ${font.displayClass}`}>
            Intelligence in motion.
          </h2>
          <p className="mt-2 text-ink-muted text-sm sm:text-base">
            Touch, test, and experience the core mechanics driving every Learnova journey.
          </p>
        </div>

        {/* 4 Kinetic Interactive Feature Demos (2x2 Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* ================= DEMO 1: Adaptive Route Engine ================= */}
          <motion.div 
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
            className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/80 shadow-subtle flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div 
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: palette.accentLight, color: palette.accent }}
                  >
                    <GitFork className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-ink">Adaptive Rerouting</h3>
                    <p className="text-[11px] text-ink-subtle">Real-time prerequisite branch dispatch</p>
                  </div>
                </div>

                <button
                  onClick={() => setRouteState(s => s === 'standard' ? 'remediation' : 'standard')}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-semibold border border-slate-200 bg-slate-50 hover:bg-white text-ink transition-all flex items-center gap-1 shadow-xs"
                >
                  <RotateCcw className="w-3 h-3 text-ink-muted" />
                  <span>{routeState === 'standard' ? 'Simulate Gap' : 'Reset Flow'}</span>
                </button>
              </div>

              {/* Animated Interactive Node Pathway */}
              <div className="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-200/60 relative overflow-hidden">
                <div className="flex items-center justify-between text-xs font-mono relative z-10">
                  
                  {/* Step 1 */}
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold shadow-sm">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] text-ink-muted mt-1.5 font-sans font-semibold">Basics</span>
                  </div>

                  {/* Beam 1 */}
                  <div className="flex-1 h-1 bg-emerald-300 mx-2 rounded-full relative overflow-hidden">
                    <motion.div 
                      className="absolute inset-y-0 left-0 bg-emerald-500 w-1/2 rounded-full"
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                    />
                  </div>

                  {/* Step 2 (Forking) */}
                  <div className="flex flex-col items-center">
                    <motion.div 
                      animate={{ scale: routeState === 'remediation' ? [1, 1.1, 1] : 1 }}
                      transition={{ duration: 0.8, repeat: routeState === 'remediation' ? Infinity : 0 }}
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold shadow-sm ${
                        routeState === 'remediation' ? 'bg-amber-500 text-white ring-4 ring-amber-100' : 'bg-emerald-500 text-white'
                      }`}
                    >
                      {routeState === 'remediation' ? '!' : '✓'}
                    </motion.div>
                    <span className="text-[10px] text-ink-muted mt-1.5 font-sans font-semibold">
                      {routeState === 'remediation' ? 'Gap Found' : 'Mastered'}
                    </span>
                  </div>

                  {/* Beam 2 */}
                  <div className={`flex-1 h-1 mx-2 rounded-full transition-colors ${
                    routeState === 'remediation' ? 'bg-amber-200' : 'bg-emerald-300'
                  }`} />

                  {/* Step 3 (Branch Target) */}
                  <div className="flex flex-col items-center">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow-sm"
                      style={{ backgroundColor: palette.accent }}
                    >
                      ★
                    </div>
                    <span className="text-[10px] text-ink-muted mt-1.5 font-sans font-semibold">
                      {routeState === 'remediation' ? 'Remediation' : 'Next Lesson'}
                    </span>
                  </div>

                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px] font-mono text-ink-muted">
                  <span>Engine: {routeState === 'remediation' ? 'Branching to [Call Stack 101]' : 'Linear Progression Active'}</span>
                  <span className="text-emerald-700 font-semibold font-sans">0 min wasted</span>
                </div>
              </div>
            </div>

            <p className="mt-4 text-xs text-ink-muted leading-relaxed">
              Never forces students to repeat mastered topics, nor pushes them ahead blindly with conceptual holes.
            </p>
          </motion.div>


          {/* ================= DEMO 2: Multi-Format Assessment ================= */}
          <motion.div 
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
            className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/80 shadow-subtle flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div 
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: palette.accentLight, color: palette.accent }}
                  >
                    <Sliders className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-ink">Calibrated Questions</h3>
                    <p className="text-[11px] text-ink-subtle">Strict rubrics across MCQ, Matching, &amp; Code</p>
                  </div>
                </div>

                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-50 text-indigo-700">
                  Bloom L2 (Apply)
                </span>
              </div>

              {/* Interactive Mini Quiz Widget */}
              <div className="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-2.5">
                <p className="text-xs font-semibold text-ink">
                  When a recursive function hits its base case, what happens next?
                </p>

                <div className="space-y-1.5 text-xs font-mono">
                  {[
                    { id: 0, text: 'A) Heap allocates more space', correct: false },
                    { id: 1, text: 'B) Call stack unwinds active frames', correct: true },
                  ].map((item) => {
                    const isSelected = selectedAnswer === item.id;
                    const isCorrect = item.correct;

                    return (
                      <button
                        key={item.id}
                        onClick={() => setSelectedAnswer(item.id)}
                        className={`w-full p-2.5 rounded-xl text-left transition-all flex items-center justify-between border ${
                          isSelected
                            ? isCorrect
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold'
                              : 'bg-rose-50 border-rose-300 text-rose-950'
                            : 'bg-white border-slate-200/80 text-ink-muted hover:border-slate-300'
                        }`}
                      >
                        <span>{item.text}</span>
                        {isSelected && (
                          <span className="text-[11px] font-bold">
                            {isCorrect ? '✓ Correct' : '✗ Retry'}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <p className="mt-4 text-xs text-ink-muted leading-relaxed">
              Every interaction logs verified evidence directly to the student's mastery profile.
            </p>
          </motion.div>


          {/* ================= DEMO 3: Contextual AI Analogies ================= */}
          <motion.div 
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
            className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/80 shadow-subtle flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div 
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: palette.accentLight, color: palette.accent }}
                  >
                    <Lightbulb className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-ink">Contextual AI Analogies</h3>
                    <p className="text-[11px] text-ink-subtle">Mental models, not ungrounded chat</p>
                  </div>
                </div>

                {/* Mode Pill Toggle */}
                <div className="flex items-center p-0.5 bg-slate-100 rounded-lg text-[10px] font-semibold">
                  <button
                    onClick={() => setAnalogyMode('analogy')}
                    className={`px-2 py-0.5 rounded-md transition-all ${
                      analogyMode === 'analogy' ? 'bg-white shadow-xs text-ink font-bold' : 'text-ink-muted'
                    }`}
                  >
                    Analogy
                  </button>
                  <button
                    onClick={() => setAnalogyMode('jargon')}
                    className={`px-2 py-0.5 rounded-md transition-all ${
                      analogyMode === 'jargon' ? 'bg-white shadow-xs text-ink font-bold' : 'text-ink-muted'
                    }`}
                  >
                    Formal
                  </button>
                </div>
              </div>

              {/* Dynamic Content Morph */}
              <div className="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-200/60 min-h-[110px] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  {analogyMode === 'analogy' ? (
                    <motion.div
                      key="analogy"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="space-y-1.5"
                    >
                      <span className="text-[10px] font-mono font-bold uppercase text-amber-700">
                        🥞 Cafeteria Plate Dispenser
                      </span>
                      <p className="text-xs text-ink leading-relaxed">
                        Each function call places a plate onto the spring stack. You can only wash the plates by popping them off in reverse order.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="jargon"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="space-y-1.5"
                    >
                      <span className="text-[10px] font-mono font-bold uppercase text-slate-500">
                        LIFO Stack Activation
                      </span>
                      <p className="text-xs text-ink leading-relaxed font-mono">
                        Activation records store local scope pointers and return registers sequentially on the call stack segment.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <p className="mt-4 text-xs text-ink-muted leading-relaxed">
              Scaffolds difficult ideas into intuitive concepts without doing the learner's homework for them.
            </p>
          </motion.div>


          {/* ================= DEMO 4: Decoupled Streaks & Mastery ================= */}
          <motion.div 
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
            className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/80 shadow-subtle flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                    <Flame className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-ink">Decoupled Gamification</h3>
                    <p className="text-[11px] text-ink-subtle">Habit rewards cleanly isolated from grades</p>
                  </div>
                </div>

                <button
                  onClick={handleStreakClick}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-amber-500 hover:bg-amber-600 text-white transition-all flex items-center gap-1 shadow-xs"
                >
                  <Flame className={`w-3.5 h-3.5 ${streakPulsing ? 'scale-125' : ''} transition-transform`} />
                  <span>Check In</span>
                </button>
              </div>

              {/* Kinetic Streak & Grade Split Meter */}
              <div className="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-200/60">
                <div className="grid grid-cols-2 gap-3 items-center text-center">
                  
                  {/* Left: Habit */}
                  <div className="p-3 rounded-xl bg-white border border-slate-200/80">
                    <span className="text-[10px] font-mono text-amber-700 font-bold block">
                      STREAK XP
                    </span>
                    <span className="text-2xl font-black text-ink block mt-0.5">
                      🔥 {streakDays}d
                    </span>
                    <span className="text-[10px] text-ink-subtle block mt-0.5">Motivates habit</span>
                  </div>

                  {/* Right: Academic Mastery */}
                  <div className="p-3 rounded-xl bg-white border border-slate-200/80">
                    <span className="text-[10px] font-mono text-emerald-700 font-bold block">
                      GRADE MASTERY
                    </span>
                    <span className="text-2xl font-black text-ink block mt-0.5">
                      89.2%
                    </span>
                    <span className="text-[10px] text-ink-subtle block mt-0.5">Strict assessment</span>
                  </div>

                </div>

                <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] font-semibold text-emerald-800">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Zero grade inflation from daily points</span>
                </div>
              </div>
            </div>

            <p className="mt-4 text-xs text-ink-muted leading-relaxed">
              Encourages disciplined daily study habits without diluting authentic institutional grading.
            </p>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
