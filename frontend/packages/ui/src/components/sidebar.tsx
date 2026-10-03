"use client";

import * as React from "react";
import { cn } from "../lib/utils";
import { BranchedMenu, BranchedMenuItem, BranchedMenuChild } from "./branched-menu";

export interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  active?: boolean;
  badge?: string | number;
}

export interface SidebarProps {
  branches?: BranchedMenuItem[];
  items?: NavItem[];
  currentPath?: string;
  defaultOpen?: number | number[];
  children?: React.ReactNode;
  footerContent?: React.ReactNode;
  className?: string;
  width?: number;
}

export function Sidebar({
  branches,
  items,
  currentPath,
  defaultOpen = [0, 1],
  children,
  footerContent,
  className,
  width = 240,
}: SidebarProps) {
  // If `branches` is provided, use BranchedMenu directly.
  // If only legacy `items` is provided, convert into a root branch.
  const menuItems: BranchedMenuItem[] = React.useMemo(() => {
    if (branches && branches.length > 0) {
      return branches;
    }
    if (items && items.length > 0) {
      return [
        {
          label: "Navigation",
          children: items.map((item) => ({
            value: item.href,
            label: item.label,
            icon: item.icon,
            href: item.href,
            badge: item.badge,
          })),
        },
      ];
    }
    return [];
  }, [branches, items]);

  return (
    <aside
      className={cn(
        "sticky top-16 flex h-[calc(100vh-4rem)] w-64 shrink-0 flex-col justify-between overflow-y-auto border-r border-slate-200/80 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900 shadow-sm",
        className
      )}
    >
      <div className="space-y-4">
        {menuItems.length > 0 && (
          <BranchedMenu
            items={menuItems}
            currentPath={currentPath}
            defaultOpen={defaultOpen}
            width={width}
            color="#0B2B53"
            accentColor="#00A8E8"
            lineColor="#CBD5E1"
          />
        )}

        {children && (
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
            {children}
          </div>
        )}
      </div>

      {footerContent && (
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
          {footerContent}
        </div>
      )}
    </aside>
  );
}

export default Sidebar;
