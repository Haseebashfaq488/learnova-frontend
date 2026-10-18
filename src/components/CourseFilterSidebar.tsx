'use client';

import React from 'react';
import { Search, X, RotateCcw, Check, SlidersHorizontal } from 'lucide-react';
import { CourseCategory, CourseLevel, CourseFilterState } from '../types/course';
import { PaletteConfig, FontConfig } from '../types/theme';

interface CourseFilterSidebarProps {
  filterState: CourseFilterState;
  onChangeFilter: (newState: CourseFilterState) => void;
  palette: PaletteConfig;
  font: FontConfig;
  totalCoursesCount: number;
  filteredCoursesCount: number;
  categoryCounts: Record<string, number>;
  levelCounts: Record<string, number>;
  onCloseMobileDrawer?: () => void;
}

const CATEGORIES: CourseCategory[] = [
  'Core Computer Science',
  'Systems & Architecture',
  'Algorithms & Mathematics',
  'Data & AI',
  'Web & Software',
];

const LEVELS: CourseLevel[] = ['Foundational', 'Intermediate', 'Advanced'];

const DURATION_OPTIONS = [
  { id: 'short', label: '< 7 Weeks (Foundations)' },
  { id: 'comprehensive', label: '7+ Weeks (In-Depth)' },
];

export const CourseFilterSidebar: React.FC<CourseFilterSidebarProps> = ({
  filterState,
  onChangeFilter,
  palette,
  font,
  totalCoursesCount,
  filteredCoursesCount,
  categoryCounts,
  levelCounts,
  onCloseMobileDrawer,
}) => {
  const activeFiltersCount = 
    (filterState.search ? 1 : 0) +
    filterState.categories.length +
    filterState.levels.length +
    filterState.durations.length;

  const handleReset = () => {
    onChangeFilter({
      search: '',
      categories: [],
      levels: [],
      durations: [],
      sortBy: 'popular',
    });
  };

  const handleToggleCategory = (cat: CourseCategory) => {
    const exists = filterState.categories.includes(cat);
    const newCategories = exists
      ? filterState.categories.filter((c) => c !== cat)
      : [...filterState.categories, cat];
    onChangeFilter({ ...filterState, categories: newCategories });
  };

  const handleToggleLevel = (lvl: CourseLevel) => {
    const exists = filterState.levels.includes(lvl);
    const newLevels = exists
      ? filterState.levels.filter((l) => l !== lvl)
      : [...filterState.levels, lvl];
    onChangeFilter({ ...filterState, levels: newLevels });
  };

  const handleToggleDuration = (durId: string) => {
    const exists = filterState.durations.includes(durId);
    const newDurations = exists
      ? filterState.durations.filter((d) => d !== durId)
      : [...filterState.durations, durId];
    onChangeFilter({ ...filterState, durations: newDurations });
  };

  return (
    <aside className="w-full flex flex-col gap-6 text-left">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200/80">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4" style={{ color: palette.accent }} />
          <h2 className={`text-base font-bold text-ink tracking-tight ${font.displayClass}`}>
            Filters &amp; Refinements
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {activeFiltersCount > 0 && (
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-md text-ink-muted hover:text-ink hover:bg-slate-100 transition-colors"
              title="Reset all filters"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}

          {onCloseMobileDrawer && (
            <button
              onClick={onCloseMobileDrawer}
              className="md:hidden p-1.5 rounded-lg text-ink-muted hover:text-ink hover:bg-slate-100"
              aria-label="Close filters"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* 1. Keyword Search Filter */}
      <div className="space-y-2">
        <label htmlFor="course-search-input" className="text-xs font-bold uppercase tracking-wider text-ink-muted block">
          Search Curriculum
        </label>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            id="course-search-input"
            type="text"
            value={filterState.search}
            onChange={(e) => onChangeFilter({ ...filterState, search: e.target.value })}
            placeholder="Search topic, title, code..."
            className="w-full pl-9 pr-8 py-2.5 rounded-xl text-sm bg-white border border-slate-200/90 text-ink placeholder-slate-400 focus:outline-none focus:ring-2 transition-all"
            style={{
              outlineColor: palette.accent,
            }}
          />
          {filterState.search && (
            <button
              onClick={() => onChangeFilter({ ...filterState, search: '' })}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-ink"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 2. Categories Filter */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-ink-muted">
            Knowledge Domain
          </span>
          {filterState.categories.length > 0 && (
            <span 
              className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
              style={{ backgroundColor: palette.accentLight, color: palette.accent }}
            >
              {filterState.categories.length}
            </span>
          )}
        </div>

        <div className="space-y-1.5">
          {CATEGORIES.map((cat) => {
            const isChecked = filterState.categories.includes(cat);
            const count = categoryCounts[cat] || 0;
            return (
              <label
                key={cat}
                onClick={() => handleToggleCategory(cat)}
                className={`flex items-center justify-between p-2 rounded-xl text-xs font-medium cursor-pointer transition-colors ${
                  isChecked
                    ? 'bg-slate-100/90 text-ink font-semibold'
                    : 'text-ink-muted hover:bg-slate-50 hover:text-ink'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-4 h-4 rounded-md flex items-center justify-center border transition-all ${
                      isChecked
                        ? 'border-transparent text-white'
                        : 'border-slate-300 bg-white'
                    }`}
                    style={{
                      backgroundColor: isChecked ? palette.accent : undefined,
                    }}
                  >
                    {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <span>{cat}</span>
                </div>
                <span className="font-mono text-[11px] text-ink-subtle">
                  {count}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 3. Academic Level Filter */}
      <div className="space-y-3 pt-2 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-ink-muted">
            Proficiency Level
          </span>
          {filterState.levels.length > 0 && (
            <span 
              className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
              style={{ backgroundColor: palette.accentLight, color: palette.accent }}
            >
              {filterState.levels.length}
            </span>
          )}
        </div>

        <div className="space-y-1.5">
          {LEVELS.map((level) => {
            const isChecked = filterState.levels.includes(level);
            const count = levelCounts[level] || 0;
            return (
              <label
                key={level}
                onClick={() => handleToggleLevel(level)}
                className={`flex items-center justify-between p-2 rounded-xl text-xs font-medium cursor-pointer transition-colors ${
                  isChecked
                    ? 'bg-slate-100/90 text-ink font-semibold'
                    : 'text-ink-muted hover:bg-slate-50 hover:text-ink'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-4 h-4 rounded-md flex items-center justify-center border transition-all ${
                      isChecked
                        ? 'border-transparent text-white'
                        : 'border-slate-300 bg-white'
                    }`}
                    style={{
                      backgroundColor: isChecked ? palette.accent : undefined,
                    }}
                  >
                    {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <span>{level}</span>
                </div>
                <span className="font-mono text-[11px] text-ink-subtle">
                  {count}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 4. Duration Filter */}
      <div className="space-y-3 pt-2 border-t border-slate-100">
        <span className="text-xs font-bold uppercase tracking-wider text-ink-muted block">
          Pace &amp; Duration
        </span>

        <div className="space-y-1.5">
          {DURATION_OPTIONS.map((dur) => {
            const isChecked = filterState.durations.includes(dur.id);
            return (
              <label
                key={dur.id}
                onClick={() => handleToggleDuration(dur.id)}
                className={`flex items-center justify-between p-2 rounded-xl text-xs font-medium cursor-pointer transition-colors ${
                  isChecked
                    ? 'bg-slate-100/90 text-ink font-semibold'
                    : 'text-ink-muted hover:bg-slate-50 hover:text-ink'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-4 h-4 rounded-md flex items-center justify-center border transition-all ${
                      isChecked
                        ? 'border-transparent text-white'
                        : 'border-slate-300 bg-white'
                    }`}
                    style={{
                      backgroundColor: isChecked ? palette.accent : undefined,
                    }}
                  >
                    {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <span>{dur.label}</span>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* Matching summary card */}
      <div 
        className="mt-4 p-4 rounded-2xl border text-xs"
        style={{
          backgroundColor: palette.accentLight,
          borderColor: palette.accentBorder,
        }}
      >
        <div className="flex items-center justify-between font-semibold text-ink">
          <span>Active Courses:</span>
          <span className="font-mono font-bold" style={{ color: palette.accent }}>
            {filteredCoursesCount} / {totalCoursesCount}
          </span>
        </div>
        <p className="mt-1 text-[11px] text-ink-muted leading-relaxed">
          Courses calibrated by FAST-NUCES Computer Science curriculum specifications.
        </p>
      </div>
    </aside>
  );
};
