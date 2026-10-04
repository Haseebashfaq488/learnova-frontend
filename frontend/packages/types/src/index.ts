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

export interface LessonResource {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'simulation' | 'slide' | 'link' | 'worksheet';
  url: string;
  size?: string;
  uploadedAt: string;
  description?: string;
}

export interface LessonAssessmentConfig {
  id: string;
  title: string;
  type: 'concept-check' | 'mastery-quiz' | 'lab-rubric' | 'homework';
  totalPoints: number;
  xpBounty: number;
  timeLimitMinutes?: number;
  passingScorePercent: number;
  questions: QuestionBankItem[];
  instructions?: string;
}

export interface LessonDetailData {
  id: string;
  unitId: string;
  unitTitle: string;
  courseCode: string;
  courseName: string;
  title: string;
  duration: string;
  type: 'Video Lecture' | 'Hands-on Lab' | 'Concept Check' | 'Peer Review' | 'Quiz';
  isPublished: boolean;
  hasAssessment: boolean;
  learningObjectives: string[];
  lectureNotesMarkdown: string;
  videoUrl?: string;
  resources: LessonResource[];
  assessment?: LessonAssessmentConfig;
  studentStats?: {
    completionRate: number;
    averageScore: number;
    totalSubmissions: number;
    interventionCount: number;
  };
}

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

export interface CourseCatalogSyllabusUnit {
  unitNumber: number;
  title: string;
  description: string;
  lessonsCount: number;
  durationHours: number;
  keyTopics: string[];
}

export interface CatalogCourse {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'AP Prep';
  durationHours: number;
  totalLessons: number;
  interactiveLabsCount: number;
  rating: number;
  reviewsCount: number;
  enrolledCount: number;
  thumbnailUrl: string;
  thumbnailAlt: string;
  instructor: {
    name: string;
    role: string;
    avatarUrl: string;
    organization: string;
  };
  tags: string[];
  learningOutcomes: string[];
  syllabus: CourseCatalogSyllabusUnit[];
  prerequisites?: string[];
  isFeatured?: boolean;
  isPopular?: boolean;
}

/* ==========================================================================
   Gamification Profile Types
   ========================================================================== */

export type BadgeRarity = 'Common' | 'Rare' | 'Epic' | 'Legendary';
export type BadgeCategory = 'Mastery' | 'Consistency' | 'Curiosity' | 'Speed' | 'AI Collaboration';

export interface GamificationBadge {
  id: string;
  name: string;
  description: string;
  category: BadgeCategory;
  rarity: BadgeRarity;
  icon: string;
  xpReward: number;
  isUnlocked: boolean;
  unlockedAt?: string;
  progressPercent?: number;
  criteria: string;
}

export interface DailyQuest {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  currentProgress: number;
  targetProgress: number;
  unit: string;
  isCompleted: boolean;
  isClaimed: boolean;
  iconName: string;
  expiresIn: string;
}

export interface XpActivityLog {
  id: string;
  activityTitle: string;
  courseTitle: string;
  xpEarned: number;
  timestamp: string;
  type: 'quiz' | 'simulation' | 'streak' | 'ai_chat' | 'milestone';
}

export interface CohortLeaderboardEntry {
  rank: number;
  studentId: string;
  name: string;
  avatarUrl: string;
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Diamond';
  totalPoints: number;
  streakDays: number;
  level: number;
  weeklyXp: number;
  isCurrentUser?: boolean;
}

export interface StudentGamificationState {
  level: number;
  levelTitle: string;
  currentXp: number;
  nextLevelXp: number;
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Diamond';
  totalPoints: number;
  streakDays: number;
  longestStreak: number;
  rankInCohort: number;
  totalCohortStudents: number;
  weeklyXp: number;
  dailyQuests: DailyQuest[];
  badges: GamificationBadge[];
  recentActivities: XpActivityLog[];
  leaderboard: CohortLeaderboardEntry[];
}

/* ==========================================================================
   Teacher Faculty Profile Types
   ========================================================================== */

export interface FacultyBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
  awardedYear: string;
}

export interface FacultyImpactStats {
  totalStudentsTaught: number;
  activeCohortsCount: number;
  averageMasteryRate: number;
  questionsCuratedCount: number;
  assignmentsGradedCount: number;
  officeHoursHeldHours: number;
  studentSatisfactionRating: number;
}

export interface TeacherCohortSummary {
  id: string;
  courseName: string;
  courseCode: string;
  cohortName: string;
  studentCount: number;
  averageMastery: number;
  completionRate: number;
  interventionsNeeded: number;
  schedule: string;
}

export interface TeacherAIAssistantConfig {
  preferredPersona: 'Socratic Tutor' | 'Rigorous Examiner' | 'Conceptual Guide' | 'Practical Mentor';
  defaultBloomsLevel: BloomsTaxonomy;
  defaultDifficultyDistribution: {
    foundation: number;
    intermediate: number;
    advanced: number;
  };
  autoGenerateStepByStepSolutions: boolean;
  highlightCommonMisconceptions: boolean;
  exportFormatDefault: 'Canvas QTI' | 'PDF Printable' | 'Moodle XML' | 'JSON Standard';
}

/* ==========================================================================
   AI Question Generation & Question Bank Types
   ========================================================================== */

export type BloomsTaxonomy =
  | 'Knowledge'
  | 'Comprehension'
  | 'Application'
  | 'Analysis'
  | 'Evaluation'
  | 'Synthesis';

export type QuestionType =
  | 'multiple-choice'
  | 'multi-select'
  | 'numerical'
  | 'conceptual-short'
  | 'step-by-step';

export type QuestionDifficulty = 'Foundation' | 'Intermediate' | 'Advanced' | 'Olympiad';

export interface QuestionOptionItem {
  id: string;
  label: string; // 'A' | 'B' | 'C' | 'D' | 'E'
  text: string;
  isCorrect: boolean;
  distractorRationale?: string;
}

export interface QuestionBankItem {
  id: string;
  courseId: string;
  courseTitle: string;
  unitId?: string;
  unitTitle?: string;
  topic: string;
  subtopic: string;
  type: QuestionType;
  difficulty: QuestionDifficulty;
  bloomsLevel: BloomsTaxonomy;
  prompt: string;
  latexFormula?: string;
  options?: QuestionOptionItem[];
  sampleAnswer?: string;
  stepByStepSolution: string[];
  hint: string;
  commonMisconception?: string;
  tags: string[];
  status: 'draft' | 'approved' | 'archived';
  createdAt: string;
  approvedAt?: string;
  usageCount: number;
  avgStudentAccuracy?: number;
}

export interface AIGenerationPromptConfig {
  courseId: string;
  courseTitle: string;
  unitId?: string;
  unitTitle?: string;
  topic: string;
  subtopic: string;
  questionTypes: QuestionType[];
  difficulty: QuestionDifficulty;
  bloomsLevel: BloomsTaxonomy;
  count: number;
  customPedagogyGuidance?: string;
  includeStepByStepSolutions: boolean;
  includeMisconceptionDiagnostics: boolean;
}
