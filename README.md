# Learnova Frontend Monorepo

Welcome to the **Learnova** frontend monorepo, powered by **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**.

---

## 🏛 Monorepo Architecture

```
Learnova frontend design/
├── .agents/
│   └── skills/
│       ├── ui-ux-pro-max/          # UI/UX design intelligence & search catalogs
│       ├── frontend-expert/        # Modern React/TS architecture guidelines
│       ├── brand/                  # Brand style rules & guidelines
│       ├── design-system/          # Token architectures & component specs
│       └── ui-styling/             # Tailwind & Radix UI styling patterns
├── frontend/
│   ├── package.json                # Monorepo workspaces config
│   ├── turbo.json                  # Turborepo task pipeline
│   ├── apps/
│   │   ├── students/               # Port 3000: Student Learning Portal
│   │   ├── teacher/                # Port 3001: Instructor Studio & Grading
│   │   └── admin/                  # Port 3002: Platform Governance & Admin
│   └── packages/
│       ├── ui/                     # @learnova/ui - Shared UI component library
│       ├── types/                  # @learnova/types - Shared domain data models
│       └── config/                 # @learnova/config - Shared TS & Tailwind configs
```

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Run Applications in Development Mode

Run all applications concurrently:
```bash
npm run dev
```

Or run any application individually:
```bash
# Student Portal (http://localhost:3000)
npm run dev:students

# Teacher Studio (http://localhost:3001)
npm run dev:teacher

# Admin Center (http://localhost:3002)
npm run dev:admin
```

---

## 📦 Shared Packages

- **`@learnova/ui`**: High-performance UI components (`Button`, `Card`, `Badge`, `Input`, `Avatar`, `Progress`, `StatCard`, `AppHeader`, `Sidebar`, `BranchedMenu`).
- **`@learnova/types`**: Unified TypeScript types for `User`, `Role`, `Course`, `Lesson`, `Assignment`, `Submission`, and `PlatformStat`.
- **`@learnova/config`**: Reusable `tsconfig.base.json` and `tailwind.base.js`.
