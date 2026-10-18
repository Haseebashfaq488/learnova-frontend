'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '../components/Navbar';
import { Header } from '../components/Header';
import { HowItWorks } from '../components/HowItWorks';
import { CourseCarousel } from '../components/CourseCarousel';
import { FeaturesSection } from '../components/FeaturesSection';
import { TeacherSection } from '../components/TeacherSection';
import { FinalCTA } from '../components/FinalCTA';
import { Footer } from '../components/Footer';
import { useTheme } from '../context/ThemeContext';

export default function HomePage() {
  const router = useRouter();
  const { palette, font } = useTheme();

  return (
    <>
      <Navbar palette={palette} />

      <main className="flex-grow">
        {/* Hero Section */}
        <Header 
          palette={palette} 
          onNavigateCourses={() => router.push('/courses')}
        />

        {/* The Student Journey (Animated Progression) */}
        <HowItWorks palette={palette} font={font} />

        {/* Browse Courses Carousel (Integrated in landing flow) */}
        <CourseCarousel
          palette={palette}
          font={font}
          onNavigateToCourses={() => router.push('/courses')}
          onSelectCourse={(slug) => router.push(`/courses/${slug}`)}
        />

        {/* Core Architecture (Master Blueprint Workbench) */}
        <FeaturesSection palette={palette} font={font} />

        {/* Instructor Governance (Clean, minimal 3-card structure) */}
        <TeacherSection palette={palette} font={font} />

        {/* Early Access Split Conversion Desk */}
        <FinalCTA palette={palette} font={font} />
      </main>

      <Footer palette={palette} />
    </>
  );
}
