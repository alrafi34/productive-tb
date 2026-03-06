productivetoolbox/
│
├ app/
│   ├ page.tsx                       # Homepage (list of all tools)
│   ├ tools/                         # Tools base route
│   │   ├ page.tsx                   # Tools index page
│   │   ├ [tool]/                    # Dynamic route for each tool
│   │   │   └ page.tsx               # Individual tool page
│
├ components/
│   ├ ToolLayout.tsx                 # Shared layout for all tools
│   ├ ToolCard.tsx                   # Tool preview card for homepage
│   ├ ToolHeader.tsx                 # Header component for tools
│   ├ ToolFooter.tsx                 # Footer for tools
│   ├ ToolSidebar.tsx                # Optional sidebar (categories)
│
├ tools/
│   ├ word-counter/
│   │   ├ ui.tsx                     # React UI for Word Counter
│   │   ├ logic.ts                   # Word counting logic
│   │   ├ config.ts                  # SEO, title, description
│   │
│   ├ character-counter/
│   │   ├ ui.tsx
│   │   ├ logic.ts
│   │   ├ config.ts
│   │
│   ├ reading-time-calculator/
│   │   ├ ui.tsx
│   │   ├ logic.ts
│   │   ├ config.ts
│   │
│   ├ text-case-converter/
│   │   ├ ui.tsx
│   │   ├ logic.ts
│   │   ├ config.ts
│   │
│   ├ image-compressor/
│   │   ├ ui.tsx
│   │   ├ logic.ts
│   │   ├ config.ts
│   │
│   ├ image-resizer/
│   │   ├ ui.tsx
│   │   ├ logic.ts
│   │   ├ config.ts
│   │
│   └ ... (other tools) ...
│
├ api/                               # Backend routes for tools needing server
│   ├ tools/
│   │   ├ compress-image.ts          # Example: API endpoint for image compression
│   │   ├ generate-qr.ts             # Example: API endpoint for QR generator
│
├ lib/                               # Shared libraries
│   ├ db.ts                           # Database connection (for premium tools)
│   ├ redis.ts                        # Optional caching
│   ├ auth.ts                         # Auth setup (NextAuth.js)
│
├ config/
│   ├ tools.ts                        # Tool registry (slug, name, category, free/premium, backend)
│   ├ site.ts                         # SEO defaults, site title, metadata
│
├ public/                             # Static assets
│   ├ images/
│   ├ favicon.ico
│
├ styles/                             # Global CSS or Tailwind config
│   ├ globals.css
│   ├ tailwind.config.js
│
├ package.json
└ next.config.js