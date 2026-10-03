"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  AppHeader,
  Sidebar,
  Button,
  Badge,
  Progress,
  mockEnrolledCoursesHub,
  studentNavBranches,
} from "@learnova/ui";
import {
  FileText,
  Clock,
  ArrowRight,
  Flame,
  Zap,
  Sparkles,
  Layers,
  CheckCircle2,
  Award,
} from "lucide-react";

export default function CourseHubPage() {
  const [filter, setFilter] = useState<"all" | "in-progress" | "completed">("all");

  const filteredCourses = useMemo(() => {
    if (filter === "all") return mockEnrolledCoursesHub;
    return mockEnrolledCoursesHub.filter((c) => c.status === filter);
  }, [filter]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <AppHeader
        portalName="Students"
        userName="Alex Rivera"
        userRole="AP Scholar"
        avatarUrl="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
        notificationCount={3}
        streakDays={14}
        currentXp={1420}
        cohortTag="Spring Cohort 2024–2025"
      />

      <div className="flex flex-1">
        <Sidebar
          branches={studentNavBranches}
          currentPath="/courses"
          footerContent={
            <div className="rounded-xl bg-[#0B2B53] p-3.5 text-white space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-sky-400">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Next Assignment Due</span>
              </div>
              <p className="text-xs text-slate-300">
                AP Physics 2D Force Equilibrium Lab due Thursday.
              </p>
              <Link href="/courses/ap-physics-1/study">
                <Button size="sm" className="w-full bg-[#00A8E8] hover:bg-sky-400 text-[#0B2B53] font-bold text-xs">
                  Continue Study
                </Button>
              </Link>
            </div>
          }
        />

        <main className="flex-1 p-6 md:p-8 space-y-8 max-w-7xl">
          {/* Welcome Header & Scholar Metrics Ribbon */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                <span className="text-sky-600">Academic Term 2024–2025</span>
                <span>•</span>
                <span>Spring Cohort</span>
              </div>
              <h1 className="text-3xl font-extrabold text-[#0B2B53] tracking-tight">
                Welcome back, Alex
              </h1>
              <p className="text-sm text-slate-600 max-w-xl">
                Select a course to resume your learning path today. You have 3 assignments on track for this week.
              </p>
            </div>

            {/* Gamification Badges Ribbon */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
              {/* Scholar Rank */}
              <div className="flex items-center gap-3 px-4 py-2.5 bg-slate-50 rounded-xl">
                <div className="w-8 h-8 rounded-lg bg-[#0B2B53] text-white flex items-center justify-center font-bold">
                  <Award className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Scholar Rank</span>
                  <p className="text-xs font-bold text-[#0B2B53]">Lvl 5 • Adv. Mechanics</p>
                </div>
              </div>

              {/* Earned XP */}
              <div className="flex items-center gap-3 px-4 py-2.5 bg-sky-50 rounded-xl">
                <div className="w-8 h-8 rounded-lg bg-sky-200 text-sky-800 flex items-center justify-center font-bold">
                  <Zap className="h-4 w-4 fill-sky-600 text-sky-600" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-sky-600">Earned Credits</span>
                  <p className="text-xs font-bold text-sky-900">1,420 XP</p>
                </div>
              </div>

              {/* Streak */}
              <div className="flex items-center gap-3 px-4 py-2.5 bg-emerald-50 rounded-xl">
                <div className="w-8 h-8 rounded-lg bg-emerald-200 text-emerald-800 flex items-center justify-center font-bold">
                  <Flame className="h-4 w-4 fill-emerald-600 text-emerald-600" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-emerald-700">Top 5% Consistency</span>
                  <p className="text-xs font-bold text-emerald-900">14 Day Streak</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filter & Sort Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-1.5 p-1 bg-slate-200/70 rounded-xl">
              <button
                type="button"
                onClick={() => setFilter("all")}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  filter === "all"
                    ? "bg-white text-[#0B2B53] shadow-sm"
                    : "text-slate-600 hover:text-[#0B2B53]"
                }`}
              >
                All Enrolled (4)
              </button>
              <button
                type="button"
                onClick={() => setFilter("in-progress")}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  filter === "in-progress"
                    ? "bg-white text-[#0B2B53] shadow-sm"
                    : "text-slate-600 hover:text-[#0B2B53]"
                }`}
              >
                In Progress (3)
              </button>
              <button
                type="button"
                onClick={() => setFilter("completed")}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  filter === "completed"
                    ? "bg-white text-[#0B2B53] shadow-sm"
                    : "text-slate-600 hover:text-[#0B2B53]"
                }`}
              >
                Completed (1)
              </button>
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                3 Active modules
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                4.2 hrs remaining this week
              </span>
            </div>
          </div>

          {/* Main Content Grid: 2x2 Enrolled Course Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="group bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-sky-600">
                        {course.subtitle}
                      </span>
                      <h2 className="text-lg font-bold text-[#0B2B53] group-hover:text-[#00A8E8] transition-colors mt-0.5">
                        {course.title}
                      </h2>
                    </div>
                    <span
                      className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider shrink-0 ${
                        course.status === "completed"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-sky-100 text-sky-800"
                      }`}
                    >
                      {course.unitStatusText}
                    </span>
                  </div>

                  {/* Course Visual Preview */}
                  <div className="w-full h-36 rounded-xl overflow-hidden relative bg-slate-100">
                    <img
                      src={course.thumbnailUrl}
                      alt={course.thumbnailAlt}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B2B53]/80 via-transparent to-transparent flex items-end p-4">
                      <span className="text-xs font-semibold text-white">
                        {course.highlightTopic}
                      </span>
                    </div>
                  </div>

                  {/* Progress Details */}
                  <div className="space-y-2 pt-1">
                    <div className="flex justify-between items-baseline text-xs">
                      <span className="font-bold text-[#0B2B53]">{course.completedPercent}% Completed</span>
                      <span className="text-slate-500">
                        {course.completedLessons}/{course.totalLessons} Lessons
                        {course.interactiveLabsCount ? ` • ${course.interactiveLabsCount} Labs` : ""}
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          course.completedPercent === 100
                            ? "bg-emerald-500"
                            : "bg-gradient-to-r from-[#00A8E8] to-[#2ECC71]"
                        }`}
                        style={{ width: `${course.completedPercent}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                  <span className="text-xs text-slate-500">
                    {course.durationWeeklyRemaining}
                  </span>
                  <Link href={course.pathSlug}>
                    <Button
                      size="sm"
                      className="bg-[#00A8E8] hover:bg-sky-500 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-1.5"
                    >
                      <span>Resume Path</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
