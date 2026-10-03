"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  AppHeader,
  Sidebar,
  Button,
  mockPracticeQuestions,
} from "@learnova/ui";
import {
  Compass,
  BookOpen,
  Route,
  BookMarked,
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
} from "lucide-react";

export default function FocusPracticePage() {
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

  const navItems = [
    { label: "Learning Hub", href: "/", icon: <Compass className="h-4 w-4" /> },
    { label: "My Courses", href: "/courses", icon: <BookOpen className="h-4 w-4" />, badge: 4 },
    { label: "Learning Path", href: "/learning-path", icon: <Route className="h-4 w-4" />, badge: "Unit 3" },
    { label: "Focus Study (AI)", href: "/study", icon: <BookMarked className="h-4 w-4" />, badge: "Active" },
    { label: "Focus Practice", href: "/practice", icon: <Play className="h-4 w-4" />, active: true },
    { label: "Progress & Radar", href: "/analytics", icon: <Award className="h-4 w-4" />, badge: "77%" },
  ];

  const handleNext = () => {
    if (currentIdx < mockPracticeQuestions.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelectedOption("");
      setShowExplanation(false);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
      setSelectedOption("");
      setShowExplanation(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      {!isFullScreen && (
        <AppHeader
          portalName="Students"
          userName="Alex Rivera"
          userRole="AP Scholar"
          avatarUrl="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
          notificationCount={3}
          streakDays={14}
          currentXp={1420}
          cohortTag="AP Physics C: Mechanics"
        />
      )}

      <div className="flex flex-1">
        {!isFullScreen && (
          <Sidebar
            items={navItems}
            currentPath="/practice"
            className="bg-slate-950 border-slate-800 text-slate-300"
            footerContent={
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Questions Solved</span>
                  <span className="font-bold text-sky-400">{currentIdx + 1} / {mockPracticeQuestions.length}</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-sky-500 rounded-full transition-all duration-300"
                    style={{ width: `${((currentIdx + 1) / mockPracticeQuestions.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            }
          />
        )}

        <main className="flex-1 flex flex-col justify-between p-4 sm:p-6 lg:p-8 bg-[#0B2B53]/20 relative">
          {/* Focus Session Utility Bar */}
          <div className="w-full max-w-4xl mx-auto flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="flex items-center gap-1.5 text-xs font-semibold text-sky-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Exit Focus Mode</span>
              </Link>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
              <span className="text-xs uppercase tracking-wider text-slate-400">
                {question.topic}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Session Timer */}
              <div className="flex items-center gap-1.5 bg-[#0B2B53] text-sky-300 px-3 py-1 rounded-full text-xs font-bold border border-sky-500/20 shadow-sm">
                <Timer className="h-3.5 w-3.5 text-sky-400" />
                <span>{formatTimer(secondsRemaining)}</span>
              </div>

              {/* Zen Sound Toggle */}
              <button
                onClick={() => setIsZenSoundActive(!isZenSoundActive)}
                className={`p-2 rounded-full border transition-all ${
                  isZenSoundActive
                    ? "bg-emerald-500/20 border-emerald-500 text-emerald-400"
                    : "bg-slate-800 border-slate-700 text-slate-400 hover:text-white"
                }`}
                title="Zen White Noise Mode"
              >
                <Headphones className="h-4 w-4" />
              </button>

              {/* Fullscreen Toggle */}
              <button
                onClick={() => setIsFullScreen(!isFullScreen)}
                className="p-2 rounded-full bg-slate-800 border border-slate-700 text-slate-400 hover:text-white transition-all"
                title={isFullScreen ? "Exit Fullscreen" : "Enter Fullscreen"}
              >
                {isFullScreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Central Focus Arena */}
          <div className="w-full max-w-3xl mx-auto my-auto py-6">
            <div className="bg-slate-950/90 rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-800 shadow-2xl relative overflow-hidden backdrop-blur-xl">
              {/* Progress Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-950 border border-sky-800 text-sky-300 text-xs font-bold uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
                    Question {question.questionNumber} of {question.totalQuestions}
                  </span>
                  <span className="text-xs text-slate-400">Single Choice</span>
                </div>
                <span className="text-xs font-semibold text-slate-400">
                  Topic: {question.subtopic}
                </span>
              </div>

              {/* Linear Micro Progress Bar */}
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-6">
                <div
                  className="h-full bg-gradient-to-r from-sky-500 to-emerald-400 rounded-full transition-all duration-300"
                  style={{ width: `${(question.questionNumber / question.totalQuestions) * 100}%` }}
                ></div>
              </div>

              {/* Prompt Statement */}
              <div className="space-y-3 mb-8">
                <h2 className="text-lg sm:text-xl font-semibold text-white leading-relaxed">
                  {question.prompt}
                </h2>
                {question.helperFormula && (
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-sky-300 font-mono flex items-center justify-between">
                    <span>Formula: {question.helperFormula}</span>
                    <button
                      onClick={() => setShowExplanation(!showExplanation)}
                      className="text-slate-400 hover:text-sky-300 flex items-center gap-1 text-[11px]"
                    >
                      <HelpCircle className="h-3.5 w-3.5" />
                      <span>{showExplanation ? "Hide Hint" : "Need Hint?"}</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Multiple Choice Options */}
              <div className="flex flex-col gap-3" role="radiogroup">
                {question.options.map((opt) => {
                  const isSelected = selectedOption === opt.id;
                  return (
                    <label
                      key={opt.id}
                      onClick={() => setSelectedOption(opt.id)}
                      className={`cursor-pointer group flex items-center justify-between p-4 rounded-2xl border transition-all duration-150 ${
                        isSelected
                          ? "bg-sky-950/40 border-sky-500 shadow-md shadow-sky-500/10 ring-1 ring-sky-500"
                          : "bg-slate-900/60 border-slate-800/80 hover:bg-slate-850 hover:border-slate-700"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs transition-colors ${
                            isSelected
                              ? "bg-sky-500 text-slate-950"
                              : "bg-slate-800 text-slate-300 group-hover:bg-slate-700"
                          }`}
                        >
                          {opt.label}
                        </div>
                        <span
                          className={`text-sm font-medium ${
                            isSelected ? "text-white font-semibold" : "text-slate-300"
                          }`}
                        >
                          {opt.text}
                        </span>
                      </div>

                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center border transition-colors ${
                          isSelected
                            ? "bg-sky-500 border-sky-500 text-slate-950"
                            : "border-slate-700 bg-slate-900"
                        }`}
                      >
                        {isSelected && <CheckCircle2 className="h-4 w-4" />}
                      </div>
                    </label>
                  );
                })}
              </div>

              {/* Step-by-Step Explanation Banner */}
              {showExplanation && (
                <div className="mt-6 p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/60 text-xs text-emerald-200 space-y-1">
                  <div className="font-bold flex items-center gap-1.5 text-emerald-400">
                    <Sparkles className="h-4 w-4" />
                    <span>Physics Derivation Hint:</span>
                  </div>
                  <p className="leading-relaxed">{question.explanation}</p>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Action Footer */}
          <div className="w-full max-w-4xl mx-auto flex items-center justify-between pt-4 border-t border-slate-800">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={currentIdx === 0}
              className="border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4 mr-1.5" />
              <span>Previous</span>
            </Button>

            <div className="flex items-center gap-2">
              {mockPracticeQuestions.map((q, idx) => (
                <button
                  key={q.id}
                  onClick={() => {
                    setCurrentIdx(idx);
                    setSelectedOption("");
                    setShowExplanation(false);
                  }}
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                    idx === currentIdx
                      ? "bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20"
                      : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white"
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>

            <Button
              onClick={handleNext}
              disabled={currentIdx === mockPracticeQuestions.length - 1}
              className="bg-[#00A8E8] hover:bg-sky-400 text-slate-950 font-bold px-6"
            >
              <span>Next Question</span>
              <ArrowRight className="h-4 w-4 ml-1.5" />
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}
