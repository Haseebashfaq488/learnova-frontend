import * as React from "react";
import { cn } from "../lib/utils";

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  indicatorClassName?: string;
}

export function Progress({
  value,
  max = 100,
  className,
  indicatorClassName,
  ...props
}: ProgressProps) {
  const percentage = Math.min(Math.max(0, (value / max) * 100), 100);

  return (
    <div
      className={cn(
        "relative h-2.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "h-full rounded-full bg-indigo-600 transition-all duration-300 ease-out",
          indicatorClassName
        )}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
