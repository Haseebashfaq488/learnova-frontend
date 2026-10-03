"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  AppHeader,
  Sidebar,
  Avatar,
  Badge,
  Button,
  mockMasteryCohort,
} from "@learnova/ui";
import {
  BarChart3,
  BookOpen,
  FileCheck,
  Users,
  MessageSquare,
  Search,
  Filter,
  Download,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";

export default function StudentMasteryGridPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "struggling" | "learning" | "mastered">("all");
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);

  const cohort = mockMasteryCohort;

  const navItems = [
    { label: "Faculty Dashboard", href: "/", icon: <BarChart3 className="h-4 w-4" /> },
    { label: "Curriculum Builder", href: "/curriculum", icon: <BookOpen className="h-4 w-4" />, badge: "4 Units" },
    { label: "Student Mastery Grid", href: "/mastery", icon: <Users className="h-4 w-4" />, active: true, badge: "3 Alerts" },
    { label: "Submissions & Grading", href: "/#grading", icon: <FileCheck className="h-4 w-4" />, badge: 8 },
    { label: "Discussions", href: "/#discussions", icon: <MessageSquare className="h-4 w-4" /> },
  ];

  const filteredStudents = useMemo(() => {
    return cohort.students.filter((student) => {
      const matchesSearch =
        student.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.studentId.toLowerCase().includes(searchTerm.toLowerCase());

      if (!matchesSearch) return false;

      if (statusFilter === "all") return true;
      if (statusFilter === "struggling") return student.overallMastery < 60;
      if (statusFilter === "learning") return student.overallMastery >= 60 && student.overallMastery < 85;
      if (statusFilter === "mastered") return student.overallMastery >= 85;
      return true;
    });
  }, [cohort.students, searchTerm, statusFilter]);

  const getScoreColorClass = (score: number) => {
    if (score >= 85) return "bg-emerald-50 text-emerald-700 border-emerald-200";
    if (score >= 60) return "bg-amber-50 text-amber-800 border-amber-200";
    return "bg-rose-50 text-rose-700 border-rose-200 font-bold";
  };

  const exportCSV = () => {
    const headers = ["Student Name", "Student ID", "Overall Mastery", ...cohort.pillars.map((p) => p.name)];
    const rows = cohort.students.map((s) => [
      s.studentName,
      s.studentId,
      `${s.overallMastery}%`,
      ...cohort.pillars.map((p) => `${s.pillarScores[p.id]?.score || 0}%`),
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Mastery_Matrix_${cohort.cohortName}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <AppHeader
        portalName="Teacher Studio"
        userName="Dr. Sarah Mitchell"
        userRole="Lead Faculty Instructor"
        avatarUrl="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80"
        notificationCount={5}
        cohortTag={cohort.term}
      />

      <div className="flex flex-1">
        <Sidebar
          items={navItems}
          currentPath="/mastery"
          footerContent={
            <div className="rounded-xl bg-slate-900 p-3.5 text-white space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-rose-400">
                <AlertTriangle className="h-3.5 w-3.5" />
                <span>Intervention Trigger</span>
              </div>
              <p className="text-xs text-slate-300">
                Automated remedial modules available for 3 flagged students.
              </p>
              <Button size="sm" className="w-full bg-[#00A8E8] hover:bg-sky-400 text-[#0B2B53] font-bold text-xs">
                Auto-Assign Remediation
              </Button>
            </div>
          }
        />

        <main className="flex-1 p-6 md:p-8 space-y-6 max-w-7xl">
          {/* Header & Cohort Context */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-sky-700 uppercase tracking-wider mb-1">
                <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></span>
                <span>Real-Time Performance · Live Sync Active</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B2B53] tracking-tight">
                Student Mastery Grid
              </h1>
              <p className="text-sm text-slate-600 mt-1">
                {cohort.courseName} • {cohort.cohortName} • Real-time competency matrix across all active topics
              </p>
            </div>

            {/* Filter & Export Bar */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative min-w-[240px]">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search student by name or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full h-10 pl-9 pr-3 rounded-xl border border-slate-200 bg-white text-xs text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20 shadow-sm"
                />
              </div>

              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="h-10 pl-3 pr-8 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 focus:border-sky-500 focus:outline-none shadow-sm cursor-pointer"
                >
                  <option value="all">Filter by status (All)</option>
                  <option value="struggling">Needs Help / Struggling (&lt;60%)</option>
                  <option value="learning">In Progress / Learning (60-84%)</option>
                  <option value="mastered">Excelling / Mastered (≥85%)</option>
                </select>
              </div>

              <Button
                variant="outline"
                onClick={exportCSV}
                className="h-10 bg-white border-slate-200 text-[#0B2B53] hover:bg-slate-50 text-xs font-semibold rounded-xl shadow-sm"
              >
                <Download className="h-4 w-4 mr-1.5" />
                <span>Export Matrix (CSV)</span>
              </Button>
            </div>
          </div>

          {/* Metrics Summary Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Cohort Mastery Rate</span>
                <p className="text-2xl font-extrabold text-[#0B2B53] mt-1">{cohort.cohortMasteryRate}%</p>
                <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1 mt-0.5">
                  <TrendingUp className="h-3 w-3" /> +{cohort.masteryRateWeeklyChange}% this week
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold">
                <BarChart3 className="h-5 w-5" />
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Active Learners</span>
                <p className="text-2xl font-extrabold text-[#0B2B53] mt-1">
                  {cohort.activeLearnersCount} <span className="text-xs font-normal text-slate-400">/ {cohort.totalLearnersCount}</span>
                </p>
                <span className="text-[11px] text-slate-500 font-medium mt-0.5">Cohort fully logged</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center font-bold">
                <Users className="h-5 w-5" />
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Requires Intervention</span>
                <p className="text-2xl font-extrabold text-rose-600 mt-1">{cohort.interventionCount} Students</p>
                <span className="text-[11px] text-rose-500 font-semibold mt-0.5">Topic: Friction Forces</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                <AlertTriangle className="h-5 w-5" />
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Assessments Logged</span>
                <p className="text-2xl font-extrabold text-[#0B2B53] mt-1">{cohort.loggedAssessmentsCount} Units</p>
                <span className="text-[11px] text-slate-500 font-medium mt-0.5">7 core competency pillars</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <CheckCircle2 className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* Legend Strip */}
          <div className="bg-white px-6 py-3 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4 text-xs">
            <span className="font-bold text-slate-400 uppercase tracking-wider text-[11px]">
              Legend & Thresholds
            </span>
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span className="font-bold text-[#0B2B53]">Mastered</span>
                <span className="text-slate-400">(≥ 85%)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                <span className="font-bold text-[#0B2B53]">Learning</span>
                <span className="text-slate-400">(60% – 84%)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                <span className="font-bold text-[#0B2B53]">Needs Help</span>
                <span className="text-slate-400">(&lt; 60%)</span>
              </div>
            </div>
          </div>

          {/* 2D COMPETENCY MATRIX HEATMAP TABLE */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    <th className="p-4 pl-6 min-w-[220px]">Student Profile</th>
                    <th className="p-4 text-center min-w-[100px]">Overall</th>
                    {cohort.pillars.map((pillar) => (
                      <th key={pillar.id} className="p-4 text-center min-w-[130px]">
                        <div className="flex flex-col items-center">
                          <span>{pillar.name}</span>
                          <span className="text-[9px] font-normal text-slate-400 lowercase">{pillar.category}</span>
                        </div>
                      </th>
                    ))}
                    <th className="p-4 pr-6 text-right min-w-[120px]">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {filteredStudents.map((student) => {
                    const isFlagged = student.requiresIntervention;
                    const isSelected = selectedStudentId === student.id;

                    return (
                      <tr
                        key={student.id}
                        className={`hover:bg-slate-50/80 transition-colors ${
                          isSelected ? "bg-sky-50/60" : isFlagged ? "bg-rose-50/20" : ""
                        }`}
                      >
                        {/* Student Info */}
                        <td className="p-4 pl-6">
                          <div className="flex items-center gap-3">
                            <Avatar name={student.studentName} src={student.avatarUrl} size="sm" />
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-bold text-[#0B2B53]">{student.studentName}</p>
                                {isFlagged && (
                                  <span className="w-2 h-2 rounded-full bg-rose-500" title="Flagged for intervention"></span>
                                )}
                              </div>
                              <span className="text-[10px] text-slate-400">{student.studentId} • {student.lastActive}</span>
                            </div>
                          </div>
                        </td>

                        {/* Overall Score */}
                        <td className="p-4 text-center font-bold">
                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs border ${getScoreColorClass(
                              student.overallMastery
                            )}`}
                          >
                            {student.overallMastery}%
                          </span>
                        </td>

                        {/* Pillar Scores */}
                        {cohort.pillars.map((pillar) => {
                          const pillarScore = student.pillarScores[pillar.id]?.score || 0;
                          return (
                            <td key={pillar.id} className="p-4 text-center">
                              <span
                                className={`inline-flex items-center justify-center w-12 py-1 rounded-lg text-xs font-semibold border ${getScoreColorClass(
                                  pillarScore
                                )}`}
                              >
                                {pillarScore}%
                              </span>
                            </td>
                          );
                        })}

                        {/* Action Column */}
                        <td className="p-4 pr-6 text-right">
                          {isFlagged ? (
                            <Button
                              size="sm"
                              className="h-7 text-[10px] font-bold bg-rose-600 hover:bg-rose-700 text-white rounded-lg shadow-sm"
                            >
                              Intervene
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-7 text-[10px] font-medium text-slate-600 hover:text-slate-900 rounded-lg"
                            >
                              Details
                            </Button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
