"use client";

import React, { useState } from "react";
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
  Progress,
  BranchedMenu,
} from "@learnova/ui";
import {
  Compass,
  BookOpen,
  Route,
  BookMarked,
  FileText,
  Award,
  Zap,
  Clock,
  Play,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Calendar,
  Layers,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import {
  Rocket01Icon,
  PaintBoardIcon,
  Layers01Icon,
  Settings02Icon,
  Download04Icon,
} from "@hugeicons/core-free-icons";

export default function StudentLearningHubPage() {
  const [activeTrack, setActiveTrack] = useState("physics-101");

  const navItems = [
    { label: "Learning Hub", href: "/", icon: <Compass className="h-4 w-4" />, active: true },
    { label: "My Courses", href: "/courses", icon: <BookOpen className="h-4 w-4" />, badge: 4 },
    { label: "Learning Path", href: "/learning-path", icon: <Route className="h-4 w-4" />, badge: "Unit 3" },
    { label: "Focus Study (AI)", href: "/study", icon: <BookMarked className="h-4 w-4" />, badge: "Active" },
    { label: "Focus Practice", href: "/practice", icon: <Play className="h-4 w-4" /> },
    { label: "Progress & Radar", href: "/analytics", icon: <Award className="h-4 w-4" />, badge: "77%" },
  ];

  const curriculumBranches = [
    {
      label: "Active Learning Tracks",
      children: [
        { value: "physics-101", label: "AP Physics: Mechanics", icon: Rocket01Icon },
        { value: "nextjs-14", label: "Fullstack Systems", icon: Layers01Icon },
        { value: "design-systems", label: "Design Systems & UI", icon: PaintBoardIcon },
      ],
    },
    {
      label: "Study Resources",
      children: [
        { value: "formula-sheet", label: "AP Physics Formula Sheet", icon: Download04Icon },
        { value: "settings", label: "Study Schedule Settings", icon: Settings02Icon },
      ],
    },
  ];

  const enrolledCourses = [
    {
      id: "course-phys",
      title: "AP Physics 1: Mechanics & Dynamics",
      instructor: "Dr. Sarah Mitchell",
      progress: 74,
      totalLessons: 18,
      completedLessons: 13,
      category: "Physics & STEM",
      thumbnail: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=600&auto=format&fit=crop&q=80",
      tag: "Core Focus",
    },
    {
      id: "course-next",
      title: "Advanced Full-Stack Architecture with AI",
      instructor: "Prof. Alan Chen",
      progress: 68,
      totalLessons: 24,
      completedLessons: 16,
      category: "Engineering",
      thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80",
      tag: "Elective",
    },
    {
      id: "course-design",
      title: "Modern Design Systems Engineering",
      instructor: "Alex Rivera",
      progress: 42,
      totalLessons: 18,
      completedLessons: 8,
      category: "UI/UX Design",
      thumbnail: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=600&auto=format&fit=crop&q=80",
      tag: "In Review",
    },
  ];

  const dailySchedule = [
    { time: "09:00 AM", title: "Mechanics 2D Force Equilibrium Lab", type: "Lab Simulation", done: true },
    { time: "11:30 AM", title: "Practice MCQ: Circular Centripetal Forces", type: "Focus Mode", done: false, active: true },
    { time: "03:00 PM", title: "Live Office Hours with Dr. Mitchell", type: "Webinar", done: false },
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
        cohortTag="Fall 2025 • Grade 10"
      />

      <div className="flex flex-1">
        <Sidebar
          items={navItems}
          currentPath="/"
          footerContent={
            <div className="rounded-xl bg-gradient-to-br from-[#0B2B53] to-slate-900 p-3.5 text-white">
              <div className="flex items-center gap-2 text-xs font-semibold text-sky-400 mb-1">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Next Milestone</span>
              </div>
              <p className="text-xs text-slate-300 mb-2">
                Complete 2 more practice quizzes to unlock Level 6 Scholar!
              </p>
              <Link href="/practice">
                <Button size="sm" className="w-full bg-[#00A8E8] hover:bg-sky-400 text-[#0B2B53] font-bold text-xs">
                  Start Practice
                </Button>
              </Link>
            </div>
          }
        >
          <div className="space-y-2">
            <p className="px-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Curriculum Tracks
            </p>
            <BranchedMenu
              items={curriculumBranches}
              defaultActive={activeTrack}
              onSelect={(val) => setActiveTrack(val)}
            />
          </div>
        </Sidebar>

        <main className="flex-1 p-6 md:p-8 space-y-8 max-w-7xl">
          {/* Welcome Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Academic Workspace · Fall 2025</span>
              </div>
              <h1 className="text-3xl font-extrabold text-[#0B2B53] tracking-tight">
                Good morning, Alex.
              </h1>
              <p className="text-sm text-slate-600 mt-1">
                You are on a 14-day streak! Ready to tackle your next mastery checkpoint?
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-medium text-slate-700 shadow-sm">
                <Calendar className="h-3.5 w-3.5 text-sky-600" />
                <span>Wednesday, Oct 24</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100 text-sky-800 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                <span>Midterm Preparation</span>
              </div>
            </div>
          </div>

          {/* PRIMARY FOCAL HERO: Your Next Lesson */}
          <section className="relative rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
            <div className="bg-[#0B2B53] px-6 py-3.5 text-white flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 text-sky-400">
                  <Play className="h-4 w-4 fill-sky-400" />
                </div>
                <span className="text-sm font-semibold tracking-wide">Your Next Lesson</span>
              </div>
              <span className="inline-flex items-center px-3 py-0.5 rounded-full bg-white/10 text-sky-200 text-xs font-medium">
                AP Physics 1 • Unit 3: Newton&apos;s Second Law
              </span>
            </div>

            <div className="p-6 md:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex-1 space-y-4 max-w-3xl">
                <div className="flex items-center gap-3 text-xs font-medium text-slate-500">
                  <span className="inline-flex items-center gap-1 font-semibold text-sky-600">
                    <Clock className="h-3.5 w-3.5" />
                    18 mins
                  </span>
                  <span>•</span>
                  <span>Interactive Simulator & 4 Mastery Checkpoints</span>
                </div>

                <h2 className="text-2xl font-bold text-[#0B2B53] tracking-tight">
                  Lesson 3.2: Calculating Net Force and Acceleration in 2D Systems
                </h2>

                <p className="text-sm text-slate-600 leading-relaxed">
                  Deconstruct complex multi-body tensions and tilted coordinate systems into orthogonal vector components using Newton&apos;s classic equations of dynamic equilibrium.
                </p>

                {/* Key Concept Tags */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 mr-1">
                    Key Concepts:
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 text-xs font-medium border border-slate-200">
                    Free Body Diagrams
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 text-xs font-medium border border-slate-200">
                    F = ma Resolution
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 text-xs font-medium border border-slate-200">
                    Orthogonal Vector Sums
                  </span>
                </div>
              </div>

              {/* Action Column */}
              <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-center gap-3 min-w-[220px]">
                <Link href="/practice" className="w-full">
                  <Button className="w-full bg-[#00A8E8] hover:bg-sky-500 text-white font-bold py-6 text-base rounded-xl shadow-md shadow-sky-500/20 flex items-center justify-center gap-2 group">
                    <span>Start Practice</span>
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>Recommended for today&apos;s goal</span>
                </div>
              </div>
            </div>
          </section>

          {/* PROGRESSION & XP BENTO LAYER */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* XP Scholar Level Progress Card (8 cols) */}
            <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600">
                    <Award className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#0B2B53] leading-none">Level 5 Scholar</h3>
                    <p className="text-xs text-slate-500 mt-1">Tier: Advanced Mechanics & Calculus</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xl font-extrabold text-[#0B2B53]">1,420</span>
                  <span className="text-xs text-slate-500"> / 2,000 XP</span>
                </div>
              </div>

              <div className="space-y-1.5 pt-2">
                <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#00A8E8] to-[#2ECC71] transition-all duration-700"
                    style={{ width: "71%" }}
                  ></div>
                </div>
                <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                  <span>580 XP remaining to Level 6</span>
                  <span className="text-emerald-600 font-semibold">+140 XP earned today</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-100 text-center">
                <div className="p-2.5 rounded-xl bg-slate-50">
                  <span className="text-xs text-slate-500">Mastered Units</span>
                  <p className="text-lg font-bold text-[#0B2B53]">3 / 4</p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50">
                  <span className="text-xs text-slate-500">Practice Score</span>
                  <p className="text-lg font-bold text-emerald-600">92%</p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50">
                  <span className="text-xs text-slate-500">Study Velocity</span>
                  <p className="text-lg font-bold text-sky-600">4.2 hrs/wk</p>
                </div>
              </div>
            </div>

            {/* Quick Links & Radar Preview (4 cols) */}
            <div className="lg:col-span-4 bg-gradient-to-br from-[#0B2B53] to-slate-900 rounded-2xl p-6 text-white flex flex-col justify-between shadow-md shadow-slate-900/10">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-sky-400 uppercase tracking-wider">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Competency Pulse</span>
                </div>
                <h3 className="text-xl font-bold">Physics Radar Status</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Overall concept readiness is at <span className="text-emerald-400 font-bold">77%</span>. Kinematics and Newton&apos;s Laws are fully mastered.
                </p>
              </div>

              <div className="space-y-3 pt-4">
                <Link href="/analytics">
                  <Button className="w-full bg-[#00A8E8] hover:bg-sky-400 text-[#0B2B53] font-bold text-xs rounded-xl flex items-center justify-between">
                    <span>Inspect Radar Chart</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/practice">
                  <Button variant="outline" className="w-full bg-white/10 hover:bg-white/20 border-white/20 text-white text-xs rounded-xl">
                    Focus Mode Practice
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* ENROLLED COURSES & TODAY'S SCHEDULE */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Courses Overview (8 cols) */}
            <div className="lg:col-span-8 space-y-4" id="courses">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-[#0B2B53]">Enrolled Learning Courses</h3>
                <span className="text-xs text-slate-500 font-medium">3 Active Courses</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {enrolledCourses.map((course) => (
                  <Card key={course.id} className="overflow-hidden border-slate-200 hover:border-slate-300 transition-all flex flex-col justify-between">
                    <div className="relative h-28 w-full bg-slate-200">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="h-full w-full object-cover"
                      />
                      <Badge className="absolute top-2 left-2 bg-[#0B2B53]/90 text-white text-[10px]">
                        {course.tag}
                      </Badge>
                    </div>
                    <CardHeader className="p-4 pb-2">
                      <span className="text-[11px] font-semibold text-sky-600 uppercase tracking-wide">
                        {course.category}
                      </span>
                      <CardTitle className="text-sm font-bold text-[#0B2B53] line-clamp-2 mt-1">
                        {course.title}
                      </CardTitle>
                      <CardDescription className="text-xs text-slate-500 mt-1">
                        {course.instructor}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="p-4 pt-2 flex flex-col gap-2 border-t border-slate-100">
                      <div className="w-full flex items-center justify-between text-xs">
                        <span className="text-slate-500">{course.completedLessons}/{course.totalLessons} lessons</span>
                        <span className="font-bold text-[#0B2B53]">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-1.5" />
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>

            {/* Daily Schedule & Focus Agenda (4 cols) */}
            <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-[#0B2B53]">Today&apos;s Focus Schedule</h3>
                <span className="text-xs font-semibold text-emerald-600">3 Tasks</span>
              </div>

              <div className="space-y-3">
                {dailySchedule.map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-xl border transition-all ${
                      item.active
                        ? "border-sky-300 bg-sky-50/50 shadow-sm"
                        : item.done
                        ? "border-slate-200 bg-slate-50/70 opacity-80"
                        : "border-slate-200 bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-semibold text-slate-500">{item.time}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                        item.done ? "bg-emerald-100 text-emerald-700" : item.active ? "bg-sky-100 text-sky-800" : "bg-slate-100 text-slate-600"
                      }`}>
                        {item.type}
                      </span>
                    </div>
                    <p className={`text-xs font-bold ${item.done ? "line-through text-slate-500" : "text-[#0B2B53]"}`}>
                      {item.title}
                    </p>
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
