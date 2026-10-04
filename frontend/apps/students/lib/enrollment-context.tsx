"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CatalogCourse, EnrolledCourseCardData } from "@learnova/types";
import { mockEnrolledCoursesHub, mockCoursesCatalog } from "@learnova/ui";

interface ToastNotification {
  id: string;
  title: string;
  message: string;
  courseTitle?: string;
  actionLabel?: string;
  actionHref?: string;
}

interface EnrollmentContextType {
  enrolledCourses: EnrolledCourseCardData[];
  catalogCourses: CatalogCourse[];
  isEnrolled: (courseId: string) => boolean;
  enrollCourse: (courseId: string) => { success: boolean; course?: CatalogCourse };
  unenrollCourse: (courseId: string) => void;
  selectedPreviewCourse: CatalogCourse | null;
  openCoursePreview: (course: CatalogCourse) => void;
  closeCoursePreview: () => void;
  toast: ToastNotification | null;
  clearToast: () => void;
}

const EnrollmentContext = createContext<EnrollmentContextType | undefined>(undefined);

const STORAGE_KEY = "learnova_student_enrolled_courses";

export function EnrollmentProvider({ children }: { children: React.ReactNode }) {
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourseCardData[]>(mockEnrolledCoursesHub);
  const [selectedPreviewCourse, setSelectedPreviewCourse] = useState<CatalogCourse | null>(null);
  const [toast, setToast] = useState<ToastNotification | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load enrolled courses from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setEnrolledCourses(parsed);
        }
      }
    } catch (e) {
      console.warn("Failed to load enrolled courses from storage", e);
    }
    setIsHydrated(true);
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(enrolledCourses));
      } catch (e) {
        console.warn("Failed to persist enrolled courses", e);
      }
    }
  }, [enrolledCourses, isHydrated]);

  const isEnrolled = (courseId: string): boolean => {
    return enrolledCourses.some((c) => c.id === courseId);
  };

  const enrollCourse = (courseId: string) => {
    if (isEnrolled(courseId)) {
      return { success: false };
    }

    const catalogCourse = mockCoursesCatalog.find((c) => c.id === courseId);
    if (!catalogCourse) {
      return { success: false };
    }

    const newEnrolledItem: EnrolledCourseCardData = {
      id: catalogCourse.id,
      title: catalogCourse.title,
      subtitle: catalogCourse.subtitle,
      category: catalogCourse.category,
      status: "in-progress",
      unitStatusText: `In Progress • Unit 1 of ${catalogCourse.syllabus.length || 4}`,
      thumbnailUrl: catalogCourse.thumbnailUrl,
      thumbnailAlt: catalogCourse.thumbnailAlt,
      highlightTopic: `Core Topic: ${catalogCourse.syllabus[0]?.keyTopics[0] || catalogCourse.tags[0] || 'Orientation'}`,
      completedPercent: 0,
      completedLessons: 0,
      totalLessons: catalogCourse.totalLessons,
      interactiveLabsCount: catalogCourse.interactiveLabsCount,
      durationWeeklyRemaining: `${Math.round(catalogCourse.durationHours / 4)} hrs remaining this week`,
      pathSlug: `/courses/${catalogCourse.id}/learning-path`,
    };

    setEnrolledCourses((prev) => [newEnrolledItem, ...prev]);

    setToast({
      id: Date.now().toString(),
      title: "Enrollment Confirmed! 🎉",
      message: `You have successfully enrolled in "${catalogCourse.title}". You can now access all learning modules and AI study resources.`,
      courseTitle: catalogCourse.title,
      actionLabel: "Start Unit 1",
      actionHref: `/courses/${catalogCourse.id}/learning-path`,
    });

    return { success: true, course: catalogCourse };
  };

  const unenrollCourse = (courseId: string) => {
    setEnrolledCourses((prev) => prev.filter((c) => c.id !== courseId));
  };

  const openCoursePreview = (course: CatalogCourse) => {
    setSelectedPreviewCourse(course);
  };

  const closeCoursePreview = () => {
    setSelectedPreviewCourse(null);
  };

  const clearToast = () => {
    setToast(null);
  };

  return (
    <EnrollmentContext.Provider
      value={{
        enrolledCourses,
        catalogCourses: mockCoursesCatalog,
        isEnrolled,
        enrollCourse,
        unenrollCourse,
        selectedPreviewCourse,
        openCoursePreview,
        closeCoursePreview,
        toast,
        clearToast,
      }}
    >
      {children}
    </EnrollmentContext.Provider>
  );
}

export function useEnrollment() {
  const context = useContext(EnrollmentContext);
  if (!context) {
    throw new Error("useEnrollment must be used within an EnrollmentProvider");
  }
  return context;
}
