/* Shared by the homepage hero search and the header search dialog. Takes the
   catalogue as an argument rather than importing it, so callers decide when
   the ~100 KB list is loaded — the header only fetches it on first open. */

type Searchable = { name: string; description: string };

/* Rank by match quality: exact name > name prefix > name substring > description.
   Ties go to the shorter name, which is usually the more general tool. */
export function searchTools<T extends Searchable>(
  list: readonly T[],
  query: string,
  limit: number
): { results: T[]; matchCount: number } {
  const q = query.trim().toLowerCase();
  if (!q) return { results: [], matchCount: 0 };

  const scored: { tool: T; score: number }[] = [];
  for (const tool of list) {
    const name = tool.name.toLowerCase();
    let score = -1;
    if (name === q) score = 0;
    else if (name.startsWith(q)) score = 1;
    else if (name.includes(q)) score = 2;
    else if (tool.description.toLowerCase().includes(q)) score = 3;
    if (score >= 0) scored.push({ tool, score });
  }
  scored.sort((a, b) => a.score - b.score || a.tool.name.length - b.tool.name.length);

  return { results: scored.slice(0, limit).map(s => s.tool), matchCount: scored.length };
}
