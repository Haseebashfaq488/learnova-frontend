'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Award,
  Zap,
  Flame,
  ShieldCheck,
  Sparkles,
  Calendar,
  CheckCircle2,
  Lock,
  Cpu,
  Binary,
  Layers,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';
import { useAuth } from '../../../context/AuthContext';
import {
  studentProfile,
  gamificationBadges,
  dailyQuests,
  GamificationBadge,
} from '../../../data/studentData';

export default function StudentProfilePage() {
  const { palette, font } = useTheme();
  const { user } = useAuth();
  const [activeFilter, setActiveFilter] = useState<'all' | 'unlocked' | 'locked'>('all');

  const filteredBadges = gamificationBadges.filter((b) => {
    if (activeFilter === 'unlocked') return b.isUnlocked;
    if (activeFilter === 'locked') return !b.isUnlocked;
    return true;
  });

  const getRarityBadge = (rarity: GamificationBadge['rarity']) => {
    switch (rarity) {
      case 'Legendary':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'Epic':
        return 'bg-purple-100 text-purple-900 border-purple-300';
      case 'Rare':
        return 'bg-sky-100 text-sky-900 border-sky-300';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-amber-600" />;
      case 'Flame':
        return <Flame className="w-5 h-5 text-rose-500" />;
      case 'Binary':
        return <Binary className="w-5 h-5 text-emerald-600" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-indigo-500" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-amber-500" />;
      default:
        return <Award className="w-5 h-5 text-slate-500" />;
    }
  };

  return (
    <div className="space-y-8 text-left w-full">
      {/* Header Profile Identity Card */}
      <section className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 relative overflow-hidden">
        {/* Top banner accent gradient */}
        <div
          className="absolute top-0 left-0 right-0 h-24"
          style={{
            background: `linear-gradient(135deg, ${palette.textPrimary} 0%, ${palette.accent} 100%)`,
          }}
        />

        <div className="relative pt-10 sm:pt-8 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
            {/* Avatar */}
            <div className="relative w-24 h-24 rounded-3xl overflow-hidden border-4 border-white shadow-md bg-white">
              <img
                src={
                  user?.avatarUrl ||
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'
                }
                alt={user?.name || 'Alex Rivera'}
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-white" />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                  {user?.cohort || studentProfile.cohort}
                </span>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80">
                  Level {user?.level || 5} Scholar
                </span>
              </div>
              <h1 className={`text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight ${font.displayClass}`}>
                {user?.name || studentProfile.name}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                {studentProfile.tier}
              </p>
            </div>
          </div>

          {/* Quick Streak & XP Pill */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-emerald-800 shadow-xs">
              <Flame className="w-4 h-4 fill-emerald-500 text-emerald-500" />
              <div>
                <span className="text-xs font-extrabold block leading-tight">
                  {user?.streakDays || 14} Days
                </span>
                <span className="text-[10px] text-emerald-700">Active Streak</span>
              </div>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-900 shadow-xs">
              <Award className="w-4 h-4 text-amber-600" />
              <div>
                <span className="text-xs font-extrabold block leading-tight">
                  {user?.currentXp?.toLocaleString() || '1,420'} XP
                </span>
                <span className="text-[10px] text-amber-700">Total Scholastic XP</span>
              </div>
            </div>
          </div>
        </div>

        {/* Level XP Bar */}
        <div className="pt-6 mt-6 border-t border-slate-100 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700">Level 5 Progress</span>
            <span className="text-slate-500">
              <strong>1,420</strong> / 2,000 XP (580 XP remaining to Level 6)
            </span>
          </div>
          <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: '71%',
                backgroundColor: palette.accent,
              }}
            />
          </div>
        </div>
      </section>

      {/* 2-Column Row: Quests (Left) + Badges (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Daily Quests & Milestones (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <h3 className="font-bold text-sm text-slate-900">Active Quests</h3>
              </div>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                3 Assigned
              </span>
            </div>

            <div className="space-y-3">
              {dailyQuests.map((quest) => (
                <div
                  key={quest.id}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">
                      {quest.title}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-700">
                      +{quest.xpReward} XP
                    </span>
                  </div>

                  <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-emerald-500"
                      style={{
                        width: `${(quest.currentProgress / quest.targetProgress) * 100}%`,
                      }}
                    />
                  </div>

                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>
                      {quest.currentProgress}/{quest.targetProgress} completed
                    </span>
                    <span>{quest.isCompleted ? '✓ Completed' : 'Pending'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Invariants Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">
              Academic Record Invariants
            </h4>
            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex items-center justify-between">
                <span>Verified Diagnostic Checkpoints:</span>
                <span className="font-bold text-slate-900">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Interactive Labs Completed:</span>
                <span className="font-bold text-slate-900">4</span>
              </div>
              <div className="flex items-center justify-between">
                <span>AI Collaborative Inquiries:</span>
                <span className="font-bold text-slate-900">28</span>
              </div>
            </div>
          </div>
        </div>

        {/* Gamification Badges Showcase (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                Scholastic Achievements &amp; Badges
              </h2>
              <p className="text-xs text-slate-500">
                Unlock badges by demonstrating high-order concept mastery and continuous practice.
              </p>
            </div>

            {/* Filter Toggle */}
            <div className="flex items-center gap-1 bg-white p-1 rounded-2xl border border-slate-200 shadow-xs">
              {(['all', 'unlocked', 'locked'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold capitalize transition-all ${
                    activeFilter === filter
                      ? 'text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                  style={activeFilter === filter ? { backgroundColor: palette.accent } : undefined}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredBadges.map((badge) => (
              <div
                key={badge.id}
                className={`p-5 rounded-3xl border transition-all flex flex-col justify-between space-y-4 ${
                  badge.isUnlocked
                    ? 'bg-white border-slate-200/90 shadow-sm hover:shadow-md'
                    : 'bg-slate-50/70 border-dashed border-slate-300 opacity-75'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border ${
                      badge.isUnlocked ? 'bg-slate-50 border-slate-200' : 'bg-slate-100 border-slate-200'
                    }`}
                  >
                    {badge.isUnlocked ? (
                      getBadgeIcon(badge.icon)
                    ) : (
                      <Lock className="w-5 h-5 text-slate-400" />
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${getRarityBadge(badge.rarity)}`}>
                        {badge.rarity}
                      </span>
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                        +{badge.xpReward} XP
                      </span>
                    </div>

                    <h3 className="font-bold text-sm text-slate-900">
                      {badge.name}
                    </h3>

                    <p className="text-xs text-slate-500 leading-relaxed">
                      {badge.description}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  {badge.isUnlocked ? (
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Unlocked {badge.unlockedAt}</span>
                    </span>
                  ) : (
                    <div className="w-full space-y-1.5">
                      <div className="flex justify-between text-slate-500">
                        <span>Progress: {badge.criteria}</span>
                        <span className="font-bold">{badge.progressPercent}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-slate-400"
                          style={{ width: `${badge.progressPercent}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
