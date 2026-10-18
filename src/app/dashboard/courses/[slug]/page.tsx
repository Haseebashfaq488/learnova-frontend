'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  BookOpen,
  Clock,
  Sparkles,
  CheckCircle2,
  FileText,
  Video,
  Code2,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Play,
  Route,
  Award,
  Zap,
  Lock,
  ArrowRight,
  Layers,
  GraduationCap,
} from 'lucide-react';
import { coursesData } from '../../../../data/coursesData';
import { useTheme } from '../../../../context/ThemeContext';
import { useAuth } from '../../../../context/AuthContext';
import { LessonType } from '../../../../types/course';

interface CourseLearningPathPageProps {
  params: Promise<{ slug: string }>;
}

export default function CourseLearningPathPage({ params }: CourseLearningPathPageProps) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const { palette, font } = useTheme();
  const { user } = useAuth();

  // Find course by slug or by id
  const course = coursesData.find((c) => c.slug === slug || c.id === slug);

  if (!course) {
    notFound();
  }

  // Accordion state: by default, all active units are open
  const [openTopics, setOpenTopics] = useState<Record<string, boolean>>({
    'unit-1': true,
    'unit-2': true,
    'unit-3': true,
    'unit-4': false,
  });

  const toggleTopic = (topicId: string) => {
    setOpenTopics((prev) => ({
      ...prev,
      [topicId]: !prev[topicId],
    }));
  };

  // Helper for lesson type icons
  const getLessonIcon = (type: LessonType) => {
    switch (type) {
      case 'video':
        return <Video className="w-4 h-4 text-sky-600" />;
      case 'code':
        return <Code2 className="w-4 h-4 text-emerald-600" />;
      case 'reading':
      default:
        return <FileText className="w-4 h-4 text-slate-600" />;
    }
  };

  const getLessonTypeBadge = (type: LessonType) => {
    switch (type) {
      case 'video':
        return 'Lecture Video';
      case 'code':
        return 'Interactive Code Lab';
      case 'reading':
      default:
        return 'Conceptual Reading';
    }
  };

  // Helper for assignment types
  const getAssignmentIcon = (type: LessonType) => {
    switch (type) {
      case 'diagnostic':
        return <HelpCircle className="w-4 h-4 text-purple-600" />;
      case 'practice':
      default:
        return <Sparkles className="w-4 h-4 text-amber-600" />;
    }
  };

  const getAssignmentBadge = (type: LessonType) => {
    switch (type) {
      case 'diagnostic':
        return 'Diagnostic Baseline';
      case 'practice':
      default:
        return 'Calibrated Practice Checkpoint';
    }
  };

  // Determine current active resume item
  // Unit 3, Lesson 2 is Alex's active resume point for cs101
  const resumeUnit = course.syllabus[2] || course.syllabus[0];
  const resumeLesson =
    resumeUnit?.lessons.find((l) => l.type === 'reading' || l.type === 'video') ||
    resumeUnit?.lessons[0];

  return (
    <div className="space-y-8 text-left w-full">
      {/* 1. Breadcrumb & Back Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/courses"
            className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            title="Back to My Courses"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <span>My Enrolled Courses</span>
              <span>/</span>
              <span className="font-mono text-slate-700">{course.code}</span>
            </div>
            <h1
              className={`text-xl sm:text-2xl md:text-3xl font-extrabold text-ink tracking-tight mt-0.5 ${font.displayClass}`}
            >
              {course.title}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <span className="px-3 py-1 rounded-full text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/60 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Active Enrolled Path
          </span>
          <Link
            href={`/courses/${course.slug}`}
            className="py-1.5 px-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Syllabus
          </Link>
        </div>
      </div>

      {/* 2. PRIMARY FOCAL HERO: Resume Learning Path */}
      <section className="relative rounded-3xl bg-white border-2 border-slate-200/90 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
        {/* Banner Bar */}
        <div
          className="px-6 py-3.5 text-white flex flex-wrap items-center justify-between gap-3"
          style={{ backgroundColor: palette.textPrimary }}
        >
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 text-amber-300">
              <Play className="h-3.5 w-3.5 fill-amber-300" />
            </div>
            <span className="text-xs sm:text-sm font-bold tracking-wide">
              Resume Your Learning Path
            </span>
          </div>
          <span className="text-xs font-medium bg-white/10 px-3 py-0.5 rounded-full text-white/90">
            {resumeUnit.title}
          </span>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-600">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Next Recommended Objective</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {resumeLesson?.title || 'Interactive Lesson'}
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Study the core mechanics and invariants of this concept with step-by-step interactive breakdowns and contextual Socratic AI support.
            </p>

            <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
              <span className="flex items-center gap-1 font-semibold" style={{ color: palette.accent }}>
                <Clock className="w-3.5 h-3.5" />
                {resumeLesson?.duration || '30 min'}
              </span>
              <span>•</span>
              <span>Theoretical Foundation &amp; Socratic Study Assistant</span>
            </div>
          </div>

          <div className="shrink-0">
            <Link
              href={`/dashboard/courses/${course.slug}/lessons/${resumeLesson?.id || 'l1'}`}
              className="py-3 px-6 rounded-2xl text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2.5"
              style={{ backgroundColor: palette.accent }}
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Continue Lesson</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Course Mastery Telemetry Bar */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-1">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Overall Course Mastery
          </span>
          <p className="text-xl sm:text-2xl font-extrabold text-slate-900">
            75%
          </p>
          <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden mt-1">
            <div
              className="h-full rounded-full"
              style={{ width: '75%', backgroundColor: palette.accent }}
            />
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-1">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Topics Mastered
          </span>
          <p className="text-xl sm:text-2xl font-extrabold text-slate-900">
            3 / 4 Topics
          </p>
          <span className="text-[10px] text-emerald-600 font-semibold">
            Unit 3 currently active
          </span>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-1">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Lessons Completed
          </span>
          <p className="text-xl sm:text-2xl font-extrabold text-slate-900">
            14 / 17
          </p>
          <span className="text-[10px] text-slate-500 font-medium">
            3 lessons remaining
          </span>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-1">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Diagnostic Baseline
          </span>
          <p className="text-xl sm:text-2xl font-extrabold text-emerald-600">
            94% Score
          </p>
          <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
            Verified Ready
          </span>
        </div>
      </section>

      {/* 4. LEARNING PATH ROADMAP: TOPICS -> LESSONS & ASSIGNMENTS */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            Curriculum Learning Path
          </h2>
          <p className="text-xs text-slate-500">
            Topics are organized sequentially. In each topic, complete the conceptual lessons and calibrated assignments to unlock mastery.
          </p>
        </div>

        <div className="space-y-5">
          {course.syllabus.map((unit, index) => {
            const isOpen = openTopics[unit.id] ?? false;

            // Partition unit items into Lessons and Assignments
            const lessonsList = unit.lessons.filter(
              (l) => l.type === 'reading' || l.type === 'video' || l.type === 'code'
            );
            const assignmentsList = unit.lessons.filter(
              (l) => l.type === 'diagnostic' || l.type === 'practice'
            );

            // Calculate mock status based on unit index for realistic demonstration
            const isCompleted = index < 2;
            const isInProgress = index === 2;
            const isLocked = index > 2;

            return (
              <div
                key={unit.id}
                className={`rounded-3xl border transition-all duration-200 bg-white shadow-sm overflow-hidden ${
                  isInProgress
                    ? 'border-slate-300 ring-2 ring-slate-200/80'
                    : 'border-slate-200/90'
                }`}
              >
                {/* Topic Header Bar */}
                <div
                  onClick={() => toggleTopic(unit.id)}
                  className="p-5 sm:p-6 cursor-pointer flex items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors select-none"
                >
                  <div className="flex items-start sm:items-center gap-3.5">
                    {/* Status Circle */}
                    <div
                      className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 font-mono text-xs font-bold ${
                        isCompleted
                          ? 'bg-emerald-100 text-emerald-800'
                          : isInProgress
                          ? 'bg-sky-100 text-sky-800 ring-2 ring-sky-300'
                          : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      ) : isLocked ? (
                        <Lock className="w-4 h-4 text-slate-400" />
                      ) : (
                        <span>{unit.unitNumber}</span>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          Topic {unit.unitNumber}
                        </span>
                        {isCompleted && (
                          <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                            Mastered
                          </span>
                        )}
                        {isInProgress && (
                          <span className="text-[10px] font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200/60 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
                            Current Topic
                          </span>
                        )}
                        {isLocked && (
                          <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
                            Prerequisite Required
                          </span>
                        )}
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-slate-900">
                        {unit.title}
                      </h3>

                      <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                        {unit.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="hidden sm:inline-block text-xs font-semibold text-slate-400">
                      {lessonsList.length} Lessons • {assignmentsList.length} Checkpoints
                    </span>
                    <button
                      className="p-1.5 rounded-xl hover:bg-slate-200/60 text-slate-400 transition-colors"
                      aria-label="Toggle Topic"
                    >
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Collapsible Content: Lessons & Assignments Partition */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="border-t border-slate-100 p-5 sm:p-6 bg-slate-50/40 space-y-6"
                    >
                      {/* Grid dividing Lessons and Assignments */}
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        {/* Column 1: Lessons (7 cols) */}
                        <div className="lg:col-span-7 space-y-3">
                          <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
                            <div className="flex items-center gap-2">
                              <BookOpen className="w-4 h-4" style={{ color: palette.accent }} />
                              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                                1. Conceptual Lessons ({lessonsList.length})
                              </h4>
                            </div>
                            <span className="text-[11px] text-slate-400 font-medium">
                              Interactive Theory &amp; Labs
                            </span>
                          </div>

                          <div className="space-y-2.5">
                            {lessonsList.map((lesson, idx) => {
                              const lessonCompleted = isCompleted || (isInProgress && idx === 0);
                              const isCurrent = isInProgress && idx === 1;

                              return (
                                <div
                                  key={lesson.id}
                                  className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                                    isCurrent
                                      ? 'bg-white border-amber-300 ring-2 ring-amber-200/60 shadow-xs'
                                      : lessonCompleted
                                      ? 'bg-white/80 border-slate-200/70'
                                      : 'bg-white/50 border-slate-200/50 opacity-70'
                                  }`}
                                >
                                  <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-xl bg-slate-100 text-slate-700 shrink-0">
                                      {getLessonIcon(lesson.type)}
                                    </div>
                                    <div>
                                      <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                          {getLessonTypeBadge(lesson.type)}
                                        </span>
                                        {lessonCompleted && (
                                          <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded">
                                            Done
                                          </span>
                                        )}
                                        {isCurrent && (
                                          <span className="text-[9px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.2 rounded">
                                            Up Next
                                          </span>
                                        )}
                                      </div>
                                      <h5 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                                        {lesson.title}
                                      </h5>
                                      <span className="text-[11px] text-slate-500">
                                        Estimated: {lesson.duration}
                                      </span>
                                    </div>
                                  </div>

                                  <div className="shrink-0">
                                    <Link
                                      href={`/dashboard/courses/${course.slug}/lessons/${lesson.id}`}
                                      className={`py-1.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs ${
                                        isCurrent
                                          ? 'text-white'
                                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                      }`}
                                      style={isCurrent ? { backgroundColor: palette.accent } : {}}
                                    >
                                      <span>{lessonCompleted ? 'Review' : 'Learn'}</span>
                                      <ArrowRight className="w-3 h-3" />
                                    </Link>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Column 2: Assignments & Checkpoints (5 cols) */}
                        <div className="lg:col-span-5 space-y-3">
                          <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
                            <div className="flex items-center gap-2">
                              <Sparkles className="w-4 h-4 text-amber-500" />
                              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                                2. Assignments ({assignmentsList.length})
                              </h4>
                            </div>
                            <span className="text-[11px] text-slate-400 font-medium">
                              Calibrated Mastery
                            </span>
                          </div>

                          <div className="space-y-2.5">
                            {assignmentsList.map((assignment, aIdx) => {
                              const assignCompleted = isCompleted || (isInProgress && aIdx === 0 && assignment.type === 'diagnostic');

                              return (
                                <div
                                  key={assignment.id}
                                  className={`p-3.5 rounded-2xl border transition-all flex flex-col justify-between gap-3 ${
                                    assignCompleted
                                      ? 'bg-white/80 border-slate-200/70'
                                      : isInProgress
                                      ? 'bg-white border-slate-300 shadow-xs'
                                      : 'bg-white/50 border-slate-200/50 opacity-60'
                                  }`}
                                >
                                  <div>
                                    <div className="flex items-center justify-between gap-2 mb-1">
                                      <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200/60">
                                        {getAssignmentBadge(assignment.type)}
                                      </span>
                                      <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                                        +100 XP
                                      </span>
                                    </div>

                                    <h5 className="text-xs font-bold text-slate-900 leading-snug">
                                      {assignment.title}
                                    </h5>
                                    <span className="text-[11px] text-slate-500">
                                      Duration: {assignment.duration}
                                    </span>
                                  </div>

                                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                                    <span className="text-[11px] font-semibold text-slate-500">
                                      {assignCompleted ? (
                                        <span className="text-emerald-600 flex items-center gap-1 font-bold">
                                          <CheckCircle2 className="w-3.5 h-3.5" />
                                          Completed (94%)
                                        </span>
                                      ) : (
                                        'Pending Assessment'
                                      )}
                                    </span>

                                    <Link
                                      href="/dashboard/practice"
                                      className="py-1 px-3 rounded-lg text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition-colors flex items-center gap-1"
                                    >
                                      <span>{assignCompleted ? 'Retake' : 'Attempt'}</span>
                                      <ArrowRight className="w-3 h-3" />
                                    </Link>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
