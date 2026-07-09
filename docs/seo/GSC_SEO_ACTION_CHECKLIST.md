# GSC SEO Action Checklist — Immediate Priority
## Productive Toolbox · Based on Last 28 Days Google Search Console Data

> **Source data:** `Queries.csv` + `Pages.csv` — 28-day window  
> **Scoring method:** `Impressions × (1 − CTR) ÷ Position` = opportunity score (higher = more urgent)  
> **What "immediate" means:** 0 clicks or <1% CTR despite 300+ impressions. These tools are being found by Google and shown to users, but nobody is clicking. Fix title + description + seo-content first. Rankings will follow content quality.

---

## The Core Problem (Same for All Tools Below)

Every tool in this list has the same issue: **high impressions, near-zero CTR, average position 8–45.**  
- Positions 1–10: page 1, CTR typically 3–30%  
- Positions 11–20: page 2, CTR typically 0.5–3%  
- Positions 21–50: pages 3–5, CTR near 0% regardless of title quality  

Two levers to pull per tool:  
1. **Title + description** → improves CTR once you're on page 1–2  
2. **seo-content.tsx rewrite** (full 8-section per TOOL_SEO_REWRITE_GUIDE.md) → moves position from page 3–5 to page 1–2  

Both are required. Title/description alone won't help a page stuck at position 35.

---

## Tier 1 — Do This Week (Score > 200, Massive Lost Traffic)

### 1. `land/decimal-land-calculator` ✅ DONE — July 2026 (Indexed)
- **Impressions:** 4,917 | **CTR:** 0.33% | **Position:** 9.04 | **Score:** 542
- **Completed:** Full 8-section seo-content.tsx rewrite. config.ts rebuilt with correct `toolConfig` export, title (58 chars), description (151 chars), 25 keywords (shotok, decimal to acre, 1 acre to decimal clusters), 10 FAQ, 5 howToSteps, 6 relatedTools.
- **Monitor:** Check GSC position in 3–4 weeks. Target: move from pos 9 to pos 5–6 and CTR from 0.33% to 4–6%.

---

### 2. `architecture/shadow-length-calculator` ✅ DONE — July 2026 (Indexed)
- **Impressions:** 3,136 | **CTR:** 0.80% | **Position:** 6.64 | **Score:** 469
- **Completed:** Full 8-section seo-content.tsx rewrite. config.ts rebuilt with `toolConfig` export, title (60 chars), description (148 chars), 25 keywords anchored to GSC queries, 10 FAQ, 5 howToSteps, 6 relatedTools. Reference tables: shadow length by angle + winter solstice noon angles by latitude.
- **Monitor:** CTR at position 6–7 should move from 0.8% toward 5–7%. Check GSC in 2–3 weeks.

---

### 3. `architecture/parking-space-calculator` ✅ DONE — July 2026 (Indexed)
- **Impressions:** 3,609 | **CTR:** 0.97% | **Position:** 9.24 | **Score:** 387
- **Completed:** Full 8-section seo-content.tsx. config.ts rebuilt with title (55 chars), description (165 chars), 25 keywords, 10 FAQ, 6 howToSteps, 6 relatedTools. Reference tables: stall dimensions, stalls-per-area, parking ratios by use type.
- **Monitor:** Target CTR from 0.97% to 5–7% at position 9. Check in 3 weeks.

---

### 4. `writing/keyword-density-checker` (Indexed)
- **Impressions:** 11,901 | **CTR:** 0% | **Position:** 32.01 | **Score:** 372
- **Status:** ✅ seo-content.tsx rewritten. config.ts title/description/keywords updated (July 2026)
- **Remaining action:**
  - [ ] Monitor GSC for position movement over next 4 weeks — target: move from pos 32 to pos 15
  - [ ] If still at pos 30+ after 4 weeks, add more FAQ entries targeting specific long-tail queries from GSC

---

### 5. `electrical/air-conditioner-power-calculator` ✅ DONE — July 2026 (Indexed)
- **Impressions:** 2,301 | **CTR:** 0.30% | **Position:** 9.59 | **Score:** 239
- **Completed:** Full 8-section seo-content.tsx. config.ts with og + openGraph keys (dedicated page.tsx), title (52 chars), description (159 chars), 25 keywords, 10 FAQ, 5 howToSteps. Reference tables: watts by tonnage × EER, monthly cost table.
- **Monitor:** Target CTR from 0.30% to 4–6% at position 9–10. Check in 3 weeks.

---

### 6. `writing/word-counter` (Indexed)
- **Impressions:** 7,892 | **CTR:** 0% | **Position:** 35.23 | **Score:** 224
- **Status:** ✅ seo-content.tsx already full 8-section. Title/description/keywords updated (July 2026)
- **Remaining action:**
  - [ ] Monitor GSC for position movement over next 4 weeks — target: move from pos 35 to pos 15
  - [ ] If still at pos 35+ after 4 weeks, consider adding a dedicated "word counter for essays" FAQ section

---

### 7. `land/land-price-calculator` ✅ DONE — July 2026 (Indexed)
- **Impressions:** 2,060 | **CTR:** 0.39% | **Position:** 9.68 | **Score:** 212
- **Completed:** Full 8-section seo-content.tsx rewrite. config.ts updated with title (57 chars), description (155 chars), 25 GSC-anchored keywords, 10 FAQ, 5 howToSteps, 6 relatedTools.
- **Monitor:** At position 9–10, target CTR improvement from 0.39% to 4–6% within 3 weeks of deploy.

---

### 8. `electrical/electric-motor-power-calculator` ✅ DONE — July 2026 (Indexed)
- **Impressions:** 3,288 | **CTR:** 0.46% | **Position:** 15.68 | **Score:** 209
- **Completed:** Full 8-section seo-content.tsx. config.ts with og + openGraph keys (dedicated page.tsx), title (60 chars), description (156 chars), 25 keywords, 10 FAQ, 5 howToSteps. Reference tables: HP→kW→FLC, torque at common speeds.
- **Monitor:** Target move from position 15 to <10, CTR from 0.46% to 3–5%. Check in 4 weeks.

---

## Tier 2 — Do Next (Score 40–200, High Impressions Wasted)

### 9. `land/hectare-to-acre-converter` ✅ DONE — July 2026
- **Impressions:** 3,680 | **CTR:** 0.03% | **Position:** 30.4 | **Score:** 121
- **Completed:** Full 8-section seo-content.tsx. config.ts rebuilt with title (55 chars), description (156 chars), 25 keywords covering both ha→ac and ac→ha queries, 10 FAQ, 6 howToSteps, 6 relatedTools. Reference tables: 15-row ha→ac + 15-row ac→ha bidirectional.
- **Monitor:** Target move from pos 30 to pos 10–15 within 4–6 weeks. CTR target 3–6%.

---

### 10. `land/acre-to-hectare-converter` ✅ DONE — July 2026
- **Impressions:** 2,424 | **CTR:** 0% | **Position:** 27.74 | **Score:** 87
- **Completed:** Full 8-section seo-content.tsx. config.ts rebuilt with title (55 chars), description (156 chars), 25 keywords (ac-first direction), 10 FAQ, 6 howToSteps, 6 relatedTools cross-linking to hectare-to-acre-converter.
- **Monitor:** Target move from pos 27 to pos 10–15 within 4–6 weeks.

---

### 11. `land/price-per-square-feet-calculator` ✅ DONE — July 2026
- **Impressions:** 970 | **CTR:** 0% | **Position:** 10.69 | **Score:** 91
- **Completed:** Full 8-section seo-content.tsx (outputs both per-sq-ft and per-sq-m). config.ts rebuilt with title (54 chars), description (152 chars), 25 keywords anchored to GSC queries, 10 FAQ, 6 howToSteps, 6 relatedTools. Unit conversion table in section 2.
- **Monitor:** At position 10.69, one push from page 1. Target CTR 3–6% within 3 weeks.

---

### 12. `calculator/fuel-cost-calculator` ✅ DONE — July 2026
- **Impressions:** 1,128 | **CTR:** 0% | **Position:** 17.52 | **Score:** 64
- **Completed:** Full 8-section seo-content.tsx (export name kept as ToolSEOContent to match ui.tsx import). config.ts rebuilt with title (60 chars), description (151 chars), 25 keywords, 10 FAQ, 6 howToSteps, 6 relatedTools. Reference tables: cost/100 miles (Imperial) + cost/100 km (Metric).

---

### 13. `electrical/wire-size-calculator` ✅ DONE — July 2026
- **Impressions:** 2,593 | **CTR:** 0% | **Position:** 45.27 | **Score:** 57
- **Completed:** Full 8-section seo-content.tsx rewrite. config.ts rebuilt with title (52 chars), description (155 chars), 25 keywords anchored to GSC queries (`wire size calculator`, `cable size calculator`, `wire gauge calculator`, `cable sizing calculator`), 10 FAQ, 6 howToSteps, 6 relatedTools. Two reference tables: AWG/mm² ampacity by application + max one-way run length by wire size and circuit amperage (240V copper, 3% VD limit).
- **Monitor:** Position 45 → target pos 15–20 within 6–8 weeks of index. Content depth was the blocker, not CTR.

---

### 14. `land/acre-to-square-feet-converter` ✅ DONE — July 2026
- **Impressions:** 1,373 | **CTR:** 0% | **Position:** 33.08 | **Score:** 41
- **Completed:** Full 8-section seo-content.tsx rewrite. config.ts rebuilt with title (51 chars), description (150 chars), 25 keywords anchored to GSC queries (`0.25 acres to sq ft`, `acres to square feet`, `square feet to acres`, `10890 sq ft to acres`), 10 FAQ, 6 howToSteps, 6 relatedTools including cross-link to `square-feet-to-acre-converter`. Two 15-row bidirectional reference tables: acres→sq ft and sq ft→acres.
- **Monitor:** Target move from pos 33 to pos 10–15 within 4–6 weeks.

---

### 15. `land/square-feet-to-acre-converter` ✅ DONE — July 2026
- **Impressions:** 1,068 | **CTR:** 0% | **Position:** 39.38 | **Score:** 27
- **Completed:** Full 8-section seo-content.tsx rewrite. config.ts rebuilt with title (52 chars), description (155 chars), 25 keywords anchored to GSC queries (`square feet to acres`, `10890 square feet to acres`, `sq ft to acres`), 10 FAQ, 6 howToSteps, 6 relatedTools cross-linking to `acre-to-square-feet-converter`. Two 15-row bidirectional reference tables: sq ft→acres and acres→sq ft.
- **Monitor:** Target move from pos 39 to pos 10–15 within 4–6 weeks.

---

### 16. `calculator/discount-calculator` ✅ DONE — July 2026
- **Impressions:** 627 | **CTR:** 0% | **Position:** 15.96 | **Score:** 39
- **Completed:** Full 8-section seo-content.tsx rewrite. config.ts rebuilt with title (56 chars), description (131 chars), 25 keywords anchored to `discount calculator`, `percent off calculator`, `sale price calculator` clusters, 10 FAQ, 6 howToSteps, 6 relatedTools. Two reference tables: sale price by discount% at $100 original + stacked discount true combined rate table. Inline JSON-LD schema removed from seo-content.tsx — faq and howToSteps moved to config.ts.
- **Monitor:** At position 16, one content push could reach page 1. Target CTR 3–5% within 3–4 weeks.

---

### 17. `design/css-box-shadow-generator` ✅ DONE — July 2026
- **Impressions:** 515 | **CTR:** 0% | **Position:** 12.1 | **Score:** 43
- **Completed:** Full 8-section seo-content.tsx rewrite. config.ts rebuilt with title (51 chars), description (150 chars), 25 keywords covering all GSC query variants (`css box shadow generator`, `box shadow generator`, `box shadow css generator`, `css shadow generator`, `shadow box generator`), 10 FAQ with full 2–5 sentence answers (replaced 1-sentence stubs), 6 howToSteps, 6 relatedTools. Reference table: 12 common shadow patterns with CSS values and use cases. Inline JSON-LD schema removed from seo-content.tsx — faq and howToSteps moved to config.ts.
- **Monitor:** At position 12, content depth push should reach page 1. Target CTR 3–6% within 2–3 weeks.

---

### 18. `electrical/capacitive-reactance-calculator` ✅ DONE — July 2026
- **Impressions:** 431 | **CTR:** 0% | **Position:** 8.21 | **Score:** 52
- **Completed:** Title updated to include the formula — `"Capacitive Reactance Calculator — Xc = 1/(2πfC) Formula"` (55 chars). Description updated to lead with the formula and confirm inputs/outputs (155 chars). Keywords array rebuilt to 25 terms anchored to the exact GSC queries (`xc = 1/(2πfc)`, `capacitive reactance formula`, `1/(2πfc) calculator`). Added 10 FAQ, 5 howToSteps, and 6 relatedTools to config.ts (all were missing). seo-content.tsx preserved — existing content already has formula, examples, and comparison table.
- **Root cause was title/description mismatch:** Users searching the formula weren't seeing it reflected in the SERP snippet. Formula now appears in title, description, and keywords.
- **Monitor:** At position 8 (page 1), CTR should improve from 0% to 3–8% within 2–3 weeks of index.

---

### 19. `land/katha-land-calculator`
- **Impressions:** 435 | **CTR:** 0% | **Position:** 8.87 | **Score:** 49
- **Status:** Position 9 — on page 1, CTR is 0%
- **Top queries:** `kata land` (20 imp)
- **Action required:**
  - [ ] Check if "katha" is spelled consistently in title/content (some queries use "kata")
  - [ ] Full seo-content.tsx rewrite with regional unit reference table

---

### 20. `computer-science/bandwidth-calculator`
- **Impressions:** 1,750 | **CTR:** 0.34% | **Position:** 40.14 | **Score:** 43
- **Top queries:** `bandwidth calculator`, `calculate bandwidth`, `bandwidth usage estimator`, `data bandwidth calculator`, `network bandwidth calculator`, `business bandwidth calculator`
- **Action required:**
  - [ ] Full seo-content.tsx rewrite — position 40 is a content depth problem
  - [ ] Needs formula table, use case scenarios, and FAQ on bandwidth types

---

### 21. `writing/text-reverser`
- **Impressions:** 350 | **CTR:** 0% | **Position:** 8.77 | **Score:** 40
- **Status:** Position 9 — page 1, 0% CTR
- **Top queries:** `text reverser`, `text reverser online`, `sentence reverser`, `word reverser`, `upside down text decoder online`
- **Root cause:** Tool name likely matches, but title/description may not match "sentence reverser" or "word reverser" variants
- **Action required:**
  - [ ] Update title to cover all variants: "Text Reverser — Reverse Words, Sentences & Text Online"
  - [ ] Update description to name all modes
  - [ ] Full seo-content.tsx rewrite

---

### 22. `calculator/matrix-calculator`
- **Impressions:** 1,063 | **CTR:** 0% | **Position:** 39.9 | **Score:** 27
- **Top queries:** `matrix calculator`, `online matrix calculator`, `matrices calculator`, `matrix operations calculator`, `matrix calculation`, `matrix calc`, `matrix solver`
- **Action required:**
  - [ ] Full seo-content.tsx rewrite — position 40 requires content depth
  - [ ] Include operation reference table: addition, multiplication, determinant, inverse, transpose

---

### 23. `computer-science/cloud-cost-calculator`
- **Impressions:** 1,934 | **CTR:** 0% | **Position:** 70.21 | **Score:** 28
- **Top queries:** `cloud cost`, `cloud pricing calculator`, `cloud computing cost`, `cloud services pricing`, `gcp cost calculator`, `aws cloud pricing`, `cloud migration cost calculator`
- **Note:** Position 70 = page 7. This needs a major content overhaul before any CTR improvements are possible.
- **Action required:**
  - [ ] Full seo-content.tsx rewrite — this is a long-term play (position 70 = months of work)
  - [ ] Include provider comparison table (AWS vs GCP vs Azure pricing benchmarks)
  - [ ] Lower priority for immediate CTR gains, but high long-term value

---

## Tier 3 — Queue After Tier 1 & 2 (Score < 30, Lower Volume or Too Deep to Fix Fast)

| Tool | Impressions | CTR | Position | Primary Fix Needed |
|---|---|---|---|---|
| `calculator/bmi-calculator` | 547 | 0% | 62.85 | Full rewrite — Tier 1 in guide, critical |
| `electrical/solar-panel-calculator` | 703 | 0% | 62.31 | Full rewrite — position too deep |
| `electrical/ups-backup-calculator` | 527 | 0% | 48.49 | Full rewrite |
| `computer-science/latency-calculator` | 472 | 0% | 30.79 | Full rewrite |
| `computer-science/data-transfer-calculator` | 518 | 0% | 38.54 | Full rewrite |
| `land/roi-real-estate-calculator` | 300 | 0% | 54.06 | Full rewrite |
| `land/rental-yield-calculator` | 502 | 0% | 80.58 | Full rewrite |
| `electrical/electrical-efficiency-calculator` | 312 | 0% | 28.24 | Full rewrite |
| `land/bigha-land-calculator` | 302 | 0% | 12.73 | Title/desc + rewrite |
| `calculator/average-calculator` | 313 | 0% | 10.84 | Title/desc fix first |

---

## Tools With Clicks But Low CTR (Optimize to Scale Current Traffic)

These tools already get clicks but have low CTR — fixing them compounds existing traffic.

| Tool | Clicks | Impressions | CTR | Position | Action |
|---|---|---|---|---|---|
| `land/decimal-land-calculator` | 16 | 4,917 | 0.33% | 9.04 | **Tier 1 above — highest priority** |
| `architecture/parking-space-calculator` | 35 | 3,609 | 0.97% | 9.24 | **Tier 1 above** |
| `architecture/shadow-length-calculator` | 25 | 3,136 | 0.80% | 6.64 | **Tier 1 above** |
| `electrical/electric-motor-power-calculator` | 15 | 3,288 | 0.46% | 15.68 | **Tier 1 above** |
| `electrical/air-conditioner-power-calculator` | 7 | 2,301 | 0.30% | 9.59 | **Tier 1 above** |
| `security/wifi-password-generator` | 20 | 1,231 | 1.62% | 18.09 | Rewrite to push to page 1 |
| `land/subdivision-cost-calculator` | 22 | 2,088 | 1.05% | 8.42 | Good CTR — improve content depth |
| `electrical/ups-load-calculator` | 8 | 926 | 0.86% | 21.01 | Title/desc update + rewrite |
| `land/excavation-cost-calculator` | 2 | 1,222 | 0.16% | 29.13 | Full rewrite needed |
| `security/password-strength-meter` | 2 | 1,116 | 0.18% | 23.18 | Full rewrite needed |

---

## Tools Already Working (Protect These — Do Not Break)

These tools have healthy CTR. Any SEO changes should be additive, not structural.

| Tool | Clicks | Impressions | CTR | Position | Note |
|---|---|---|---|---|---|
| `land/plot-division-calculator` | 114 | 1,446 | 7.88% | 5.81 | Top performer — add related links |
| `architecture/escalation-cost-calculator` | 55 | 1,076 | 5.11% | 9.07 | Good — push position to <5 |
| `architecture/soil-compaction-calculator` | 9 | 106 | 8.49% | 9.95 | High CTR — protect and expand |
| `architecture/insulation-thickness-calculator` | 7 | 57 | 12.28% | 11.96 | Excellent CTR |
| `architecture/acoustic-soundproofing-calculator` | 7 | 37 | 18.92% | 7.08 | Best CTR on site |
| `design/hsl-color-slider` | 18 | 880 | 2.05% | 10.77 | Solid — maintain |
| `computer-science/f1-score-calculator` | 11 | 544 | 2.02% | 14.16 | Good — push to pos <10 |

---

## Execution Order Summary

```
WEEK 1  → ✅ decimal-land-calculator (done)
           ✅ shadow-length-calculator (done)
           ✅ land-price-calculator (done)
WEEK 2  → ✅ parking-space-calculator (done)
           ✅ air-conditioner-power-calculator (done)
           ✅ electric-motor-power-calculator (done)
WEEK 3  → ✅ hectare-to-acre-converter + acre-to-hectare-converter (done as pair)
           ✅ acre-to-square-feet-converter + wire-size-calculator (done — July 2026)
WEEK 4  → ✅ square-feet-to-acre-converter (done — July 2026)
           ✅ discount-calculator (done — July 2026)
           ✅ css-box-shadow-generator (done — July 2026)
WEEK 5  → ✅ capacitive-reactance-calculator (title/desc/keywords fix — July 2026)
           text-reverser
WEEK 6  → bandwidth-calculator, matrix-calculator
ONGOING → bmi-calculator, solar-panel-calculator, cloud-cost-calculator (long-term)
```

---

## Per-Tool Checklist (Run For Each Tool Above)

For each tool, verify both files using TOOL_SEO_REWRITE_GUIDE.md before marking done:

**seo-content.tsx:**
- [ ] Section 1 — 150–200 words, primary keyword bolded, users named
- [ ] Section 2 — formula block present
- [ ] Section 3 — 5–7 steps, each 2+ sentences, features list right column
- [ ] Section 4 — 6 use cases with specific numbers
- [ ] Section 5 — 5–6 tips + 4–5 mistakes, 2+ sentences each
- [ ] Section 6 — reference/benchmark table
- [ ] Section 7 — 8–10 FAQs, last one is privacy question
- [ ] Section 8 — 6 "Who Uses This" cards

**config.ts:**
- [ ] `seo.title` — ≤60 chars before pipe, primary keyword first, includes "Free" and "Online"
- [ ] `seo.description` — 130–155 chars, starts with action verb matching top GSC query intent
- [ ] `seo.keywords` — 15–25 items, built from actual GSC query data (not guesses)
- [ ] `seo.faq` — 8–10 items, plain text only, matches seo-content.tsx FAQ
- [ ] `seo.howToSteps` — 4–6 steps, matches seo-content.tsx section 3
- [ ] `relatedTools` — 4–6 slugs

---

*Last updated: July 2026 · Data source: GSC 28-day export · See also: TOOL_SEO_REWRITE_GUIDE.md, SEO_GROWTH_AUDIT.md*
