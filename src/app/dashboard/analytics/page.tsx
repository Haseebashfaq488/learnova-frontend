'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Award,
  Zap,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  TrendingUp,
  Clock,
  ArrowRight,
  ShieldCheck,
  BookOpen,
  Filter,
} from 'lucide-react';
import { RadarChart } from '../../../components/student/radar-chart';
import { useTheme } from '../../../context/ThemeContext';
import { useAuth } from '../../../context/AuthContext';
import { radarMetrics, topicBreakdowns, TopicMastery } from '../../../data/studentData';

export default function StudentAnalyticsPage() {
  const { palette, font } = useTheme();
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'Computer Systems', 'Data Structures', 'Algorithms', 'Operating Systems'];

  const filteredTopics = selectedCategory === 'all'
    ? topicBreakdowns
    : topicBreakdowns.filter((t) => t.category === selectedCategory);

  const getStatusBadge = (status: TopicMastery['status']) => {
    switch (status) {
      case 'mastered':
        return {
          label: 'Mastered (>=85%)',
          bg: 'bg-emerald-50 text-emerald-800 border-emerald-200/80',
          dot: 'bg-emerald-500',
        };
      case 'learning':
        return {
          label: 'In Progress (60-84%)',
          bg: 'bg-sky-50 text-sky-800 border-sky-200/80',
          dot: 'bg-sky-500',
        };
      case 'struggling':
        return {
          label: 'Needs Review (<60%)',
          bg: 'bg-rose-50 text-rose-800 border-rose-200/80',
          dot: 'bg-rose-500',
        };
    }
  };

  return (
    <div className="space-y-8 text-left w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            <Award className="w-3.5 h-3.5" style={{ color: palette.accent }} />
            <span>Telemetry &amp; Diagnostic Readiness</span>
          </div>
          <h1 className={`text-2xl sm:text-4xl font-extrabold text-ink tracking-tight ${font.displayClass}`}>
            Competency Radar &amp; Mastery
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Multidimensional concept mastery evaluation across all enrolled CS and Systems tracks.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/practice"
            className="py-2.5 px-4 rounded-xl text-white font-bold text-xs flex items-center gap-2 shadow-xs hover:shadow-md transition-all"
            style={{ backgroundColor: palette.accent }}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Practice Weak Areas</span>
          </Link>
        </div>
      </div>

      {/* Primary Radar Card & Summary Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Interactive Radar Chart View (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Six-Axis Competency Polygon
              </h2>
              <p className="text-xs text-slate-500">
                Hover over data nodes to inspect topic readiness scores
              </p>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80">
              82.4% Mean Score
            </span>
          </div>

          <div className="py-6 flex items-center justify-center">
            <RadarChart metrics={radarMetrics} />
          </div>

          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-100 text-center">
            <div className="p-2.5 rounded-xl bg-slate-50">
              <span className="text-[11px] text-slate-500">Peak Axis</span>
              <p className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5">
                Architecture (94%)
              </p>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50">
              <span className="text-[11px] text-slate-500">Focus Target</span>
              <p className="text-xs sm:text-sm font-bold text-amber-700 mt-0.5">
                Concurrency (62%)
              </p>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50">
              <span className="text-[11px] text-slate-500">Diagnostic Date</span>
              <p className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5">
                Today, 08:30 AM
              </p>
            </div>
          </div>
        </div>

        {/* Velocity & Diagnostic Breakdown Cards (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-6">
          {/* Readiness Index Card */}
          <div
            className="rounded-3xl p-6 text-white shadow-sm flex flex-col justify-between relative overflow-hidden flex-1"
            style={{ backgroundColor: palette.textPrimary }}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                  Diagnostic Confidence
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/20 text-white font-semibold">
                  Exam Ready
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold">
                Tier: High Mastery
              </h3>
              <p className="text-xs text-white/80 mt-2 leading-relaxed">
                Based on 48 practice items, 4 simulation labs, and 3 unit checkpoints completed in the last 14 days.
              </p>
            </div>

            <div className="space-y-3 pt-6">
              <div className="flex justify-between text-xs font-semibold text-white/90">
                <span>Core Retention Index</span>
                <span className="text-emerald-300">89%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/20 overflow-hidden">
                <div className="h-full rounded-full bg-emerald-400" style={{ width: '89%' }} />
              </div>

              <div className="flex justify-between text-xs font-semibold text-white/90 pt-2">
                <span>Problem Solving Velocity</span>
                <span className="text-amber-300">1.8 min / item</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/20 overflow-hidden">
                <div className="h-full rounded-full bg-amber-400" style={{ width: '82%' }} />
              </div>
            </div>
          </div>

          {/* Calibrated Advice Alert */}
          <div className="p-5 rounded-3xl bg-amber-50/90 border border-amber-200/80 text-amber-950 space-y-2">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <h4 className="text-xs font-bold">Recommended Study Priority</h4>
            </div>
            <p className="text-xs text-amber-900/80 leading-relaxed">
              Your scores in <strong>2-Phase Locking &amp; Database Concurrency (62%)</strong> suggest reviewing serializability graphs and lock conversion before next week&apos;s checkpoint.
            </p>
            <div className="pt-1">
              <Link
                href="/dashboard/study"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-900 underline hover:text-black"
              >
                <span>Open Focus Study Room on Concurrency</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Topic-Level Granular Breakdown */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              Topic-Level Mastery Breakdown
            </h2>
            <p className="text-xs text-slate-500">
              Detailed tracking per individual syllabus concept unit
            </p>
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap items-center gap-1.5 bg-white p-1 rounded-2xl border border-slate-200 shadow-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
                style={selectedCategory === cat ? { backgroundColor: palette.accent } : undefined}
              >
                {cat === 'all' ? 'All Units' : cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTopics.map((topic) => {
            const badge = getStatusBadge(topic.status);
            return (
              <div
                key={topic.id}
                className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm flex flex-col justify-between hover:shadow-md transition-all space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      {topic.category}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${badge.bg}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                      {topic.score}%
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-slate-900 leading-snug">
                    {topic.topic}
                  </h3>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Lessons Completed</span>
                    <span className="font-bold text-slate-800">
                      {topic.lessonsCompleted} / {topic.totalLessons}
                    </span>
                  </div>

                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${(topic.lessonsCompleted / topic.totalLessons) * 100}%`,
                        backgroundColor:
                          topic.score >= 85
                            ? '#10B981'
                            : topic.score >= 70
                            ? palette.accent
                            : '#EF4444',
                      }}
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <Link
                      href="/dashboard/practice"
                      className="text-xs font-bold hover:underline"
                      style={{ color: palette.accent }}
                    >
                      Practice Questions →
                    </Link>
                    <Link
                      href="/dashboard/study"
                      className="text-xs font-medium text-slate-500 hover:text-slate-800"
                    >
                      Study Notes
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
