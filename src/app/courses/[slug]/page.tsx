'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Navbar } from '../../../components/Navbar';
import { CourseDetailPage } from '../../../components/CourseDetailPage';
import { Footer } from '../../../components/Footer';
import { useTheme } from '../../../context/ThemeContext';
import { coursesData } from '../../../data/coursesData';
import { ArrowLeft, BookOpen } from 'lucide-react';

export default function CourseDetailRoute() {
  const params = useParams();
  const router = useRouter();
  const { palette, font } = useTheme();

  const slug = params?.slug as string;
  const course = coursesData.find((c) => c.slug === slug);

  if (!course) {
    return (
      <>
        <Navbar palette={palette} />
        <main className="flex-grow pt-32 pb-24 px-4 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
            <BookOpen className="w-8 h-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-ink mb-2">
            Course Not Found
          </h1>
          <p className="text-sm text-ink-muted max-w-md mb-6">
            We couldn&apos;t find an active curriculum module matching the URL slug &ldquo;{slug}&rdquo;.
          </p>
          <button
            onClick={() => router.push('/courses')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-xs font-bold transition-all shadow-sm"
            style={{ backgroundColor: palette.accent }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Course Catalog</span>
          </button>
        </main>
        <Footer palette={palette} />
      </>
    );
  }

  return (
    <>
      <Navbar palette={palette} />

      <main className="flex-grow">
        <CourseDetailPage
          course={course}
          palette={palette}
          font={font}
          onBackToCourses={() => router.push('/courses')}
          onNavigateHome={() => router.push('/')}
        />
      </main>

      <Footer palette={palette} />
    </>
  );
}
