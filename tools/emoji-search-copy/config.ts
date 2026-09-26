import { siteConfig } from "@/config/site";

export const emojiSearchCopyConfig = {
  name: "Emoji Search & Copy",
  slug: "emoji-search-copy",
  category: "creator",
  description: "Search 1,914 emoji by name or keyword, pick a skin tone and click to copy. Also copies shortcodes, Unicode code points and HTML codes.",
  icon: "😀",
  free: true,
  keywords: ["emoji search", "copy and paste emoji", "emoji copy", "emoji keyboard", "emoji list", "find emoji", "emoji meanings", "emoji unicode", "skin tone emoji"],
  seo: {
    title: "Emoji Search & Copy – Copy and Paste Emoji Online",
    description: "Search 1,914 emoji by name or keyword and click to copy and paste. Choose a skin tone and copy shortcodes, Unicode code points or HTML codes.",
    keywords: "emoji search, copy and paste emoji, emoji copy, emoji keyboard, emoji list, emoji unicode, skin tone emoji",
    openGraph: {
      title: "Emoji Search & Copy – Copy and Paste Emoji Online",
      description: "Search emoji by name or keyword, pick a skin tone and click to copy.",
      type: "website",
      url: `${siteConfig.url}/tools/creator/emoji-search-copy`,
    },
    howToSteps: [
      { name: "Search or browse", text: "Type a word such as heart, laugh or pizza, or pick a category tab." },
      { name: "Pick a skin tone", text: "Choose a skin tone once; people and hand emoji use it." },
      { name: "Click to copy", text: "Click an emoji to copy it; it also appears under Recently copied." },
      { name: "Copy codes if you need them", text: "Under the list, copy the emoji's shortcode, Unicode code point or HTML entity." },
    ],
    faq: [
      { q: "How do I copy an emoji?", a: "Search or browse, then click the emoji: it is copied to your clipboard, ready to paste into a message, document or social post with Ctrl+V (Cmd+V on a Mac) or a long press on a phone." },
      { q: "How do I get a different skin tone?", a: "Choose one of the five skin tone circles above the list. Every emoji that supports skin tones, such as 👍, 👋 and 🧑‍💻, then copies in that tone." },
      { q: "How many emoji are there?", a: "This list has 1,914 fully qualified emoji from the Unicode standard, in nine categories from Smileys & Emotion to Flags. With skin tone variants the Unicode total is over 3,700." },
      { q: "Why does an emoji look different on another device?", a: "Each platform draws emoji in its own style: Apple, Google, Microsoft and Samsung all have their own designs. The character is the same, only the artwork differs." },
      { q: "What are the Unicode code point and HTML code for?", a: "The code point (for example U+1F44D) identifies the emoji in the Unicode standard; the HTML entity (&#x1F44D;) lets you insert it into a web page even where you cannot type it." },
      { q: "Why do some emoji show as a box or two separate symbols?", a: "The device or font is older than the emoji. Newer emoji need a recent operating system; combined emoji such as family or profession emoji may appear as their separate parts on older systems." },
    ],
  },
};
