'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Network, 
  BarChart3, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Lock, 
  Unlock, 
  Layers, 
  Sparkles, 
  ChevronRight, 
  FileText, 
  RotateCcw,
  Check,
  X,
  Sliders,
  GraduationCap
} from 'lucide-react';
import { PaletteConfig, FontConfig } from '../types/theme';

interface TeacherSectionProps {
  palette: PaletteConfig;
  font: FontConfig;
}

type FacultyPerspective = 'topology' | 'telemetry' | 'gatekeeper';

export const TeacherSection: React.FC<TeacherSectionProps> = ({ palette, font }) => {
  const [activeTab, setActiveTab] = useState<FacultyPerspective>('topology');
  
  // Interactive state for Topology
  const [selectedNode, setSelectedNode] = useState<'node1' | 'node2' | 'node3'>('node2');
  const [masteryThreshold, setMasteryThreshold] = useState<number>(80);

  // Interactive state for Telemetry
  const [interventionSent, setInterventionSent] = useState<boolean>(false);

  // Interactive state for AI Gatekeeper
  const [reviewState, setReviewState] = useState<'pending' | 'approved' | 'rejected'>('pending');

  const perspectives = [
    {
      id: 'topology' as FacultyPerspective,
      title: 'Curriculum Topology & Prerequisites',
      summary: 'Design directed concept hierarchies with deterministic unlock rules.',
      highlight: 'Structured DAG sequencing',
      icon: Network,
    },
    {
      id: 'telemetry' as FacultyPerspective,
      title: 'Cohort Misconception Telemetry',
      summary: 'Detect latent conceptual bottlenecks before students reach exam day.',
      highlight: 'Empirical diagnostic radar',
      icon: BarChart3,
    },
    {
      id: 'gatekeeper' as FacultyPerspective,
      title: 'Human-in-the-Loop AI Verification',
      summary: 'Audit, tune, and sign off on every generated analogy and practice item.',
      highlight: '100% Faculty Authorized',
      icon: ShieldCheck,
    },
  ];

  return (
    <section id="teachers" className="py-24 sm:py-32 px-4 sm:px-8 lg:px-12 relative border-t border-slate-200/70 bg-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Authoritative Section Anchor: NO EYEBROW / KICKER */}
        <div className="max-w-3xl mb-16 text-left">
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight leading-[1.12] ${font.displayClass}`}>
            Teaching with absolute authority, backed by empirical student diagnostics.
          </h2>
          <p className="mt-5 text-ink-muted text-lg sm:text-xl leading-relaxed max-w-2xl">
            Learnova keeps educators in sovereign command of the learning sequence. Construct deterministic prerequisite trees, identify class-wide conceptual roadblocks, and enforce mandatory human approval on every AI-assisted prompt.
          </p>

          {/* Operational Benchmarks */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-100">
            <div>
              <div className="text-2xl font-extrabold text-ink">100%</div>
              <div className="text-xs font-medium text-ink-muted mt-0.5">Faculty Signed-Off Content</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-ink">Strict DAG</div>
              <div className="text-xs font-medium text-ink-muted mt-0.5">Prerequisite Validation Engine</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-ink">Real-time</div>
              <div className="text-xs font-medium text-ink-muted mt-0.5">Cognitive Bottleneck Radar</div>
            </div>
          </div>
        </div>

        {/* Master Studio Workspace (Asymmetric Two-Column Console) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Perspective Selectors */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {perspectives.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`text-left p-6 rounded-2xl transition-all duration-300 relative border ${
                    isActive
                      ? 'bg-slate-50 border-slate-300 shadow-sm'
                      : 'bg-white border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/60'
                  }`}
                  aria-pressed={isActive}
                >
                  {/* Active Indicator Bar */}
                  {isActive && (
                    <motion.div
                      layoutId="facultyActiveTabPill"
                      className="absolute left-0 top-3 bottom-3 w-1 rounded-r-full"
                      style={{ backgroundColor: palette.accent }}
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}

                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors"
                        style={{
                          backgroundColor: isActive ? palette.accentLight : '#f1f5f9',
                          color: isActive ? palette.accent : '#475569'
                        }}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className={`text-base sm:text-lg font-bold text-ink leading-snug ${font.displayClass}`}>
                          {tab.title}
                        </h3>
                        <span className="text-xs font-semibold text-slate-500 block mt-0.5">
                          {tab.highlight}
                        </span>
                      </div>
                    </div>
                    <ChevronRight 
                      className={`w-5 h-5 transition-transform duration-200 shrink-0 mt-1 ${
                        isActive ? 'text-ink translate-x-0.5' : 'text-slate-300'
                      }`} 
                    />
                  </div>

                  <p className="mt-3 text-sm text-ink-muted leading-relaxed pl-13">
                    {tab.summary}
                  </p>
                </button>
              );
            })}

            {/* Accreditation & Governance Statement */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-ink-muted leading-relaxed">
              <div className="flex items-center gap-2 font-bold text-ink mb-1.5">
                <GraduationCap className="w-4 h-4 text-emerald-700" />
                <span>FAST-NUCES SRS Academic Invariant</span>
              </div>
              Learnova guarantees instructors retain strict authority over course outlines, evaluation rubrics, and conceptual checkpoints. Students cannot bypass prerequisites without meeting instructor thresholds.
            </div>
          </div>

          {/* Right Column: Live Interactive Console Canvas */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-slate-200/90 bg-white shadow-float overflow-hidden">
              
              {/* Console Chrome Header */}
              <div className="px-6 py-4 bg-slate-50/90 border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 mr-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                  </div>
                  <span className="font-mono font-bold text-ink">CS201: Data Structures</span>
                  <span className="text-slate-400">/</span>
                  <span className="text-ink-muted">Faculty Console</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-mono text-emerald-700 font-semibold text-[11px]">
                    Academic Year 2026 • Live Sync
                  </span>
                </div>
              </div>

              {/* Dynamic Viewport Content */}
              <div className="p-6 sm:p-8 min-h-[460px] flex flex-col justify-between">
                <AnimatePresence mode="wait">
                  {/* VIEW 1: CURRICULUM TOPOLOGY */}
                  {activeTab === 'topology' && (
                    <motion.div
                      key="topology"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <h4 className="text-lg font-bold text-ink">Course Hierarchy & Dependency Map</h4>
                          <p className="text-xs text-ink-muted">Click a node to inspect prerequisite rules and threshold enforcement.</p>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-mono bg-slate-100 px-3 py-1.5 rounded-lg text-slate-700">
                          <Layers className="w-3.5 h-3.5 text-slate-500" />
                          <span>Strict DAG Mode Active</span>
                        </div>
                      </div>

                      {/* Interactive Visual Graph Nodes */}
                      <div className="space-y-3 py-2">
                        {/* Node 1: Prereq Foundation */}
                        <div 
                          onClick={() => setSelectedNode('node1')}
                          className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                            selectedNode === 'node1' 
                              ? 'border-emerald-500 bg-emerald-50/40 shadow-xs' 
                              : 'border-slate-200 bg-white hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                              01
                            </div>
                            <div>
                              <div className="text-sm font-bold text-ink flex items-center gap-2">
                                <span>Pointer Arithmetic & Memory Stacks</span>
                                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-md">
                                  Prerequisite Met
                                </span>
                              </div>
                              <div className="text-xs text-ink-muted">Unit 1 • 3 Verified Lectures • Diagnostic Score: 92%</div>
                            </div>
                          </div>
                          <Unlock className="w-4 h-4 text-emerald-600" />
                        </div>

                        {/* Connector Visual */}
                        <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-slate-400 py-0.5">
                          <span className="h-4 w-px bg-slate-300" />
                          <span>Requires ≥ {masteryThreshold}% Concept Mastery</span>
                          <span className="h-4 w-px bg-slate-300" />
                        </div>

                        {/* Node 2: In-Progress Target */}
                        <div 
                          onClick={() => setSelectedNode('node2')}
                          className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                            selectedNode === 'node2' 
                              ? 'border-indigo-500 bg-indigo-50/40 shadow-xs' 
                              : 'border-slate-200 bg-white hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
                              02
                            </div>
                            <div>
                              <div className="text-sm font-bold text-ink flex items-center gap-2">
                                <span>Singly & Doubly Linked Lists</span>
                                <span className="text-[10px] font-semibold text-indigo-700 bg-indigo-100/80 px-2 py-0.5 rounded-md">
                                  Current Cohort Topic
                                </span>
                              </div>
                              <div className="text-xs text-ink-muted">Unit 2 • 4 Lessons • 2 Socratic Practice Sets</div>
                            </div>
                          </div>
                          <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-ping" />
                        </div>

                        {/* Connector Visual */}
                        <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-slate-400 py-0.5">
                          <span className="h-4 w-px bg-slate-300" />
                          <span>Gated Dependency</span>
                          <span className="h-4 w-px bg-slate-300" />
                        </div>

                        {/* Node 3: Locked Dependent */}
                        <div 
                          onClick={() => setSelectedNode('node3')}
                          className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                            selectedNode === 'node3' 
                              ? 'border-amber-500 bg-amber-50/40 shadow-xs' 
                              : 'border-slate-200 bg-slate-50/70 hover:bg-slate-100/60'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs">
                              03
                            </div>
                            <div>
                              <div className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                <span>Self-Balancing AVL & Red-Black Trees</span>
                                <span className="text-[10px] font-semibold text-slate-600 bg-slate-200 px-2 py-0.5 rounded-md">
                                  Locked
                                </span>
                              </div>
                              <div className="text-xs text-slate-500">Unit 3 • Awaiting Student Mastery in Linked Lists</div>
                            </div>
                          </div>
                          <Lock className="w-4 h-4 text-slate-400" />
                        </div>
                      </div>

                      {/* Instructor Calibration Bar */}
                      <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs">
                        <div className="flex items-center gap-3">
                          <Sliders className="w-4 h-4 text-slate-500" />
                          <span className="font-semibold text-ink">Unlock Threshold Calibration:</span>
                          <span className="font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                            {masteryThreshold}% Pass Score
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setMasteryThreshold(70)}
                            className={`px-2.5 py-1 rounded text-xs font-semibold ${
                              masteryThreshold === 70 ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                          >
                            70% Standard
                          </button>
                          <button
                            type="button"
                            onClick={() => setMasteryThreshold(80)}
                            className={`px-2.5 py-1 rounded text-xs font-semibold ${
                              masteryThreshold === 80 ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                          >
                            80% Rigorous
                          </button>
                          <button
                            type="button"
                            onClick={() => setMasteryThreshold(90)}
                            className={`px-2.5 py-1 rounded text-xs font-semibold ${
                              masteryThreshold === 90 ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                          >
                            90% Mastery
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* VIEW 2: COHORT TELEMETRY */}
                  {activeTab === 'telemetry' && (
                    <motion.div
                      key="telemetry"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <h4 className="text-lg font-bold text-ink">Cohort Cognitive Bottleneck Radar</h4>
                          <p className="text-xs text-ink-muted">Section B • 46 Enrolled Students • Live Diagnostic Stream</p>
                        </div>
                        <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-amber-50 text-amber-800 border border-amber-200/80">
                          1 Critical Bottleneck Identified
                        </span>
                      </div>

                      {/* Real Pedagogical Breakdown */}
                      <div className="space-y-4 py-2">
                        {/* Topic 1 */}
                        <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-bold text-ink">Pointer Memory Allocation (`malloc / free`)</span>
                            <span className="font-mono font-semibold text-emerald-700">92% Proficient</span>
                          </div>
                          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div className="bg-emerald-500 h-full rounded-full" style={{ width: '92%' }} />
                          </div>
                          <div className="text-[11px] text-slate-500">42 of 46 students solved memory allocation tests without memory leaks.</div>
                        </div>

                        {/* Topic 2: The Bottleneck */}
                        <div className="p-4 rounded-xl border border-amber-300 bg-amber-50/40 space-y-2.5">
                          <div className="flex justify-between items-center text-xs">
                            <div className="flex items-center gap-1.5 font-bold text-amber-900">
                              <AlertTriangle className="w-4 h-4 text-amber-600" />
                              <span>Recursive Call Stack Unwinding & Base Case</span>
                            </div>
                            <span className="font-mono font-bold text-amber-700">44% (Cognitive Bottleneck)</span>
                          </div>
                          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                            <div className="bg-amber-500 h-full rounded-full" style={{ width: '44%' }} />
                          </div>
                          <div className="text-xs text-amber-950 font-medium">
                            Diagnosis: 26 students confused return value accumulation with premature termination inside recursive helpers.
                          </div>
                        </div>

                        {/* Topic 3 */}
                        <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-bold text-ink">Time Complexity (`O(1)` vs `O(n)`)</span>
                            <span className="font-mono font-semibold text-slate-700">79% On Track</span>
                          </div>
                          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div className="bg-indigo-500 h-full rounded-full" style={{ width: '79%' }} />
                          </div>
                          <div className="text-[11px] text-slate-500">Benchmark met for asymptotic notation fundamentals.</div>
                        </div>
                      </div>

                      {/* Instructor Action Deck */}
                      <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                        <div className="text-xs text-ink-muted">
                          Recommended Action: Deploy targeted 10-minute recursion unwinding recap.
                        </div>
                        <button
                          type="button"
                          onClick={() => setInterventionSent(true)}
                          disabled={interventionSent}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                            interventionSent 
                              ? 'bg-emerald-600 text-white cursor-default'
                              : 'bg-slate-900 text-white hover:bg-slate-800'
                          }`}
                        >
                          {interventionSent ? (
                            <>
                              <CheckCircle2 className="w-4 h-4" />
                              <span>Recap Module Deployed to Section B</span>
                            </>
                          ) : (
                            <>
                              <Sparkles className="w-4 h-4" />
                              <span>Deploy Targeted Lecture Recap</span>
                            </>
                          )}
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* VIEW 3: AI GATEKEEPER */}
                  {activeTab === 'gatekeeper' && (
                    <motion.div
                      key="gatekeeper"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <h4 className="text-lg font-bold text-ink">Mandatory AI Inspection Desk</h4>
                          <p className="text-xs text-ink-muted">Item #304 awaiting instructor sign-off before student publication.</p>
                        </div>
                        <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-slate-100 text-slate-800">
                          Bloom: Analysis (Level 4)
                        </span>
                      </div>

                      {/* AI Generated Draft Item */}
                      <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-3 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-slate-500 text-[11px]">Proposed Diagnostic Question</span>
                          <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60 flex items-center gap-1">
                            <Check className="w-3 h-3" /> Syllabus Aligned
                          </span>
                        </div>
                        <p className="text-sm font-semibold text-ink leading-relaxed">
                          &ldquo;Consider a singly linked list where node pointers are reversed in-place. If the traversal loop condition checks <code className="font-mono text-xs bg-slate-200/80 px-1 py-0.5 rounded">curr != nullptr</code> instead of <code className="font-mono text-xs bg-slate-200/80 px-1 py-0.5 rounded">curr-&gt;next != nullptr</code>, trace the memory address of the dangling reference at loop termination.&rdquo;
                        </p>
                        <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1.5 text-[11px] text-slate-600">
                          <div className="font-bold text-slate-800">Distractor Calibration Check:</div>
                          <div>• Option A: Identifies tail null-dereference (Target Key).</div>
                          <div>• Option B: Distinguishes between head detachment vs dangling stack pointer.</div>
                        </div>
                      </div>

                      {/* Review State Feedback */}
                      {reviewState !== 'pending' && (
                        <div className={`p-3.5 rounded-xl text-xs font-semibold flex items-center gap-2 ${
                          reviewState === 'approved' 
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                            : 'bg-rose-50 text-rose-800 border border-rose-200'
                        }`}>
                          {reviewState === 'approved' ? (
                            <>
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              <span>Item #304 Approved by Faculty. Released to Unit 2 student practice pool.</span>
                            </>
                          ) : (
                            <>
                              <X className="w-4 h-4 text-rose-600" />
                              <span>Item #304 Sent back to AI engine for distractor clarity adjustment.</span>
                            </>
                          )}
                        </div>
                      )}

                      {/* Faculty Approval Controls */}
                      <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                        <div className="text-xs text-slate-500 flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4 text-emerald-600" />
                          <span>Zero unreviewed items reach students.</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <button
                            type="button"
                            onClick={() => setReviewState('rejected')}
                            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors flex items-center gap-1.5"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>Request Revision</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setReviewState('approved')}
                            className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-xs flex items-center gap-1.5"
                          >
                            <Check className="w-4 h-4" />
                            <span>Authorize & Publish</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Bottom Canvas Footer Info */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span>FACULTY_GOVERNANCE_PROTOCOL_V4</span>
                  <span>ENCRYPTED & AUDITED AUDIENCE: INSTRUCTORS ONLY</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
