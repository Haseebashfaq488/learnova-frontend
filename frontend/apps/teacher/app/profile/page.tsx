"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  AppHeader,
  Sidebar,
  Button,
  Badge,
  teacherNavBranches,
  mockFacultyBadges,
  mockFacultyImpactStats,
  mockTeacherCohorts,
  mockTeacherAIConfig,
} from "@learnova/ui";
import {
  Award,
  BookOpenCheck,
  Target,
  Users,
  Sparkles,
  Calendar,
  Clock,
  Mail,
  MapPin,
  FileText,
  Settings,
  Edit3,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  BarChart3,
  ExternalLink,
  ShieldCheck,
  GraduationCap,
  Sliders,
  Check,
} from "lucide-react";

export default function TeacherProfilePage() {
  const [activeTab, setActiveTab] = useState<"cohorts" | "honors" | "ai_settings" | "edit">("cohorts");
  const [stats, setStats] = useState(mockFacultyImpactStats);
  const [aiConfig, setAiConfig] = useState(mockTeacherAIConfig);
  const [notificationMessage, setNotificationMessage] = useState<string | null>(null);

  const [profileForm, setProfileForm] = useState({
    name: "Dr. Sarah Mitchell",
    title: "Lead Faculty Instructor & STEM Director",
    department: "Department of Physics & Mathematical Sciences",
    email: "sarah.mitchell@learnova.edu",
    qualifications: "Ph.D. Theoretical Physics (MIT), M.Sc. Applied Mathematics",
    officeLocation: "Science Hall 402 • Cambridge Campus",
    officeHours: "Mon & Wed: 3:00 PM – 5:00 PM (In-Person & Zoom #892-411)",
    bio: "Educator and researcher with 12+ years of experience teaching AP Physics, Classical Mechanics, and Computational Calculus. Passionate about inquiry-based learning, interactive simulations, and AI-augmented curriculum design.",
    teachingPhilosophy: "Fostering first-principles intuition through rigorous analytical problem-solving, interactive sandbox simulations, and individualized feedback loops.",
  });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setNotificationMessage("Faculty profile changes saved successfully!");
    setTimeout(() => setNotificationMessage(null), 3500);
  };

  const handleSaveAIConfig = (e: React.FormEvent) => {
    e.preventDefault();
    setNotificationMessage("AI Assistant pedagogical preferences updated!");
    setTimeout(() => setNotificationMessage(null), 3500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <AppHeader
        portalName="Teacher Studio"
        userName={profileForm.name}
        userRole="Lead Faculty Instructor"
        avatarUrl="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80"
        notificationCount={4}
        cohortTag="Fall 2025 • AP Physics & STEM"
      />

      <div className="flex flex-1">
        <Sidebar
          branches={teacherNavBranches}
          currentPath="/profile"
          footerContent={
            <div className="rounded-xl bg-slate-900 p-3.5 text-white space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-sky-400">
                <Sparkles className="h-3.5 w-3.5" />
                <span>AI Question Studio</span>
              </div>
              <p className="text-xs text-slate-300">
                Generate tailored exam questions with step-by-step rubrics.
              </p>
              <Link href="/questions">
                <Button
                  size="sm"
                  className="w-full bg-[#00A8E8] hover:bg-sky-400 text-[#0B2B53] font-bold text-xs"
                >
                  Open AI Studio →
                </Button>
              </Link>
            </div>
          }
        />

        <main className="flex-1 p-6 md:p-8 space-y-6 max-w-7xl">
          {/* Notification Alert */}
          {notificationMessage && (
            <div className="flex items-center justify-between gap-3 p-4 rounded-xl bg-emerald-500 text-white shadow-lg animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <CheckCircle2 className="h-5 w-5" />
                <span>{notificationMessage}</span>
              </div>
              <button
                onClick={() => setNotificationMessage(null)}
                className="text-emerald-100 hover:text-white text-xs font-bold px-2 py-1 rounded"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Teacher Profile Banner */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0B2B53] via-[#0F3563] to-[#1E293B] p-6 md:p-8 text-white shadow-xl border border-sky-900/40">
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              {/* Avatar and Faculty Bio */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <div className="relative">
                  <div className="h-24 w-24 md:h-28 md:w-28 rounded-2xl p-1 bg-gradient-to-tr from-[#00A8E8] to-[#2ECC71] shadow-2xl">
                    <img
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80"
                      alt={profileForm.name}
                      className="h-full w-full object-cover rounded-xl"
                    />
                  </div>
                  <span className="absolute -bottom-2 -right-2 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500 text-white text-[11px] font-bold shadow-md">
                    <ShieldCheck className="h-3 w-3" /> Faculty
                  </span>
                </div>

                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
                      {profileForm.name}
                    </h1>
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/20 px-2.5 py-0.5 text-xs font-bold text-amber-300 border border-amber-300/30">
                      <GraduationCap className="h-3.5 w-3.5 text-amber-400" />
                      Lead Faculty
                    </span>
                  </div>

                  <p className="text-sm text-sky-200 font-medium">
                    {profileForm.title} • <span className="text-slate-300">{profileForm.department}</span>
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-1">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-sky-400" />
                      {profileForm.officeLocation}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Mail className="h-3.5 w-3.5 text-emerald-400" />
                      {profileForm.email}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <Link href="/questions">
                  <Button className="bg-[#00A8E8] hover:bg-sky-400 text-[#0B2B53] font-bold text-xs px-4 py-2 rounded-xl shadow-md flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4" /> AI Question Studio
                  </Button>
                </Link>
                <Link href="/curriculum">
                  <Button variant="outline" className="text-white border-white/20 hover:bg-white/10 text-xs font-semibold px-4 py-2 rounded-xl">
                    <BookOpenCheck className="h-4 w-4 mr-1.5" /> Curriculum Builder
                  </Button>
                </Link>
              </div>
            </div>

            {/* Impact Metric Cards Grid */}
            <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10 text-center">
                <div className="text-[11px] font-semibold text-sky-300 uppercase tracking-wider">Learners</div>
                <div className="text-lg font-black text-white mt-0.5">{stats.totalStudentsTaught.toLocaleString()}</div>
                <div className="text-[10px] text-slate-300">Across all terms</div>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10 text-center">
                <div className="text-[11px] font-semibold text-emerald-300 uppercase tracking-wider">Avg Mastery</div>
                <div className="text-lg font-black text-white mt-0.5">{stats.averageMasteryRate}%</div>
                <div className="text-[10px] text-emerald-300">+4.2% vs target</div>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10 text-center">
                <div className="text-[11px] font-semibold text-amber-300 uppercase tracking-wider">Question Bank</div>
                <div className="text-lg font-black text-white mt-0.5">{stats.questionsCuratedCount}</div>
                <div className="text-[10px] text-slate-300">Curated & Active</div>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10 text-center">
                <div className="text-[11px] font-semibold text-purple-300 uppercase tracking-wider">Graded</div>
                <div className="text-lg font-black text-white mt-0.5">{stats.assignmentsGradedCount}</div>
                <div className="text-[10px] text-slate-300">Submissions</div>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10 text-center">
                <div className="text-[11px] font-semibold text-sky-300 uppercase tracking-wider">Office Hours</div>
                <div className="text-lg font-black text-white mt-0.5">{stats.officeHoursHeldHours} hrs</div>
                <div className="text-[10px] text-slate-300">1-on-1 & Group</div>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10 text-center">
                <div className="text-[11px] font-semibold text-yellow-300 uppercase tracking-wider">Student Rating</div>
                <div className="text-lg font-black text-white mt-0.5">{stats.studentSatisfactionRating} ★</div>
                <div className="text-[10px] text-slate-300">98% Positive</div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-px">
            <button
              onClick={() => setActiveTab("cohorts")}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
                activeTab === "cohorts"
                  ? "border-[#00A8E8] text-[#0B2B53]"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              <Users className="h-4 w-4 text-sky-500" />
              Assigned Cohorts & Classes ({mockTeacherCohorts.length})
            </button>

            <button
              onClick={() => setActiveTab("honors")}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
                activeTab === "honors"
                  ? "border-[#00A8E8] text-[#0B2B53]"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              <Award className="h-4 w-4 text-amber-500" />
              Faculty Honors & Credentials
            </button>

            <button
              onClick={() => setActiveTab("ai_settings")}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
                activeTab === "ai_settings"
                  ? "border-[#00A8E8] text-[#0B2B53]"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              <Sparkles className="h-4 w-4 text-purple-500" />
              AI Assistant & Pedagogy Presets
            </button>

            <button
              onClick={() => setActiveTab("edit")}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
                activeTab === "edit"
                  ? "border-[#00A8E8] text-[#0B2B53]"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              <Edit3 className="h-4 w-4 text-slate-500" />
              Edit Faculty Bio & Office Hours
            </button>
          </div>

          {/* TAB 1: ASSIGNED COHORTS */}
          {activeTab === "cohorts" && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Users className="h-5 w-5 text-sky-600" />
                    Active Teaching Cohorts
                  </h2>
                  <p className="text-xs text-slate-500">
                    Direct access to course curriculum plans, student mastery grids, and grading queues.
                  </p>
                </div>
                <Link href="/curriculum">
                  <Button size="sm" variant="outline" className="text-xs font-semibold text-slate-700">
                    + Add New Curriculum Unit
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockTeacherCohorts.map((cohort) => (
                  <div
                    key={cohort.id}
                    className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:border-sky-300 hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <span className="text-xs font-bold text-sky-700 bg-sky-100 px-2.5 py-0.5 rounded-full">
                            {cohort.courseCode}
                          </span>
                          <h3 className="text-base font-bold text-slate-900 mt-1.5">
                            {cohort.courseName}
                          </h3>
                          <p className="text-xs text-slate-500 font-medium">
                            {cohort.cohortName}
                          </p>
                        </div>

                        {cohort.interventionsNeeded > 0 ? (
                          <span className="text-[11px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full">
                            {cohort.interventionsNeeded} Need Attention
                          </span>
                        ) : (
                          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                            All on Track
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
                        <div>
                          <p className="text-[10px] text-slate-500 uppercase font-semibold">Students</p>
                          <p className="text-sm font-bold text-slate-900 mt-0.5">{cohort.studentCount}</p>
                        </div>
                        <div className="border-l border-slate-200">
                          <p className="text-[10px] text-slate-500 uppercase font-semibold">Avg Mastery</p>
                          <p className="text-sm font-bold text-emerald-600 mt-0.5">{cohort.averageMastery}%</p>
                        </div>
                        <div className="border-l border-slate-200">
                          <p className="text-[10px] text-slate-500 uppercase font-semibold">Pacing</p>
                          <p className="text-sm font-bold text-sky-600 mt-0.5">{cohort.completionRate}%</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <Clock className="h-3.5 w-3.5 text-slate-400" />
                        <span>{cohort.schedule}</span>
                      </div>
                    </div>

                    <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                      <Link href="/mastery">
                        <Button size="sm" variant="outline" className="text-xs font-semibold text-slate-700 hover:bg-slate-50">
                          <Target className="h-3.5 w-3.5 mr-1 text-purple-600" /> Mastery Grid
                        </Button>
                      </Link>
                      <div className="flex items-center gap-2">
                        <Link href={`/questions?course=${cohort.courseCode.toLowerCase()}`}>
                          <Button size="sm" variant="outline" className="text-xs font-semibold text-[#00A8E8] hover:bg-sky-50 border-sky-200">
                            <Sparkles className="h-3.5 w-3.5 mr-1" /> AI Questions
                          </Button>
                        </Link>
                        <Link href="/curriculum">
                          <Button size="sm" className="bg-[#0B2B53] hover:bg-slate-900 text-white font-bold text-xs">
                            Curriculum →
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: FACULTY HONORS */}
          {activeTab === "honors" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              {/* Qualifications Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-indigo-600" />
                  Academic Qualifications & Research Background
                </h3>

                <div className="space-y-3 text-sm text-slate-700">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <p className="font-bold text-slate-900">{profileForm.qualifications}</p>
                    <p className="text-xs text-slate-500 mt-1">Specialization: Quantum Field Simulation & Mechanics Pedagogy</p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Teaching Philosophy</h4>
                    <p className="text-xs text-slate-600 leading-relaxed italic bg-sky-50/50 p-4 rounded-xl border border-sky-100">
                      "{profileForm.teachingPhilosophy}"
                    </p>
                  </div>
                </div>
              </div>

              {/* Honors & Badges Grid */}
              <div className="space-y-4">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Award className="h-5 w-5 text-amber-500" />
                  Faculty Badges & Institutional Accreditations
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {mockFacultyBadges.map((badge) => (
                    <div
                      key={badge.id}
                      className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:border-amber-300 hover:shadow-md transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-200">
                            {badge.awardedYear} Honor
                          </span>
                          <Award className="h-4 w-4 text-amber-500" />
                        </div>

                        <div className="flex items-center justify-center my-3">
                          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-600 text-white shadow-lg shadow-amber-500/20">
                            {badge.icon === "BookOpenCheck" ? (
                              <BookOpenCheck className="h-7 w-7" />
                            ) : badge.icon === "Sparkles" ? (
                              <Sparkles className="h-7 w-7" />
                            ) : badge.icon === "Target" ? (
                              <Target className="h-7 w-7" />
                            ) : (
                              <Award className="h-7 w-7" />
                            )}
                          </div>
                        </div>

                        <h4 className="text-sm font-bold text-slate-900 text-center">
                          {badge.title}
                        </h4>
                        <p className="text-xs text-slate-500 text-center mt-1 leading-relaxed">
                          {badge.description}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-center gap-1 text-[11px] font-semibold text-emerald-600">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Verified Faculty Credential
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: AI ASSISTANT CONFIG */}
          {activeTab === "ai_settings" && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-6 max-w-3xl animate-in fade-in duration-300">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-purple-600" />
                  AI Teaching Assistant & Question Generation Presets
                </h3>
                <p className="text-xs text-slate-500">
                  Configure default prompting styles, Bloom's taxonomy weights, and question formatting for your courses.
                </p>
              </div>

              <form onSubmit={handleSaveAIConfig} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Default AI Teaching Persona</label>
                  <select
                    value={aiConfig.preferredPersona}
                    onChange={(e) =>
                      setAiConfig({
                        ...aiConfig,
                        preferredPersona: e.target.value as any,
                      })
                    }
                    className="w-full text-xs font-medium rounded-xl border border-slate-200 p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                  >
                    <option value="Socratic Tutor">Socratic Tutor (Guides with inquiry questions & minimal hints)</option>
                    <option value="Rigorous Examiner">Rigorous Examiner (AP/Olympiad standard mathematical precision)</option>
                    <option value="Conceptual Guide">Conceptual Guide (Visual analogies & intuitive physics models)</option>
                    <option value="Practical Mentor">Practical Mentor (Engineering & real-world laboratory applications)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Default Bloom's Taxonomy Target</label>
                  <select
                    value={aiConfig.defaultBloomsLevel}
                    onChange={(e) =>
                      setAiConfig({
                        ...aiConfig,
                        defaultBloomsLevel: e.target.value as any,
                      })
                    }
                    className="w-full text-xs font-medium rounded-xl border border-slate-200 p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                  >
                    <option value="Application">Application (Solve real problems using formulas & concepts)</option>
                    <option value="Analysis">Analysis (Break down complex multi-body systems)</option>
                    <option value="Evaluation">Evaluation (Identify experimental errors & flawed models)</option>
                    <option value="Comprehension">Comprehension (Explain fundamental laws in plain English)</option>
                    <option value="Synthesis">Synthesis (Design experiments & derive unified models)</option>
                  </select>
                </div>

                <div className="space-y-3 pt-3 border-t border-slate-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Question Generator Output Options
                  </h4>

                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <div>
                      <p className="text-xs font-bold text-slate-800">Auto-Generate Step-by-Step Solutions</p>
                      <p className="text-[11px] text-slate-500">Always generate a detailed 4-step pedagogical derivation with every question.</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={aiConfig.autoGenerateStepByStepSolutions}
                      onChange={(e) =>
                        setAiConfig({
                          ...aiConfig,
                          autoGenerateStepByStepSolutions: e.target.checked,
                        })
                      }
                      className="h-4 w-4 rounded text-[#00A8E8] focus:ring-sky-500"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <div>
                      <p className="text-xs font-bold text-slate-800">Highlight Common Student Misconceptions</p>
                      <p className="text-[11px] text-slate-500">Include diagnostic rationale for why distractors are chosen by struggling students.</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={aiConfig.highlightCommonMisconceptions}
                      onChange={(e) =>
                        setAiConfig({
                          ...aiConfig,
                          highlightCommonMisconceptions: e.target.checked,
                        })
                      }
                      className="h-4 w-4 rounded text-[#00A8E8] focus:ring-sky-500"
                    />
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-end gap-3">
                  <Button
                    type="submit"
                    className="bg-[#0B2B53] hover:bg-slate-900 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-md"
                  >
                    Save AI Assistant Preferences
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 4: EDIT FACULTY BIO */}
          {activeTab === "edit" && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-6 max-w-3xl animate-in fade-in duration-300">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Edit3 className="h-5 w-5 text-slate-700" />
                  Edit Faculty Profile & Office Hours
                </h3>
                <p className="text-xs text-slate-500">
                  Update your contact details, academic title, office locations, and student advisory hours.
                </p>
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Full Name & Title</label>
                    <input
                      type="text"
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      className="w-full text-xs rounded-xl border border-slate-200 p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Faculty Role / Title</label>
                    <input
                      type="text"
                      value={profileForm.title}
                      onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                      className="w-full text-xs rounded-xl border border-slate-200 p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Department</label>
                    <input
                      type="text"
                      value={profileForm.department}
                      onChange={(e) => setProfileForm({ ...profileForm, department: e.target.value })}
                      className="w-full text-xs rounded-xl border border-slate-200 p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Office Location</label>
                    <input
                      type="text"
                      value={profileForm.officeLocation}
                      onChange={(e) => setProfileForm({ ...profileForm, officeLocation: e.target.value })}
                      className="w-full text-xs rounded-xl border border-slate-200 p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Office Hours & Zoom Link</label>
                  <input
                    type="text"
                    value={profileForm.officeHours}
                    onChange={(e) => setProfileForm({ ...profileForm, officeHours: e.target.value })}
                    className="w-full text-xs rounded-xl border border-slate-200 p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Faculty Biography</label>
                  <textarea
                    rows={3}
                    value={profileForm.bio}
                    onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                    className="w-full text-xs rounded-xl border border-slate-200 p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                  />
                </div>

                <div className="pt-4 flex items-center justify-end gap-3">
                  <Button
                    type="submit"
                    className="bg-[#0B2B53] hover:bg-slate-900 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-md"
                  >
                    Save Changes
                  </Button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
