'use client';

import React, { useRef, useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Compass, Sparkles } from 'lucide-react';
import { coursesData } from '../data/coursesData';
import { PaletteConfig, FontConfig } from '../types/theme';
import { CourseCard } from './CourseCard';

interface CourseCarouselProps {
  palette: PaletteConfig;
  font: FontConfig;
  onNavigateToCourses: () => void;
  onSelectCourse: (slug: string) => void;
}

export const CourseCarousel: React.FC<CourseCarouselProps> = ({
  palette,
  font,
  onNavigateToCourses,
  onSelectCourse,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollability = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollability();
    window.addEventListener('resize', checkScrollability);
    return () => window.removeEventListener('resize', checkScrollability);
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const cardWidth = 380;
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="browse-courses" className="py-24 sm:py-32 px-4 sm:px-8 lg:px-12 relative border-t border-slate-200/50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-xs font-semibold text-ink-muted mb-4">
              <Compass className="w-3.5 h-3.5" style={{ color: palette.accent }} />
              <span>Curated Learning Pathways</span>
            </div>
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight ${font.displayClass}`}>
              Explore courses with real-time mastery.
            </h2>
            <p className="mt-3 text-ink-muted text-base leading-relaxed">
              Every course connects to Learnova's adaptive diagnostic engine, prerequisite DAG validator, and contextual AI support.
            </p>
          </div>

          {/* Action Row: Carousel Controls & Link to All Courses */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onNavigateToCourses}
              className="inline-flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl border border-slate-200/90 bg-white hover:bg-slate-50 transition-colors shadow-2xs text-ink mr-2"
            >
              <span>View All 6 Courses</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Left Scroll Button */}
            <button
              onClick={() => handleScroll('left')}
              disabled={!canScrollLeft}
              className={`p-2.5 rounded-xl border border-slate-200 bg-white shadow-2xs transition-all ${
                canScrollLeft
                  ? 'text-ink hover:bg-slate-50 hover:border-slate-300'
                  : 'text-slate-300 cursor-not-allowed opacity-50'
              }`}
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Right Scroll Button */}
            <button
              onClick={() => handleScroll('right')}
              disabled={!canScrollRight}
              className={`p-2.5 rounded-xl border border-slate-200 bg-white shadow-2xs transition-all ${
                canScrollRight
                  ? 'text-ink hover:bg-slate-50 hover:border-slate-300'
                  : 'text-slate-300 cursor-not-allowed opacity-50'
              }`}
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Carousel Track */}
        <div
          ref={scrollContainerRef}
          onScroll={checkScrollability}
          className="flex gap-6 overflow-x-auto pb-8 pt-2 scroll-smooth no-scrollbar snap-x snap-mandatory"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {coursesData.map((course) => (
            <div
              key={course.id}
              className="w-[310px] sm:w-[380px] lg:w-[400px] shrink-0 snap-start flex"
            >
              <CourseCard
                course={course}
                palette={palette}
                font={font}
                onSelectCourse={onSelectCourse}
              />
            </div>
          ))}
        </div>

        {/* Carousel Bottom Indicator / Prompt */}
        <div className="mt-4 flex items-center justify-between text-xs text-ink-subtle">
          <span className="flex items-center gap-1.5 font-medium">
            <Sparkles className="w-3.5 h-3.5" style={{ color: palette.accent }} />
            <span>Drag or click arrows to explore courses</span>
          </span>

          <button
            onClick={onNavigateToCourses}
            className="font-bold hover:underline transition-colors flex items-center gap-1"
            style={{ color: palette.accent }}
          >
            <span>Browse complete syllabus catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
