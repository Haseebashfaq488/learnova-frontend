'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Clock,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Route,
  Zap,
  Play,
  TrendingUp,
  Layers,
  ChevronRight,
  Flame,
  Award,
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { useTheme } from '../../../context/ThemeContext';
import { coursesData } from '../../../data/coursesData';
import { studentProfile } from '../../../data/studentData';

export default function MyCoursesPage() {
  const { user } = useAuth();
  const { palette, font } = useTheme();

  // Filter enrolled courses
  const enrolledSlugs = user?.enrolledCourseSlugs || studentProfile.enrolledCourseSlugs;
  const enrolledCourses = coursesData.filter(
    (c) =>
      enrolledSlugs.includes(c.slug) ||
      enrolledSlugs.includes(c.id) ||
      c.id === 'cs101' ||
      c.id === 'cs201'
  );

  // Course progress metadata mapped for Alex Rivera
  const courseProgressMap: Record<
    string,
    {
      progressPercent: number;
      completedTopics: number;
      totalTopics: number;
      currentTopicTitle: string;
      nextLessonTitle: string;
      accuracy: number;
      hoursLeft: string;
    }
  > = {
    cs101: {
      progressPercent: 75,
      completedTopics: 3,
      totalTopics: 4,
      currentTopicTitle: 'Unit 3: Iteration, Loop Invariants & Sequence Processing',
      nextLessonTitle: 'Lesson 3.2: Loop Invariants and Off-By-One Error Prevention',
      accuracy: 94,
      hoursLeft: '8 hours',
    },
    'foundations-of-computer-science': {
      progressPercent: 75,
      completedTopics: 3,
      totalTopics: 4,
      currentTopicTitle: 'Unit 3: Iteration, Loop Invariants & Sequence Processing',
      nextLessonTitle: 'Lesson 3.2: Loop Invariants and Off-By-One Error Prevention',
      accuracy: 94,
      hoursLeft: '8 hours',
    },
    cs201: {
      progressPercent: 42,
      completedTopics: 1,
      totalTopics: 4,
      currentTopicTitle: 'Unit 2: Call Stack Mechanics & Recursion Unwinding',
      nextLessonTitle: 'Lesson 2.2: Call Stack Anatomy: Return Addresses & Stack Overflow',
      accuracy: 88,
      hoursLeft: '24 hours',
    },
    'data-structures-and-call-stack': {
      progressPercent: 42,
      completedTopics: 1,
      totalTopics: 4,
      currentTopicTitle: 'Unit 2: Call Stack Mechanics & Recursion Unwinding',
      nextLessonTitle: 'Lesson 2.2: Call Stack Anatomy: Return Addresses & Stack Overflow',
      accuracy: 88,
      hoursLeft: '24 hours',
    },
  };

  return (
    <div className="space-y-8 text-left w-full">
      {/* 1. Header & Telemetry Eyebrow */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-200/80">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            <BookOpen className="w-3.5 h-3.5" style={{ color: palette.accent }} />
            <span>Academic Curriculum Enrolled</span>
          </div>
          <h1
            className={`text-2xl sm:text-3xl md:text-4xl font-extrabold text-ink tracking-tight ${font.displayClass}`}
          >
            My Enrolled Courses
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Manage your registered degree courses, resume interactive topic paths, and master learning objectives.
          </p>
        </div>

        <Link
          href="/courses"
          className="py-2.5 px-4 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1.5 self-start sm:self-auto shrink-0"
        >
          <span>Explore Course Catalog</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 2. Top Metric Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs space-y-1">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Active Courses
          </span>
          <p className="text-xl sm:text-2xl font-extrabold text-slate-900">
            {enrolledCourses.length}
          </p>
          <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            In Good Standing
          </span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs space-y-1">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Topics Mastered
          </span>
          <p className="text-xl sm:text-2xl font-extrabold text-slate-900">
            4 / 8
          </p>
          <span className="text-[10px] text-slate-500 font-medium">
            50% Curriculum Completed
          </span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs space-y-1">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Checkpoint Accuracy
          </span>
          <p className="text-xl sm:text-2xl font-extrabold text-emerald-600">
            91%
          </p>
          <span className="text-[10px] text-emerald-600 font-semibold">
            High Mastery Level
          </span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs space-y-1">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Active Streak
          </span>
          <p
            className="text-xl sm:text-2xl font-extrabold flex items-center gap-1"
            style={{ color: palette.accent }}
          >
            <Flame className="w-5 h-5 fill-current" />
            <span>{user?.streakDays || 14} Days</span>
          </p>
          <span className="text-[10px] text-slate-500 font-medium">
            Daily Momentum
          </span>
        </div>
      </div>

      {/* 3. Enrolled Courses List Cards */}
      <div className="space-y-6">
        {enrolledCourses.map((course) => {
          const progress =
            courseProgressMap[course.slug] ||
            courseProgressMap[course.id] || {
              progressPercent: 50,
              completedTopics: 2,
              totalTopics: 4,
              currentTopicTitle: 'Unit 2: Active Foundations',
              nextLessonTitle: 'Lesson 2.1: Foundations',
              accuracy: 90,
              hoursLeft: '12 hours',
            };

          return (
            <div
              key={course.id}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden hover:shadow-md transition-all group"
            >
              <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                {/* Left Visual & Info (7 cols) */}
                <div className="lg:col-span-7 flex flex-col sm:flex-row gap-5 items-start">
                  <div className="relative w-full sm:w-44 h-32 rounded-2xl overflow-hidden shrink-0 bg-slate-100">
                    <img
                      src={course.imageUrl}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <span
                        className="font-mono text-xs font-bold px-2 py-0.5 rounded-md shadow-xs bg-white text-slate-900 border border-slate-200/80"
                      >
                        {course.code}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
                        Active Enrolled
                      </span>
                      <span className="text-xs text-slate-400">•</span>
                      <span className="text-xs text-slate-500 font-medium">
                        {course.category}
                      </span>
                    </div>

                    <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight leading-snug">
                      {course.title}
                    </h2>

                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {course.description}
                    </p>

                    <div className="pt-1 flex items-center gap-3 text-xs text-slate-500">
                      <span>Instructor: <strong>{course.instructor.name}</strong></span>
                      <span>•</span>
                      <span>{course.duration}</span>
                    </div>
                  </div>
                </div>

                {/* Right Progression & Actions (5 cols) */}
                <div className="lg:col-span-5 bg-slate-50/80 rounded-2xl p-5 border border-slate-200/70 space-y-4">
                  {/* Progress Header */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-700">Course Progress</span>
                      <span className="font-extrabold text-slate-900">
                        {progress.progressPercent}%
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${progress.progressPercent}%`,
                          backgroundColor: palette.accent,
                        }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span>{progress.completedTopics} of {progress.totalTopics} Topics Mastered</span>
                      <span>~{progress.hoursLeft} left</span>
                    </div>
                  </div>

                  {/* Immediate Next Step Card */}
                  <div className="p-3 rounded-xl bg-white border border-slate-200/80 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 block flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      Next Recommended Checkpoint:
                    </span>
                    <p className="text-xs font-bold text-slate-900 leading-snug">
                      {progress.nextLessonTitle}
                    </p>
                  </div>

                  {/* Action CTAs */}
                  <div className="flex items-center gap-2.5 pt-1">
                    <Link
                      href={`/dashboard/courses/${course.slug}`}
                      className="flex-1 py-2.5 px-4 rounded-xl text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs hover:shadow-sm transition-all"
                      style={{ backgroundColor: palette.accent }}
                    >
                      <Route className="w-3.5 h-3.5" />
                      <span>Resume Learning Path</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <Link
                      href={`/courses/${course.slug}`}
                      className="py-2.5 px-3.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100/80 font-bold text-xs transition-colors"
                      title="View Public Course Syllabus"
                    >
                      Overview
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. Discover More Courses Banner */}
      <div className="rounded-3xl border-2 border-dashed border-slate-200 p-8 flex flex-col sm:flex-row items-center justify-between gap-6 bg-white/50">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-base font-bold text-slate-900">
            Expand Your Academic Repertoire
          </h3>
          <p className="text-xs text-slate-500 max-w-xl">
            Explore 6 rigorous curriculum tracks designed for high school through undergraduate computer science, with diagnostic baselines and AI assistance.
          </p>
        </div>

        <Link
          href="/courses"
          className="py-2.5 px-5 rounded-xl text-white font-bold text-xs shadow-xs hover:shadow-sm transition-all shrink-0 flex items-center gap-2"
          style={{ backgroundColor: palette.accent }}
        >
          <BookOpen className="w-4 h-4" />
          <span>Browse Course Catalog</span>
        </Link>
      </div>
    </div>
  );
}
