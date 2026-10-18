'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Compass, 
  SlidersHorizontal, 
  ArrowUpDown, 
  X, 
  ArrowLeft,
  SearchX
} from 'lucide-react';
import { coursesData } from '../data/coursesData';
import { CourseFilterState } from '../types/course';
import { PaletteConfig, FontConfig } from '../types/theme';
import { CourseCard } from './CourseCard';
import { CourseFilterSidebar } from './CourseFilterSidebar';

interface CoursesPageProps {
  palette: PaletteConfig;
  font: FontConfig;
  onNavigateHome?: () => void;
  onSelectCourse?: (slug: string) => void;
}

export const CoursesPage: React.FC<CoursesPageProps> = ({
  palette,
  font,
  onNavigateHome,
  onSelectCourse,
}) => {
  const router = useRouter();
  const handleHome = onNavigateHome || (() => router.push('/'));
  const handleSelect = onSelectCourse || ((slug: string) => router.push(`/courses/${slug}`));
  const [filterState, setFilterState] = useState<CourseFilterState>({
    search: '',
    categories: [],
    levels: [],
    durations: [],
    sortBy: 'popular',
  });

  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Compute category & level counts across all courses
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    coursesData.forEach((c) => {
      counts[c.category] = (counts[c.category] || 0) + 1;
    });
    return counts;
  }, []);

  const levelCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    coursesData.forEach((c) => {
      counts[c.level] = (counts[c.level] || 0) + 1;
    });
    return counts;
  }, []);

  // Filter & sort logic
  const filteredCourses = useMemo(() => {
    return coursesData
      .filter((course) => {
        // Keyword Search
        if (filterState.search.trim()) {
          const q = filterState.search.toLowerCase();
          const matchCode = course.code.toLowerCase().includes(q);
          const matchTitle = course.title.toLowerCase().includes(q);
          const matchDesc = course.description.toLowerCase().includes(q);
          const matchTags = course.tags.some((t) => t.toLowerCase().includes(q));
          if (!matchCode && !matchTitle && !matchDesc && !matchTags) {
            return false;
          }
        }

        // Category Filter
        if (
          filterState.categories.length > 0 &&
          !filterState.categories.includes(course.category)
        ) {
          return false;
        }

        // Level Filter
        if (
          filterState.levels.length > 0 &&
          !filterState.levels.includes(course.level)
        ) {
          return false;
        }

        // Duration Filter
        if (filterState.durations.length > 0) {
          const weeks = parseInt(course.duration.split(' ')[0], 10) || 6;
          const matchShort = filterState.durations.includes('short') && weeks < 7;
          const matchLong = filterState.durations.includes('comprehensive') && weeks >= 7;
          if (!matchShort && !matchLong) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (filterState.sortBy === 'popular') {
          return b.rating - a.rating;
        }
        if (filterState.sortBy === 'duration-asc') {
          return parseInt(a.duration, 10) - parseInt(b.duration, 10);
        }
        if (filterState.sortBy === 'duration-desc') {
          return parseInt(b.duration, 10) - parseInt(a.duration, 10);
        }
        if (filterState.sortBy === 'level') {
          const rank = { Foundational: 1, Intermediate: 2, Advanced: 3 };
          return rank[a.level] - rank[b.level];
        }
        return 0;
      });
  }, [filterState]);

  const activeFiltersCount = 
    (filterState.search ? 1 : 0) +
    filterState.categories.length +
    filterState.levels.length +
    filterState.durations.length;

  return (
    <div className="pt-28 pb-24 px-4 sm:px-8 lg:px-12 min-h-screen">
      <div className="max-w-screen-2xl mx-auto">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200/60">
          <button
            onClick={handleHome}
            className="inline-flex items-center gap-2 text-xs font-semibold text-ink-muted hover:text-ink transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            <span>Back to Home</span>
          </button>

          <div className="flex items-center gap-2 text-xs text-ink-subtle">
            <span className="hover:underline cursor-pointer" onClick={handleHome}>Home</span>
            <span>/</span>
            <span className="font-semibold text-ink">Browse Courses</span>
          </div>
        </div>

        {/* Page Header */}
        <div className="max-w-3xl mb-12 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-2xs text-xs font-semibold text-ink-muted mb-4">
            <Compass className="w-3.5 h-3.5" style={{ color: palette.accent }} />
            <span>Academic Curriculum Catalog</span>
          </div>

          <h1 className={`text-3xl sm:text-5xl font-extrabold text-ink tracking-tight ${font.displayClass}`}>
            Courses shaped around your personal mastery.
          </h1>

          <p className="mt-3 text-base sm:text-lg text-ink-muted leading-relaxed">
            Every course features calibrated diagnostic baselines, explicit prerequisite graphs, interactive syllabus units, and contextual AI scaffolding.
          </p>
        </div>

        {/* Main Content Layout: Left Sidebar + Right Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Desktop Left-Side Filter Sidebar (Sticky) */}
          <div className="hidden lg:block lg:col-span-4 xl:col-span-3 sticky top-28 bg-white/90 backdrop-blur-md p-6 rounded-3xl border border-slate-200/90 shadow-sm">
            <CourseFilterSidebar
              filterState={filterState}
              onChangeFilter={setFilterState}
              palette={palette}
              font={font}
              totalCoursesCount={coursesData.length}
              filteredCoursesCount={filteredCourses.length}
              categoryCounts={categoryCounts}
              levelCounts={levelCounts}
            />
          </div>

          {/* Right-Side Course Grid Viewport */}
          <div className="lg:col-span-8 xl:col-span-9 flex flex-col gap-6">
            
            {/* Top Toolbar: Active Filters, Mobile Drawer Trigger, Sort */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white/80 border border-slate-200/80 shadow-2xs">
              
              <div className="flex items-center gap-3">
                {/* Mobile Filter Button */}
                <button
                  onClick={() => setMobileDrawerOpen(true)}
                  className="lg:hidden inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-white border border-slate-200 shadow-2xs text-ink"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" style={{ color: palette.accent }} />
                  <span>Filters</span>
                  {activeFiltersCount > 0 && (
                    <span 
                      className="w-4 h-4 rounded-full text-[10px] text-white flex items-center justify-center font-bold"
                      style={{ backgroundColor: palette.accent }}
                    >
                      {activeFiltersCount}
                    </span>
                  )}
                </button>

                {/* Courses Count */}
                <div className="text-xs font-medium text-ink-muted">
                  Showing <strong className="text-ink font-bold">{filteredCourses.length}</strong> of{' '}
                  <strong className="text-ink font-bold">{coursesData.length}</strong> published courses
                </div>
              </div>

              {/* Sort Selector */}
              <div className="flex items-center gap-2">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-xs text-ink-muted font-medium">Sort:</span>
                <select
                  value={filterState.sortBy}
                  onChange={(e) =>
                    setFilterState({
                      ...filterState,
                      sortBy: e.target.value as CourseFilterState['sortBy'],
                    })
                  }
                  className="text-xs font-semibold bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-ink focus:outline-none focus:ring-1"
                  style={{ outlineColor: palette.accent }}
                >
                  <option value="popular">Most Popular &amp; Rated</option>
                  <option value="level">Proficiency Level</option>
                  <option value="duration-asc">Duration (Shorter first)</option>
                  <option value="duration-desc">Duration (Longer first)</option>
                </select>
              </div>
            </div>

            {/* Active Filter Chips Bar */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-ink-muted mr-1">Active filters:</span>
                
                {filterState.search && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs bg-white border border-slate-200 text-ink shadow-2xs">
                    <span>"{filterState.search}"</span>
                    <button onClick={() => setFilterState({ ...filterState, search: '' })}>
                      <X className="w-3 h-3 text-slate-400 hover:text-ink" />
                    </button>
                  </span>
                )}

                {filterState.categories.map((cat) => (
                  <span 
                    key={cat} 
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs bg-white border border-slate-200 text-ink shadow-2xs"
                  >
                    <span>{cat}</span>
                    <button
                      onClick={() =>
                        setFilterState({
                          ...filterState,
                          categories: filterState.categories.filter((c) => c !== cat),
                        })
                      }
                    >
                      <X className="w-3 h-3 text-slate-400 hover:text-ink" />
                    </button>
                  </span>
                ))}

                {filterState.levels.map((lvl) => (
                  <span 
                    key={lvl} 
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs bg-white border border-slate-200 text-ink shadow-2xs"
                  >
                    <span>Level: {lvl}</span>
                    <button
                      onClick={() =>
                        setFilterState({
                          ...filterState,
                          levels: filterState.levels.filter((l) => l !== lvl),
                        })
                      }
                    >
                      <X className="w-3 h-3 text-slate-400 hover:text-ink" />
                    </button>
                  </span>
                ))}

                {filterState.durations.map((dur) => (
                  <span 
                    key={dur} 
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs bg-white border border-slate-200 text-ink shadow-2xs"
                  >
                    <span>{dur === 'short' ? '< 7 Weeks' : '7+ Weeks'}</span>
                    <button
                      onClick={() =>
                        setFilterState({
                          ...filterState,
                          durations: filterState.durations.filter((d) => d !== dur),
                        })
                      }
                    >
                      <X className="w-3 h-3 text-slate-400 hover:text-ink" />
                    </button>
                  </span>
                ))}

                <button
                  onClick={() =>
                    setFilterState({
                      search: '',
                      categories: [],
                      levels: [],
                      durations: [],
                      sortBy: 'popular',
                    })
                  }
                  className="text-xs font-semibold text-ink-muted hover:text-ink underline ml-2"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Courses Cards Grid */}
            <AnimatePresence>
              {filteredCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredCourses.map((course) => (
                    <CourseCard
                      key={course.id}
                      course={course}
                      palette={palette}
                      font={font}
                      onSelectCourse={handleSelect}
                    />
                  ))}
                </div>
              ) : (
                /* Empty Search State */
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="p-12 text-center rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col items-center justify-center my-8"
                >
                  <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
                    <SearchX className="w-7 h-7" />
                  </div>
                  <h3 className={`text-xl font-bold text-ink ${font.displayClass}`}>
                    No matching courses found
                  </h3>
                  <p className="mt-2 text-sm text-ink-muted max-w-sm">
                    We couldn't find any courses matching your specific search query or active filter selections.
                  </p>
                  <button
                    onClick={() =>
                      setFilterState({
                        search: '',
                        categories: [],
                        levels: [],
                        durations: [],
                        sortBy: 'popular',
                      })
                    }
                    className="mt-6 px-5 py-2.5 rounded-xl text-white text-xs font-bold shadow-sm hover:shadow transition-all"
                    style={{ backgroundColor: palette.accent }}
                  >
                    Reset All Filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile Filters Slide-Over Drawer */}
      <AnimatePresence>
        {mobileDrawerOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileDrawerOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
            />

            {/* Drawer Panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 280 }}
              className="relative w-full max-w-sm bg-white h-full shadow-2xl p-6 overflow-y-auto flex flex-col"
            >
              <CourseFilterSidebar
                filterState={filterState}
                onChangeFilter={setFilterState}
                palette={palette}
                font={font}
                totalCoursesCount={coursesData.length}
                filteredCoursesCount={filteredCourses.length}
                categoryCounts={categoryCounts}
                levelCounts={levelCounts}
                onCloseMobileDrawer={() => setMobileDrawerOpen(false)}
              />
              <div className="mt-6 pt-4 border-t border-slate-100">
                <button
                  onClick={() => setMobileDrawerOpen(false)}
                  className="w-full py-3 rounded-xl text-white text-sm font-bold shadow-sm"
                  style={{ backgroundColor: palette.accent }}
                >
                  Apply &amp; View {filteredCourses.length} Courses
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
