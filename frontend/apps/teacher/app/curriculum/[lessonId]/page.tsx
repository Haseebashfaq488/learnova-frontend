"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  AppHeader,
  Sidebar,
  Button,
  Badge,
  teacherNavBranches,
  getLessonDetail,
  mockQuestionBankItems,
} from "@learnova/ui";
import {
  LessonDetailData,
  LessonResource,
  QuestionBankItem,
  QuestionType,
} from "@learnova/types";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  FileText,
  Video,
  FlaskConical,
  HelpCircle,
  Sparkles,
  Plus,
  Trash2,
  Edit3,
  Download,
  Eye,
  Send,
  Save,
  Clock,
  Layers,
  Target,
  Users,
  AlertCircle,
  FileSpreadsheet,
  Check,
  ChevronRight,
  ExternalLink,
  Upload,
  Link2,
  X,
  Sliders,
  ShieldCheck,
} from "lucide-react";

export default function TeacherLessonDetailPage() {
  const params = useParams();
  const lessonId = (params?.lessonId as string) || "les-1-1";

  const [lessonData, setLessonData] = useState<LessonDetailData>(() => getLessonDetail(lessonId));
  const [activeTab, setActiveTab] = useState<"content" | "resources" | "assessment" | "analytics">("content");
  const [notification, setNotification] = useState<string | null>(null);

  // New Resource Modal State
  const [isResourceModalOpen, setIsResourceModalOpen] = useState(false);
  const [newResource, setNewResource] = useState<Partial<LessonResource>>({
    title: "",
    type: "pdf",
    url: "#",
    size: "2.4 MB",
    description: "",
  });

  // Assessment Question Builder State
  const [isQuestionBankModalOpen, setIsQuestionBankModalOpen] = useState(false);
  const [attachedQuestions, setAttachedQuestions] = useState<QuestionBankItem[]>(() => {
    return mockQuestionBankItems.slice(0, 2);
  });

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleSaveLesson = () => {
    showNotification("Lesson notes, resources, and assessments saved successfully!");
  };

  const handlePublishToggle = () => {
    setLessonData((prev) => ({ ...prev, isPublished: !prev.isPublished }));
    showNotification(
      lessonData.isPublished
        ? "Lesson moved to Draft status."
        : "Lesson published live to enrolled cohorts!"
    );
  };

  const handleAddResource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newResource.title) return;

    const resource: LessonResource = {
      id: `res-${Date.now()}`,
      title: newResource.title,
      type: newResource.type as any,
      url: newResource.url || "#",
      size: newResource.size || "1.5 MB",
      uploadedAt: "Just now",
      description: newResource.description || "Uploaded curriculum resource asset.",
    };

    setLessonData((prev) => ({
      ...prev,
      resources: [...prev.resources, resource],
    }));

    setIsResourceModalOpen(false);
    setNewResource({ title: "", type: "pdf", url: "#", size: "2.4 MB", description: "" });
    showNotification(`Added resource "${resource.title}"!`);
  };

  const handleDeleteResource = (resId: string) => {
    setLessonData((prev) => ({
      ...prev,
      resources: prev.resources.filter((r) => r.id !== resId),
    }));
    showNotification("Resource removed from lesson.");
  };

  const handleAttachQuestion = (question: QuestionBankItem) => {
    if (attachedQuestions.some((q) => q.id === question.id)) {
      showNotification("Question already attached to assessment.");
      return;
    }

    setAttachedQuestions((prev) => [...prev, question]);
    showNotification(`Attached "${question.topic}" question to lesson assessment.`);
  };

  const handleRemoveQuestion = (questionId: string) => {
    setAttachedQuestions((prev) => prev.filter((q) => q.id !== questionId));
    showNotification("Question removed from assessment.");
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-5 w-5 text-sky-500" />;
      case "simulation":
        return <FlaskConical className="h-5 w-5 text-emerald-500" />;
      case "worksheet":
        return <FileSpreadsheet className="h-5 w-5 text-purple-500" />;
      default:
        return <FileText className="h-5 w-5 text-indigo-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <AppHeader
        portalName="Teacher Studio"
        userName="Dr. Sarah Mitchell"
        userRole="Lead Faculty Instructor"
        avatarUrl="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80"
        notificationCount={4}
        cohortTag="Fall 2025 • AP Physics & STEM"
      />

      <div className="flex flex-1">
        <Sidebar
          branches={teacherNavBranches}
          currentPath="/curriculum"
          footerContent={
            <div className="rounded-xl bg-slate-900 p-3.5 text-white space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-sky-400">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Lesson Copilot</span>
              </div>
              <p className="text-xs text-slate-300">
                Generate student problem sets, worksheets & simulation links.
              </p>
              <Link href={`/questions?unit=${lessonData.unitId}&topic=${encodeURIComponent(lessonData.title)}`}>
                <Button size="sm" className="w-full bg-[#00A8E8] hover:bg-sky-400 text-[#0B2B53] font-bold text-xs">
                  Generate AI Questions →
                </Button>
              </Link>
            </div>
          }
        />

        <main className="flex-1 p-6 md:p-8 space-y-6 max-w-7xl">
          {/* Notification Alert Banner */}
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

          {/* Breadcrumbs & Navigation Bar */}
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/curriculum"
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#0B2B53] transition-colors bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Curriculum Builder
            </Link>

            <div className="flex items-center gap-2">
              <Link href="http://localhost:3000/courses/ap-physics-1/study" target="_blank">
                <Button variant="outline" size="sm" className="text-xs font-semibold text-slate-700 bg-white border-slate-200">
                  <Eye className="h-3.5 w-3.5 mr-1" /> Student Preview
                </Button>
              </Link>
              <Button
                onClick={handlePublishToggle}
                size="sm"
                className={`text-xs font-bold px-4 ${
                  lessonData.isPublished
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                    : "bg-slate-800 hover:bg-slate-900 text-white"
                }`}
              >
                {lessonData.isPublished ? "Published (Live)" : "Draft Mode"}
              </Button>
            </div>
          </div>

          {/* Top Lesson Header Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-sky-700 bg-sky-100 px-2.5 py-0.5 rounded-full">
                    {lessonData.courseCode}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    {lessonData.unitTitle}
                  </span>
                  <span className="text-xs font-medium text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded border border-purple-200">
                    {lessonData.type}
                  </span>
                </div>

                <h1 className="text-2xl font-black text-[#0B2B53] tracking-tight">
                  {lessonData.title}
                </h1>

                <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-slate-400" />
                    Est. Duration: {lessonData.duration}
                  </span>
                  <span>•</span>
                  <span>{lessonData.resources.length} Resource Attachments</span>
                  <span>•</span>
                  <span className="text-emerald-600 font-bold">
                    {attachedQuestions.length} Assessment Questions Attached
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 self-start md:self-auto">
                <Link href={`/questions?unit=${lessonData.unitId}&topic=${encodeURIComponent(lessonData.title)}`}>
                  <Button className="bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 font-bold text-xs px-3.5 py-2 rounded-xl shadow-sm flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4 text-purple-600" /> AI Question Studio
                  </Button>
                </Link>
                <Button
                  onClick={handleSaveLesson}
                  className="bg-[#00A8E8] hover:bg-sky-400 text-[#0B2B53] font-bold text-xs px-4 py-2 rounded-xl shadow-md flex items-center gap-1.5"
                >
                  <Save className="h-4 w-4" /> Save Lesson
                </Button>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-px">
            <button
              onClick={() => setActiveTab("content")}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
                activeTab === "content"
                  ? "border-[#00A8E8] text-[#0B2B53]"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              <FileText className="h-4 w-4 text-sky-500" />
              Lesson Content & Lecture Notes
            </button>

            <button
              onClick={() => setActiveTab("resources")}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
                activeTab === "resources"
                  ? "border-[#00A8E8] text-[#0B2B53]"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              <Upload className="h-4 w-4 text-emerald-500" />
              Resources & Attachments ({lessonData.resources.length})
            </button>

            <button
              onClick={() => setActiveTab("assessment")}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
                activeTab === "assessment"
                  ? "border-[#00A8E8] text-[#0B2B53]"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              <Target className="h-4 w-4 text-purple-500" />
              Lesson Assessments & Rubrics ({attachedQuestions.length})
            </button>

            <button
              onClick={() => setActiveTab("analytics")}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
                activeTab === "analytics"
                  ? "border-[#00A8E8] text-[#0B2B53]"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              <Users className="h-4 w-4 text-amber-500" />
              Cohort Performance & Mastery
            </button>
          </div>

          {/* TAB 1: LESSON CONTENT & LECTURE NOTES */}
          {activeTab === "content" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-300">
              {/* Left 8 Cols: Lecture Notes Editor & Objectives */}
              <div className="lg:col-span-8 space-y-6">
                {/* Learning Objectives Box */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Target className="h-4 w-4 text-sky-600" />
                    Core Pedagogical Learning Objectives
                  </h3>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {lessonData.learningObjectives.map((obj, i) => (
                      <li key={i} className="flex items-start gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <span className="flex h-5 w-5 items-center justify-center rounded-md bg-sky-100 text-sky-700 font-bold text-[10px] shrink-0">
                          {i + 1}
                        </span>
                        <span className="leading-relaxed">{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Markdown Lecture Notes Editor */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <FileText className="h-4 w-4 text-indigo-600" />
                      Lecture Notes & Theory (Markdown + LaTeX)
                    </h3>
                    <span className="text-[11px] font-mono text-slate-400">KaTeX Math Enabled</span>
                  </div>

                  <textarea
                    rows={12}
                    value={lessonData.lectureNotesMarkdown}
                    onChange={(e) =>
                      setLessonData({ ...lessonData, lectureNotesMarkdown: e.target.value })
                    }
                    className="w-full text-xs font-mono rounded-xl border border-slate-200 p-4 text-slate-900 focus:ring-2 focus:ring-sky-500/20 leading-relaxed"
                  />
                </div>
              </div>

              {/* Right 4 Cols: Video & Sandbox Simulator Links */}
              <div className="lg:col-span-4 space-y-5">
                {/* Video Lecture URL Box */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Video className="h-4 w-4 text-sky-500" />
                    Video Lecture Asset
                  </h3>
                  <p className="text-xs text-slate-500">
                    Embed video stream for student asynchronous viewing.
                  </p>
                  <input
                    type="text"
                    value={lessonData.videoUrl || ""}
                    onChange={(e) => setLessonData({ ...lessonData, videoUrl: e.target.value })}
                    placeholder="https://youtube.com/watch?v=..."
                    className="w-full text-xs rounded-xl border border-slate-200 p-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                  />
                  <div className="aspect-video bg-slate-900 rounded-xl flex items-center justify-center text-white text-xs font-semibold overflow-hidden">
                    <div className="text-center p-4">
                      <Video className="h-8 w-8 text-sky-400 mx-auto mb-1 opacity-80" />
                      <span>Video Stream Ready for Streaming</span>
                    </div>
                  </div>
                </div>

                {/* Simulator Lab Integration */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <FlaskConical className="h-4 w-4 text-emerald-500" />
                    Interactive Simulator Lab
                  </h3>
                  <p className="text-xs text-slate-500">
                    Attach interactive canvas simulation sandbox to this lesson.
                  </p>
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 flex items-center justify-between">
                    <div>
                      <p className="font-bold">Incline Plane Friction Sandbox</p>
                      <p className="text-[11px] text-emerald-700">Calculates FN, fk, and net acceleration.</p>
                    </div>
                    <span className="text-[10px] font-extrabold bg-emerald-600 text-white px-2 py-0.5 rounded-full">
                      Attached
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: RESOURCES & ATTACHMENTS */}
          {activeTab === "resources" && (
            <div className="space-y-5 animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Upload className="h-4 w-4 text-emerald-600" />
                    Lesson Resources & Student Handouts
                  </h3>
                  <p className="text-xs text-slate-500">
                    Upload lecture slide decks, lab worksheets, formula cheat sheets, and simulation links.
                  </p>
                </div>

                <Button
                  onClick={() => setIsResourceModalOpen(true)}
                  className="bg-[#00A8E8] hover:bg-sky-400 text-[#0B2B53] font-bold text-xs px-4 py-2 rounded-xl shadow-md flex items-center gap-1.5 self-start sm:self-auto"
                >
                  <Plus className="h-4 w-4" /> Add Resource Attachment
                </Button>
              </div>

              {/* Resource Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {lessonData.resources.map((res) => (
                  <div
                    key={res.id}
                    className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:border-sky-300 hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 shrink-0">
                          {getResourceIcon(res.type)}
                        </div>

                        <button
                          onClick={() => handleDeleteResource(res.id)}
                          className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors"
                          title="Delete Resource"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                          {res.type}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900 mt-1.5 line-clamp-1">
                          {res.title}
                        </h4>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                          {res.description}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <span>{res.size || "Online Link"} • {res.uploadedAt}</span>
                      <Button size="sm" variant="ghost" className="h-7 text-xs font-bold text-[#00A8E8] hover:bg-sky-50 px-2">
                        <Download className="h-3.5 w-3.5 mr-1" /> Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: LESSON ASSESSMENTS & AI QUESTIONS */}
          {activeTab === "assessment" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              {/* Assessment Config Header */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded-full">
                      Lesson Assessment Rubric
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mt-1">
                      {lessonData.assessment?.title || "Concept Diagnostic Check"}
                    </h3>
                    <p className="text-xs text-slate-500">
                      Students must complete this assessment to earn mastery completion for {lessonData.title}.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <Button
                      onClick={() => setIsQuestionBankModalOpen(true)}
                      variant="outline"
                      className="text-xs font-bold text-slate-700 border-slate-200 bg-slate-50 hover:bg-slate-100"
                    >
                      <Plus className="h-3.5 w-3.5 mr-1" /> Add from Question Bank
                    </Button>
                    <Link href={`/questions?unit=${lessonData.unitId}&topic=${encodeURIComponent(lessonData.title)}`}>
                      <Button className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-md flex items-center gap-1.5">
                        <Sparkles className="h-4 w-4" /> Prompt AI for Questions
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Rubric Settings Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-100 text-center">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="text-[10px] uppercase font-bold text-slate-400">Total Points</div>
                    <div className="text-base font-black text-slate-900">{lessonData.assessment?.totalPoints || 30} pts</div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="text-[10px] uppercase font-bold text-slate-400">XP Bounty</div>
                    <div className="text-base font-black text-amber-600">+{lessonData.assessment?.xpBounty || 100} XP</div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="text-[10px] uppercase font-bold text-slate-400">Time Limit</div>
                    <div className="text-base font-black text-sky-700">{lessonData.assessment?.timeLimitMinutes || 20} mins</div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="text-[10px] uppercase font-bold text-slate-400">Pass Threshold</div>
                    <div className="text-base font-black text-emerald-600">{lessonData.assessment?.passingScorePercent || 80}%</div>
                  </div>
                </div>
              </div>

              {/* Attached Questions List */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-slate-900 flex items-center justify-between">
                  <span>Attached Questions ({attachedQuestions.length})</span>
                  <span className="text-xs font-normal text-slate-500">Auto-graded on submission</span>
                </h4>

                {attachedQuestions.map((q, idx) => (
                  <div
                    key={q.id}
                    className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:border-purple-300 transition-all space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-black text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
                          Question {idx + 1}
                        </span>
                        <span className="text-xs font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded">
                          {q.topic}
                        </span>
                        <span className="text-[11px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                          {q.bloomsLevel}
                        </span>
                        <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                          {q.difficulty}
                        </span>
                      </div>

                      <button
                        onClick={() => handleRemoveQuestion(q.id)}
                        className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors"
                        title="Remove Question"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <p className="text-sm font-semibold text-slate-900">
                      {q.prompt}
                    </p>

                    {q.latexFormula && (
                      <div className="bg-slate-900 text-sky-300 font-mono text-xs px-3 py-1.5 rounded-lg inline-block">
                        {q.latexFormula}
                      </div>
                    )}

                    {q.options && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                        {q.options.map((opt) => (
                          <div
                            key={opt.id}
                            className={`p-2.5 rounded-xl border text-xs flex items-center gap-2 ${
                              opt.isCorrect
                                ? "bg-emerald-50 border-emerald-300 text-emerald-950 font-bold"
                                : "bg-slate-50 border-slate-200 text-slate-700"
                            }`}
                          >
                            <span className="font-bold">{opt.label}.</span>
                            <span>{opt.text}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: COHORT PERFORMANCE & MASTERY */}
          {activeTab === "analytics" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Completion Rate</div>
                  <div className="text-2xl font-black text-emerald-600 mt-1">
                    {lessonData.studentStats?.completionRate || 92}%
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">28 of 32 Students</div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Average Score</div>
                  <div className="text-2xl font-black text-sky-700 mt-1">
                    {lessonData.studentStats?.averageScore || 85}%
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">On First Attempt</div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Submissions</div>
                  <div className="text-2xl font-black text-purple-700 mt-1">
                    {lessonData.studentStats?.totalSubmissions || 30}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Logged & Graded</div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Interventions</div>
                  <div className="text-2xl font-black text-rose-600 mt-1">
                    {lessonData.studentStats?.interventionCount || 2}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Need Socratic Review</div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <h3 className="text-base font-bold text-slate-900 flex items-center justify-between">
                  <span>Student Progress Roster for this Lesson</span>
                  <Link href="/mastery" className="text-xs font-bold text-[#00A8E8] hover:underline flex items-center gap-1">
                    View Full Mastery Grid <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </h3>
                <p className="text-xs text-slate-500">
                  Individual mastery status and assessment checkpoint attempts across enrolled Grade 10 AP Physics students.
                </p>
              </div>
            </div>
          )}

          {/* Modal: Add Resource Attachment */}
          {isResourceModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
              <div
                className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                    <Upload className="h-5 w-5 text-emerald-600" />
                    Add Resource Attachment
                  </h3>
                  <button
                    onClick={() => setIsResourceModalOpen(false)}
                    className="text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <form onSubmit={handleAddResource} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Resource Title</label>
                    <input
                      type="text"
                      value={newResource.title}
                      onChange={(e) => setNewResource({ ...newResource, title: e.target.value })}
                      placeholder="e.g. Free Body Diagram Formula Handout"
                      className="w-full text-xs rounded-xl border border-slate-200 p-2.5 text-slate-900 focus:ring-2 focus:ring-sky-500/20"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Resource Type</label>
                      <select
                        value={newResource.type}
                        onChange={(e) => setNewResource({ ...newResource, type: e.target.value as any })}
                        className="w-full text-xs font-medium rounded-xl border border-slate-200 p-2.5 text-slate-900 focus:ring-2 focus:ring-sky-500/20"
                      >
                        <option value="pdf">PDF Slide / Handout</option>
                        <option value="simulation">Interactive Simulator</option>
                        <option value="worksheet">Lab Worksheet</option>
                        <option value="video">Video Recording</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">File Size / Label</label>
                      <input
                        type="text"
                        value={newResource.size}
                        onChange={(e) => setNewResource({ ...newResource, size: e.target.value })}
                        placeholder="e.g. 2.4 MB"
                        className="w-full text-xs rounded-xl border border-slate-200 p-2.5 text-slate-900 focus:ring-2 focus:ring-sky-500/20"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Description</label>
                    <textarea
                      rows={2}
                      value={newResource.description}
                      onChange={(e) => setNewResource({ ...newResource, description: e.target.value })}
                      placeholder="Brief description for students..."
                      className="w-full text-xs rounded-xl border border-slate-200 p-2.5 text-slate-900 focus:ring-2 focus:ring-sky-500/20"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
                    <Button
                      variant="outline"
                      type="button"
                      onClick={() => setIsResourceModalOpen(false)}
                      className="text-xs font-semibold text-slate-700 border-slate-200"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="bg-[#00A8E8] hover:bg-sky-400 text-[#0B2B53] font-bold text-xs px-5 py-2 rounded-xl shadow-md"
                    >
                      Upload & Attach
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Modal: Add from Question Bank */}
          {isQuestionBankModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
              <div
                className="relative w-full max-w-2xl bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-purple-600" />
                    Select from Question Bank Repository
                  </h3>
                  <button
                    onClick={() => setIsQuestionBankModalOpen(false)}
                    className="text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="max-h-96 overflow-y-auto space-y-3 divide-y divide-slate-100">
                  {mockQuestionBankItems.map((qbItem) => {
                    const isAttached = attachedQuestions.some((q) => q.id === qbItem.id);

                    return (
                      <div key={qbItem.id} className="pt-3 flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded">
                              {qbItem.topic}
                            </span>
                            <span className="text-[10px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                              {qbItem.bloomsLevel}
                            </span>
                            <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                              {qbItem.difficulty}
                            </span>
                          </div>
                          <p className="text-xs font-semibold text-slate-900 leading-relaxed">
                            {qbItem.prompt}
                          </p>
                        </div>

                        <Button
                          size="sm"
                          disabled={isAttached}
                          onClick={() => handleAttachQuestion(qbItem)}
                          className={`text-xs font-bold shrink-0 ${
                            isAttached
                              ? "bg-slate-100 text-slate-400"
                              : "bg-purple-600 hover:bg-purple-700 text-white"
                          }`}
                        >
                          {isAttached ? "Attached" : "+ Attach"}
                        </Button>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-end pt-2 border-t border-slate-100">
                  <Button
                    onClick={() => setIsQuestionBankModalOpen(false)}
                    className="bg-[#0B2B53] hover:bg-slate-900 text-white font-bold text-xs"
                  >
                    Done Attaching
                  </Button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
