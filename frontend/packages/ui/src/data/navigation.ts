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
} from "lucide-react";
import { BranchedMenuItem } from "../components/branched-menu";

export const studentNavBranches: BranchedMenuItem[] = [
  {
    label: "Learning Journey",
    children: [
      { value: "hub", label: "Learning Hub", href: "/", icon: Compass },
      { value: "courses", label: "My Courses", href: "/courses", icon: BookOpen, badge: 4 },
      { value: "learning-path", label: "Learning Path", href: "/learning-path", icon: Route, badge: "Unit 3" },
      { value: "study", label: "Focus Study (AI)", href: "/study", icon: BookMarked, badge: "Active" },
    ],
  },
  {
    label: "Practice & Mastery",
    children: [
      { value: "practice", label: "Focus Practice", href: "/practice", icon: Play },
      { value: "analytics", label: "Progress & Radar", href: "/analytics", icon: Award, badge: "77%" },
    ],
  },
];

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
