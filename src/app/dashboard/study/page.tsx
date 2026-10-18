'use client';

import React, { useState } from 'react';
import Link from 'next/link';
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
} from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';
import { useAuth } from '../../../context/AuthContext';
import { nextLesson } from '../../../data/studentData';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

export default function StudyRoomPage() {
  const { palette, font } = useTheme();
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState<'concepts' | 'protocol' | 'invariants'>('concepts');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'ai',
      text: "Hello Alex! I am your Learnova AI Study Assistant for CS 101. We are studying Lesson 3.2: Multilevel Cache Coherence & the MESI Protocol. Feel free to ask any conceptual question, ask for an analogy, or test your understanding!",
      timestamp: '11:42 AM',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const suggestedPrompts = [
    'Explain the 4 MESI states simply',
    'What is False Sharing and how do we prevent it?',
    'Why is write-back better than write-through?',
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
      let reply = "That's a vital systems invariant! In a multicore system, private L1/L2 caches require a coherence protocol like MESI so cores don't read stale values.";
      if (text.toLowerCase().includes('4 mesi states') || text.toLowerCase().includes('mesi')) {
        reply = "The MESI protocol has 4 states for every cache line: \n• Modified (M): Line is present ONLY in this cache and is dirty (must write back to RAM).\n• Exclusive (E): Line is clean, present ONLY in this cache, matches RAM.\n• Shared (S): Line is clean, present in this cache and possibly other cores' caches.\n• Invalid (I): Line does not contain valid data; reading triggers a cache miss.";
      } else if (text.toLowerCase().includes('false sharing')) {
        reply = "False sharing occurs when two independent cores modify two completely unrelated variables that happen to reside in the EXACT same 64-byte cache line. Even though the variables are distinct, the hardware invalidates the entire cache line across both cores, causing severe performance degradation. Prevention: align variables to 64-byte boundaries using compiler attributes like `alignas(64)`.";
      } else if (text.toLowerCase().includes('write-back')) {
        reply = "Write-back defers writes to main memory until the cache line is evicted (dirty bit set). This saves enormous memory bus bandwidth when a core repeatedly writes to the same memory loop. Write-through writes immediately to main memory on every store, generating excessive bus traffic.";
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

  return (
    <div className="space-y-6 text-left">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            <BookOpen className="w-3.5 h-3.5" style={{ color: palette.accent }} />
            <span>Focus Study Environment</span>
          </div>
          <h1 className={`text-2xl sm:text-3xl font-extrabold text-ink tracking-tight ${font.displayClass}`}>
            {nextLesson.lessonCode}: {nextLesson.title}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {nextLesson.courseTitle} • {nextLesson.unitTitle}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/dashboard/courses/foundations-of-computer-science"
            className="py-2 px-3.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Course Learning Path</span>
          </Link>
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
              2. MESI State Transitions
            </button>
            <button
              onClick={() => setActiveTab('invariants')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'invariants'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              3. Architectural Invariants
            </button>
          </div>

          {/* Tab 1: Theoretical Foundation */}
          {activeTab === 'concepts' && (
            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <h2 className="text-base font-bold text-slate-900">
                The Multicore Coherence Dilemma
              </h2>
              <p>
                In symmetric multiprocessing (SMP) systems, every CPU core possesses its own private L1 and L2 caches for rapid data retrieval. However, when multiple cores execute threads that read and write to the same shared memory location, multiple copies of that location simultaneously reside in differing states across distinct caches.
              </p>
              <p>
                Without hardware arbitration, Core A could modify memory location <code className="px-1.5 py-0.5 rounded bg-slate-100 font-mono text-slate-900">0x7FFF00</code> in its private cache, leaving Core B with an obsolete, stale copy. Cache coherence protocols resolve this by ensuring that all processors see a globally consistent sequence of memory operations.
              </p>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <Cpu className="w-4 h-4 text-sky-600" />
                  <span>Bus Snooping (Snoopy Protocol)</span>
                </div>
                <p className="text-xs text-slate-600">
                  In broadcast bus systems, each cache controller continuously monitors (&ldquo;snoops&rdquo;) the shared memory bus for read and write requests initiated by peer processors. If another core announces a write to an address held locally, the snooping core immediately marks its local cache entry as <strong>Invalid</strong>.
                </p>
              </div>
            </div>
          )}

          {/* Tab 2: Protocol State Diagram */}
          {activeTab === 'protocol' && (
            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <h2 className="text-base font-bold text-slate-900">
                The 4 MESI Protocol States
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl border border-emerald-200 bg-emerald-50/50">
                  <div className="flex items-center gap-2 font-bold text-emerald-900 mb-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>Modified (M)</span>
                  </div>
                  <p className="text-xs text-emerald-950/80">
                    Dirty data. Resides <em>only</em> in this private cache and has been mutated. Main memory copy is stale.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl border border-sky-200 bg-sky-50/50">
                  <div className="flex items-center gap-2 font-bold text-sky-900 mb-1">
                    <span className="w-2 h-2 rounded-full bg-sky-500" />
                    <span>Exclusive (E)</span>
                  </div>
                  <p className="text-xs text-sky-950/80">
                    Clean data. Resides <em>only</em> in this private cache and matches the current main memory copy.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl border border-indigo-200 bg-indigo-50/50">
                  <div className="flex items-center gap-2 font-bold text-indigo-900 mb-1">
                    <span className="w-2 h-2 rounded-full bg-indigo-500" />
                    <span>Shared (S)</span>
                  </div>
                  <p className="text-xs text-indigo-950/80">
                    Clean data. Resides in this private cache and may also be replicated in other peer caches.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl border border-rose-200 bg-rose-50/50">
                  <div className="flex items-center gap-2 font-bold text-rose-900 mb-1">
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                    <span>Invalid (I)</span>
                  </div>
                  <p className="text-xs text-rose-950/80">
                    Unused or invalidated line. Any attempt by the processor to read this line triggers a cache miss.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-slate-900 p-4 text-slate-100 font-mono text-xs overflow-x-auto">
                <p className="text-slate-400 text-[10px] pb-1">// State transition invariant: Write to Shared Line</p>
                <p className="text-amber-400">Core 0: Writes to Shared (S) line</p>
                <p className="text-slate-300">→ Broadcasts &apos;BusUpgr&apos; (Invalidate broadcast) on bus</p>
                <p className="text-slate-300">→ Peer caches snoop &apos;BusUpgr&apos; and switch (S) → (I)</p>
                <p className="text-emerald-400">→ Core 0 transitions (S) → (M)</p>
              </div>
            </div>
          )}

          {/* Tab 3: Invariants */}
          {activeTab === 'invariants' && (
            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <h2 className="text-base font-bold text-slate-900">
                SWMR: Single-Writer, Multiple-Reader Invariant
              </h2>
              <p>
                The fundamental invariant that guarantees strict serializability in hardware cache hierarchies is the <strong>Single-Writer, Multiple-Reader (SWMR)</strong> rule:
              </p>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-slate-900 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>SWMR Invariant</span>
                </div>
                <p className="text-xs text-slate-600">
                  For any given memory address at any point in logical time, there may exist either <em>multiple read-only copies</em> (Shared state), OR <em>exactly one writable copy</em> (Modified state), but never both simultaneously.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-xs">
                  <Lightbulb className="w-4 h-4 text-amber-600" />
                  <span>Exam Tip: False Sharing Hazards</span>
                </div>
                <p className="text-xs text-amber-900/80 leading-relaxed">
                  Notice that coherence is maintained at the <strong>Cache Line granularity</strong> (typically 64 bytes), NOT at individual byte granularity! If two independent variables share the same 64-byte block, cores will thrash invalidation signals.
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
                  Active • Context: MESI Cache Protocol
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
                placeholder="Ask about MESI transitions, invalidations..."
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
