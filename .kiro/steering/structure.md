# Project Structure

## Root Directory

```
ai-store/
├── src/                    # Source code
├── public/                 # Static assets (SVGs, images)
├── docs/                   # Documentation and planning
├── .kiro/                  # Kiro AI assistant configuration
├── .next/                  # Next.js build output (generated)
├── node_modules/           # Dependencies (generated)
└── [config files]          # Root-level configuration
```

## Source Directory (`src/`)

### App Router (`src/app/`)

Next.js 16 App Router structure with file-based routing:

- `layout.tsx` - Root layout with theme provider, fonts, metadata
- `page.tsx` - Homepage (landing page with hero, catalog, cart)
- `globals.css` - Global styles and Tailwind directives
- `favicon.ico` - Site favicon
- `opengraph-image.tsx` - Dynamic OG image generation
- `robots.ts` - Robots.txt configuration
- `sitemap.ts` - Sitemap generation

### Components (`src/components/`)

Organized by feature and UI type:

**Landing Components** (`src/components/landing/`)

- `navbar.tsx` - Top navigation bar
- `hero-section.tsx` - Hero banner with main CTA
- `info-section.tsx` - Information/features section
- `catalog-section.tsx` - Product grid display
- `product-card.tsx` - Individual product card
- `product-detail-modal.tsx` - Product detail dialog
- `cart-drawer.tsx` - Shopping cart sidebar

**UI Components** (`src/components/ui/`)

- Reusable Shadcn UI components (button, card, dialog, input, etc.)
- `theme-toggle.tsx` - Dark/light mode switcher

**Forms** (`src/components/forms/`)

- Form components with validation

**Utilities**

- `aos-init.tsx` - AOS animation initialization
- `theme-provider.tsx` - Next-themes provider wrapper
- `toaster.tsx` - Toast notification container

### State Management (`src/store/`)

Zustand stores with Immer middleware:

- `index.ts` - Store exports
- `cart-store.ts` - Shopping cart state (items, drawer, checkout flow)
- `auth-store.ts` - Authentication state
- `ui-store.ts` - UI state (modals, drawers)

### Data (`src/data/`)

Static data and configuration:

- `products.ts` - Product catalog data
- `payment-methods.ts` - Payment method options
- `admin-number.ts` - WhatsApp admin contact

### Types (`src/types/`)

TypeScript type definitions:

- `index.ts` - General types
- `product.ts` - Product-related interfaces

### Library (`src/lib/`)

Utility functions and configurations:

- `utils.ts` - Helper functions (cn for className merging)
- `axios.ts` - Axios instance configuration

### Hooks (`src/hooks/`)

Custom React hooks:

- `use-api.ts` - API interaction hooks

## File Organization Conventions

### Component Files

Structure within component files (per RULES.md):

1. Exported component (default or named)
2. Subcomponents (if any)
3. Helper functions
4. Static content
5. Type definitions (interfaces)

### Naming Conventions

- **Directories**: lowercase-with-dashes (e.g., `landing/`, `auth-wizard/`)
- **Components**: PascalCase files (e.g., `ProductCard.tsx`)
- **Utilities**: kebab-case (e.g., `use-api.ts`)
- **Exports**: Favor named exports for components

### Import Aliases

Use `@/*` path alias for all imports:

```typescript
import { ProductCard } from "@/components/landing/product-card";
import { useCartStore } from "@/store/cart-store";
import { Product } from "@/types/product";
```

## Configuration Files

- `next.config.ts` - Next.js configuration
- `tsconfig.json` - TypeScript compiler options
- `tailwind.config.ts` - Tailwind CSS configuration (v4)
- `postcss.config.mjs` - PostCSS configuration
- `eslint.config.mjs` - ESLint configuration (flat config)
- `package.json` - Dependencies and scripts

## Documentation (`docs/`)

Project planning and specifications:

- `docs/superpowers/plans/` - Feature planning documents
- `docs/superpowers/specs/` - Technical specifications

## Key Patterns

### Server vs Client Components

- **Default**: Server Components (no 'use client')
- **Client Components**: Only when needed for:
  - Browser APIs (localStorage, window)
  - Event handlers (onClick, onChange)
  - State hooks (useState, useEffect)
  - Zustand stores

### State Management Pattern

- **Global State**: Zustand stores in `src/store/`
- **Form State**: React Hook Form with Zod validation
- **URL State**: Use 'nuqs' for search parameters
- **Server State**: Next.js Server Components (no separate data fetching layer)

### Styling Pattern

- **Tailwind Utility Classes**: Primary styling method
- **Component Variants**: Use `clsx` or `cn` utility for conditional classes
- **Design Tokens**: Follow BMW M design system (see DESIGN.md)
- **Responsive**: Mobile-first breakpoints (sm, md, lg, xl)
