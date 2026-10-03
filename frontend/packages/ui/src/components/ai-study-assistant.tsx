"use client";

import React, { useState } from "react";
import { AIChatMessage } from "@learnova/types";
import { mockAITutorHistory, mockAIPromptSuggestions } from "../data/mock-ai-tutor";
import { Sparkles, Send, Brain, Bot, User, HelpCircle, CheckCircle2 } from "lucide-react";

export interface AIStudyAssistantProps {
  lessonTitle?: string;
  className?: string;
}

export function AIStudyAssistant({
  lessonTitle = "Lesson 3.2: Calculating Net Force in 2D",
  className = "",
}: AIStudyAssistantProps) {
  const [messages, setMessages] = useState<AIChatMessage[]>(mockAITutorHistory);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = (textToSend?: string) => {
    const query = textToSend || inputValue;
    if (!query.trim()) return;

    const userMsg: AIChatMessage = {
      id: `msg-${Date.now()}`,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      text: query,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      let replyText = `Here is a breakdown for "${query}":`;
      let formula = "Σ F_parallel = m · g · sin(θ) - f_k = m · a_x";
      let steps = [
        "1. Identify the coordinate frame aligned with the ramp.",
        "2. Decompose downward gravity (mg) into perpendicular (mg cos θ) and parallel (mg sin θ).",
        "3. Apply dynamic equilibrium on perpendicular axis: FN = mg cos θ.",
      ];

      if (query.toLowerCase().includes("simplify")) {
        replyText = "In simple terms: gravity pulls straight down, but the ramp only lets the object slide downhill. We use sin(θ) for the downhill slide force and cos(θ) for the pressure into the ramp surface.";
      } else if (query.toLowerCase().includes("practice")) {
        replyText = "Quick test: A 4.0 kg box rests on a 30° ramp with static friction coefficient μ_s = 0.6. Does it slide?";
        steps = [
          "Downhill force: F_g,∥ = 4.0 × 9.8 × sin(30°) = 19.6 N.",
          "Max static friction: f_s,max = 0.6 × (4.0 × 9.8 × cos(30°)) = 20.37 N.",
          "Since F_g,∥ (19.6 N) < f_s,max (20.37 N), the box remains at rest!",
        ];
        formula = "f_s,max = μ_s · m · g · cos(θ)";
      }

      const aiMsg: AIChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: "assistant",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        badge: "Verified AP Physics",
        text: replyText,
        suggestedSteps: steps,
        formulaSnippet: formula,
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div className={`bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col h-[calc(100vh-7rem)] max-h-[780px] ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#00A8E8] to-sky-400 text-white flex items-center justify-center shadow-sm">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#0B2B53] leading-none">AI Study Companion</h3>
            <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Active • Context Aware (Lesson 3.2)
            </span>
          </div>
        </div>
      </div>

      {/* Chat Stream */}
      <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1 text-xs overscroll-contain">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
          >
            {msg.sender === "assistant" && (
              <div className="flex items-center gap-1 text-[11px] font-bold text-sky-700 mb-1">
                <Bot className="h-3.5 w-3.5" />
                <span>Learnova Tutor</span>
                {msg.badge && (
                  <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded">
                    {msg.badge}
                  </span>
                )}
              </div>
            )}

            <div
              className={`p-3.5 rounded-2xl max-w-[92%] leading-relaxed ${
                msg.sender === "user"
                  ? "bg-[#0B2B53] text-white rounded-tr-xs shadow-sm"
                  : "bg-slate-50 border border-slate-200 text-slate-800 rounded-tl-xs shadow-sm"
              }`}
            >
              <p className="font-medium">{msg.text}</p>

              {msg.suggestedSteps && (
                <div className="mt-2 space-y-1.5 border-t border-slate-200/60 pt-2 text-[11px]">
                  {msg.suggestedSteps.map((step, idx) => (
                    <p key={idx} className="leading-snug text-slate-700 font-normal">
                      {step}
                    </p>
                  ))}
                </div>
              )}

              {msg.formulaSnippet && (
                <div className="mt-2 p-2 rounded-lg bg-sky-50 text-sky-900 font-mono text-[10px] whitespace-pre-line border border-sky-100">
                  {msg.formulaSnippet}
                </div>
              )}
            </div>

            <span className="text-[10px] text-slate-400 mt-1 px-1">
              {msg.timestamp}
            </span>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-1.5 text-xs text-slate-400 py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-bounce"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-bounce [animation-delay:0.2s]"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-bounce [animation-delay:0.4s]"></span>
            <span className="text-[11px]">Tutor is writing...</span>
          </div>
        )}
      </div>

      {/* Quick Prompt Chips */}
      <div className="pt-2 pb-2 border-t border-slate-100 flex flex-wrap gap-1.5">
        {mockAIPromptSuggestions.slice(0, 2).map((chip, idx) => (
          <button
            key={idx}
            onClick={() => sendMessage(chip)}
            className="text-[11px] font-semibold bg-slate-50 hover:bg-sky-50 hover:text-sky-700 text-slate-600 px-2.5 py-1 rounded-lg border border-slate-200 transition-colors flex items-center gap-1"
          >
            <Sparkles className="h-3 w-3 text-sky-500" />
            <span>{chip}</span>
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
        className="relative flex items-center"
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask physics question or derive..."
          className="w-full h-10 pl-3.5 pr-10 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20 transition-all"
        />
        <button
          type="submit"
          disabled={!inputValue.trim()}
          className="absolute right-1.5 p-1.5 rounded-lg bg-[#00A8E8] hover:bg-sky-500 disabled:opacity-40 text-white transition-all"
        >
          <Send className="h-3.5 w-3.5" />
        </button>
      </form>
    </div>
  );
}
