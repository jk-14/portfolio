# Performance Optimization Plan

## Overview

This document tracks all planned and completed performance optimizations for the portfolio app.
Each phase is ordered by impact. Phase 1 is complete; Phases 2–4 are pending.

**Stack**: React 18 + TypeScript + Vite + Tailwind CSS v3

---

## Phase 1 — Remove Animation Libraries & Replace with CSS ✅

**Goal**: Eliminate `gsap`, `@gsap/react`, `motion`, and `ogl` entirely. Replace all effects with
native CSS animations and `IntersectionObserver`. Removes ~300–400KB from the bundle.

### Library → Component Dependency Map

| Library                | Files                              | Visual Effect                                        |
| ---------------------- | ---------------------------------- | ---------------------------------------------------- |
| `ogl`                  | `Plasma.tsx`, `Aurora.tsx`         | WebGL plasma fluid background, aurora borealis waves |
| `gsap` + `@gsap/react` | `FadeContent.tsx`, `SplitText.tsx` | Scroll fade-in, staggered text reveal                |
| `motion`               | `BlurText.tsx`, `TiltedCard.jsx`   | Blur-fade text entrance, 3D tilt card                |

---

### 1.1 FadeContent.tsx ✅

**Used in**: Every section (About, Skills, Experience, Projects, Contact)

**Before**: GSAP `timeline()` + `ScrollTrigger` — one active ScrollTrigger instance per component.
With ~15 `FadeContent` instances across all sections, this created 15 concurrent scroll listeners
and timeline managers.

**After**: Single `IntersectionObserver` per instance that disconnects after triggering once.
Fade-in via Tailwind CSS transition classes (`opacity-0 translate-y-4` → `opacity-100 translate-y-0`).
`transitionDelay` set via inline style from the `delay` prop.

**Removed props** (GSAP-specific, no longer applicable):
`container`, `ease`, `duration`, `initialOpacity`, `disappearAfter`, `disappearDuration`,
`disappearEase`, `onDisappearanceComplete`

---

### 1.2 SplitText.tsx ✅

**Used in**: Every section heading

**Before**: `GSAPSplitText` plugin to split DOM into character/word/line spans, then `gsap.fromTo()`
with `ScrollTrigger` per instance. Used `JSON.stringify(from)` and `JSON.stringify(to)` in the
dependency array (anti-pattern — ran on every render). Blocked animation on `document.fonts.ready`.

**After**: Manual `text.split('')` / `text.split(' ')` into `<span>` elements. `IntersectionObserver`
sets a `visible` boolean; each span gets `transition-delay: ${i * delay}ms` via inline style.
No font loading block — transitions are CSS and degrade gracefully.

**Removed props** (GSAP-specific): `from`, `to`, `ease`, `duration`, `threshold`, `rootMargin`,
`onLetterAnimationComplete` (replaced with `onTransitionEnd` on the last span)

---

### 1.3 BlurText.tsx ✅

**Used in**: `HomeSection` hero headline

**Before**: `motion.span` per character/word with `useMotionValue` + spring physics keyframes.
Built keyframe objects inside the `.map()` on every render. Had a bug — both `animateBy` branches
called `text.split('')` instead of `text.split(' ')` for words.

**After**: Plain `<span>` per part with CSS `animation` property. Two keyframes added to
`globals.css`:

```css
@keyframes blur-in-top {
  from {
    opacity: 0;
    filter: blur(10px);
    transform: translateY(-8px);
  }
  50% {
    opacity: 0.5;
    filter: blur(5px);
    transform: translateY(2px);
  }
  to {
    opacity: 1;
    filter: blur(0px);
    transform: translateY(0);
  }
}

@keyframes blur-in-bottom {
  /* mirror of above */
}
```

`animation-delay` per span drives the stagger. `IntersectionObserver` (already present in the
original) sets `inView` to apply the animation. Also fixed the `animateBy` split bug.

---

### 1.4 Plasma.tsx ✅

**Used in**: `HomeSection` as full-viewport background

**Before**: OGL `Renderer` + WebGL 2 canvas with a 71-line GLSL fragment shader running a
continuous `requestAnimationFrame` loop at 60fps. Even with `mouseInteractive={false}`, the RAF
loop ran unconditionally — including when the hero section was fully scrolled out of view.
`getBoundingClientRect()` called on every `mousemove` event.

**After**: Three layered CSS `radial-gradient` blobs animated with `@keyframes` using only
`transform: translate() scale()` — compositor-only, zero layout or paint cost. The component
renders a single div with `::before`, `::after`, and one child `.plasma-blob-3`.

```css
@keyframes plasma-drift-1 {
  /* 14s loop, translate + scale */
}
@keyframes plasma-drift-2 {
  /* 18s loop, offset phase */
}
@keyframes plasma-drift-3 {
  /* 22s loop, slow center pulse */
}
```

`prefers-reduced-motion: reduce` disables all three animations.

`HomeSection.tsx` updated: removed `React.lazy()` + `Suspense` wrapper (no longer needed for a
pure CSS component).

**Aurora.tsx** — was never imported by any section. Deleted.

**TiltedCard.tsx** — was never imported by any section. Deleted.

---

### 1.6 btn-glass shimmer ✅

**Before**: `::before` pseudo-element animated with `left: -100%` → `left: 160%` on hover.
Animating `left` triggers layout recalculation on every frame.

**After**: `transform: translateX(-160%)` → `translateX(260%)`. Runs entirely on the GPU
compositor — zero layout, zero paint.

---

### Phase 1 Results

| Metric                                 | Before                                      | After                                                     |
| -------------------------------------- | ------------------------------------------- | --------------------------------------------------------- |
| Removed packages                       | —                                           | `gsap`, `@gsap/react`, `motion`, `ogl` (8 packages total) |
| JS vendor chunk                        | ~500KB+                                     | ~135KB                                                    |
| App chunk                              | ~180KB                                      | ~32KB                                                     |
| Continuous RAF loops                   | 2 (Plasma + Aurora)                         | 0                                                         |
| Active ScrollTriggers (on full scroll) | ~15                                         | 0                                                         |
| `getBoundingClientRect` in hot paths   | SpotlightCard, TiltedCard (every mousemove) | TiltedCard: mouseenter only                               |
| `prefers-reduced-motion` support       | None                                        | Plasma, BlurText                                          |

---

## Phase 2 — Bundle & Load Time ⬜

**Goal**: Reduce time-to-interactive by splitting and deferring JavaScript that is not needed for
the initial viewport.

### 2.1 Lazy-load below-fold sections

**File**: `src/App.tsx`

Only `HomeSection` is visible on load. All other sections should be code-split with `React.lazy()`:

```tsx
import { lazy, Suspense } from 'react'
import { HomeSection } from '@/components/sections/HomeSection'

const AboutSection = lazy(() => import('@/components/sections/AboutSection'))
const SkillsSection = lazy(() => import('@/components/sections/SkillsSection'))
const ExperienceSection = lazy(() => import('@/components/sections/ExperienceSection'))
const ProjectsSection = lazy(() => import('@/components/sections/ProjectsSection'))
const ContactSection = lazy(() => import('@/components/sections/ContactSection'))
```

Wrap each lazy section in `<Suspense>` with a lightweight skeleton fallback (a `min-h-screen`
div in the section's background colour) so layout doesn't shift while the chunk loads.

### 2.2 Split vendor chunks in `vite.config.ts`

Separate large shared dependencies into individually cacheable chunks:

```ts
manualChunks: {
  vendor:    ['react', 'react-dom'],
  helmet:    ['react-helmet-async'],
  formspree: ['@formspree/react'],
}
```

(The animation library chunks from the original plan are no longer needed — those packages have
been removed in Phase 1.)

---

## Phase 3 — React Render Optimization ⬜

**Goal**: Prevent unnecessary re-renders caused by scroll-driven hook state updates propagating
down to components that don't need to change.

### 3.1 Memoize components that re-render on scroll

`Navbar`, `ProjectCard`, `ContactForm`, and `SpotlightCard` all re-render whenever parent scroll
hooks (`useScrollDirection`, `useActiveSection`) fire state updates. Wrap each with `React.memo()`:

```tsx
export const Navbar = React.memo(function Navbar() { ... })
export const ProjectCard = React.memo(function ProjectCard({ project }) { ... })
```

### 3.2 Consolidate `FadeContent` / `IntersectionObserver` instances

Each `FadeContent` creates one `IntersectionObserver`. With 6 projects + 5 experience entries +
4 skill categories + section wrappers, roughly 20 observers are active simultaneously.

Option A — single shared observer via React Context passed down through sections.
Option B — use CSS `animation-delay` stagger at the section level and a single observer on
the section container instead of per-item observers.

Option B is simpler and requires no new Context infrastructure.

### 3.3 Single `IntersectionObserver` in `useActiveSection`

**File**: `src/hooks/useActiveSection.ts`

Currently creates 6 separate observer instances (one per section ID). Replace with one observer
that watches all section elements:

```ts
const observer = new IntersectionObserver(callback, options)
SECTION_IDS.forEach((id) => {
  const el = document.getElementById(id)
  if (el) observer.observe(el)
})
```

---

## Phase 4 — Low-Hanging Fruit ⬜

**Goal**: Small targeted fixes that collectively reduce paint cost and improve perceived
smoothness.

### 4.1 Cache `getBoundingClientRect` in `SpotlightCard`

**File**: `src/components/ui/SpotlightCard.jsx`

Same reflow issue as the original `TiltedCard`. Apply the same fix: cache the rect on
`mouseenter`, use the cache in `mousemove`, invalidate on `resize`.

```js
const cachedRect = useRef(null)
const handleMouseEnter = () => {
  cachedRect.current = divRef.current.getBoundingClientRect()
}
const handleMouseMove = (e) => {
  const rect = cachedRect.current
  if (!rect) return
  divRef.current.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
  divRef.current.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
}
```

### 4.2 Add `passive: true` to resize listeners

**Files**: `SpotlightCard.jsx`, any component that listens to `resize` or `scroll` on `window`

```js
window.addEventListener('resize', handler, { passive: true })
```

### 4.3 Simplify multi-layer box-shadows

**File**: `src/components/sections/SkillsSection.tsx`

The skill category cards use two-layer `box-shadow` values that change on hover, causing
expensive paint operations. Simplify to a single shadow layer or use `filter: drop-shadow()`
which is GPU-composited.

### 4.4 Add `decoding="async"` to all `<img>` tags

Prevents image decode from blocking the main thread. Pair with the existing `loading="lazy"`:

```tsx
<img src={...} alt={...} loading="lazy" decoding="async" width={...} height={...} />
```

### 4.5 Remove continuous `animate-bounce` from scroll indicator

**File**: `src/components/sections/HomeSection.tsx`

The `animate-bounce` Tailwind class runs a CSS animation loop forever. Replace with a
one-shot `animation-fill-mode: forwards` fade-out, or simply remove the bounce and use a
static down-arrow icon.

---

## Completed Summary

| Phase                                      | Status      | Key Win                                       |
| ------------------------------------------ | ----------- | --------------------------------------------- |
| Phase 1 — Remove animation libraries       | ✅ Complete | −~370KB bundle, 0 RAF loops, 0 ScrollTriggers |
| Phase 2 — Bundle splitting + lazy sections | ⬜ Pending  | Faster TTI, parallel chunk loading            |
| Phase 3 — React render optimization        | ⬜ Pending  | Fewer re-renders during scroll                |
| Phase 4 — Low-hanging fruit                | ⬜ Pending  | Reduced paint cost, layout reflows            |
