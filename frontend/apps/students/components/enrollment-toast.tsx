"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { CheckCircle2, X, ArrowRight, Sparkles, BookOpen } from "lucide-react";
import { Button } from "@learnova/ui";
import { useEnrollment } from "../lib/enrollment-context";

export function EnrollmentToast() {
  const { toast, clearToast } = useEnrollment();

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        clearToast();
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [toast, clearToast]);

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-full animate-in slide-in-from-bottom-5 duration-300">
      <div className="bg-[#0B2B53] text-white p-5 rounded-2xl shadow-2xl border border-sky-400/30 flex flex-col gap-3 relative overflow-hidden backdrop-blur-md">
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#00A8E8]/20 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#00A8E8] text-[#0B2B53] flex items-center justify-center shrink-0 shadow-sm">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white leading-tight">{toast.title}</h4>
              <p className="text-xs text-sky-200 mt-0.5">{toast.courseTitle}</p>
            </div>
          </div>

          <button
            onClick={clearToast}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
            aria-label="Dismiss notification"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">{toast.message}</p>

        <div className="flex items-center gap-2 pt-1">
          {toast.actionHref && (
            <Link href={toast.actionHref} onClick={clearToast} className="flex-1">
              <Button
                size="sm"
                className="w-full bg-[#00A8E8] hover:bg-sky-400 text-[#0B2B53] font-bold text-xs flex items-center justify-center gap-1.5 rounded-xl shadow-sm"
              >
                <span>{toast.actionLabel || "Start Learning"}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          )}

          <Link href="/courses" onClick={clearToast} className="flex-1">
            <Button
              size="sm"
              variant="outline"
              className="w-full border-white/20 text-white hover:bg-white/10 font-bold text-xs flex items-center justify-center gap-1.5 rounded-xl"
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span>View Enrolled</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
