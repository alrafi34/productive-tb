/**
 * Builds tools/emoji-search-copy/emoji-data.json, the compact emoji list the
 * Emoji Search & Copy tool loads on demand.
 *
 * Sources (both MIT, devDependencies):
 *   - unicode-emoji-json: every fully-qualified emoji with its Unicode name,
 *     group and skin-tone support, in Unicode order
 *   - emojilib: search keywords for each emoji
 *
 * Output: { groups: string[], emoji: [char, name, groupIndex, keywords, skinTone][] }
 *
 * Usage: node scripts/build-emoji-data.mjs   (then commit the JSON)
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const byEmoji = require('unicode-emoji-json/data-by-emoji.json');
const keywords = require('emojilib');

const groups = [];
const emoji = [];
for (const [char, info] of Object.entries(byEmoji)) {
  let g = groups.indexOf(info.group);
  if (g === -1) g = groups.push(info.group) - 1;
  const name = info.name;
  const words = new Set(
    (keywords[char] ?? [])
      .map((w) => w.replace(/_/g, ' ').toLowerCase())
      .filter((w) => w && w !== name && !name.includes(w))
  );
  emoji.push([char, name, g, [...words].join(' '), info.skin_tone_support ? 1 : 0]);
}

const out = path.join(ROOT, 'tools/emoji-search-copy/emoji-data.json');
fs.writeFileSync(out, JSON.stringify({ groups, emoji }));
console.log(`build-emoji-data: ${emoji.length} emoji in ${groups.length} groups → ${path.relative(ROOT, out)} (${Math.round(fs.statSync(out).size / 1024)} KB)`);
