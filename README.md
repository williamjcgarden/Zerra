# Zerra Studios

A high-performance marketing site for Zerra Studios, a web development agency. Built for speed, conversion, and visual polish — featuring scroll-driven animations, a slide-out contact form, and a fully responsive layout.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Language | TypeScript (strict mode) |
| Build tool | Vite |
| Styling | Tailwind CSS |
| UI components | shadcn/ui (Radix UI primitives) |
| Animations | Framer Motion |
| Forms | React Hook Form + Zod |
| Routing | React Router v6 |
| Data fetching | TanStack Query |
| Testing | Vitest + Testing Library |

## Getting Started

```bash
npm install
npm run dev
```

The dev server starts at `http://localhost:5173`.

### Other scripts

```bash
npm run build       # Production build
npm run preview     # Preview the production build locally
npm run lint        # Run ESLint
npm run test        # Run tests once
npm run test:watch  # Run tests in watch mode
```

### Environment variables

Copy `.env.example` to `.env` and fill in any values needed:

```bash
cp .env.example .env
```

See `.env.example` for the full list of supported variables.

## Project Structure

```
src/
├── components/
│   ├── ui/                 # shadcn/ui primitives (auto-generated, avoid editing)
│   ├── Navbar.tsx          # Fixed top navigation with mobile drawer
│   ├── HeroSection.tsx     # Above-the-fold hero with headline and CTA
│   ├── ServicesSection.tsx # Service offering cards
│   ├── WhyZerraSection.tsx # Differentiators / value proposition
│   ├── ProcessSection.tsx  # Step-by-step engagement process
│   ├── CTASection.tsx      # Bottom call-to-action banner
│   ├── ContactPanel.tsx    # Slide-out contact/quote form (React Hook Form + Zod)
│   ├── Footer.tsx          # Footer with links and social
│   ├── GlobalAtmosphere.tsx# Full-page ambient background layer
│   ├── AtmosphericBg.tsx   # Per-section atmospheric glow helper
│   ├── CursorTrail.tsx     # Custom cursor trail effect
│   └── ScanOverlay.tsx     # Decorative scan-line overlay
├── pages/
│   ├── Index.tsx           # Home page — composes all sections
│   └── NotFound.tsx        # 404 fallback
├── hooks/
│   ├── use-mobile.tsx      # Breakpoint hook (returns true when mobile)
│   └── use-toast.ts        # Toast notification hook
├── lib/
│   └── utils.ts            # cn() helper (clsx + tailwind-merge)
└── test/
    ├── setup.ts            # Vitest + Testing Library global setup
    └── example.test.ts     # Example test
```
