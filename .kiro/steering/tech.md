# Tech Stack

## Framework & Runtime

- **Next.js 16.1.6** (App Router) - React framework with server-side rendering
- **React 19.2.3** - UI library
- **TypeScript 5** - Type-safe JavaScript
- **Node.js 20+** - Runtime environment

## UI & Styling

- **Tailwind CSS 4** - Utility-first CSS framework
- **Shadcn UI** - Component library built on Radix UI
- **Radix UI** - Unstyled, accessible component primitives
- **Lucide React** - Icon library
- **AOS (Animate On Scroll)** - Scroll animations

## State Management

- **Zustand 5** - Lightweight state management
- **Immer** - Immutable state updates (middleware for Zustand)

## Forms & Validation

- **React Hook Form 7** - Form state management
- **Zod 4** - Schema validation
- **@hookform/resolvers** - Validation resolver for React Hook Form

## HTTP & API

- **Axios 1.13.5** - HTTP client
- **React Hot Toast** - Toast notifications

## Build Tools

- **Bun** - Fast JavaScript runtime and package manager (lock file present)
- **ESLint 9** - Code linting
- **PostCSS** - CSS processing

## Common Commands

```bash
# Development
npm run dev          # Start development server on http://localhost:3000
bun dev             # Alternative using Bun

# Production
npm run build       # Build for production
npm run start       # Start production server

# Code Quality
npm run lint        # Run ESLint
```

## TypeScript Configuration

- **Target**: ES2017
- **Module Resolution**: Bundler (Next.js optimized)
- **Path Aliases**: `@/*` maps to `./src/*`
- **Strict Mode**: Enabled
- **JSX**: react-jsx (React 19 automatic runtime)

## Key Dependencies Notes

- Uses **React 19** with the new JSX transform (no need to import React in components)
- **Babel React Compiler** plugin enabled for automatic optimization
- **Next.js Image** component for optimized image loading
- **nuqs** recommended for URL search parameter state management (per RULES.md)
