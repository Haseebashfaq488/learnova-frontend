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
  Badge,
  Button,
  Avatar,
  BranchedMenu,
} from "@learnova/ui";
import {
  LayoutDashboard,
  Users,
  BookOpenCheck,
  CreditCard,
  ShieldAlert,
  Settings,
  UserCheck,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  SlidersHorizontal,
} from "lucide-react";
import {
  Settings02Icon,
  Layers01Icon,
  PaintBoardIcon,
} from "@hugeicons/core-free-icons";

export default function AdminDashboardPage() {
  const navItems = [
    { label: "Overview", href: "/", icon: <LayoutDashboard className="h-4 w-4" />, active: true },
    { label: "User Management", href: "/users", icon: <Users className="h-4 w-4" />, badge: "14.2k" },
    { label: "Course Approvals", href: "/courses", icon: <BookOpenCheck className="h-4 w-4" />, badge: 3 },
    { label: "Billing & Payouts", href: "/finance", icon: <CreditCard className="h-4 w-4" /> },
    { label: "Security & Audits", href: "/security", icon: <ShieldAlert className="h-4 w-4" /> },
    { label: "Platform Settings", href: "/settings", icon: <Settings className="h-4 w-4" /> },
  ];

  const adminConfigBranches = [
    {
      label: "Platform Configuration",
      children: [
        { value: "rbac", label: "RBAC & Permissions", icon: Settings02Icon },
        { value: "theme", label: "Branding & Appearance", icon: PaintBoardIcon },
        { value: "integrations", label: "Webhooks & APIs", icon: Layers01Icon },
      ],
    },
  ];

  const pendingCourseApprovals = [
    {
      id: "course-app-1",
      title: "Fullstack Rust & WebAssembly Microservices",
      instructor: "Dr. Marcus Vance",
      category: "Systems Engineering",
      submittedDate: "Oct 2, 2026",
      modulesCount: 8,
      lessonsCount: 32,
    },
    {
      id: "course-app-2",
      title: "Generative AI Agents with LangChain & Llama",
      instructor: "Elena Rostova",
      category: "Artificial Intelligence",
      submittedDate: "Oct 1, 2026",
      modulesCount: 6,
      lessonsCount: 24,
    },
  ];

  const recentUsers = [
    {
      id: "usr-1",
      name: "Marcus Vance",
      email: "marcus@systems.io",
      role: "Teacher",
      status: "Verified",
      joined: "Yesterday",
    },
    {
      id: "usr-2",
      name: "Amara Okonjo",
      email: "amara.o@edu.org",
      role: "Student",
      status: "Active",
      joined: "2 days ago",
    },
    {
      id: "usr-3",
      name: "Lucas Silva",
      email: "lucas@braziltech.br",
      role: "Teacher",
      status: "Pending Verification",
      joined: "3 days ago",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <AppHeader
        portalName="Admin Center"
        userName="Administrator"
        userRole="Super Admin"
        notificationCount={7}
      />

      <div className="flex flex-1 items-start">
        <Sidebar items={navItems} currentPath="/">
          <div className="space-y-2">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">
              System Settings
            </p>
            <BranchedMenu
              items={adminConfigBranches}
              defaultOpen={[0]}
              defaultActive="rbac"
              width={220}
              color="#334155"
              accentColor="#4f46e5"
              lineColor="#cbd5e1"
            />
          </div>
        </Sidebar>

        <main className="flex-1 p-8 space-y-8 max-w-7xl">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Platform Governance & Analytics
              </h1>
              <p className="text-sm text-slate-500 mt-0.5">
                Real-time metrics, user role governance, course approvals, and revenue stream.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <SlidersHorizontal className="h-4 w-4" /> Export Report
              </Button>
              <Button size="sm">
                <UserCheck className="h-4 w-4" /> Invite Admin / Staff
              </Button>
            </div>
          </div>

          {/* Metric Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            <StatCard
              title="Total Active Learners"
              value="14,280"
              change="+22.4%"
              icon={<Users className="h-5 w-5 text-indigo-500" />}
              description="+1,200 new this month"
            />
            <StatCard
              title="Platform GMV (This Month)"
              value="$148,500"
              change="+18.1%"
              icon={<CreditCard className="h-5 w-5 text-emerald-500" />}
              description="Platform fee: $22,275 (15%)"
            />
            <StatCard
              title="Catalog Verification Queue"
              value="3 Courses"
              change="Action needed"
              isPositive={false}
              icon={<BookOpenCheck className="h-5 w-5 text-amber-500" />}
              description="Average review SLA: 24h"
            />
            <StatCard
              title="System Health & API"
              value="99.98%"
              icon={<TrendingUp className="h-5 w-5 text-cyan-500" />}
              description="Latency: 38ms (Healthy)"
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Course Approvals */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900">
                  Course Submissions Pending Review
                </h2>
                <Badge variant="warning">3 Awaiting Review</Badge>
              </div>

              <div className="space-y-4">
                {pendingCourseApprovals.map((course) => (
                  <Card key={course.id} className="hover:border-indigo-300">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2">
                          <Badge variant="default">{course.category}</Badge>
                          <span className="text-xs text-slate-400">
                            Submitted on {course.submittedDate}
                          </span>
                        </div>
                        <h3 className="font-semibold text-slate-900 leading-snug">
                          {course.title}
                        </h3>
                        <p className="text-xs text-slate-500">
                          Instructor: <span className="font-medium text-slate-700">{course.instructor}</span> • {course.modulesCount} Modules, {course.lessonsCount} Lessons
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <Button variant="outline" size="sm">
                          Inspect Content
                        </Button>
                        <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                          Approve Course
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Recent Registrations & RBAC */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900">Recent Users</h2>
                <Button variant="ghost" size="sm">
                  View All <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </div>

              <Card className="space-y-4">
                {recentUsers.map((u, i) => (
                  <div
                    key={u.id}
                    className={`space-y-1.5 ${i > 0 ? "pt-3.5 border-t border-slate-100" : ""}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <Avatar name={u.name} size="sm" />
                        <div>
                          <p className="text-xs font-bold text-slate-900">{u.name}</p>
                          <p className="text-[11px] text-slate-400">{u.email}</p>
                        </div>
                      </div>
                      <Badge
                        variant={
                          u.role === "Teacher"
                            ? "warning"
                            : u.role === "Admin"
                            ? "danger"
                            : "default"
                        }
                      >
                        {u.role}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center text-[11px] text-slate-400 pt-1">
                      <span>Status: <span className="font-semibold text-slate-700">{u.status}</span></span>
                      <span>{u.joined}</span>
                    </div>
                  </div>
                ))}

                <Button variant="outline" className="w-full mt-2 text-xs">
                  Manage Access & Permissions
                </Button>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
