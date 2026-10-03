import {
  Compass,
  BookOpen,
  Route,
  BookMarked,
  Play,
  Award,
  LayoutDashboard,
  BookOpenCheck,
  Target,
  CheckCircle2,
  BarChart3,
  Users,
  CreditCard,
  ShieldAlert,
  Settings,
  Layers,
  ArrowLeft,
  Zap,
  Sparkles,
  FileText,
} from "lucide-react";
import { BranchedMenuItem } from "../components/branched-menu";

// Top-level global navigation for student portal
export const studentGlobalNavBranches: BranchedMenuItem[] = [
  {
    label: "Main Workspace",
    children: [
      { value: "hub", label: "Dashboard / Hub", href: "/", icon: Compass },
      { value: "courses", label: "My Courses", href: "/courses", icon: BookOpen, badge: 4 },
      { value: "analytics", label: "Progress & Analytics", href: "/analytics", icon: Award, badge: "77%" },
    ],
  },
  {
    label: "Quick Resume",
    children: [
      { value: "ap-physics-1", label: "AP Physics 1", href: "/courses/ap-physics-1/study", icon: Zap, badge: "Lesson 3.2" },
      { value: "linear-algebra", label: "Linear Algebra", href: "/courses/linear-algebra/learning-path", icon: Sparkles, badge: "42%" },
    ],
  },
];

// Contextual in-course navigation
export const getStudentCourseNavBranches = (
  courseId: string = "ap-physics-1",
  courseTitle: string = "AP Physics 1"
): BranchedMenuItem[] => [
  {
    label: courseTitle,
    children: [
      {
        value: "learning-path",
        label: "Learning Path",
        href: `/courses/${courseId}/learning-path`,
        icon: Route,
        badge: "Unit 3",
      },
      {
        value: "study",
        label: "Focus Study (AI)",
        href: `/courses/${courseId}/study`,
        icon: BookMarked,
        badge: "Active",
      },
      {
        value: "practice",
        label: "Practice Arena",
        href: `/courses/${courseId}/practice`,
        icon: Play,
      },
    ],
  },
  {
    label: "Course Navigation",
    children: [
      {
        value: "all-courses",
        label: "← All Courses",
        href: "/courses",
        icon: ArrowLeft,
      },
      {
        value: "analytics",
        label: "My Analytics",
        href: "/analytics",
        icon: Award,
        badge: "77%",
      },
    ],
  },
];

// Alias for backwards compatibility
export const studentNavBranches = studentGlobalNavBranches;

export const teacherNavBranches: BranchedMenuItem[] = [
  {
    label: "Teaching Studio",
    children: [
      { value: "overview", label: "Cohort Overview", href: "/", icon: LayoutDashboard },
      { value: "curriculum", label: "Curriculum Builder", href: "/curriculum", icon: BookOpenCheck, badge: 18 },
      { value: "mastery", label: "Student Mastery Grid", href: "/mastery", icon: Target, badge: "3 Alert" },
    ],
  },
  {
    label: "Faculty Resources",
    children: [
      { value: "grading", label: "Grading Queue", href: "/#grading", icon: CheckCircle2, badge: 5 },
      { value: "analytics", label: "Cohort Analytics", href: "/#analytics", icon: BarChart3 },
    ],
  },
];

export const adminNavBranches: BranchedMenuItem[] = [
  {
    label: "Platform Operations",
    children: [
      { value: "governance", label: "Governance & Overview", href: "/", icon: LayoutDashboard },
      { value: "users", label: "User Management", href: "/#users", icon: Users, badge: "14.2k" },
      { value: "courses", label: "Course Approvals", href: "/#courses", icon: BookOpenCheck, badge: 3 },
      { value: "finance", label: "Billing & Payouts", href: "/#finance", icon: CreditCard },
    ],
  },
  {
    label: "System Configuration",
    children: [
      { value: "rbac", label: "RBAC & Permissions", href: "/#rbac", icon: ShieldAlert },
      { value: "theme", label: "Branding & Appearance", href: "/#theme", icon: Layers },
      { value: "settings", label: "Platform Settings", href: "/#settings", icon: Settings },
    ],
  },
];
