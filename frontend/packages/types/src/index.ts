export type UserRole = 'student' | 'teacher' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  createdAt: string;
  status: 'active' | 'suspended' | 'pending';
}

export interface StudentProfile extends User {
  role: 'student';
  gradeLevel?: string;
  enrolledCourseIds: string[];
  completedCourseIds: string[];
  streakDays: number;
  totalPoints: number;
}

export interface TeacherProfile extends User {
  role: 'teacher';
  department?: string;
  title?: string;
  bio?: string;
  assignedCourseIds: string[];
  rating: number;
  totalStudentsTaught: number;
}

export interface AdminProfile extends User {
  role: 'admin';
  permissions: string[];
  department?: string;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
  instructorId: string;
  instructorName: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  durationHours: number;
  rating: number;
  enrolledCount: number;
  status: 'draft' | 'published' | 'archived';
  modules: CourseModule[];
  createdAt: string;
  updatedAt: string;
}

export interface CourseModule {
  id: string;
  title: string;
  description?: string;
  order: number;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  durationMinutes: number;
  type: 'video' | 'article' | 'quiz' | 'assignment';
  videoUrl?: string;
  contentMarkdown?: string;
  isCompleted?: boolean;
  order: number;
}

export interface Assignment {
  id: string;
  courseId: string;
  courseTitle: string;
  title: string;
  description: string;
  dueDate: string;
  totalPoints: number;
  status: 'upcoming' | 'submitted' | 'graded' | 'late';
}

export interface Submission {
  id: string;
  assignmentId: string;
  studentId: string;
  studentName: string;
  studentAvatar?: string;
  submittedAt: string;
  fileUrl?: string;
  comment?: string;
  grade?: number;
  feedback?: string;
  status: 'pending' | 'graded' | 'needs_revision';
}

export interface MetricCardData {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  iconName?: string;
  description?: string;
}

export interface PlatformStat {
  totalStudents: number;
  totalTeachers: number;
  totalCourses: number;
  activeLearnersToday: number;
  revenueThisMonth: number;
  completionRate: number;
}
