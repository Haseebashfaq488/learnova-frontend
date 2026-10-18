'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  Play,
  ArrowRight,
  Sparkles,
  Award,
  Zap,
  ShieldCheck,
  BookOpen,
  Route,
  CheckCircle2,
  TrendingUp,
  Flame,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import {
  studentProfile,
  nextLesson,
  dailySchedule,
  dailyQuests,
} from '../../data/studentData';
import { coursesData } from '../../data/coursesData';

export default function StudentDashboardPage() {
  const { user } = useAuth();
  const { palette, font } = useTheme();

  // Enrolled courses details from coursesData
  const enrolledCourses = coursesData.filter((c) =>
    (user?.enrolledCourseSlugs || studentProfile.enrolledCourseSlugs).includes(c.slug)
  );

  return (
    <div className="space-y-8 w-full">
      {/* 1. Welcome & Telemetry Eyebrow */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Academic Workspace · Fall 2026</span>
          </div>
          <h1
            className={`text-2xl sm:text-4xl font-extrabold text-ink tracking-tight ${font.displayClass}`}
          >
            Good morning, {user?.name || 'Alex'}.
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            You are on an active <strong>{user?.streakDays || 14}-day streak</strong>! Ready to tackle your next mastery checkpoint?
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-medium text-slate-700 shadow-xs">
            <Calendar className="h-3.5 w-3.5" style={{ color: palette.accent }} />
            <span>Wednesday, Oct 24</span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Midterm Sprint</span>
          </div>
        </div>
      </div>

      {/* 2. PRIMARY FOCAL HERO: Your Next Lesson */}
      <section className="relative rounded-3xl bg-white border border-slate-200/90 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
        {/* Hero Top Bar */}
        <div
          className="px-6 py-3.5 text-white flex flex-wrap items-center justify-between gap-3"
          style={{ backgroundColor: palette.textPrimary }}
        >
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 text-amber-300">
              <Play className="h-3.5 w-3.5 fill-amber-300" />
            </div>
            <span className="text-xs sm:text-sm font-bold tracking-wide">
              Priority Next Lesson
            </span>
          </div>
          <span className="inline-flex items-center px-3 py-0.5 rounded-full bg-white/10 text-white/90 text-xs font-medium">
            {nextLesson.courseTitle} • {nextLesson.unitTitle}
          </span>
        </div>

        {/* Hero Content */}
        <div className="p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex-1 space-y-4 max-w-3xl">
            <div className="flex items-center gap-3 text-xs font-medium text-slate-500">
              <span
                className="inline-flex items-center gap-1 font-bold"
                style={{ color: palette.accent }}
              >
                <Clock className="h-3.5 w-3.5" />
                {nextLesson.duration}
              </span>
              <span>•</span>
              <span>{nextLesson.interactiveElements}</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {nextLesson.lessonCode}: {nextLesson.title}
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {nextLesson.description}
            </p>

            {/* Key Concept Chips */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mr-1">
                Core Invariants:
              </span>
              {nextLesson.keyConcepts.map((concept, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 text-[11px] font-medium border border-slate-200/80"
                >
                  {concept}
                </span>
              ))}
            </div>
          </div>

          {/* Action Column */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-stretch justify-center gap-3 min-w-[220px]">
            <Link
              href="/dashboard/study"
              className="py-3 px-5 rounded-2xl text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group text-center"
              style={{ backgroundColor: palette.accent }}
            >
              <span>Launch Focus Study</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href={`/courses/${nextLesson.courseSlug}`}
              className="py-2.5 px-4 rounded-xl border border-slate-200/90 text-slate-700 hover:bg-slate-50 font-bold text-xs flex items-center justify-center gap-2 text-center transition-colors"
            >
              <BookOpen className="h-3.5 w-3.5" style={{ color: palette.accent }} />
              <span>Full Course Syllabus</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. BENTO PROGRESSION & TELEMETRY ROW */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Scholar XP Progression Card (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm flex flex-col justify-between gap-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3.5">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-xs"
                style={{ backgroundColor: palette.textPrimary }}
              >
                <Award className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 leading-tight">
                  Level {user?.level || 5} Scholar
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Tier: {studentProfile.tier}
                </p>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-2xl font-extrabold text-slate-900">
                {user?.currentXp?.toLocaleString() || '1,420'}
              </span>
              <span className="text-xs text-slate-500"> / 2,000 XP</span>
            </div>
          </div>

          {/* XP Progress Bar */}
          <div className="space-y-1.5">
            <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: '71%',
                  backgroundColor: palette.accent,
                }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-slate-500 font-medium">
              <span>580 XP remaining to Level 6 Scholar</span>
              <span className="text-emerald-600 font-bold">+140 XP earned today</span>
            </div>
          </div>

          {/* 3-Metric Summary Strip */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100 text-center">
            <div className="p-3 rounded-2xl bg-slate-50/80 border border-slate-200/60">
              <span className="text-[11px] font-semibold text-slate-500 block">
                Mastered Units
              </span>
              <p className="text-base sm:text-lg font-extrabold text-slate-900 mt-0.5">
                {studentProfile.masteredUnits} / {studentProfile.totalUnits}
              </p>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50/80 border border-slate-200/60">
              <span className="text-[11px] font-semibold text-slate-500 block">
                Practice Accuracy
              </span>
              <p className="text-base sm:text-lg font-extrabold text-emerald-600 mt-0.5">
                {studentProfile.practiceAccuracy}%
              </p>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50/80 border border-slate-200/60">
              <span className="text-[11px] font-semibold text-slate-500 block">
                Study Velocity
              </span>
              <p
                className="text-base sm:text-lg font-extrabold mt-0.5"
                style={{ color: palette.accent }}
              >
                {studentProfile.weeklyStudyHours} hrs/wk
              </p>
            </div>
          </div>
        </div>

        {/* Active Learning Path Tracker Card (4 cols) */}
        <div
          className="lg:col-span-4 rounded-3xl p-6 text-white flex flex-col justify-between shadow-sm relative overflow-hidden"
          style={{ backgroundColor: palette.textPrimary }}
        >
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
              <Route className="h-4 w-4" />
              <span>Active Learning Path</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold">
              CS 101: Procedural Logic
            </h3>
            <p className="text-xs text-white/80 leading-relaxed">
              Unit 3: Iteration &amp; Loop Invariants. 3 lessons completed, 1 calibrated checkpoint ready.
            </p>
          </div>

          <div className="pt-6 space-y-3">
            <div className="flex items-center justify-between text-xs text-white/90">
              <span>Topic Mastery Progress</span>
              <span className="font-bold text-emerald-300">75% Complete</span>
            </div>
            <div className="w-full h-2 rounded-full bg-white/20 overflow-hidden">
              <div
                className="h-full rounded-full bg-emerald-400"
                style={{ width: '75%' }}
              />
            </div>

            <Link
              href="/dashboard/courses/foundations-of-computer-science"
              className="w-full mt-2 py-2.5 px-4 rounded-xl text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md"
              style={{ backgroundColor: palette.accent }}
            >
              <span>Resume Learning Path</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. ENROLLED COURSES SECTION */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              My Active Enrolled Courses
            </h2>
            <p className="text-xs text-slate-500">
              Resume your progress right where you left off
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/dashboard/courses"
              className="text-xs font-bold flex items-center gap-1 hover:underline"
              style={{ color: palette.accent }}
            >
              <span>View All Enrolled ({enrolledCourses.length})</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolledCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 flex flex-col justify-between hover:shadow-md transition-all group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span
                    className="font-mono text-xs font-bold px-2.5 py-1 rounded-md"
                    style={{ backgroundColor: palette.accentLight, color: palette.accent }}
                  >
                    {course.code}
                  </span>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                    Active
                  </span>
                </div>

                <div className="relative h-28 w-full rounded-2xl overflow-hidden bg-slate-100">
                  <img
                    src={course.imageUrl}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <h3 className="font-bold text-sm sm:text-base text-slate-900 leading-snug line-clamp-1">
                  {course.title}
                </h3>

                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {course.description}
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{course.duration}</span>
                </div>

                <Link
                  href={`/dashboard/courses/${course.slug}`}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white transition-all shadow-xs flex items-center gap-1.5"
                  style={{ backgroundColor: palette.accent }}
                >
                  <span>Resume Path</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}

          {/* Quick Discover Card */}
          <Link
            href="/courses"
            className="rounded-3xl border-2 border-dashed border-slate-200 p-6 flex flex-col items-center justify-center text-center hover:border-slate-300 hover:bg-slate-50/50 transition-all group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:scale-105 transition-transform mb-3">
              <BookOpen className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 mb-1">
              Enroll in a New Course
            </h4>
            <p className="text-xs text-slate-500 max-w-[200px] mb-3">
              Explore 6 rigorous CS and Engineering curriculum tracks with AI support.
            </p>
            <span
              className="text-xs font-bold flex items-center gap-1 group-hover:underline"
              style={{ color: palette.accent }}
            >
              <span>Explore Catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        </div>
      </section>

      {/* 5. TODAY'S SCHEDULE & DAILY QUESTS ROW */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Daily Schedule (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-500" />
              <h3 className="font-bold text-sm sm:text-base text-slate-900">
                Today&apos;s Academic Schedule
              </h3>
            </div>
            <span className="text-[11px] font-semibold text-slate-400">
              3 Checkpoints Scheduled
            </span>
          </div>

          <div className="space-y-3">
            {dailySchedule.map((item) => (
              <div
                key={item.id}
                className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                  item.done
                    ? 'bg-slate-50/60 border-slate-200/60 opacity-80'
                    : item.active
                    ? 'bg-white border-amber-300 shadow-xs ring-1 ring-amber-200/60'
                    : 'bg-white border-slate-200/80'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${
                      item.done
                        ? 'bg-emerald-100 text-emerald-700'
                        : item.active
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {item.done ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <Clock className="w-4 h-4" />
                    )}
                  </div>

                  <div>
                    <p
                      className={`text-xs font-bold ${
                        item.done ? 'line-through text-slate-500' : 'text-slate-900'
                      }`}
                    >
                      {item.title}
                    </p>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                      <span>{item.time}</span>
                      <span>•</span>
                      <span>{item.type}</span>
                    </div>
                  </div>
                </div>

                {item.active && (
                  <Link
                    href="/dashboard/practice"
                    className="px-3 py-1 rounded-xl text-white text-[11px] font-bold shadow-xs shrink-0"
                    style={{ backgroundColor: palette.accent }}
                  >
                    Start
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Daily Quests (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <h3 className="font-bold text-sm sm:text-base text-slate-900">
                Daily Quests
              </h3>
            </div>
            <span className="text-[11px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/60">
              +240 XP Total
            </span>
          </div>

          <div className="space-y-3">
            {dailyQuests.map((quest) => (
              <div
                key={quest.id}
                className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-200/60 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">
                    {quest.title}
                  </span>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                    +{quest.xpReward} XP
                  </span>
                </div>

                <div className="w-full h-1.5 rounded-full bg-slate-200/80 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-emerald-500"
                    style={{
                      width: `${(quest.currentProgress / quest.targetProgress) * 100}%`,
                    }}
                  />
                </div>

                <div className="flex justify-between text-[10px] text-slate-500 font-medium">
                  <span>
                    {quest.currentProgress} of {quest.targetProgress} completed
                  </span>
                  <span>{quest.isCompleted ? 'Done' : 'In Progress'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
