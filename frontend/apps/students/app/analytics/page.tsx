"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  AppHeader,
  Sidebar,
  RadarChart,
  StatCard,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Badge,
  Button,
  mockStudentAnalytics,
} from "@learnova/ui";
import {
  Compass,
  BookOpen,
  Route,
  BookMarked,
  FileText,
  Award,
  Play,
  Zap,
  TrendingUp,
  CheckCircle2,
  Clock,
  Sparkles,
  ShieldAlert,
  ArrowRight,
  Target,
  BarChart3,
  Lock,
} from "lucide-react";

export default function StudentAnalyticsPage() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const navItems = [
    { label: "Learning Hub", href: "/", icon: <Compass className="h-4 w-4" /> },
    { label: "My Courses", href: "/courses", icon: <BookOpen className="h-4 w-4" />, badge: 4 },
    { label: "Learning Path", href: "/learning-path", icon: <Route className="h-4 w-4" />, badge: "Unit 3" },
    { label: "Focus Study (AI)", href: "/study", icon: <BookMarked className="h-4 w-4" />, badge: "Active" },
    { label: "Focus Practice", href: "/practice", icon: <Play className="h-4 w-4" /> },
    { label: "Progress & Radar", href: "/analytics", icon: <Award className="h-4 w-4" />, active: true, badge: "77%" },
  ];

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
        cohortTag="Fall 2025 • Grade 10 AP Physics"
      />

      <div className="flex flex-1">
        <Sidebar
          items={navItems}
          currentPath="/analytics"
          footerContent={
            <div className="rounded-xl bg-slate-900 p-3.5 text-white">
              <div className="flex items-center gap-2 text-xs font-semibold text-sky-400 mb-1">
                <Target className="h-3.5 w-3.5" />
                <span>Mastery Target</span>
              </div>
              <p className="text-xs text-slate-300 mb-2">
                Bring Rotational Dynamics from 58% to ≥85% to reach Top 5% in Cohort!
              </p>
              <Link href="/practice">
                <Button size="sm" className="w-full bg-[#00A8E8] hover:bg-sky-400 text-[#0B2B53] font-bold text-xs">
                  Practice Weak Topics
                </Button>
              </Link>
            </div>
          }
        />

        <main className="flex-1 p-6 md:p-8 space-y-8 max-w-7xl">
          {/* Header & Motivational Pulse */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Live Momentum · Physics 101 AP Mechanics</span>
              </div>
              <h1 className="text-3xl font-extrabold text-[#0B2B53] tracking-tight">
                My Learning Progress
              </h1>
              <p className="text-sm text-slate-600 mt-1">
                Track your conceptual radar, earned badges, and mastery momentum across all learning units.
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center gap-3 self-start md:self-auto bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-50">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Overall</span>
                  <p className="text-base font-extrabold text-[#0B2B53]">{mockStudentAnalytics.overallPercentage}%</p>
                </div>
              </div>

              <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-50">
                <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center text-sky-700">
                  <Award className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Badges</span>
                  <p className="text-base font-extrabold text-[#0B2B53]">
                    {mockStudentAnalytics.badgesUnlocked} / {mockStudentAnalytics.totalBadges}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* TOP SECTION: Radar Chart + Concept Overview */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Radar Chart Card (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm flex flex-col justify-between relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-[#0B2B53]">Competency Radar</h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Multidimensional strength mapping across 6 core concepts
                  </p>
                </div>
                <Badge variant="info" className="bg-sky-50 text-sky-700 border-sky-200">
                  Relative Index
                </Badge>
              </div>

              {/* Dynamic SVG Radar Chart */}
              <div className="py-4 flex justify-center">
                <RadarChart metrics={mockStudentAnalytics.radarMetrics} />
              </div>

              <div className="flex items-center justify-center gap-6 pt-4 border-t border-slate-100 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  <span className="text-slate-600 font-medium">Mastered (≥85%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
                  <span className="text-slate-600 font-medium">Learning (60-84%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                  <span className="text-slate-600 font-medium">Needs Attention (&lt;60%)</span>
                </div>
              </div>
            </div>

            {/* Right Topic Mastery List (5 cols) */}
            <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-[#0B2B53]">Topic Competencies</h3>
                  <span className="text-xs text-slate-500">6 Pillars</span>
                </div>
                <p className="text-xs text-slate-500 mb-4">
                  Click any topic to view recommended remedial practice modules.
                </p>

                <div className="space-y-3">
                  {mockStudentAnalytics.topicBreakdowns.map((t) => {
                    const isSelected = selectedTopic === t.topic;
                    const isMastered = t.status === "mastered";
                    const isStruggling = t.status === "struggling";

                    return (
                      <div
                        key={t.topic}
                        onClick={() => setSelectedTopic(isSelected ? null : t.topic)}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                          isSelected
                            ? "border-sky-500 bg-sky-50/50 shadow-sm"
                            : "border-slate-200 bg-slate-50/50 hover:bg-slate-100"
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs mb-1.5">
                          <span className="font-bold text-[#0B2B53]">{t.topic}</span>
                          <span
                            className={`font-bold ${
                              isMastered
                                ? "text-emerald-600"
                                : isStruggling
                                ? "text-rose-500"
                                : "text-sky-600"
                            }`}
                          >
                            {t.score}%
                          </span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden mb-1">
                          <div
                            className={`h-full rounded-full ${
                              isMastered
                                ? "bg-emerald-500"
                                : isStruggling
                                ? "bg-rose-500"
                                : "bg-sky-500"
                            }`}
                            style={{ width: `${t.score}%` }}
                          ></div>
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-slate-500">
                          <span>{t.lessonsCompleted} / {t.totalLessons} lessons completed</span>
                          <span className="capitalize font-semibold">{t.status}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <Link href="/practice">
                <Button className="w-full bg-[#00A8E8] hover:bg-sky-400 text-[#0B2B53] font-bold text-xs rounded-xl flex items-center justify-center gap-2">
                  <span>Start Targeted Practice</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </section>

          {/* BADGES & RECOGNITION SHOWCASE */}
          <section className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-xl font-bold text-[#0B2B53]">Badges & Achievements</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Verified achievements earned through active problem solving and test mastery
                </p>
              </div>
              <Badge variant="success" className="bg-emerald-50 text-emerald-700 border-emerald-200 self-start sm:self-auto">
                {mockStudentAnalytics.badgesUnlocked} of {mockStudentAnalytics.totalBadges} Unlocked
              </Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockStudentAnalytics.badges.map((b) => (
                <div
                  key={b.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    b.isLocked
                      ? "border-slate-200 bg-slate-50/70 opacity-60"
                      : "border-slate-200 bg-white hover:shadow-md hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        b.isLocked
                          ? "bg-slate-200 text-slate-400"
                          : "bg-sky-100 text-sky-600 shadow-sm"
                      }`}
                    >
                      {b.isLocked ? <Lock className="h-5 w-5" /> : <Award className="h-5 w-5" />}
                    </div>
                    {b.unlockedAt && (
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        Unlocked {b.unlockedAt}
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-[#0B2B53]">{b.name}</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{b.description}</p>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
