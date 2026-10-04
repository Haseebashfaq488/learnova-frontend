"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import {
  X,
  Star,
  Clock,
  BookOpen,
  Zap,
  CheckCircle2,
  Users,
  ShieldCheck,
  Award,
  ArrowRight,
  Sparkles,
  Layers,
  ChevronDown,
} from "lucide-react";
import { Button, Badge } from "@learnova/ui";
import { useEnrollment } from "../lib/enrollment-context";

export function CoursePreviewModal() {
  const {
    selectedPreviewCourse,
    closeCoursePreview,
    isEnrolled,
    enrollCourse,
  } = useEnrollment();

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeCoursePreview();
      }
    };
    if (selectedPreviewCourse) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedPreviewCourse, closeCoursePreview]);

  if (!selectedPreviewCourse) return null;

  const enrolled = isEnrolled(selectedPreviewCourse.id);

  const handleEnroll = () => {
    enrollCourse(selectedPreviewCourse.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="relative p-6 sm:p-8 bg-gradient-to-r from-[#0B2B53] to-slate-900 text-white shrink-0">
          <button
            onClick={closeCoursePreview}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge className="bg-[#00A8E8] text-[#0B2B53] font-bold text-xs uppercase px-2.5 py-0.5">
              {selectedPreviewCourse.category}
            </Badge>
            <Badge variant="outline" className="text-sky-200 border-sky-300/40 text-xs">
              {selectedPreviewCourse.level}
            </Badge>
            {selectedPreviewCourse.isFeatured && (
              <Badge className="bg-amber-400 text-amber-950 font-bold text-xs flex items-center gap-1">
                <Sparkles className="h-3 w-3" />
                Featured Course
              </Badge>
            )}
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
            {selectedPreviewCourse.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            {selectedPreviewCourse.description}
          </p>

          <div className="flex flex-wrap items-center gap-6 mt-6 pt-4 border-t border-white/10 text-xs sm:text-sm text-slate-200">
            <div className="flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="font-bold text-white">{selectedPreviewCourse.rating}</span>
              <span className="text-slate-400">({selectedPreviewCourse.reviewsCount} reviews)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="h-4 w-4 text-sky-400" />
              <span>{selectedPreviewCourse.enrolledCount.toLocaleString()} learners</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-sky-400" />
              <span>{selectedPreviewCourse.durationHours} hrs total</span>
            </div>
            <div className="flex items-center gap-1.5">
              <BookOpen className="h-4 w-4 text-sky-400" />
              <span>{selectedPreviewCourse.totalLessons} lessons</span>
            </div>
            {selectedPreviewCourse.interactiveLabsCount > 0 && (
              <div className="flex items-center gap-1.5 text-emerald-300 font-semibold">
                <Zap className="h-4 w-4 fill-emerald-300" />
                <span>{selectedPreviewCourse.interactiveLabsCount} interactive labs</span>
              </div>
            )}
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 divide-y divide-slate-100">
          {/* Instructor & Highlights */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6">
            <div className="flex items-center gap-3.5">
              <img
                src={selectedPreviewCourse.instructor.avatarUrl}
                alt={selectedPreviewCourse.instructor.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-sky-400 shadow-sm"
              />
              <div>
                <span className="text-[11px] uppercase font-bold text-slate-400">Course Instructor</span>
                <h4 className="text-sm font-bold text-[#0B2B53]">{selectedPreviewCourse.instructor.name}</h4>
                <p className="text-xs text-slate-500">
                  {selectedPreviewCourse.instructor.role} • {selectedPreviewCourse.instructor.organization}
                </p>
              </div>
            </div>

            {selectedPreviewCourse.prerequisites && selectedPreviewCourse.prerequisites.length > 0 && (
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 text-xs">
                <span className="font-bold text-slate-700 block mb-1">Prerequisites:</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedPreviewCourse.prerequisites.map((p, idx) => (
                    <span key={idx} className="bg-white px-2 py-0.5 rounded-md text-slate-600 border border-slate-200">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* What You'll Master */}
          <div className="pt-6 space-y-4">
            <h3 className="text-base font-bold text-[#0B2B53] flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-[#00A8E8]" />
              <span>What You Will Master</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {selectedPreviewCourse.learningOutcomes.map((outcome, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3.5 rounded-xl bg-sky-50/50 border border-sky-100 text-xs text-slate-700 leading-relaxed"
                >
                  <CheckCircle2 className="h-4 w-4 text-sky-600 shrink-0 mt-0.5" />
                  <span>{outcome}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Curriculum / Syllabus Roadmap */}
          <div className="pt-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-[#0B2B53] flex items-center gap-2">
                <Layers className="h-5 w-5 text-[#00A8E8]" />
                <span>Course Syllabus Roadmap ({selectedPreviewCourse.syllabus.length} Units)</span>
              </h3>
              <span className="text-xs text-slate-500 font-medium">
                {selectedPreviewCourse.totalLessons} Total Lessons
              </span>
            </div>

            <div className="space-y-3">
              {selectedPreviewCourse.syllabus.map((unit) => (
                <div
                  key={unit.unitNumber}
                  className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-md bg-[#0B2B53] text-white text-xs font-bold flex items-center justify-center">
                        {unit.unitNumber}
                      </span>
                      <h4 className="text-sm font-bold text-[#0B2B53]">{unit.title}</h4>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span>{unit.lessonsCount} lessons</span>
                      <span>•</span>
                      <span>{unit.durationHours} hrs</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 mb-3 pl-8.5">{unit.description}</p>
                  <div className="flex flex-wrap gap-1.5 pl-8.5">
                    {unit.keyTopics.map((topic, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Sticky Action Footer */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <div className="text-xs text-slate-500">
            {enrolled ? (
              <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                You are enrolled in this course
              </span>
            ) : (
              <span>Full lifetime access • Verified certificate included • Self-paced</span>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button
              variant="outline"
              onClick={closeCoursePreview}
              className="flex-1 sm:flex-none border-slate-300 text-slate-700 hover:bg-slate-100"
            >
              Close
            </Button>

            {enrolled ? (
              <Link href={`/courses/${selectedPreviewCourse.id}/learning-path`} className="flex-1 sm:flex-none">
                <Button
                  onClick={closeCoursePreview}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center justify-center gap-2"
                >
                  <span>Go to Learning Path</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            ) : (
              <Button
                onClick={handleEnroll}
                className="flex-1 sm:flex-none bg-[#00A8E8] hover:bg-sky-500 text-white font-bold shadow-md shadow-sky-500/20 flex items-center justify-center gap-2"
              >
                <Sparkles className="h-4 w-4" />
                <span>Enroll in Course</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
