import * as React from "react";
import { cn } from "../lib/utils";

export interface AvatarProps {
  src?: string;
  name: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function Avatar({ src, name, size = "md", className }: AvatarProps) {
  const [hasError, setHasError] = React.useState(false);

  const getInitials = (str: string) => {
    return str
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const sizeStyles = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
    xl: "h-16 w-16 text-xl",
  };

  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-tr from-indigo-500 to-indigo-600 font-semibold text-white shadow-sm ring-2 ring-white dark:ring-slate-800",
        sizeStyles[size],
        className
      )}
    >
      {src && !hasError ? (
        <img
          src={src}
          alt={name}
          onError={() => setHasError(true)}
          className="aspect-square h-full w-full object-cover"
        />
      ) : (
        <span>{getInitials(name || "Learner")}</span>
      )}
    </div>
  );
}
