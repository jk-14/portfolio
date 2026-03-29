# Jatin Kapil — Portfolio

Personal developer portfolio built with React 18, TypeScript, Vite, and Tailwind CSS.

Live: https://jk-14.github.io/portfolio

## Local Development

```bash
# Install dependencies
npm install

# Copy env example and fill in your Formspree form ID
cp .env.example .env

# Start dev server
npm run dev
```

Open http://localhost:5173

## Environment Variables

| Variable | Description |
|---|---|
| `VITE_FORMSPREE_ID` | Your Formspree form ID (get one free at formspree.io) |

Create a `.env` file at the project root (never commit it):

```env
VITE_FORMSPREE_ID=your_form_id_here
```

## Deployment to GitHub Pages

Ensure the repo remote is `https://github.com/jk-14/portfolio` and the `gh-pages` branch exists (created automatically on first deploy).

```bash
npm run deploy
```

This runs `npm run build` then pushes the `dist/` folder to the `gh-pages` branch.

## Replacing Placeholders

All placeholder content is marked with `[PLACEHOLDER ...]` in the source files:

| File | What to fill in |
|---|---|
| `src/data/experience.ts` | Role dates and bullet points (from .docx) |
| `src/data/projects.ts` | Project titles, descriptions, tech tags, URLs |
| `src/components/sections/HeroSection.tsx` | One-line tagline |
| `src/components/sections/AboutSection.tsx` | Bio paragraphs, stat numbers |
| `src/components/sections/ContactSection.tsx` | GitHub URL |
| `src/App.tsx` | SEO meta description |
| `public/og-image.svg` | Replace with a real 1200×630 OG image |

## Tech Stack

- **React 18** + **TypeScript** (strict mode)
- **Vite 6** — bundler with manual chunk splitting
- **Tailwind CSS v3** — utility-first styling with custom design tokens
- **@formspree/react** — contact form with spam protection
- **react-helmet-async** — SEO meta tags
- **gh-pages** — GitHub Pages deployment
- Animation components hand-crafted to match [React Bits](https://reactbits.dev) API

## Project Structure

```
src/
├── components/
│   ├── ui/             ← Animation components (Aurora, BlurText, SplitText, …)
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── sections/       ← One file per page section
├── data/               ← All content (experience, skills, projects)
├── hooks/              ← useActiveSection, useScrollDirection
├── styles/globals.css  ← Tailwind base + custom utilities
├── types/index.ts      ← Shared TypeScript interfaces
└── utils/cn.ts         ← clsx + tailwind-merge helper
```
