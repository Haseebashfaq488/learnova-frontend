import * as React from "react";
import { cn } from "../lib/utils";
import { Card } from "./card";

export interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  icon?: React.ReactNode;
  description?: string;
  className?: string;
}

export function StatCard({
  title,
  value,
  change,
  isPositive = true,
  icon,
  description,
  className,
}: StatCardProps) {
  return (
    <Card className={cn("p-5", className)}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
          {title}
        </p>
        {icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400">
            {icon}
          </div>
        )}
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          {value}
        </span>
        {change && (
          <span
            className={cn(
              "text-xs font-semibold px-1.5 py-0.5 rounded-md",
              isPositive
                ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400"
                : "bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400"
            )}
          >
            {change}
          </span>
        )}
      </div>
      {description && (
        <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
          {description}
        </p>
      )}
    </Card>
  );
}
