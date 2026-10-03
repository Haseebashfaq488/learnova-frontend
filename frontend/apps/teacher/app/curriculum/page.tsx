"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  AppHeader,
  Sidebar,
  Button,
  Badge,
  mockPhysicsCurriculum,
} from "@learnova/ui";
import {
  BarChart3,
  BookOpen,
  FileCheck,
  Users,
  MessageSquare,
  GripVertical,
  ChevronDown,
  ChevronUp,
  Eye,
  Rocket,
  CheckCircle2,
  Clock,
  Plus,
  Layers,
  Sparkles,
  FileText,
  Video,
  FlaskConical,
  HelpCircle,
  FolderTree,
} from "lucide-react";

export default function CurriculumBuilderPage() {
  const [curriculum, setCurriculum] = useState(mockPhysicsCurriculum);
  const [expandedUnits, setExpandedUnits] = useState<Record<string, boolean>>({
    "unit-1": true,
    "unit-2": true,
    "unit-3": false,
    "unit-4": false,
  });
  const [isPublished, setIsPublished] = useState(false);

  const toggleUnit = (unitId: string) => {
    setExpandedUnits((prev) => ({
      ...prev,
      [unitId]: !prev[unitId],
    }));
  };

  const navItems = [
    { label: "Faculty Dashboard", href: "/", icon: <BarChart3 className="h-4 w-4" /> },
    { label: "Curriculum Builder", href: "/curriculum", icon: <BookOpen className="h-4 w-4" />, active: true, badge: "4 Units" },
    { label: "Student Mastery Grid", href: "/mastery", icon: <Users className="h-4 w-4" />, badge: "3 Alerts" },
    { label: "Submissions & Grading", href: "/#grading", icon: <FileCheck className="h-4 w-4" />, badge: 8 },
    { label: "Discussions", href: "/#discussions", icon: <MessageSquare className="h-4 w-4" /> },
  ];

  const getLessonIcon = (type: string) => {
    switch (type) {
      case "Video Lecture":
        return <Video className="h-4 w-4 text-sky-500" />;
      case "Hands-on Lab":
        return <FlaskConical className="h-4 w-4 text-emerald-500" />;
      case "Quiz":
        return <HelpCircle className="h-4 w-4 text-amber-500" />;
      default:
        return <FileText className="h-4 w-4 text-indigo-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <AppHeader
        portalName="Teacher Studio"
        userName="Dr. Sarah Mitchell"
        userRole="Lead Faculty Instructor"
        avatarUrl="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80"
        notificationCount={5}
        cohortTag="Fall 2025 • Grade 10 AP Physics"
      />

      <div className="flex flex-1">
        <Sidebar
          items={navItems}
          currentPath="/curriculum"
          footerContent={
            <div className="rounded-xl bg-slate-900 p-3.5 text-white space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-sky-400">
                <FolderTree className="h-3.5 w-3.5" />
                <span>Curriculum Sync</span>
              </div>
              <p className="text-xs text-slate-300">
                All changes automatically synced to Student Portal.
              </p>
              <Button
                size="sm"
                onClick={() => setIsPublished(true)}
                className="w-full bg-[#00A8E8] hover:bg-sky-400 text-[#0B2B53] font-bold text-xs"
              >
                {isPublished ? "Published!" : "Publish to Cohort"}
              </Button>
            </div>
          }
        />

        <main className="flex-1 p-6 md:p-8 space-y-6 max-w-7xl">
          {/* Top Context & Actions Header Bar */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                <span>Course Architecture · {curriculum.term}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B2B53] tracking-tight">
                Curriculum Builder
              </h1>
              <div className="flex items-center gap-3 text-xs text-slate-500 flex-wrap pt-0.5">
                <span className="font-bold text-[#0B2B53]">{curriculum.courseName}</span>
                <span>•</span>
                <span>{curriculum.totalUnits} Units</span>
                <span>•</span>
                <span>18 Lessons</span>
                <span>•</span>
                <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Autosaved {curriculum.lastAutosaved}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 self-start md:self-auto">
              <Link href="http://localhost:3000" target="_blank">
                <Button
                  variant="outline"
                  className="border-slate-200 bg-slate-50 hover:bg-slate-100 text-[#0B2B53] text-xs font-semibold rounded-xl"
                >
                  <Eye className="h-4 w-4 mr-1.5" />
                  <span>Preview Student View</span>
                </Button>
              </Link>
              <Button
                onClick={() => setIsPublished(true)}
                className="bg-[#00A8E8] hover:bg-sky-500 text-white font-bold text-xs rounded-xl shadow-md shadow-sky-500/20"
              >
                <Rocket className="h-4 w-4 mr-1.5" />
                <span>{isPublished ? "Changes Live" : "Publish Changes"}</span>
              </Button>
            </div>
          </div>

          {/* Operational Metrics Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-[#0B2B53] flex items-center justify-center font-bold">
                <Layers className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Total Units</span>
                <p className="text-xl font-extrabold text-[#0B2B53]">
                  03 <span className="text-sm font-normal text-slate-400">/ 04</span>
                </p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Published Content</span>
                <p className="text-xl font-extrabold text-[#0B2B53]">
                  {curriculum.publishedPercent}% <span className="text-xs font-semibold text-emerald-600">+14% this wk</span>
                </p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Classroom Time</span>
                <p className="text-xl font-extrabold text-[#0B2B53]">
                  {curriculum.totalClassroomHours} <span className="text-xs font-normal text-slate-400">hrs total</span>
                </p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center font-bold">
                <FolderTree className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Structure Mode</span>
                <p className="text-xs font-bold text-[#0B2B53]">Course &gt; Unit &gt; Lesson</p>
              </div>
            </div>
          </div>

          {/* Curriculum Tree Container */}
          <div className="space-y-4">
            {curriculum.topics.map((unit) => {
              const isExpanded = !!expandedUnits[unit.id];

              return (
                <div
                  key={unit.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all duration-200"
                >
                  {/* Topic Header (Drag + Expand) */}
                  <div
                    onClick={() => toggleUnit(unit.id)}
                    className="flex items-center justify-between p-5 bg-white cursor-pointer select-none hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <button
                        type="button"
                        aria-label="Reorder unit"
                        className="cursor-grab active:cursor-grabbing text-slate-400 hover:text-slate-700 p-1"
                      >
                        <GripVertical className="h-5 w-5" />
                      </button>

                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-xl bg-[#0B2B53] text-white flex items-center justify-center font-bold text-xs shrink-0">
                          {unit.unitNumber}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h2 className="text-base font-bold text-[#0B2B53]">{unit.title}</h2>
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                                unit.publishPercent === 100
                                  ? "bg-emerald-100 text-emerald-800"
                                  : unit.publishPercent > 0
                                  ? "bg-sky-100 text-sky-800"
                                  : "bg-slate-100 text-slate-600"
                              }`}
                            >
                              {unit.publishPercent}% Published
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{unit.description}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-slate-500 shrink-0">
                      <span className="hidden sm:inline-block font-semibold">
                        {unit.lessonsCount} Lessons • {unit.totalHours} hrs
                      </span>
                      <div className="p-1 rounded-lg bg-slate-100 text-slate-600">
                        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Lessons List */}
                  {isExpanded && (
                    <div className="p-5 pt-0 space-y-2 border-t border-slate-100 bg-slate-50/50">
                      <div className="space-y-2 pt-3">
                        {unit.lessons.map((lesson) => (
                          <div
                            key={lesson.id}
                            className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-sm flex items-center justify-between gap-4 hover:border-slate-300 transition-all"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <GripVertical className="h-4 w-4 text-slate-300 cursor-grab shrink-0" />
                              <div className="p-2 rounded-lg bg-slate-50 shrink-0">
                                {getLessonIcon(lesson.type)}
                              </div>
                              <div className="min-w-0">
                                <p className="text-xs font-bold text-[#0B2B53] truncate">{lesson.title}</p>
                                <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                                  <span>{lesson.duration}</span>
                                  <span>•</span>
                                  <span className="font-medium text-slate-600">{lesson.type}</span>
                                  {lesson.hasAssessment && (
                                    <>
                                      <span>•</span>
                                      <span className="text-emerald-600 font-semibold">Assessment Attached</span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-3 shrink-0">
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                  lesson.isPublished
                                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                    : "bg-slate-100 text-slate-600"
                                }`}
                              >
                                {lesson.isPublished ? "Live" : "Draft"}
                              </span>
                              <Button size="sm" variant="outline" className="h-7 text-[11px] font-semibold">
                                Edit
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Add Lesson Button */}
                      <div className="pt-2 flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-dashed border-slate-300 hover:border-sky-500 hover:bg-sky-50/50 text-sky-700 text-xs font-semibold rounded-xl flex items-center gap-1.5"
                        >
                          <Plus className="h-3.5 w-3.5" />
                          <span>Add Lesson</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-dashed border-slate-300 hover:border-emerald-500 hover:bg-emerald-50/50 text-emerald-700 text-xs font-semibold rounded-xl flex items-center gap-1.5"
                        >
                          <Plus className="h-3.5 w-3.5" />
                          <span>Add Assessment Checkpoint</span>
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}
