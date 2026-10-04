"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  AppHeader,
  Sidebar,
  Button,
  Badge,
  Input,
  studentNavBranches,
} from "@learnova/ui";
import {
  Search,
  SlidersHorizontal,
  Star,
  Clock,
  BookOpen,
  Zap,
  CheckCircle2,
  Users,
  Sparkles,
  ArrowRight,
  Filter,
  X,
  Layers,
  GraduationCap,
  Flame,
  Award,
  BookMarked,
} from "lucide-react";
import { useEnrollment } from "../../lib/enrollment-context";
import { CatalogCourse } from "@learnova/types";

const CATEGORIES = [
  "All Categories",
  "Physics & STEM",
  "Computer Science & AI",
  "UI/UX Design",
  "Mathematics",
  "Life Sciences",
  "Data & Economics",
  "Computer Science & Security",
];

const LEVELS = ["All Levels", "Beginner", "Intermediate", "Advanced", "AP Prep"];

export default function ExploreCoursesPage() {
  const {
    catalogCourses,
    enrolledCourses,
    isEnrolled,
    enrollCourse,
    openCoursePreview,
  } = useEnrollment();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");
  const [sortBy, setSortBy] = useState<"popular" | "rating" | "duration-asc" | "duration-desc">("popular");
  const [enrollFilter, setEnrollFilter] = useState<"all" | "unenrolled" | "enrolled">("all");

  // Filter & sort logic
  const filteredCourses = useMemo(() => {
    return catalogCourses
      .filter((course) => {
        // Search query filter (matches title, description, instructor, tags, key topics)
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          const matchTitle = course.title.toLowerCase().includes(query);
          const matchSubtitle = course.subtitle.toLowerCase().includes(query);
          const matchDesc = course.description.toLowerCase().includes(query);
          const matchInstructor = course.instructor.name.toLowerCase().includes(query);
          const matchTags = course.tags.some((t) => t.toLowerCase().includes(query));
          const matchCategory = course.category.toLowerCase().includes(query);
          if (!matchTitle && !matchSubtitle && !matchDesc && !matchInstructor && !matchTags && !matchCategory) {
            return false;
          }
        }

        // Category filter
        if (selectedCategory !== "All Categories" && course.category !== selectedCategory) {
          return false;
        }

        // Level filter
        if (selectedLevel !== "All Levels" && course.level !== selectedLevel) {
          return false;
        }

        // Enrollment status filter
        const enrolled = isEnrolled(course.id);
        if (enrollFilter === "unenrolled" && enrolled) return false;
        if (enrollFilter === "enrolled" && !enrolled) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "popular") return b.enrolledCount - a.enrolledCount;
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "duration-asc") return a.durationHours - b.durationHours;
        if (sortBy === "duration-desc") return b.durationHours - a.durationHours;
        return 0;
      });
  }, [catalogCourses, searchQuery, selectedCategory, selectedLevel, sortBy, enrollFilter, isEnrolled]);

  const featuredCourse = useMemo(() => {
    return catalogCourses.find((c) => c.isFeatured && !isEnrolled(c.id)) || catalogCourses[0];
  }, [catalogCourses, isEnrolled]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All Categories");
    setSelectedLevel("All Levels");
    setEnrollFilter("all");
    setSortBy("popular");
  };

  const hasActiveFilters =
    searchQuery !== "" ||
    selectedCategory !== "All Categories" ||
    selectedLevel !== "All Levels" ||
    enrollFilter !== "all";

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <AppHeader
        portalName="Students"
        userName="Alex Rivera"
        userRole="AP Scholar"
        avatarUrl="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
        notificationCount={3}
        streakDays={14}
        currentXp={1420}
        cohortTag="Spring Cohort 2024–2025"
      />

      <div className="flex flex-1">
        <Sidebar
          branches={studentNavBranches}
          currentPath="/explore"
          footerContent={
            <div className="rounded-xl bg-[#0B2B53] p-3.5 text-white space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-sky-400">
                <Sparkles className="h-3.5 w-3.5" />
                <span>My Active Enrollments</span>
              </div>
              <p className="text-xs text-slate-300">
                You have {enrolledCourses.length} active courses in your learning hub.
              </p>
              <Link href="/courses">
                <Button size="sm" className="w-full bg-[#00A8E8] hover:bg-sky-400 text-[#0B2B53] font-bold text-xs">
                  View My Courses
                </Button>
              </Link>
            </div>
          }
        />

        <main className="flex-1 p-6 md:p-8 space-y-8 max-w-7xl">
          {/* Header Banner */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-600">
              <GraduationCap className="h-4 w-4" />
              <span>Learnova Course Discovery & Catalog</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-extrabold text-[#0B2B53] tracking-tight">
                  Explore & Enroll in Courses
                </h1>
                <p className="text-sm text-slate-600 max-w-2xl mt-1">
                  Discover accredited courses, interactive physics labs, full-stack architectures, and AI systems. One click enrolls you instantly into your personalized curriculum.
                </p>
              </div>

              {/* Quick Jump to My Courses */}
              <Link href="/courses" className="shrink-0">
                <Button
                  variant="outline"
                  className="border-slate-300 hover:border-[#0B2B53] text-[#0B2B53] font-bold text-xs flex items-center gap-2"
                >
                  <BookMarked className="h-4 w-4 text-[#00A8E8]" />
                  <span>My Enrolled Courses ({enrolledCourses.length})</span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Search & Main Filter Controls Bar */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
              {/* Search input with live clear */}
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search courses by topic, instructor, keywords (e.g. Next.js, Newton, Vectors, Quantum)..."
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#00A8E8] focus:ring-2 focus:ring-[#00A8E8]/20 text-sm text-[#0B2B53] placeholder:text-slate-400 outline-none transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    aria-label="Clear search"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Level Filter */}
              <div className="flex items-center gap-2">
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-[#0B2B53] focus:border-[#00A8E8] outline-none cursor-pointer"
                >
                  {LEVELS.map((lvl) => (
                    <option key={lvl} value={lvl}>
                      {lvl}
                    </option>
                  ))}
                </select>

                {/* Sort selector */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-[#0B2B53] focus:border-[#00A8E8] outline-none cursor-pointer"
                >
                  <option value="popular">🔥 Most Popular</option>
                  <option value="rating">⭐ Highest Rated</option>
                  <option value="duration-asc">⏱ Duration (Shortest)</option>
                  <option value="duration-desc">⏱ Duration (Longest)</option>
                </select>
              </div>
            </div>

            {/* Category Pills & Enrollment Status Filter */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
              <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
                {CATEGORIES.map((cat) => {
                  const active = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                        active
                          ? "bg-[#0B2B53] text-white shadow-sm"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-[#0B2B53]"
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>

              {/* Filter by enrollment */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl shrink-0">
                <button
                  onClick={() => setEnrollFilter("all")}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    enrollFilter === "all" ? "bg-white text-[#0B2B53] shadow-xs" : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  All ({catalogCourses.length})
                </button>
                <button
                  onClick={() => setEnrollFilter("unenrolled")}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    enrollFilter === "unenrolled" ? "bg-white text-[#0B2B53] shadow-xs" : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Not Enrolled
                </button>
                <button
                  onClick={() => setEnrollFilter("enrolled")}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    enrollFilter === "enrolled" ? "bg-white text-[#0B2B53] shadow-xs" : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Enrolled ({enrolledCourses.length})
                </button>
              </div>
            </div>

            {/* Active filters badge row */}
            {hasActiveFilters && (
              <div className="flex items-center justify-between gap-3 pt-2 text-xs text-slate-500">
                <div className="flex flex-wrap items-center gap-2">
                  <span>Active Filters:</span>
                  {searchQuery && (
                    <Badge variant="outline" className="bg-sky-50 text-sky-800 border-sky-200 flex items-center gap-1">
                      <span>Query: "{searchQuery}"</span>
                      <X className="h-3 w-3 cursor-pointer" onClick={() => setSearchQuery("")} />
                    </Badge>
                  )}
                  {selectedCategory !== "All Categories" && (
                    <Badge variant="outline" className="bg-sky-50 text-sky-800 border-sky-200 flex items-center gap-1">
                      <span>Category: {selectedCategory}</span>
                      <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedCategory("All Categories")} />
                    </Badge>
                  )}
                  {selectedLevel !== "All Levels" && (
                    <Badge variant="outline" className="bg-sky-50 text-sky-800 border-sky-200 flex items-center gap-1">
                      <span>Level: {selectedLevel}</span>
                      <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedLevel("All Levels")} />
                    </Badge>
                  )}
                  {enrollFilter !== "all" && (
                    <Badge variant="outline" className="bg-sky-50 text-sky-800 border-sky-200 flex items-center gap-1">
                      <span>Status: {enrollFilter}</span>
                      <X className="h-3 w-3 cursor-pointer" onClick={() => setEnrollFilter("all")} />
                    </Badge>
                  )}
                </div>

                <button
                  onClick={handleClearFilters}
                  className="text-xs font-bold text-sky-600 hover:text-sky-800 hover:underline shrink-0"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>

          {/* Results Summary Counter */}
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold px-1">
            <span>
              Showing <strong className="text-[#0B2B53] font-bold">{filteredCourses.length}</strong> of{" "}
              {catalogCourses.length} accredited courses
            </span>
            <span>Accredited Curriculum • Interactive Labs</span>
          </div>

          {/* Course Cards Grid */}
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => {
                const enrolled = isEnrolled(course.id);

                return (
                  <div
                    key={course.id}
                    className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 flex flex-col justify-between overflow-hidden"
                  >
                    <div>
                      {/* Course Image Header */}
                      <div className="relative w-full h-44 overflow-hidden bg-slate-100">
                        <img
                          src={course.thumbnailUrl}
                          alt={course.thumbnailAlt}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B2B53]/80 via-transparent to-transparent flex flex-col justify-between p-3.5">
                          <div className="flex items-center justify-between gap-2">
                            <span className="px-2.5 py-0.5 rounded-md bg-[#0B2B53]/90 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm border border-white/10">
                              {course.category}
                            </span>
                            <span className="px-2 py-0.5 rounded-md bg-white/90 text-slate-800 text-[10px] font-bold backdrop-blur-sm shadow-xs">
                              {course.level}
                            </span>
                          </div>

                          {enrolled && (
                            <div className="self-start">
                              <span className="px-2.5 py-1 rounded-lg bg-emerald-500 text-white text-[11px] font-bold flex items-center gap-1 shadow-md">
                                <CheckCircle2 className="h-3 w-3" />
                                Enrolled
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Course Details Content */}
                      <div className="p-5 space-y-3">
                        {/* Rating & Learners */}
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1 text-amber-500 font-bold">
                            <Star className="h-3.5 w-3.5 fill-amber-400" />
                            <span>{course.rating}</span>
                            <span className="text-slate-400 font-normal">({course.reviewsCount})</span>
                          </div>
                          <div className="flex items-center gap-1 text-slate-400 text-xs">
                            <Users className="h-3.5 w-3.5" />
                            <span>{course.enrolledCount.toLocaleString()}</span>
                          </div>
                        </div>

                        {/* Title & Subtitle */}
                        <div>
                          <h3 className="text-base font-bold text-[#0B2B53] group-hover:text-[#00A8E8] transition-colors leading-snug line-clamp-1">
                            {course.title}
                          </h3>
                          <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                            {course.description}
                          </p>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 pt-1">
                          {course.tags.slice(0, 3).map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Metrics Bar */}
                        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-[11px] text-slate-600">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5 text-sky-600 shrink-0" />
                            <span>{course.durationHours}h total</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <BookOpen className="h-3.5 w-3.5 text-sky-600 shrink-0" />
                            <span>{course.totalLessons} lessons</span>
                          </div>
                          <div className="flex items-center gap-1 text-emerald-700 font-semibold">
                            <Zap className="h-3.5 w-3.5 fill-emerald-600 text-emerald-600 shrink-0" />
                            <span>{course.interactiveLabsCount} labs</span>
                          </div>
                        </div>

                        {/* Instructor */}
                        <div className="flex items-center gap-2.5 pt-2 border-t border-slate-100">
                          <img
                            src={course.instructor.avatarUrl}
                            alt={course.instructor.name}
                            className="w-7 h-7 rounded-full object-cover border border-slate-200"
                          />
                          <div className="overflow-hidden">
                            <p className="text-xs font-bold text-[#0B2B53] truncate">{course.instructor.name}</p>
                            <p className="text-[10px] text-slate-400 truncate">{course.instructor.organization}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card Footer Actions */}
                    <div className="p-5 pt-0 flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openCoursePreview(course)}
                        className="flex-1 border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-bold rounded-xl"
                      >
                        Preview Syllabus
                      </Button>

                      {enrolled ? (
                        <Link href={`/courses/${course.id}/learning-path`} className="flex-1">
                          <Button
                            size="sm"
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1"
                          >
                            <span>Resume Path</span>
                            <ArrowRight className="h-3.5 w-3.5" />
                          </Button>
                        </Link>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => enrollCourse(course.id)}
                          className="flex-1 bg-[#00A8E8] hover:bg-sky-500 text-white text-xs font-bold rounded-xl shadow-xs flex items-center justify-center gap-1"
                        >
                          <Sparkles className="h-3.5 w-3.5" />
                          <span>Enroll Now</span>
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Empty State */
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4 max-w-xl mx-auto shadow-sm">
              <div className="w-16 h-16 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mx-auto">
                <Search className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold text-[#0B2B53]">No matching courses found</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                We couldn't find any courses matching your search query or filter criteria. Try adjusting your search keywords or clearing active filters.
              </p>
              <Button
                onClick={handleClearFilters}
                className="bg-[#0B2B53] hover:bg-slate-800 text-white font-bold text-xs"
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
