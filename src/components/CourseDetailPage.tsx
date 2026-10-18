'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Clock, 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  FileText, 
  Video, 
  Code2, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  Star,
  LayoutDashboard
} from 'lucide-react';
import { Course, LessonType } from '../types/course';
import { PaletteConfig, FontConfig } from '../types/theme';
import { useAuth } from '../context/AuthContext';

interface CourseDetailPageProps {
  course: Course;
  palette: PaletteConfig;
  font: FontConfig;
  onBackToCourses?: () => void;
  onNavigateHome?: () => void;
}

export const CourseDetailPage: React.FC<CourseDetailPageProps> = ({
  course,
  palette,
  font,
  onBackToCourses,
  onNavigateHome,
}) => {
  const router = useRouter();
  const { isAuthenticated, loginAsDemo } = useAuth();
  const handleBack = onBackToCourses || (() => router.push('/courses'));
  const handleHome = onNavigateHome || (() => router.push('/'));

  // Accordion open units state
  const [openUnits, setOpenUnits] = useState<Record<string, boolean>>({
    [course.syllabus[0]?.id || 'unit-1']: true,
  });

  const toggleUnit = (unitId: string) => {
    setOpenUnits((prev) => ({
      ...prev,
      [unitId]: !prev[unitId],
    }));
  };

  const getLevelBadge = (level: Course['level']) => {
    switch (level) {
      case 'Foundational':
        return {
          bg: 'bg-emerald-50 text-emerald-800 border-emerald-200/60',
          dot: 'bg-emerald-500',
        };
      case 'Intermediate':
        return {
          bg: 'bg-sky-50 text-sky-800 border-sky-200/60',
          dot: 'bg-sky-500',
        };
      case 'Advanced':
        return {
          bg: 'bg-amber-50 text-amber-900 border-amber-200/60',
          dot: 'bg-amber-500',
        };
    }
  };

  const levelStyle = getLevelBadge(course.level);

  const getLessonIcon = (type: LessonType) => {
    switch (type) {
      case 'video':
        return <Video className="w-3.5 h-3.5 text-blue-500" />;
      case 'code':
        return <Code2 className="w-3.5 h-3.5 text-emerald-500" />;
      case 'diagnostic':
        return <HelpCircle className="w-3.5 h-3.5 text-purple-500" />;
      case 'practice':
        return <Sparkles className="w-3.5 h-3.5 text-amber-500" />;
      case 'reading':
      default:
        return <FileText className="w-3.5 h-3.5 text-slate-500" />;
    }
  };

  const getLessonBadgeLabel = (type: LessonType) => {
    switch (type) {
      case 'video':
        return 'Lecture';
      case 'code':
        return 'Interactive Lab';
      case 'diagnostic':
        return 'Diagnostic Baseline';
      case 'practice':
        return 'Calibrated Practice';
      case 'reading':
      default:
        return 'Reading & Notes';
    }
  };

  return (
    <div className="pt-28 pb-28 px-4 sm:px-8 lg:px-12 min-h-screen text-left">
      <div className="max-w-screen-2xl mx-auto">
        
        {/* Navigation Breadcrumb Bar */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200/60">
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-xs font-semibold text-ink-muted hover:text-ink transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            <span>Back to All Courses</span>
          </button>

          <div className="flex items-center gap-2 text-xs text-ink-subtle">
            <span className="hover:underline cursor-pointer" onClick={handleHome}>Home</span>
            <span>/</span>
            <span className="hover:underline cursor-pointer" onClick={handleBack}>Courses</span>
            <span>/</span>
            <span className="font-semibold text-ink truncate max-w-[200px]">{course.code}</span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* ================= LEFT MAIN COLUMN: Detailed Information ================= */}
          <div className="lg:col-span-8 flex flex-col gap-10">
            
            {/* Header Area - Clean, professional, uncluttered */}
            <div>
              {/* Ultra-clean eyebrow with Course Code and Category */}
              <div className="flex items-center gap-2.5 mb-4">
                <span 
                  className="font-mono text-xs font-extrabold px-3 py-1 rounded-lg"
                  style={{ backgroundColor: palette.accentLight, color: palette.accent }}
                >
                  {course.code}
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-ink-muted">
                  {course.category}
                </span>
              </div>

              {/* Bold Title */}
              <h1 className={`text-3xl sm:text-5xl font-extrabold text-ink tracking-tight leading-[1.12] ${font.displayClass}`}>
                {course.title}
              </h1>

              {/* Description */}
              <p className="mt-4 text-base sm:text-lg text-ink-muted leading-relaxed">
                {course.longDescription}
              </p>

              {/* High-Signal Stats Strip */}
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
                <div className="flex flex-col">
                  <span className="text-[11px] uppercase tracking-wider text-ink-subtle font-semibold">Duration</span>
                  <span className="text-sm font-bold text-ink flex items-center gap-1.5 mt-0.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {course.duration}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] uppercase tracking-wider text-ink-subtle font-semibold">Total Hours</span>
                  <span className="text-sm font-bold text-ink mt-0.5">
                    {course.estimatedHours}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] uppercase tracking-wider text-ink-subtle font-semibold">Curriculum</span>
                  <span className="text-sm font-bold text-ink flex items-center gap-1.5 mt-0.5">
                    <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                    {course.lessonsCount} Lessons
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] uppercase tracking-wider text-ink-subtle font-semibold">Practice Items</span>
                  <span className="text-sm font-bold text-ink flex items-center gap-1.5 mt-0.5">
                    <Sparkles className="w-3.5 h-3.5 text-slate-400" />
                    {course.practicesCount} Adaptive
                  </span>
                </div>
              </div>
            </div>

            {/* What You Will Learn Section - Sleek Card Grid */}
            <div className="space-y-4">
              <div>
                <h2 className={`text-2xl font-bold text-ink tracking-tight ${font.displayClass}`}>
                  What you will learn &amp; master
                </h2>
                <p className="text-xs text-ink-muted mt-1">
                  Core competencies and topic mastery milestones calibrated for this curriculum.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {course.whatYouWillLearn.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-subtle transition-all duration-200 flex items-start gap-3.5 text-left"
                  >
                    <span 
                      className="font-mono text-xs font-extrabold px-2 py-0.5 rounded-md shrink-0 mt-0.5"
                      style={{ 
                        backgroundColor: palette.accentLight, 
                        color: palette.accent 
                      }}
                    >
                      0{idx + 1}
                    </span>
                    <p className="text-xs sm:text-sm font-medium text-ink-muted leading-relaxed">
                      {item}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Course Syllabus & Units Breakdown */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className={`text-2xl font-bold text-ink tracking-tight ${font.displayClass}`}>
                    Course Syllabus &amp; Learning Units
                  </h2>
                  <p className="text-xs text-ink-muted mt-1">
                    {course.syllabus.length} Units • {course.lessonsCount} Structured Lessons • Calibrated Question Bank
                  </p>
                </div>

                <button
                  onClick={() => {
                    const allOpen = Object.values(openUnits).every(Boolean);
                    const next: Record<string, boolean> = {};
                    course.syllabus.forEach((u) => {
                      next[u.id] = !allOpen;
                    });
                    setOpenUnits(next);
                  }}
                  className="text-xs font-semibold text-ink-muted hover:text-ink transition-colors"
                >
                  {Object.values(openUnits).every(Boolean) ? 'Collapse all' : 'Expand all'}
                </button>
              </div>

              {/* Units Accordion */}
              <div className="space-y-3">
                {course.syllabus.map((unit) => {
                  const isOpen = !!openUnits[unit.id];
                  return (
                    <div
                      key={unit.id}
                      className="rounded-2xl bg-white border border-slate-200/90 shadow-2xs overflow-hidden transition-all"
                    >
                      {/* Unit Header Button */}
                      <button
                        onClick={() => toggleUnit(unit.id)}
                        className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <span 
                            className="font-mono text-xs font-bold px-2.5 py-1 rounded-md shrink-0"
                            style={{ backgroundColor: palette.accentLight, color: palette.accent }}
                          >
                            Unit 0{unit.unitNumber}
                          </span>
                          <div>
                            <h3 className="text-base font-bold text-ink">
                              {unit.title}
                            </h3>
                            <p className="text-xs text-ink-muted mt-0.5 line-clamp-1">
                              {unit.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <span className="text-xs font-mono text-ink-subtle hidden sm:inline">
                            {unit.lessons.length} Lessons
                          </span>
                          {isOpen ? (
                            <ChevronUp className="w-4 h-4 text-slate-400" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-slate-400" />
                          )}
                        </div>
                      </button>

                      {/* Lessons List Viewport */}
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="border-t border-slate-100 bg-slate-50/40 divide-y divide-slate-100/90"
                          >
                            {unit.lessons.map((lesson, idx) => (
                              <div
                                key={lesson.id}
                                className="p-4 sm:px-6 flex items-center justify-between gap-3 text-xs"
                              >
                                <div className="flex items-center gap-3 min-w-0">
                                  <div className="p-1.5 rounded-lg bg-white border border-slate-200 shadow-2xs shrink-0">
                                    {getLessonIcon(lesson.type)}
                                  </div>
                                  <div className="truncate">
                                    <span className="font-semibold text-ink">
                                      {idx + 1}. {lesson.title}
                                    </span>
                                  </div>
                                </div>

                                <div className="flex items-center gap-3 shrink-0">
                                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-ink-muted hidden sm:inline">
                                    {getLessonBadgeLabel(lesson.type)}
                                  </span>
                                  <span className="font-mono text-ink-subtle">
                                    {lesson.duration}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Instructor Profile Card */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex items-center gap-5">
              <div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-extrabold text-white shadow-xs shrink-0"
                style={{ backgroundColor: palette.accent }}
              >
                {course.instructor.avatarText}
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold uppercase tracking-wider text-ink-subtle">
                  Curriculum Lead &amp; Instructor
                </span>
                <h3 className="text-lg font-bold text-ink">
                  {course.instructor.name}
                </h3>
                <p className="text-xs text-ink-muted mt-0.5">
                  {course.instructor.title} • {course.instructor.department}
                </p>
              </div>
            </div>
          </div>

          {/* ================= RIGHT STICKY COLUMN: Enrollment Action Desk with Level & Rating ================= */}
          <div className="lg:col-span-4 sticky top-28 space-y-6">
            
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-float space-y-6">
              
              {/* Level & Rating Top Header Row */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${levelStyle.bg}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${levelStyle.dot}`} />
                  <span>{course.level} Level</span>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-bold text-ink bg-slate-50 border border-slate-200/70 px-2.5 py-1 rounded-xl">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{course.rating}</span>
                  <span className="text-slate-300">|</span>
                  <span className="text-[11px] text-ink-muted font-normal">{course.studentsEnrolled}</span>
                </div>
              </div>

              {/* Course Thumbnail Image */}
              <div className="relative h-40 w-full rounded-2xl overflow-hidden bg-slate-100 shadow-2xs border border-slate-200/60">
                <img
                  src={course.imageUrl}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Pricing & Free Pilot Banner */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono uppercase tracking-wider text-ink-subtle">
                    Course Pilot
                  </span>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
                    Active
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-ink">
                  100% Free
                </div>
                <p className="text-xs text-ink-muted mt-1">
                  Academic pilot sponsored by Department of Computer Science, FAST-NUCES.
                </p>
              </div>

              {/* Primary Enrollment CTA Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  if (!isAuthenticated) {
                    loginAsDemo();
                  }
                  router.push('/dashboard');
                }}
                className="w-full py-3.5 px-6 rounded-2xl text-white text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group relative overflow-hidden cursor-pointer"
                style={{ backgroundColor: palette.accent }}
              >
                <LayoutDashboard className="w-4 h-4 relative z-10" />
                <span className="relative z-10">
                  {isAuthenticated ? 'Resume Course in Student Hub' : 'Enroll & Launch Student Portal'}
                </span>
                <Sparkles className="w-4 h-4 relative z-10 transition-transform group-hover:rotate-12" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"
                />
              </motion.button>

              <button
                onClick={() => alert(`Syllabus PDF generated for ${course.code}.`)}
                className="w-full py-2.5 px-4 rounded-xl border border-slate-200 text-xs font-semibold text-ink hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Download Complete Syllabus (.PDF)
              </button>

              {/* Course Features Invariant Checklist */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-ink-muted block">
                  Course Invariants:
                </span>
                
                <div className="flex items-center gap-2.5 text-xs text-ink-muted">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Calibrated diagnostic on day one</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-ink-muted">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Teacher-approved AI worked analogies</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-ink-muted">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Prerequisite: {course.prerequisites[0]}</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-ink-muted">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Decoupled XP (0% artificial grade inflation)</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-ink-muted">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Official Mastery Credential upon completion</span>
                </div>
              </div>

              {/* Academic Integrity Tag */}
              <div 
                className="p-3.5 rounded-xl border text-[11px] leading-relaxed"
                style={{
                  backgroundColor: palette.accentLight,
                  borderColor: palette.accentBorder,
                }}
              >
                <div className="flex items-center gap-1.5 font-bold text-ink mb-0.5">
                  <ShieldCheck className="w-3.5 h-3.5" style={{ color: palette.accent }} />
                  <span>FAST-NUCES FYP Specification</span>
                </div>
                <span className="text-ink-muted">
                  Mastery recalculation executes upon complete assessment submission.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
