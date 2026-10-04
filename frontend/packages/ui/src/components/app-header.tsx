import * as React from "react";
import { Avatar } from "./avatar";
import { Badge } from "./badge";
import { Bell, Search, Zap, Award } from "lucide-react";

export interface AppHeaderProps {
  portalName: "Students" | "Teacher Studio" | "Admin Center";
  userName: string;
  userRole: string;
  avatarUrl?: string;
  notificationCount?: number;
  streakDays?: number;
  currentXp?: number;
  cohortTag?: string;
}

export function AppHeader({
  portalName,
  userName,
  userRole,
  avatarUrl,
  notificationCount = 0,
  streakDays,
  currentXp,
  cohortTag,
}: AppHeaderProps) {
  const badgeVariant =
    portalName === "Admin Center"
      ? "danger"
      : portalName === "Teacher Studio"
      ? "warning"
      : "default";

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200/80 bg-white/90 px-6 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/90">
      {/* Brand & Portal Label */}
      <div className="flex items-center gap-3">
        <a href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0B2B53] shadow-md shadow-slate-900/10 transition-transform group-hover:scale-105">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44" className="w-5 h-5" fill="none">
              <path d="M14 32V16L28 22V38L14 32Z" fill="#00A8E8" />
              <path d="M28 22L36 18V32L28 36V22Z" fill="#2ECC71" />
              <circle cx="28" cy="14" r="3.5" fill="#FFFFFF" />
            </svg>
          </div>
          <span className="text-lg font-bold tracking-tight text-[#0B2B53] dark:text-white">
            Learnova
          </span>
        </a>
        <Badge variant={badgeVariant}>{portalName}</Badge>

        {cohortTag && (
          <span className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
            {cohortTag}
          </span>
        )}
      </div>

      {/* Right Metabar */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative hidden md:block w-56 lg:w-64">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search topics, lessons, students..."
            className="h-9 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-4 text-xs text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-100"
          />
        </div>

        {/* Streak Chip */}
        {streakDays !== undefined && (
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-300">
            <Zap className="h-3.5 w-3.5 fill-emerald-500 text-emerald-500" />
            <span>{streakDays} Day Streak</span>
          </div>
        )}

        {/* XP Counter */}
        {currentXp !== undefined && (
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-semibold dark:bg-sky-950/40 dark:border-sky-800 dark:text-sky-300">
            <Award className="h-3.5 w-3.5 text-sky-500" />
            <span>{currentXp.toLocaleString()} XP</span>
          </div>
        )}

        {/* Notification Bell */}
        <button
          aria-label="Notifications"
          className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition-colors hover:bg-slate-100 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <Bell className="h-4 w-4" />
          {notificationCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
              {notificationCount}
            </span>
          )}
        </button>

        {/* User Avatar */}
        <a
          href="/profile"
          className="flex items-center gap-3 pl-2 border-l border-slate-200 dark:border-slate-800 group hover:opacity-90 transition-opacity"
          title="View Gamified Profile"
        >
          <div className="relative">
            <Avatar name={userName} src={avatarUrl} size="sm" />
            <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900" />
          </div>
          <div className="hidden text-left sm:block">
            <p className="text-xs font-semibold text-slate-900 dark:text-white leading-tight group-hover:text-sky-600 transition-colors">
              {userName}
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 capitalize">
              {userRole}
            </p>
          </div>
        </a>
      </div>
    </header>
  );
}
