'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BookOpen, Sparkles, ArrowRight, ShieldCheck, Zap, Lock, Mail } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';

export default function LoginPage() {
  const router = useRouter();
  const { loginAsDemo, login } = useAuth();
  const { palette, font } = useTheme();

  const [email, setEmail] = useState('alex.rivera@nu.edu.pk');
  const [password, setPassword] = useState('••••••••••••');
  const [isLoading, setIsLoading] = useState(false);

  const handleDemoSignIn = () => {
    setIsLoading(true);
    setTimeout(() => {
      loginAsDemo();
      router.push('/dashboard');
    }, 400);
  };

  const handleCustomSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      login(email, 'Alex Rivera');
      router.push('/dashboard');
    }, 400);
  };

  return (
    <>
      <Navbar palette={palette} />

      <main className="flex-grow pt-32 pb-24 px-4 sm:px-6 flex items-center justify-center min-h-[85vh]">
        <div className="w-full max-w-md">
          {/* Card Container */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl p-8 sm:p-10 text-left relative overflow-hidden">
            {/* Top theme accent line */}
            <div
              className="absolute top-0 left-0 right-0 h-1.5"
              style={{ backgroundColor: palette.accent }}
            />

            {/* Header */}
            <div className="mb-8">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-4 shadow-sm"
                style={{ backgroundColor: palette.textPrimary }}
              >
                <BookOpen className="w-6 h-6" />
              </div>

              <h1 className={`text-2xl sm:text-3xl font-extrabold text-ink tracking-tight ${font.displayClass}`}>
                Welcome to Learnova
              </h1>
              <p className="text-xs sm:text-sm text-ink-muted mt-1.5">
                Sign in to access your personal competency radar, calibrated practice arena, and syllabus notebooks.
              </p>
            </div>

            {/* Quick 1-Click Demo Login Banner */}
            <div className="mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" style={{ color: palette.accent }} />
                  Instant Student Demo
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  Ready
                </span>
              </div>
              <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                Log in as <strong>Alex Rivera</strong> (AP Scholar • 14-day streak • 1,420 XP) to explore the student workspace immediately.
              </p>
              <button
                type="button"
                onClick={handleDemoSignIn}
                disabled={isLoading}
                className="w-full py-2.5 px-4 rounded-xl text-white text-xs font-bold transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 group cursor-pointer"
                style={{ backgroundColor: palette.accent }}
              >
                <span>{isLoading ? 'Accessing Workspace...' : 'Launch Demo Student Dashboard'}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-grow border-t border-slate-200" />
              <span className="px-3 text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                Or Sign In With Email
              </span>
              <div className="flex-grow border-t border-slate-200" />
            </div>

            {/* Form */}
            <form onSubmit={handleCustomSignIn} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Academic Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-300 transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    Password
                  </label>
                  <a href="#forgot" className="text-[11px] font-semibold text-slate-500 hover:text-slate-800">
                    Forgot?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-300 transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-xl text-white text-xs font-bold transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2"
                style={{ backgroundColor: palette.textPrimary }}
              >
                <span>Sign In to Learnova</span>
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Academic Pilot Environment • FAST-NUCES 2026</span>
            </div>
          </div>
        </div>
      </main>

      <Footer palette={palette} />
    </>
  );
}
