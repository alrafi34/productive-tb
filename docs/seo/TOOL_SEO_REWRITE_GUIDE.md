# Tool SEO Rewrite Reference Guide
## Productive Toolbox — 1 Million Visitor Standard

> Use this doc every time you rewrite or create SEO content for a tool.  
> Follow every section. Skip nothing. This is the full standard.

---

## Part 1 — The Two Files You Always Edit

Every tool requires changes to **two files**:

| File | What you do |
|------|-------------|
| `tools/[slug]/seo-content.tsx` | The visible content — 7 sections users read |
| `tools/[slug]/config.ts` | The structured data — `faq` + `howToSteps` arrays Google reads |

Both must be done together. Doing only `seo-content.tsx` misses the rich results opportunity. Doing only `config.ts` has no visible content for users.

---

## Part 2 — seo-content.tsx: The 7-Section Structure

Target **800–1,500 words** for Tier 1/2 tools. Minimum **400–600 words** for all others.

Competitors ranking for the same keywords have 1,200–2,400 words. At 200 words you are invisible to Google's Helpful Content system.

### Section 1 — Introduction (150–200 words)

**Required elements:**
- Bold the primary keyword on first use: `<strong>age calculator</strong>`
- State what the tool does in the first sentence
- Explain the problem it solves (why people need it)
- Name the target users explicitly: "Built for **teachers, HR admins, parents, and students** who need..."
- End with tool capabilities: currencies supported, export options, browser-based privacy note

**Pattern:**
```
An [tool name] is a [tool type] that [what it does]. It answers [the core question users have]: [question in italics].

[Why the calculation is harder than it looks / what the tool handles automatically].

This tool is built for [user list] who need [use cases]. [Tool capabilities — currencies, export, browser-based].
```

---

### Section 2 — How It Works (100–150 words)

**Required elements:**
- Plain-language explanation of the formula or methodology
- Formula block styled with `bg-gray-50 border border-gray-100 rounded-lg` containing `font-mono` text
- Bullet list of key concepts, modes, or outputs the tool computes
- No jargon without definition

**Formula block structure:**
```tsx
<div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 my-4">
  <p className="text-sm font-medium text-gray-500 mb-2">Core Formula</p>
  <div className="space-y-1 font-mono text-sm text-gray-900">
    <p><span className="font-semibold">Result</span> = Input A ÷ Input B</p>
  </div>
</div>
```

---

### Section 3 — Step-by-Step Usage (150 words)

**Required elements:**
- Numbered steps in a 2-column grid (steps left, features list right)
- Each step has a **bold title** + 2–3 sentence explanation (not 1 line)
- Features list on the right: checkmarks `✓` in `text-green-500`, one feature per line
- Minimum 5 steps, maximum 7

**Step format:**
```tsx
<li key={i} className="flex items-start">
  <span className="bg-primary text-white rounded-full w-6 h-6 ...">
    {i + 1}
  </span>
  <span><strong>{title}:</strong> {description}</span>
</li>
```

**Features list must include:**
- Real-time calculation note
- Currency/unit support if applicable
- Export options (CSV, TXT, clipboard)
- Shareable URL
- Browser-based privacy note
- No signup required

---

### Section 4 — Use Cases (200–300 words)

**Required elements:**
- 6 use cases in a `grid md:grid-cols-2 gap-6`
- Each use case is a `bg-gray-50` card with a bold title + scenario paragraph
- Each scenario must include **specific numbers** (not vague descriptions)
- Each scenario should name a specific person/role and their specific problem
- The tool result must appear in the scenario text

**Good scenario pattern:**
```
A [role] needs to [specific goal]. They enter [specific inputs] 
and the calculator returns [specific result]. [What they do with that result / 
what decision it enables].
```

**Bad (too vague):**
> "A business owner uses this to check their margins."

**Good (specific):**
> "A Shopify seller sources a product for $22 including packaging. They want a 35% margin. Using Find Selling Price mode with $22 cost and 35% target, the calculator returns $33.85. They list at $34.99 — achieving 37.1% margin, above their target."

---

### Section 5 — Tips & Best Practices

**Required elements:**
- 2-column grid: Pro Tips (left) + Common Mistakes (right)
- Pro tips: `💡` icon, 5–6 items, each 2–4 sentences, specific and actionable
- Mistakes: `✕` in `text-red-400`, 4–5 items, each explains WHY it's a mistake
- Tips must be things only someone who actually uses the tool would know
- Mistakes must be things users commonly get wrong

---

### Section 6 — Formula Reference / Benchmark Table

**Required elements (choose what fits the tool):**
- Formula reference table for calculator/math tools
- Industry benchmark table for marketing/business tools
- Conversion reference table for unit converters
- Reference charts (zodiac dates, day milestones, etc.) for lifestyle tools

**Formula table structure:**
```tsx
{ name: "Output Name", formula: "Input A ÷ Input B × 100", example: "$500 ÷ 250 = $2.00" }
```

Three columns: Name (primary color, uppercase, small) | Formula (monospace) | Example (green, monospace)

**Benchmark table:** Always include a `*` disclaimer note below: "Benchmarks are approximate. Actual [metric] varies by [factors]."

---

### Section 7 — FAQ (8–10 items)

**Required elements:**
- Minimum 8, maximum 10 questions
- Each answer: 2–5 sentences, plain prose, no bullet points inside answers
- Last question is always the privacy question: "Is my data private when using this calculator?"
- Privacy answer template: "Yes. All calculations run entirely in your browser using JavaScript. Your [data type] is never transmitted to any server, stored in any database, or accessible to anyone other than you."

**Required FAQ topics to cover:**
1. What is [tool name]? (definition + why it matters)
2. How is [primary metric] calculated? (the formula explained simply)
3. What is a good [primary metric]? (benchmarks + "it depends" context)
4. What is the difference between [concept A] and [concept B]?
5. How do I [primary action] using this tool?
6. [Tool-specific edge case or advanced question]
7. [Tool-specific advanced question]
8. [Common misconception about the tool or metric]
9. [Real-world application question]
10. Privacy / data safety question

---

### Section 8 — Who Uses This (6 cards)

**Required elements:**
- 6 cards in `grid md:grid-cols-3 gap-5`
- Each card: emoji icon + bold title + 2-sentence description
- Descriptions must be specific to how that role uses the tool, not generic
- Cover a range of user types: professionals, businesses, students, individual users

---

## Part 3 — config.ts: Adding Schema Data

After writing `seo-content.tsx`, add `faq` and `howToSteps` to the tool's `config.ts` inside the `seo` object.

The tool page at `app/tools/[tool]/[subtool]/page.tsx` automatically reads these arrays and injects `FAQPage` + `HowTo` JSON-LD. **No other files need touching.**

### Template

```typescript
seo: {
  title: "...",
  description: "...",
  keywords: [...],
  openGraph: { ... },

  howToSteps: [
    {
      name: "Step title — short noun phrase",
      text: "1–3 sentences explaining what the user does and why. Match step titles from seo-content.tsx section 3.",
    },
    // 4–6 steps total
  ],

  faq: [
    {
      q: "Question exactly as written in seo-content.tsx FAQ section?",
      a: "Plain text answer. No HTML, no JSX, no markdown. 2–5 sentences. Match the answers in seo-content.tsx.",
    },
    // 8–10 items total
  ],
},
```

### Rules

**`howToSteps`:**
- `name` = short noun phrase: "Enter Fixed Costs", "Select Currency", "Read Results"
- `text` = plain string, 1–3 sentences, no HTML
- 4–6 steps (match section 3 of seo-content.tsx)

**`faq`:**
- `q` = complete question ending with `?`
- `a` = plain text only — no angle brackets, no markdown, no JSX
- 8–10 items (match the FAQ section in seo-content.tsx)
- Google shows maximum 10 FAQ items in rich results

---

## Part 4 — config.ts: Title, Description, Keywords

### Title Format

```
[Primary Keyword] — Free [Tool Type] Online | Productive Toolbox
```

**Examples:**
```
Age Calculator — Free Online Age Calculator from Date of Birth | Productive Toolbox
CPC Calculator — Free Cost Per Click Calculator | Productive Toolbox
BMI Calculator — Free Body Mass Index Calculator | Productive Toolbox
```

**Rules:**
- Primary keyword comes first
- Include "Free" and "Online"
- Keep under 60 characters before the pipe
- No keyword stuffing — one primary keyword, not three

### Description Format

130–155 characters. Include:
1. Primary keyword
2. Key outputs the tool provides
3. A differentiator (free, browser-based, no signup)

**Template:**
```
[Action verb] [primary keyword] [instantly/online]. [Key outputs]. [Differentiator — free, no signup, browser-based].
```

**Example:**
```
Calculate Cost Per Click (CPC) instantly using our free online CPC Calculator. 
Enter ad cost and clicks to get accurate PPC metrics in real time. 
Fast, mobile-friendly, and 100% browser-based.
```
(149 characters ✓)

### Keywords Array

Structure: primary keyword first, then secondary, then long-tail variants.

```typescript
keywords: [
  "age calculator",              // primary — exact match
  "age calculator online",       // primary variant
  "age calculator from date of birth", // primary variant
  "calculate age online",        // secondary
  "how old am i",                // secondary
  "date of birth calculator",    // secondary
  "exact age calculator",        // long-tail
  "age in years months days",    // long-tail
  "calculate age from birth date", // long-tail
  // ... 15–25 total
],
```

Note: Google no longer reads keyword meta tags for ranking. These arrays exist for internal reference and are used in some platform features. Body text in `seo-content.tsx` is what actually matters for keyword ranking.

---

## Part 5 — config.ts: relatedTools

Every tool config must have a `relatedTools` array of 4–6 slugs.

```typescript
relatedTools: [
  "same-category-tool-1",
  "same-category-tool-2",
  "complementary-workflow-tool",
  "adjacent-category-tool",
],
```

**Grouping strategy:**
1. Same category tools (most relevant — 2–3 slugs)
2. Complementary workflow (e.g., word-counter → reading-time-calculator → keyword-density-checker)
3. Adjacent category if logical (e.g., age-calculator → bmi-calculator)

This powers the `RelatedTools` sidebar component. Without it, users have nowhere to go after using a tool — and Google's crawler has nowhere to follow.

---

## Part 6 — Keyword Strategy Per Tool

Each tool targets three tiers of keywords. All three must appear naturally in the body text of `seo-content.tsx`.

| Tier | Type | Volume | Competition | Where to rank first |
|------|------|--------|-------------|---------------------|
| Primary | Exact tool name | High | High | Months 6–12 |
| Secondary | Variant phrases | Medium | Medium | Months 3–6 |
| Long-tail | Specific use cases | Low | Low | Months 1–3 |

**Win long-tail first.** New sites rank for long-tail before primary keywords. Each long-tail win builds authority for the primary keyword.

**Long-tail examples for any tool:**
- "[tool name] for [specific use case]" — "word counter for essays"
- "free [tool name] no sign up" — "free age calculator no sign up"
- "how to [action] [context]" — "how to calculate age in years months days"
- "[tool name] [specific platform]" — "word counter for Google Docs"

**Placement rule:** Keywords must appear in:
- H2 section headings (naturally)
- First paragraph of Introduction
- Use case scenarios
- FAQ questions and answers

Do NOT stuff keywords. If it reads awkwardly, remove it.

---

## Part 7 — Content Quality Rules

These are the standards Google's Helpful Content system evaluates.

### Do

- Write for the user, not the search engine
- Include specific numbers in use cases (not "a business owner" but "a Shopify seller spending $1,200/month")
- Explain the formula or methodology in plain language — not just "enter your values"
- Cover edge cases (what happens with leap year birthdays, what if selling price = cost price, etc.)
- Answer questions users actually ask (check the tool's search queries in GSC)
- Make every FAQ answer self-contained — no "as mentioned above"

### Don't

- Repeat the same information in different sections
- Use filler phrases: "This tool is great for...", "Our amazing calculator..."
- Write one-sentence step descriptions
- Copy-paste the same "browser-based, no signup" text in every sentence
- Use vague use cases without specific inputs and outputs
- Write FAQ answers shorter than 2 sentences

---

## Part 8 — Tool Priority Order

Do tools in this order. Higher volume = faster ROI.

### Tier 1 — Do First (800–1,500 words each)

| Tool | Primary Keyword | Monthly Searches |
|------|----------------|-----------------|
| `bmi-calculator` | bmi calculator | 1,200,000 |
| `loan-emi-calculator` | emi calculator | 800,000 |
| `mortgage-calculator` | mortgage calculator | 600,000 |
| `word-counter` | word counter online | 550,000 |
| `gst-vat-calculator` | gst calculator | 500,000 |
| `age-calculator` | age calculator | 450,000 |
| `password-generator` | password generator | 400,000 |
| `salary-calculator` | salary calculator | 400,000 |
| `scientific-calculator` | scientific calculator | 350,000 |
| `percentage-calculator` | percentage calculator | 300,000 |
| `base64-encoder-decoder` | base64 decode | 250,000 |
| `qr-code-generator` | qr code generator free | 250,000 |
| `compound-interest-calculator` | compound interest calculator | 200,000 |
| `simple-interest-calculator` | simple interest calculator | 200,000 |
| `image-compressor` | compress image online | 200,000 |

### Tier 2 — Do Next (600–1,000 words each)

| Tool | Primary Keyword | Monthly Searches |
|------|----------------|-----------------|
| `tip-calculator` | tip calculator | 150,000 |
| `json-validator` | json validator | 180,000 |
| `regex-tester` | regex tester | 120,000 |
| `discount-calculator` | discount calculator | 120,000 |
| `color-palette-generator` | color palette generator | 110,000 |
| `css-gradient-generator` | css gradient generator | 60,000 |
| `body-fat-calculator` | body fat calculator | 90,000 |
| `binary-hex-decimal-converter` | binary to decimal | 90,000 |
| `timestamp-unix-converter` | unix timestamp converter | 90,000 |
| `reading-time-calculator` | reading time calculator | 40,000 |

### Remaining 400+ Tools — Minimum Standard (400–600 words each)

- Introduction (100 words)
- Formula or method explained (75 words)
- Step-by-step (100 words, 4 steps minimum)
- At least one worked example with specific numbers
- 5–8 FAQs
- `relatedTools` array in config
- `faq` + `howToSteps` in config

---

## Part 9 — Verification Checklist (Per Tool)

Run through this before marking a tool done.

**seo-content.tsx:**
- [ ] Section 1 (Introduction) — 150–200 words, primary keyword bolded
- [ ] Section 2 (How It Works) — formula block present, concepts explained
- [ ] Section 3 (Step-by-Step) — 5–7 steps, each 2+ sentences, features list right column
- [ ] Section 4 (Use Cases) — 6 cards, each with specific numbers
- [ ] Section 5 (Tips & Mistakes) — 5–6 tips, 4–5 mistakes, 2+ sentences each
- [ ] Section 6 (Reference Table) — formula table, benchmarks, or reference chart
- [ ] Section 7 (FAQ) — 8–10 items, last one is privacy question
- [ ] Section 8 (Who Uses This) — 6 cards, specific role descriptions

**config.ts:**
- [ ] `seo.title` — follows `[Primary Keyword] — Free [Type] Online | Productive Toolbox` format
- [ ] `seo.description` — 130–155 characters, includes primary keyword + benefit
- [ ] `seo.keywords` — 15–25 items, primary first then long-tail
- [ ] `seo.faq` — 8–10 items matching FAQ section, plain text only
- [ ] `seo.howToSteps` — 4–6 steps matching section 3, plain text only
- [ ] `relatedTools` — 4–6 slugs in config root

**After deploy:**
- [ ] Test at [search.google.com/rich-results](https://search.google.com/rich-results) — FAQPage + HowTo + SoftwareApplication detected
- [ ] Check GSC impressions for the tool URL 2–4 weeks post-deploy


*Last updated: July 2026 · See also: SEO_GROWTH_AUDIT.md, CHECKLIST_1M.md*
