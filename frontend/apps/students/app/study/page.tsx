"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  AppHeader,
  Sidebar,
  Button,
  InclineSimulator,
  AIStudyAssistant,
  studentNavBranches,
} from "@learnova/ui";
import {
  ChevronRight,
  Maximize2,
  Minimize2,
  Bookmark,
  FileEdit,
  Clock,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  HelpCircle,
  BookOpen,
} from "lucide-react";

export default function FocusStudyPage() {
  const [isZenMode, setIsZenMode] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      {!isZenMode && (
        <AppHeader
          portalName="Students"
          userName="Alex Rivera"
          userRole="AP Scholar"
          avatarUrl="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
          notificationCount={3}
          streakDays={14}
          currentXp={1420}
          cohortTag="AP Physics 1 • Deep Study"
        />
      )}

      <div className="flex flex-1">
        {!isZenMode && (
          <Sidebar
            branches={studentNavBranches}
            currentPath="/study"
            footerContent={
              <div className="rounded-xl bg-[#0B2B53] p-3.5 text-white space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-sky-400">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Module Progress</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-sky-400 h-full rounded-full" style={{ width: "50%" }}></div>
                </div>
                <p className="text-[11px] text-slate-300">
                  Step 2 of 4 in Unit 3: Newton&apos;s Laws.
                </p>
              </div>
            }
          />
        )}

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1440px] mx-auto w-full">
          {/* Top Utility & Focus Mode Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-slate-200">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <Link href="/courses" className="hover:text-[#0B2B53] flex items-center gap-1">
                <BookOpen className="h-3.5 w-3.5" />
                <span>AP Physics 1</span>
              </Link>
              <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
              <Link href="/learning-path" className="hover:text-[#0B2B53]">
                Newton&apos;s Laws & Force Systems
              </Link>
              <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
              <span className="font-bold text-[#0B2B53] truncate max-w-xs">
                Lesson 3.2: Calculating Net Force in 2D
              </span>
            </nav>

            {/* Focus Controls */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-sky-800 border border-sky-200 text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></span>
                <span>Deep Focus Active</span>
              </div>
              <button
                type="button"
                onClick={() => setIsZenMode(!isZenMode)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold shadow-sm transition-all"
              >
                {isZenMode ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
                <span>{isZenMode ? "Exit Zen" : "Zen View"}</span>
              </button>
            </div>
          </div>

          {/* Main Workspace: 70/30 Asymmetrical Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT COLUMN: Main Study Canvas (70% - 8 cols) */}
            <article className="lg:col-span-8 space-y-6">
              {/* Lesson Header Card */}
              <header className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 rounded-lg bg-[#0B2B53] text-white text-xs font-bold">
                      Step 2 of 4
                    </span>
                    <span className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                      <Clock className="h-3.5 w-3.5 text-sky-600" />
                      18 min read & simulator
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-400">
                    <button className="p-1.5 rounded hover:bg-slate-100 hover:text-slate-700 transition-colors" title="Bookmark">
                      <Bookmark className="h-4 w-4" />
                    </button>
                    <button className="p-1.5 rounded hover:bg-slate-100 hover:text-slate-700 transition-colors" title="Add Note">
                      <FileEdit className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <h1 className="text-2xl font-extrabold text-[#0B2B53] tracking-tight">
                  Calculating Net Force and Acceleration in 2D Systems
                </h1>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Master orthogonal vector resolution, tilted frame transformation, and downhill dynamic equilibrium for inclined physics problems.
                </p>

                {/* Progress Strip */}
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-gradient-to-r from-[#00A8E8] to-[#2ECC71] h-full rounded-full" style={{ width: "50%" }}></div>
                </div>
              </header>

              {/* Core Academic Reading Content */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-8">
                {/* Section 1: Concept Exposition */}
                <section className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-slate-100 text-[#0B2B53] flex items-center justify-center font-bold text-xs">
                      01
                    </span>
                    <h2 className="text-base font-bold text-[#0B2B53]">
                      Orthogonal Vector Resolution on Inclines
                    </h2>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    When analyzing rigid bodies accelerating down an inclined surface, computing force vectors along traditional horizontal (<em>x</em>) and vertical (<em>y</em>) axes causes simultaneous acceleration along both dimensions. To simplify Newton&apos;s second law calculations, we perform a <strong>coordinate rotation</strong>: we orient the chosen <em>x&apos;</em>-axis strictly parallel to the surface incline, and the <em>y&apos;</em>-axis orthogonal (perpendicular) to the contact plane.
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Under this rotated reference system, perpendicular acceleration collapses to zero (<span className="font-semibold text-[#0B2B53]">a<sub>y&apos;</sub> = 0</span>), meaning all net accelerating dynamics isolate cleanly into the parallel axis (<span className="font-semibold text-[#0B2B53]">a<sub>x&apos;</sub></span>).
                  </p>
                </section>

                {/* Key Formula Callout Box */}
                <section className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-sky-700 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="h-4 w-4" />
                      Governing Law • 2D Component Equations
                    </span>
                    <span className="text-slate-400 font-normal">SI Units: [N] • [kg·m/s²]</span>
                  </div>

                  <div className="py-4 px-6 bg-white rounded-xl shadow-sm border border-slate-200/80 flex flex-col md:flex-row items-center justify-around gap-4 text-center">
                    <div>
                      <span className="text-[11px] text-slate-400 block mb-1">Parallel Incline Axis</span>
                      <p className="text-lg font-mono font-bold text-[#0B2B53]">
                        Σ F<sub>x</sub> = m · a<sub>x</sub>
                      </p>
                      <span className="text-xs font-mono text-sky-700">F<sub>g,∥</sub> − f<sub>k</sub> = m · a<sub>x</sub></span>
                    </div>

                    <div className="hidden md:block w-px h-10 bg-slate-200"></div>

                    <div>
                      <span className="text-[11px] text-slate-400 block mb-1">Perpendicular Axis (Equilibrium)</span>
                      <p className="text-lg font-mono font-bold text-[#0B2B53]">
                        Σ F<sub>y</sub> = m · a<sub>y</sub> = 0
                      </p>
                      <span className="text-xs font-mono text-emerald-700">F<sub>N</sub> − F<sub>g,⊥</sub> = 0</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-500">
                    Gravity vector <span className="font-mono font-bold text-[#0B2B53]">F<sub>g</sub> = m · g</span> decomposes directly into orthogonal components using the ramp angle <span className="font-mono font-bold text-[#0B2B53]">θ</span>.
                  </p>
                </section>

                {/* Section 2: Strategic Steps */}
                <section className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-slate-100 text-[#0B2B53] flex items-center justify-center font-bold text-xs">
                      02
                    </span>
                    <h2 className="text-base font-bold text-[#0B2B53]">
                      Strategic Coordinate Rotation Steps
                    </h2>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                      <strong className="text-sm font-bold text-[#0B2B53] block">
                        1. Align Coordinate System with Ramp
                      </strong>
                      <p className="text-slate-600 leading-relaxed">
                        Orient the reference frame such that <span className="font-mono text-[#0B2B53] font-bold">+x</span> points directly down the slope and <span className="font-mono text-[#0B2B53] font-bold">+y</span> points perpendicular outward. This guarantees zero normal acceleration (a<sub>y</sub> = 0).
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                      <strong className="text-sm font-bold text-[#0B2B53] block">
                        2. Decompose Gravitational Force Vectors
                      </strong>
                      <p className="text-slate-600 leading-relaxed">
                        Decompose downward gravity into parallel and orthogonal components relative to the incline surface:
                      </p>
                      <div className="flex gap-3 pt-1 font-mono text-xs text-[#0B2B53]">
                        <span className="px-3 py-1 bg-white rounded border border-slate-200 shadow-sm font-bold">
                          F<sub>g,∥</sub> = m · g · sin(θ)
                        </span>
                        <span className="px-3 py-1 bg-white rounded border border-slate-200 shadow-sm font-bold">
                          F<sub>g,⊥</sub> = m · g · cos(θ)
                        </span>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                      <strong className="text-sm font-bold text-[#0B2B53] block">
                        3. Solve for Normal Force and Kinetic Friction
                      </strong>
                      <p className="text-slate-600 leading-relaxed">
                        Equilibrium across the perpendicular axis yields <span className="font-mono font-bold text-[#0B2B53]">F<sub>N</sub> = F<sub>g,⊥</sub> = m · g · cos(θ)</span>. Consequently, kinetic friction simplifies directly to <span className="font-mono font-bold text-[#0B2B53]">f<sub>k</sub> = μ<sub>k</sub> · F<sub>N</sub> = μ<sub>k</sub> · m · g · cos(θ)</span>.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Section 3: Interactive Incline Simulator */}
                <InclineSimulator />

                {/* Quick Comprehension Check */}
                <section className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-sky-700 uppercase tracking-wider flex items-center gap-1.5">
                      <HelpCircle className="h-4 w-4" />
                      Quick Check 3.2.1
                    </span>
                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      +25 XP Available
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-[#0B2B53]">
                    If the incline angle θ increases toward 90°, what occurs to the normal force F<sub>N</sub>?
                  </h3>

                  <div className="space-y-2.5">
                    <button
                      type="button"
                      onClick={() => setQuizAnswer("A")}
                      className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 ${
                        quizAnswer === "A"
                          ? "bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20 shadow-sm"
                          : "bg-white border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <span className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 ${
                        quizAnswer === "A" ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-700"
                      }`}>
                        A
                      </span>
                      <div>
                        <p className="text-xs font-bold text-[#0B2B53]">
                          F<sub>N</sub> decreases because cos(θ) approaches 0
                        </p>
                        <span className="text-[11px] text-slate-500 mt-0.5 block">
                          As the ramp gets vertical, the surface supports progressively less weight.
                        </span>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setQuizAnswer("B")}
                      className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 ${
                        quizAnswer === "B"
                          ? "bg-rose-50 border-rose-400 ring-2 ring-rose-400/20 shadow-sm"
                          : "bg-white border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <span className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 ${
                        quizAnswer === "B" ? "bg-rose-500 text-white" : "bg-slate-100 text-slate-700"
                      }`}>
                        B
                      </span>
                      <div>
                        <p className="text-xs font-bold text-[#0B2B53]">
                          F<sub>N</sub> increases because sin(θ) approaches 1
                        </p>
                        <span className="text-[11px] text-slate-500 mt-0.5 block">
                          The block slides faster, exerting greater contact pressure against the incline.
                        </span>
                      </div>
                    </button>
                  </div>

                  {quizAnswer === "A" && (
                    <div className="p-3 rounded-xl bg-emerald-100/70 border border-emerald-300 text-emerald-800 text-xs flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                      <span><strong>Correct!</strong> Since F<sub>N</sub> = mg cos(θ), as θ → 90°, cos(90°) = 0, so normal force vanishes completely.</span>
                    </div>
                  )}

                  {quizAnswer === "B" && (
                    <div className="p-3 rounded-xl bg-rose-100/70 border border-rose-300 text-rose-800 text-xs">
                      <span><strong>Not quite:</strong> Normal force depends on cos(θ), not sin(θ). Recall that at 90° (vertical wall), there is no perpendicular contact pressure.</span>
                    </div>
                  )}
                </section>

                {/* Primary Action Button */}
                <div className="pt-2">
                  <Button
                    onClick={() => setIsCompleted(true)}
                    className="w-full py-6 bg-[#00A8E8] hover:bg-sky-500 text-white font-extrabold text-base rounded-2xl shadow-lg shadow-sky-500/20 flex items-center justify-center gap-2 group"
                  >
                    <span>{isCompleted ? "Completed! Proceeding..." : "Mark Complete & Continue (+80 XP)"}</span>
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                  <div className="flex items-center justify-between text-xs text-slate-400 mt-2 px-1">
                    <span>Next: Lesson 3.3 Static Friction Thresholds</span>
                    <span>Saves progress automatically</span>
                  </div>
                </div>
              </div>
            </article>

            {/* RIGHT COLUMN: AI Learning Support (30% - 4 cols) */}
            <aside className="lg:col-span-4 sticky top-20">
              <AIStudyAssistant />
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}
