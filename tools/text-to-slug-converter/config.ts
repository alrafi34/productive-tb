import { siteConfig } from "@/config/site";

export const textToSlugConverterConfig = {
  id: "text-to-slug-converter",
  slug: "text-to-slug-converter",
  name: "Text to Slug Converter",
  description: "Turn titles into clean, SEO-friendly URL slugs, one at a time or in bulk, with accent removal, stop-word filtering and a length limit.",
  category: "writing",
  icon: "🔗",
  seo: {
    title: "Slug Generator – Convert Titles to SEO-Friendly URLs",
    description: "Turn any title into a clean URL slug: lowercase, hyphens, accents removed (café → cafe, ß → ss), optional stop words and length limit. Bulk mode and CSV export.",
    keywords: [
      "slug generator",
      "text to slug converter",
      "url slug generator",
      "slugify online",
      "title to slug",
      "permalink generator",
      "seo friendly url",
      "bulk slug generator",
      "wordpress slug",
      "url slug best practices",
    ],
    og: {
      title: "Slug Generator – Convert Titles to SEO-Friendly URLs",
      description: "Turn any title into a clean URL slug: lowercase, hyphens, accents removed (café → cafe, ß → ss), optional stop words and length limit. Bulk mode and CSV export.",
      url: `${siteConfig.url}/tools/writing/text-to-slug-converter`,
    },
    howToSteps: [
      { name: "Enter a title", text: "Type or paste a page or post title in single mode, or switch to bulk mode and paste one title per line." },
      { name: "Choose the options", text: "Pick the separator (hyphen is recommended for URLs), and decide whether to lowercase, remove accents, keep numbers and drop short stop words such as a, the and of." },
      { name: "Set a length limit if needed", text: "Enter a maximum length and the slug is cut at the last whole word that fits, never in the middle of a word." },
      { name: "Copy or export", text: "Copy the slug or the full URL with your base address, or download bulk results as TXT or CSV." },
    ],
    faq: [
      { q: "What is a URL slug?", a: "The part of a URL that names a specific page, usually made from its title. In example.com/blog/best-coffee-grinders, the slug is best-coffee-grinders. A good slug is short, readable and describes the page." },
      { q: "Should I use hyphens or underscores in URLs?", a: "Hyphens. Google's URL guidelines recommend hyphens to separate words, because underscores join words together: best_coffee may be read as one word, bestcoffee, while best-coffee is read as two." },
      { q: "How long should a slug be?", a: "Short enough to read at a glance: three to five meaningful words, or roughly 60 characters at most, is a common guideline. There is no hard limit, but long slugs get cut off in search results and are harder to share." },
      { q: "Should I remove stop words like 'a', 'the' and 'of'?", a: "Often, yes: how-to-choose-a-coffee-grinder becomes how-choose-coffee-grinder. Keep them when removing them changes the meaning or makes the slug hard to read, such as in the-who or to-be-or-not-to-be." },
      { q: "How are accented and special characters handled?", a: "With accent removal on, letters are turned into plain ASCII: café becomes cafe, Straße becomes strasse and Ørsted becomes orsted. The & sign becomes and, apostrophes are dropped (don't → dont), and all other punctuation separates words." },
      { q: "Can a URL slug contain non-English characters?", a: "Yes. Browsers and search engines support Unicode URLs, so café or münchen can stay as they are when you turn accent removal off. They are sent percent-encoded (caf%C3%A9) when copied, so plain ASCII slugs are easier to share." },
      { q: "Should I change the slug of a published page?", a: "Only with care. A new slug is a new URL, so add a 301 redirect from the old one to keep links and rankings; otherwise visitors and search engines hit a 404 page." },
      { q: "Is my text uploaded anywhere?", a: "No. We do not collect or store what you enter." },
    ],
  },
};
