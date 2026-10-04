"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  AppHeader,
  Sidebar,
  Button,
  Badge,
  mockPhysicsCurriculum,
  teacherNavBranches,
} from "@learnova/ui";
import { CurriculumTopicLesson, CurriculumTopic } from "@learnova/types";
import {
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
  X,
  ExternalLink,
  Edit3,
  BookOpen,
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
  const [notification, setNotification] = useState<string | null>(null);

  // Add Lesson Modal State
  const [isAddLessonModalOpen, setIsAddLessonModalOpen] = useState(false);
  const [targetUnitId, setTargetUnitId] = useState<string | null>(null);
  const [newLessonForm, setNewLessonForm] = useState({
    title: "",
    duration: "45m",
    type: "Video Lecture" as CurriculumTopicLesson["type"],
    hasAssessment: true,
    isPublished: true,
  });

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  const toggleUnit = (unitId: string) => {
    setExpandedUnits((prev) => ({
      ...prev,
      [unitId]: !prev[unitId],
    }));
  };

  const openAddLessonModal = (unitId: string) => {
    setTargetUnitId(unitId);
    setNewLessonForm({
      title: "",
      duration: "45m",
      type: "Video Lecture",
      hasAssessment: true,
      isPublished: true,
    });
    setIsAddLessonModalOpen(true);
  };

  const handleCreateLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetUnitId || !newLessonForm.title) return;

    const unitIndex = curriculum.topics.findIndex((t) => t.id === targetUnitId);
    if (unitIndex === -1) return;

    const unit = curriculum.topics[unitIndex];
    const newLessonId = `les-${unit.unitNumber}-${unit.lessons.length + 1}`;

    const newLesson: CurriculumTopicLesson = {
      id: newLessonId,
      title: newLessonForm.title,
      duration: newLessonForm.duration || "45m",
      type: newLessonForm.type,
      hasAssessment: newLessonForm.hasAssessment,
      isPublished: newLessonForm.isPublished,
    };

    const updatedTopics = [...curriculum.topics];
    updatedTopics[unitIndex] = {
      ...unit,
      lessonsCount: unit.lessonsCount + 1,
      lessons: [...unit.lessons, newLesson],
    };

    setCurriculum((prev) => ({
      ...prev,
      topics: updatedTopics,
    }));

    setIsAddLessonModalOpen(false);
    showNotification(`✨ Created "${newLesson.title}" in ${unit.title}!`);
  };

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
          branches={teacherNavBranches}
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
                onClick={() => {
                  setIsPublished(true);
                  showNotification("All curriculum changes published live to students!");
                }}
                className="w-full bg-[#00A8E8] hover:bg-sky-400 text-[#0B2B53] font-bold text-xs"
              >
                {isPublished ? "Published Live!" : "Publish to Cohort"}
              </Button>
            </div>
          }
        />

        <main className="flex-1 p-6 md:p-8 space-y-6 max-w-7xl">
          {/* Notification Alert */}
          {notification && (
            <div className="flex items-center justify-between gap-3 p-4 rounded-xl bg-emerald-600 text-white shadow-lg animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <CheckCircle2 className="h-5 w-5" />
                <span>{notification}</span>
              </div>
              <button
                onClick={() => setNotification(null)}
                className="text-emerald-100 hover:text-white text-xs font-bold px-2 py-1 rounded"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Top Context & Actions Header Bar */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                <span>Course Architecture · {curriculum.term}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B2B53] tracking-tight">
                Curriculum Builder & Course Studio
              </h1>
              <div className="flex items-center gap-3 text-xs text-slate-500 flex-wrap pt-0.5">
                <span className="font-bold text-[#0B2B53]">{curriculum.courseName}</span>
                <span>•</span>
                <span>{curriculum.topics.length} Units</span>
                <span>•</span>
                <span>
                  {curriculum.topics.reduce((acc, t) => acc + t.lessons.length, 0)} Total Lessons
                </span>
                <span>•</span>
                <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Autosaved {curriculum.lastAutosaved}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 self-start md:self-auto">
              <Link href="http://localhost:3000/courses/ap-physics-1/learning-path" target="_blank">
                <Button
                  variant="outline"
                  className="border-slate-200 bg-slate-50 hover:bg-slate-100 text-[#0B2B53] text-xs font-semibold rounded-xl"
                >
                  <Eye className="h-4 w-4 mr-1.5" />
                  <span>Preview Student View</span>
                </Button>
              </Link>
              <Link href="/questions">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4" />
                  <span>AI Question Studio</span>
                </Button>
              </Link>
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
                  0{curriculum.topics.length} <span className="text-sm font-normal text-slate-400">/ 04</span>
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
                  {curriculum.publishedPercent}% <span className="text-xs font-normal text-slate-400">Live</span>
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

                    <div className="flex items-center gap-3 text-xs text-slate-500 shrink-0">
                      <span className="hidden md:inline-block font-semibold">
                        {unit.lessons.length} Lessons • {unit.totalHours} hrs
                      </span>
                      <Link
                        href={`/questions?unit=${unit.id}&topic=${encodeURIComponent(unit.title)}`}
                        onClick={(e) => e.stopPropagation()}
                        className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold text-xs border border-purple-200 shadow-sm transition-colors"
                        title="Generate questions for this unit with AI"
                      >
                        <Sparkles className="h-3.5 w-3.5 text-purple-600" />
                        <span>AI Questions</span>
                      </Link>
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
                            className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-sm flex items-center justify-between gap-4 hover:border-sky-300 hover:shadow-md transition-all group"
                          >
                            {/* Clickable Lesson Row */}
                            <Link
                              href={`/curriculum/${lesson.id}`}
                              className="flex items-center gap-3 min-w-0 flex-1"
                            >
                              <GripVertical className="h-4 w-4 text-slate-300 cursor-grab shrink-0" />
                              <div className="p-2 rounded-lg bg-slate-50 shrink-0 group-hover:bg-sky-50 transition-colors">
                                {getLessonIcon(lesson.type)}
                              </div>
                              <div className="min-w-0">
                                <p className="text-xs font-bold text-[#0B2B53] truncate group-hover:text-sky-600 transition-colors">
                                  {lesson.title}
                                </p>
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
                            </Link>

                            <div className="flex items-center gap-2 shrink-0">
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                  lesson.isPublished
                                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                    : "bg-slate-100 text-slate-600"
                                }`}
                              >
                                {lesson.isPublished ? "Live" : "Draft"}
                              </span>
                              <Link href={`/questions?unit=${unit.id}&topic=${encodeURIComponent(lesson.title)}`}>
                                <Button size="sm" variant="outline" className="h-7 text-[11px] font-semibold text-purple-700 border-purple-200 hover:bg-purple-50">
                                  <Sparkles className="h-3 w-3 mr-1" /> Question AI
                                </Button>
                              </Link>
                              <Link href={`/curriculum/${lesson.id}`}>
                                <Button size="sm" variant="outline" className="h-7 text-[11px] font-bold text-[#00A8E8] border-sky-200 hover:bg-sky-50">
                                  <Edit3 className="h-3 w-3 mr-1" /> Studio Editor
                                </Button>
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Add Lesson Button & AI Action */}
                      <div className="pt-3 flex flex-wrap items-center gap-3">
                        <Button
                          onClick={() => openAddLessonModal(unit.id)}
                          size="sm"
                          className="bg-[#00A8E8] hover:bg-sky-400 text-[#0B2B53] font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-sm"
                        >
                          <Plus className="h-3.5 w-3.5" />
                          <span>+ Add Lesson to {unit.title.split(":")[0]}</span>
                        </Button>
                        <Link href={`/questions?unit=${unit.id}&topic=${encodeURIComponent(unit.title)}`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200 text-xs font-bold rounded-xl flex items-center gap-1.5"
                          >
                            <Sparkles className="h-3.5 w-3.5 text-purple-600" />
                            <span>Prompt AI for Unit Assessment Questions</span>
                          </Button>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Modal: Add New Lesson to Unit */}
          {isAddLessonModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
              <div
                className="relative w-full max-w-lg bg-white rounded-3xl p-6 md:p-8 shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2 text-slate-900 font-extrabold text-base">
                    <Plus className="h-5 w-5 text-sky-500" />
                    <span>Create New Lesson</span>
                  </div>
                  <button
                    onClick={() => setIsAddLessonModalOpen(false)}
                    className="text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <form onSubmit={handleCreateLesson} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Lesson Title & Topic</label>
                    <input
                      type="text"
                      value={newLessonForm.title}
                      onChange={(e) => setNewLessonForm({ ...newLessonForm, title: e.target.value })}
                      placeholder="e.g. 1.6 Quadratic Air Resistance & Terminal Velocity"
                      className="w-full text-xs rounded-xl border border-slate-200 p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Lesson Format / Type</label>
                      <select
                        value={newLessonForm.type}
                        onChange={(e) =>
                          setNewLessonForm({
                            ...newLessonForm,
                            type: e.target.value as any,
                          })
                        }
                        className="w-full text-xs font-medium rounded-xl border border-slate-200 p-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                      >
                        <option value="Video Lecture">Video Lecture</option>
                        <option value="Hands-on Lab">Hands-on Lab</option>
                        <option value="Concept Check">Concept Check</option>
                        <option value="Quiz">Quiz Assessment</option>
                        <option value="Peer Review">Peer Review</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Estimated Duration</label>
                      <input
                        type="text"
                        value={newLessonForm.duration}
                        onChange={(e) => setNewLessonForm({ ...newLessonForm, duration: e.target.value })}
                        placeholder="e.g. 45m or 1h 15m"
                        className="w-full text-xs rounded-xl border border-slate-200 p-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                      />
                    </div>
                  </div>

                  <div className="space-y-3 pt-2 border-t border-slate-100">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <div>
                        <p className="text-xs font-bold text-slate-800">Attach Assessment Checkpoint</p>
                        <p className="text-[11px] text-slate-500">Require students to pass a diagnostic quiz for completion.</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={newLessonForm.hasAssessment}
                        onChange={(e) =>
                          setNewLessonForm({ ...newLessonForm, hasAssessment: e.target.checked })
                        }
                        className="h-4 w-4 rounded text-[#00A8E8] focus:ring-sky-500"
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <div>
                        <p className="text-xs font-bold text-slate-800">Publish Immediately</p>
                        <p className="text-[11px] text-slate-500">Make this lesson live to all students in the cohort.</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={newLessonForm.isPublished}
                        onChange={(e) =>
                          setNewLessonForm({ ...newLessonForm, isPublished: e.target.checked })
                        }
                        className="h-4 w-4 rounded text-[#00A8E8] focus:ring-sky-500"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
                    <Button
                      variant="outline"
                      type="button"
                      onClick={() => setIsAddLessonModalOpen(false)}
                      className="text-xs font-semibold text-slate-700 border-slate-200"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="bg-[#00A8E8] hover:bg-sky-400 text-[#0B2B53] font-bold text-xs px-5 py-2.5 rounded-xl shadow-md"
                    >
                      Create & Add Lesson
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
