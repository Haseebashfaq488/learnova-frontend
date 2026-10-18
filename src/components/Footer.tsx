'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { PaletteConfig } from '../types/theme';

interface FooterProps {
  palette: PaletteConfig;
  onNavigateHome?: () => void;
  onNavigateCourses?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  palette, 
}) => {
  return (
    <footer className="py-12 border-t border-slate-200/80 bg-white/50 text-xs text-ink-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div 
            className="w-7 h-7 rounded-lg flex items-center justify-center text-white"
            style={{ backgroundColor: palette.textPrimary }}
          >
            <BookOpen className="w-3.5 h-3.5" />
          </div>
          <Link 
            href="/"
            className="font-bold text-sm text-ink font-display hover:opacity-80 transition-opacity"
          >
            Learnova
          </Link>
          <span className="text-slate-300">|</span>
          <span className="text-[11px] text-ink-muted">
            Adaptive &amp; Gamified Learning Platform
          </span>
        </div>

        {/* Anchors & Routes */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-medium">
          <Link 
            href="/courses" 
            className="hover:text-ink transition-colors font-semibold"
            style={{ color: palette.accent }}
          >
            Browse Courses
          </Link>
          <Link href="/#how-it-works" className="hover:text-ink transition-colors">How It Works</Link>
          <Link href="/#engine" className="hover:text-ink transition-colors">Architecture</Link>
          <Link href="/#teachers" className="hover:text-ink transition-colors">For Teachers</Link>
          <Link href="/#early-access" className="hover:text-ink transition-colors">Request Access</Link>
        </div>

        {/* Academic Attribution */}
        <div className="text-[11px] text-ink-subtle text-center sm:text-right">
          <p>© {new Date().getFullYear()} Learnova. FAST-NUCES FYP 2026.</p>
        </div>
      </div>
    </footer>
  );
};
