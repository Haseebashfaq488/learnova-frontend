'use client';

import React, { isValidElement, useLayoutEffect, useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import './branched-menu.css';

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

const PAD = 4;
const MARK = 16;

const renderIcon = (icon: any) => {
  if (!icon) return null;
  if (isValidElement(icon)) return icon;

  if (typeof icon === 'function' || (typeof icon === 'object' && ('render' in icon || '$$typeof' in icon))) {
    const IconComponent = icon;
    return <IconComponent className="h-4 w-4 shrink-0" />;
  }

  return null;
};

const toSet = (open: number | number[]) =>
  new Set(Array.isArray(open) ? open : open >= 0 ? [open] : []);

export function BranchedMenu({
  items,
  defaultOpen = [0, 1, 2],
  defaultActive = '',
  currentPath = '',
  onSelect,
  onToggle,
  color = '#1E293B',
  accentColor = '#0284C7',
  lineColor = '#E2E8F0',
  width = 240,
  rowHeight = 38,
  indent = 36,
  trunk = 12,
  radius = 8,
  lineWidth = 1.75,
  fontSize = 13,
  drawDuration = 320,
  foldDuration = 240,
  className = '',
}: BranchedMenuProps) {
  // Determine active item and open sections from currentPath with priority for EXACT matches
  const findActiveFromPath = () => {
    if (!currentPath) return { activeVal: defaultActive, openIdx: defaultOpen };

    // 1. First priority: Exact match on href
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.children) {
        const found = item.children.find((c) => c.href === currentPath);
        if (found) {
          return { activeVal: found.value, openIdx: i };
        }
      } else if (item.href === currentPath) {
        return { activeVal: item.value ?? item.label, openIdx: i };
      }
    }

    // 2. Second priority: Non-root prefix match (ignoring '/' and '/dashboard' generic stems)
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.children) {
        const found = item.children.find(
          (c) =>
            c.href &&
            c.href !== '/' &&
            c.href !== '/dashboard' &&
            currentPath.startsWith(c.href)
        );
        if (found) {
          return { activeVal: found.value, openIdx: i };
        }
      }
    }

    return { activeVal: defaultActive, openIdx: defaultOpen };
  };

  const initialPathMatch = findActiveFromPath();

  const [open, setOpen] = useState<Set<number>>(() => {
    const base = toSet(defaultOpen);
    if (typeof initialPathMatch.openIdx === 'number') {
      base.add(initialPathMatch.openIdx);
    }
    return base;
  });

  const [active, setActive] = useState<string>(() => {
    if (initialPathMatch.activeVal) return initialPathMatch.activeVal;
    const first = items.find((it, i) => it.children && toSet(defaultOpen).has(i));
    return first?.children?.[0]?.value ?? '';
  });

  // Re-synchronize when currentPath changes
  useEffect(() => {
    if (currentPath) {
      const match = findActiveFromPath();
      if (match.activeVal) {
        setActive(match.activeVal);
        if (typeof match.openIdx === 'number') {
          setOpen((prev) => new Set([...Array.from(prev), match.openIdx as number]));
        }
      }
    }
  }, [currentPath, items]);

  const navRef = useRef<HTMLElement | null>(null);
  const heads = useRef<(HTMLButtonElement | HTMLAnchorElement | null)[]>([]);
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
      if (!glide) m.style.transition = 'none';
      if (on && el) m.style.top = `${el.offsetTop + (el.offsetHeight - MARK) / 2}px`;
      m.toggleAttribute('data-on', Boolean(on));
      if (!glide) {
        void m.offsetHeight;
        m.style.transition = '';
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

  const styleOverrides: React.CSSProperties = {
    '--bm-w': `${width}px`,
    '--bm-font': `${fontSize}px`,
    '--bm-row': `${rowHeight}px`,
    '--bm-indent': `${indent}px`,
    '--bm-line-w': lineWidth,
    '--bm-draw': `${drawDuration}ms`,
    '--bm-fold': `${foldDuration}ms`,
    '--bm-ink': color,
    '--bm-accent': accentColor,
    '--bm-line': lineColor,
    '--bm-active-bg': `${accentColor}14`, // 8% opacity tint of accent
  } as React.CSSProperties;

  return (
    <nav
      ref={navRef}
      className={`branched-menu${className ? ` ${className}` : ''}`}
      style={styleOverrides}
    >
      <span ref={markerRef} className="branched-menu__marker" aria-hidden="true" />
      {items.map((item, i) => {
        const kids = item.children;
        const isOpen = kids ? open.has(i) : false;
        const leafValue = item.value ?? item.label;
        const leafActive =
          !kids && (leafValue === active || (item.href && currentPath === item.href));
        const bodyH = kids ? PAD * 2 + kids.length * rowHeight : 0;

        return (
          <div
            key={item.value ?? item.label}
            className="branched-menu__section"
            data-open={isOpen ? '' : undefined}
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
                <span className="branched-menu__head-title">
                  {item.icon && <span className="opacity-80">{renderIcon(item.icon)}</span>}
                  <span>{item.label}</span>
                </span>
                <div className="flex items-center gap-1.5">
                  {item.badge !== undefined && (
                    <span className="branched-menu__badge">{item.badge}</span>
                  )}
                  <span className="branched-menu__head-chevron">
                    <ChevronDown className="w-3.5 h-3.5" />
                  </span>
                </div>
              </button>
            ) : item.href ? (
              <Link
                ref={(el) => {
                  heads.current[i] = el;
                }}
                href={item.href}
                className="branched-menu__head"
                aria-current={leafActive ? 'true' : undefined}
                data-active={leafActive ? '' : undefined}
                onClick={() => select(leafValue, item)}
              >
                <span className="branched-menu__head-title">
                  {item.icon && <span className="opacity-80">{renderIcon(item.icon)}</span>}
                  <span>{item.label}</span>
                </span>
                {item.badge !== undefined && (
                  <span className="branched-menu__badge">{item.badge}</span>
                )}
              </Link>
            ) : (
              <button
                ref={(el) => {
                  heads.current[i] = el;
                }}
                type="button"
                className="branched-menu__head"
                aria-current={leafActive ? 'true' : undefined}
                data-active={leafActive ? '' : undefined}
                onClick={() => select(leafValue, item)}
              >
                <span className="branched-menu__head-title">
                  {item.icon && <span className="opacity-80">{renderIcon(item.icon)}</span>}
                  <span>{item.label}</span>
                </span>
                {item.badge !== undefined && (
                  <span className="branched-menu__badge">{item.badge}</span>
                )}
              </button>
            )}

            {kids ? (
              <div className="branched-menu__body">
                <div className="branched-menu__fold">
                  <div className="branched-menu__tree" style={{ height: bodyH, padding: `${PAD}px 0` }}>
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
                      {kids.map((kid, k) => {
                        const isKidActive =
                          kid.value === active ||
                          (kid.href && kid.href === currentPath);
                        return (
                          <path
                            key={kid.value}
                            className="branched-menu__reach"
                            d={reach(k)}
                            style={{
                              strokeDasharray: length(k),
                              strokeDashoffset: isKidActive ? 0 : length(k),
                            }}
                          />
                        );
                      })}
                    </svg>

                    {kids.map((kid) => {
                      const isKidActive =
                        kid.value === active ||
                        (kid.href && kid.href === currentPath);

                      return kid.href ? (
                        <Link
                          key={kid.value}
                          href={kid.href}
                          className="branched-menu__item"
                          aria-current={isKidActive ? 'true' : undefined}
                          data-active={isKidActive ? '' : undefined}
                          tabIndex={isOpen ? 0 : -1}
                          onClick={() => select(kid.value, kid)}
                        >
                          <div className="flex items-center gap-2.5 overflow-hidden">
                            {kid.icon ? (
                              <span
                                className="branched-menu__icon"
                                aria-hidden="true"
                              >
                                {renderIcon(kid.icon)}
                              </span>
                            ) : null}
                            <span className="branched-menu__label">
                              {kid.label}
                            </span>
                          </div>
                          {kid.badge !== undefined && (
                            <span className="branched-menu__badge shrink-0">
                              {kid.badge}
                            </span>
                          )}
                        </Link>
                      ) : (
                        <button
                          key={kid.value}
                          type="button"
                          className="branched-menu__item"
                          aria-current={isKidActive ? 'true' : undefined}
                          data-active={isKidActive ? '' : undefined}
                          tabIndex={isOpen ? 0 : -1}
                          onClick={() => select(kid.value, kid)}
                        >
                          <div className="flex items-center gap-2.5 overflow-hidden">
                            {kid.icon ? (
                              <span
                                className="branched-menu__icon"
                                aria-hidden="true"
                              >
                                {renderIcon(kid.icon)}
                              </span>
                            ) : null}
                            <span className="branched-menu__label">
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
