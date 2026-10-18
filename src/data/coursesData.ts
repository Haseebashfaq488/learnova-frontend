import { Course } from '../types/course';

export const coursesData: Course[] = [
  {
    id: 'cs101',
    slug: 'foundations-of-computer-science',
    code: 'CS101',
    title: 'Foundations of Computer Science & Procedural Logic',
    category: 'Core Computer Science',
    level: 'Foundational',
    duration: '6 Weeks',
    estimatedHours: '32 Hours',
    lessonsCount: 24,
    practicesCount: 18,
    rating: 4.9,
    studentsEnrolled: '2,840 Enrolled',
    description: 'Master core procedural programming, memory variables, branching logic, loops, and function call frames with diagnostic baselines.',
    longDescription: 'Engineered for foundational learners in secondary and early college education, this course establishes rock-solid computational thinking. Through Learnova\'s adaptive engine, you begin with a diagnostic baseline that pinpoints your understanding of variables, conditional branches, and iterative loops before guiding you step-by-step into modular function abstractions.',
    prerequisites: ['No formal prerequisites', 'Diagnostic Baseline Assessment required on entry'],
    prerequisiteDAG: {
      prerequisiteNodes: ['High School Mathematics / Basic Algebra'],
      currentCourse: 'CS101: Procedural Logic',
      unlocksNodes: ['CS201: Data Structures & Call Stack', 'CS108: Web Architecture']
    },
    whatYouWillLearn: [
      'Deconstruct real-world problems into structured procedural algorithms.',
      'Understand how variables, primitive datatypes, and references occupy system memory.',
      'Construct robust conditional branching logic without logical edge traps.',
      'Trace loop execution states and avoid off-by-one and indefinite loop errors.',
      'Understand function activation records and local scope boundaries.',
      'Receive contextual AI analogies and step-by-step worked trace tables.'
    ],
    syllabus: [
      {
        id: 'unit-1',
        unitNumber: 1,
        title: 'Diagnostic Baseline & Variables in Memory',
        description: 'Understand how computers allocate memory and manage state across basic datatypes.',
        lessons: [
          { id: 'l1', title: 'Diagnostic Assessment: Computational Baseline', duration: '20 min', type: 'diagnostic' },
          { id: 'l2', title: 'Memory Representation of Primitives & Variables', duration: '35 min', type: 'video' },
          { id: 'l3', title: 'Type Systems, Casting, and Value Assignments', duration: '25 min', type: 'reading' },
          { id: 'l4', title: 'Interactive Lab: Memory State Simulation', duration: '40 min', type: 'code' },
          { id: 'l5', title: 'Adaptive Practice: Variable Mutability & Scope', duration: '30 min', type: 'practice' }
        ]
      },
      {
        id: 'unit-2',
        unitNumber: 2,
        title: 'Control Flow, Conditionals & Boolean Algebra',
        description: 'Trace logical expressions and build multi-way decision trees.',
        lessons: [
          { id: 'l6', title: 'Boolean Operators, Truth Tables, and Short-Circuiting', duration: '30 min', type: 'video' },
          { id: 'l7', title: 'Nested Conditionals and Defensive Logic', duration: '40 min', type: 'reading' },
          { id: 'l8', title: 'Code Lab: Branching Decision Simulator', duration: '45 min', type: 'code' },
          { id: 'l9', title: 'Calibrated Practice: Conditionals & Truth Evaluations', duration: '30 min', type: 'practice' }
        ]
      },
      {
        id: 'unit-3',
        unitNumber: 3,
        title: 'Iteration, Loop Invariants & Sequence Processing',
        description: 'Master for-loops, while-loops, loop guards, and termination bounds.',
        lessons: [
          { id: 'l10', title: 'Mechanics of Iteration: Initialization, Guard, and Step', duration: '35 min', type: 'video' },
          { id: 'l11', title: 'Loop Invariants and Off-By-One Error Prevention', duration: '30 min', type: 'reading' },
          { id: 'l12', title: 'Interactive Debugging: Infinite Loop Diagnostic', duration: '45 min', type: 'code' },
          { id: 'l13', title: 'Adaptive Assessment: Iterative Patterns & Tracing', duration: '35 min', type: 'practice' }
        ]
      },
      {
        id: 'unit-4',
        unitNumber: 4,
        title: 'Functions, Activation Frames & Scope Isolation',
        description: 'Organize code into pure reusable units with isolated stack frames.',
        lessons: [
          { id: 'l14', title: 'Function Signatures, Parameters vs Arguments', duration: '30 min', type: 'video' },
          { id: 'l15', title: 'Call Stack Visualization: Push, Frame Allocation & Pop', duration: '40 min', type: 'reading' },
          { id: 'l16', title: 'Capstone Lab: Procedural Text Processing Engine', duration: '60 min', type: 'code' },
          { id: 'l17', title: 'Final Formal Exam: Procedural Mastery', duration: '45 min', type: 'practice' }
        ]
      }
    ],
    instructor: {
      name: 'Dr. Tariq Mahmood',
      title: 'Associate Professor & Curriculum Lead',
      department: 'Department of Computer Science, FAST-NUCES',
      avatarText: 'TM'
    },
    tags: ['Procedural Logic', 'Memory', 'Conditionals', 'Loops', 'Call Stack'],
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cs201',
    slug: 'data-structures-and-call-stack',
    code: 'CS201',
    title: 'Data Structures & Call Stack Mechanics',
    category: 'Core Computer Science',
    level: 'Intermediate',
    duration: '8 Weeks',
    estimatedHours: '48 Hours',
    lessonsCount: 32,
    practicesCount: 26,
    rating: 4.95,
    studentsEnrolled: '2,190 Enrolled',
    description: 'Explore pointers, linear memory, recursion execution order, call stack frames, trees, and DAG prerequisite networks.',
    longDescription: 'Building directly upon procedural foundations, CS201 explores how modern systems store, traverse, and manipulate structured information. You will dissect memory layouts, pointers, contiguous vs node-linked memory, and the mechanics of recursion—including return order, base conditions, and call frame unwinding—backed by Learnova\'s interactive execution tracer.',
    prerequisites: ['CS101: Foundations of Computer Science or Equivalent Diagnostic Score'],
    prerequisiteDAG: {
      prerequisiteNodes: ['CS101: Procedural Logic'],
      currentCourse: 'CS201: Data Structures',
      unlocksNodes: ['CS204: Algorithms & Dynamic Programming', 'CS305: Database Systems']
    },
    whatYouWillLearn: [
      'Compare contiguous array allocation against dynamic linked node representations.',
      'Trace call stack push and pop mechanics during deep recursive executions.',
      'Implement stacks, queues, and priority heaps from fundamental pointers.',
      'Traverse binary search trees, validating balance and search invariants.',
      'Detect and prevent cyclic deadlocks in Directed Acyclic Graphs (DAGs).',
      'Solve calibrated practice items with instant step-by-step AI analogies.'
    ],
    syllabus: [
      {
        id: 'unit-1',
        unitNumber: 1,
        title: 'Memory Allocation, Pointers & Linked Lists',
        description: 'Contiguous arrays vs linked node traversal, pointers, and memory leaks.',
        lessons: [
          { id: 'l18', title: 'Diagnostic Baseline: Pointer & Memory Fundamentals', duration: '25 min', type: 'diagnostic' },
          { id: 'l19', title: 'Dynamic Memory Allocation on the Heap', duration: '40 min', type: 'video' },
          { id: 'l20', title: 'Singly and Doubly Linked Lists Implementations', duration: '45 min', type: 'code' },
          { id: 'l21', title: 'Adaptive Practice: Node Insertion & Pointer Tracing', duration: '30 min', type: 'practice' }
        ]
      },
      {
        id: 'unit-2',
        unitNumber: 2,
        title: 'Call Stack Mechanics & Recursion Unwinding',
        description: 'Understand cafeteria tray stacks, base cases, and return execution order.',
        lessons: [
          { id: 'l22', title: 'Call Stack Anatomy: Return Addresses & Stack Overflow', duration: '35 min', type: 'video' },
          { id: 'l23', title: 'Visual Scaffolding: Recursion as a Tree of Frames', duration: '40 min', type: 'reading' },
          { id: 'l24', title: 'Interactive Lab: Stepping Through Recursive countdown(n)', duration: '45 min', type: 'code' },
          { id: 'l25', title: 'Calibrated Practice: Return Order & Tail Recursion', duration: '35 min', type: 'practice' }
        ]
      },
      {
        id: 'unit-3',
        unitNumber: 3,
        title: 'Tree Data Structures & Hierarchical Graphs',
        description: 'Binary trees, BST invariants, and DFS/BFS tree traversals.',
        lessons: [
          { id: 'l26', title: 'Binary Search Tree Operations (Insert, Search, Delete)', duration: '45 min', type: 'video' },
          { id: 'l27', title: 'In-order, Pre-order, and Post-order Traversals', duration: '35 min', type: 'reading' },
          { id: 'l28', title: 'Interactive Lab: Self-Balancing Tree Simulation', duration: '50 min', type: 'code' },
          { id: 'l29', title: 'Adaptive Practice: Tree Invariant Validation', duration: '35 min', type: 'practice' }
        ]
      },
      {
        id: 'unit-4',
        unitNumber: 4,
        title: 'Directed Acyclic Graphs (DAGs) & Prerequisite Sequencing',
        description: 'Topological sorting, cycle detection, and dependency resolution algorithms.',
        lessons: [
          { id: 'l30', title: 'Representing DAGs with Adjacency Lists and Matrices', duration: '40 min', type: 'video' },
          { id: 'l31', title: 'Kahn\'s Algorithm and DFS-based Topological Ordering', duration: '45 min', type: 'reading' },
          { id: 'l32', title: 'Capstone Project: Learnova Prerequisite DAG Validator', duration: '75 min', type: 'code' },
          { id: 'l33', title: 'Formal Mastery Examination: Data Structures', duration: '50 min', type: 'practice' }
        ]
      }
    ],
    instructor: {
      name: 'Prof. Ayesha Siddiqui',
      title: 'Head of Software Engineering Stream',
      department: 'Department of Computer Science, FAST-NUCES',
      avatarText: 'AS'
    },
    tags: ['Data Structures', 'Recursion', 'Call Stack', 'BST', 'DAGs', 'Pointers'],
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cs204',
    slug: 'algorithms-and-dynamic-programming',
    code: 'CS204',
    title: 'Algorithms & Dynamic Programming',
    category: 'Algorithms & Mathematics',
    level: 'Advanced',
    duration: '10 Weeks',
    estimatedHours: '60 Hours',
    lessonsCount: 40,
    practicesCount: 30,
    rating: 4.98,
    studentsEnrolled: '1,780 Enrolled',
    description: 'Master Big-O analysis, divide and conquer, greedy strategies, dynamic programming tables, and shortest-path graph algorithms.',
    longDescription: 'Designed for advanced undergraduates, CS204 teaches how to formulate and optimize computational solutions with mathematical rigor. Learn how to transform exponential-time recursive calls into polynomial-time memoized tables, analyze recurrences with the Master Theorem, and find optimal trajectories using Dijkstra and Bellman-Ford.',
    prerequisites: ['CS201: Data Structures & Call Stack Mechanics', 'Discrete Mathematics'],
    prerequisiteDAG: {
      prerequisiteNodes: ['CS201: Data Structures', 'Discrete Mathematics'],
      currentCourse: 'CS204: Algorithms',
      unlocksNodes: ['CS310: Contextual Machine Learning', 'Advanced Graph Systems']
    },
    whatYouWillLearn: [
      'Evaluate asymptotic upper, lower, and tight complexity bounds (O, Ω, Θ).',
      'Formulate divide-and-conquer solutions and solve recurrences using Master Theorem.',
      'Identify overlapping subproblems and optimal substructure for dynamic programming.',
      'Construct bottom-up tabulation tables and top-down memoization caches.',
      'Implement Dijkstra and Bellman-Ford for weighted shortest-path resolution.',
      'Validate algorithmic correctness through formal inductive proofs and invariants.'
    ],
    syllabus: [
      {
        id: 'unit-1',
        unitNumber: 1,
        title: 'Asymptotic Analysis & Divide-and-Conquer',
        description: 'Big-O notation, recurrences, Merge Sort, and Quick Sort partitions.',
        lessons: [
          { id: 'l34', title: 'Diagnostic Baseline: Recurrence Relations', duration: '25 min', type: 'diagnostic' },
          { id: 'l35', title: 'Formal Asymptotic Bounds and Growth Rates', duration: '40 min', type: 'video' },
          { id: 'l36', title: 'Divide and Conquer: Master Theorem in Depth', duration: '45 min', type: 'reading' },
          { id: 'l37', title: 'Calibrated Practice: Sorting Bounds & Inversions', duration: '35 min', type: 'practice' }
        ]
      },
      {
        id: 'unit-2',
        unitNumber: 2,
        title: 'Dynamic Programming Foundations: Memoization vs Tabulation',
        description: 'Knapsack 0/1, Longest Common Subsequence, and Matrix Chain Multiplication.',
        lessons: [
          { id: 'l38', title: 'Principle of Optimality & Overlapping Subproblems', duration: '40 min', type: 'video' },
          { id: 'l39', title: 'Fibonacci & Coin Change: From Recursion to Memoization', duration: '45 min', type: 'reading' },
          { id: 'l40', title: 'Interactive Lab: 0/1 Knapsack Table Construction', duration: '55 min', type: 'code' },
          { id: 'l41', title: 'Adaptive Practice: State Transition Formulations', duration: '40 min', type: 'practice' }
        ]
      },
      {
        id: 'unit-3',
        unitNumber: 3,
        title: 'Greedy Paradigms & Matroid Theory',
        description: 'Activity selection, Huffman coding, and Minimum Spanning Trees (Kruskal & Prim).',
        lessons: [
          { id: 'l42', title: 'The Greedy Choice Property and Proofs of Optimality', duration: '40 min', type: 'video' },
          { id: 'l43', title: 'Kruskal\'s Algorithm with Disjoint Set Union (Union-Find)', duration: '50 min', type: 'code' },
          { id: 'l44', title: 'Adaptive Practice: Greedy vs DP Decision Frameworks', duration: '35 min', type: 'practice' }
        ]
      },
      {
        id: 'unit-4',
        unitNumber: 4,
        title: 'Graph Traversal & Shortest Path Trajectories',
        description: 'Dijkstra with priority queues, Bellman-Ford negative edge detection, and Floyd-Warshall.',
        lessons: [
          { id: 'l45', title: 'Single-Source Shortest Paths: Dijkstra Mechanics', duration: '45 min', type: 'video' },
          { id: 'l46', title: 'Bellman-Ford and Negative Cycle Identification', duration: '40 min', type: 'reading' },
          { id: 'l47', title: 'Capstone Lab: Adaptive Navigation Engine Routing', duration: '75 min', type: 'code' },
          { id: 'l48', title: 'Comprehensive Algorithms Examination', duration: '60 min', type: 'practice' }
        ]
      }
    ],
    instructor: {
      name: 'Dr. Bilal Qureshi',
      title: 'Professor of Theoretical Computer Science',
      department: 'Department of Computer Science, FAST-NUCES',
      avatarText: 'BQ'
    },
    tags: ['Algorithms', 'Dynamic Programming', 'Graph Theory', 'Complexity', 'Big-O'],
    imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cs305',
    slug: 'database-systems-and-schema-design',
    code: 'CS305',
    title: 'Database Systems & Relational Schema Design',
    category: 'Systems & Architecture',
    level: 'Intermediate',
    duration: '7 Weeks',
    estimatedHours: '42 Hours',
    lessonsCount: 28,
    practicesCount: 20,
    rating: 4.88,
    studentsEnrolled: '1,650 Enrolled',
    description: 'Relational algebra, normal forms (1NF through BCNF), complex SQL optimization, indexing strategies, and ACID transaction isolation.',
    longDescription: 'Reliable data models are the foundation of modern web systems. This course explores the mathematics of relational algebra, functional dependencies, schema normalization up to Boyce-Codd Normal Form (BCNF), index structures (B+ Trees), and PostgreSQL transaction isolation levels under concurrent access.',
    prerequisites: ['CS101: Foundations of Computer Science'],
    prerequisiteDAG: {
      prerequisiteNodes: ['CS101: Procedural Logic'],
      currentCourse: 'CS305: Database Systems',
      unlocksNodes: ['Enterprise Distributed Storage', 'Data Warehouse Architecture']
    },
    whatYouWillLearn: [
      'Translate business logic into normalized entity-relationship schemas.',
      'Calculate functional dependencies and decompose tables into 3NF and BCNF.',
      'Compose high-performance SQL queries with multi-table joins and subqueries.',
      'Analyze query execution plans with EXPLAIN ANALYZE and B+ Tree indexing.',
      'Understand ACID guarantees and solve dirty reads and phantom record anomalies.',
      'Design role-based database security and privacy audit logs.'
    ],
    syllabus: [
      {
        id: 'unit-1',
        unitNumber: 1,
        title: 'Relational Algebra & Conceptual Modeling',
        description: 'Selection, projection, Cartesian product, joins, and ER diagrams.',
        lessons: [
          { id: 'l49', title: 'Diagnostic Baseline: Relational Concepts', duration: '20 min', type: 'diagnostic' },
          { id: 'l50', title: 'Relational Model & Set-Theoretic Algebra', duration: '40 min', type: 'video' },
          { id: 'l51', title: 'ER Modeling to Relational Schema Mapping', duration: '35 min', type: 'reading' },
          { id: 'l52', title: 'Adaptive Practice: Relational Algebra Expressions', duration: '30 min', type: 'practice' }
        ]
      },
      {
        id: 'unit-2',
        unitNumber: 2,
        title: 'Functional Dependencies & Normalization (1NF–BCNF)',
        description: 'Lossless joins, dependency preservation, anomalies, and normalization steps.',
        lessons: [
          { id: 'l53', title: 'Insertion, Deletion, and Update Anomalies', duration: '35 min', type: 'video' },
          { id: 'l54', title: 'Decomposition into 1NF, 2NF, 3NF, and BCNF', duration: '45 min', type: 'reading' },
          { id: 'l55', title: 'Interactive Lab: Schema Normalizer & Dependency Verifier', duration: '50 min', type: 'code' },
          { id: 'l56', title: 'Adaptive Practice: Minimal Cover & Normal Form Check', duration: '35 min', type: 'practice' }
        ]
      },
      {
        id: 'unit-3',
        unitNumber: 3,
        title: 'Advanced SQL Query Execution & Indexing',
        description: 'Window functions, CTEs, B+ Tree indices, and planner optimization.',
        lessons: [
          { id: 'l57', title: 'Complex Joins, Aggregations, and Window Functions', duration: '45 min', type: 'video' },
          { id: 'l58', title: 'B+ Tree Index Internals and Query Cost Estimation', duration: '40 min', type: 'reading' },
          { id: 'l59', title: 'Interactive SQL Console: Optimizing Slow Queries', duration: '50 min', type: 'code' },
          { id: 'l60', title: 'Calibrated Practice: Query Optimization Challenges', duration: '35 min', type: 'practice' }
        ]
      },
      {
        id: 'unit-4',
        unitNumber: 4,
        title: 'Transactions, Concurrency Control & ACID Guarantees',
        description: 'Serializability, two-phase locking (2PL), deadlock resolution, and WAL logs.',
        lessons: [
          { id: 'l61', title: 'ACID Properties and Transaction Schedules', duration: '40 min', type: 'video' },
          { id: 'l62', title: 'Locking Protocols and MVCC (Multi-Version Concurrency)', duration: '40 min', type: 'reading' },
          { id: 'l63', title: 'Capstone Project: Learnova Assessment Results Schema', duration: '70 min', type: 'code' },
          { id: 'l64', title: 'Final Database Mastery Examination', duration: '45 min', type: 'practice' }
        ]
      }
    ],
    instructor: {
      name: 'Dr. Usman Farooq',
      title: 'Database Architecture Specialist',
      department: 'Department of Computer Science, FAST-NUCES',
      avatarText: 'UF'
    },
    tags: ['Database', 'SQL', 'PostgreSQL', 'Normalization', 'ACID', 'Indexing'],
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cs310',
    slug: 'adaptive-learning-ai-and-bkt',
    code: 'CS310',
    title: 'Contextual Machine Learning & Adaptive AI Systems',
    category: 'Data & AI',
    level: 'Advanced',
    duration: '9 Weeks',
    estimatedHours: '54 Hours',
    lessonsCount: 36,
    practicesCount: 25,
    rating: 4.96,
    studentsEnrolled: '1,430 Enrolled',
    description: 'Bayesian Knowledge Tracing (BKT), Elo mastery ratings, gradient descent, contextual LLM prompting, and decoupled educational gamification.',
    longDescription: 'Explore the technical mechanics that power modern intelligent tutoring systems and adaptive learning platforms like Learnova. In this advanced elective, you will analyze Bayesian Knowledge Tracing (BKT) equations, calibrate item difficulty with Elo algorithms, build contextual LLM scaffolding agents, and enforce strict pedagogical safety guardrails.',
    prerequisites: ['CS204: Algorithms & Dynamic Programming', 'Probability and Statistics'],
    prerequisiteDAG: {
      prerequisiteNodes: ['CS204: Algorithms', 'Probability & Statistics'],
      currentCourse: 'CS310: Adaptive AI Systems',
      unlocksNodes: ['Autonomous Intelligent Tutoring Research', 'LLM Agent Architectures']
    },
    whatYouWillLearn: [
      'Model student mastery state using Bayesian Knowledge Tracing (BKT) probability equations.',
      'Implement Elo rating updates for continuous item difficulty calibration.',
      'Build LLM adapters with contextual grounding, caching, and fallback policies.',
      'Design educational scaffolding that provides analogies without leaking answers.',
      'Enforce academic integrity by separating gamification rewards from evaluation scores.',
      'Construct evaluation pipelines to measure diagnostic calibration accuracy.'
    ],
    syllabus: [
      {
        id: 'unit-1',
        unitNumber: 1,
        title: 'Diagnostic Baseline & Knowledge Tracing Mathematics',
        description: 'Hidden Markov models, prior probabilities, slip and guess parameters in BKT.',
        lessons: [
          { id: 'l65', title: 'Diagnostic Baseline: Probability & State Models', duration: '25 min', type: 'diagnostic' },
          { id: 'l66', title: 'Mathematical Foundations of Bayesian Knowledge Tracing', duration: '45 min', type: 'video' },
          { id: 'l67', title: 'Slip and Guess Rates: Modeling Imperfect Evidence', duration: '40 min', type: 'reading' },
          { id: 'l68', title: 'Interactive Code Lab: Simulating Student Mastery Transitions', duration: '55 min', type: 'code' },
          { id: 'l69', title: 'Adaptive Practice: Posterior Mastery Estimation', duration: '35 min', type: 'practice' }
        ]
      },
      {
        id: 'unit-2',
        unitNumber: 2,
        title: 'Item Response Theory & Elo Difficulty Calibration',
        description: 'Dynamic question rating updates based on student attempts and response latency.',
        lessons: [
          { id: 'l70', title: 'From Chess to Learning: Elo Rating Systems for Assessment', duration: '40 min', type: 'video' },
          { id: 'l71', title: 'Latent Ability Curves and 1-Parameter Logistic Models', duration: '45 min', type: 'reading' },
          { id: 'l72', title: 'Code Lab: Building a Calibrated Item Bank Simulator', duration: '55 min', type: 'code' },
          { id: 'l73', title: 'Adaptive Practice: Calibrating Question Difficulty Ratings', duration: '35 min', type: 'practice' }
        ]
      },
      {
        id: 'unit-3',
        unitNumber: 3,
        title: 'Contextual LLM Learning Scaffolding & Analogies',
        description: 'Grounding AI explanations in course syllabus, prompt caching, and cost control.',
        lessons: [
          { id: 'l74', title: 'Prompt Scaffolding: Analogy Generation without Answer Leakage', duration: '40 min', type: 'video' },
          { id: 'l75', title: 'Semantic Caching and Resilient Fallback Architectures', duration: '35 min', type: 'reading' },
          { id: 'l76', title: 'Interactive Lab: Building the Learnova AI Scaffolding Assistant', duration: '60 min', type: 'code' },
          { id: 'l77', title: 'Adaptive Practice: AI Safety & Rubric Alignment', duration: '35 min', type: 'practice' }
        ]
      },
      {
        id: 'unit-4',
        unitNumber: 4,
        title: 'Instructor Verification & Decoupled Engagement Engines',
        description: 'Teacher gatekeeping pipelines, audit logging, and isolated gamification XP.',
        lessons: [
          { id: 'l78', title: 'Human-in-the-Loop Governance: Reviewing AI Candidate Questions', duration: '35 min', type: 'video' },
          { id: 'l79', title: 'Gamification Decoupling: Preventing Grade Inflation with Streaks/XP', duration: '40 min', type: 'reading' },
          { id: 'l80', title: 'Capstone Project: Adaptive Learning Loop Simulation', duration: '80 min', type: 'code' },
          { id: 'l81', title: 'Final Formal Mastery Examination: Adaptive AI', duration: '50 min', type: 'practice' }
        ]
      }
    ],
    instructor: {
      name: 'Dr. Khurram Shahzad',
      title: 'Director of AI Systems & FYP Advisor',
      department: 'Department of Computer Science, FAST-NUCES',
      avatarText: 'KS'
    },
    tags: ['Machine Learning', 'Adaptive AI', 'BKT', 'Elo Rating', 'LLMs', 'Scaffolding'],
    imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cs108',
    slug: 'web-architecture-and-modern-frontend',
    code: 'CS108',
    title: 'Web Architecture & Modern Frontend Engineering',
    category: 'Web & Software',
    level: 'Foundational',
    duration: '6 Weeks',
    estimatedHours: '36 Hours',
    lessonsCount: 24,
    practicesCount: 16,
    rating: 4.87,
    studentsEnrolled: '2,410 Enrolled',
    description: 'DOM event loop, async JavaScript promises, component lifecycles, accessible tokens, and responsive UI design systems.',
    longDescription: 'Explore the modern web platform from first principles. Understand how browsers parse HTML/CSS, the single-threaded asynchronous JavaScript event loop, macro-tasks and micro-tasks, and how modern component frameworks compose high-speed user interfaces that adhere to accessibility standards (WCAG) and design tokens.',
    prerequisites: ['CS101: Foundations of Computer Science or Basic Programming'],
    prerequisiteDAG: {
      prerequisiteNodes: ['CS101: Procedural Logic'],
      currentCourse: 'CS108: Web Architecture',
      unlocksNodes: ['Fullstack Cloud Platforms', 'Distributed Frontend Engineering']
    },
    whatYouWillLearn: [
      'Trace how browsers parse the DOM tree, calculate layout, and paint pixels.',
      'Master the JavaScript Event Loop, call stack, task queues, and microtasks.',
      'Handle asynchronous HTTP operations with Promises and async/await cleanly.',
      'Implement structured design tokens with CSS variables and utility frameworks.',
      'Build accessible interfaces compliant with keyboard navigation and ARIA roles.',
      'Create fluid, lag-free UI animations with hardware-accelerated transforms.'
    ],
    syllabus: [
      {
        id: 'unit-1',
        unitNumber: 1,
        title: 'Browser Architecture & The DOM Tree',
        description: 'Rendering pipelines, critical rendering path, and DOM tree traversal.',
        lessons: [
          { id: 'l82', title: 'Diagnostic Baseline: Web Standards & Markup', duration: '20 min', type: 'diagnostic' },
          { id: 'l83', title: 'How Browsers Work: DOM, CSSOM, Render Tree, and Paint', duration: '40 min', type: 'video' },
          { id: 'l84', title: 'DOM Mutation and Layout Thrashing Prevention', duration: '35 min', type: 'reading' },
          { id: 'l85', title: 'Interactive Lab: Inspecting Critical Rendering Paths', duration: '45 min', type: 'code' },
          { id: 'l86', title: 'Adaptive Practice: DOM Tree Traversal & Events', duration: '30 min', type: 'practice' }
        ]
      },
      {
        id: 'unit-2',
        unitNumber: 2,
        title: 'Asynchronous JavaScript & The Event Loop',
        description: 'Call stack, Web APIs, Callback Queue, Microtask Queue, and Promises.',
        lessons: [
          { id: 'l87', title: 'Single-Threaded Concurrency: The Event Loop Demystified', duration: '45 min', type: 'video' },
          { id: 'l88', title: 'Promises, Microtasks, and async/await Execution Order', duration: '40 min', type: 'reading' },
          { id: 'l89', title: 'Interactive Debugger: Tracing Asynchronous Timers', duration: '50 min', type: 'code' },
          { id: 'l90', title: 'Calibrated Practice: Predict the Console Output', duration: '35 min', type: 'practice' }
        ]
      },
      {
        id: 'unit-3',
        unitNumber: 3,
        title: 'Component State & Modern React Architecture',
        description: 'Virtual DOM reconciliation, hooks, unidirectional data flow, and props.',
        lessons: [
          { id: 'l91', title: 'Component Composition and Pure Functional UIs', duration: '40 min', type: 'video' },
          { id: 'l92', title: 'State Mechanics: useState, useEffect, and Lifecycle Rules', duration: '45 min', type: 'reading' },
          { id: 'l93', title: 'Interactive Lab: Building an Adaptive Quiz Widget', duration: '60 min', type: 'code' },
          { id: 'l94', title: 'Adaptive Practice: State Dependency Synchronization', duration: '35 min', type: 'practice' }
        ]
      },
      {
        id: 'unit-4',
        unitNumber: 4,
        title: 'Design Systems, Tokens & Accessibility',
        description: 'Semantic HTML, ARIA standards, color contrast, and Framer Motion micro-interactions.',
        lessons: [
          { id: 'l95', title: 'Three-Layer Token Systems (Primitive, Semantic, Component)', duration: '35 min', type: 'video' },
          { id: 'l96', title: 'Keyboard Accessibility and WCAG 2.1 AA Compliance', duration: '35 min', type: 'reading' },
          { id: 'l97', title: 'Capstone Project: Accessible Learnova Course Browser UI', duration: '70 min', type: 'code' },
          { id: 'l98', title: 'Formal Web Architecture Examination', duration: '45 min', type: 'practice' }
        ]
      }
    ],
    instructor: {
      name: 'Engr. Fatima Zahra',
      title: 'Senior Frontend Architect & Visiting Lecturer',
      department: 'Department of Computer Science, FAST-NUCES',
      avatarText: 'FZ'
    },
    tags: ['Web Architecture', 'JavaScript', 'DOM', 'React', 'Design Tokens', 'Accessibility'],
    imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80'
  }
];
