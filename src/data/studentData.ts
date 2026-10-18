import {
  Compass,
  BookOpen,
  Route,
  BookMarked,
  Play,
  Award,
  Zap,
  Sparkles,
  UserCircle,
  FileText,
  Search,
  CheckCircle2,
  Calendar,
  Clock,
  Layers,
  ShieldCheck,
  Flame,
  Cpu,
  Database,
  Network,
  Binary,
  Code2,
} from 'lucide-react';

export interface StudentProfile {
  name: string;
  role: string;
  level: number;
  levelTitle: string;
  tier: string;
  currentXp: number;
  nextLevelXp: number;
  streakDays: number;
  cohort: string;
  avatarUrl: string;
  masteredUnits: number;
  totalUnits: number;
  practiceAccuracy: number;
  weeklyStudyHours: number;
  enrolledCourseSlugs: string[];
}

export interface RadarMetric {
  concept: string;
  score: number;
  fullMark: number;
  color?: string;
}

export interface TopicMastery {
  id: string;
  topic: string;
  score: number;
  lessonsCompleted: number;
  totalLessons: number;
  status: 'mastered' | 'learning' | 'struggling';
  category: string;
}

export interface DailyScheduleItem {
  id: string;
  time: string;
  title: string;
  type: string;
  duration: string;
  done: boolean;
  active?: boolean;
}

export interface PracticeOption {
  id: string;
  label: string;
  text: string;
  isCorrect: boolean;
}

export interface PracticeQuestion {
  id: string;
  questionNumber: number;
  totalQuestions: number;
  topic: string;
  subtopic: string;
  difficulty: 'Foundational' | 'Intermediate' | 'Advanced';
  prompt: string;
  codeSnippet?: string;
  helperConcept?: string;
  explanation: string;
  options: PracticeOption[];
}

export interface GamificationBadge {
  id: string;
  name: string;
  description: string;
  category: 'Mastery' | 'Consistency' | 'Problem Solving' | 'AI Collaboration';
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
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
  xpReward: number;
  currentProgress: number;
  targetProgress: number;
  isCompleted: boolean;
}

export const studentProfile: StudentProfile = {
  name: 'Alex Rivera',
  role: 'Systems & Algorithms Scholar',
  level: 5,
  levelTitle: 'Senior Systems Apprentice',
  tier: 'Systems Architecture & Algorithms',
  currentXp: 1420,
  nextLevelXp: 2000,
  streakDays: 14,
  cohort: 'Fall 2026 • FAST-NUCES',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  masteredUnits: 3,
  totalUnits: 4,
  practiceAccuracy: 92,
  weeklyStudyHours: 12.8,
  enrolledCourseSlugs: [
    'cs101-computer-systems',
    'cs201-data-structures-algorithms',
  ],
};

export const nextLesson = {
  courseTitle: 'CS 101: Systems & Architecture',
  courseSlug: 'cs101-computer-systems',
  unitTitle: 'Unit 3: Memory Hierarchy & Virtual Memory',
  lessonCode: 'Lesson 3.2',
  title: 'Multilevel Cache Coherence & MESI Protocol',
  duration: '20 mins',
  interactiveElements: 'Interactive Bus Snooping Simulator & 4 Checkpoints',
  description:
    'Explore how multicore architectures maintain cache coherence across private L1/L2 caches using Modified, Exclusive, Shared, and Invalid states.',
  keyConcepts: [
    'MESI Protocol',
    'Bus Snooping vs Directory',
    'False Sharing & Cache Lines',
    'Write-Through vs Write-Back',
  ],
};

export const radarMetrics: RadarMetric[] = [
  { concept: 'Computer Architecture', score: 94, fullMark: 100 },
  { concept: 'Data Structures & Trees', score: 88, fullMark: 100 },
  { concept: 'Dynamic Programming', score: 82, fullMark: 100 },
  { concept: 'Operating Systems & VM', score: 76, fullMark: 100 },
  { concept: 'Network Protocols', score: 68, fullMark: 100 },
  { concept: 'Database Concurrency', score: 62, fullMark: 100 },
];

export const topicBreakdowns: TopicMastery[] = [
  {
    id: 'tb-1',
    topic: 'Memory Hierarchy, Caches & Spatial Locality',
    score: 94,
    lessonsCompleted: 5,
    totalLessons: 5,
    status: 'mastered',
    category: 'Computer Systems',
  },
  {
    id: 'tb-2',
    topic: 'Self-Balancing Trees (AVL, Red-Black)',
    score: 88,
    lessonsCompleted: 4,
    totalLessons: 4,
    status: 'mastered',
    category: 'Data Structures',
  },
  {
    id: 'tb-3',
    topic: 'Graph Algorithms & Shortest Paths (Dijkstra, A*)',
    score: 82,
    lessonsCompleted: 3,
    totalLessons: 4,
    status: 'learning',
    category: 'Algorithms',
  },
  {
    id: 'tb-4',
    topic: 'Virtual Memory, TLB Translation & Page Faults',
    score: 76,
    lessonsCompleted: 2,
    totalLessons: 3,
    status: 'learning',
    category: 'Operating Systems',
  },
  {
    id: 'tb-5',
    topic: 'TCP Congestion Control & Sliding Windows',
    score: 68,
    lessonsCompleted: 2,
    totalLessons: 4,
    status: 'learning',
    category: 'Networking',
  },
  {
    id: 'tb-6',
    topic: '2-Phase Locking & Serializable Isolation',
    score: 62,
    lessonsCompleted: 1,
    totalLessons: 3,
    status: 'struggling',
    category: 'Databases',
  },
];

export const dailySchedule: DailyScheduleItem[] = [
  {
    id: 'ds-1',
    time: '09:00 AM',
    title: 'Cache Coherence & Bus Snooping Visualizer',
    type: 'Interactive Simulation',
    duration: '25m',
    done: true,
  },
  {
    id: 'ds-2',
    time: '11:30 AM',
    title: 'Calibrated Practice: Red-Black Tree Rotations',
    type: 'Practice Arena',
    duration: '15m',
    done: false,
    active: true,
  },
  {
    id: 'ds-3',
    time: '03:00 PM',
    title: 'Live Architecture Review with Prof. Chen',
    type: 'Faculty Office Hours',
    duration: '45m',
    done: false,
  },
];

export const practiceQuestions: PracticeQuestion[] = [
  {
    id: 'pq-1',
    questionNumber: 1,
    totalQuestions: 5,
    topic: 'Memory Hierarchy & Caching',
    subtopic: 'Cache Miss Classification (Compulsory, Capacity, Conflict)',
    difficulty: 'Foundational',
    prompt:
      'In an 8 KB direct-mapped L1 cache with 64-byte blocks, two memory addresses that differ by an exact multiple of the cache size will map to the exact same cache index. What type of cache miss does this cause during alternating accesses?',
    codeSnippet: `// Alternating memory stride accesses
for (int i = 0; i < N; i++) {
    total += arrA[i]; // Maps to index 12
    total += arrB[i]; // Also maps to index 12
}`,
    helperConcept: 'Direct-mapped caches have exactly 1 slot per index; set associativity eliminates this.',
    explanation:
      'This is a Conflict (or Collision) miss. Because both addresses map to the exact same cache set in a direct-mapped structure, they continually evict each other ("cache thrashing"), even if the rest of the cache is completely empty.',
    options: [
      { id: 'opt-1-a', label: 'A', text: 'Compulsory (Cold) Miss', isCorrect: false },
      { id: 'opt-1-b', label: 'B', text: 'Conflict (Collision) Miss', isCorrect: true },
      { id: 'opt-1-c', label: 'C', text: 'Capacity Miss', isCorrect: false },
      { id: 'opt-1-d', label: 'D', text: 'Coherence Invalidation Miss', isCorrect: false },
    ],
  },
  {
    id: 'pq-2',
    questionNumber: 2,
    totalQuestions: 5,
    topic: 'Data Structures & Trees',
    subtopic: 'Red-Black Tree Invariants & Balance Guarantee',
    difficulty: 'Intermediate',
    prompt:
      'Which of the following is NOT a mandatory invariant of a valid Red-Black Tree?',
    helperConcept: 'Recall the 5 Red-Black invariants: Root is black, leaves (NIL) are black, no two red nodes adjacent, black-height is uniform.',
    explanation:
      'Option C is incorrect: Every path from the root to a leaf does NOT have to have the exact same total length. Rather, every path must contain the exact same number of BLACK nodes (Black-Height). This allows the longest path (alternating red-black) to be at most twice the shortest path (all black).',
    options: [
      { id: 'opt-2-a', label: 'A', text: 'The root node is always Black', isCorrect: false },
      { id: 'opt-2-b', label: 'B', text: 'If a node is Red, both of its children must be Black', isCorrect: false },
      { id: 'opt-2-c', label: 'C', text: 'Every path from the root to a leaf has the exact same total number of nodes', isCorrect: true },
      { id: 'opt-2-d', label: 'D', text: 'Every leaf node (NIL sentinel) is considered Black', isCorrect: false },
    ],
  },
  {
    id: 'pq-3',
    questionNumber: 3,
    totalQuestions: 5,
    topic: 'Graph Algorithms',
    subtopic: "Dijkstra's Shortest Path & Negative Edge Weights",
    difficulty: 'Intermediate',
    prompt:
      "Why does standard Dijkstra's algorithm fail to produce provably correct shortest paths on graphs containing negative edge weights?",
    codeSnippet: `// Dijkstra greedy relaxation
dist[v] = min(dist[v], dist[u] + weight(u, v));
visited.add(u); // Once popped from Min-Heap, u is never revisited`,
    helperConcept: 'Dijkstra assumes that adding edges can only monotonically increase or maintain path distance.',
    explanation:
      "Dijkstra relies on a greedy property: once a vertex is finalized and extracted from the priority queue, its distance is assumed minimal and never updated again. Negative weights violate this monotonicity, allowing an already 'finalized' node to be reached via a cheaper path later. Bellman-Ford or SPFA is required for graphs with negative weights.",
    options: [
      { id: 'opt-3-a', label: 'A', text: 'The algorithm will enter an infinite loop even with non-negative cycles', isCorrect: false },
      { id: 'opt-3-b', label: 'B', text: 'Greedy finalization prevents visited nodes from being relaxed if a cheaper negative path emerges later', isCorrect: true },
      { id: 'opt-3-c', label: 'C', text: 'Binary Min-Heaps cannot store negative integer values', isCorrect: false },
      { id: 'opt-3-d', label: 'D', text: 'Negative weights invert the direction of directed edges', isCorrect: false },
    ],
  },
  {
    id: 'pq-4',
    questionNumber: 4,
    totalQuestions: 5,
    topic: 'Operating Systems & Virtual Memory',
    subtopic: 'Page Table Translation & Two-Level Paging Latency',
    difficulty: 'Advanced',
    prompt:
      'Consider a system with 4 KB pages, a 2-level page table, and an access time to main memory of 100 ns. The TLB lookup takes 10 ns. If the TLB hit rate is 90%, what is the Effective Memory Access Time (EMAT)?',
    helperConcept: 'On TLB Hit: TLB (10ns) + Memory (100ns) = 110ns. On TLB Miss: TLB (10ns) + L1 Page Table (100ns) + L2 Page Table (100ns) + Memory (100ns) = 310ns.',
    explanation:
      'EMAT = Hit_Rate * (TLB_time + Mem_time) + Miss_Rate * (TLB_time + 2 * Mem_table_walks + Mem_time) = 0.90 * (10 + 100) + 0.10 * (10 + 100 + 100 + 100) = 0.90 * 110 + 0.10 * 310 = 99 + 31 = 130 ns.',
    options: [
      { id: 'opt-4-a', label: 'A', text: '110 ns', isCorrect: false },
      { id: 'opt-4-b', label: 'B', text: '130 ns', isCorrect: true },
      { id: 'opt-4-c', label: 'C', text: '150 ns', isCorrect: false },
      { id: 'opt-4-d', label: 'D', text: '210 ns', isCorrect: false },
    ],
  },
  {
    id: 'pq-5',
    questionNumber: 5,
    totalQuestions: 5,
    topic: 'Concurrency & Systems',
    subtopic: "Coffman Deadlock Conditions & Resource Allocation",
    difficulty: 'Foundational',
    prompt:
      'Which of the following is NOT one of the four necessary Coffman conditions required for a system deadlock to occur?',
    helperConcept: 'Coffman conditions: Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait.',
    explanation:
      "The four necessary and sufficient Coffman conditions are: 1. Mutual Exclusion, 2. Hold and Wait, 3. No Preemption, and 4. Circular Wait. 'Preemptive Priority Scheduling' is an operating system scheduling technique, not a deadlock condition.",
    options: [
      { id: 'opt-5-a', label: 'A', text: 'Mutual Exclusion', isCorrect: false },
      { id: 'opt-5-b', label: 'B', text: 'Hold and Wait', isCorrect: false },
      { id: 'opt-5-c', label: 'C', text: 'Circular Wait', isCorrect: false },
      { id: 'opt-5-d', label: 'D', text: 'Preemptive Priority Scheduling', isCorrect: true },
    ],
  },
];

export const gamificationBadges: GamificationBadge[] = [
  {
    id: 'badge-1',
    name: 'Hardware Architect',
    description: 'Scored 94% on CPU Pipelining and Cache Memory Hierarchy in CS 101.',
    category: 'Mastery',
    rarity: 'Legendary',
    icon: 'Cpu',
    xpReward: 500,
    isUnlocked: true,
    unlockedAt: '2 days ago',
    criteria: 'Score >= 90% on Cache & Pipelining Unit Assessment',
  },
  {
    id: 'badge-2',
    name: '14-Day Code Streak',
    description: 'Maintained uninterrupted daily conceptual practice on Learnova.',
    category: 'Consistency',
    rarity: 'Epic',
    icon: 'Flame',
    xpReward: 350,
    isUnlocked: true,
    unlockedAt: 'Yesterday',
    criteria: 'Solve at least 2 practice problems every day for 14 days',
  },
  {
    id: 'badge-3',
    name: 'Tree Master',
    description: 'Implemented and balanced AVL and Red-Black trees with 0 balance violations.',
    category: 'Mastery',
    rarity: 'Epic',
    icon: 'Binary',
    xpReward: 300,
    isUnlocked: true,
    unlockedAt: '1 week ago',
    criteria: 'Pass all self-balancing tree invariant checkpoints',
  },
  {
    id: 'badge-4',
    name: 'Socratic Collaborator',
    description: 'Engaged in 25 deep reasoning sessions with the Learnova AI Study Assistant.',
    category: 'AI Collaboration',
    rarity: 'Rare',
    icon: 'Sparkles',
    xpReward: 200,
    isUnlocked: true,
    unlockedAt: '3 days ago',
    criteria: 'Complete 25 guided AI explanations without hints',
  },
  {
    id: 'badge-5',
    name: 'Cache Invalidator',
    description: 'Identify 10 false-sharing hazards in concurrent multicore benchmark traces.',
    category: 'Problem Solving',
    rarity: 'Rare',
    icon: 'Zap',
    xpReward: 250,
    isUnlocked: false,
    progressPercent: 70,
    criteria: '7/10 cache race traces correctly analyzed',
  },
  {
    id: 'badge-6',
    name: 'Kernel Hacker Elite',
    description: 'Complete the Virtual Memory and Paging Simulator with zero TLB thrashing.',
    category: 'Mastery',
    rarity: 'Legendary',
    icon: 'Award',
    xpReward: 1000,
    isUnlocked: false,
    progressPercent: 45,
    criteria: 'Attain Level 10 and finish OS Virtual Memory Lab',
  },
];

export const dailyQuests: DailyQuest[] = [
  {
    id: 'quest-1',
    title: 'Solve 3 Calibrated Practice Questions',
    xpReward: 100,
    currentProgress: 2,
    targetProgress: 3,
    isCompleted: false,
  },
  {
    id: 'quest-2',
    title: 'Explore a New Syllabus Topic',
    xpReward: 80,
    currentProgress: 1,
    targetProgress: 1,
    isCompleted: true,
  },
  {
    id: 'quest-3',
    title: 'Engage with AI Study Assistant',
    xpReward: 60,
    currentProgress: 1,
    targetProgress: 1,
    isCompleted: true,
  },
];
