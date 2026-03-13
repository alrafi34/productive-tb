# 📚 Productive Toolbox — Documentation Index

**Master guide for developers, AI, and contributors.**

> Last Updated: March 2026 | Version: 2.0

---

## 🎯 Quick Navigation

### For New Developers
1. **[NEW_TOOL_INTEGRATION_GUIDE.md](./NEW_TOOL_INTEGRATION_GUIDE.md)** — Full step-by-step guide (start here)
2. **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** — Copy-paste cheat sheet
3. **[structure/Structure.md](./structure/Structure.md)** — Folder/file tree
4. **[SEO_STRATEGY_ANALYSIS.md](./SEO_STRATEGY_ANALYSIS.md)** — SEO patterns and keyword strategy

### For AI Assistants
1. Read **NEW_TOOL_INTEGRATION_GUIDE.md** fully before writing any code
2. Always use the two-level URL pattern: `/tools/[category]/[tool-slug]`
3. Update all **3 registration files** (not just one)
4. Reference existing tools for code patterns

### For Content Writers
1. **SEO_STRATEGY_ANALYSIS.md** — Keyword strategy and content guidelines
2. Use FAQ templates from NEW_TOOL_INTEGRATION_GUIDE.md
3. 400+ words per tool in seo-content.tsx, 4–6 FAQ questions minimum

---

## 📖 Documentation Files

| File | Purpose | Read Time |
|---|---|---|
| `README.md` | This index | 5 min |
| `NEW_TOOL_INTEGRATION_GUIDE.md` | Full integration walkthrough (8 steps) | 20 min |
| `QUICK_REFERENCE.md` | Copy-paste cheat sheet | 2 min |
| `SEO_STRATEGY_ANALYSIS.md` | SEO strategy and keyword patterns | 30 min |
| `structure/Structure.md` | Full folder/file directory tree | 5 min |
| `seo/` | Per-tool SEO notes | As needed |

---

## 🗺️ Project Structure (Summary)

```
productive-tb/
├── app/
│   ├── layout.tsx                       # Root layout (Poppins + Inter fonts, global metadata)
│   ├── page.tsx                         # Homepage
│   ├── globals.css                      # CSS variables & global styles
│   └── tools/
│       ├── page.tsx                     # /tools — 11-category index
│       └── [tool]/
│           ├── page.tsx                 # /tools/[category] — category page
│           │                            # /tools/[slug] — redirects to /tools/[cat]/[slug]
│           └── [subtool]/
│               └── page.tsx             # /tools/[category]/[slug] — INDIVIDUAL TOOL PAGE
│
├── components/
│   ├── ToolLayout.tsx                   # Shared wrapper: breadcrumb + H1 + icon
│   ├── RelatedTools.tsx                 # Related tools section (uses lib/tools-registry.ts)
│   ├── CategoryToolsGrid.tsx            # Filterable tool grid for category pages
│   ├── Header.tsx / Footer.tsx
│   └── ...
│
├── config/
│   ├── tools.ts                         # ★ Tool[] + Category[] definitions (11 categories)
│   └── site.ts                          # Site name, URL
│
├── tools/                               # ★ ~103 tool folders
│   └── [tool-slug]/
│       ├── config.ts                    # slug, name, desc, category, seo{}, features[]
│       ├── logic.ts                     # Pure functions (no React, no DOM)
│       ├── ui.tsx                       # "use client" React component
│       └── seo-content.tsx             # How-To, FAQ, Why sections
│
├── lib/
│   └── tools-registry.ts               # Registry used by RelatedTools component
│
└── docs/                                # You are here
```

**Full file tree:** See [structure/Structure.md](./structure/Structure.md)

---

## 🗂️ URL Routing

```
/tools                               → 11 category cards
/tools/writing                       → Writing Tools category
/tools/writing/word-counter          → Word Counter tool  ← CANONICAL URL
/tools/word-counter                  → Auto-redirects to above
```

The key file that **renders** a tool is:
```
app/tools/[tool]/[subtool]/page.tsx
```
where `[tool]` = category slug and `[subtool]` = tool slug.

---

## 📊 Available Categories (11)

| Slug | Name | Color Theme |
|---|---|---|
| `writing` | Writing Tools | Emerald |
| `image` | Image Tools | Amber |
| `design` | Design Tools | Pink |
| `security` | Security Tools | Red |
| `math` | Math Tools | Violet |
| `calculator` | Calculator Tools | Teal |
| `creator` | Creator Tools | Orange |
| `developer` | Developer Tools | Blue |
| `visualization` | Visualization Tools | Cyan |
| `productivity` | Productivity Tools | Lime |
| `multimedia` | Multimedia Tools | Indigo |

---

## 🚀 Getting Started

### First-Time Contributor (Estimated: 2–3 hours for first tool)

```
1. Read: docs/README.md (this file)
2. Read: docs/NEW_TOOL_INTEGRATION_GUIDE.md
3. Study: tools/word-counter/   ← simple stats tool
4. Study: tools/bmi-calculator/ ← calculator pattern
5. Create your tool following the guide
```

### Experienced Developer (Estimated: 30–45 min per tool)

```
1. Copy QUICK_REFERENCE.md templates
2. mkdir -p tools/your-tool-name
3. Fill in 4 files
4. Update 3 registration files
5. pnpm dev + test
```

---

## 📋 Integration Checklist

### Phase 1 — Plan (10 min)
- [ ] Choose category slug (from the 11 above)
- [ ] Choose tool slug (kebab-case, unique)
- [ ] Research 10–15 SEO keywords
- [ ] List 5+ features

### Phase 2 — Create (45 min)
- [ ] `tools/your-tool-name/config.ts`
- [ ] `tools/your-tool-name/logic.ts`
- [ ] `tools/your-tool-name/ui.tsx`
- [ ] `tools/your-tool-name/seo-content.tsx`
- [ ] `config/tools.ts` — add to tools array
- [ ] `lib/tools-registry.ts` — add import + entry
- [ ] `app/tools/[tool]/[subtool]/page.tsx` — add import + TOOLS entry

### Phase 3 — Test (15 min)
- [ ] Loads at `/tools/[category]/[slug]`
- [ ] Redirect works from `/tools/[slug]`
- [ ] All features work
- [ ] Mobile responsive (375px)
- [ ] No console errors
- [ ] SEO sections render
- [ ] RelatedTools shows at bottom

### Phase 4 — SEO (10 min)
- [ ] Title < 60 chars with primary keyword
- [ ] Description 150–160 chars
- [ ] 4–6 FAQ questions
- [ ] 400+ words in seo-content.tsx
- [ ] Keywords naturally placed

**Total: ~80 minutes per tool**

---

## 🎨 Design System

### Fonts
- **Headings:** Poppins — `style={{ fontFamily: "var(--font-heading)" }}`
- **Body:** Inter — `style={{ fontFamily: "var(--font-body)" }}`

### Colors
```css
--color-primary:       #058554   /* Green */
--color-primary-hover: #069D63   /* Green hover */
Background:            #F9FAFB   /* Light gray page bg */
Card:                  #FFFFFF
Text:                  #1F2937
Muted:                 #6B7280
Border:                #E5E7EB
```

### Key Tailwind Classes
```
bg-primary              → Primary green
hover:bg-primary-hover  → Green hover
text-primary            → Green text
ring-primary            → Green focus ring
rounded-xl              → Standard border radius (12px)
shadow-sm               → Standard shadow
```

**Full class reference:** See [QUICK_REFERENCE.md](./QUICK_REFERENCE.md)

---

## 🔍 SEO Quick Reference

```
Title:       "Free [Tool] — [Benefit] | Productive Toolbox"  (< 60 chars)
Description: "Free online [tool] to [benefit]. [Feature]. No sign-up."  (150–160 chars)
Keywords:    10–15 — mix of primary, modified, long-tail, audience
FAQ:         4–6 questions minimum per tool
Content:     400+ words total in seo-content.tsx
```

**Full strategy:** See [SEO_STRATEGY_ANALYSIS.md](./SEO_STRATEGY_ANALYSIS.md)

---

## 🏆 Current State

### Tools Implemented: ~103
### Categories: 11
### URL Pattern: `/tools/[category]/[tool-slug]`
### Stack: Next.js 15, TypeScript, Poppins + Inter fonts, Vanilla CSS + Tailwind

### Example Reference Tools
| Tool | Category | Pattern |
|---|---|---|
| `word-counter` | writing | Real-time stats |
| `sentence-case-converter` | writing | Multi-option transform |
| `bmi-calculator` | calculator | Input → result |
| `css-gradient-generator` | design | Visual generator |
| `pie-chart-maker` | visualization | Data → chart |
| `password-generator` | security | Generate + copy |

---

## 🐛 Troubleshooting

| Issue | Cause | Fix |
|---|---|---|
| Tool returns 404 | Not in TOOLS array | Update `[subtool]/page.tsx` |
| RelatedTools empty | Not in registry | Update `lib/tools-registry.ts` |
| Category page missing tool | Wrong slug in config/tools.ts | Fix category slug |
| Redirect not working | Not in config/tools.ts | Add to tools array |
| "use client" error | Hook in server component | Add to top of ui.tsx |
| Fonts wrong | Missing `style={{ fontFamily }}` | Add font style props |

---

## 📞 Resources

- **Next.js Docs:** https://nextjs.org/docs
- **TypeScript:** https://www.typescriptlang.org/docs
- **Tailwind CSS:** https://tailwindcss.com/docs
- **React Docs:** https://react.dev

---

**Version:** 2.0 | **Updated:** March 2026 | **Status:** Active Development
