'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Clock,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Award,
  Zap,
  Code2,
  Check,
} from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';
import { useAuth } from '../../../context/AuthContext';
import { practiceQuestions, PracticeQuestion } from '../../../data/studentData';

export default function PracticeArenaPage() {
  const { palette, font } = useTheme();
  const { user } = useAuth();

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(180);
  const [timerRunning, setTimerRunning] = useState(true);

  const currentQ: PracticeQuestion = practiceQuestions[currentIdx];

  // Timer countdown
  useEffect(() => {
    if (!timerRunning || isFinished) return;
    const interval = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timerRunning, isFinished]);

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleSelectOption = (optId: string) => {
    if (isAnswerSubmitted) return;
    setSelectedOptionId(optId);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOptionId || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);
    const chosen = currentQ.options.find((o) => o.id === selectedOptionId);
    if (chosen?.isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < practiceQuestions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOptionId(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsFinished(true);
      setTimerRunning(false);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOptionId(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setIsFinished(false);
    setTimerSeconds(180);
    setTimerRunning(true);
  };

  const selectedOpt = currentQ?.options.find((o) => o.id === selectedOptionId);
  const isCorrect = selectedOpt?.isCorrect;

  return (
    <div className="space-y-6 text-left w-full">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            <Zap className="w-3.5 h-3.5" style={{ color: palette.accent }} />
            <span>Calibrated Concept Verification</span>
          </div>
          <h1 className={`text-2xl sm:text-3xl font-extrabold text-ink tracking-tight ${font.displayClass}`}>
            Practice Arena
          </h1>
        </div>

        {/* Timer & Question Progress Pill */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-700 shadow-xs">
            <Clock className="w-4 h-4 text-amber-500" />
            <span>{formatTimer(timerSeconds)}</span>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 text-xs font-bold text-slate-800">
            <span>
              Question {currentIdx + 1} of {practiceQuestions.length}
            </span>
          </div>
        </div>
      </div>

      {/* Main Practice Card or Finished View */}
      {!isFinished ? (
        <div className="space-y-6">
          {/* Progress Bar */}
          <div className="w-full h-2 rounded-full bg-slate-200/80 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${((currentIdx + 1) / practiceQuestions.length) * 100}%`,
                backgroundColor: palette.accent,
              }}
            />
          </div>

          {/* Question Container Card */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
            {/* Topic & Difficulty Badges */}
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200/60">
                {currentQ.topic} • {currentQ.subtopic}
              </span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200/60">
                {currentQ.difficulty}
              </span>
            </div>

            {/* Prompt */}
            <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
              {currentQ.prompt}
            </h2>

            {/* Optional Code Snippet */}
            {currentQ.codeSnippet && (
              <div className="rounded-2xl bg-slate-900 p-4 text-slate-100 font-mono text-xs overflow-x-auto shadow-inner border border-slate-800">
                <div className="flex items-center gap-1.5 pb-2 mb-2 border-b border-slate-800 text-slate-400 text-[10px]">
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Code Invariant</span>
                </div>
                <pre>{currentQ.codeSnippet}</pre>
              </div>
            )}

            {/* Helper Theory Chip */}
            {currentQ.helperConcept && (
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 flex items-start gap-2.5 text-xs text-slate-600">
                <HelpCircle className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  <strong>Concept Anchor:</strong> {currentQ.helperConcept}
                </span>
              </div>
            )}

            {/* Options Grid */}
            <div className="space-y-3 pt-2">
              {currentQ.options.map((opt) => {
                const isSelected = selectedOptionId === opt.id;
                let optStyle = 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50';

                if (isSelected && !isAnswerSubmitted) {
                  optStyle = 'border-slate-900 bg-slate-50 ring-2 ring-slate-900/10 shadow-xs';
                } else if (isAnswerSubmitted) {
                  if (opt.isCorrect) {
                    optStyle = 'border-emerald-500 bg-emerald-50/80 ring-2 ring-emerald-500/20 text-emerald-950 font-bold';
                  } else if (isSelected && !opt.isCorrect) {
                    optStyle = 'border-rose-400 bg-rose-50/80 text-rose-950';
                  }
                }

                return (
                  <button
                    key={opt.id}
                    type="button"
                    disabled={isAnswerSubmitted}
                    onClick={() => handleSelectOption(opt.id)}
                    className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all duration-200 cursor-pointer ${optStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold border shrink-0 ${
                          isSelected
                            ? 'bg-slate-900 text-white border-slate-900'
                            : 'bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                        style={
                          isSelected && !isAnswerSubmitted
                            ? { backgroundColor: palette.accent, borderColor: palette.accent }
                            : undefined
                        }
                      >
                        {opt.label}
                      </span>
                      <span className="text-xs sm:text-sm font-medium">{opt.text}</span>
                    </div>

                    {isAnswerSubmitted && opt.isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 ml-2" />
                    )}
                    {isAnswerSubmitted && isSelected && !opt.isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-500 shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Answer Explanation Box (appears after submit) */}
            <AnimatePresence>
              {isAnswerSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`p-5 rounded-2xl border ${
                    isCorrect
                      ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                      : 'bg-rose-50/80 border-rose-200 text-rose-950'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2 font-bold text-xs sm:text-sm">
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Correct! +50 XP Earned</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-rose-600" />
                        <span>Concept Missed</span>
                      </>
                    )}
                  </div>
                  <p className="text-xs leading-relaxed opacity-90">
                    {currentQ.explanation}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <span className="text-xs text-slate-500">
                {selectedOptionId ? 'Option selected' : 'Select an option to proceed'}
              </span>

              {!isAnswerSubmitted ? (
                <button
                  type="button"
                  disabled={!selectedOptionId}
                  onClick={handleSubmitAnswer}
                  className="px-6 py-2.5 rounded-xl text-white text-xs font-bold transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: palette.accent }}
                >
                  Verify Answer
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2.5 rounded-xl text-white text-xs font-bold transition-all shadow-sm hover:shadow-md flex items-center gap-2"
                  style={{ backgroundColor: palette.textPrimary }}
                >
                  <span>
                    {currentIdx < practiceQuestions.length - 1 ? 'Next Question' : 'Complete Arena'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* FINISHED SUMMARY SCREEN */
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl border border-slate-200/90 shadow-lg p-8 sm:p-12 text-center space-y-6"
        >
          <div
            className="w-16 h-16 rounded-3xl mx-auto flex items-center justify-center text-white shadow-md"
            style={{ backgroundColor: palette.textPrimary }}
          >
            <Award className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60">
              Session Completed
            </span>
            <h2 className={`text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3 ${font.displayClass}`}>
              Diagnostic Score: {score} / {practiceQuestions.length} ({Math.round((score / practiceQuestions.length) * 100)}%)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mt-2">
              Great work! Your responses have updated your multidimensional Competency Radar.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 max-w-md mx-auto py-2">
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/60">
              <span className="text-[11px] text-slate-500 block">XP Gained</span>
              <p className="text-lg font-bold text-emerald-600">+{score * 50} XP</p>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/60">
              <span className="text-[11px] text-slate-500 block">Time Elapsed</span>
              <p className="text-lg font-bold text-slate-900">{formatTimer(180 - timerSeconds)}</p>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/60">
              <span className="text-[11px] text-slate-500 block">Streak</span>
              <p className="text-lg font-bold" style={{ color: palette.accent }}>+1 Day</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <button
              onClick={handleRestart}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retry Session</span>
            </button>

            <Link
              href="/dashboard/analytics"
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-white text-xs font-bold transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"
              style={{ backgroundColor: palette.accent }}
            >
              <span>View Updated Radar</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/dashboard"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900"
            >
              Back to Dashboard
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
}
