"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  AppHeader,
  Sidebar,
  Button,
  Badge,
  teacherNavBranches,
  mockQuestionBankItems,
  sampleAIGeneratedBatch,
  mockTeacherCohorts,
} from "@learnova/ui";
import {
  QuestionBankItem,
  BloomsTaxonomy,
  QuestionDifficulty,
  QuestionType,
} from "@learnova/types";
import {
  Sparkles,
  BookOpenCheck,
  CheckCircle2,
  Edit3,
  Trash2,
  RotateCcw,
  Search,
  Filter,
  Plus,
  HelpCircle,
  Layers,
  Award,
  ChevronDown,
  ChevronUp,
  Download,
  Share2,
  FileSpreadsheet,
  Zap,
  Check,
  AlertTriangle,
  Lightbulb,
  ExternalLink,
  Copy,
  BrainCircuit,
  Sliders,
  FolderPlus,
  Send,
  Calendar,
  Clock,
  X,
} from "lucide-react";

function QuestionStudioInner() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<"generator" | "bank">("generator");

  // Question Bank State
  const [questionBank, setQuestionBank] = useState<QuestionBankItem[]>(mockQuestionBankItems);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState<string>("all");
  const [filterBlooms, setFilterBlooms] = useState<string>("all");
  const [expandedSolutions, setExpandedSolutions] = useState<Record<string, boolean>>({});
  const [selectedBankIds, setSelectedBankIds] = useState<Record<string, boolean>>({});

  // AI Generator Prompt Configuration
  const [selectedCourse, setSelectedCourse] = useState("ap-physics-1");
  const [selectedUnit, setSelectedUnit] = useState("Unit 3: Circular Motion & Gravitation");
  const [topic, setTopic] = useState("Centripetal Acceleration & Vertical Loops");
  const [subtopic, setSubtopic] = useState("Critical velocity and apparent weight in roller coaster loops");
  const [questionType, setQuestionType] = useState<QuestionType>("multiple-choice");
  const [difficulty, setDifficulty] = useState<QuestionDifficulty>("Intermediate");
  const [bloomsLevel, setBloomsLevel] = useState<BloomsTaxonomy>("Application");
  const [questionCount, setQuestionCount] = useState<number>(3);
  const [customPrompt, setCustomPrompt] = useState(
    "Focus on real-world engineering context with free-body diagrams and common student misconceptions regarding centripetal force."
  );

  // Read URL Search Params on mount
  useEffect(() => {
    const topicParam = searchParams.get("topic");
    const unitParam = searchParams.get("unit");
    if (topicParam) {
      setTopic(topicParam);
      setSubtopic(`Detailed problem solving for ${topicParam}`);
    }
    if (unitParam) {
      if (unitParam.includes("1")) setSelectedUnit("Unit 1: Kinematics in 1D & 2D");
      else if (unitParam.includes("2")) setSelectedUnit("Unit 2: Newton's Laws & Dynamics");
      else if (unitParam.includes("3")) setSelectedUnit("Unit 3: Circular Motion & Gravitation");
      else if (unitParam.includes("4")) setSelectedUnit("Unit 4: Work, Energy & Power");
    }
  }, [searchParams]);

  // Generation State
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState<string>("");
  const [generatedQuestions, setGeneratedQuestions] = useState<QuestionBankItem[]>(sampleAIGeneratedBatch);
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);
  const [editedQuestions, setEditedQuestions] = useState<Record<string, QuestionBankItem>>({});
  const [notification, setNotification] = useState<string | null>(null);

  // Quiz Assignment Modal State
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [quizForm, setQuizForm] = useState({
    title: "AP Physics 1: Dynamics & Loops Checkpoint",
    cohortId: "cohort-1",
    timeLimitMinutes: 20,
    dueDate: "2026-10-12",
    totalXpReward: 150,
  });

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  // Trigger AI Generation Simulation
  const handleGenerateQuestions = () => {
    setIsGenerating(true);
    setGenerationStep("1/3: Analyzing AP Physics syllabus objectives & Bloom's criteria...");

    setTimeout(() => {
      setGenerationStep("2/3: Formulating distractors & diagnostic misconception explanations...");
    }, 1200);

    setTimeout(() => {
      setGenerationStep("3/3: Validating LaTeX derivations & scoring rubrics...");
    }, 2400);

    setTimeout(() => {
      // Create new generated items customized to prompt
      const newItems: QuestionBankItem[] = [
        {
          id: `gen-${Date.now()}-1`,
          courseId: selectedCourse,
          courseTitle: selectedCourse === "ap-physics-1" ? "AP Physics 1" : "Linear Algebra",
          unitTitle: selectedUnit,
          topic: topic,
          subtopic: subtopic,
          type: questionType,
          difficulty: difficulty,
          bloomsLevel: bloomsLevel,
          prompt: `A roller coaster vehicle of mass m completes a loop of radius R. At the lowest point of the loop, the car has velocity v. What is the magnitude of the normal force exerted by the track on the car?`,
          latexFormula: "F_N = m\\left(g + \\frac{v^2}{R}\\right)",
          options: [
            { id: "opt-1", label: "A", text: "FN = m * (g + v² / R)", isCorrect: true, distractorRationale: "Correct: At the bottom, Normal force points UP, Gravity points DOWN. FN - mg = m*v²/R => FN = m(g + v²/R)." },
            { id: "opt-2", label: "B", text: "FN = m * (v² / R - g)", isCorrect: false, distractorRationale: "Subtracted gravity instead of adding, which applies to the top of the loop." },
            { id: "opt-3", label: "C", text: "FN = m * v² / R", isCorrect: false, distractorRationale: "Ignored the gravitational force entirely." },
            { id: "opt-4", label: "D", text: "FN = mg", isCorrect: false, distractorRationale: "Assumed static equilibrium with no acceleration." },
          ],
          stepByStepSolution: [
            "1. Draw free-body diagram at bottom of loop: Normal force FN acts upwards towards center; gravity Fg = mg acts downwards.",
            "2. Apply Newton's 2nd Law in radial direction: Fnet,c = FN - mg = m * v² / R.",
            "3. Solve for normal force: FN = mg + m * v² / R = m * (g + v² / R).",
            "4. Conclusion: Apparent weight is greatest at the bottom of the loop.",
          ],
          hint: "Remember that the net centripetal force towards the center at the bottom is FN - mg.",
          commonMisconception: "Students frequently confuse the sign convention at the bottom vs top of vertical loops.",
          tags: [topic, "Dynamics", "Vertical Loops", "AI Generated"],
          status: "draft",
          createdAt: "Just now",
          usageCount: 0,
        },
        {
          id: `gen-${Date.now()}-2`,
          courseId: selectedCourse,
          courseTitle: selectedCourse === "ap-physics-1" ? "AP Physics 1" : "Linear Algebra",
          unitTitle: selectedUnit,
          topic: topic,
          subtopic: subtopic,
          type: "multiple-choice",
          difficulty: "Advanced",
          bloomsLevel: "Analysis",
          prompt: `A conical pendulum consists of a bob of mass m on a string of length L swinging in a horizontal circle of radius r with speed v. Which expression gives the period of revolution T?`,
          latexFormula: "T = 2\\pi \\sqrt{\\frac{L\\cos\\theta}{g}}",
          options: [
            { id: "opt-1", label: "A", text: "T = 2π * sqrt((L * cos θ) / g)", isCorrect: true, distractorRationale: "Correct: Derived from T_tension * cos θ = mg and T_tension * sin θ = m * v² / (L sin θ)." },
            { id: "opt-2", label: "B", text: "T = 2π * sqrt(L / g)", isCorrect: false, distractorRationale: "Formula for a simple planar pendulum oscillating at small angles." },
            { id: "opt-3", label: "C", text: "T = 2π * sqrt((L * sin θ) / g)", isCorrect: false, distractorRationale: "Incorrect trigonometric resolution of vertical tension." },
            { id: "opt-4", label: "D", text: "T = 2π * (L / (g * cos θ))", isCorrect: false, distractorRationale: "Missing square root over dimensional time." },
          ],
          stepByStepSolution: [
            "1. Tension vertical balance: T_ten * cos(θ) = mg => T_ten = mg / cos(θ).",
            "2. Tension horizontal centripetal: T_ten * sin(θ) = m * ω² * r = m * (4π² / T²) * (L * sin θ).",
            "3. Substitute T_ten: (mg / cos θ) * sin θ = m * (4π² / T²) * L * sin θ.",
            "4. Simplify: g / cos θ = 4π² L / T² => T² = 4π² L cos θ / g => T = 2π * sqrt(L cos θ / g).",
          ],
          hint: "Resolve string tension into vertical (balancing gravity) and horizontal (providing centripetal acceleration) components.",
          commonMisconception: "Treating the conical pendulum identical to a simple pendulum without the cos(θ) factor.",
          tags: [topic, "Conical Pendulum", "Circular Motion", "AI Generated"],
          status: "draft",
          createdAt: "Just now",
          usageCount: 0,
        },
      ];

      setGeneratedQuestions(newItems);
      setIsGenerating(false);
      showNotification(`✨ AI successfully generated ${newItems.length} curated questions!`);
    }, 3400);
  };

  // Approve a single question to Question Bank
  const handleApproveQuestion = (question: QuestionBankItem) => {
    const approvedItem: QuestionBankItem = {
      ...(editedQuestions[question.id] || question),
      status: "approved",
      approvedAt: new Date().toISOString().split("T")[0],
    };

    setQuestionBank((prev) => [approvedItem, ...prev]);
    setGeneratedQuestions((prev) => prev.filter((q) => q.id !== question.id));
    showNotification(`✅ Approved and added "${approvedItem.topic}" question to Question Bank!`);
  };

  // Batch approve all generated questions
  const handleBatchApproveAll = () => {
    if (generatedQuestions.length === 0) return;

    const approvedItems: QuestionBankItem[] = generatedQuestions.map((q) => ({
      ...(editedQuestions[q.id] || q),
      status: "approved",
      approvedAt: new Date().toISOString().split("T")[0],
    }));

    setQuestionBank((prev) => [...approvedItems, ...prev]);
    setGeneratedQuestions([]);
    showNotification(`🎉 Successfully batch approved ${approvedItems.length} questions to Question Bank!`);
  };

  // Discard / Reject a single generated question
  const handleDiscardQuestion = (questionId: string) => {
    setGeneratedQuestions((prev) => prev.filter((q) => q.id !== questionId));
    showNotification("Question removed from preview.");
  };

  // Regenerate a single question variant
  const handleRegenerateVariant = (questionId: string) => {
    showNotification("🔄 Simulating variant regeneration with adjusted parameters...");
    setTimeout(() => {
      setGeneratedQuestions((prev) =>
        prev.map((q) => {
          if (q.id === questionId) {
            return {
              ...q,
              prompt: `[Variant 2] ${q.prompt.replace("A roller coaster", "A prototype maglev pod")}`,
              difficulty: "Advanced",
              createdAt: "Regenerated just now",
            };
          }
          return q;
        })
      );
    }, 1200);
  };

  const toggleSolution = (id: string) => {
    setExpandedSolutions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleBankSelection = (id: string) => {
    setSelectedBankIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Filter Question Bank
  const filteredBank = questionBank.filter((item) => {
    const matchesSearch =
      item.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subtopic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesDifficulty =
      filterDifficulty === "all" || item.difficulty.toLowerCase() === filterDifficulty.toLowerCase();

    const matchesBlooms =
      filterBlooms === "all" || item.bloomsLevel.toLowerCase() === filterBlooms.toLowerCase();

    return matchesSearch && matchesDifficulty && matchesBlooms;
  });

  const selectedCount = Object.values(selectedBankIds).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <AppHeader
        portalName="Teacher Studio"
        userName="Dr. Sarah Mitchell"
        userRole="Lead Faculty Instructor"
        avatarUrl="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80"
        notificationCount={4}
        cohortTag="Fall 2025 • AP Physics & STEM"
      />

      <div className="flex flex-1">
        <Sidebar
          branches={teacherNavBranches}
          currentPath="/questions"
          footerContent={
            <div className="rounded-xl bg-slate-900 p-3.5 text-white space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-sky-400">
                <BrainCircuit className="h-3.5 w-3.5" />
                <span>AI Prompt Copilot</span>
              </div>
              <p className="text-xs text-slate-300">
                Connected to Gemini Pro & Socratic Physics Engine.
              </p>
              <div className="text-[11px] font-mono text-emerald-400 font-semibold">
                ● 100% LLM Operational
              </div>
            </div>
          }
        />

        <main className="flex-1 p-6 md:p-8 space-y-6 max-w-7xl">
          {/* Notification Alert */}
          {notification && (
            <div className="flex items-center justify-between gap-3 p-4 rounded-xl bg-emerald-600 text-white shadow-lg animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <CheckCircle2 className="h-5 w-5" />
                <span>{notification}</span>
              </div>
              <button
                onClick={() => setNotification(null)}
                className="text-emerald-100 hover:text-white text-xs font-bold px-2 py-1 rounded"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Top Header Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-600">
                <Sparkles className="h-4 w-4" />
                <span>Faculty Assessment Engine</span>
              </div>
              <h1 className="text-2xl font-black tracking-tight text-slate-900 mt-1">
                AI Question Generator & Question Bank
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Prompt the pedagogical LLM to craft curriculum-aligned questions, review step-by-step rubrics, approve, and curate your bank.
              </p>
            </div>

            {/* Quick Stats Pill Counters */}
            <div className="flex items-center gap-3 self-start md:self-auto">
              <div className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <div className="text-[10px] uppercase font-bold text-slate-400">Total in Bank</div>
                <div className="text-lg font-black text-slate-900">{questionBank.length} Items</div>
              </div>
              <div className="px-4 py-2 rounded-xl bg-sky-50 border border-sky-200 text-center">
                <div className="text-[10px] uppercase font-bold text-sky-600">Generated Preview</div>
                <div className="text-lg font-black text-sky-700">{generatedQuestions.length} Pending</div>
              </div>
            </div>
          </div>

          {/* Tab Selection */}
          <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-px">
            <button
              onClick={() => setActiveTab("generator")}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
                activeTab === "generator"
                  ? "border-[#00A8E8] text-[#0B2B53]"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              <Sparkles className="h-4 w-4 text-purple-600" />
              AI Prompt Studio ({generatedQuestions.length} in Draft)
            </button>

            <button
              onClick={() => setActiveTab("bank")}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
                activeTab === "bank"
                  ? "border-[#00A8E8] text-[#0B2B53]"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              <BookOpenCheck className="h-4 w-4 text-emerald-600" />
              Approved Question Bank ({questionBank.length})
            </button>
          </div>

          {/* TAB 1: AI GENERATOR STUDIO */}
          {activeTab === "generator" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-300">
              {/* Left Column: Generator Form (4 cols) */}
              <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5 h-fit">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Sliders className="h-4 w-4 text-sky-600" />
                    Generation Parameters
                  </h2>
                  <span className="text-[11px] font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded">
                    Socratic AI
                  </span>
                </div>

                <div className="space-y-4">
                  {/* Course Selector */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Target Course</label>
                    <select
                      value={selectedCourse}
                      onChange={(e) => setSelectedCourse(e.target.value)}
                      className="w-full text-xs font-medium rounded-xl border border-slate-200 p-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                    >
                      <option value="ap-physics-1">AP Physics 1: Mechanics & Dynamics</option>
                      <option value="math-201">MATH-201: Introduction to Linear Algebra</option>
                      <option value="phys-301">PHYS-301: Quantum Mechanics Theory</option>
                    </select>
                  </div>

                  {/* Unit Selector */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Curriculum Unit</label>
                    <select
                      value={selectedUnit}
                      onChange={(e) => setSelectedUnit(e.target.value)}
                      className="w-full text-xs font-medium rounded-xl border border-slate-200 p-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                    >
                      <option value="Unit 1: Kinematics in 1D & 2D">Unit 1: Kinematics in 1D & 2D</option>
                      <option value="Unit 2: Newton's Laws & Dynamics">Unit 2: Newton's Laws & Dynamics</option>
                      <option value="Unit 3: Circular Motion & Gravitation">Unit 3: Circular Motion & Gravitation</option>
                      <option value="Unit 4: Work, Energy & Power">Unit 4: Work, Energy & Power</option>
                    </select>
                  </div>

                  {/* Topic & Subtopic */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Core Topic</label>
                    <input
                      type="text"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      placeholder="e.g. Centripetal Acceleration"
                      className="w-full text-xs rounded-xl border border-slate-200 p-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Subtopic / Focus Concept</label>
                    <input
                      type="text"
                      value={subtopic}
                      onChange={(e) => setSubtopic(e.target.value)}
                      placeholder="e.g. Incline planes with kinetic friction"
                      className="w-full text-xs rounded-xl border border-slate-200 p-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                    />
                  </div>

                  {/* Bloom's Taxonomy & Difficulty */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Bloom's Level</label>
                      <select
                        value={bloomsLevel}
                        onChange={(e) => setBloomsLevel(e.target.value as any)}
                        className="w-full text-xs font-medium rounded-xl border border-slate-200 p-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                      >
                        <option value="Knowledge">Knowledge</option>
                        <option value="Comprehension">Comprehension</option>
                        <option value="Application">Application</option>
                        <option value="Analysis">Analysis</option>
                        <option value="Evaluation">Evaluation</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Difficulty</label>
                      <select
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value as any)}
                        className="w-full text-xs font-medium rounded-xl border border-slate-200 p-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                      >
                        <option value="Foundation">Foundation</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                        <option value="Olympiad">Olympiad</option>
                      </select>
                    </div>
                  </div>

                  {/* Question Type & Count */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Question Format</label>
                      <select
                        value={questionType}
                        onChange={(e) => setQuestionType(e.target.value as any)}
                        className="w-full text-xs font-medium rounded-xl border border-slate-200 p-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                      >
                        <option value="multiple-choice">Single MCQ</option>
                        <option value="multi-select">Multi-Select</option>
                        <option value="step-by-step">Step-by-Step Derivation</option>
                        <option value="conceptual-short">Conceptual Short</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Batch Quantity</label>
                      <select
                        value={questionCount}
                        onChange={(e) => setQuestionCount(Number(e.target.value))}
                        className="w-full text-xs font-medium rounded-xl border border-slate-200 p-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                      >
                        <option value={1}>1 Question</option>
                        <option value={2}>2 Questions</option>
                        <option value={3}>3 Questions</option>
                        <option value={5}>5 Questions</option>
                      </select>
                    </div>
                  </div>

                  {/* Custom Prompt Instructions */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-700">Pedagogy Guidance Prompt</label>
                      <span className="text-[10px] text-slate-400">Optional</span>
                    </div>
                    <textarea
                      rows={3}
                      value={customPrompt}
                      onChange={(e) => setCustomPrompt(e.target.value)}
                      placeholder="e.g. Include friction misconceptions..."
                      className="w-full text-xs rounded-xl border border-slate-200 p-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                    />
                  </div>

                  {/* Prompt Preset Chips */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Quick Presets</span>
                    <div className="flex flex-wrap gap-1.5">
                      <button
                        type="button"
                        onClick={() => setCustomPrompt("Emphasize free-body diagram equilibrium and normal force perpendicular components.")}
                        className="text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium px-2 py-1 rounded-lg transition-colors"
                      >
                        + Free-body Diagrams
                      </button>
                      <button
                        type="button"
                        onClick={() => setCustomPrompt("Target student misconceptions regarding centrifugal vs centripetal force.")}
                        className="text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium px-2 py-1 rounded-lg transition-colors"
                      >
                        + Friction/Centripetal Misconceptions
                      </button>
                    </div>
                  </div>

                  {/* Generate Button */}
                  <Button
                    onClick={handleGenerateQuestions}
                    disabled={isGenerating}
                    className="w-full bg-[#00A8E8] hover:bg-sky-400 text-[#0B2B53] font-extrabold text-xs py-3 rounded-xl shadow-lg shadow-sky-500/20 flex items-center justify-center gap-2"
                  >
                    {isGenerating ? (
                      <>
                        <RotateCcw className="h-4 w-4 animate-spin" />
                        Generating Questions...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4" />
                        Generate with LLM ({questionCount} Items)
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Right Column: Live Generation Deck & Review Cards (8 cols) */}
              <div className="lg:col-span-8 space-y-4">
                {/* Generation Loading State Animation */}
                {isGenerating && (
                  <div className="p-8 rounded-2xl bg-white border border-sky-200 shadow-lg text-center space-y-4 animate-in fade-in duration-300">
                    <div className="relative flex items-center justify-center">
                      <div className="h-16 w-16 rounded-full border-4 border-sky-100 border-t-sky-500 animate-spin" />
                      <BrainCircuit className="h-8 w-8 text-sky-600 absolute" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">
                        Learnova Pedagogical LLM is Generating Questions
                      </h3>
                      <p className="text-xs font-mono text-sky-600 font-semibold mt-1">
                        {generationStep}
                      </p>
                    </div>
                  </div>
                )}

                {/* Deck Action Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <Zap className="h-4 w-4 text-amber-500" />
                      Generated Questions Preview Deck ({generatedQuestions.length})
                    </h3>
                    <p className="text-xs text-slate-500">
                      Review question accuracy, edit wording inline, then approve to save to the persistent bank.
                    </p>
                  </div>

                  {generatedQuestions.length > 0 && (
                    <Button
                      onClick={handleBatchApproveAll}
                      size="sm"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-md flex items-center gap-1.5 self-start sm:self-auto"
                    >
                      <Check className="h-4 w-4" /> Approve All ({generatedQuestions.length})
                    </Button>
                  )}
                </div>

                {/* Empty State */}
                {generatedQuestions.length === 0 && !isGenerating && (
                  <div className="p-12 text-center rounded-2xl bg-white border border-dashed border-slate-300 space-y-3">
                    <div className="h-12 w-12 rounded-2xl bg-sky-50 text-[#00A8E8] flex items-center justify-center mx-auto">
                      <Sparkles className="h-6 w-6" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-800">No Draft Questions in Preview</h3>
                    <p className="text-xs text-slate-500 max-w-md mx-auto">
                      Use the parameters panel on the left to prompt the LLM for a new batch of questions, or switch to the Question Bank tab to view approved questions.
                    </p>
                    <Button
                      onClick={handleGenerateQuestions}
                      size="sm"
                      className="bg-[#0B2B53] hover:bg-slate-900 text-white font-bold text-xs mt-2"
                    >
                      Generate Physics Questions Now
                    </Button>
                  </div>
                )}

                {/* Question Cards Deck */}
                <div className="space-y-4">
                  {generatedQuestions.map((q, index) => {
                    const isEditing = editingQuestionId === q.id;
                    const currentData = editedQuestions[q.id] || q;

                    return (
                      <div
                        key={q.id}
                        className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:border-sky-300 hover:shadow-md transition-all space-y-4"
                      >
                        {/* Header: Meta Badges & Actions */}
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs font-black text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-lg">
                              Question #{index + 1}
                            </span>
                            <span className="text-xs font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded">
                              {q.topic}
                            </span>
                            <span className="text-[11px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                              {q.bloomsLevel}
                            </span>
                            <span
                              className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                                q.difficulty === "Foundation"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : q.difficulty === "Intermediate"
                                  ? "bg-sky-100 text-sky-800"
                                  : "bg-amber-100 text-amber-800"
                              }`}
                            >
                              {q.difficulty}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => handleRegenerateVariant(q.id)}
                              className="p-1.5 text-slate-500 hover:text-sky-600 hover:bg-slate-100 rounded-lg transition-colors"
                              title="Regenerate Variant"
                            >
                              <RotateCcw className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => setEditingQuestionId(isEditing ? null : q.id)}
                              className={`p-1.5 rounded-lg transition-colors ${
                                isEditing
                                  ? "bg-sky-100 text-sky-700 font-bold"
                                  : "text-slate-500 hover:text-sky-600 hover:bg-slate-100"
                              }`}
                              title="Edit Question Inline"
                            >
                              <Edit3 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDiscardQuestion(q.id)}
                              className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                              title="Discard Question"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>

                        {/* Question Prompt */}
                        {isEditing ? (
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-700">Edit Prompt Text</label>
                            <textarea
                              rows={3}
                              value={currentData.prompt}
                              onChange={(e) =>
                                setEditedQuestions({
                                  ...editedQuestions,
                                  [q.id]: { ...currentData, prompt: e.target.value },
                                })
                              }
                              className="w-full text-xs rounded-xl border border-sky-300 p-3 text-slate-900 focus:ring-2 focus:ring-sky-500/20"
                            />
                          </div>
                        ) : (
                          <p className="text-sm font-semibold text-slate-900 leading-relaxed">
                            {currentData.prompt}
                          </p>
                        )}

                        {/* LaTeX Formula Highlight Box */}
                        {currentData.latexFormula && (
                          <div className="bg-slate-900 text-sky-300 font-mono text-xs px-4 py-2.5 rounded-xl flex items-center justify-between">
                            <span className="flex items-center gap-2">
                              <span className="text-[10px] text-slate-400 font-sans font-bold">KEY FORMULA:</span>
                              <code>{currentData.latexFormula}</code>
                            </span>
                            <span className="text-[10px] text-slate-400">KaTeX Verified</span>
                          </div>
                        )}

                        {/* Options Deck (MCQ) */}
                        {currentData.options && currentData.options.length > 0 && (
                          <div className="space-y-2 pt-1">
                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                              Answer Options & Distractor Rationale
                            </span>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                              {currentData.options.map((opt) => (
                                <div
                                  key={opt.id}
                                  className={`p-3 rounded-xl border text-xs flex flex-col justify-between transition-all ${
                                    opt.isCorrect
                                      ? "bg-emerald-50/80 border-emerald-300 text-emerald-950 ring-1 ring-emerald-400/40"
                                      : "bg-slate-50/80 border-slate-200 text-slate-700"
                                  }`}
                                >
                                  <div className="flex items-start gap-2">
                                    <span
                                      className={`flex h-5 w-5 items-center justify-center rounded-md font-bold text-[11px] shrink-0 ${
                                        opt.isCorrect
                                          ? "bg-emerald-600 text-white"
                                          : "bg-slate-200 text-slate-700"
                                      }`}
                                    >
                                      {opt.label}
                                    </span>
                                    <span className="font-semibold text-slate-900 leading-tight">
                                      {opt.text}
                                    </span>
                                  </div>

                                  {opt.distractorRationale && (
                                    <p className="text-[10px] text-slate-500 mt-2 pl-7 italic border-t border-slate-200/40 pt-1">
                                      {opt.distractorRationale}
                                    </p>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Misconception Diagnostic Tag */}
                        {currentData.commonMisconception && (
                          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
                            <Lightbulb className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                            <div>
                              <span className="font-bold text-amber-950">Diagnostic Misconception: </span>
                              <span className="text-amber-800">{currentData.commonMisconception}</span>
                            </div>
                          </div>
                        )}

                        {/* Collapsible Step-by-Step Solution */}
                        <div className="pt-2 border-t border-slate-100">
                          <button
                            onClick={() => toggleSolution(q.id)}
                            className="flex items-center justify-between w-full text-xs font-bold text-slate-700 hover:text-sky-600 py-1"
                          >
                            <span className="flex items-center gap-1.5">
                              <BookOpenCheck className="h-3.5 w-3.5 text-sky-500" />
                              Step-by-Step Derivation & Rubric ({currentData.stepByStepSolution.length} steps)
                            </span>
                            {expandedSolutions[q.id] ? (
                              <ChevronUp className="h-4 w-4 text-slate-400" />
                            ) : (
                              <ChevronDown className="h-4 w-4 text-slate-400" />
                            )}
                          </button>

                          {expandedSolutions[q.id] && (
                            <div className="mt-3 p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs text-slate-700 font-mono">
                              {currentData.stepByStepSolution.map((step, sIdx) => (
                                <p key={sIdx} className="leading-relaxed">
                                  {step}
                                </p>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Approval Footer Action */}
                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            {q.tags.map((tag, tIdx) => (
                              <span
                                key={tIdx}
                                className="text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>

                          <Button
                            onClick={() => handleApproveQuestion(q)}
                            className="bg-[#2ECC71] hover:bg-emerald-600 text-slate-950 font-bold text-xs px-5 py-2 rounded-xl shadow-md flex items-center gap-1.5"
                          >
                            <CheckCircle2 className="h-4 w-4 fill-slate-950 text-white" />
                            Approve & Add to Question Bank
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PERSISTENT QUESTION BANK REPOSITORY */}
          {activeTab === "bank" && (
            <div className="space-y-5 animate-in fade-in duration-300">
              {/* Search & Filter Toolbar */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search question prompts, formulas, keywords, topics..."
                    className="h-9 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-4 text-xs text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <select
                    aria-label="Filter questions by difficulty"
                    value={filterDifficulty}
                    onChange={(e) => setFilterDifficulty(e.target.value)}
                    className="text-xs font-semibold bg-white border border-slate-200 text-slate-700 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                  >
                    <option value="all">All Difficulties</option>
                    <option value="foundation">Foundation</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>

                  <select
                    aria-label="Filter questions by Bloom's Taxonomy level"
                    value={filterBlooms}
                    onChange={(e) => setFilterBlooms(e.target.value)}
                    className="text-xs font-semibold bg-white border border-slate-200 text-slate-700 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                  >
                    <option value="all">All Bloom's Levels</option>
                    <option value="knowledge">Knowledge</option>
                    <option value="comprehension">Comprehension</option>
                    <option value="application">Application</option>
                    <option value="analysis">Analysis</option>
                  </select>

                  <button
                    onClick={() => setActiveTab("generator")}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#00A8E8] text-[#0B2B53] font-bold text-xs hover:bg-sky-400 transition-colors shadow-sm"
                  >
                    <Plus className="h-4 w-4" /> Generate More
                  </button>
                </div>
              </div>

              {/* Batch Action Bar if items selected */}
              {selectedCount > 0 && (
                <div className="p-3 bg-sky-900 text-white rounded-2xl flex items-center justify-between shadow-lg animate-in fade-in duration-200">
                  <span className="text-xs font-semibold">
                    {selectedCount} question{selectedCount > 1 ? "s" : ""} selected from repository
                  </span>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      onClick={() => showNotification(`Created new 5-question Quiz from selected items!`)}
                      className="bg-[#00A8E8] hover:bg-sky-400 text-[#0B2B53] font-bold text-xs"
                    >
                      <FolderPlus className="h-3.5 w-3.5 mr-1" /> Create Assessment
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => showNotification(`Exported ${selectedCount} questions to Canvas QTI format.`)}
                      className="text-white border-white/20 hover:bg-white/10 text-xs font-semibold"
                    >
                      <Download className="h-3.5 w-3.5 mr-1" /> Export QTI / PDF
                    </Button>
                  </div>
                </div>
              )}

              {/* Question Bank Items List */}
              <div className="space-y-4">
                {filteredBank.length === 0 ? (
                  <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 space-y-2">
                    <HelpCircle className="h-8 w-8 text-slate-400 mx-auto" />
                    <p className="text-sm font-bold text-slate-800">No questions match your filter</p>
                    <p className="text-xs text-slate-500">Try adjusting search keywords or filters.</p>
                  </div>
                ) : (
                  filteredBank.map((item, idx) => {
                    const isSelected = !!selectedBankIds[item.id];

                    return (
                      <div
                        key={item.id}
                        className={`bg-white rounded-2xl border p-5 transition-all shadow-sm ${
                          isSelected ? "border-sky-500 ring-2 ring-sky-500/20" : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-3">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => toggleBankSelection(item.id)}
                              className="h-4 w-4 mt-1 rounded text-[#00A8E8] focus:ring-sky-500"
                            />

                            <div className="space-y-2">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="text-xs font-bold text-sky-700 bg-sky-100 px-2.5 py-0.5 rounded-full">
                                  {item.courseTitle}
                                </span>
                                <span className="text-xs font-semibold text-slate-700">
                                  {item.topic} • {item.subtopic}
                                </span>
                                <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                                  {item.bloomsLevel}
                                </span>
                                <span
                                  className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                                    item.difficulty === "Foundation"
                                      ? "bg-emerald-100 text-emerald-800"
                                      : item.difficulty === "Intermediate"
                                      ? "bg-sky-100 text-sky-800"
                                      : "bg-amber-100 text-amber-800"
                                  }`}
                                >
                                  {item.difficulty}
                                </span>
                              </div>

                              <h4 className="text-sm font-bold text-slate-900 leading-relaxed">
                                {item.prompt}
                              </h4>

                              {item.latexFormula && (
                                <div className="bg-slate-900 text-sky-300 font-mono text-xs px-3 py-1.5 rounded-lg inline-block">
                                  {item.latexFormula}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Historical Accuracy Pill */}
                          {item.avgStudentAccuracy !== undefined && (
                            <div className="text-right shrink-0">
                              <div className="text-xs font-bold text-emerald-600">
                                {item.avgStudentAccuracy}% Student Accuracy
                              </div>
                              <div className="text-[10px] text-slate-400">Used {item.usageCount} times</div>
                            </div>
                          )}
                        </div>

                        {/* Collapsible Solution in Bank */}
                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                          <button
                            onClick={() => toggleSolution(item.id)}
                            className="text-[#00A8E8] font-bold hover:underline flex items-center gap-1"
                          >
                            {expandedSolutions[item.id] ? "Hide Solution" : "View Step-by-Step Derivation"}
                            {expandedSolutions[item.id] ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                          </button>

                          <span className="text-[11px] text-slate-400">
                            Approved on {item.approvedAt || item.createdAt}
                          </span>
                        </div>

                        {expandedSolutions[item.id] && (
                          <div className="mt-3 p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs text-slate-700 font-mono">
                            {item.stepByStepSolution.map((s, si) => (
                              <p key={si}>{s}</p>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* Quiz Creation & Cohort Assignment Modal */}
          {isQuizModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
              <div
                className="relative w-full max-w-lg bg-white rounded-3xl p-6 md:p-8 shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2 text-slate-900 font-extrabold text-base">
                    <FolderPlus className="h-5 w-5 text-sky-500" />
                    <span>Create & Publish Cohort Quiz</span>
                  </div>
                  <button
                    onClick={() => setIsQuizModalOpen(false)}
                    className="text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Quiz Assessment Title</label>
                    <input
                      type="text"
                      value={quizForm.title}
                      onChange={(e) => setQuizForm({ ...quizForm, title: e.target.value })}
                      className="w-full text-xs rounded-xl border border-slate-200 p-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Target Cohort</label>
                    <select
                      value={quizForm.cohortId}
                      onChange={(e) => setQuizForm({ ...quizForm, cohortId: e.target.value })}
                      className="w-full text-xs font-medium rounded-xl border border-slate-200 p-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                    >
                      {mockTeacherCohorts.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.courseName} — {c.cohortName} ({c.studentCount} students)
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Time Limit (Minutes)</label>
                      <input
                        type="number"
                        value={quizForm.timeLimitMinutes}
                        onChange={(e) => setQuizForm({ ...quizForm, timeLimitMinutes: Number(e.target.value) })}
                        className="w-full text-xs rounded-xl border border-slate-200 p-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Student XP Bounty</label>
                      <input
                        type="number"
                        value={quizForm.totalXpReward}
                        onChange={(e) => setQuizForm({ ...quizForm, totalXpReward: Number(e.target.value) })}
                        className="w-full text-xs rounded-xl border border-slate-200 p-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                      />
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-sky-50 border border-sky-200 text-xs text-sky-900 flex items-center gap-2.5">
                    <Sparkles className="h-5 w-5 text-sky-600 shrink-0" />
                    <p>
                      Selected <strong>{selectedCount || 3} Questions</strong> with step-by-step solutions and auto-grading enabled.
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
                  <Button
                    variant="outline"
                    onClick={() => setIsQuizModalOpen(false)}
                    className="text-xs font-semibold text-slate-700 border-slate-200"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      setIsQuizModalOpen(false);
                      showNotification(`🚀 Published "${quizForm.title}" (+${quizForm.totalXpReward} XP) to Fall 2025 AP Physics Cohort!`);
                    }}
                    className="bg-[#00A8E8] hover:bg-sky-400 text-[#0B2B53] font-bold text-xs px-5 py-2 rounded-xl shadow-md flex items-center gap-1.5"
                  >
                    <Send className="h-4 w-4" /> Publish to Student Practice Arena
                  </Button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default function TeacherQuestionStudioPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="animate-pulse text-xs font-bold text-slate-500">Loading AI Question Studio...</div>
        </div>
      }
    >
      <QuestionStudioInner />
    </Suspense>
  );
}
