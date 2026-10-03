"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  AppHeader,
  Sidebar,
  Button,
  Badge,
  mockAPPhysicsLearningPath,
  mockEnrolledCoursesHub,
  getStudentCourseNavBranches,
} from "@learnova/ui";
import {
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
  BookOpen,
  Route,
} from "lucide-react";

export default function CourseLearningPathPage() {
  const params = useParams();
  const courseId = (params?.courseId as string) || "ap-physics-1";

  const course =
    mockEnrolledCoursesHub.find((c) => c.id === courseId) ||
    mockEnrolledCoursesHub[0];

  const courseBranches = getStudentCourseNavBranches(courseId, course.title);

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
        cohortTag={`${course.title} • Spring 2025`}
      />

      <div className="flex flex-1">
        <Sidebar
          branches={courseBranches}
          currentPath={`/courses/${courseId}/learning-path`}
          footerContent={
            <div className="rounded-xl bg-slate-900 p-3.5 text-white space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-sky-400">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Next Milestone</span>
              </div>
              <p className="text-xs text-slate-300">
                Complete Lesson 3.2 to unlock Unit 3 Checkpoint!
              </p>
              <Link href={`/courses/${courseId}/study`}>
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
            <div className="max-w-7xl mx-auto space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                  <Link href="/courses" className="hover:text-[#0B2B53] flex items-center gap-1">
                    <BookOpen className="h-3.5 w-3.5" />
                    <span>Courses</span>
                  </Link>
                  <span>/</span>
                  <span className="font-bold text-[#0B2B53]">{course.title}</span>
                  <span>/</span>
                  <span className="text-sky-600 font-semibold">Learning Path</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={expandAll}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold transition-colors"
                  >
                    Expand All Units
                  </button>
                  <button
                    type="button"
                    onClick={collapseCompleted}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold transition-colors"
                  >
                    Focus In-Progress
                  </button>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pt-2">
                <div className="space-y-1">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B2B53] tracking-tight">
                    {course.title}: Milestones & Curriculum
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
                    Master Newtonian Mechanics, multi-body kinematics, conservation laws, and orbital dynamics with sequential milestones and simulators.
                  </p>
                </div>

                {/* Overall Milestone Summary Card */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 flex items-center gap-6 shrink-0">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Overall Completion</span>
                    <span className="text-xl font-mono font-extrabold text-[#0B2B53]">68%</span>
                    <span className="text-[11px] text-slate-500 block">18 of 26 Lessons</span>
                  </div>
                  <div className="w-px h-10 bg-slate-200"></div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-sky-600 block mb-0.5">Active Unit</span>
                    <span className="text-xl font-mono font-extrabold text-sky-700">Unit 3</span>
                    <span className="text-[11px] text-slate-500 block">Forces & Dynamics</span>
                  </div>
                </div>
              </div>

              {/* Course Meta Tags Strip */}
              <div className="pt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 text-xs">
                <div className="flex items-center gap-2 text-slate-500">
                  <Route className="h-4 w-4 text-sky-600" />
                  <span className="font-bold text-[#0B2B53]">Holistic Course Journey</span>
                  <span>• 6 Progressive Units • 26 Lessons Total</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                    <CheckCircle2 className="h-3.5 w-3.5" /> 2 Units Mastered
                  </span>
                  <span className="flex items-center gap-1 text-sky-800 font-semibold bg-sky-50 px-2 py-0.5 rounded">
                    <Zap className="h-3.5 w-3.5" /> 1 Unit In-Progress
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Sequential Units Accordion Container */}
          <section className="max-w-7xl mx-auto px-6 md:px-8 space-y-6 pb-16">
            {learningPath.map((unit) => {
              const isExpanded = expandedUnits[unit.id] ?? false;
              const isCompleted = unit.status === "completed";
              const isInProgress = unit.status === "in-progress";
              const isLocked = unit.status === "locked";

              return (
                <div
                  key={unit.id}
                  className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden shadow-sm ${
                    isInProgress
                      ? "border-sky-300 ring-2 ring-sky-500/10"
                      : isCompleted
                      ? "border-emerald-200/80"
                      : "border-slate-200 opacity-80"
                  }`}
                >
                  {/* Unit Card Header (Clickable for toggle) */}
                  <div
                    onClick={() => toggleUnit(unit.id)}
                    className="p-6 cursor-pointer select-none flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      {/* Status Icon Indicator */}
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold shrink-0 mt-0.5 ${
                          isCompleted
                            ? "bg-emerald-100 text-emerald-700"
                            : isInProgress
                            ? "bg-sky-500 text-white shadow-md shadow-sky-500/20"
                            : "bg-slate-100 text-slate-400"
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="h-5 w-5" />
                        ) : isInProgress ? (
                          <Zap className="h-5 w-5" />
                        ) : (
                          <Lock className="h-5 w-5" />
                        )}
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-sky-700">
                            Unit {unit.unitNumber}
                          </span>
                          <span className="text-slate-300">•</span>
                          <span className="text-xs text-slate-500 font-medium">
                            {unit.lessonsCount} Lessons
                          </span>
                          <span className="text-slate-300">•</span>
                          <span className="text-xs text-slate-500 font-medium">
                            {unit.estimatedHours} hrs
                          </span>
                        </div>
                        <h2 className="text-lg font-bold text-[#0B2B53]">
                          {unit.title}
                        </h2>
                        <p className="text-xs text-slate-600 max-w-2xl">
                          {unit.description}
                        </p>
                      </div>
                    </div>

                    {/* Right Progress & Status Badges */}
                    <div className="flex items-center gap-4 self-end md:self-center">
                      <div className="text-right hidden sm:block">
                        <span className="text-xs font-bold text-[#0B2B53] block">
                          {unit.completionPercent}% Complete
                        </span>
                        <div className="w-28 bg-slate-200 rounded-full h-1.5 mt-1 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              isCompleted
                                ? "bg-emerald-500"
                                : isInProgress
                                ? "bg-sky-500"
                                : "bg-slate-300"
                            }`}
                            style={{ width: `${unit.completionPercent}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {isInProgress && (
                          <span className="px-2.5 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold animate-pulse">
                            Current Focus
                          </span>
                        )}
                        {isCompleted && (
                          <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                            Mastered
                          </span>
                        )}
                        {isLocked && (
                          <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-500 text-xs font-bold">
                            Locked
                          </span>
                        )}

                        <button
                          type="button"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                          aria-label="Toggle Unit Details"
                        >
                          {isExpanded ? (
                            <ChevronUp className="h-5 w-5" />
                          ) : (
                            <ChevronDown className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Collapsible Unit Body (Lessons & Simulators List) */}
                  {isExpanded && (
                    <div className="p-6 border-t border-slate-100 space-y-4">
                      <div className="grid grid-cols-1 gap-3">
                        {unit.lessons.map((lesson) => {
                          const isLessonComplete = lesson.isCompleted;
                          const isLessonActive = lesson.isActive ?? (!lesson.isCompleted && !lesson.isLocked && isInProgress);

                          return (
                            <div
                              key={lesson.id}
                              className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-200 ${
                                isLessonActive
                                  ? "bg-sky-50/60 border-sky-200 shadow-sm"
                                  : isLessonComplete
                                  ? "bg-white border-slate-200/90 hover:border-slate-300"
                                  : "bg-slate-50 border-slate-200/50 opacity-60"
                              }`}
                            >
                              <div className="flex items-start gap-3.5">
                                {/* Type icon */}
                                <div
                                  className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                                    lesson.hasSimulator || lesson.type === "Lab Simulation"
                                      ? "bg-indigo-100 text-indigo-700"
                                      : lesson.type === "Exam" || lesson.type === "Quiz"
                                      ? "bg-amber-100 text-amber-700"
                                      : isLessonComplete
                                      ? "bg-emerald-50 text-emerald-600"
                                      : "bg-slate-100 text-slate-600"
                                  }`}
                                >
                                  {lesson.hasSimulator || lesson.type === "Lab Simulation" ? (
                                    <FlaskConical className="h-4 w-4" />
                                  ) : lesson.type === "Quiz" || lesson.type === "Exam" ? (
                                    <HelpCircle className="h-4 w-4" />
                                  ) : lesson.type === "Video Lecture" ? (
                                    <Video className="h-4 w-4" />
                                  ) : (
                                    <FileText className="h-4 w-4" />
                                  )}
                                </div>

                                <div className="space-y-0.5">
                                  <div className="flex items-center gap-2">
                                    <span className="text-[11px] font-mono font-bold text-slate-400">
                                      {lesson.lessonNumber}
                                    </span>
                                    <h4 className="text-sm font-bold text-[#0B2B53]">
                                      {lesson.title}
                                    </h4>
                                    {lesson.hasSimulator && (
                                      <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 text-[10px] font-bold uppercase tracking-wider">
                                        Interactive Lab
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-xs text-slate-500">
                                    {lesson.simulatorDescription || lesson.type}
                                  </p>
                                </div>
                              </div>

                              {/* Lesson CTA / Duration Status */}
                              <div className="flex items-center gap-4 shrink-0 sm:self-center self-end">
                                <div className="flex items-center gap-3 text-xs text-slate-500">
                                  <span className="flex items-center gap-1 font-medium">
                                    <Clock className="h-3.5 w-3.5 text-slate-400" />
                                    {lesson.duration}
                                  </span>
                                  <span className="font-bold text-emerald-600">
                                    +{lesson.xpValue || 25} XP
                                  </span>
                                </div>

                                {isLessonActive ? (
                                  <Link href={`/courses/${courseId}/study`}>
                                    <Button
                                      size="sm"
                                      className="bg-[#00A8E8] hover:bg-sky-500 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-1.5"
                                    >
                                      <span>Resume</span>
                                      <ArrowRight className="h-3.5 w-3.5" />
                                    </Button>
                                  </Link>
                                ) : isLessonComplete ? (
                                  <Link href={`/courses/${courseId}/study`}>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="text-xs font-semibold rounded-xl text-slate-600 hover:text-[#0B2B53]"
                                    >
                                      Review
                                    </Button>
                                  </Link>
                                ) : (
                                  <span className="text-xs text-slate-400 italic px-2">
                                    Locked
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </section>
        </main>
      </div>
    </div>
  );
}
