import * as React from "react";
import { cn } from "../lib/utils";

export interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  active?: boolean;
  badge?: string | number;
}

export interface SidebarProps {
  items: NavItem[];
  currentPath?: string;
  children?: React.ReactNode;
  footerContent?: React.ReactNode;
  className?: string;
}

export function Sidebar({ items, currentPath, children, footerContent, className }: SidebarProps) {
  return (
    <aside
      className={cn(
        "sticky top-16 flex h-[calc(100vh-4rem)] w-64 shrink-0 flex-col justify-between overflow-y-auto border-r border-slate-200/80 bg-white p-4 dark:border-slate-800 dark:bg-slate-900",
        className
      )}
    >
      <div className="space-y-4">
        <nav className="space-y-1">
          {items.map((item) => {
            const isActive = item.active || (currentPath ? currentPath === item.href : false);
            return (
              <a
                key={item.label}
                href={item.href}
                className={cn(
                  "group flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-150",
                  isActive
                    ? "bg-indigo-50 font-semibold text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
                )}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "transition-colors",
                      isActive
                        ? "text-indigo-600 dark:text-indigo-400"
                        : "text-slate-400 group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-300"
                    )}
                  >
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-xs font-semibold",
                      isActive
                        ? "bg-indigo-200/60 text-indigo-800 dark:bg-indigo-800 dark:text-indigo-200"
                        : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                    )}
                  >
                    {item.badge}
                  </span>
                )}
              </a>
            );
          })}
        </nav>

        {children && <div className="pt-3 border-t border-slate-100 dark:border-slate-800">{children}</div>}
      </div>

      {footerContent && (
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
          {footerContent}
        </div>
      )}
    </aside>
  );
}
