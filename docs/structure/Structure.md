# Productive Toolbox — Project Structure

```
productive-tb/
│
├── app/
│   ├── layout.tsx                         # Root layout (fonts: Poppins + Inter, global SEO metadata, JSON-LD)
│   ├── globals.css                        # Global CSS & CSS variables
│   ├── page.tsx                           # Homepage (hero, search, category carousel, testimonials)
│   ├── favicon.ico
│   ├── robots.ts                          # Robots.txt generation
│   ├── sitemap.ts                         # XML sitemap generation
│   │
│   ├── tools/
│   │   ├── page.tsx                       # /tools — category index grid (10 categories)
│   │   │
│   │   ├── [tool]/                        # Dual-purpose dynamic segment
│   │   │   ├── page.tsx                   # If slug = category → render category page
│   │   │   │                              # If slug = tool slug → redirect to /tools/[cat]/[slug]
│   │   │   └── [subtool]/
│   │   │       └── page.tsx               # /tools/[category]/[tool-slug] — individual tool page
│   │   │
│   │   └── category/
│   │       └── [category]/                # Reserved route (currently unused)
│   │
│   ├── about/
│   ├── contact/
│   ├── privacy/
│   └── terms/
│
├── components/
│   ├── Header.tsx                         # Sticky nav (Home, Tools, About, Contact, Subscribe)
│   ├── Footer.tsx                         # Site footer with links
│   ├── ToolLayout.tsx                     # Wrapper layout used by every tool page
│   │                                      # (breadcrumb → H1 + icon → children)
│   ├── ToolCard.tsx                       # Small card for tool grids
│   ├── CategoryToolsGrid.tsx              # Filterable grid for category pages ("use client")
│   ├── RelatedTools.tsx                   # Related tools section at bottom of tool pages
│   ├── SearchSection.tsx                  # Homepage search component
│   ├── ToolsFilter.tsx                    # Client-side filter/search for tools
│   ├── TestimonialsSection.tsx            # Homepage testimonials
│   ├── ToolHeader.tsx                     # (stub — not yet used)
│   ├── ToolFooter.tsx                     # (stub — not yet used)
│   └── ToolSidebar.tsx                    # (stub — not yet used)
│
├── config/
│   ├── tools.ts                           # ★ Tool registry & category definitions
│   │                                      #   - Tool[] array (slug, name, description, category, icon, free)
│   │                                      #   - Category[] array (10 categories)
│   └── site.ts                            # Site-wide config (name, url)
│
├── tools/                                 # ★ One folder per implemented tool (~609 tool configs)
│   ├── word-counter/
│   │   ├── config.ts                      # Tool metadata + SEO (slug, name, description, seo{}, features[])
│   │   ├── logic.ts                       # Pure TypeScript functions (no side effects)
│   │   ├── ui.tsx                         # "use client" React component
│   │   └── seo-content.tsx               # SEO sections (How To Use, FAQ, Benefits)
│   │
│   ├── sentence-case-converter/
│   ├── discount-calculator/
│   └── ... (600+ tool entries mapped)
│
├── lib/
│   └── tools-registry.ts                  # Centralized tool registry (used by RelatedTools component)
│
├── public/
│   ├── favicon.svg
│   └── og-image.png
│
├── docs/                                  # Developer documentation
│   ├── README.md                          # Documentation index & project overview
│   ├── NEW_TOOL_INTEGRATION_GUIDE.md      # Full step-by-step guide
│   ├── QUICK_REFERENCE.md                 # Cheat sheet for fast tool creation
│   ├── SEO_STRATEGY_ANALYSIS.md           # SEO patterns and keyword strategy
│   ├── structure/
│   │   └── Structure.md                   # This file
│   └── seo/                               # Per-tool SEO notes
│
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
└── pnpm-lock.yaml
```

## Key Routing Rules

| URL Pattern | Handled By | Purpose |
|---|---|---|
| `/tools` | `app/tools/page.tsx` | Category index grid |
| `/tools/writing` | `app/tools/[tool]/page.tsx` | Category page (renders tools for that category) |
| `/tools/writing/word-counter` | `app/tools/[tool]/[subtool]/page.tsx` | Individual tool page |
| `/tools/word-counter` | `app/tools/[tool]/page.tsx` | Redirects → `/tools/writing/word-counter` |

## Available Categories (10)

| Slug | Name | Icon |
|---|---|---|
| `writing` | Writing Tools | ✍️ |
| `image` | Image Tools | 🖼️ |
| `design` | Design Tools | 🎨 |
| `security` | Security Tools | 🔒 |
| `calculator` | Calculator Tools | 🧮 |
| `creator` | Creator Tools | 🚀 |
| `developer` | Developer Tools | 💻 |
| `visualization` | Visualization Tools | 📊 |
| `productivity` | Productivity Tools | ⚡ |
| `multimedia` | Multimedia Tools | 🎥 |