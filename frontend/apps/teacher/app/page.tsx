"use client";

import React from "react";
import Link from "next/link";
import {
  AppHeader,
  Sidebar,
  StatCard,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Badge,
  Button,
  Avatar,
  BranchedMenu,
} from "@learnova/ui";
import {
  BarChart3,
  BookOpen,
  FileCheck,
  Users,
  MessageSquare,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Download,
  Plus,
  Clock,
  Sparkles,
  ShieldCheck,
  Layers,
  GraduationCap,
} from "lucide-react";
import {
  Rocket01Icon,
  Settings02Icon,
  PaintBoardIcon,
} from "@hugeicons/core-free-icons";

export default function InstructorDashboardPage() {
  const navItems = [
    { label: "Faculty Dashboard", href: "/", icon: <BarChart3 className="h-4 w-4" />, active: true },
    { label: "Curriculum Builder", href: "/curriculum", icon: <BookOpen className="h-4 w-4" />, badge: "4 Units" },
    { label: "Student Mastery Grid", href: "/mastery", icon: <Users className="h-4 w-4" />, badge: "3 Alerts" },
    { label: "Submissions & Grading", href: "#grading", icon: <FileCheck className="h-4 w-4" />, badge: 8 },
    { label: "Discussions", href: "#discussions", icon: <MessageSquare className="h-4 w-4" /> },
  ];

  const studioBranches = [
    {
      label: "Course Modules in Review",
      children: [
        { value: "m1", label: "Module 1: Kinematics 2D", icon: Rocket01Icon },
        { value: "m2", label: "Module 2: Newton's Laws", icon: Settings02Icon },
        { value: "m3", label: "Module 3: Work & Energy", icon: PaintBoardIcon },
      ],
    },
  ];

  const teacherCourses = [
    {
      id: "tc-1",
      title: "AP Physics 1: Mechanics & Dynamics",
      studentsCount: 28,
      masteryRate: 84,
      status: "Published",
      pendingSubmissions: 4,
      tag: "Active Cohort A",
    },
    {
      id: "tc-2",
      title: "Advanced Full-Stack Architecture with AI",
      studentsCount: 34,
      masteryRate: 78,
      status: "Published",
      pendingSubmissions: 3,
      tag: "Elective",
    },
    {
      id: "tc-3",
      title: "Design Systems Engineering & UI Tokens",
      studentsCount: 0,
      masteryRate: 0,
      status: "Draft",
      pendingSubmissions: 0,
      tag: "Drafting",
    },
  ];

  const pendingGradingQueue = [
    {
      id: "sub-1",
      studentName: "David Kim",
      course: "AP Physics 1",
      assignment: "Newton's Second Law Multi-body Pulley Lab",
      submittedTime: "2 hours ago",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    },
    {
      id: "sub-2",
      studentName: "Sophia Chen",
      course: "AP Physics 1",
      assignment: "Frictional Slip Calculation & Incline Analysis",
      submittedTime: "4 hours ago",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    },
    {
      id: "sub-3",
      studentName: "Marcus Vance",
      course: "AP Physics 1",
      assignment: "Circular Motion Banked Curve Simulation",
      submittedTime: "5 hours ago",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <AppHeader
        portalName="Teacher Studio"
        userName="Dr. Sarah Mitchell"
        userRole="Lead Faculty Instructor"
        avatarUrl="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80"
        notificationCount={5}
        cohortTag="Fall 2025 • AP Physics Period 3"
      />

      <div className="flex flex-1">
        <Sidebar
          items={navItems}
          currentPath="/"
          footerContent={
            <div className="rounded-xl bg-[#0B2B53] p-3.5 text-white space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-sky-400">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Intervention Ready</span>
              </div>
              <p className="text-xs text-slate-300">
                3 students flagged on Friction Forces need individual review.
              </p>
              <Link href="/mastery">
                <Button size="sm" className="w-full bg-[#00A8E8] hover:bg-sky-400 text-[#0B2B53] font-bold text-xs">
                  Open Mastery Grid
                </Button>
              </Link>
            </div>
          }
        >
          <div className="space-y-2">
            <p className="px-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Curriculum Studio
            </p>
            <BranchedMenu
              items={studioBranches}
              defaultActive="m1"
              onSelect={() => {}}
            />
          </div>
        </Sidebar>

        <main className="flex-1 p-6 md:p-8 space-y-8 max-w-7xl">
          {/* Header Area with Editorial Precision */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-sky-700 uppercase tracking-wider mb-1">
                <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></span>
                <span>Real-Time Cohort Pulse · Updated 2m ago</span>
              </div>
              <h1 className="text-3xl font-extrabold text-[#0B2B53] tracking-tight">
                Instructor Overview
              </h1>
              <p className="text-sm text-slate-600 mt-1">
                AP Physics 1 • Period 3 • 28 enrolled students
              </p>
            </div>

            {/* Quick Actions Header Strip */}
            <div className="flex items-center gap-3 self-start md:self-auto">
              <Button
                variant="outline"
                className="bg-white border-slate-200 text-[#0B2B53] hover:bg-slate-50 text-xs font-semibold rounded-xl shadow-sm"
              >
                <Download className="h-4 w-4 mr-1.5" />
                <span>Export Roster Log</span>
              </Button>
              <Button className="bg-[#00A8E8] hover:bg-sky-500 text-white font-bold text-xs rounded-xl shadow-sm">
                <Plus className="h-4 w-4 mr-1.5" />
                <span>Create Announcement</span>
              </Button>
            </div>
          </div>

          {/* Top Summary Metrics Strip */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Metric 1: Active Participation */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                    Active Participation
                  </span>
                  <h3 className="text-3xl font-extrabold text-[#0B2B53] mt-1">28 / 28</h3>
                </div>
                <div className="w-11 h-11 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                  <Users className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  +3 finished today&apos;s module
                </span>
                <span className="font-bold text-emerald-600">100% On-Track</span>
              </div>
            </div>

            {/* Metric 2: Pending Alerts */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                    Interventions Required
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <h3 className="text-3xl font-extrabold text-rose-600">3</h3>
                    <span className="text-xs font-semibold text-rose-500">Students Flagged</span>
                  </div>
                </div>
                <div className="w-11 h-11 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">Topic: Friction Forces</span>
                <Link href="/mastery" className="font-bold text-[#00A8E8] hover:underline">
                  View Matrix →
                </Link>
              </div>
            </div>

            {/* Metric 3: Avg Mastery Benchmark */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                    Cohort Mastery Rate
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <h3 className="text-3xl font-extrabold text-[#0B2B53]">84%</h3>
                    <span className="text-xs font-semibold text-emerald-600">Tier 1 Target</span>
                  </div>
                </div>
                <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-emerald-600 font-bold flex items-center gap-1">
                  <TrendingUp className="h-3.5 w-3.5" />
                  +6% this week
                </span>
                <div className="w-24 bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: "84%" }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* ASYMMETRICAL SPLIT: Course Studio & Submissions Queue */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 8 cols: Course Studio Cards */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-[#0B2B53]">Active Course Studio</h3>
                <Link href="/curriculum" className="text-xs font-bold text-[#00A8E8] hover:underline flex items-center gap-1">
                  <span>Open Curriculum Builder</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="space-y-3">
                {teacherCourses.map((course) => (
                  <div
                    key={course.id}
                    className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-300 transition-all"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant={course.status === "Published" ? "success" : "default"}>
                          {course.status}
                        </Badge>
                        <span className="text-xs text-slate-400">{course.tag}</span>
                      </div>
                      <h4 className="text-base font-bold text-[#0B2B53]">{course.title}</h4>
                      <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
                        <span>{course.studentsCount} Students Enrolled</span>
                        {course.masteryRate > 0 && <span>• {course.masteryRate}% Avg Mastery</span>}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-center">
                      {course.pendingSubmissions > 0 && (
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                          {course.pendingSubmissions} Pending Grades
                        </span>
                      )}
                      <Link href="/curriculum">
                        <Button size="sm" variant="outline" className="text-xs font-semibold">
                          Edit Units
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right 4 cols: Submissions Grading Queue */}
            <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4" id="grading">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-[#0B2B53]">Grading Inbox</h3>
                <Badge variant="warning">3 Priority</Badge>
              </div>

              <div className="space-y-3">
                {pendingGradingQueue.map((sub) => (
                  <div
                    key={sub.id}
                    className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-100 transition-all space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar name={sub.studentName} src={sub.avatar} size="sm" />
                        <div>
                          <p className="text-xs font-bold text-[#0B2B53] leading-none">{sub.studentName}</p>
                          <span className="text-[10px] text-slate-400">{sub.submittedTime}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs font-medium text-slate-700 leading-snug">
                      {sub.assignment}
                    </p>
                    <div className="flex justify-end pt-1">
                      <Button size="sm" className="h-7 text-[11px] bg-[#00A8E8] hover:bg-sky-500 text-white font-semibold">
                        Grade Submission
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
