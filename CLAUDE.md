# Productive Toolbox – working notes

## Audience
- The site targets a **global audience, mainly the United States and Europe**.
  Nothing is Bangladesh- or South-Asia-centric: not the defaults, not the
  keywords, not the examples in page content.
- Page copy uses US/EU examples, units and currencies ($, €, £). Metric and
  imperial both appear where people use both.

## Values that differ by country
- Any value that varies by country or by user (price per kWh, tax/VAT rate,
  currency, weekend days, standing charges, interest rates …) is an **input**,
  never a hard-coded constant.
  - A handful of well-known choices (≈ 4–5) → a **dropdown**, with a custom
    value where it makes sense.
  - Anything unpredictable → a **free input box**.
- Defaults may be guessed from the visitor's timezone / browser language
  (see `guessCurrency` in the electric-bill and discount calculators), and
  must always stay editable.
- Presets based on published figures name their source and date in the UI.

## Content and SEO
- Tool content lives in `tools/<slug>/config.ts` (title, description,
  keywords, HowTo steps, FAQ → JSON-LD) and `seo-content.tsx` (visible copy).
  Keep the visible FAQ/steps identical to the schema ones.
- Titles ≤ 60 characters before the " | Productive Toolbox" suffix;
  meta descriptions ≤ 160 characters.
- After changing a tool's `config.ts` or `seo-content.tsx`, run
  `node scripts/content-dates.mjs` (needs full history:
  `git fetch --unshallow`) and commit `config/content-dates.ts`. Commits that
  touch those files without changing content carry `[no-content-date]`.

## Checks before pushing
- `pnpm build`, `npx tsc --noEmit -p .`, ESLint on changed files (compare with
  main — the repo has pre-existing warnings).
