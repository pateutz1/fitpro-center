# FitPro Center

A marketing website for **FitPro Center**, a premium fitness brand. The site presents membership plans, facility highlights, a photo gallery, and contact options behind a dark, motion-rich UI with bilingual support (English and Romanian).

---

## Overview

- **Framework:** [Next.js](https://nextjs.org/) **15** (Pages Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/) **5**
- **UI:** [React](https://react.dev/) **18** with [Tailwind CSS](https://tailwindcss.com/) **3**
- **Motion:** [Motion](https://motion.dev/) (`motion` v12, formerly Motion One / Framer Motion lineage) — imported as `motion/react`
- **Node:** `>= 18` (see `.nvmrc` if you use a version manager)

The app uses a **dark theme** by default (`dark` class on the root layout), custom **Inter** and **Montserrat** fonts (Google Fonts in `styles/globals.css`), and a green **primary** accent (`#1e9b71`).

---

## Features by area

### Global layout (`pages/_app.tsx`)

- Shared **header** (navigation, mobile menu, language switcher) and **footer**
- Default SEO: title *“FitPro Center - Premium Fitness Experience”*, meta description, viewport, favicon link

### Home (`/` — `pages/index.tsx`)

- Hero with **Motion** entrance variants, **parallax** layers (`useParallax`, `useMultiParallax`), and **scroll progress**
- **Grand opening countdown** with flip-style time display (`components/countdown.tsx`)
- **Stats** with animated **counters**, **tooltips**, **progress rings**, and **typing text**
- **Expandable cards**, **staggered lists**, **magnetic** / **shiny** CTAs, **gym floating dock** UI
- **FAQ** section (data from `data/faqData.ts` via `popularFAQs`)
- Respects **`prefers-reduced-motion`** across animations

### About (`/about` — `pages/about.tsx`)

- Scroll-driven effects (`useScroll`, `useTransform`)
- Visual elements: **HeroGeometric**, **background beams**, **meteors**, **3D cards**, **number ticker**, **typing text**, **magnetic** / **shiny** buttons
- **Values** content with **FAQ** (`generalFAQs`)

### Prices (`/prices` — `pages/prices.tsx`)

- **Silver / Gold / Platinum** membership tiers (`components/plan-card.tsx`)
- **Floating cards**, **testimonials marquee**, **meteors**, hero geometry, **counters**, **FAQ** (`membershipFAQs`)

### Gallery (`/gallery` — `pages/gallery.tsx`)

- Category-based **image grid** (equipment, interior, classes, amenities) using **Next/Image** with **Unsplash** URLs (`next.config.js` `remotePatterns`)
- **Focus cards**, **3D cards**, **lightbox-style modal** (`gallery-modal`), filters and **AnimatePresence** transitions

### Contact (`/contact` — `pages/contact.tsx`)

- **Animated contact form**, **contact cards**, **FAQ** block, **location map** section
- Hero with gradient background and Motion variants

### Motion demo (`/motion-demo` — `pages/motion-demo.tsx`)

- Showcase page for **lazy-loaded** advanced Motion modules: scroll-linked backgrounds and parallax, layout animations (grid, shared layout, tabs, reorderable list), physics demos (springs, gestures, simulations), variant orchestration, draggable/expandable demos, etc.
- Uses `preloadCriticalComponents()` and components from `components/ui/lazy-motion-components.tsx`

---

## Tech stack (summary)

| Layer | Choice |
|--------|--------|
| Runtime | Node.js 18+ |
| Framework | Next.js 15 (Pages Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3 + `tailwindcss-animate` + PostCSS |
| Animation | Motion (`motion` / `motion/react`) |
| Icons | `lucide-react`, `react-icons` |
| UI primitives | `@radix-ui/react-accordion`, `@floating-ui/react` |
| i18n routing | Next.js built-in `i18n` in `next.config.js` (`en`, `ro`) |
| Lint / format | Ultracite + Biome (see `biome.jsonc`) |

---

## Dependencies (high level)

**Production**

- **next**, **react**, **react-dom** — app shell and rendering
- **motion** — animations, gestures, scroll-linked transforms, layout animations
- **next-translate** — present in the project with `i18n.json` and JSON namespaces under `locales/`; routing locales are configured in **Next** and **`hooks/useTranslation.ts`** supplies UI strings at runtime
- **tailwindcss**, **autoprefixer**, **postcss** — styling pipeline
- **clsx**, **tailwind-merge** — conditional class names (`libs/utils.ts` pattern)
- **@floating-ui/react** — positioning for overlays/tooltips
- **@radix-ui/react-accordion** — accessible accordion (e.g. FAQ)
- **lucide-react**, **react-icons** — icon sets

**Development**

- **@biomejs/biome**, **ultracite** — linting and formatting (`npm run lint`, `npm run format`)
- **lint-staged** — optional pre-commit formatting (see `package.json`)

---

## Animations and visual effects

### Motion (`motion/react`)

- Page and section **enter/exit** animations, **stagger**, **whileHover** / **whileTap**
- **Scroll-linked** progress, parallax, and text reveals (`scroll-linked-animations.tsx`)
- **Layout** transitions, **shared element**-style transitions, **reorder** lists (`layout-animations.tsx`)
- **Physics-oriented** demos (`advanced-physics.tsx`, `variants-staggered.tsx`)
- **Lazy dynamic imports** with `ssr: false` for heavy demos (`lazy-motion-components.tsx`)

### Hooks and accessibility

- **`useReducedMotion`** — aligns animations with `prefers-reduced-motion`
- **`useMotionConfig`** + **`createAccessibleVariants`** — shorter or simplified motion when reduced motion is requested
- **`useParallax`** / **`useMultiParallax`** — scroll-based movement (disabled or toned down when appropriate)

### Tailwind-driven CSS animation

Defined in `tailwind.config.js` (plugin **`tailwindcss-animate`**):

- **fade-in**, **slide-up**, **slide-down**
- **gradient**, **shimmer**, **wave**, **glow** keyframes

### UI components (non-exhaustive)

Examples used across pages: **ScrollProgress**, **AnimatedGradientText**, **TypingText**, **Counter** / **NumberTicker**, **ProgressRing**, **Meteors**, **BackgroundBeams**, **OrbitingCircles**, **TestimonialsMarquee**, **FloatingDock** / **GymFloatingDock**, **ShinyButton**, **MagneticButton**, **Card3D**, **ExpandableCard**, **DraggableCard**, **FocusCards**, **Faq** (accordion), **ContactFAQ**, **AnimatedContactForm**, **LocationMap**, **AnimatedBorderTrail**, **PerformanceMonitor** (available but commented out in `_app` / demo)

---

## Internationalization (i18n)

- **Locales:** `en` (default), `ro`
- **Next.js:** `i18n.locales` and `defaultLocale` in `next.config.js`
- **Runtime copy:** `hooks/useTranslation.ts` (nested keys for navigation, hero, features, pricing labels, FAQ titles, footer, language names)
- **JSON namespaces:** `i18n.json` maps routes to namespaces (`common`, `home`, `about`, `prices`, `gallery`, `contact`) with files under `locales/en/` and `locales/ro/`
- **Switcher:** `components/language-switcher.tsx` uses `next/router` `locale` switching with flags under `public/images/flags/` (ensure flag assets exist in your deployment)

---

## Styling and design tokens

- **Dark surfaces:** `background` `#121212`, `surface` `#1f1f1f`, **primary** `#1e9b71`
- **Fonts:** Inter (body), Montserrat (display) — loaded in `globals.css`
- **Images:** Next/Image with **WebP** and **AVIF**; remote images allowed for `images.unsplash.com`
- **Smooth scroll** and custom **scrollbar** styles in `globals.css`

---

## Project structure (abbreviated)

```text
├── pages/              # Routes (_app, index, about, prices, gallery, contact, motion-demo)
├── components/         # Layout, feature cards, tooltips, language switcher, UI library
├── components/ui/      # Animated and composable UI primitives
├── hooks/              # useTranslation, useMotionConfig, useReducedMotion, useParallax, etc.
├── data/               # FAQ and static content (e.g. faqData.ts)
├── locales/            # next-translate JSON (en / ro)
├── public/             # Static assets (icons, program SVGs, images)
├── styles/             # globals.css
├── docs/               # MOTION_OPTIMIZATIONS.md
├── i18n.json           # next-translate page → namespace map
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json       # path alias @/*
└── biome.jsonc
```

---

## Getting started

Install dependencies:

```powershell
npm install
```

Run the development server (uses Next.js dev server):

```powershell
npm run dev
```

Build for production:

```powershell
npm run build
```

Start production server (after `npm run build`):

```powershell
npm run start
```

---

## NPM scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Development mode (`next dev`) |
| `npm run build` | Production build (`next build`) |
| `npm run start` | Production server (`next start`) |
| `npm run lint` | Lint with Ultracite |
| `npm run format` | Format with Ultracite |
| `npm run format:check` | Same as lint in this project |

---

## Configuration files

- **`next.config.js`** — TypeScript build strictness, ESLint ignored during build (Ultracite used instead), **`transpilePackages` / `optimizePackageImports`** for `motion`, image formats and Unsplash remote patterns, **i18n** locales
- **`tailwind.config.js`** — content paths, `darkMode: 'class'`, theme extensions, `tailwindcss-animate` plugin
- **`postcss.config.js`** — PostCSS pipeline for Tailwind
- **`biome.jsonc`** — formatter/linter; extends **ultracite**
- **`i18n.json`** — next-translate locale list and per-route namespaces

---

## Additional documentation

- **`docs/MOTION_OPTIMIZATIONS.md`** — lazy loading of Motion chunks, reduced-motion behavior, optional performance monitoring patterns, and integration notes

---

## Quality, accessibility, and performance

- **Strict TypeScript** (`strict`, `strictNullChecks`)
- **Reduced-motion** support wired through hooks and motion config
- **Semantic structure** and interactive patterns aimed at accessible navigation (accordions via Radix, focus and motion considerations in components)
- **Code splitting:** dynamic imports for heavy motion demos; optional preloading for critical chunks
- Optional **performance monitoring** hooks/components exist but are **disabled** in the default layout (see comments in `_app.tsx` and `motion-demo.tsx`)

---

## License

This project is **private** (`"private": true` in `package.json`).

---

*README generated to reflect the repository layout and dependencies as of the current codebase. If you add backend services, CMS, or analytics, extend the “Overview” and “Configuration” sections accordingly.*
