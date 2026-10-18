'use client';

import React from 'react';
import Link from 'next/link';
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
  ArrowRight,
  GraduationCap,
  ChevronRight,
} from 'lucide-react';
import { BranchedMenu, BranchedMenuItem } from './branched-menu';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

export interface SidebarProps {
  className?: string;
  width?: number;
}

export function Sidebar({ className = '', width = 240 }: SidebarProps) {
  const pathname = usePathname();
  const { palette } = useTheme();
  const { user } = useAuth();

  const studentBranches: BranchedMenuItem[] = [
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
      label: 'Active Courses',
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
      label: 'Explore',
      children: [
        {
          value: 'all-courses',
          label: 'Course Catalog',
          href: '/courses',
          icon: BookOpen,
          badge: '6 Tracks',
        },
      ],
    },
  ];

  return (
    <aside
      className={`sticky top-16 hidden md:flex h-[calc(100vh-4rem)] w-64 shrink-0 flex-col justify-between overflow-y-auto border-r border-slate-200/80 bg-white/95 backdrop-blur-sm p-4 transition-colors duration-300 z-20 ${className}`}
    >
      <div className="space-y-4">
        {/* Workspace Identifier Header */}
        <div className="px-2 pt-1 pb-2 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-lg flex items-center justify-center text-white text-[10px] font-bold shadow-xs"
              style={{ backgroundColor: palette.textPrimary }}
            >
              <GraduationCap className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block leading-tight">
                Academic Hub
              </span>
              <span className="text-[10px] text-slate-400 font-medium">
                FAST-NUCES 2026
              </span>
            </div>
          </div>
          <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Active
          </span>
        </div>

        {/* The Branched Tree Menu */}
        <BranchedMenu
          items={studentBranches}
          currentPath={pathname}
          defaultOpen={[0, 1, 2]}
          width={width}
          color={palette.textPrimary}
          accentColor={palette.accent}
          lineColor="#CBD5E1"
        />
      </div>

      {/* Footer Milestone Card */}
      <div className="pt-4 border-t border-slate-100">
        <div className="rounded-2xl p-3.5 bg-slate-50 border border-slate-200/80 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              <span>Next Milestone</span>
            </div>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-md">
              Level 6
            </span>
          </div>

          <p className="text-[11px] text-slate-600 leading-relaxed">
            Solve 2 more questions in the Practice Arena to unlock Level 6 Scholar!
          </p>

          <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: '71%', backgroundColor: palette.accent }}
            />
          </div>

          <Link
            href="/dashboard/practice"
            className="flex items-center justify-between w-full px-3 py-2 rounded-xl text-white text-xs font-bold transition-all shadow-xs hover:shadow-sm mt-1"
            style={{ backgroundColor: palette.accent }}
          >
            <span>Launch Practice</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
