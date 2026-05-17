# CLAUDE.md — AI Store

## Commands
```bash
npm run dev        # dev server (Next.js)
npm run build      # production build
npm run lint       # ESLint (next config)
```

## Stack
Next.js 16 App Router · React 19 · TypeScript · Tailwind CSS v4 · Zustand + Immer · Radix UI · `next/font/google`
React Compiler enabled (`reactCompiler: true` in `next.config.ts`).

## Directory structure
```
src/
  app/          — Next.js App Router (page.tsx, layout.tsx, globals.css)
  components/
    landing/    — page sections (hero, catalog, cart-drawer, product-detail-modal, …)
    ui/         — generic Radix-backed components (button, dialog, input, …)
  data/         — hardcoded mock data (products.ts, payment-methods.ts)
  store/        — Zustand stores (cart-store.ts, auth-store.ts, ui-store.ts)
  types/        — shared TypeScript types (product.ts)
  lib/utils.ts  — cn() helper (clsx + tailwind-merge)
```

## Utilities
`cn(...classes)` from `@/lib/utils` — use for all conditional className merging.

## Tailwind v4 — CSS variable syntax
Use `bg-(--accent)` / `text-(--accent)` — NOT `bg-[var(--accent)]`. IDE will warn on the old form.
Arbitrary values: `text-[10px]`, `tracking-[0.15em]` are fine; CSS-variable shorthand uses the `(--var)` form.

## Radix UI
Dialogs and drawers use `@radix-ui/react-dialog` as `DialogPrimitive.*` directly — NOT the wrapped `Dialog` component (which adds `rounded-2xl`). This preserves the zero-border-radius design constraint.

## External images
`next/image` remotePatterns: `picsum.photos`, `upload.wikimedia.org`, `toko-homeai.pro`. For any other external image host use plain `<img>` with `{/* eslint-disable-next-line @next/next/no-img-element */}`.

## AOS (Animate On Scroll)
Initialised in `src/components/aos-init.tsx` — a `"use client"` component that imports `aos/dist/aos.css` and calls `AOS.init()` in `useEffect`. Mounted in `layout.tsx` inside `<ThemeProvider>`.
Apply `data-aos="fade-up"` and `data-aos-delay={n}` attributes directly on elements.

## Zustand + Immer
State is mutated directly inside `set()` callbacks — no `return { ...state }` spread needed.
Cart store uses `view: "cart" | "checkout" | "invoice"` (enum, not booleans) for drawer navigation.

## Design system (BMW M)
Defined in `DESIGN.md`. Key rules: zero border radius, uppercase condensed headings (`font-condensed`), `border-foreground` buttons that invert on hover, AI brand stripe (`.ai-stripe` CSS class).

## Git
Do not commit/push unless explicitly asked.

## Dev server
Do not run or monitor the dev server mid-task unless explicitly asked.
