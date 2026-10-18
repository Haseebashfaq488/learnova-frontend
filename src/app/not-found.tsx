'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, ArrowLeft } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function NotFound() {
  const { palette } = useTheme();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-4 shadow-sm"
        style={{ backgroundColor: palette.textPrimary }}
      >
        <BookOpen className="w-8 h-8" />
      </div>

      <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
        404 — Page Not Found
      </h1>
      <p className="text-xs sm:text-sm text-slate-500 max-w-sm mt-2 mb-6 leading-relaxed">
        The requested syllabus route or workspace page could not be located on the Learnova platform.
      </p>

      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>

        <Link
          href="/dashboard"
          className="px-5 py-2.5 rounded-xl text-white text-xs font-bold transition-all shadow-xs hover:shadow-sm"
          style={{ backgroundColor: palette.accent }}
        >
          Student Dashboard
        </Link>
      </div>
    </div>
  );
}
