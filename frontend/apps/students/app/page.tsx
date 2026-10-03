"use client";

import React, { useState } from "react";
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
  BookOpen,
  Award,
  Flame,
  CheckCircle2,
  Clock,
  PlayCircle,
  FileText,
  Compass,
  ArrowRight,
  Sparkles,
  Layers,
} from "lucide-react";
import {
  Rocket01Icon,
  Settings02Icon,
  PaintBoardIcon,
  Layers01Icon,
  Download04Icon,
} from "@hugeicons/core-free-icons";

export default function StudentDashboardPage() {
  const [activeTrack, setActiveTrack] = useState("nextjs-14");

  const navItems = [
    { label: "Dashboard", href: "/", icon: <Compass className="h-4 w-4" />, active: true },
    { label: "My Courses", href: "/courses", icon: <BookOpen className="h-4 w-4" />, badge: 4 },
    { label: "Assignments", href: "/assignments", icon: <FileText className="h-4 w-4" />, badge: 2 },
    { label: "Certificates", href: "/certificates", icon: <Award className="h-4 w-4" /> },
  ];

  const curriculumBranches = [
    {
      label: "Active Learning Tracks",
      children: [
        { value: "nextjs-14", label: "Next.js 14 Fullstack", icon: Rocket01Icon },
        { value: "design-systems", label: "Design Systems", icon: PaintBoardIcon },
        { value: "ai-ml", label: "AI & ML Architecture", icon: Layers01Icon },
      ],
    },
    {
      label: "Upcoming Electives",
      children: [
        { value: "cloud-devops", label: "DevOps & CI/CD", icon: Settings02Icon },
        { value: "resources", label: "Course Starter Kits", icon: Download04Icon },
      ],
    },
  ];

  const enrolledCourses = [
    {
      id: "course-1",
      title: "Advanced Full-Stack Next.js 14 & AI Architecture",
      instructor: "Dr. Sarah Mitchell",
      progress: 68,
      totalLessons: 24,
      completedLessons: 16,
      category: "Fullstack Dev",
      thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: "course-2",
      title: "Modern UI/UX Design Systems with Tailwind & Figma",
      instructor: "Alex Rivera",
      progress: 42,
      totalLessons: 18,
      completedLessons: 8,
      category: "UI/UX Design",
      thumbnail: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: "course-3",
      title: "Machine Learning Foundations for Developers",
      instructor: "Prof. Alan Chen",
      progress: 85,
      totalLessons: 20,
      completedLessons: 17,
      category: "AI & ML",
      thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80",
    },
  ];

  const upcomingTasks = [
    {
      id: "task-1",
      course: "Advanced Full-Stack Next.js 14",
      title: "Implement Server Actions with Optimistic UI",
      dueDate: "Tomorrow at 11:59 PM",
      type: "Assignment",
      points: 100,
    },
    {
      id: "task-2",
      course: "Modern UI/UX Design Systems",
      title: "Module 3 Quiz: WCAG 2.2 Color Contrast",
      dueDate: "In 3 days",
      type: "Quiz",
      points: 50,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <AppHeader
        portalName="Students"
        userName="Emma Watson"
        userRole="Student"
        notificationCount={3}
      />

      <div className="flex flex-1 items-start">
        {/* Sticky Left Sidebar with Branched Menu */}
        <Sidebar items={navItems} currentPath="/">
          <div className="space-y-2">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">
              Curriculum Branches
            </p>
            <BranchedMenu
              items={curriculumBranches}
              defaultOpen={[0]}
              defaultActive={activeTrack}
              width={220}
              color="#334155"
              accentColor="#4f46e5"
              lineColor="#cbd5e1"
              onSelect={(value) => setActiveTrack(value)}
            />
          </div>
        </Sidebar>

        {/* Scrollable Main Content */}
        <main className="flex-1 p-8 space-y-8 max-w-7xl">
          {/* Welcome Banner */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 p-8 text-white shadow-lg shadow-indigo-500/10">
            <div className="relative z-10 max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur-md">
                <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                <span>Keep it up! You're on a 5-day study streak</span>
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight">
                Welcome back, Emma!
              </h1>
              <p className="text-sm text-indigo-100/90 leading-relaxed">
                You've completed 75% of your weekly learning target. Jump back into Next.js 14 Server Components lesson to stay on track.
              </p>
              <div className="pt-2">
                <Button className="bg-white text-indigo-700 hover:bg-indigo-50 shadow-md">
                  <PlayCircle className="h-4 w-4" /> Continue Next Lesson
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            <StatCard
              title="Study Streak"
              value="5 Days"
              change="+2 days"
              icon={<Flame className="h-5 w-5 text-amber-500" />}
              description="Longest streak: 14 days"
            />
            <StatCard
              title="Courses in Progress"
              value="3 Active"
              icon={<BookOpen className="h-5 w-5 text-indigo-500" />}
              description="1 course near completion"
            />
            <StatCard
              title="Completed Lessons"
              value="41 Lessons"
              change="+6 this week"
              icon={<CheckCircle2 className="h-5 w-5 text-emerald-500" />}
              description="Top 10% in cohort"
            />
            <StatCard
              title="Learning XP"
              value="2,450 XP"
              change="+320 XP"
              icon={<Award className="h-5 w-5 text-violet-500" />}
              description="Rank: Silver Tier"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Active Courses */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900">In-Progress Courses</h2>
                <Button variant="ghost" size="sm">
                  View All <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </div>

              <div className="space-y-4">
                {enrolledCourses.map((course) => (
                  <Card key={course.id} className="overflow-hidden hover:border-indigo-300">
                    <div className="flex flex-col sm:flex-row gap-5">
                      <div className="sm:w-48 h-32 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between space-y-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1.5">
                            <Badge variant="default">{course.category}</Badge>
                            <span className="text-xs text-slate-400">
                              by {course.instructor}
                            </span>
                          </div>
                          <h3 className="font-semibold text-slate-900 leading-snug line-clamp-1">
                            {course.title}
                          </h3>
                        </div>

                        <div className="space-y-1.5">
                          <div className="flex justify-between text-xs text-slate-500 font-medium">
                            <span>{course.completedLessons}/{course.totalLessons} Lessons</span>
                            <span>{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} />
                        </div>

                        <div className="flex justify-end pt-1">
                          <Button size="sm" variant="subtle">
                            Resume Course <ArrowRight className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Upcoming Deadlines */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900">Upcoming Deadlines</h2>

              <Card className="space-y-4">
                {upcomingTasks.map((task, i) => (
                  <div
                    key={task.id}
                    className={`space-y-2 ${i > 0 ? "pt-4 border-t border-slate-100" : ""}`}
                  >
                    <div className="flex items-center justify-between">
                      <Badge variant={task.type === "Assignment" ? "warning" : "info"}>
                        {task.type}
                      </Badge>
                      <span className="text-xs font-semibold text-slate-500">
                        +{task.points} pts
                      </span>
                    </div>
                    <h4 className="text-sm font-semibold text-slate-900">
                      {task.title}
                    </h4>
                    <p className="text-xs text-slate-400">{task.course}</p>
                    <div className="flex items-center gap-1.5 text-xs text-rose-600 font-medium pt-1">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{task.dueDate}</span>
                    </div>
                  </div>
                ))}

                <Button variant="outline" className="w-full mt-2 text-xs">
                  Go to Assignments Center
                </Button>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
