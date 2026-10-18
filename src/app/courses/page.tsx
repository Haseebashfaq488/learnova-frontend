'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '../../components/Navbar';
import { CoursesPage } from '../../components/CoursesPage';
import { Footer } from '../../components/Footer';
import { useTheme } from '../../context/ThemeContext';

export default function CoursesCatalogPage() {
  const router = useRouter();
  const { palette, font } = useTheme();

  return (
    <>
      <Navbar palette={palette} />

      <main className="flex-grow">
        <CoursesPage
          palette={palette}
          font={font}
          onNavigateHome={() => router.push('/')}
          onSelectCourse={(slug) => router.push(`/courses/${slug}`)}
        />
      </main>

      <Footer palette={palette} />
    </>
  );
}
