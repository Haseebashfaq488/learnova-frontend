---
name: Learnova System
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#43474e'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#74777f'
  outline-variant: '#c4c6d0'
  surface-tint: '#455f8a'
  primary: '#001634'
  on-primary: '#ffffff'
  primary-container: '#0b2b53'
  on-primary-container: '#7993c1'
  inverse-primary: '#adc7f8'
  secondary: '#00658d'
  on-secondary: '#ffffff'
  secondary-container: '#3dbeff'
  on-secondary-container: '#004a69'
  tertiary: '#001c09'
  on-tertiary: '#ffffff'
  tertiary-container: '#003316'
  on-tertiary-container: '#00a858'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d6e3ff'
  primary-fixed-dim: '#adc7f8'
  on-primary-fixed: '#001b3d'
  on-primary-fixed-variant: '#2c4770'
  secondary-fixed: '#c6e7ff'
  secondary-fixed-dim: '#83cfff'
  on-secondary-fixed: '#001e2d'
  on-secondary-fixed-variant: '#004c6b'
  tertiary-fixed: '#6bfe9c'
  tertiary-fixed-dim: '#4ae183'
  on-tertiary-fixed: '#00210c'
  on-tertiary-fixed-variant: '#005228'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 3rem
    fontWeight: '700'
    lineHeight: 3.5rem
    letterSpacing: -0.03em
  headline-lg:
    fontFamily: Inter
    fontSize: 2rem
    fontWeight: '600'
    lineHeight: 2.5rem
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 1.5rem
    fontWeight: '600'
    lineHeight: 2rem
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Inter
    fontSize: 1.5rem
    fontWeight: '600'
    lineHeight: 2rem
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Inter
    fontSize: 1.25rem
    fontWeight: '600'
    lineHeight: 1.75rem
    letterSpacing: -0.01em
  title-md:
    fontFamily: Inter
    fontSize: 1.125rem
    fontWeight: '500'
    lineHeight: 1.625rem
    letterSpacing: -0.005em
  body-lg:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: 1.6rem
    letterSpacing: 0em
  body-md:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: 1.45rem
    letterSpacing: 0em
  label-md:
    fontFamily: Inter
    fontSize: 0.8125rem
    fontWeight: '500'
    lineHeight: 1.2rem
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: '600'
    lineHeight: 1rem
    letterSpacing: 0.04em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system delivers an ultra-minimalist, distraction-free environment engineered for rigorous academic workflows and focused digital learning. Stripping away decorative visual noise, it relies on structured whitespace, deliberate typography, and high-clarity data communication to serve both institutional educators and self-directed students.

### Aesthetic Paradigm: Ultra-Minimal Editorial
The aesthetic fuses corporate precision with modern digital ergonomics:
- **Distraction-Free Surfaces:** Interface chrome recedes into soft neutral backdrops, directing complete cognitive focus toward instructional content and performance metrics.
- **Utilitarian Discipline:** Every accent color corresponds directly to operational meaning—progression, completion, mastery, or intervention.
- **Target Audience:** K-12 and higher-ed educators requiring dense, rapid data synthesis alongside learners who require structured, approachable visual pathways.

## Colors

The system uses a strict semantic color hierarchy. Structural text, headers, and navigation anchors depend on deep navy, while interactive actions and statuses follow non-overlapping functional assignments.

### Functional Color Palette
- **Deep Navy Blue (`#0B2B53`):** Primary brand authority. Used for prominent typography, primary dark surfaces, high-contrast headings, and the persistent instructor sidebar navigation.
- **Bright Cyan (`#00A8E8`):** Focused action driver. Restricted strictly to primary interactive targets, main call-to-action buttons, active navigation indicators, and keyboard focus rings.
- **Vibrant Green (`#2ECC71`):** Mastery & Success. Applied to mastered competencies, streak counters, verified badges, and positive evaluation feedback.
- **Warning Amber (`#F59E0B`):** In-Progress state. Denotes pending assignments, active learning modules, and partially completed milestones.
- **Alert Coral (`#EF4444`):** Remediation & Urgent notices. Identifies missing work, students needing intervention, and error boundaries.
- **Surface Canvas (`#F8FAFC`):** Low-strain, distraction-free neutral ground for global page layouts.
- **Card Surface (`#FFFFFF`):** High-clarity foreground surface container housing interactive modules, tables, and assessments.
- **Subtle Slate Border (`#E2E8F0`):** Precise low-contrast structure defining container perimeters.

## Typography

Inter serves as the sole typographic family across all responsive breakpoints. To preserve a clinical, distraction-free environment, visual hierarchy is achieved strictly through weight differentiation (Medium 500, Semi-Bold 600, Bold 700) and strict proportional sizing.

### Hierarchy & Typesetting Guidelines
- **Page Titles & Metrics (`display-lg`, `headline-lg`):** Reserved for primary module dashboards, course overview headers, and single-metric statistical highlights. Always set in `#0B2B53`.
- **Instructional Body Text (`body-lg`, `body-md`):** Uses an expanded line-height ratio (`1.6` on desktop) for long-form lesson modules and rubric explanations to ensure optimal sustained reading.
- **Interface Labels & Micro-Copy (`label-md`, `label-sm`):** Set with a slightly elevated tracking (`+0.01em` to `+0.04em`) and medium/semi-bold weights for badges, table column titles, and progress annotations.

## Layout & Spacing

The layout relies on a structured, fluid grid paired with fixed boundary constraints to ensure optimal reading widths for learning content while maximizing dashboard data density.

### Grid & Breakpoints
- **Desktop (1024px+):** 12-column responsive grid with `1.5rem` gutters and dynamic auto-centering capped at a max-width of `1440px`. Margin: `2rem`.
- **Tablet (768px - 1023px):** 8-column layout with `1.25rem` gutters and collapsible sidebar configurations.
- **Mobile (< 768px):** 4-column layout with `1rem` gutters and `1rem` side margins. Multi-column metric groups fold to single stacked cards.

### Architectural Shells
- **Instructor Dashboard (Dual Shell):** Fixed left navigation rail (width `260px`, background `#0B2B53`) paired with a fluid, multi-column workspace on `#F8FAFC`.
- **Student Learning Hub (Top-Down Shell):** Horizontal sticky top navigation (height `64px`, border-bottom `1px solid #E2E8F0`) with a centered single-column or 2/3 + 1/3 split learning layout.

## Elevation & Depth

This design system uses a strictly flat, low-contrast border methodology. Depth is created through surface contrast and structural borders rather than heavy drop shadows, reinforcing the distraction-free aesthetic.

### Depth System Rules
- **Base Canvas:** `#F8FAFC` provides the zero-elevation floor for the entire viewport.
- **Cards and Panels:** Set to pure `#FFFFFF` with a crisp `1px solid #E2E8F0` hairline boundary. 
- **Ambient Elevation (Rest):** Elements carry no harsh shadows; an ultra-soft, diffused ambient shadow (`0 1px 3px rgba(11, 43, 83, 0.04)`) separates floating content from base canvasing without drawing visual attention.
- **Hover & Interaction States:** Surface borders transition smoothly from `#E2E8F0` to `#CBD5E1`, with elevation adjusting to `0 4px 12px rgba(11, 43, 83, 0.06)`.
- **Modals & Focus Dialogs:** Maximum elevation layer. Overlaid on `#0B2B53` at `40%` opacity backdrop blur (`4px`), using a single focused shadow: `0 12px 32px rgba(11, 43, 83, 0.12)`.

## Shapes

The design system maintains a refined, architectural sharpness using Soft (`roundedness: 1`) curvature:
- **Base Components (Inputs, Small Badges, Buttons):** `0.25rem` (`4px`) border radius. This produces precise, clean data points and prevents the playful informality of higher radii.
- **Surface Containers & Cards:** `0.5rem` (`8px`) border radius (`rounded-lg`), providing soft, structured corners for assignment cards, course module blocks, and data tables.
- **Modals & Focus Cards:** `0.75rem` (`12px`) border radius (`rounded-xl`), creating clear focal distinction during focused auth flows and assessment modes.
- **Mastery Dots & Avatars:** Fully circular (`50%` / `pill-full`) strictly for status markers, user identity nodes, and progression step dots.

## Components

### Buttons
- **Primary CTA:** Background `#00A8E8`, text `#FFFFFF`, font-weight `600`, radius `0.25rem`, vertical padding `0.625rem`, horizontal padding `1.25rem`. Hover state: `#0096D1`. Active state: `#0082B5`.
- **Secondary (Ghost / Outlined):** Background transparent, border `1px solid #E2E8F0`, text `#0B2B53`. Hover state: background `#F1F5F9`, border `#CBD5E1`.
- **Destructive:** Background transparent, text `#EF4444`, border `1px solid #FECACA`. Hover state: background `#FEF2F2`.

### Cards & Content Containers
- **Dashboard Cards:** Background `#FFFFFF`, border `1px solid #E2E8F0`, radius `0.5rem`, padding `1.5rem`.
- **Centered Focus Cards (Auth & Standalone Tasks):** Centered horizontally and vertically within `#F8FAFC`. Width `100%`, max-width `440px`, padding `2.5rem`, border `1px solid #E2E8F0`, ambient shadow `0 4px 16px rgba(11, 43, 83, 0.06)`.

### Mastery Indicators & Progression Tracks
- **Mastery Dots:** `8px` fixed circular indicator. Mastered (`#2ECC71`), In-Progress (`#F59E0B`), Needs Help (`#EF4444`), Unstarted (`#E2E8F0`).
- **Progress Trackers:** Height `6px`, background `#E2E8F0`, radius `3px`. Filled track uses `#2ECC71` for completed tracks and `#00A8E8` for modules currently active.

### Status Badges & Chips
- **Structural Spec:** Height `24px`, padding `0 0.5rem`, radius `0.25rem`, typography `label-sm` uppercase.
- **Success/Mastery:** Text `#15803D`, background `#DCFCE7`, border `1px solid #BBF7D0`.
- **In-Progress:** Text `#B45309`, background `#FEF3C7`, border `1px solid #FDE68A`.
- **Needs Attention:** Text `#B91C1C`, background `#FEE2E2`, border `1px solid #FECACA`.

### Form Controls & Inputs
- **Text Inputs:** Height `40px`, padding `0 0.75rem`, background `#FFFFFF`, border `1px solid #E2E8F0`, radius `0.25rem`, font size `0.875rem`, color `#0B2B53`. Focus: border `#00A8E8`, box-shadow `0 0 0 2px rgba(0, 168, 232, 0.15)`, outline none.
- **Checkboxes & Radios:** `16px` square or circle, border `1.5px solid #CBD5E1`, background `#FFFFFF`. Selected: background `#00A8E8`, border `#00A8E8` with white check or radio dot.

### Navigation Components
- **Teacher Left-Sidebar Rail:** Background `#0B2B53`. Navigation items use text `#94A3B8`, active items feature background `rgba(255, 255, 255, 0.08)`, text `#FFFFFF`, and an active left accent indicator of `3px solid #00A8E8`.
- **Student Top Navigation:** Background `#FFFFFF`, height `64px`, border-bottom `1px solid #E2E8F0`. Tab links use text `#64748B`, active tab text `#0B2B53` with an active bottom highlight border of `2px solid #00A8E8`.