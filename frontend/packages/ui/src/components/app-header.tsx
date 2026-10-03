import * as React from "react";
import { Avatar } from "./avatar";
import { Badge } from "./badge";
import { Bell, Search } from "lucide-react";

export interface AppHeaderProps {
  portalName: "Students" | "Teacher Studio" | "Admin Center";
  userName: string;
  userRole: string;
  avatarUrl?: string;
  notificationCount?: number;
}

export function AppHeader({
  portalName,
  userName,
  userRole,
  avatarUrl,
  notificationCount = 0,
}: AppHeaderProps) {
  const badgeVariant =
    portalName === "Admin Center"
      ? "danger"
      : portalName === "Teacher Studio"
      ? "warning"
      : "default";

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200/80 bg-white/80 px-6 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 font-bold text-white shadow-md shadow-indigo-500/20">
          L
        </div>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
            Learnova
          </span>
          <Badge variant={badgeVariant}>{portalName}</Badge>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden w-64 md:block">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search anything..."
            className="h-9 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-4 text-xs text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-850 dark:text-slate-100"
          />
        </div>

        <button className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition-colors hover:bg-slate-100 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800">
          <Bell className="h-4 w-4" />
          {notificationCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
              {notificationCount}
            </span>
          )}
        </button>

        <div className="flex items-center gap-3 pl-2 border-l border-slate-200 dark:border-slate-800">
          <Avatar name={userName} src={avatarUrl} size="sm" />
          <div className="hidden text-left sm:block">
            <p className="text-xs font-semibold text-slate-900 dark:text-white leading-tight">
              {userName}
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 capitalize">
              {userRole}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
