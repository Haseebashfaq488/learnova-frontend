'use client';

import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { PaletteSwitcher } from './PaletteSwitcher';

export const GlobalThemeWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { paletteId, setPaletteId, palette, fontId, setFontId, font } = useTheme();

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-500 ${palette.bgClass}`}
      style={{
        color: palette.textPrimary,
        fontFamily: font.fontFamily,
      }}
    >
      {children}

      {/* Floating Theme & Font Switcher Dock */}
      <PaletteSwitcher
        currentPalette={paletteId}
        onSelectPalette={setPaletteId}
        currentFont={fontId}
        onSelectFont={setFontId}
      />
    </div>
  );
};
