'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';
import {
  BookOpen,
  Sparkles,
  Send,
  Bot,
  User,
  Clock,
  CheckCircle2,
  Cpu,
  Layers,
  ArrowRight,
  ArrowLeft,
  Code2,
  HelpCircle,
  Lightbulb,
  Check,
} from 'lucide-react';
import { useTheme } from '../../../../../../context/ThemeContext';
import { useAuth } from '../../../../../../context/AuthContext';
import { coursesData } from '../../../../../../data/coursesData';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

interface LessonRoomPageProps {
  params: Promise<{ slug: string; lessonId: string }>;
}

export default function LessonRoomPage({ params }: LessonRoomPageProps) {
  const resolvedParams = use(params);
  const { slug, lessonId } = resolvedParams;
  const router = useRouter();
  const { palette, font } = useTheme();
  const { user } = useAuth();

  const course = coursesData.find((c) => c.slug === slug || c.id === slug);

  if (!course) {
    notFound();
  }

  // Find unit and lesson
  let activeUnit = course.syllabus[0];
  let activeLesson = activeUnit.lessons[0];

  for (const unit of course.syllabus) {
    const found = unit.lessons.find((l) => l.id === lessonId);
    if (found) {
      activeUnit = unit;
      activeLesson = found;
      break;
    }
  }

  const [activeTab, setActiveTab] = useState<'concepts' | 'protocol' | 'invariants'>('concepts');
  const [completed, setCompleted] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'ai',
      text: `Hello ${user?.name || 'Alex'}! I am your Socratic AI Study Assistant for ${course.code}: ${course.title}.\n\nWe are studying "${activeLesson.title}". Ask any conceptual question, ask for an intuitive analogy, or test your understanding!`,
      timestamp: '11:42 AM',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const suggestedPrompts = [
    'Explain this concept in simple terms',
    'What are the common edge cases or hazards?',
    'Give me a step-by-step code example',
  ];

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = `That is an insightful question regarding ${activeLesson.title}! In structured computer systems, establishing strict invariants allows predictable state transitions without silent runtime corruption.`;
      
      if (text.toLowerCase().includes('simple terms') || text.toLowerCase().includes('explain')) {
        reply = `Think of ${activeLesson.title} like a structured contract: before any mutation occurs, the runtime must verify all precondition bounds. Once verified, the operation completes atomically, preserving system integrity.`;
      } else if (text.toLowerCase().includes('edge case') || text.toLowerCase().includes('hazard')) {
        reply = `The most common failure mode here is an off-by-one boundary traversal or an invalid null pointer dereference before initialization. Always defend against empty collections and verify termination invariants.`;
      } else if (text.toLowerCase().includes('example') || text.toLowerCase().includes('code')) {
        reply = `Here is a clear architectural pattern:\n\n\`\`\`typescript\n// Invariant verification pattern\nfunction executeSafeState(input: DataType): Result {\n  if (!isValid(input)) throw new BoundsError();\n  return process(input);\n}\n\`\`\`\nNotice how the defensive check prevents cascading faults downstream.`;
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleMarkComplete = () => {
    setCompleted(true);
  };

  return (
    <div className="space-y-6 text-left w-full">
      {/* Top Header & Navigation Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            <Link
              href={`/dashboard/courses/${course.slug}`}
              className="hover:underline flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{course.code} Learning Path</span>
            </Link>
            <span>/</span>
            <span>{activeUnit.title}</span>
          </div>

          <h1 className={`text-2xl sm:text-3xl font-extrabold text-ink tracking-tight ${font.displayClass}`}>
            {activeLesson.title}
          </h1>

          <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
            <span className="flex items-center gap-1 font-semibold" style={{ color: palette.accent }}>
              <Clock className="w-3.5 h-3.5" />
              {activeLesson.duration}
            </span>
            <span>•</span>
            <span>Interactive Focus Study &amp; AI Workbench</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleMarkComplete}
            className={`py-2 px-3.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs ${
              completed
                ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {completed ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Completed (+50 XP)</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" />
                <span>Mark Complete</span>
              </>
            )}
          </button>

          <Link
            href="/dashboard/practice"
            className="py-2 px-3.5 rounded-xl text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
            style={{ backgroundColor: palette.accent }}
          >
            <span>Practice Checkpoint</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Split Workbench View: Concept Reader (Left) + AI Study Assistant (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Concept Reader & Architecture Notes (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
          {/* Reader Tab Navigation */}
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <button
              onClick={() => setActiveTab('concepts')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'concepts'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              1. Theoretical Foundation
            </button>
            <button
              onClick={() => setActiveTab('protocol')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'protocol'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              2. Mechanics &amp; Execution
            </button>
            <button
              onClick={() => setActiveTab('invariants')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'invariants'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              3. Invariants &amp; Edge Cases
            </button>
          </div>

          {/* Tab 1: Theoretical Foundation */}
          {activeTab === 'concepts' && (
            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <h2 className="text-base font-bold text-slate-900">
                Core Foundations: {activeLesson.title}
              </h2>
              <p>
                In structured computational curriculums, mastering the baseline principles of <strong>{activeLesson.title}</strong> is essential for preventing algorithmic degradation and memory invalidation.
              </p>
              <p>
                Every computational unit operates under strict operational preconditions. When state changes occur without formal boundary checking, cascading failures can propagate throughout the entire execution stack.
              </p>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <Cpu className="w-4 h-4 text-sky-600" />
                  <span>Execution Model &amp; State Management</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  The runtime environment establishes isolated execution scopes. Variables declared within a local frame remain scoped to that activation record, ensuring deterministic re-entrancy and preventing side effects.
                </p>
              </div>
            </div>
          )}

          {/* Tab 2: Mechanics & Transitions */}
          {activeTab === 'protocol' && (
            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <h2 className="text-base font-bold text-slate-900">
                State Transitions &amp; Memory Layout
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl border border-emerald-200 bg-emerald-50/50">
                  <div className="flex items-center gap-2 font-bold text-emerald-900 mb-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>State A: Initialization</span>
                  </div>
                  <p className="text-xs text-emerald-950/80">
                    Clean allocation. Memory is mapped and pointers point to valid stack frames.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl border border-sky-200 bg-sky-50/50">
                  <div className="flex items-center gap-2 font-bold text-sky-900 mb-1">
                    <span className="w-2 h-2 rounded-full bg-sky-500" />
                    <span>State B: Mutation</span>
                  </div>
                  <p className="text-xs text-sky-950/80">
                    Active mutation occurs within guarded bounds, ensuring no off-by-one overflows.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl border border-indigo-200 bg-indigo-50/50">
                  <div className="flex items-center gap-2 font-bold text-indigo-900 mb-1">
                    <span className="w-2 h-2 rounded-full bg-indigo-500" />
                    <span>State C: Synchronization</span>
                  </div>
                  <p className="text-xs text-indigo-950/80">
                    State values are written back to main memory or propagated to caller return registers.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl border border-rose-200 bg-rose-50/50">
                  <div className="flex items-center gap-2 font-bold text-rose-900 mb-1">
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                    <span>State D: Frame Teardown</span>
                  </div>
                  <p className="text-xs text-rose-950/80">
                    Stack pointer decrements; deallocated registers are released for subsequent calls.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-slate-900 p-4 text-slate-100 font-mono text-xs overflow-x-auto">
                <p className="text-slate-400 text-[10px] pb-1">// State transition trace for {activeLesson.title}</p>
                <p className="text-emerald-400">Step 1: Frame allocate (push frame pointer %rbp)</p>
                <p className="text-slate-300">Step 2: Initialize local primitives and loop guards</p>
                <p className="text-amber-400">Step 3: Evaluate invariant condition on each iteration</p>
                <p className="text-sky-300">Step 4: Restore caller frame (%rsp &lt;- %rbp, pop %rbp)</p>
              </div>
            </div>
          )}

          {/* Tab 3: Invariants */}
          {activeTab === 'invariants' && (
            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <h2 className="text-base font-bold text-slate-900">
                Architectural Invariants &amp; Correctness Proof
              </h2>
              <p>
                In Learnova&apos;s adaptive learning framework, mastery requires understanding the mathematical invariants that guarantee correctness under all inputs:
              </p>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-slate-900 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>The Loop &amp; Scope Invariant</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  For any step <em>k</em> in the loop execution: the invariant holds true before the step, is maintained during execution of the body, and implies the postcondition upon loop termination.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-xs">
                  <Lightbulb className="w-4 h-4 text-amber-600" />
                  <span>Checkpoint Tip: Examination Invariants</span>
                </div>
                <p className="text-xs text-amber-900/80 leading-relaxed">
                  Always verify the base condition when analyzing recursive or iterative logic. In diagnostic assessments, edge-case evaluations (e.g. <em>n = 0</em>, negative index, or boundary conditions) make up 40% of calibrated checkpoint scoring.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Interactive AI Study Assistant (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/90 shadow-sm flex flex-col h-[650px] overflow-hidden">
          {/* AI Header */}
          <div
            className="p-4 text-white flex items-center justify-between"
            style={{ backgroundColor: palette.textPrimary }}
          >
            <div className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center text-white"
                style={{ backgroundColor: palette.accent }}
              >
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-xs sm:text-sm leading-tight">
                  Learnova Socratic Assistant
                </h3>
                <span className="text-[10px] text-emerald-300 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Active • Context: {activeLesson.title}
                </span>
              </div>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/50">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'ai' && (
                  <div
                    className="w-7 h-7 rounded-xl flex items-center justify-center text-white shrink-0 mt-0.5 shadow-xs"
                    style={{ backgroundColor: palette.accent }}
                  >
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-slate-900 text-white shadow-xs rounded-tr-xs'
                      : 'bg-white border border-slate-200/80 text-slate-800 shadow-xs rounded-tl-xs whitespace-pre-line'
                  }`}
                >
                  <p>{m.text}</p>
                  <span className="text-[9px] text-slate-400 block mt-1 text-right">
                    {m.timestamp}
                  </span>
                </div>

                {m.sender === 'user' && (
                  <div className="w-7 h-7 rounded-xl bg-slate-200 flex items-center justify-center text-slate-700 shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5 items-center text-slate-400 text-xs">
                <div
                  className="w-7 h-7 rounded-xl flex items-center justify-center text-white shrink-0"
                  style={{ backgroundColor: palette.accent }}
                >
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="bg-white px-3.5 py-2 rounded-2xl border border-slate-200 text-xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
          </div>

          {/* Quick Prompts */}
          <div className="p-3 border-t border-slate-100 bg-white space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Suggested Questions:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {suggestedPrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(p)}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200/80 text-[11px] text-slate-700 font-medium transition-colors text-left"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Input */}
          <div className="p-3 border-t border-slate-100 bg-white">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={`Ask a question about ${activeLesson.title}...`}
                className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-300 transition-all"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="p-2 rounded-xl text-white transition-all shadow-xs disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                style={{ backgroundColor: palette.accent }}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
