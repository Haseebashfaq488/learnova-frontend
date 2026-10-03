"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  AppHeader,
  Sidebar,
  Button,
  mockPracticeQuestions,
  mockEnrolledCoursesHub,
  getStudentCourseNavBranches,
} from "@learnova/ui";
import {
  FileText,
  Award,
  Play,
  ArrowLeft,
  ArrowRight,
  Headphones,
  Timer,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  Maximize2,
  Minimize2,
  RefreshCw,
  BookOpen,
  ChevronRight,
  RotateCcw,
  Zap,
} from "lucide-react";

export default function CourseFocusPracticePage() {
  const params = useParams();
  const courseId = (params?.courseId as string) || "ap-physics-1";

  const course =
    mockEnrolledCoursesHub.find((c) => c.id === courseId) ||
    mockEnrolledCoursesHub[0];

  const courseBranches = getStudentCourseNavBranches(courseId, course.title);

  const [currentIdx, setCurrentIdx] = useState(3); // Start on Question 4 (circular motion) as in Stitch demo
  const [selectedOption, setSelectedOption] = useState<string>("opt-4-b"); // B selected
  const [showExplanation, setShowExplanation] = useState(false);
  const [isZenSoundActive, setIsZenSoundActive] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(18 * 60 + 42); // 18:42
  const [isFullScreen, setIsFullScreen] = useState(false);

  const question = mockPracticeQuestions[currentIdx];

  // Timer countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleNext = () => {
    if (currentIdx < mockPracticeQuestions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption("");
      setShowExplanation(false);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx((prev) => prev - 1);
      setSelectedOption("");
      setShowExplanation(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {!isFullScreen && (
        <AppHeader
          portalName="Students"
          userName="Alex Rivera"
          userRole="AP Scholar"
          avatarUrl="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
          notificationCount={3}
          streakDays={14}
          currentXp={1420}
          cohortTag={`${course.title} • Practice Arena`}
        />
      )}

      <div className="flex flex-1">
        {!isFullScreen && (
          <Sidebar
            branches={courseBranches}
            currentPath={`/courses/${courseId}/practice`}
            footerContent={
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span className="font-medium">Questions Solved</span>
                  <span className="font-bold text-sky-600">
                    {currentIdx + 1} / {mockPracticeQuestions.length}
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
                  <div
                    className="h-full bg-[#00A8E8] rounded-full transition-all duration-300"
                    style={{
                      width: `${((currentIdx + 1) / mockPracticeQuestions.length) * 100}%`,
                    }}
                  ></div>
                </div>
                <p className="text-[11px] text-slate-500">
                  Unit 3 Assessment • 80% pass threshold
                </p>
              </div>
            }
          />
        )}

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-4xl mx-auto w-full">
          {/* Breadcrumb & Navigation */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <Link href="/courses" className="hover:text-[#0B2B53] flex items-center gap-1">
              <BookOpen className="h-3.5 w-3.5" />
              <span>Courses</span>
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
            <Link href={`/courses/${courseId}`} className="hover:text-[#0B2B53]">
              {course.title}
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
            <span className="font-bold text-[#0B2B53]">Practice Arena</span>
          </nav>

          {/* Top Focus Mode Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-sky-50 border border-sky-200 font-mono text-xs font-bold text-sky-800">
                <Timer className="h-4 w-4 text-sky-600" />
                <span>{formatTimer(secondsRemaining)}</span>
              </div>
              <button
                type="button"
                onClick={() => setIsZenSoundActive(!isZenSoundActive)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  isZenSoundActive
                    ? "bg-emerald-50 text-emerald-800 border-emerald-300 shadow-sm"
                    : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <Headphones className="h-3.5 w-3.5" />
                <span>{isZenSoundActive ? "Zen Audio On" : "White Noise"}</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedOption("");
                  setShowExplanation(false);
                }}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 text-xs font-medium text-slate-600 transition-colors"
                title="Reset question response"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset</span>
              </button>
              <button
                type="button"
                onClick={() => setIsFullScreen(!isFullScreen)}
                className="p-2 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors"
                title="Toggle Fullscreen Arena"
              >
                {isFullScreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Question Jump Selector */}
          <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1">
            <div className="flex items-center gap-1.5">
              {mockPracticeQuestions.map((q, idx) => {
                const isActive = idx === currentIdx;
                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => {
                      setCurrentIdx(idx);
                      setSelectedOption(idx === 3 ? "opt-4-b" : "");
                      setShowExplanation(false);
                    }}
                    className={`w-9 h-9 rounded-xl font-mono text-xs font-bold transition-all ${
                      isActive
                        ? "bg-[#00A8E8] text-white shadow-md shadow-sky-500/20 scale-105 ring-2 ring-sky-300"
                        : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
            <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">
              {question.topic} • {question.difficulty}
            </span>
          </div>

          {/* Question Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-600">
                Problem {currentIdx + 1} of {mockPracticeQuestions.length}
              </span>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                <Zap className="h-3 w-3 text-emerald-600" /> +25 XP
              </span>
            </div>

            <p className="text-base sm:text-lg font-semibold text-slate-900 leading-relaxed">
              {question.prompt}
            </p>

            {/* Answer Options */}
            <div className="space-y-3 pt-2">
              {question.options.map((opt) => {
                const isSelected = selectedOption === opt.id;
                const isCorrectOption = opt.isCorrect;

                let stateClasses =
                  "bg-slate-50/70 border-slate-200 text-slate-800 hover:bg-slate-100 hover:border-slate-300";
                if (isSelected) {
                  stateClasses = isCorrectOption
                    ? "bg-emerald-50/90 border-emerald-500 text-emerald-950 ring-2 ring-emerald-500/20"
                    : "bg-rose-50/90 border-rose-500 text-rose-950 ring-2 ring-rose-500/20";
                }

                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedOption(opt.id)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${stateClasses}`}
                  >
                    <div className="flex items-center gap-3.5">
                      <span
                        className={`w-8 h-8 rounded-xl font-mono text-xs font-bold flex items-center justify-center shrink-0 border transition-all ${
                          isSelected
                            ? isCorrectOption
                              ? "bg-emerald-600 border-emerald-600 text-white shadow-sm"
                              : "bg-rose-600 border-rose-600 text-white shadow-sm"
                            : "bg-white border-slate-200 text-slate-700 shadow-2xs"
                        }`}
                      >
                        {opt.label}
                      </span>
                      <span className="text-sm font-medium leading-normal">{opt.text}</span>
                    </div>

                    {isSelected && (
                      <span className="text-xs font-bold shrink-0">
                        {isCorrectOption ? (
                          <span className="text-emerald-700 flex items-center gap-1 bg-emerald-100/70 px-2.5 py-1 rounded-full">
                            <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Correct
                          </span>
                        ) : (
                          <span className="text-rose-700 bg-rose-100/70 px-2.5 py-1 rounded-full">
                            Incorrect
                          </span>
                        )}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Hint and Formula Dropdown */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setShowExplanation(!showExplanation)}
                className="text-xs font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1.5 transition-colors"
              >
                <HelpCircle className="h-4 w-4" />
                <span>{showExplanation ? "Hide Derivation" : "Show Formula & Derivation"}</span>
              </button>

              {question.helperFormula && (
                <span className="text-xs text-slate-500 font-mono bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
                  Formula: {question.helperFormula}
                </span>
              )}
            </div>

            {showExplanation && (
              <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-200/80 text-xs text-slate-700 space-y-2.5 animate-fadeIn">
                <div className="flex items-center gap-2 font-bold text-sky-800">
                  <Sparkles className="h-4 w-4 text-sky-600" />
                  <span>Physics Derivation Breakdown</span>
                </div>
                <p className="leading-relaxed text-slate-700">
                  {question.explanation}
                </p>
                {question.helperFormula && (
                  <div className="p-2.5 rounded-xl bg-white border border-sky-200 font-mono text-[11px] text-sky-900 font-semibold shadow-2xs">
                    {question.helperFormula}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Navigation Action Buttons */}
          <div className="flex items-center justify-between pt-2">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={currentIdx === 0}
              className="border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 disabled:opacity-40 rounded-xl text-xs font-medium shadow-2xs"
            >
              <ArrowLeft className="h-4 w-4 mr-1.5" /> Previous Problem
            </Button>

            <Button
              onClick={handleNext}
              disabled={currentIdx === mockPracticeQuestions.length - 1}
              className="bg-[#00A8E8] hover:bg-sky-600 text-white font-bold rounded-xl text-xs shadow-md shadow-sky-500/20 px-5"
            >
              Next Problem <ArrowRight className="h-4 w-4 ml-1.5" />
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}
