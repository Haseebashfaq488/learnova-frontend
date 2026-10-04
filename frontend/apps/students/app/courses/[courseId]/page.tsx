"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  AppHeader,
  Sidebar,
  Button,
  Badge,
  Progress,
  mockEnrolledCoursesHub,
  getStudentCourseNavBranches,
} from "@learnova/ui";
import {
  Route,
  BookMarked,
  Play,
  ArrowRight,
  Clock,
  Sparkles,
  Zap,
  CheckCircle2,
  ChevronRight,
  FlaskConical,
  Award,
  BookOpen,
} from "lucide-react";
import { useEnrollment } from "@/lib/enrollment-context";
import { EnrolledCourseCardData, CatalogCourse } from "@learnova/types";

export default function CourseOverviewPage() {
  const params = useParams();
  const courseId = (params?.courseId as string) || "ap-physics-1";
  const { enrolledCourses, catalogCourses } = useEnrollment();

  const enrolledCourse = enrolledCourses.find((c: EnrolledCourseCardData) => c.id === courseId);
  const catalogCourse = catalogCourses.find((c: CatalogCourse) => c.id === courseId);

  const course = enrolledCourse || (catalogCourse ? {
    id: catalogCourse.id,
    title: catalogCourse.title,
    subtitle: catalogCourse.subtitle,
    category: catalogCourse.category,
    status: "in-progress" as const,
    unitStatusText: `Unit 1 of ${catalogCourse.syllabus.length}`,
    thumbnailUrl: catalogCourse.thumbnailUrl,
    thumbnailAlt: catalogCourse.thumbnailAlt,
    highlightTopic: catalogCourse.syllabus[0]?.title || catalogCourse.tags[0],
    completedPercent: 0,
    completedLessons: 0,
    totalLessons: catalogCourse.totalLessons,
    interactiveLabsCount: catalogCourse.interactiveLabsCount,
    durationWeeklyRemaining: `${Math.round(catalogCourse.durationHours / 4)} hrs remaining`,
    pathSlug: `/courses/${catalogCourse.id}/learning-path`,
  } : mockEnrolledCoursesHub[0]);

  const courseBranches = getStudentCourseNavBranches(courseId, course.title);

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
        cohortTag={course.title}
      />

      <div className="flex flex-1">
        <Sidebar
          branches={courseBranches}
          currentPath={`/courses/${courseId}`}
          footerContent={
            <div className="rounded-xl bg-[#0B2B53] p-3.5 text-white space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-sky-400">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Next Milestone</span>
              </div>
              <p className="text-xs text-slate-300">
                Lesson 3.2 2D Force Equilibrium is ready for you.
              </p>
              <Link href={`/courses/${courseId}/study`}>
                <Button
                  size="sm"
                  className="w-full bg-[#00A8E8] hover:bg-sky-400 text-[#0B2B53] font-bold text-xs"
                >
                  Resume Study
                </Button>
              </Link>
            </div>
          }
        />

        <main className="flex-1 p-6 md:p-8 space-y-8 max-w-7xl">
          {/* Breadcrumb & Top Bar */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <Link href="/courses" className="hover:text-[#0B2B53] flex items-center gap-1">
              <BookOpen className="h-3.5 w-3.5" />
              <span>All Courses</span>
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
            <span className="font-bold text-[#0B2B53]">{course.title}</span>
          </nav>

          {/* Hero Banner Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="relative z-10 space-y-4 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="info">{course.category}</Badge>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                  {course.unitStatusText}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B2B53] tracking-tight">
                {course.title}
              </h1>
              <p className="text-sm text-slate-600 leading-relaxed">
                {course.highlightTopic}
              </p>

              {/* Progress Metric */}
              <div className="space-y-2 pt-2 max-w-lg">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-[#0B2B53]">
                    {course.completedPercent}% Course Mastery
                  </span>
                  <span className="text-slate-500">
                    {course.completedLessons}/{course.totalLessons} Lessons Finished
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#00A8E8] to-[#2ECC71] rounded-full transition-all duration-500"
                    style={{ width: `${course.completedPercent}%` }}
                  ></div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-4">
                <Link href={`/courses/${courseId}/study`}>
                  <Button className="bg-[#00A8E8] hover:bg-sky-500 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-2">
                    <BookMarked className="h-4 w-4" />
                    <span>Launch Study Canvas</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
                <Link href={`/courses/${courseId}/learning-path`}>
                  <Button variant="outline" className="text-xs font-bold rounded-xl flex items-center gap-2">
                    <Route className="h-4 w-4 text-sky-600" />
                    <span>View Learning Path</span>
                  </Button>
                </Link>
                <Link href={`/courses/${courseId}/practice`}>
                  <Button variant="outline" className="text-xs font-bold rounded-xl flex items-center gap-2">
                    <Play className="h-4 w-4 text-emerald-600" />
                    <span>Practice Arena</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* 3 Core Workspace Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Learning Path */}
            <Link
              href={`/courses/${courseId}/learning-path`}
              className="group bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-sky-300 transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Route className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-[#0B2B53] group-hover:text-[#00A8E8] transition-colors">
                  Learning Path & Milestones
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Sequential roadmap across all 6 course units, checkpoint exams, and laboratory simulations.
                </p>
              </div>
              <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-sky-600">
                <span>Explore Milestones</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Card 2: Focus Study Canvas */}
            <Link
              href={`/courses/${courseId}/study`}
              className="group bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-sky-300 transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <BookMarked className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-[#0B2B53] group-hover:text-[#00A8E8] transition-colors">
                  Focus Study & AI Assistant
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Interactive reading canvas, dynamic apparatus simulators, and real-time AI physics derivations.
                </p>
              </div>
              <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600">
                <span>Resume Lesson 3.2</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Card 3: Practice Arena */}
            <Link
              href={`/courses/${courseId}/practice`}
              className="group bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-sky-300 transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Play className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-[#0B2B53] group-hover:text-[#00A8E8] transition-colors">
                  Practice Mode & Quizzes
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Distraction-free assessment arena with step-by-step formula hints and live time trials.
                </p>
              </div>
              <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-600">
                <span>Start Practice</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
