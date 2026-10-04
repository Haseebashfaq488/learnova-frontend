import { CurriculumCourseData } from "@learnova/types";

export const mockPhysicsCurriculum: CurriculumCourseData = {
  courseCode: "PHYS-101",
  courseName: "Physics 101: Mechanics & Dynamics",
  term: "Fall 2025",
  cohort: "Grade 10 AP Physics",
  totalUnits: 4,
  completedUnits: 3,
  publishedPercent: 82,
  totalClassroomHours: 16.4,
  structureMode: "Course > Unit > Lesson",
  lastAutosaved: "2m ago",
  topics: [
    {
      id: "unit-1",
      unitNumber: 1,
      title: "Kinematics in One & Two Dimensions",
      description: "Scalars vs vectors, displacement, instantaneous velocity, acceleration, and projectile motion under gravity.",
      publishPercent: 100,
      totalHours: 4.5,
      lessonsCount: 5,
      lessons: [
        { id: "les-1-1", title: "1.1 Vector Foundations & Cartesian Coordinate Framing", duration: "45m", type: "Video Lecture", isPublished: true },
        { id: "les-1-2", title: "1.2 Uniformly Accelerated Linear Motion & Graphing", duration: "50m", type: "Hands-on Lab", isPublished: true, hasAssessment: true },
        { id: "les-1-3", title: "1.3 Freefall & Gravitational Acceleration Models", duration: "40m", type: "Concept Check", isPublished: true },
        { id: "les-1-4", title: "1.4 Parabolic Trajectories in 2D Space", duration: "60m", type: "Video Lecture", isPublished: true },
        { id: "les-1-5", title: "1.5 Unit Mastery Assessment: Kinematics", duration: "35m", type: "Quiz", isPublished: true, hasAssessment: true },
      ],
    },
    {
      id: "unit-2",
      unitNumber: 2,
      title: "Newton's Laws of Motion & Force Systems",
      description: "Inertia, dynamic equilibrium, friction coefficients, incline planes, and coupled multiple-body tensions.",
      publishPercent: 100,
      totalHours: 5.2,
      lessonsCount: 5,
      lessons: [
        { id: "les-2-1", title: "2.1 Inertial Reference Frames & First Law", duration: "40m", type: "Video Lecture", isPublished: true },
        { id: "les-2-2", title: "2.2 Free Body Diagrams & F = ma Resolution", duration: "55m", type: "Hands-on Lab", isPublished: true, hasAssessment: true },
        { id: "les-2-3", title: "2.3 Static vs Kinetic Friction Forces", duration: "45m", type: "Concept Check", isPublished: true },
        { id: "les-2-4", title: "2.4 Inclined Planes & Multi-body Atwood Machines", duration: "65m", type: "Video Lecture", isPublished: true },
        { id: "les-2-5", title: "2.5 Unit 2 Checkpoint Evaluation", duration: "40m", type: "Quiz", isPublished: true, hasAssessment: true },
      ],
    },
    {
      id: "unit-3",
      unitNumber: 3,
      title: "Work, Energy & Conservative Force Fields",
      description: "Work-energy theorem, kinetic vs potential transformations, spring systems, power, and non-conservative dissipation.",
      publishPercent: 75,
      totalHours: 4.2,
      lessonsCount: 4,
      lessons: [
        { id: "les-3-1", title: "3.1 Mechanical Work and Scalar Dot Products", duration: "45m", type: "Video Lecture", isPublished: true },
        { id: "les-3-2", title: "3.2 Calculating Net Force and Acceleration in 2D Systems", duration: "50m", type: "Hands-on Lab", isPublished: true, hasAssessment: true },
        { id: "les-3-3", title: "3.3 Hooke's Law & Elastic Potential Energy", duration: "45m", type: "Concept Check", isPublished: true },
        { id: "les-3-4", title: "3.4 Mechanical Energy Conservation & Dissipation", duration: "55m", type: "Peer Review", isPublished: false, hasAssessment: true },
      ],
    },
    {
      id: "unit-4",
      unitNumber: 4,
      title: "Circular Motion, Centripetal Forces & Gravitation",
      description: "Uniform circular motion, banked curves, Newton's law of universal gravitation, and satellite orbits.",
      publishPercent: 40,
      totalHours: 2.5,
      lessonsCount: 4,
      lessons: [
        { id: "les-4-1", title: "4.1 Centripetal Acceleration & Tangential Velocity", duration: "45m", type: "Video Lecture", isPublished: true },
        { id: "les-4-2", title: "4.2 Banked Curves & Friction Force Thresholds", duration: "50m", type: "Hands-on Lab", isPublished: true },
        { id: "les-4-3", title: "4.3 Universal Gravitation & Planetary Orbits", duration: "40m", type: "Concept Check", isPublished: false },
        { id: "les-4-4", title: "4.4 Orbital Velocity & Kepler's Laws", duration: "50m", type: "Quiz", isPublished: false, hasAssessment: true },
      ],
    },
  ],
};

export const mockLessonDetailMap: Record<string, import("@learnova/types").LessonDetailData> = {
  "les-1-1": {
    id: "les-1-1",
    unitId: "unit-1",
    unitTitle: "Unit 1: Kinematics in One & Two Dimensions",
    courseCode: "PHYS-101",
    courseName: "Physics 101: Mechanics & Dynamics",
    title: "1.1 Vector Foundations & Cartesian Coordinate Framing",
    duration: "45m",
    type: "Video Lecture",
    isPublished: true,
    hasAssessment: false,
    learningObjectives: [
      "Distinguish between scalar quantities (mass, time, distance) and vector quantities (displacement, velocity, acceleration).",
      "Decompose 2D vectors into orthogonal Cartesian components using trigonometric projections.",
      "Calculate resultant vector magnitudes and angles in standard unit-vector notation.",
    ],
    lectureNotesMarkdown: `### 1. Vector Decompositions & Coordinate Framing

In Newtonian mechanics, physical vectors $\\vec{A}$ are framed in 2D Euclidean space using orthogonal unit vectors $\\hat{i}$ and $\\hat{j}$:

$$\\vec{A} = A_x \\hat{i} + A_y \\hat{j}$$

Where:
- $A_x = |\\vec{A}| \\cos(\\theta)$
- $A_y = |\\vec{A}| \\sin(\\theta)$
- $|\\vec{A}| = \\sqrt{A_x^2 + A_y^2}$
- $\\theta = \\arctan\\left(\\frac{A_y}{A_x}\\right)$

#### Key Pedagogical Traps:
- Quadrant ambiguity when evaluating $\\arctan(A_y / A_x)$.
- Confusing distance (path length) with displacement (straight-line chord vector).`,
    videoUrl: "https://www.youtube.com/watch?v=ihNZlp7iUHE",
    resources: [
      {
        id: "res-1",
        title: "Lecture Slides: Vector Foundations & Framing (PDF)",
        type: "pdf",
        url: "#",
        size: "3.4 MB",
        uploadedAt: "Oct 2, 2026",
        description: "Comprehensive 24-slide deck covering coordinate systems and basis vectors.",
      },
      {
        id: "res-2",
        title: "Vector Addition & Projection Sandbox Simulation",
        type: "simulation",
        url: "#",
        uploadedAt: "Oct 3, 2026",
        description: "Interactive SVG sandbox to drag and visualize resultant force vectors in real-time.",
      },
    ],
    assessment: {
      id: "ass-1",
      title: "Vector Decomposition Concept Check",
      type: "concept-check",
      totalPoints: 20,
      xpBounty: 75,
      timeLimitMinutes: 15,
      passingScorePercent: 80,
      questions: [],
    },
    studentStats: {
      completionRate: 94,
      averageScore: 88,
      totalSubmissions: 30,
      interventionCount: 1,
    },
  },
  "les-2-2": {
    id: "les-2-2",
    unitId: "unit-2",
    unitTitle: "Unit 2: Newton's Laws of Motion & Force Systems",
    courseCode: "PHYS-101",
    courseName: "Physics 101: Mechanics & Dynamics",
    title: "2.2 Free Body Diagrams & F = ma Resolution",
    duration: "55m",
    type: "Hands-on Lab",
    isPublished: true,
    hasAssessment: true,
    learningObjectives: [
      "Construct complete, isolated Free-Body Diagrams (FBDs) for multi-body mechanical systems.",
      "Apply Newton's Second Law along independent parallel and perpendicular coordinate axes.",
      "Solve for normal forces on inclined ramps with kinetic friction.",
    ],
    lectureNotesMarkdown: `### 2. Newton's 2nd Law on Inclined Planes

When a mass $m$ slides down an inclined plane with angle $\\theta$ and kinetic friction coefficient $\\mu_k$:

1. **Perpendicular Force Balance:**
   $$F_N = m g \\cos(\\theta)$$

2. **Kinetic Friction Force:**
   $$f_k = \\mu_k F_N = \\mu_k m g \\cos(\\theta)$$

3. **Parallel Net Force:**
   $$F_{\\text{net}, \\parallel} = m g \\sin(\\theta) - f_k = m g (\\sin\\theta - \\mu_k \\cos\\theta)$$

4. **Net Downward Acceleration:**
   $$a = g(\\sin\\theta - \\mu_k \\cos\\theta)$$`,
    videoUrl: "https://www.youtube.com/watch?v=ihNZlp7iUHE",
    resources: [
      {
        id: "res-201",
        title: "Incline Plane Virtual Friction Simulator Lab (Interactive)",
        type: "simulation",
        url: "#",
        uploadedAt: "Oct 1, 2026",
        description: "Interactive mass and angle adjustment simulator with real-time acceleration vectors.",
      },
      {
        id: "res-202",
        title: "Free Body Diagram Worksheet & Problem Set (PDF)",
        type: "worksheet",
        url: "#",
        size: "2.1 MB",
        uploadedAt: "Sep 29, 2026",
        description: "8 rigorous multi-body friction problems for AP Physics exam preparation.",
      },
    ],
    assessment: {
      id: "ass-202",
      title: "Newton's 2nd Law & Incline Plane Mastery Check",
      type: "mastery-quiz",
      totalPoints: 50,
      xpBounty: 120,
      timeLimitMinutes: 25,
      passingScorePercent: 75,
      questions: [],
    },
    studentStats: {
      completionRate: 88,
      averageScore: 82,
      totalSubmissions: 28,
      interventionCount: 3,
    },
  },
};

export const getLessonDetail = (lessonId: string): import("@learnova/types").LessonDetailData => {
  if (mockLessonDetailMap[lessonId]) {
    return mockLessonDetailMap[lessonId];
  }

  // Generate dynamic fallback for any lesson ID
  return {
    id: lessonId,
    unitId: "unit-1",
    unitTitle: "Unit 1: Kinematics & Mechanics",
    courseCode: "PHYS-101",
    courseName: "Physics 101: Mechanics & Dynamics",
    title: `Lesson ${lessonId.toUpperCase()}: Dynamic Study & Problem Set`,
    duration: "45m",
    type: "Video Lecture",
    isPublished: true,
    hasAssessment: true,
    learningObjectives: [
      "Master the foundational mathematical derivations for this topic.",
      "Apply theoretical principles to real-world laboratory simulations.",
      "Assess problem-solving confidence with interactive diagnostic check questions.",
    ],
    lectureNotesMarkdown: `### Lesson Overview & Theoretical Derivations\n\nThis lesson covers core concepts, analytical problem solving, and experimental validation.\n\n$$\\sum \\vec{F} = m\\vec{a}$$\n\nUse the tabs above to upload course resources, configure the assessment rubric, or prompt the AI question generator.`,
    resources: [
      {
        id: `res-${Date.now()}`,
        title: "Topic Lecture Notes & Reference Handout (PDF)",
        type: "pdf",
        url: "#",
        size: "1.8 MB",
        uploadedAt: "Today",
        description: "Standard pedagogical summary and formula sheet.",
      },
    ],
    assessment: {
      id: `ass-${lessonId}`,
      title: "Diagnostic Assessment Checkpoint",
      type: "concept-check",
      totalPoints: 30,
      xpBounty: 100,
      timeLimitMinutes: 20,
      passingScorePercent: 80,
      questions: [],
    },
    studentStats: {
      completionRate: 90,
      averageScore: 85,
      totalSubmissions: 26,
      interventionCount: 2,
    },
  };
};
