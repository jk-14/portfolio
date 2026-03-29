1. Project Overview

What this project is (personal developer portfolio, single-page scrollable app)
Target deployment URL (https://<username>.github.io/portfolio)
Intended audience (hiring managers, senior engineering teams)
Current status (in progress / which sections are complete)


2. Tech Stack & Versions

Node.js version requirement
React 18 + TypeScript (strict mode)
Vite — note the configured base: '/portfolio/'
Tailwind CSS v3
React Bits (reactbits.dev) — copied locally, not an npm package
@formspree/react for contact form
react-helmet-async for SEO
gh-pages for deployment
Plausible analytics (script tag in index.html, no npm package)


3. Project Structure

Full annotated directory tree (src/components, src/data, src/hooks, etc.)
Where React Bits components live: src/components/ui/
Where all personal content lives: src/data/*.ts — never hardcode strings in components
Where custom hooks live: src/hooks/
Entry point: App.tsx renders all sections in order


4. Architecture Rules

This is a single-page app — no React Router, no multi-page routing
All navigation is anchor-based (href="#section-id")
Smooth scroll via CSS scroll-behavior: smooth on html
scroll-margin-top: 72px on every section to offset fixed navbar
Section IDs: hero, about, skills, experience, projects, contact
Never introduce client-side routing without explicit instruction


5. Commands
npm run dev          # local development server
npm run build        # production build — must pass with zero errors/warnings
npm run preview      # preview production build locally
npm run deploy       # builds and pushes to gh-pages branch
npm run lint         # ESLint check

6. Environment Variables

All env vars are prefixed with VITE_ to be accessible in the browser
VITE_FORMSPREE_ID — Formspree form ID for the contact form
Reference: import.meta.env.VITE_FORMSPREE_ID
.env is gitignored — .env.example is the reference file
Never hardcode the Formspree ID or any secret directly in source files


7. Design System & Tokens

Full color palette:

Background: #0A0A0F
Section alt background: #0F0F18
Accent primary: #00D4FF
Accent secondary: #7B61FF
Text primary: #E8EAF0
Text muted: #8B8FA8


Fonts: Space Grotesk (headings), Inter (body) — loaded from Google Fonts in index.html
All design tokens are defined as Tailwind config extensions — never use raw hex values in components, always use the token name (e.g. text-accent-primary not text-[#00D4FF])
Glassmorphism card pattern: backdrop-blur + bg-white/5 + border border-white/10
Section alternation: odd = #0A0A0F, even = #0F0F18


8. React Bits Usage Rules

React Bits components are not npm packages — they are copied locally via CLI
Install pattern: npx shadcn@latest add "https://reactbits.dev/r/<Name>-TS-TW"
Always use the TS-TW (TypeScript + Tailwind) variant
Installed components live in src/components/ui/ — do not move or rename them
If a CLI install fails, copy source manually from reactbits.dev and place in src/components/ui/
Heavy canvas/WebGL components (Plasma) must be wrapped in React.lazy() + Suspense
Currently installed components and their usage:

Plasma → Hero background
BlurText → Hero headline animation
SplitText → Section heading reveals
FadeContent → Scroll-triggered section reveal
Marquee → Skills strip
GlareCard → Project cards
MagneticButton → Contact form submit button




9. Content & Data Rules

All personal content (bio, experience bullets, project descriptions, skills) lives exclusively in src/data/*.ts
Files: experience.ts, skills.ts, projects.ts
TypeScript interfaces for all data shapes are in src/types/index.ts
Missing content is marked [PLACEHOLDER] — never invent biographical or professional details
When .docx content is provided, update only the data files — never touch component logic


10. Navbar Behaviour

Fixed top, full width, z-50
Hides on scroll down, reappears on scroll up — handled by useScrollDirection hook
Active section highlight — handled by useActiveSection hook (IntersectionObserver)
Mobile: hamburger menu with aria-expanded, aria-controls, aria-label
Never use JavaScript .scrollIntoView() — rely on CSS smooth scroll + anchor hrefs


11. Accessibility Requirements

Semantic HTML is non-negotiable: <header>, <main>, <nav>, <section>, <footer>
Every <section> must have aria-labelledby pointing to its heading's id
All icon-only buttons and links must have aria-label
Focus rings must be visible — use Tailwind focus-visible:ring-2 focus-visible:ring-accent
Colour contrast: ≥ 4.5:1 for body text, ≥ 3:1 for large text
Never remove outline or focus styles without a replacement


12. SEO Rules

react-helmet-async is configured once in App.tsx — not per section
Required tags: <title>, <meta description>, Open Graph (og:*), Twitter card, canonical URL
og:image points to /portfolio/og-image.png in /public
robots.txt and sitemap.xml live in /public
Page title format: Jatin Kapil — Senior Full Stack Developer


13. Performance Rules

Heavy React Bits components must use React.lazy() + Suspense
All images: loading="lazy" + explicit width and height
manualChunks in vite.config.ts splits vendor from app code
Do not add new heavy dependencies without flagging the performance impact
Target Lighthouse score > 90


14. TypeScript Rules

strict: true in tsconfig.json — no exceptions
No any types — ever
All data structures have explicit interfaces in src/types/index.ts
Path alias @ maps to src/ — configured in both vite.config.ts and tsconfig.json


15. GitHub Pages & Deployment Notes

Vite base is /portfolio/ — all asset paths depend on this being correct
Never change the base value without updating homepage in package.json too
The gh-pages package deploys the dist/ folder to the gh-pages branch
Do not commit the dist/ folder — it is gitignored
HashRouter is not used (no routing) — but note this for any future routing additions


16. What NOT to Do

Do not install Framer Motion — React Bits handles all animation
Do not add React Router — this is intentionally a single-page app
Do not hardcode any personal content in component files
Do not use raw hex color values — always use Tailwind design tokens
Do not use any in TypeScript
Do not use localStorage or sessionStorage
Do not remove scroll-margin-top from sections — it will break navbar offset
Do not change section id attributes without updating navbar links and useActiveSection