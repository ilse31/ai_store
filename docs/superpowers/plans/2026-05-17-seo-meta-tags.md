# SEO & Meta Tags Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement full SEO metadata, Open Graph, Twitter Card, robots.txt, sitemap.xml, and JSON-LD structured data for the AI Store Next.js 16 App Router project.

**Architecture:** Use Next.js 16 built-in Metadata API (zero extra dependencies). OG image is generated dynamically via `ImageResponse` (Edge runtime). `robots.ts` and `sitemap.ts` are App Router route conventions that auto-generate the corresponding files at `/robots.txt` and `/sitemap.xml`.

**Tech Stack:** Next.js 16 App Router · TypeScript · `next/og` (ImageResponse) · Schema.org JSON-LD

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Modify | `src/app/layout.tsx` | Expand `metadata` export + add JSON-LD `<script>` |
| Create | `src/app/opengraph-image.tsx` | Dynamic OG image (1200×630) via ImageResponse |
| Create | `src/app/robots.ts` | Auto-generate `/robots.txt` |
| Create | `src/app/sitemap.ts` | Auto-generate `/sitemap.xml` |

---

## Shared Constant

The base URL is used across all tasks. Defined once in `layout.tsx` and repeated in each new file (they are isolated App Router conventions).

```
BASE_URL = "https://ai-store.vercel.app"
```

> **Note for production:** Replace this value in all 4 files once the real domain is confirmed.

---

### Task 1: Expand metadata in layout.tsx (core + OG + Twitter Card)

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Replace the current `metadata` export with the full version**

Open `src/app/layout.tsx`. Replace the existing:

```typescript
export const metadata: Metadata = {
  title: "AI Store — Premium AI Tools Terpercaya",
  description:
    "Belanja produk digital AI terbaik. ChatGPT, Claude, Midjourney, dan lainnya. Proses cepat, support ramah.",
};
```

With:

```typescript
const BASE_URL = "https://ai-store.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "AI Store — Premium AI Tools Terpercaya",
    template: "%s | AI Store",
  },
  description:
    "Belanja produk digital AI terbaik. ChatGPT, Claude, Midjourney, dan lainnya. Proses cepat, support ramah.",
  keywords: [
    "AI tools",
    "ChatGPT",
    "Claude AI",
    "Midjourney",
    "produk digital",
    "langganan AI",
    "AI Store Indonesia",
  ],
  authors: [{ name: "AI Store" }],
  creator: "AI Store",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: BASE_URL,
    siteName: "AI Store",
    title: "AI Store — Premium AI Tools Terpercaya",
    description:
      "Belanja produk digital AI terbaik. ChatGPT, Claude, Midjourney, dan lainnya. Proses cepat, support ramah.",
    // OG image is auto-resolved from src/app/opengraph-image.tsx
    // To use a static image instead: add images: [{ url: "/og-image.png", width: 1200, height: 630 }]
    // and place the file in public/og-image.png
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Store — Premium AI Tools Terpercaya",
    description:
      "Belanja produk digital AI terbaik. ChatGPT, Claude, Midjourney, dan lainnya. Proses cepat, support ramah.",
    // Twitter image is auto-resolved from src/app/opengraph-image.tsx (same image)
    // To use a static image: add images: ["/og-image.png"]
  },
};
```

- [ ] **Step 2: Verify no TypeScript errors**

Run:
```bash
npx tsc --noEmit
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat(seo): expand metadata with OG, Twitter Card, and metadataBase"
```

---

### Task 2: Add JSON-LD structured data to layout.tsx

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Add the JSON-LD constant above the `RootLayout` function**

In `src/app/layout.tsx`, add this block after the `metadata` export and before `export default function RootLayout`:

```typescript
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "AI Store",
      description: "Premium AI Tools Terpercaya",
      inLanguage: "id",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${BASE_URL}/?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "AI Store",
      url: BASE_URL,
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+6289530571642",
        contactType: "customer service",
        availableLanguage: "Indonesian",
      },
    },
  ],
};
```

- [ ] **Step 2: Inject the JSON-LD script into `<head>`**

Inside `RootLayout`, add a `<script>` tag inside the existing `<head>` block, after the anti-FOUC script:

```tsx
<head>
  {/* Anti-FOUC: apply dark class before first paint */}
  <script
    dangerouslySetInnerHTML={{
      __html: `(function(){try{var t=localStorage.getItem('theme');var dark=t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches);if(dark)document.documentElement.classList.add('dark')}catch(e){}})()`,
    }}
  />
  {/* JSON-LD structured data */}
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
  />
</head>
```

- [ ] **Step 3: Verify in browser**

Run `npm run dev`, open `http://localhost:3000`, view page source, and confirm you see:
```html
<script type="application/ld+json">{"@context":"https://schema.org","@graph":[...]}
```

- [ ] **Step 4: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat(seo): add JSON-LD structured data (WebSite + Organization schema)"
```

---

### Task 3: Dynamic OG image via ImageResponse

**Files:**
- Create: `src/app/opengraph-image.tsx`

> **How it works:** Next.js App Router automatically serves this file as `/opengraph-image` and references it in the generated `<meta property="og:image">` and `<meta name="twitter:image">` tags. No manual wiring needed.

- [ ] **Step 1: Create the file**

Create `src/app/opengraph-image.tsx` with this content:

```tsx
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "AI Store — Premium AI Tools Terpercaya";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          padding: "60px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Brand accent stripe — mirrors .ai-stripe CSS */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background:
              "linear-gradient(90deg, #ef4444 0%, #f97316 50%, #3b82f6 100%)",
          }}
        />

        {/* Category label */}
        <p
          style={{
            color: "#ef4444",
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          Premium AI Tools
        </p>

        {/* Brand name */}
        <h1
          style={{
            color: "#ffffff",
            fontSize: 96,
            fontWeight: 700,
            lineHeight: 1.0,
            margin: "16px 0 24px",
            textTransform: "uppercase",
            letterSpacing: "-0.02em",
          }}
        >
          AI STORE
        </h1>

        {/* Tagline */}
        <p
          style={{
            color: "#a1a1aa",
            fontSize: 26,
            fontWeight: 300,
            margin: 0,
          }}
        >
          ChatGPT · Claude · Midjourney · dan lainnya
        </p>

        {/* URL */}
        <p
          style={{
            color: "#52525b",
            fontSize: 16,
            margin: "28px 0 0",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          ai-store.vercel.app
        </p>
      </div>
    ),
    { ...size },
  );
}
```

> **To use a static PNG instead (optional):**
> Place a `1200×630` file at `public/og-image.png`, then remove this file and add
> `images: [{ url: "/og-image.png", width: 1200, height: 630 }]` to both
> the `openGraph` and `twitter` sections in `layout.tsx`.

- [ ] **Step 2: Verify OG image renders**

Run `npm run dev`, then open:
```
http://localhost:3000/opengraph-image
```
Expected: a dark-background image (1200×630) with "AI STORE" branding is displayed.

- [ ] **Step 3: Commit**

```bash
git add src/app/opengraph-image.tsx
git commit -m "feat(seo): add dynamic OG image via Next.js ImageResponse"
```

---

### Task 4: robots.ts

**Files:**
- Create: `src/app/robots.ts`

- [ ] **Step 1: Create the file**

Create `src/app/robots.ts`:

```typescript
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://ai-store.vercel.app/sitemap.xml",
  };
}
```

- [ ] **Step 2: Verify output**

Run `npm run dev`, then open:
```
http://localhost:3000/robots.txt
```
Expected output:
```
User-Agent: *
Allow: /

Sitemap: https://ai-store.vercel.app/sitemap.xml
```

- [ ] **Step 3: Commit**

```bash
git add src/app/robots.ts
git commit -m "feat(seo): add robots.txt via App Router convention"
```

---

### Task 5: sitemap.ts

**Files:**
- Create: `src/app/sitemap.ts`

- [ ] **Step 1: Create the file**

Create `src/app/sitemap.ts`:

```typescript
import type { MetadataRoute } from "next";

const BASE_URL = "https://ai-store.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
```

> **When adding new pages later:** Add an entry per route, e.g.:
> ```typescript
> { url: `${BASE_URL}/products`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 }
> ```

- [ ] **Step 2: Verify output**

Run `npm run dev`, then open:
```
http://localhost:3000/sitemap.xml
```
Expected: valid XML with one `<url>` entry for `https://ai-store.vercel.app`.

- [ ] **Step 3: Full verification — check all meta tags in browser**

Open `http://localhost:3000` in browser. Open DevTools → Elements → `<head>`. Confirm presence of:
- `<meta property="og:title" ...>`
- `<meta property="og:image" ...>`
- `<meta name="twitter:card" content="summary_large_image">`
- `<link rel="canonical" ...>` (auto-added by Next.js when `metadataBase` is set)
- `<script type="application/ld+json">` with WebSite + Organization schema

- [ ] **Step 4: Commit**

```bash
git add src/app/sitemap.ts
git commit -m "feat(seo): add sitemap.xml via App Router convention"
```
