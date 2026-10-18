'use client';

import React from 'react';
import { Palette, Type } from 'lucide-react';
import { PaletteId, palettes, FontStyleId, fontStyles } from '../types/theme';

interface PaletteSwitcherProps {
  currentPalette: PaletteId;
  onSelectPalette: (id: PaletteId) => void;
  currentFont: FontStyleId;
  onSelectFont: (id: FontStyleId) => void;
}

export const PaletteSwitcher: React.FC<PaletteSwitcherProps> = ({
  currentPalette,
  onSelectPalette,
  currentFont,
  onSelectFont,
}) => {
  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-[96vw] overflow-x-auto flex items-center gap-2 p-2 bg-white/95 backdrop-blur-xl rounded-2xl border border-slate-200/90 shadow-float">
      {/* 1. Theme Palette Selector */}
      <div className="flex items-center gap-1.5 px-2 py-1 text-xs font-semibold text-ink-muted border-r border-slate-200/70 shrink-0">
        <Palette className="w-3.5 h-3.5 text-ink" />
        <span className="hidden sm:inline">Theme:</span>
      </div>

      <div className="flex items-center gap-1 shrink-0">
        {(Object.keys(palettes) as PaletteId[]).map((id) => {
          const item = palettes[id];
          const isSelected = currentPalette === id;

          return (
            <button
              key={id}
              onClick={() => onSelectPalette(id)}
              className={`relative px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                isSelected
                  ? 'text-white shadow-sm scale-[1.02]'
                  : 'text-ink-muted hover:text-ink hover:bg-slate-100/70'
              }`}
              style={{
                backgroundColor: isSelected ? item.accent : 'transparent',
              }}
              title={item.badge}
            >
              <span
                className="w-2.5 h-2.5 rounded-full border border-white/60 shrink-0"
                style={{ backgroundColor: item.accent }}
              />
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">{item.name.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>

      <div className="h-4 w-px bg-slate-200/80 mx-1 hidden sm:block shrink-0" />

      {/* 2. Font Style Selector */}
      <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 text-xs font-semibold text-ink-muted border-r border-slate-200/70 shrink-0">
        <Type className="w-3.5 h-3.5 text-ink" />
        <span>Font:</span>
      </div>

      <div className="hidden sm:flex items-center gap-1 shrink-0">
        {(Object.keys(fontStyles) as FontStyleId[]).map((id) => {
          const item = fontStyles[id];
          const isSelected = currentFont === id;

          return (
            <button
              key={id}
              onClick={() => onSelectFont(id)}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                isSelected
                  ? 'bg-ink text-white shadow-sm'
                  : 'text-ink-muted hover:text-ink hover:bg-slate-100/70'
              }`}
            >
              {item.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};
