"use client";

import React, { isValidElement, useLayoutEffect, useRef, useState, useEffect } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import "./branched-menu.css";

export interface BranchedMenuChild {
  value: string;
  label: string;
  icon?: any;
  href?: string;
  badge?: string | number;
}

export interface BranchedMenuItem {
  label: string;
  value?: string;
  href?: string;
  icon?: any;
  badge?: string | number;
  children?: BranchedMenuChild[];
}

export interface BranchedMenuProps {
  items: BranchedMenuItem[];
  defaultOpen?: number | number[];
  defaultActive?: string;
  currentPath?: string;
  onSelect?: (value: string, item: BranchedMenuChild | BranchedMenuItem) => void;
  onToggle?: (index: number, open: boolean) => void;
  color?: string;
  accentColor?: string;
  lineColor?: string;
  width?: number;
  rowHeight?: number;
  indent?: number;
  trunk?: number;
  radius?: number;
  lineWidth?: number;
  fontSize?: number;
  drawDuration?: number;
  foldDuration?: number;
  className?: string;
}

const PAD = 6;
const MARK = 16;

const renderIcon = (icon: any) => {
  if (!icon) return null;
  if (isValidElement(icon)) return icon;
  
  if (typeof icon === "function") {
    const IconComponent = icon;
    return <IconComponent className="h-4 w-4 shrink-0" />;
  }
  
  if (typeof icon === "object") {
    // If it's a HugeIcon descriptor object or Lucide icon object
    if ("name" in icon || "$$typeof" in icon) {
      if ("name" in icon) {
        return <HugeiconsIcon icon={icon} size={16} strokeWidth={1.8} />;
      }
      const IconComponent = icon;
      return <IconComponent className="h-4 w-4 shrink-0" />;
    }
    return <HugeiconsIcon icon={icon} size={16} strokeWidth={1.8} />;
  }
  return null;
};

const toSet = (open: number | number[]) =>
  new Set(Array.isArray(open) ? open : open >= 0 ? [open] : []);

export function BranchedMenu({
  items,
  defaultOpen = 0,
  defaultActive = "",
  currentPath = "",
  onSelect,
  onToggle,
  color = "#0B2B53",
  accentColor = "#00A8E8",
  lineColor = "#CBD5E1",
  width = 240,
  rowHeight = 38,
  indent = 38,
  trunk = 14,
  radius = 10,
  lineWidth = 1.75,
  fontSize = 13.5,
  drawDuration = 350,
  foldDuration = 250,
  className = "",
}: BranchedMenuProps) {
  // Determine active item and open sections from currentPath if provided
  const findActiveFromPath = () => {
    if (!currentPath) return { activeVal: defaultActive, openIdx: defaultOpen };
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.children) {
        const foundChild = item.children.find(
          (c) => c.href === currentPath || (currentPath !== "/" && c.href && currentPath.startsWith(c.href) && c.href !== "/")
        );
        if (foundChild) {
          return { activeVal: foundChild.value, openIdx: i };
        }
      } else if (item.href === currentPath || (currentPath !== "/" && item.href && currentPath.startsWith(item.href) && item.href !== "/")) {
        return { activeVal: item.value ?? item.label, openIdx: i };
      }
    }
    return { activeVal: defaultActive, openIdx: defaultOpen };
  };

  const initialPathMatch = findActiveFromPath();

  const [open, setOpen] = useState<Set<number>>(() => {
    const base = toSet(defaultOpen);
    if (typeof initialPathMatch.openIdx === "number") {
      base.add(initialPathMatch.openIdx);
    }
    return base;
  });

  const [active, setActive] = useState<string>(() => {
    if (initialPathMatch.activeVal) return initialPathMatch.activeVal;
    const first = items.find((it, i) => it.children && toSet(defaultOpen).has(i));
    return first?.children?.[0]?.value ?? "";
  });

  useEffect(() => {
    if (currentPath) {
      const match = findActiveFromPath();
      if (match.activeVal) {
        setActive(match.activeVal);
        if (typeof match.openIdx === "number") {
          setOpen((prev) => new Set([...Array.from(prev), match.openIdx as number]));
        }
      }
    }
  }, [currentPath, items]);

  const navRef = useRef<HTMLElement | null>(null);
  const heads = useRef<(HTMLButtonElement | null)[]>([]);
  const markerRef = useRef<HTMLSpanElement | null>(null);
  const latest = useRef<{
    onSelect?: (value: string, item: BranchedMenuChild | BranchedMenuItem) => void;
    onToggle?: (index: number, open: boolean) => void;
  }>({});
  latest.current = { onSelect, onToggle };

  const activeSection = items.findIndex((it) =>
    it.children?.some((kid) => kid.value === active)
  );
  const markerShown = activeSection >= 0 && open.has(activeSection);

  useLayoutEffect(() => {
    const place = (glide: boolean) => {
      const m = markerRef.current;
      const el = heads.current[activeSection];
      if (!m) return;
      const on = markerShown && el;
      if (!glide) m.style.transition = "none";
      if (on && el) m.style.top = `${el.offsetTop + (el.offsetHeight - MARK) / 2}px`;
      m.toggleAttribute("data-on", Boolean(on));
      if (!glide) {
        void m.offsetHeight;
        m.style.transition = "";
      }
    };
    place(true);
    let first = true;
    const ro = new ResizeObserver(() => {
      if (first) {
        first = false;
        return;
      }
      place(false);
    });
    if (navRef.current) ro.observe(navRef.current);
    return () => ro.disconnect();
  }, [activeSection, markerShown, items, fontSize, rowHeight]);

  const select = (value: string, item: BranchedMenuChild | BranchedMenuItem) => {
    setActive(value);
    latest.current.onSelect?.(value, item);
  };

  const toggle = (i: number) => {
    setOpen((prev) => {
      const next = new Set(prev);
      const isOpen = !next.has(i);
      if (isOpen) next.add(i);
      else next.delete(i);
      latest.current.onToggle?.(i, isOpen);
      return next;
    });
  };

  const r = Math.min(radius, rowHeight / 2 - 2);
  const endX = indent - 8;
  const rowY = (k: number) => PAD + k * rowHeight + rowHeight / 2;
  const branch = (k: number) =>
    `M ${trunk} ${rowY(k) - r} A ${r} ${r} 0 0 0 ${trunk + r} ${rowY(k)} H ${endX}`;
  const reach = (k: number) =>
    `M ${trunk} 0 V ${rowY(k) - r} A ${r} ${r} 0 0 0 ${trunk + r} ${rowY(k)} H ${endX}`;
  const length = (k: number) =>
    rowY(k) - r + (Math.PI * r) / 2 + (endX - trunk - r);

  return (
    <nav
      ref={navRef}
      className={`branched-menu${className ? ` ${className}` : ""}`}
      style={
        {
          "--bm-w": `${width}px`,
          "--bm-ink": color,
          "--bm-accent": accentColor,
          "--bm-line": lineColor,
          "--bm-font": `${fontSize}px`,
          "--bm-row": `${rowHeight}px`,
          "--bm-indent": `${indent}px`,
          "--bm-line-w": lineWidth,
          "--bm-draw": `${drawDuration}ms`,
          "--bm-fold": `${foldDuration}ms`,
        } as React.CSSProperties
      }
    >
      <span ref={markerRef} className="branched-menu__marker" aria-hidden="true" />
      {items.map((item, i) => {
        const kids = item.children;
        const isOpen = kids ? open.has(i) : false;
        const leafValue = item.value ?? item.label;
        const leafActive = !kids && (leafValue === active || (item.href && currentPath === item.href));
        const bodyH = kids ? PAD * 2 + kids.length * rowHeight : 0;
        return (
          <div
            key={item.value ?? item.label}
            className="branched-menu__section"
            data-open={isOpen ? "" : undefined}
          >
            {kids ? (
              <button
                ref={(el) => {
                  heads.current[i] = el;
                }}
                type="button"
                className="branched-menu__head"
                aria-expanded={isOpen}
                onClick={() => toggle(i)}
              >
                <span className="branched-menu__head-title">{item.label}</span>
                {item.badge !== undefined && (
                  <span className="branched-menu__badge">{item.badge}</span>
                )}
              </button>
            ) : item.href ? (
              <a
                href={item.href}
                className="branched-menu__head branched-menu__head--link"
                aria-current={leafActive ? "true" : undefined}
                data-active={leafActive ? "" : undefined}
                onClick={() => select(leafValue, item)}
              >
                <div className="flex items-center gap-2">
                  {item.icon && <span className="branched-menu__icon">{renderIcon(item.icon)}</span>}
                  <span className="branched-menu__head-title">{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span className="branched-menu__badge">{item.badge}</span>
                )}
              </a>
            ) : (
              <button
                ref={(el) => {
                  heads.current[i] = el;
                }}
                type="button"
                className="branched-menu__head"
                aria-current={leafActive ? "true" : undefined}
                data-active={leafActive ? "" : undefined}
                onClick={() => select(leafValue, item)}
              >
                <div className="flex items-center gap-2">
                  {item.icon && <span className="branched-menu__icon">{renderIcon(item.icon)}</span>}
                  <span className="branched-menu__head-title">{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span className="branched-menu__badge">{item.badge}</span>
                )}
              </button>
            )}

            {kids ? (
              <div className="branched-menu__body">
                <div className="branched-menu__fold">
                  <div className="branched-menu__tree" style={{ height: bodyH }}>
                    <svg
                      className="branched-menu__lines"
                      width={indent}
                      height={bodyH}
                      aria-hidden="true"
                    >
                      <path
                        className="branched-menu__base"
                        d={`M ${trunk} 0 V ${rowY(kids.length - 1) - r}`}
                      />
                      {kids.map((kid, k) => (
                        <path
                          key={kid.value}
                          className="branched-menu__base"
                          d={branch(k)}
                        />
                      ))}
                      {kids.map((kid, k) => (
                        <path
                          key={kid.value}
                          className="branched-menu__reach"
                          d={reach(k)}
                          style={{
                            strokeDasharray: length(k),
                            strokeDashoffset:
                              kid.value === active ? 0 : length(k),
                          }}
                        />
                      ))}
                    </svg>
                    {kids.map((kid) => {
                      const isKidActive = kid.value === active || (kid.href && currentPath === kid.href);
                      return kid.href ? (
                        <a
                          key={kid.value}
                          href={kid.href}
                          className="branched-menu__item"
                          aria-current={isKidActive ? "true" : undefined}
                          data-active={isKidActive ? "" : undefined}
                          tabIndex={isOpen ? 0 : -1}
                          onClick={() => select(kid.value, kid)}
                        >
                          <div className="flex items-center gap-2 overflow-hidden">
                            {kid.icon ? (
                              <span
                                className="branched-menu__icon"
                                aria-hidden="true"
                              >
                                {renderIcon(kid.icon)}
                              </span>
                            ) : null}
                            <span className="branched-menu__label truncate">
                              {kid.label}
                            </span>
                          </div>
                          {kid.badge !== undefined && (
                            <span className="branched-menu__badge shrink-0">
                              {kid.badge}
                            </span>
                          )}
                        </a>
                      ) : (
                        <button
                          key={kid.value}
                          type="button"
                          className="branched-menu__item"
                          aria-current={isKidActive ? "true" : undefined}
                          data-active={isKidActive ? "" : undefined}
                          tabIndex={isOpen ? 0 : -1}
                          onClick={() => select(kid.value, kid)}
                        >
                          <div className="flex items-center gap-2 overflow-hidden">
                            {kid.icon ? (
                              <span
                                className="branched-menu__icon"
                                aria-hidden="true"
                              >
                                {renderIcon(kid.icon)}
                              </span>
                            ) : null}
                            <span className="branched-menu__label truncate">
                              {kid.label}
                            </span>
                          </div>
                          {kid.badge !== undefined && (
                            <span className="branched-menu__badge shrink-0">
                              {kid.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        );
      })}
    </nav>
  );
}

export default BranchedMenu;
