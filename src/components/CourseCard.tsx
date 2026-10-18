'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Clock, BookOpen, ArrowRight } from 'lucide-react';
import { Course } from '../types/course';
import { PaletteConfig, FontConfig } from '../types/theme';

interface CourseCardProps {
  course: Course;
  palette: PaletteConfig;
  font: FontConfig;
  onSelectCourse?: (slug: string) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  palette,
  font,
  onSelectCourse,
}) => {
  const router = useRouter();
  const [imgLoaded, setImgLoaded] = useState(false);

  const handleSelect = () => {
    if (onSelectCourse) {
      onSelectCourse(course.slug);
    } else {
      router.push(`/courses/${course.slug}`);
    }
  };

  // Level badge styling helper
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      whileHover={{ y: -5 }}
      onClick={handleSelect}
      className="group relative flex flex-col justify-between w-full rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-float transition-all duration-300 cursor-pointer overflow-hidden text-left"
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleSelect();
        }
      }}
    >
      {/* Top subtle theme accent bar on hover */}
      <div 
        className="absolute top-0 left-0 right-0 h-1 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ backgroundColor: palette.accent }}
      />

      {/* 1. Classic Inset Picture Frame with Curated Imagery */}
      <div className="p-3.5 pb-0">
        <div className="relative h-44 sm:h-48 w-full rounded-2xl overflow-hidden bg-slate-100">
          {/* Skeleton placeholder while image loads */}
          {!imgLoaded && (
            <div className="absolute inset-0 bg-slate-200 animate-pulse" />
          )}

          <img
            src={course.imageUrl}
            alt={course.title}
            onLoad={() => setImgLoaded(true)}
            className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
              imgLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Subtle cinematic gradient vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/15 to-transparent pointer-events-none" />

          {/* Top-Left Floating Badge: Course Code & Domain */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 backdrop-blur-md bg-white/95 px-2.5 py-1 rounded-xl shadow-xs border border-white/40">
            <span 
              className="font-mono text-xs font-extrabold"
              style={{ color: palette.accent }}
            >
              {course.code}
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-[11px] font-semibold text-ink uppercase tracking-wider">
              {course.category.split(' ')[0]}
            </span>
          </div>

          {/* Top-Right Floating Badge: Level */}
          <div className="absolute top-3 right-3 backdrop-blur-md bg-white/95 px-2.5 py-1 rounded-xl shadow-xs border border-white/40 flex items-center gap-1.5 text-xs font-semibold text-ink">
            <span className={`w-1.5 h-1.5 rounded-full ${levelStyle.dot}`} />
            <span>{course.level}</span>
          </div>
        </div>
      </div>

      {/* 2. Lower Card Body: Typography & Outcomes */}
      <div className="p-6 pt-5 flex flex-col justify-between flex-1">
        <div className="space-y-2">
          {/* Title */}
          <h3 className={`text-xl font-extrabold text-ink tracking-tight leading-snug line-clamp-2 ${font.displayClass}`}>
            {course.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-ink-muted line-clamp-2 leading-relaxed">
            {course.description}
          </p>
        </div>

        {/* 3. Streamlined Footer Strip */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs font-medium text-ink-muted">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {course.duration}
            </span>
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-slate-400" />
              {course.lessonsCount} Lessons
            </span>
          </div>

          <span 
            className="inline-flex items-center gap-1.5 text-xs font-bold transition-transform duration-200 group-hover:translate-x-1"
            style={{ color: palette.accent }}
          >
            <span>View Syllabus</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </motion.div>
  );
};
