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
  currentXp?: number;
  targetXp?: number;
  scholarTier?: string;
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

/* ==========================================================================
   Stitch Educational Platform Specific Types
   ========================================================================== */

export interface CurriculumTopicLesson {
  id: string;
  title: string;
  duration: string;
  type: 'Video Lecture' | 'Hands-on Lab' | 'Concept Check' | 'Peer Review' | 'Quiz';
  isPublished: boolean;
  hasAssessment?: boolean;
}

export interface CurriculumTopic {
  id: string;
  unitNumber: number;
  title: string;
  description: string;
  publishPercent: number;
  totalHours: number;
  lessonsCount: number;
  lessons: CurriculumTopicLesson[];
}

export interface CurriculumCourseData {
  courseCode: string;
  courseName: string;
  term: string;
  cohort: string;
  totalUnits: number;
  completedUnits: number;
  publishedPercent: number;
  totalClassroomHours: number;
  structureMode: string;
  lastAutosaved: string;
  topics: CurriculumTopic[];
}

export type MasteryStatus = 'mastered' | 'learning' | 'struggling' | 'unstarted';

export interface MasteryPillarScore {
  pillarId: string;
  pillarName: string;
  score: number; // 0 - 100
  status: MasteryStatus;
}

export interface StudentMasteryRow {
  id: string;
  studentName: string;
  studentId: string;
  avatarUrl: string;
  overallMastery: number;
  lastActive: string;
  requiresIntervention: boolean;
  interventionReason?: string;
  pillarScores: Record<string, MasteryPillarScore>;
}

export interface MasteryMatrixCohort {
  cohortName: string;
  courseName: string;
  term: string;
  cohortMasteryRate: number;
  masteryRateWeeklyChange: number;
  activeLearnersCount: number;
  totalLearnersCount: number;
  interventionCount: number;
  flaggedTopic: string;
  loggedAssessmentsCount: number;
  pillars: { id: string; name: string; category: string }[];
  students: StudentMasteryRow[];
}

export interface QuizOption {
  id: string;
  label: string; // 'A' | 'B' | 'C' | 'D'
  text: string;
  isCorrect: boolean;
}

export interface PracticeQuizQuestion {
  id: string;
  questionNumber: number;
  totalQuestions: number;
  topic: string;
  subtopic: string;
  prompt: string;
  helperFormula?: string;
  explanation: string;
  options: QuizOption[];
  difficulty: 'Foundation' | 'Intermediate' | 'Advanced';
}

export interface RadarMetric {
  concept: string;
  score: number; // 0 - 100
  fullMark: number;
}

export interface StudentProgressAnalytics {
  overallPercentage: number;
  badgesUnlocked: number;
  totalBadges: number;
  liveStreakDays: number;
  weeklyStudyHours: number;
  radarMetrics: RadarMetric[];
  topicBreakdowns: {
    topic: string;
    score: number;
    lessonsCompleted: number;
    totalLessons: number;
    status: MasteryStatus;
  }[];
  badges: {
    id: string;
    name: string;
    description: string;
    icon: string;
    unlockedAt?: string;
    isLocked: boolean;
  }[];
}

/* ==========================================================================
   Student Expansion Types (Course Hub, Learning Path, AI Focus Study)
   ========================================================================== */

export interface EnrolledCourseCardData {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  status: 'in-progress' | 'completed' | 'upcoming';
  unitStatusText: string;
  thumbnailUrl: string;
  thumbnailAlt: string;
  highlightTopic: string;
  completedPercent: number;
  completedLessons: number;
  totalLessons: number;
  interactiveLabsCount?: number;
  durationWeeklyRemaining?: string;
  pathSlug: string;
}

export interface LearningPathMilestoneLesson {
  id: string;
  lessonNumber: string;
  title: string;
  duration: string;
  type: 'Video Lecture' | 'Lab Simulation' | 'Core Theory' | 'Concept Check' | 'Quiz' | 'Exam';
  isCompleted: boolean;
  isActive?: boolean;
  isLocked?: boolean;
  score?: number;
  xpValue?: number;
  hasSimulator?: boolean;
  simulatorTitle?: string;
  simulatorDescription?: string;
  simulatorBadge?: string;
}

export interface LearningPathUnitMilestone {
  id: string;
  unitNumber: number;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'locked';
  completionPercent: number;
  lessonsCount: number;
  labsCount: number;
  estimatedHours: number;
  learningObjectives?: string;
  lessons: LearningPathMilestoneLesson[];
}

export interface AIChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  text: string;
  badge?: string;
  suggestedSteps?: string[];
  formulaSnippet?: string;
}

export interface InclineSimulationState {
  angleDegrees: number; // 10 to 65
  massKg: number; // 5.0
  gravity: number; // 9.8
  frictionCoefficient: number; // 0.15
  fgParallel: number; // m * g * sin(theta)
  normalForce: number; // m * g * cos(theta)
  fk: number; // mu * FN
  netAcceleration: number; // (Fg,|| - fk) / m
}
