"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@learnova/ui";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

export default function TeacherLoginPage() {
  const [role, setRole] = useState<"student" | "teacher">("teacher");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-4 font-sans relative">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-sky-200/30 blur-3xl pointer-events-none"></div>

      {/* Brand Header */}
      <div className="flex flex-col items-center mb-6 text-center z-10">
        <div className="w-12 h-12 rounded-2xl bg-[#0B2B53] shadow-md shadow-slate-900/10 flex items-center justify-center p-2.5 mb-2.5">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44" className="w-full h-full" fill="none">
            <path d="M14 32V16L28 22V38L14 32Z" fill="#00A8E8" />
            <path d="M28 22L36 18V32L28 36V22Z" fill="#2ECC71" />
            <circle cx="28" cy="14" r="3.5" fill="#FFFFFF" />
          </svg>
        </div>
        <span className="text-xl font-extrabold text-[#0B2B53] tracking-tight">Learnova</span>
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mt-0.5">
          Faculty Workspace
        </span>
      </div>

      {/* Focus Auth Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200/80 p-6 sm:p-8 z-10 flex flex-col">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-[#0B2B53] tracking-tight">Welcome back</h1>
          <p className="text-xs text-slate-500 mt-1">Sign in to your faculty studio</p>
        </div>

        {/* Role Toggle */}
        <div className="p-1 bg-slate-100 rounded-xl flex items-center mb-6">
          <button
            type="button"
            onClick={() => setRole("student")}
            className={`flex-1 py-2 rounded-lg text-xs font-bold text-center transition-all ${
              role === "student"
                ? "bg-white text-[#0B2B53] shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Student Portal
          </button>
          <button
            type="button"
            onClick={() => setRole("teacher")}
            className={`flex-1 py-2 rounded-lg text-xs font-bold text-center transition-all ${
              role === "teacher"
                ? "bg-white text-[#0B2B53] shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Faculty Workspace
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            window.location.href = role === "teacher" ? "/" : "http://localhost:3000";
          }}
          className="flex flex-col gap-4"
        >
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold text-[#0B2B53]">
              <label htmlFor="email">Institutional Email</label>
              <span className="text-[11px] text-slate-400 font-normal">
                {role === "teacher" ? "faculty@institution.edu" : "student@school.edu"}
              </span>
            </div>
            <div className="relative flex items-center">
              <Mail className="absolute left-3 h-4 w-4 text-slate-400 pointer-events-none" />
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="s.mitchell@institution.edu"
                className="w-full h-10 pl-9 pr-3 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold text-[#0B2B53]">
              <label htmlFor="password">Password</label>
              <a href="#" className="text-[11px] text-sky-600 hover:underline">
                Forgot password?
              </a>
            </div>
            <div className="relative flex items-center">
              <Lock className="absolute left-3 h-4 w-4 text-slate-400 pointer-events-none" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full h-10 pl-9 pr-10 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-slate-400 hover:text-slate-700"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-1">
            <input
              id="remember"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500 cursor-pointer"
            />
            <label htmlFor="remember" className="text-xs text-slate-600 cursor-pointer select-none">
              Keep me signed in on this device
            </label>
          </div>

          <Button
            type="submit"
            className="w-full h-10 mt-2 bg-[#00A8E8] hover:bg-sky-500 text-white font-bold text-xs rounded-xl shadow-md shadow-sky-500/20 flex items-center justify-center gap-2"
          >
            <span>Sign In</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-600">
            Need faculty onboarding?{" "}
            <Link href="/register" className="font-bold text-sky-600 hover:underline ml-1">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
