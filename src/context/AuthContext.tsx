'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface StudentUser {
  id: string;
  name: string;
  role: string;
  email: string;
  cohortTag: string;
  cohort?: string;
  avatarUrl: string;
  streakDays: number;
  currentXp: number;
  level?: number;
  enrolledCourseIds: string[];
  enrolledCourseSlugs?: string[];
}

export const defaultStudent: StudentUser = {
  id: 'student-1',
  name: 'Alex Rivera',
  role: 'Level 5 Scholar',
  email: 'alex.rivera@fast.nu.edu.pk',
  cohortTag: 'Fall 2026 • FAST-NUCES',
  cohort: 'Fall 2026 • FAST-NUCES',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
  streakDays: 14,
  currentXp: 1420,
  level: 5,
  enrolledCourseIds: ['cs101', 'cs201'],
  enrolledCourseSlugs: ['cs101-computer-systems', 'cs201-data-structures-algorithms'],
};

interface AuthContextType {
  user: StudentUser | null;
  isAuthenticated: boolean;
  login: (emailOrUser?: string | Partial<StudentUser>, name?: string) => void;
  loginAsDemo: () => void;
  logout: () => void;
  enrollInCourse: (courseId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<StudentUser | null>(null);

  // Initialize from localStorage or default to student for convenience
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('learnova_student_session');
      if (stored) {
        try {
          setUser(JSON.parse(stored));
        } catch {
          setUser(defaultStudent);
        }
      } else {
        // Start signed in with demo student so user can immediately test dashboard
        setUser(defaultStudent);
        localStorage.setItem('learnova_student_session', JSON.stringify(defaultStudent));
      }
    }
  }, []);

  const loginAsDemo = () => {
    setUser(defaultStudent);
    if (typeof window !== 'undefined') {
      localStorage.setItem('learnova_student_session', JSON.stringify(defaultStudent));
    }
  };

  const login = (emailOrUser?: string | Partial<StudentUser>, name?: string) => {
    let student: StudentUser = { ...defaultStudent };
    if (typeof emailOrUser === 'string') {
      student = {
        ...defaultStudent,
        email: emailOrUser,
        name: name || defaultStudent.name,
      };
    } else if (emailOrUser) {
      student = {
        ...defaultStudent,
        ...emailOrUser,
      };
    }
    setUser(student);
    if (typeof window !== 'undefined') {
      localStorage.setItem('learnova_student_session', JSON.stringify(student));
    }
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('learnova_student_session');
    }
  };

  const enrollInCourse = (courseId: string) => {
    if (user && !user.enrolledCourseIds.includes(courseId)) {
      const updated = {
        ...user,
        enrolledCourseIds: [...user.enrolledCourseIds, courseId],
      };
      setUser(updated);
      if (typeof window !== 'undefined') {
        localStorage.setItem('learnova_student_session', JSON.stringify(updated));
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        loginAsDemo,
        logout,
        enrollInCourse,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
