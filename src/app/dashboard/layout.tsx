'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AppHeader } from '../../components/student/AppHeader';
import { Sidebar } from '../../components/student/Sidebar';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { BranchedMenu } from '../../components/student/branched-menu';
import { usePathname } from 'next/navigation';
import {
  Compass,
  Play,
  Award,
  BookMarked,
  UserCircle,
  Zap,
  Sparkles,
  BookOpen,
  X,
} from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, loginAsDemo, user } = useAuth();
  const { palette } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Auto-authenticate as demo student if visiting dashboard directly
  useEffect(() => {
    if (!isAuthenticated) {
      loginAsDemo();
    }
  }, [isAuthenticated, loginAsDemo]);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const studentBranches = [
    {
      label: 'Main Workspace',
      children: [
        {
          value: 'hub',
          label: 'Dashboard / Hub',
          href: '/dashboard',
          icon: Compass,
        },
        {
          value: 'practice',
          label: 'Practice Arena',
          href: '/dashboard/practice',
          icon: Play,
          badge: 'Daily',
        },
        {
          value: 'analytics',
          label: 'Competency Radar',
          href: '/dashboard/analytics',
          icon: Award,
          badge: '82%',
        },
        {
          value: 'study',
          label: 'Focus Study Room',
          href: '/dashboard/study',
          icon: BookMarked,
          badge: 'AI',
        },
        {
          value: 'profile',
          label: 'Gamified Profile',
          href: '/dashboard/profile',
          icon: UserCircle,
          badge: `Lvl ${user?.level || 5}`,
        },
      ],
    },
    {
      label: 'Quick Resume',
      children: [
        {
          value: 'cs101',
          label: 'CS 101: Systems',
          href: '/courses/cs101-computer-systems',
          icon: Zap,
          badge: 'Unit 3',
        },
        {
          value: 'cs201',
          label: 'CS 201: Algorithms',
          href: '/courses/cs201-data-structures-algorithms',
          icon: Sparkles,
          badge: '42%',
        },
      ],
    },
    {
      label: 'Course Catalog',
      children: [
        {
          value: 'all-courses',
          label: 'Explore Catalog',
          href: '/courses',
          icon: BookOpen,
          badge: '6',
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-left">
      {/* 1. Sticky Portal Header */}
      <AppHeader
        onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
        isMobileMenuOpen={mobileMenuOpen}
      />

      {/* 2. Main Portal Shell: Left Signature Branched Sidebar + Main Viewport */}
      <div className="flex flex-1 relative">
        {/* Desktop Left Branched Sidebar */}
        <Sidebar />

        {/* Mobile Slide-Over Drawer for Branched Menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Slide-over panel */}
            <div className="relative w-72 max-w-[80vw] bg-white h-full shadow-2xl p-4 flex flex-col justify-between overflow-y-auto z-10 animate-in slide-in-from-left duration-200">
              <div>
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Navigation Tree
                  </span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <BranchedMenu
                  items={studentBranches}
                  currentPath={pathname}
                  defaultOpen={[0, 1, 2]}
                  width={240}
                  color={palette.textPrimary}
                  accentColor={palette.accent}
                  lineColor="#CBD5E1"
                />
              </div>

              <div className="pt-4 border-t border-slate-100">
                <p className="text-[11px] text-slate-500">
                  Learnova Student Portal • FAST-NUCES
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Content Viewport */}
        <main className="flex-1 min-w-0 w-full p-4 sm:p-6 md:p-8 lg:p-10 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
