"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  AppHeader,
  Sidebar,
  Button,
  Badge,
  mockAPPhysicsLearningPath,
} from "@learnova/ui";
import {
  Compass,
  BookOpen,
  Route,
  BookMarked,
  Play,
  Award,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Lock,
  Download,
  ShieldCheck,
  Lightbulb,
  ArrowRight,
  FlaskConical,
  Video,
  FileText,
  HelpCircle,
  Clock,
  Sparkles,
  Zap,
} from "lucide-react";

export default function LearningPathPage() {
  const [learningPath, setLearningPath] = useState(mockAPPhysicsLearningPath);
  const [expandedUnits, setExpandedUnits] = useState<Record<string, boolean>>({
    "unit-1": false,
    "unit-2": false,
    "unit-3": true,
    "unit-4": false,
    "unit-5": false,
    "unit-6": false,
  });

  const toggleUnit = (unitId: string) => {
    setExpandedUnits((prev) => ({
      ...prev,
      [unitId]: !prev[unitId],
    }));
  };

  const expandAll = () => {
    const allOpen: Record<string, boolean> = {};
    learningPath.forEach((u) => (allOpen[u.id] = true));
    setExpandedUnits(allOpen);
  };

  const collapseCompleted = () => {
    const next: Record<string, boolean> = {};
    learningPath.forEach((u) => (next[u.id] = u.status === "in-progress"));
    setExpandedUnits(next);
  };

  const navItems = [
    { label: "Learning Hub", href: "/", icon: <Compass className="h-4 w-4" /> },
    { label: "My Courses", href: "/courses", icon: <BookOpen className="h-4 w-4" />, badge: 4 },
    { label: "Learning Path", href: "/learning-path", icon: <Route className="h-4 w-4" />, active: true, badge: "Unit 3" },
    { label: "Focus Study (AI)", href: "/study", icon: <BookMarked className="h-4 w-4" />, badge: "Active" },
    { label: "Focus Practice", href: "/practice", icon: <Play className="h-4 w-4" /> },
    { label: "Progress & Radar", href: "/analytics", icon: <Award className="h-4 w-4" />, badge: "77%" },
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
        cohortTag="AP Physics 1 • Spring 2025"
      />

      <div className="flex flex-1">
        <Sidebar
          items={navItems}
          currentPath="/learning-path"
          footerContent={
            <div className="rounded-xl bg-slate-900 p-3.5 text-white space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-sky-400">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Next Milestone</span>
              </div>
              <p className="text-xs text-slate-300">
                Complete Lesson 3.2 to unlock Unit 3 Checkpoint!
              </p>
              <Link href="/study">
                <Button size="sm" className="w-full bg-[#00A8E8] hover:bg-sky-400 text-[#0B2B53] font-bold text-xs">
                  Launch Study Mode
                </Button>
              </Link>
            </div>
          }
        />

        <main className="flex-1 space-y-8">
          {/* Top Course Header Ribbon */}
          <section className="bg-white border-b border-slate-200 shadow-sm px-6 md:px-8 py-8">
            <div className="max-w-6xl mx-auto space-y-6">
              {/* Breadcrumb + Utility */}
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 font-medium">
                <div className="flex items-center gap-1.5">
                  <Link href="/courses" className="hover:text-[#0B2B53] flex items-center gap-1">
                    <BookOpen className="h-3.5 w-3.5" />
                    <span>Courses</span>
                  </Link>
                  <span>/</span>
                  <span className="font-bold text-[#0B2B53]">AP Physics 1: Mechanics & Dynamics</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-1 rounded-md bg-sky-50 text-sky-700 text-[11px] font-bold">
                    Self-Paced Honors Track
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 text-xs font-semibold border-slate-200 hover:bg-slate-50"
                  >
                    <Download className="h-3.5 w-3.5 mr-1" />
                    <span>Syllabus PDF</span>
                  </Button>
                </div>
              </div>

              {/* Title & Stats */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
                <div className="lg:col-span-8 space-y-2">
                  <div className="flex items-center gap-1.5 text-sky-600 text-xs font-bold uppercase tracking-wider">
                    <ShieldCheck className="h-4 w-4" />
                    <span>CollegeBoard AP Aligned • Standard Revision 2024</span>
                  </div>
                  <h1 className="text-3xl font-extrabold text-[#0B2B53] tracking-tight">
                    AP Physics 1: Mechanics & Dynamics
                  </h1>
                  <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
                    Master fundamental Newtonian mechanics, rotational dynamics, work-energy theorem, and multi-body gravitational systems through interactive models and quantitative derivation.
                  </p>
                </div>

                {/* Progress Ribbon */}
                <div className="lg:col-span-4 bg-slate-50 rounded-2xl p-4 border border-slate-200 shadow-sm space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-600">Curriculum Progress</span>
                    <span className="text-lg font-extrabold text-[#0B2B53]">68%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-[#00A8E8] to-[#2ECC71] h-full rounded-full transition-all duration-500"
                      style={{ width: "68%" }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                    <span><strong className="text-[#0B2B53]">6</strong> Units</span>
                    <span>•</span>
                    <span><strong className="text-[#0B2B53]">26</strong> Lessons</span>
                    <span>•</span>
                    <span><strong className="text-[#0B2B53]">8</strong> Interactive Labs</span>
                  </div>
                </div>
              </div>

              {/* Expand / Collapse Controls */}
              <div className="pt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 text-xs">
                <div className="flex items-center gap-2 text-slate-500">
                  <Route className="h-4 w-4 text-sky-600" />
                  <span className="font-bold text-[#0B2B53]">Holistic Course Journey</span>
                  <span>• 6 Progressive Units • 26 Lessons Total</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={expandAll}
                    className="px-3 py-1 rounded-lg bg-sky-50 text-sky-800 font-semibold hover:bg-sky-100 transition-colors"
                  >
                    Expand All Units
                  </button>
                  <button
                    type="button"
                    onClick={collapseCompleted}
                    className="px-3 py-1 rounded-lg bg-slate-100 text-slate-600 font-medium hover:bg-slate-200 transition-colors"
                  >
                    Collapse Completed
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Sequential Milestones Section */}
          <section className="max-w-5xl mx-auto px-6 md:px-8 pb-12 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <h2 className="text-xl font-bold text-[#0B2B53]">Course Milestones & Roadmap</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Sequential progression across all 6 core units with checkpoints and interactive simulations.
                </p>
              </div>
              <Badge variant="info" className="bg-sky-50 text-sky-700 border-sky-200">
                Adaptive Diagnostic Active
              </Badge>
            </div>

            {/* Units Accordion */}
            <div className="space-y-4">
              {learningPath.map((unit) => {
                const isExpanded = !!expandedUnits[unit.id];
                const isCompleted = unit.status === "completed";
                const isInProgress = unit.status === "in-progress";
                const isLocked = unit.status === "locked";

                return (
                  <div
                    key={unit.id}
                    className={`rounded-2xl border transition-all duration-200 overflow-hidden shadow-sm ${
                      isInProgress
                        ? "bg-white border-sky-400 ring-2 ring-sky-400/20"
                        : isCompleted
                        ? "bg-white border-slate-200"
                        : "bg-slate-50/70 border-slate-200 opacity-75"
                    }`}
                  >
                    {/* Unit Header */}
                    <div
                      onClick={() => toggleUnit(unit.id)}
                      className={`p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer select-none transition-colors ${
                        isInProgress ? "bg-sky-50/40 hover:bg-sky-50/70" : "hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 shadow-sm ${
                            isCompleted
                              ? "bg-emerald-500 text-white"
                              : isInProgress
                              ? "bg-[#00A8E8] text-white animate-bounce"
                              : "bg-slate-200 text-slate-500"
                          }`}
                        >
                          {isCompleted ? <CheckCircle2 className="h-5 w-5" /> : isLocked ? <Lock className="h-4 w-4" /> : unit.unitNumber}
                        </div>

                        <div>
                          <div className="flex items-center gap-2 text-xs flex-wrap">
                            <span
                              className={`font-bold uppercase tracking-wider text-[11px] ${
                                isCompleted
                                  ? "text-emerald-700"
                                  : isInProgress
                                  ? "text-sky-700"
                                  : "text-slate-400"
                              }`}
                            >
                              Unit {unit.unitNumber} {isInProgress ? "• In Progress" : isLocked ? "• Locked" : ""}
                            </span>
                            <span>•</span>
                            <span className="text-slate-500">
                              {unit.lessonsCount} Lessons • {unit.labsCount} Labs
                            </span>
                            <span>•</span>
                            <span className="text-slate-500">Est: {unit.estimatedHours} hrs</span>
                          </div>
                          <h3 className="text-base font-bold text-[#0B2B53] mt-0.5">{unit.title}</h3>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0 justify-between md:justify-end">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            isCompleted
                              ? "bg-emerald-100 text-emerald-800"
                              : isInProgress
                              ? "bg-sky-100 text-sky-800"
                              : "bg-slate-200 text-slate-600"
                          }`}
                        >
                          {isCompleted ? "Completed • 100%" : isInProgress ? "Active Unit" : "Locked"}
                        </span>
                        <div className="p-1 rounded-lg bg-slate-100 text-slate-600">
                          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </div>
                      </div>
                    </div>

                    {/* Unit Body Content */}
                    {isExpanded && (
                      <div className="p-5 pt-3 border-t border-slate-100 space-y-4 bg-slate-50/50">
                        {unit.learningObjectives && (
                          <div className="p-3.5 rounded-xl bg-sky-50/70 border border-sky-200 text-xs text-slate-700 space-y-1">
                            <div className="flex items-center gap-1.5 font-bold text-sky-800">
                              <Lightbulb className="h-4 w-4" />
                              <span>Core Learning Objectives</span>
                            </div>
                            <p className="leading-relaxed">{unit.learningObjectives}</p>
                          </div>
                        )}

                        <div className="space-y-2.5">
                          {unit.lessons.map((lesson) => (
                            <div
                              key={lesson.id}
                              className={`p-4 rounded-xl border transition-all ${
                                lesson.isActive
                                  ? "bg-white border-sky-400 shadow-md ring-1 ring-sky-400/30"
                                  : lesson.isCompleted
                                  ? "bg-white border-slate-200"
                                  : "bg-slate-100/60 border-slate-200 opacity-60"
                              }`}
                            >
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                <div className="flex items-center gap-3">
                                  <div
                                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                                      lesson.isCompleted
                                        ? "bg-emerald-100 text-emerald-700"
                                        : lesson.isActive
                                        ? "bg-sky-100 text-sky-700 font-bold"
                                        : "bg-slate-200 text-slate-400"
                                    }`}
                                  >
                                    {lesson.isCompleted ? (
                                      <CheckCircle2 className="h-4 w-4" />
                                    ) : lesson.isLocked ? (
                                      <Lock className="h-3.5 w-3.5" />
                                    ) : (
                                      <span className="text-xs">{lesson.lessonNumber}</span>
                                    )}
                                  </div>

                                  <div>
                                    <span className="text-[10px] uppercase font-semibold text-slate-400">
                                      Lesson {lesson.lessonNumber} • {lesson.duration}
                                    </span>
                                    <h4 className="text-xs font-bold text-[#0B2B53]">
                                      {lesson.title}
                                    </h4>
                                  </div>
                                </div>

                                <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                                  {lesson.score !== undefined && (
                                    <span className="text-xs font-bold text-emerald-600">
                                      Mastery: {lesson.score}%
                                    </span>
                                  )}
                                  {lesson.isActive && (
                                    <Link href="/study">
                                      <Button
                                        size="sm"
                                        className="h-8 bg-[#00A8E8] hover:bg-sky-500 text-white font-bold text-xs rounded-lg shadow-sm flex items-center gap-1.5"
                                      >
                                        <span>Start Lesson</span>
                                        <ArrowRight className="h-3.5 w-3.5" />
                                      </Button>
                                    </Link>
                                  )}
                                  {lesson.isLocked && (
                                    <span className="text-[11px] text-slate-400">Locked</span>
                                  )}
                                </div>
                              </div>

                              {/* Interactive Simulator Highlight Box */}
                              {lesson.hasSimulator && (
                                <div className="mt-3 p-3 rounded-lg bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                                  <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                                      <FlaskConical className="h-4 w-4" />
                                    </div>
                                    <div>
                                      <span className="font-bold text-[#0B2B53] block">
                                        {lesson.simulatorTitle}
                                      </span>
                                      {lesson.simulatorDescription && (
                                        <span className="text-slate-500 text-[11px]">
                                          {lesson.simulatorDescription}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-100 text-sky-800 whitespace-nowrap">
                                    WebGL 3D Interactive
                                  </span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
