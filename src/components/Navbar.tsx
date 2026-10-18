'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Menu, X, BookOpen, Compass, Zap, LayoutDashboard } from 'lucide-react';
import { PaletteConfig } from '../types/theme';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  palette: PaletteConfig;
  currentView?: any;
  onNavigateHome?: () => void;
  onNavigateCourses?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ palette }) => {
  const pathname = usePathname();
  const { user, isAuthenticated } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Courses', href: '/courses' },
    { name: 'How It Works', href: '/#how-it-works' },
    { name: 'Architecture', href: '/#engine' },
    { name: 'For Teachers', href: '/#teachers' },
    { name: 'Early Access', href: '/#early-access' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-8 lg:px-12 pt-4">
      <div className="max-w-7xl mx-auto">
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={`flex items-center justify-between px-5 sm:px-8 py-3.5 sm:py-4 rounded-2xl transition-all duration-300 ${
            isScrolled
              ? 'glass-nav shadow-nav border border-slate-200/90 py-3'
              : 'bg-white/80 backdrop-blur-md border border-slate-200/60 shadow-subtle'
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none">
            <div 
              className="relative w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-sm overflow-hidden transition-transform duration-300 group-hover:scale-105"
              style={{ backgroundColor: palette.textPrimary }}
            >
              <BookOpen className="w-5 h-5 text-white relative z-10" />
              <motion.div
                className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold tracking-tight text-xl text-ink font-display flex items-center gap-1.5 leading-none">
                Learnova
                <span 
                  className="inline-block w-1.5 h-1.5 rounded-full animate-pulse" 
                  style={{ backgroundColor: palette.accent }}
                />
              </span>
              <span className="text-[11px] text-ink-muted font-medium tracking-wide uppercase mt-0.5">
                Adaptive Learning
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-1.5 bg-slate-100/70 p-1.5 rounded-xl border border-slate-200/60">
            {navLinks.map((item, idx) => {
              const isActive = pathname === item.href || (item.href === '/courses' && pathname?.startsWith('/courses'));
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className={`relative px-4 py-2 text-sm font-semibold tracking-wide transition-all duration-200 rounded-lg cursor-pointer ${
                    isActive
                      ? 'bg-white shadow-xs text-ink'
                      : hoveredIdx === idx 
                        ? 'bg-white shadow-xs text-ink scale-[1.02]' 
                        : 'text-ink-muted hover:text-ink'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {item.name === 'Courses' && (
                      <span 
                        className="w-1.5 h-1.5 rounded-full" 
                        style={{ backgroundColor: palette.accent }}
                      />
                    )}
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Right Action Button Area */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated && user ? (
              <div className="flex items-center gap-3">
                {/* Streak Chip */}
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold">
                  <Zap className="h-3.5 w-3.5 fill-emerald-500 text-emerald-500" />
                  <span>{user.streakDays}d Streak</span>
                </div>

                {/* Dashboard Link */}
                <Link
                  href="/dashboard"
                  className="relative group overflow-hidden px-4 py-2.5 rounded-xl text-white text-xs font-bold tracking-wide flex items-center gap-2 shadow-sm hover:shadow-md transition-all"
                  style={{ backgroundColor: palette.accent }}
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Student Dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-4 py-2 text-xs font-bold text-ink-muted hover:text-ink transition-colors"
                >
                  Student Sign In
                </Link>

                <Link
                  href="/#early-access"
                  className="relative group overflow-hidden px-5 py-2.5 rounded-xl text-white text-sm font-semibold tracking-wide flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
                  style={{ backgroundColor: palette.accent }}
                >
                  <span className="relative z-10">Request Access</span>
                  <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
              </div>
            )}
          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-ink hover:bg-slate-100 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </motion.nav>

        {/* Mobile dropdown menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="md:hidden mt-2 p-4 bg-white/95 backdrop-blur-xl rounded-2xl border border-slate-200/90 shadow-xl flex flex-col gap-2"
            >
              {navLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold text-ink hover:bg-slate-100 transition-colors flex items-center justify-between text-left"
                >
                  <span className="flex items-center gap-2">
                    {item.name === 'Courses' && (
                      <span 
                        className="w-1.5 h-1.5 rounded-full" 
                        style={{ backgroundColor: palette.accent }}
                      />
                    )}
                    {item.name}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>
              ))}

              <div className="pt-2 border-t border-slate-100 space-y-2">
                {isAuthenticated ? (
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-3 rounded-xl text-white text-sm font-bold flex items-center justify-center gap-2 shadow-sm"
                    style={{ backgroundColor: palette.accent }}
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Go to Student Dashboard</span>
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-3 rounded-xl border border-slate-200 text-ink text-sm font-semibold flex items-center justify-center gap-2 shadow-2xs"
                  >
                    <span>Sign In to Student Portal</span>
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};
