# Title & Meta Description Rewrites — 11 Priority Pages

**Repo:** `/Users/rafipersonal/Desktop/ptb/productive-tb`
**Files to edit:** `tools/<slug>/config.ts` → the `seo.title` and `seo.description` fields
**Date:** 2026-08-07

---

## Why these 11 pages

These pages already rank on page one but earn a fraction of the clicks their position should produce. The gap is in the search snippet, not the ranking — so this is the fastest available win.

| Page | Position | Impressions | Clicks | Current CTR | Expected at this position |
|---|---|---|---|---|---|
| decimal-land-calculator | 7.0 | 18,567 | 100 | 0.54% | ~4–5% |
| parking-space-calculator | 7.8 | 17,408 | 195 | 1.12% | ~4% |
| shadow-length-calculator | 7.3 | 9,866 | 146 | 1.48% | ~4% |
| electric-motor-power-calculator | 10.8 | 8,924 | 64 | 0.72% | ~2.5% |
| air-conditioner-power-calculator | 9.0 | 8,072 | 34 | 0.42% | ~3% |
| subdivision-cost-calculator | 7.5 | 5,691 | 65 | 1.14% | ~4% |
| katha-land-calculator | 8.6 | 5,463 | 19 | 0.35% | ~3% |
| land-price-calculator | 11.3 | 4,803 | 34 | 0.71% | ~2% |
| price-per-square-feet-calculator | 10.3 | 2,720 | 10 | 0.37% | ~2.5% |
| ups-load-calculator | 13.1 | 2,686 | 14 | 0.52% | ~1.5% |
| door-area-calculator | 8.1 | 2,531 | 35 | 1.38% | ~3% |

Some of this gap is structural — Google's own widgets and AI Overviews take clicks on certain queries and no title can win those back. But a 0.35% CTR at position 8.6 is far below what SERP features alone would explain.

---

## Decision required first: brand suffix

`app/layout.tsx` applies `template: '%s | Productive Toolbox'`, which consumes 21 characters. Google truncates titles around 60 characters, leaving only ~39 for the tool itself.

**Recommendation for these 11 pages: drop the suffix.** Google increasingly shows the site name separately in results, and for a domain without established brand recognition the suffix buys little while costing a third of the visible title.

In Next.js, bypass the template with `absolute`:

```ts
// in generateMetadata, app/tools/[tool]/[subtool]/page.tsx
title: seo.titleAbsolute
  ? { absolute: seo.titleAbsolute }
  : title,
```

Then add `titleAbsolute` to the 11 configs below. This keeps the template intact for the other ~480 tools.

**Alternative if you prefer keeping the suffix everywhere:** all the titles below are already ≤41 characters, so they fit within the 39-character budget with only minor trimming. Use them as `seo.title` and let the template append the brand. You will lose a few characters to truncation on the longest ones.

Either path works. Pick one and stay consistent so the results are measurable.

---

## The rewrites

Character counts exclude the brand suffix.

### 1. decimal-land-calculator

```
Title (41):  Decimal to Katha, Bigha & Sq Ft Converter
Description: Convert Decimal (Shotok) to Katha, Bigha, Acre and Square Feet. 1 Decimal = 435.6 sq ft. Regional presets for Bangladesh, West Bengal, Bihar and Nepal.
```

*Reasoning:* the current title leads with "Decimal Land Calculator", which matches almost nothing people actually type. GSC shows the traffic comes from conversion queries — `shotok to decimal`, `katha to decimal`, `decimal to square feet`. Leading with the conversion pair matches intent directly. The concrete number in the description gives a reason to click that competitors' generic copy doesn't.

### 2. parking-space-calculator

```
Title (41):  Parking Lot Layout Calculator — Free Tool
Description: Work out how many parking spaces fit your lot, including aisle width, accessible bays and layout angle. Free, runs in your browser, no sign-up.
```

*Reasoning:* GSC shows `free parking lot layout calculator` converting at 16.67% and `parking lot calculator` at 18.52%. The winning phrase is "parking lot", not "parking space" — lead with the words that already work.

### 3. shadow-length-calculator

```
Title (39):  Shadow Length Calculator by Time & Date
Description: Calculate shadow length from object height, latitude, date and time of day. For site planning, solar access studies and building setback checks.
```

*Reasoning:* "by time & date" signals the tool handles the variable people are actually solving for, separating it from static geometry calculators.

### 4. electric-motor-power-calculator

```
Title (40):  Motor Power Calculator — HP, kW, 3 Phase
Description: Convert motor power between HP and kW and find current draw for single-phase and three-phase motors at any voltage, efficiency and power factor.
```

*Reasoning:* professionals search by unit (`hp to kw motor`, `3 phase motor amps`). Putting the units in the title captures those variants and signals technical depth to an audience that skips consumer-grade tools.

### 5. air-conditioner-power-calculator

```
Title (39):  AC Power Consumption Calculator (Watts)
Description: Find how many watts your air conditioner uses and what it costs to run. Enter BTU or tonnage, hours per day and your electricity rate.
```

*Reasoning:* "AC" matches how people type it. "Consumption" and "Watts" match the actual question — running cost, not rated capacity.

### 6. subdivision-cost-calculator

```
Title (38):  Land Subdivision Cost Estimator — Free
Description: Estimate the cost of subdividing land — survey, permits, utilities, roads and engineering. Adjust each line item to match your local rates.
```

*Reasoning:* `free subdivision cost estimator` already converts at 19.2%. Match that phrasing exactly. The line-item list in the description proves the tool is more than a single multiplication.

### 7. katha-land-calculator

```
Title (41):  Katha to Sq Ft Calculator — BD, WB, Bihar
Description: Katha size varies by region — 720 sq ft in Bangladesh and West Bengal, 1,361.25 sq ft in Bihar. Convert to Sq Ft, Decimal, Bigha and Acre.
```

*Reasoning:* the weakest CTR on the list (0.35% at position 8.6). The regional variation is the single most useful thing this tool does and no competitor surfaces it in the snippet. Naming the regions in the title also picks up region-qualified queries.

### 8. land-price-calculator

```
Title (41):  Land Price Calculator per Decimal & Katha
Description: Work out total land price from a per-Decimal, per-Katha or per-Sq-Ft rate, and compare listings priced in different units side by side.
```

*Reasoning:* "per Decimal" is how prices are actually quoted in the market this page serves. Generic "land price calculator" competes with property portals; the unit qualifier does not.

### 9. price-per-square-feet-calculator

```
Title (40):  Price per Square Foot Calculator — Free
Description: Calculate price per square foot from total price and area, or work backwards to total cost. Converts between sq ft, sq m, Decimal and Katha.
```

*Reasoning:* the reverse calculation is the differentiator — most competing tools only go one direction.

### 10. ups-load-calculator

```
Title (33):  UPS Load & Backup Time Calculator
Description: Size a UPS for your load and estimate runtime from battery capacity. Enter appliance wattage, battery Ah and voltage to get backup hours.
```

*Reasoning:* "backup time" is the outcome people want; "load" alone is only half the job. Shortest title on the list, so there is room to keep the brand suffix here regardless of the decision above.

### 11. door-area-calculator

```
Title (35):  Door Area Calculator — Sq Ft & Sq M
Description: Calculate door area in square feet and square metres for single, double and sliding doors. For painting, glazing and material take-offs.
```

*Reasoning:* dual units in the title capture both measurement systems. The use cases in the description tell tradespeople this was built for their workflow.

---

## Implementation notes

- Edit only `seo.title` (or add `seo.titleAbsolute`) and `seo.description` in each config. Leave `keywords`, `openGraph`, `faq` and `howToSteps` alone.
- The `openGraph.title` fields can stay as they are — social cards have different constraints from search snippets and longer, more descriptive titles work fine there.
- After editing, rebuild and confirm the rendered titles:

```bash
for slug in decimal-land-calculator katha-land-calculator land-price-calculator; do
  curl -s "https://productivetoolbox.com/tools/land/$slug" | grep -o "<title>[^<]*</title>"
done
```

- Check that no title renders with the brand name twice, and that none exceeds 60 characters if you dropped the suffix, or 60 total if you kept it.

---

## Measuring the result

Do not request indexing for these — title changes get picked up on the next natural crawl, and these pages are already crawled frequently.

Note today's date. In four weeks, export GSC again and compare **CTR only, at matched position** for these 11 URLs. Position will drift for unrelated reasons; CTR at the same position is the clean signal.

Expected outcome if the hypothesis holds: CTR roughly doubles on the land and cost pages. The unit-conversion-adjacent pages will improve less, because Google's own widgets cap what any snippet can win.

If CTR does not move after six weeks at stable positions, the constraint is SERP features rather than copy — and the answer becomes building tools for queries Google does not answer itself, not more title iteration.
