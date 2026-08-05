# Blog Feature — Backend & Database Analysis

> **Status:** Planning only. No code has been written or changed.
> **Date:** 2026-08-05
> **Scope:** Choose a database (SQL vs NoSQL, Supabase vs MongoDB) for a read-only blog section on Productive Toolbox, sized for growth toward ~1,000,000 posts.
> **Author constraint given:** Posts are inserted **directly into the database by the owner**. No admin UI, no upload form, no authentication, no multi-author workflow. The app's only job is to **read and display**.

---

## 1. Executive Summary

| Question | Answer |
|---|---|
| SQL or NoSQL? | **SQL (relational)** |
| Which product? | **Supabase (PostgreSQL)** |
| Weighted score | **Supabase 86.8 / 100** vs **MongoDB Atlas 70.1 / 100** |
| Runtime model | Next.js Server Components + ISR, **not** request-time DB calls |
| Critical design decision | **On-demand revalidation**, not time-based. Decouples DB read load from traffic entirely. |
| Biggest risk found in codebase | `app/sitemap.ts` is a single flat sitemap — it **breaks past 50,000 URLs**. Must be split before the blog ships. |

**The one-line reason:** your blog is a *read-only, relational, SEO-driven content set with a strict schema*. That is Postgres's home turf. MongoDB's advantages (flexible schema, embedded documents, high write throughput, sharding) are advantages for problems you explicitly do not have.

---

## 2. Codebase Analysis (what exists today)

### 2.1 Stack

| Item | Value | Source |
|---|---|---|
| Framework | Next.js **16.1.6** (App Router) | [package.json](../package.json) |
| React | 19.2.3 | [package.json](../package.json) |
| Language | TypeScript 5 (strict paths via `@/*`) | [tsconfig.json](../tsconfig.json) |
| Styling | Tailwind CSS v4 (PostCSS plugin) | [postcss.config.mjs](../postcss.config.mjs) |
| Package manager | pnpm (workspace file present) | [pnpm-workspace.yaml](../pnpm-workspace.yaml) |
| Hosting (inferred) | Vercel — `@vercel/analytics`, `@vercel/speed-insights` in root layout | [app/layout.tsx](../app/layout.tsx#L94-L95) |
| Analytics | GA4 `G-6FDH4F2C7M`, loaded `afterInteractive` | [app/layout.tsx](../app/layout.tsx#L97-L108) |
| Runtime deps | 9 total. `bcryptjs`, `qrcode`, `lucide-react` — all client-side tool code | [package.json](../package.json) |

### 2.2 Current backend footprint: effectively zero

This is the single most important finding.

- **No database.** No ORM, no driver, no connection code anywhere.
- **No `.env` / `.env.local` file** in the repo — there is no secrets-loading convention established yet.
- **No API routes** except one: [app/og/route.tsx](../app/og/route.tsx) (170 lines, OG image generation).
- **No auth.** `bcryptjs` exists only because [tools/bcrypt-hash-verifier/logic.ts](../tools/bcrypt-hash-verifier/logic.ts) is a *tool the user plays with in the browser*, not app authentication.
- **All 506 tools are pure client-side computation.** `tools/<slug>/logic.ts` files are pure functions; `ui.tsx` files are `"use client"`.

**Implication:** introducing a database is genuinely a *new architectural layer*, not an extension of an existing one. There is no existing pattern to conform to, which means you get a free choice — but it also means the blog will own every new convention (env var loading, server-only modules, data-access layer, error handling for network failures). Those conventions should be established deliberately in this feature.

### 2.3 Content architecture today

All content is **compile-time TypeScript**:

```
config/tools.ts        682 lines   Tool[] + Category[] registries
lib/tools-registry.ts  840 lines   slug → { config, Component } map (506 dynamic imports)
tools/                 506 dirs    config.ts / logic.ts / ui.tsx / seo-content.tsx per tool
```

Every tool page's SEO text lives in `seo-content.tsx` as JSX. Nothing is fetched. Nothing is dynamic. The entire site is statically generated from source files.

**This matters for the blog:** you are about to introduce the *first* content that lives outside git. That is a real change in operational posture — content can now change without a deploy, which is exactly what you want, but it also means content can now be *wrong or missing at runtime*, which never happens today. The plan below handles that with cached fallbacks.

### 2.4 Rendering strategy (already ISR-aware)

The tool detail route already uses incremental static regeneration:

```ts
// app/tools/[tool]/[subtool]/page.tsx:851-854
export const dynamicParams = true;
export const revalidate = 3600;
export async function generateStaticParams() { ... }
```

Category routes use `generateStaticParams()` over the 17 category slugs ([app/tools/[tool]/page.tsx:32](../app/tools/[tool]/page.tsx#L32)).

**This is good news.** The exact pattern the blog needs — `generateStaticParams` for a hot subset + `dynamicParams: true` for the long tail — is already understood and in production in this codebase. The blog is architecturally consistent with what's there, not a foreign body.

### 2.5 SEO infrastructure (mature — the blog must match it)

The tool pages set a high bar that the blog must clear, or the blog will drag down site quality signals:

| Signal | Implementation | File |
|---|---|---|
| Per-page metadata | `generateMetadata()` with title/description/keywords | [app/tools/[tool]/[subtool]/page.tsx](../app/tools/[tool]/[subtool]/page.tsx) |
| Canonical URLs | `alternates.canonical` on every tool page | same |
| OpenGraph + Twitter | Per-page, with dynamic OG images via `/og?title=` | same + [app/og/route.tsx](../app/og/route.tsx) |
| JSON-LD | `SoftwareApplication`, `FAQPage`, `HowTo` schemas | same |
| Organization schema | Root-level | [app/layout.tsx:69-76](../app/layout.tsx#L69-L76) |
| Title template | `%s \| Productive Toolbox` | [app/layout.tsx:23-26](../app/layout.tsx#L23-L26) |
| Sitemap | Generated from registries | [app/sitemap.ts](../app/sitemap.ts) |
| Breadcrumbs | Visual only (no `BreadcrumbList` JSON-LD yet) | [components/ToolLayout.tsx](../components/ToolLayout.tsx#L21-L35) |

**Gap to close for the blog:** `Article` / `BlogPosting` JSON-LD, `BreadcrumbList`, `article:published_time` / `article:modified_time` OG tags, author entity, and an RSS feed. All of these need fields that must exist **in the database schema from day one** — retrofitting them across 100k rows later is painful. The schema in §7 includes them.

### 2.6 Navigation — where the blog attaches

[components/Header.tsx:8-13](../components/Header.tsx#L8-L13):

```ts
const NAV = [
  { href: "/", label: "Home" },
  { href: "/tools", label: "Tools" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];
```

Adding `{ href: "/blog", label: "Blog" }` updates **both** desktop and mobile menus (they map the same array). One-line change. The header is `"use client"` — fine, the nav is static data.

[components/Footer.tsx](../components/Footer.tsx) has a hardcoded links block and a **non-functional newsletter form** (an `<input>` and `<button>` with no handler, line 62-70). Worth knowing: if you ever want that Subscribe box to work, it needs the same backend layer this blog is introducing. Out of scope here, but it's the second consumer of the database you're about to add.

### 2.7 Notable pre-existing issues (not blockers, but relevant)

1. **`app/sitemap.ts` is a single flat array.** Today ~525 URLs — fine. Next.js/Google cap a single sitemap at **50,000 URLs / 50MB uncompressed**. At 1M posts this silently breaks. Fix documented in §8.4.
2. **`components/ToolHeader.tsx`, `ToolFooter.tsx`, `ToolSidebar.tsx` are 0-byte stubs.** Dead files. Don't model blog components on them.
3. **Duplicate `.optimized` variants** exist (`next.config.optimized.ts`, `app/layout.optimized.tsx`, `NavigationProvider.optimized.tsx`, `.optimized.v2.tsx`). Unclear which is canonical. The blog should not add to this pattern.
4. **Footer category links reference `/tools/math`**, but no `math` category exists in `config/tools.ts` (it's `calculator`). Likely a dead link. Unrelated to the blog, but flagging since I found it.
5. **No markdown library installed.** [tools/markdown-previewer/logic.ts](../tools/markdown-previewer/logic.ts) is a hand-rolled 133-line parser built for a browser toy — it is **not** suitable for rendering trusted long-form article content (no sanitization, limited syntax). The blog will need a real markdown pipeline. See §9.

---

## 3. What the Blog Feature Actually Requires

Derived from your constraints, not assumed:

| # | Requirement | Consequence |
|---|---|---|
| R1 | Posts written **directly in the DB** by you | The DB's own data editor **is** the CMS. Its ergonomics are a first-class selection criterion, not a nice-to-have. |
| R2 | **No admin UI, no auth, no uploads** | Zero write paths from the app. The app connection can be **read-only**. Massive security simplification. |
| R3 | **Read-only display** | ~100% read workload. Write throughput is irrelevant. |
| R4 | SEO parity with tool pages | Schema must carry: canonical, meta title/desc, keywords, OG image, published/modified timestamps, author. |
| R5 | Listing, category, tag, pagination, related posts | **Relational access patterns.** Filter + sort + join + paginate. |
| R6 | Scale toward 1M posts | Indexing strategy and pagination strategy matter more than the DB engine choice. |
| R7 | Must not slow the site down | Cannot hit the DB per request. Must render statically. |

**R2 + R3 together are decisive.** You have removed every requirement that MongoDB is good at. What remains — structured, relational, query-heavy, read-only, schema-stable — is what Postgres is good at.

---

## 4. Scale Reality Check

Your stated target — "1,000 to 1,000,000 blogs" — has two readings. Both are addressed.

### 4.1 Reading A: 1M *posts* (content volume)

| Posts | Text @ ~8 KB avg | + indexes | Free tier fits? |
|---|---|---|---|
| 1,000 | 8 MB | ~12 MB | Yes, trivially |
| 10,000 | 80 MB | ~120 MB | Yes |
| 100,000 | 800 MB | ~1.2 GB | No → Supabase Pro (8 GB incl.) |
| 1,000,000 | 8 GB | ~12–15 GB | Pro + ~$1/mo storage overage |

**Verdict: storage is a non-issue.** 1M rows is a *small* Postgres table. Postgres handles this without partitioning, without sharding, without special configuration — provided the indexes in §7.3 exist and pagination is keyset-based (§8.5).

**The real constraint at 1M posts is not the database. It is the build and the sitemap.**

| Concern | At 1M posts | Mitigation |
|---|---|---|
| `generateStaticParams` returning 1M slugs | Build would take hours and exhaust memory | Return **top 500–1,000** only; `dynamicParams: true` handles the rest on demand (§8.2) |
| Sitemap 50,000 URL limit | Single sitemap breaks | `generateSitemaps()` → 20 chunked files (§8.4) |
| ISR cache entries on Vercel | 1M cached HTML pages, storage cost | Long/indefinite revalidate + on-demand purge only (§8.3) |
| `OFFSET 950000` pagination | Sequential scan, seconds per query | **Keyset pagination** (§8.5) |

Be realistic about one thing: publishing 1M posts by hand-inserting rows is not achievable at human speed. If 1M is the genuine target, that content is coming from bulk import or generation, which means you will eventually need a bulk-insert path (`COPY` / `INSERT ... SELECT` in Postgres — trivially available in the SQL editor, another point for SQL). Worth confirming — see §12.

### 4.2 Reading B: 1M *pageviews* (traffic volume)

**With the recommended architecture, database load is completely decoupled from traffic.**

| Model | DB queries at 1M views/day | Notes |
|---|---|---|
| Naive (query per request) | ~1,000,000/day (~12/s avg, far higher at peak) | Would need connection pooling, caching, probably a read replica |
| Time-based ISR (`revalidate = 3600`) | Up to ~24 queries/page/day × hot pages | At 1M pages this is genuinely dangerous: worst case ~278 queries/**second** |
| **On-demand ISR (recommended)** | **≈ number of posts you publish** | ~10–50 queries/**day**. Traffic is served entirely from Vercel's edge cache. |

This is the single highest-leverage decision in the whole plan, and it makes the database choice *less* critical than it first appears — because at ~50 queries/day, both Supabase and MongoDB are equally over-provisioned. The choice therefore comes down to **authoring ergonomics, schema safety, query expressiveness, and cost** — where the gap is wide.

---

## 5. Scoring Matrix — Supabase (PostgreSQL) vs MongoDB Atlas

Scores are 0–10 against **your specific requirements**, not in the abstract. Weights sum to 100.

| # | Criterion | Weight | Supabase | MongoDB Atlas | Why |
|---|---|---:|---:|---:|---|
| 1 | **Authoring directly in the DB (R1)** | 14 | **9** | 6 | Supabase Studio has a spreadsheet-style row editor with an expandable text area per field, plus a full SQL editor for bulk work. Atlas Data Explorer edits raw JSON — writing a 2,000-word markdown body inside a JSON string field, escaping newlines and quotes, is genuinely unpleasant. This is your daily workflow, so it carries the highest weight. |
| 2 | Read performance under ISR | 8 | 9 | 9 | Both trivially fast for single-document/row lookups by indexed slug. No meaningful difference. |
| 3 | **Serverless / Vercel connection model** | 11 | **9** | 6 | `supabase-js` talks HTTP to PostgREST — stateless, no connection pool to exhaust, works in any runtime including edge. MongoDB's driver holds TCP connections; in serverless you must cache a global client and still risk pool exhaustion on cold-start storms. Atlas's HTTPS Data API (the stateless escape hatch) was **retired in 2025** — verify current status before relying on any HTTP path. |
| 4 | **Relational query needs (R5)** | 9 | **9** | 7 | Category pages, tag pages, author pages, related-posts, and "N posts per tag" are joins. Postgres does them in one declarative query. Mongo needs `$lookup` aggregations or denormalization-plus-manual-consistency. |
| 5 | Full-text search | 7 | 8 | **9** | Mongo wins here honestly: Atlas Search is Lucene-backed with better relevance ranking and fuzzy matching out of the box. Postgres `tsvector` + GIN is very good and needs no extra service; Supabase also offers `pg_trgm` and pgvector for semantic search later. Mongo's edge is real but narrow. |
| 6 | Scale to 1M+ documents | 10 | 9 | 9 | Both handle 1M records without breaking a sweat. Mongo's sharding advantage only matters at scales far beyond this, and only for write-heavy workloads. Tie. |
| 7 | **Schema integrity / SEO field safety (R4)** | 8 | **9** | 6 | `UNIQUE` on slug, `NOT NULL` on meta fields, `CHECK` constraints, and enums make a malformed post *impossible to insert*. Since you insert by hand with no validation UI, the database being strict is a feature, not friction — it is your only safety net. Mongo's `$jsonSchema` validators are opt-in and weaker. |
| 8 | Image / asset storage | 6 | **9** | 3 | Supabase Storage is built in, S3-compatible, CDN-backed, and referenced by the same project. MongoDB has no object storage — cover images need Cloudinary / S3 / Vercel Blob as a separate vendor. |
| 9 | Cost curve (1k → 1M posts) | 8 | 8 | 7 | Supabase Free → Pro $25/mo (8 GB DB, 250 GB egress). Atlas M0 free → M10 ≈ $57/mo. Similar shape; Supabase cheaper at the tier you'd land on, and bundles storage + CDN. |
| 10 | Ops: backups, restore, branching | 6 | 8 | 8 | Both offer managed backups and PITR on paid tiers. Supabase has database branching; Atlas has mature multi-region ops. Effectively a tie for a blog. |
| 11 | TypeScript DX | 6 | **9** | 6 | `supabase gen types typescript` produces exact row types from the live schema — meaningful in a strict-TS codebase like this one. Mongo types are hand-written interfaces that can silently drift from actual document shape. |
| 12 | Schema flexibility | 4 | 7 | **9** | Mongo's genuine strength. Mitigated in Postgres by a `jsonb` column for evolving/optional content blocks — you get flexibility where you want it and rigidity where you need it. |
| 13 | Portability / lock-in | 3 | 8 | 7 | Supabase is stock Postgres — `pg_dump` and move to Neon, RDS, or self-hosted. Mongo data is portable too, but Atlas Search / Triggers are vendor-specific. |
| | **Weighted total** | **100** | **86.8** | **70.1** | |

### 5.1 Score summary

| Product | Weighted score | Grade |
|---|---:|---|
| **Supabase (PostgreSQL)** | **86.8 / 100** | **A** — Recommended |
| MongoDB Atlas | 70.1 / 100 | C+ — Workable, but fights the use case |

### 5.2 Where MongoDB genuinely wins

Stated plainly so this reads as analysis rather than advocacy:

- **Full-text search quality** (criterion 5) — Atlas Search is better than `tsvector`.
- **Schema flexibility** (criterion 12) — if post structure will vary wildly per post, documents are more natural.
- **Write-heavy scale** — irrelevant here (R3), but real.

If your posts were heterogeneous nested block structures (Notion-style) *and* search relevance were the headline feature, MongoDB would be a defensible pick. Neither is true for a markdown blog.

---

## 6. SQL vs NoSQL — The Verdict

**SQL. Clearly, and for reasons specific to your constraints:**

1. **Your data is relational.** Post → category (many-to-one), post ↔ tags (many-to-many), post → author (many-to-one), post ↔ related posts (many-to-many). Four relationships in the core model. That is a relational schema.
2. **Your schema is stable.** A blog post has had the same shape for twenty years: title, slug, body, date, author, tags, meta. Schema flexibility buys you nothing when the schema doesn't change.
3. **You insert by hand with no validation layer.** Constraints (`UNIQUE`, `NOT NULL`, `CHECK`, foreign keys) are your *only* protection against a typo shipping a broken page to Google. In MongoDB, a typo'd field name inserts silently and the page renders blank. **This argument alone is close to decisive given R1 + R2.**
4. **SEO needs precise, guaranteed fields.** Structured data is unforgiving — a missing `datePublished` invalidates the `BlogPosting` schema. Enforce it at the column level.
5. **1M rows is not "big data."** NoSQL's scaling story is about horizontal write distribution. You have a read-only workload of 8 GB. A single Postgres instance is enormously over-provisioned for it.

**Counter-argument, fairly stated:** MongoDB's document model maps 1:1 to a JSON API response and requires no joins if you denormalize tags/category into the post document. For a blog this simple, that is a legitimate design and it would work. It is not *wrong* — it is just measurably worse on the criteria that matter most to you (authoring ergonomics and integrity), and better only on one that matters least (flexibility).

---

## 7. Proposed Schema (Postgres / Supabase) — Design Only

> Not applied. For review.

### 7.1 Enums & extensions

```sql
create extension if not exists "pg_trgm";     -- fuzzy search
create extension if not exists "unaccent";    -- accent-insensitive search

create type post_status as enum ('draft', 'published', 'archived');
```

### 7.2 Tables

```sql
-- ── authors ──────────────────────────────────────────────
create table authors (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  name        text not null,
  bio         text,
  avatar_url  text,
  links       jsonb default '{}'::jsonb,   -- { twitter, linkedin, website }
  created_at  timestamptz not null default now()
);

-- ── blog categories (separate from tool categories) ──────
create table blog_categories (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null,
  name         text not null,
  description  text,
  icon         text,
  meta_title   text,
  meta_desc    text,
  sort_order   int not null default 0,
  created_at   timestamptz not null default now()
);

-- ── tags ─────────────────────────────────────────────────
create table tags (
  id    uuid primary key default gen_random_uuid(),
  slug  text unique not null,
  name  text not null
);

-- ── posts ────────────────────────────────────────────────
create table posts (
  id               uuid primary key default gen_random_uuid(),
  slug             text unique not null
                     check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),

  title            text not null check (char_length(title) between 10 and 200),
  excerpt          text not null check (char_length(excerpt) between 50 and 320),
  body_md          text not null,               -- markdown source
  body_html        text,                        -- optional pre-rendered cache

  cover_image_url  text,
  cover_image_alt  text,

  category_id      uuid references blog_categories(id) on delete set null,
  author_id        uuid references authors(id)         on delete set null,

  status           post_status not null default 'draft',
  featured         boolean not null default false,

  -- SEO (mirrors the tool-page metadata contract)
  meta_title       text,
  meta_description text,
  keywords         text[] default '{}',
  canonical_url    text,
  og_image_url     text,
  no_index         boolean not null default false,

  reading_minutes  int,
  published_at     timestamptz,
  updated_at       timestamptz not null default now(),
  created_at       timestamptz not null default now(),

  extra            jsonb not null default '{}'::jsonb,  -- escape hatch

  -- generated search index
  search_vector    tsvector generated always as (
                     setweight(to_tsvector('english', coalesce(title,'')),   'A') ||
                     setweight(to_tsvector('english', coalesce(excerpt,'')), 'B') ||
                     setweight(to_tsvector('english', coalesce(body_md,'')), 'C')
                   ) stored,

  -- a published post must have a date
  constraint published_needs_date
    check (status <> 'published' or published_at is not null)
);

-- ── post ↔ tag join ──────────────────────────────────────
create table post_tags (
  post_id uuid references posts(id) on delete cascade,
  tag_id  uuid references tags(id)  on delete cascade,
  primary key (post_id, tag_id)
);

-- ── manual related posts (optional; falls back to tag overlap) ──
create table post_related (
  post_id    uuid references posts(id) on delete cascade,
  related_id uuid references posts(id) on delete cascade,
  position   int not null default 0,
  primary key (post_id, related_id),
  check (post_id <> related_id)
);
```

**Note the `published_needs_date` CHECK constraint.** That is precisely the class of protection you cannot get from MongoDB without extra work — and precisely what you need when the "publish button" is a hand-typed `UPDATE`.

### 7.3 Indexes (the part that actually determines 1M-row performance)

```sql
-- listing: newest published first  (the hot query)
create index posts_published_idx
  on posts (published_at desc, id desc)
  where status = 'published';

-- category listing
create index posts_category_idx
  on posts (category_id, published_at desc)
  where status = 'published';

-- featured strip
create index posts_featured_idx
  on posts (published_at desc)
  where status = 'published' and featured = true;

-- full-text search
create index posts_search_idx on posts using gin (search_vector);

-- fuzzy title search / "did you mean"
create index posts_title_trgm_idx on posts using gin (title gin_trgm_ops);

-- tag pages (reverse direction of the PK)
create index post_tags_tag_idx on post_tags (tag_id, post_id);
```

Partial indexes (`where status = 'published'`) keep the index small and hot — at 1M rows with drafts and archives mixed in, this is a meaningful win.

### 7.4 Security posture (RLS) — important given R2

```sql
alter table posts           enable row level security;
alter table blog_categories enable row level security;
alter table tags            enable row level security;
alter table post_tags       enable row level security;
alter table authors         enable row level security;

-- anonymous key can read ONLY published posts
create policy "public reads published posts"
  on posts for select
  to anon
  using (status = 'published' and published_at <= now());

create policy "public reads taxonomy" on blog_categories for select to anon using (true);
create policy "public reads tags"     on tags            for select to anon using (true);
create policy "public reads post_tags" on post_tags      for select to anon using (true);
create policy "public reads authors"   on authors        for select to anon using (true);
```

**Three rules to write into the project conventions:**

1. The app uses the **anon key only**. Never the `service_role` key in application code — it bypasses RLS entirely.
2. No `INSERT` / `UPDATE` / `DELETE` policies exist for `anon`. The app is structurally read-only, matching R2.
3. `published_at <= now()` gives you **free scheduled publishing** — set a future date and the post appears on its own (with on-demand revalidation you'd still need a nudge; see §12 Q4).

### 7.5 Equivalent MongoDB model (for completeness)

If you overrule the recommendation, this is the shape to use — single collection, denormalized:

```js
{
  _id: ObjectId,
  slug: "how-to-calculate-bmi",         // unique index
  title, excerpt, bodyMd,
  cover: { url, alt },
  category: { slug, name },              // denormalized
  tags: [{ slug, name }],                // denormalized array
  author:  { slug, name, avatarUrl },    // denormalized
  status: "published",
  seo: { metaTitle, metaDescription, keywords: [], canonical, ogImage, noIndex },
  readingMinutes, featured,
  publishedAt: ISODate, updatedAt: ISODate, createdAt: ISODate
}
```

Indexes: `{slug:1}` unique, `{status:1, publishedAt:-1}`, `{"category.slug":1, publishedAt:-1}`, `{"tags.slug":1, publishedAt:-1}`, plus an Atlas Search index on `title`/`excerpt`/`bodyMd`. Add a `$jsonSchema` validator to recover *some* of the integrity you lose. Denormalizing author/category means renaming a category requires updating every affected document — accept that trade knowingly.

---

## 8. Rendering & Scaling Architecture

### 8.1 Route plan

| Route | Rendering | Notes |
|---|---|---|
| `/blog` | Static + on-demand revalidate | Latest N posts, featured strip |
| `/blog/page/[page]` | Static (first ~5) + `dynamicParams` | Path-based pagination is more SEO-friendly than `?page=` |
| `/blog/[slug]` | `generateStaticParams` (top 500–1000) + `dynamicParams: true` | Mirrors the existing tool-route pattern |
| `/blog/category/[category]` | Static, all categories prebuilt | Small, bounded set |
| `/blog/tag/[tag]` | `dynamicParams: true` | Tags can be numerous |
| `/blog/author/[slug]` | Static | Optional |
| `/blog/rss.xml` | Route handler, revalidated | Latest 50 posts |
| `/api/revalidate` | Route handler, `POST`, secret-guarded | Called by Supabase DB webhook |

> **Namespace warning:** do **not** put blog categories under `/blog/[category]/[slug]` — that would replicate the ambiguous dual-purpose `[tool]` segment you already have in `app/tools/[tool]/page.tsx`, which currently has to disambiguate "is this a category or a tool slug?" at runtime. Use explicit `/blog/category/...` and `/blog/tag/...` prefixes and keep `/blog/[slug]` unambiguous.

### 8.2 Build strategy at 1M posts

```ts
// conceptual — app/blog/[slug]/page.tsx
export const dynamicParams = true;   // long tail renders on first request
export const revalidate = false;     // never expire on a timer; purge on demand

export async function generateStaticParams() {
  // prebuild only the hot set — NOT all 1M
  const posts = await getRecentPostSlugs({ limit: 1000 });
  return posts.map(slug => ({ slug }));
}
```

Cost of this design: the very first visitor to a cold long-tail post waits for one DB query + render (~100–300 ms). Every visitor after that is served from cache. That is the correct trade at this scale.

### 8.3 On-demand revalidation (the key scaling decision)

```
You UPDATE a row in Supabase Studio
        │
        ▼
Supabase Database Webhook (pg_net, built in)
        │  POST { slug, event } + secret header
        ▼
/api/revalidate  →  revalidatePath('/blog/' + slug)
                    revalidatePath('/blog')
                    revalidateTag('blog-index')
```

**Result: DB queries ≈ publish events (~10–50/day), regardless of whether the site serves 1,000 or 10,000,000 pageviews.** Traffic is served entirely from Vercel's edge cache.

This is why the earlier claim holds — at this load, the database engine choice is not a performance decision. It is an ergonomics, integrity, and cost decision. That reframing is what the scoring in §5 reflects.

Supabase's Database Webhooks are a built-in feature (a `pg_net` trigger under the hood). MongoDB's equivalent is Atlas Triggers — functional, but a separate App Services surface whose neighbouring products (Data API, Device Sync) have been getting retired, so verify current support before depending on it.

**Fallback:** if webhooks fail, keep a long safety-net `revalidate` (e.g. 86400) so content is never permanently stale.

### 8.4 Sitemap — must be fixed before launch

Current [app/sitemap.ts](../app/sitemap.ts) returns one flat array. Adding blog posts to it breaks at 50,000 URLs.

Plan:
- Keep `app/sitemap.ts` for static pages + categories + the 506 tools (~525 URLs) — unchanged.
- Add a **separate** `app/blog/sitemap.ts` using `generateSitemaps()` returning `{ id: 0..N }` chunks of 25,000 posts each. Next.js emits a sitemap index automatically.
- Add both to `app/robots.ts`.
- Feed `lastModified` from `posts.updated_at` — real timestamps rather than the current `BUILD_DATE` placeholder, which is a genuine SEO improvement over the tool sitemap's approach.

At 1M posts that's 40 sitemap files. Normal and well-supported by Google.

### 8.5 Pagination — keyset, not OFFSET

```sql
-- WRONG at scale: OFFSET 950000 forces Postgres to walk 950k rows
select * from posts where status='published'
order by published_at desc limit 20 offset 950000;

-- RIGHT: keyset / cursor — constant time at any depth
select * from posts
where status = 'published'
  and (published_at, id) < ($1, $2)     -- cursor from the last row of prior page
order by published_at desc, id desc
limit 20;
```

Matches `posts_published_idx` exactly. For SEO-crawlable `/blog/page/[n]` URLs, cap the crawlable depth (e.g. 50 pages) and rely on category/tag pages plus the sitemap for deep discovery — Google does not need to paginate through 50,000 index pages.

### 8.6 Data access layer

Create `lib/blog/` as **server-only** modules:

```
lib/blog/client.ts     createClient() with anon key, server-only
lib/blog/queries.ts    getPost, getPosts, getByCategory, getByTag, search, getRelated
lib/blog/types.ts      generated via `supabase gen types typescript`
lib/blog/markdown.ts   markdown → sanitized HTML
```

Add `import "server-only"` at the top of `client.ts`. This is important: the codebase is overwhelmingly `"use client"` (all 506 tool UIs), so an accidental client import of DB code is a realistic mistake. Make it a build error.

Query rules:
- **Never `select('*')`** on list views — `body_md` is the largest column and lists don't need it. This is your main egress cost lever.
- Select explicit columns; fetch `body_md` only in `/blog/[slug]`.
- One query per page (use Postgres joins) — no N+1 loops over tags.

---

## 9. Markdown Rendering

The existing [tools/markdown-previewer/logic.ts](../tools/markdown-previewer/logic.ts) is a 133-line hand-rolled parser for a browser toy. **Do not reuse it for article rendering** — no sanitization, incomplete syntax support.

Recommended pipeline, rendered **server-side at ISR time** (zero client JS, consistent with the site's performance posture):

| Concern | Choice |
|---|---|
| Parser | `remark` / `rehype` (unified), or `markdown-it` |
| Sanitization | `rehype-sanitize` — required even for self-authored content, since HTML in markdown is a real XSS surface |
| Code highlighting | `rehype-pretty-code` / `shiki` — build-time, no runtime cost |
| Headings + anchors | `rehype-slug` + `rehype-autolink-headings` → enables a table of contents |

Optional optimization: persist rendered HTML into `posts.body_html` so ISR renders don't re-parse markdown. Adds a cache-invalidation concern; only worth it if render time becomes measurable. Start without it.

---

## 10. Integration Points (files that will change when implemented)

> Listed for planning approval. **Nothing has been modified.**

| File | Change | Size |
|---|---|---|
| [components/Header.tsx](../components/Header.tsx#L8-L13) | Add `{ href: "/blog", label: "Blog" }` to `NAV` | 1 line (covers desktop + mobile) |
| [components/Footer.tsx](../components/Footer.tsx) | Add Blog link to Company column | 1 line |
| [app/robots.ts](../app/robots.ts) | Register blog sitemap index | small |
| [app/sitemap.ts](../app/sitemap.ts) | Leave as-is; add separate `app/blog/sitemap.ts` | new file |
| [config/site.ts](../config/site.ts) | Optionally add blog defaults (OG image, author) | small |
| `package.json` | Add `@supabase/supabase-js`, markdown pipeline | +4–6 deps |
| `.env.local` + Vercel env | `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `REVALIDATE_SECRET` | **first env vars in this project** |
| `app/blog/**` | All new routes | new |
| `lib/blog/**` | Data access layer | new |
| `components/blog/**` | PostCard, PostList, Pagination, TOC, ShareButtons | new |
| [docs/structure/Structure.md](./structure/Structure.md) | Document the blog tree | doc update |

**No existing tool code is touched.** The blog is fully additive.

---

## 11. Risks & Mitigations

| Risk | Severity | Mitigation |
|---|---|---|
| **Supabase free tier pauses after ~7 days of inactivity** | High | With on-demand ISR the site keeps serving cached HTML even while the DB is paused — but *new* builds would fail. Upgrade to Pro ($25/mo) before serious traffic, or keep a scheduled ping. Verify current free-tier policy at signup. |
| Sitemap breaks past 50k URLs | High | §8.4 — split before the blog ships, not after |
| Accidental `service_role` key in client code | High | Anon key + RLS only; `import "server-only"`; never prefix a secret with `NEXT_PUBLIC_` |
| Build timeout if `generateStaticParams` returns everything | High | Cap at ~1,000; `dynamicParams: true` |
| `OFFSET` pagination degrading at depth | Medium | Keyset pagination from day one (§8.5) |
| Egress cost from `select('*')` on lists | Medium | Explicit column selection; `body_md` only on detail pages |
| DB down during a revalidation | Medium | Next.js serves stale cache on fetch failure; add explicit try/catch returning cached data |
| Thin/duplicate blog content harming site-wide SEO | Medium | Your tool pages have strong quality signals — mass-published thin posts can drag the whole domain down. Enforce minimum length; use `no_index` for weak posts. |
| Broken JSON-LD from missing fields | Medium | `NOT NULL` + `CHECK` constraints (§7.2) make it structurally impossible |
| Slug typos creating 404s + orphan URLs | Low | `CHECK (slug ~ '^[a-z0-9-]+$')` + `UNIQUE` |
| XSS via raw HTML in markdown | Low (self-authored) | `rehype-sanitize` regardless |

---

## 12. Open Questions (need your answers before implementation)

1. **Is 1,000,000 posts a real target, or shorthand for "a lot"?** It changes the plan materially — 1M means bulk import tooling and sitemap chunking are day-one requirements; 1,000–10,000 means a much simpler build.
2. **If 1M is real, where does the content come from?** Hand-inserting rows does not reach 1M. If it's bulk import or generation, I should plan a `COPY`/bulk-insert path and address thin-content SEO risk seriously.
3. **URL shape:** `/blog/[slug]` (flat, recommended — best for SEO and permalink stability) or `/blog/[category]/[slug]` (nested, matches your tools convention)?
4. **Scheduled publishing:** do you want future-dated posts to auto-appear? With pure on-demand revalidation they need a nudge — a daily cron. Only worth building if you'll use it.
5. **Comments / newsletter?** You said display-only. Confirming, because the Footer's dead Subscribe form is the obvious next backend consumer, and knowing now affects whether the schema needs anything.
6. **Cover images:** Supabase Storage (bundled, recommended), or `/public` in the repo, or an external CDN?
7. **Body format:** plain markdown (recommended — simplest to hand-write in Studio), or MDX with embedded React components (e.g. embedding your calculators inside articles — powerful for internal linking, but MDX cannot be safely rendered from a database without a compile step)?

---

## 13. Final Recommendation

**Use Supabase (PostgreSQL). SQL, not NoSQL.**

Ranked reasons:

1. **Your authoring workflow *is* the database UI** (R1). Supabase Studio is a usable markdown-authoring surface; Atlas's JSON editor is not. This is your everyday experience, so it is weighted highest.
2. **Constraints replace the admin UI you deliberately aren't building** (R2). `UNIQUE`, `NOT NULL`, `CHECK`, enums, and foreign keys are the validation layer you skipped. In MongoDB, a hand-typed mistake ships silently to Google.
3. **The data is relational** (R5) — posts ↔ tags ↔ categories ↔ authors. Four relationships in the core model.
4. **Serverless connection model is strictly better** — PostgREST over HTTP has no pool to exhaust; Atlas's stateless HTTP option was retired.
5. **Storage + CDN + webhooks are bundled** — one vendor instead of three.
6. **1M rows is small for Postgres.** The bottleneck is your build and sitemap, not the engine — and both are solved in §8 independent of which database you pick.

**MongoDB is not a bad choice — it is a mismatched one.** It is optimized for flexible schemas and write-heavy distributed workloads. Your blog has a fixed schema and essentially no writes. You would be paying MongoDB's costs (weaker integrity, awkward authoring, joins via aggregation, external image storage) for benefits you will never use.

**Runner-up worth knowing about:** for a blog you author yourself with no admin UI, MDX files committed to the repo is genuinely the lowest-complexity option — zero infrastructure, content versioned in git, no runtime failure mode at all. You have explicitly chosen the database path (and you've said backend is the next thing you want to build, which is a good reason on its own), so this plan commits to Supabase. Noting it only so the trade-off is on the record: you are accepting operational surface in exchange for editing content without a deploy — which becomes clearly the right trade somewhere north of a few hundred posts.

---

## 14. Suggested Implementation Order

*Not started — awaiting your approval.*

| Phase | Work | Est. |
|---|---|---|
| 0 | Answer §12 questions; lock schema | — |
| 1 | Supabase project, SQL schema, indexes, RLS, type generation | 0.5 day |
| 2 | `lib/blog/` data layer + markdown pipeline | 1 day |
| 3 | `/blog` index + `/blog/[slug]` with full SEO parity (metadata, JSON-LD, OG, breadcrumbs) | 1.5 days |
| 4 | Category + tag + pagination routes | 1 day |
| 5 | Sitemap split + RSS + robots + Header/Footer links | 0.5 day |
| 6 | On-demand revalidation webhook + secret | 0.5 day |
| 7 | Seed 5–10 real posts; verify Rich Results, Lighthouse, Search Console | 0.5 day |

**Total: ~5.5 days** to a production blog that matches the tool pages' SEO quality and scales to 1M posts without re-architecture.

---

*This document is analysis and planning only. No source files were created, modified, or deleted.*
