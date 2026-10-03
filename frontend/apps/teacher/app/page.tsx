"use client";

import React from "react";
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
  Users,
  BookOpen,
  DollarSign,
  Star,
  Plus,
  FileCheck,
  BarChart3,
  MessageSquare,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import {
  Rocket01Icon,
  Settings02Icon,
  Layers01Icon,
  PaintBoardIcon,
} from "@hugeicons/core-free-icons";

export default function TeacherDashboardPage() {
  const navItems = [
    { label: "Dashboard", href: "/", icon: <BarChart3 className="h-4 w-4" />, active: true },
    { label: "Course Studio", href: "/courses", icon: <BookOpen className="h-4 w-4" />, badge: 4 },
    { label: "Submissions & Grading", href: "/grading", icon: <FileCheck className="h-4 w-4" />, badge: 8 },
    { label: "Students Roster", href: "/students", icon: <Users className="h-4 w-4" /> },
    { label: "Discussions", href: "/discussions", icon: <MessageSquare className="h-4 w-4" /> },
  ];

  const studioBranches = [
    {
      label: "Course Modules in Review",
      children: [
        { value: "m1", label: "Module 1: RSC & Suspense", icon: Rocket01Icon },
        { value: "m2", label: "Module 2: Server Actions", icon: Settings02Icon },
        { value: "m3", label: "Module 3: Design Tokens", icon: PaintBoardIcon },
      ],
    },
  ];

  const teacherCourses = [
    {
      id: "tc-1",
      title: "Advanced Full-Stack Next.js 14 & AI Architecture",
      studentsCount: 1240,
      revenue: "$18,600",
      rating: 4.9,
      status: "Published",
      pendingSubmissions: 5,
    },
    {
      id: "tc-2",
      title: "Design Systems Engineering with Tailwind CSS",
      studentsCount: 890,
      revenue: "$11,200",
      rating: 4.8,
      status: "Published",
      pendingSubmissions: 3,
    },
    {
      id: "tc-3",
      title: "Microservices & Distributed Systems with Go & Docker",
      studentsCount: 0,
      revenue: "$0",
      rating: 0,
      status: "Draft",
      pendingSubmissions: 0,
    },
  ];

  const pendingGradingQueue = [
    {
      id: "sub-1",
      studentName: "David Kim",
      course: "Next.js 14 & AI Architecture",
      assignment: "Server Actions with Optimistic UI",
      submittedTime: "2 hours ago",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    },
    {
      id: "sub-2",
      studentName: "Sophia Chen",
      course: "Design Systems Engineering",
      assignment: "Accessible Modal Dialog Component",
      submittedTime: "4 hours ago",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    },
    {
      id: "sub-3",
      studentName: "Liam Johnson",
      course: "Next.js 14 & AI Architecture",
      assignment: "AI Streaming Chat Route Handler",
      submittedTime: "5 hours ago",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <AppHeader
        portalName="Teacher Studio"
        userName="Dr. Sarah Mitchell"
        userRole="Lead Instructor"
        notificationCount={5}
      />

      <div className="flex flex-1 items-start">
        <Sidebar items={navItems} currentPath="/">
          <div className="space-y-2">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">
              Curriculum Outlines
            </p>
            <BranchedMenu
              items={studioBranches}
              defaultOpen={[0]}
              defaultActive="m1"
              width={220}
              color="#334155"
              accentColor="#4f46e5"
              lineColor="#cbd5e1"
            />
          </div>
        </Sidebar>

        <main className="flex-1 p-8 space-y-8 max-w-7xl">
          {/* Header & Quick Action */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Instructor Dashboard
              </h1>
              <p className="text-sm text-slate-500 mt-0.5">
                Overview of your curriculum, student engagement, and grading pipeline.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <MessageSquare className="h-4 w-4" /> Broadcast Announcement
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4" /> Create New Course
              </Button>
            </div>
          </div>

          {/* Metric Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            <StatCard
              title="Total Enrolled Students"
              value="2,130"
              change="+14.2%"
              icon={<Users className="h-5 w-5 text-indigo-500" />}
              description="Across 3 published courses"
            />
            <StatCard
              title="Monthly Course Revenue"
              value="$29,800"
              change="+8.5%"
              icon={<DollarSign className="h-5 w-5 text-emerald-500" />}
              description="Payout scheduled in 5 days"
            />
            <StatCard
              title="Average Student Rating"
              value="4.88 ★"
              change="+0.04"
              icon={<Star className="h-5 w-5 text-amber-500" />}
              description="Based on 480+ student reviews"
            />
            <StatCard
              title="Pending Reviews"
              value="8 Submissions"
              isPositive={false}
              change="Action needed"
              icon={<FileCheck className="h-5 w-5 text-rose-500" />}
              description="Average turnaround: 6h"
            />
          </div>

          {/* Main Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Managed Courses */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900">Your Courses</h2>
                <Button variant="ghost" size="sm">
                  Manage Catalog <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </div>

              <div className="space-y-4">
                {teacherCourses.map((c) => (
                  <Card key={c.id} className="hover:border-indigo-300">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2">
                          <Badge variant={c.status === "Published" ? "success" : "warning"}>
                            {c.status}
                          </Badge>
                          {c.pendingSubmissions > 0 && (
                            <Badge variant="danger">
                              {c.pendingSubmissions} to grade
                            </Badge>
                          )}
                        </div>
                        <h3 className="font-semibold text-slate-900 leading-snug">
                          {c.title}
                        </h3>
                        <div className="flex items-center gap-4 text-xs text-slate-500 font-medium pt-1">
                          <span>{c.studentsCount} Students</span>
                          <span>•</span>
                          <span>{c.revenue} Generated</span>
                          {c.rating > 0 && (
                            <>
                              <span>•</span>
                              <span className="text-amber-600 font-semibold">{c.rating} ★</span>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <Button variant="outline" size="sm">
                          Edit Curriculum
                        </Button>
                        <Button size="sm">
                          Analytics
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Quick Grading Action Queue */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900">Pending Grading</h2>
                <Badge variant="danger">8 Pending</Badge>
              </div>

              <Card className="space-y-4">
                {pendingGradingQueue.map((sub, i) => (
                  <div
                    key={sub.id}
                    className={`space-y-2 ${i > 0 ? "pt-4 border-t border-slate-100" : ""}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <Avatar name={sub.studentName} src={sub.avatar} size="sm" />
                        <div>
                          <p className="text-xs font-bold text-slate-900">{sub.studentName}</p>
                          <p className="text-[11px] text-slate-400">{sub.submittedTime}</p>
                        </div>
                      </div>
                      <Button size="sm" variant="subtle" className="text-xs h-7 px-2.5">
                        Grade
                      </Button>
                    </div>
                    <p className="text-xs font-medium text-slate-700">{sub.assignment}</p>
                    <p className="text-[11px] text-slate-400 truncate">{sub.course}</p>
                  </div>
                ))}

                <Button variant="outline" className="w-full mt-2 text-xs">
                  Open All in Grading Queue
                </Button>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
