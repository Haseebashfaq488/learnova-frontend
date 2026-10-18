'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, GraduationCap, ShieldCheck, Sparkles, Building, UserCheck } from 'lucide-react';
import { PaletteConfig, FontConfig } from '../types/theme';

interface FinalCTAProps {
  palette: PaletteConfig;
  font: FontConfig;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ palette, font }) => {
  const [role, setRole] = useState<'student' | 'teacher' | 'institution'>('student');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <section id="early-access" className="w-full relative overflow-hidden border-t border-slate-200/80">
      {/* Edge-to-Edge 2-Color Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px] w-full">
        
        {/* ================= LEFT HALF: Rich Theme Color & White Academic Typography ================= */}
        <div 
          className="lg:col-span-6 p-8 sm:p-14 lg:p-20 flex flex-col justify-between text-white relative overflow-hidden transition-colors duration-500"
          style={{ backgroundColor: palette.accent }}
        >
          {/* Subtle geometric background pattern overlay */}
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />

          <div className="relative z-10 max-w-xl">
            {/* Academic Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold tracking-wide mb-6">
              <GraduationCap className="w-4 h-4 text-white" />
              <span>Academic Pilot • FAST-NUCES Fall 2026</span>
            </div>

            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.12] ${font.displayClass}`}>
              Make every learning step deliberate.
            </h2>

            <p className="mt-5 text-white/90 text-base sm:text-lg leading-relaxed font-normal">
              Join students and faculty participating in the Learnova adaptive learning pilot. Structured curriculum, real-time topic mastery, and teacher-governed AI.
            </p>

            {/* Institutional Guarantees */}
            <div className="mt-8 space-y-3.5 text-sm font-medium text-white/95">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-white shrink-0" />
                <span>Intelligent prerequisite pathways guide you to the right next step</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-white shrink-0" />
                <span>Fair grading: Daily study streaks and rewards never artificially alter course grades</span>
              </div>
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-white shrink-0" />
                <span>Educator-governed: Teachers review and approve all study materials and questions</span>
              </div>
            </div>
          </div>

          {/* Academic Attribution Footer */}
          <div className="mt-10 pt-6 border-t border-white/20 relative z-10 text-xs text-white/80 font-mono flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span>Department of Computer Science</span>
            <span>FAST-NUCES Chiniot-Faisalabad</span>
          </div>
        </div>


        {/* ================= RIGHT HALF: Pure Crisp White Background & Interactive Form ================= */}
        <div className="lg:col-span-6 bg-white p-8 sm:p-14 lg:p-20 flex flex-col justify-center text-ink relative">
          <div className="max-w-xl w-full mx-auto">
            
            <div className="mb-8">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-ink-subtle block">
                Early Access Registration
              </span>
              <h3 className={`text-2xl sm:text-3xl font-extrabold text-ink mt-1 tracking-tight ${font.displayClass}`}>
                Request Pilot Access
              </h3>
              <p className="mt-2 text-sm text-ink-muted">
                Select your academic role to receive early access and onboarding materials.
              </p>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Role Selector Pills */}
                <div>
                  <label className="block text-xs font-bold text-ink mb-2">
                    I am registering as:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'student', label: 'Student', icon: GraduationCap },
                      { id: 'teacher', label: 'Instructor', icon: UserCheck },
                      { id: 'institution', label: 'Institution', icon: Building },
                    ].map((item) => {
                      const Icon = item.icon;
                      const isSelected = role === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setRole(item.id as any)}
                          className={`p-3 rounded-xl border text-xs font-semibold transition-all flex flex-col items-center gap-1.5 ${
                            isSelected
                              ? 'border-slate-900 bg-slate-900 text-white shadow-sm'
                              : 'border-slate-200 bg-slate-50 text-ink-muted hover:border-slate-300 hover:text-ink'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span>{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Name Field */}
                <div>
                  <label className="block text-xs font-bold text-ink mb-1.5">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Ayesha Khan"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-ink placeholder:text-ink-subtle focus:outline-none focus:ring-2 transition-all"
                    style={{ '--tw-ring-color': palette.accent } as React.CSSProperties}
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-xs font-bold text-ink mb-1.5">
                    Academic / Institutional Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@nu.edu.pk or university email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-ink placeholder:text-ink-subtle focus:outline-none focus:ring-2 transition-all"
                    style={{ '--tw-ring-color': palette.accent } as React.CSSProperties}
                  />
                </div>

                {/* Submit Button with Signature Shimmer */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full relative group overflow-hidden py-3.5 px-6 rounded-xl text-white text-sm font-semibold tracking-wide flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
                  style={{ backgroundColor: palette.accent }}
                >
                  <span className="relative z-10">Submit Request for Pilot Access</span>
                  <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-200 group-hover:translate-x-0.5" />
                  {/* Signature Shimmer Layer */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"
                  />
                </motion.button>

                <p className="text-[11px] text-ink-subtle text-center">
                  Zero spam • Strictly for academic deployment &amp; research pilot
                </p>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-emerald-950">
                  Access Request Submitted!
                </h4>
                <p className="text-xs text-emerald-800 leading-relaxed max-w-sm mx-auto">
                  Thank you, <strong>{name || 'Scholar'}</strong>. We have logged your request under the <strong>{role.toUpperCase()}</strong> track. Pilot cohort onboarding instructions will be dispatched to <strong>{email}</strong>.
                </p>
              </motion.div>
            )}

          </div>
        </div>

      </div>
    </section>
  );
};
