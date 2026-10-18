'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  BookOpen, 
  BarChart3, 
  ShieldCheck, 
  Check
} from 'lucide-react';
import { PaletteConfig, FontConfig } from '../types/theme';

interface TeacherSectionProps {
  palette: PaletteConfig;
  font: FontConfig;
}

export const TeacherSection: React.FC<TeacherSectionProps> = ({ palette, font }) => {
  const cards = [
    {
      id: 'curriculum',
      number: '01',
      icon: BookOpen,
      title: 'Curriculum Authority',
      tagline: 'Teacher-Governed Structure',
      description: 'Design course hierarchies, define prerequisite relationships, and upload verified study materials with complete academic authority.',
      badgeText: 'Course → Topic → Lesson',
      visual: (
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 text-xs font-mono space-y-2">
          <div className="flex items-center justify-between text-ink">
            <span className="font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: palette.accent }} />
              Unit 1: Memory Stacks
            </span>
            <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-semibold border border-emerald-200/60">
              Published
            </span>
          </div>
          <div className="text-[11px] text-ink-muted flex items-center gap-2 pl-3 border-l-2 border-slate-200">
            <span>4 Lessons</span>
            <span>•</span>
            <span>3 Resources</span>
            <span>•</span>
            <span>Prereq Validated</span>
          </div>
        </div>
      ),
      highlight: '100% Educator Governed'
    },
    {
      id: 'analytics',
      number: '02',
      icon: BarChart3,
      title: 'Cohort Concept Telemetry',
      tagline: 'Empirical Class Insights',
      description: 'Pinpoint exact concept bottlenecks and class-wide topic mastery in real time—eliminating arbitrary grading guesswork.',
      badgeText: 'Evidence-Led Diagnostics',
      visual: (
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 text-xs font-mono space-y-2.5">
          <div>
            <div className="flex justify-between text-[11px] text-ink-muted mb-1">
              <span>Function Call Stacks</span>
              <span className="font-bold text-ink">88% (Proficient)</span>
            </div>
            <div className="h-1.5 rounded-full bg-slate-200 overflow-hidden">
              <div className="h-full rounded-full bg-emerald-500 w-[88%]" />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-[11px] text-ink-muted mb-1">
              <span>Recursion Return Order</span>
              <span className="font-bold" style={{ color: palette.accent }}>58% (Review Suggested)</span>
            </div>
            <div className="h-1.5 rounded-full bg-slate-200 overflow-hidden">
              <div 
                className="h-full rounded-full" 
                style={{ backgroundColor: palette.accent, width: '58%' }} 
              />
            </div>
          </div>
        </div>
      ),
      highlight: 'Actionable Weak-Spot Detection'
    },
    {
      id: 'audit',
      number: '03',
      icon: ShieldCheck,
      title: 'AI Gatekeeping & Review',
      tagline: 'Human-in-the-Loop Safeguards',
      description: 'Review and approve every AI-assisted explanation, analogy, and practice question before students ever encounter them.',
      badgeText: 'Mandatory Instructor Approval',
      visual: (
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-ink-subtle">Item #409 • Multiple Choice</span>
            <span 
              className="text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1"
              style={{ backgroundColor: palette.accentLight, color: palette.accent }}
            >
              <Check className="w-2.5 h-2.5 stroke-[3]" />
              Approved
            </span>
          </div>
          <p className="text-[11px] font-medium text-ink line-clamp-1 italic">
            "Trace stack unwinding order in recursive countdown(n)..."
          </p>
          <div className="flex items-center gap-2 pt-1 border-t border-slate-200/60 text-[10px] text-ink-muted">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            <span>Passed instructor verification audit</span>
          </div>
        </div>
      ),
      highlight: 'Zero Ungoverned AI Output'
    }
  ];

  return (
    <section id="teachers" className="py-24 sm:py-32 px-4 sm:px-8 lg:px-12 relative border-t border-slate-200/50">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-xs font-semibold text-ink-muted mb-4">
            <Users className="w-3.5 h-3.5" style={{ color: palette.accent }} />
            <span>Instructor Governance</span>
          </div>
          
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight ${font.displayClass}`}>
            Empowering teachers with complete visibility and control.
          </h2>
          
          <p className="mt-3 text-ink-muted text-base leading-relaxed">
            Create structured courses, see exactly which topics your class finds challenging, and verify AI-assisted study materials before students view them.
          </p>
        </div>

        {/* High-Craft 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                whileHover={{ y: -6 }}
                className="group relative flex flex-col justify-between p-7 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-float transition-all duration-300 overflow-hidden text-left"
              >
                {/* Top Theme Accent Bar on Hover */}
                <div 
                  className="absolute top-0 left-0 right-0 h-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundColor: palette.accent }}
                />

                <div>
                  {/* Top Header Pill Row */}
                  <div className="flex items-center justify-between mb-5">
                    <div 
                      className="w-11 h-11 rounded-2xl flex items-center justify-center text-ink shadow-2xs transition-transform duration-300 group-hover:scale-105"
                      style={{
                        backgroundColor: palette.accentLight,
                        color: palette.accent,
                      }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <span 
                      className="font-mono text-xs font-extrabold px-2.5 py-1 rounded-lg"
                      style={{
                        backgroundColor: '#f1f5f9',
                        color: '#64748b'
                      }}
                    >
                      {card.number}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <span className="text-[11px] font-bold uppercase tracking-wider text-ink-muted block mb-1">
                    {card.tagline}
                  </span>
                  
                  <h3 className={`text-xl sm:text-2xl font-extrabold text-ink tracking-tight leading-snug ${font.displayClass}`}>
                    {card.title}
                  </h3>

                  {/* Clean Minimal Text Description */}
                  <p className="mt-3 text-sm text-ink-muted leading-relaxed">
                    {card.description}
                  </p>

                  {/* Micro Visual Artifact */}
                  <div className="mt-6">
                    {card.visual}
                  </div>
                </div>

                {/* Card Footer Tag */}
                <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-ink-muted">
                    {card.highlight}
                  </span>
                  <div 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: palette.accent }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Trust Guarantee Strip */}
        <div className="mt-14 p-5 rounded-2xl bg-white/70 border border-slate-200/80 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-muted text-center sm:text-left">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              <strong className="text-ink font-semibold">Teacher-Governed Architecture:</strong> All curriculum updates and AI questions strictly require faculty authorization.
            </span>
          </div>

          <span className="font-mono text-[11px] text-ink-subtle">
            FAST-NUCES 2026 SRS Invariant
          </span>
        </div>
      </div>
    </section>
  );
};
