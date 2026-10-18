export type PaletteId = 'warm' | 'sage' | 'crimson' | 'linen' | 'nordic' | 'clay';
export type FontStyleId = 'sans' | 'serif' | 'tech';

export interface FontConfig {
  id: FontStyleId;
  name: string;
  badge: string;
  fontFamily: string;
  displayClass: string;
}

export const fontStyles: Record<FontStyleId, FontConfig> = {
  serif: {
    id: 'serif',
    name: 'Editorial Serif',
    badge: 'Fraunces',
    fontFamily: "'Fraunces', Georgia, serif",
    displayClass: "font-['Fraunces']",
  },
  sans: {
    id: 'sans',
    name: 'Modern Grotesque',
    badge: 'Plus Jakarta Sans',
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    displayClass: "font-['Plus_Jakarta_Sans']",
  },
  tech: {
    id: 'tech',
    name: 'Computational Tech',
    badge: 'Space Grotesk',
    fontFamily: "'Space Grotesk', monospace, sans-serif",
    displayClass: "font-['Space_Grotesk']",
  },
};

export interface PaletteConfig {
  id: PaletteId;
  name: string;
  badge: string;
  bgClass: string;
  cardClass: string;
  textPrimary: string;
  textMuted: string;
  accent: string;
  accentHover: string;
  accentLight: string;
  accentBorder: string;
  masteryColor: string;
  threeParticlePrimary: number;
  threeParticleSecondary: number;
  threeLineColor: number;
}

export const palettes: Record<PaletteId, PaletteConfig> = {
  // --- Smooth & Gentle to the Eye (Calming / Low-Strain) ---
  linen: {
    id: 'linen',
    name: 'Muted Cashmere',
    badge: 'Soft Sand & Muted Caramel (Calming)',
    bgClass: 'bg-[#FBF9F5]',
    cardClass: 'bg-white/95 border-amber-950/10 shadow-sm',
    textPrimary: '#2B241F',
    textMuted: '#6E6259',
    accent: '#8C5835', // Understated, gentle caramel copper (zero harshness)
    accentHover: '#734629',
    accentLight: 'rgba(140, 88, 53, 0.08)',
    accentBorder: 'rgba(140, 88, 53, 0.22)',
    masteryColor: '#4A7C59',
    threeParticlePrimary: 0x8c5835,
    threeParticleSecondary: 0x6e6259,
    threeLineColor: 0xe5ddd4,
  },
  nordic: {
    id: 'nordic',
    name: 'Nordic Eucalyptus',
    badge: 'Soft Sage Mist (Gentle on Eyes)',
    bgClass: 'bg-[#F4F7F5]',
    cardClass: 'bg-white/95 border-slate-900/10 shadow-sm',
    textPrimary: '#1E2C26',
    textMuted: '#52665E',
    accent: '#3B7360', // Soft desaturated eucalyptus green
    accentHover: '#2E5A4B',
    accentLight: 'rgba(59, 115, 96, 0.08)',
    accentBorder: 'rgba(59, 115, 96, 0.22)',
    masteryColor: '#3B7360',
    threeParticlePrimary: 0x3b7360,
    threeParticleSecondary: 0x1e2c26,
    threeLineColor: 0xc8dad3,
  },
  clay: {
    id: 'clay',
    name: 'Quiet Terracotta',
    badge: 'Warm Muted Clay & Oatmeal',
    bgClass: 'bg-[#F9F7F5]',
    cardClass: 'bg-white/95 border-stone-900/10 shadow-sm',
    textPrimary: '#2A2422',
    textMuted: '#685D5A',
    accent: '#8A5852', // Soft, muted rose-terracotta
    accentHover: '#6E4540',
    accentLight: 'rgba(138, 88, 82, 0.08)',
    accentBorder: 'rgba(138, 88, 82, 0.22)',
    masteryColor: '#52796F',
    threeParticlePrimary: 0x8a5852,
    threeParticleSecondary: 0x2a2422,
    threeLineColor: 0xe2d6d3,
  },

  // --- Classic Collegiate Themes ---
  warm: {
    id: 'warm',
    name: 'Oxford Ochre',
    badge: 'Warm Scholarly Parchment',
    bgClass: 'bg-[#FDFBF7]',
    cardClass: 'bg-white/95 border-amber-900/10 shadow-sm',
    textPrimary: '#1E1610',
    textMuted: '#6B5E55',
    accent: '#B45309',
    accentHover: '#92400E',
    accentLight: 'rgba(180, 83, 9, 0.08)',
    accentBorder: 'rgba(180, 83, 9, 0.25)',
    masteryColor: '#059669',
    threeParticlePrimary: 0xb45309,
    threeParticleSecondary: 0x6b5e55,
    threeLineColor: 0xfde68a,
  },
  sage: {
    id: 'sage',
    name: 'Cambridge Sage',
    badge: 'Collegiate Botanical Ivy',
    bgClass: 'bg-[#F6FAF7]',
    cardClass: 'bg-white/95 border-emerald-950/10 shadow-sm',
    textPrimary: '#0C2619',
    textMuted: '#3D5E4E',
    accent: '#15803D',
    accentHover: '#166534',
    accentLight: 'rgba(21, 128, 61, 0.08)',
    accentBorder: 'rgba(21, 128, 61, 0.25)',
    masteryColor: '#10B981',
    threeParticlePrimary: 0x15803d,
    threeParticleSecondary: 0x0c2619,
    threeLineColor: 0xbbf7d0,
  },
  crimson: {
    id: 'crimson',
    name: 'Harvard Crimson',
    badge: 'Classic Academic Bordeaux',
    bgClass: 'bg-[#FAF6F6]',
    cardClass: 'bg-white/95 border-rose-950/10 shadow-sm',
    textPrimary: '#261217',
    textMuted: '#66474F',
    accent: '#991B1B',
    accentHover: '#7F1D1D',
    accentLight: 'rgba(153, 27, 27, 0.08)',
    accentBorder: 'rgba(153, 27, 27, 0.25)',
    masteryColor: '#BE123C',
    threeParticlePrimary: 0x991b1b,
    threeParticleSecondary: 0x261217,
    threeLineColor: 0xfecdd3,
  },
};
