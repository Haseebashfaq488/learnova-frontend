export type CourseLevel = 'Foundational' | 'Intermediate' | 'Advanced';

export type CourseCategory = 
  | 'Core Computer Science' 
  | 'Systems & Architecture' 
  | 'Algorithms & Mathematics' 
  | 'Data & AI' 
  | 'Web & Software';

export type LessonType = 'video' | 'reading' | 'code' | 'diagnostic' | 'practice';

export interface CourseLesson {
  id: string;
  title: string;
  duration: string;
  type: LessonType;
  description?: string;
}

export interface CourseUnit {
  id: string;
  unitNumber: number;
  title: string;
  description: string;
  lessons: CourseLesson[];
}

export interface CourseInstructor {
  name: string;
  title: string;
  department: string;
  avatarText: string;
}

export interface Course {
  id: string;
  slug: string;
  code: string; // e.g. "CS101"
  title: string;
  category: CourseCategory;
  level: CourseLevel;
  duration: string; // e.g. "6 Weeks"
  estimatedHours: string; // e.g. "36 Hours"
  lessonsCount: number;
  practicesCount: number;
  rating: number;
  studentsEnrolled: string; // e.g. "1,420 Enrolled"
  description: string;
  longDescription: string;
  prerequisites: string[];
  prerequisiteDAG: {
    prerequisiteNodes: string[];
    currentCourse: string;
    unlocksNodes: string[];
  };
  whatYouWillLearn: string[];
  syllabus: CourseUnit[];
  instructor: CourseInstructor;
  tags: string[];
  imageUrl: string;
}

export interface CourseFilterState {
  search: string;
  categories: CourseCategory[];
  levels: CourseLevel[];
  durations: string[]; // e.g. '< 6 weeks', '6-8 weeks', '> 8 weeks'
  sortBy: 'popular' | 'duration-asc' | 'duration-desc' | 'level';
}
