'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { PaletteId, palettes, PaletteConfig, FontStyleId, fontStyles, FontConfig } from '../types/theme';

interface ThemeContextType {
  paletteId: PaletteId;
  palette: PaletteConfig;
  fontId: FontStyleId;
  font: FontConfig;
  setPaletteId: (id: PaletteId) => void;
  setFontId: (id: FontStyleId) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [paletteId, setPaletteId] = useState<PaletteId>('linen');
  const [fontId, setFontId] = useState<FontStyleId>('serif');

  const palette = palettes[paletteId] || palettes.linen;
  const font = fontStyles[fontId] || fontStyles.serif;

  // Apply fonts and dynamic theme variables to CSS root
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      root.style.setProperty('--font-active', font.fontFamily);
      root.style.fontFamily = font.fontFamily;
      document.body.style.fontFamily = font.fontFamily;

      // Dynamic branched menu CSS properties
      root.style.setProperty('--bm-ink', palette.textPrimary);
      root.style.setProperty('--bm-accent', palette.accent);
      root.style.setProperty('--bm-line', palette.accentBorder || '#CBD5E1');
    }
  }, [font, palette]);

  return (
    <ThemeContext.Provider
      value={{
        paletteId,
        palette,
        fontId,
        font,
        setPaletteId,
        setFontId,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
