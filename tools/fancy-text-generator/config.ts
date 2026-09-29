import { siteConfig } from "@/config/site";

export const fancyTextGeneratorConfig = {
  name: "Fancy Text Generator",
  description: "Turn text into bold, italic, script, Gothic, bubble and other Unicode fonts you can copy and paste into Instagram, X, TikTok and more.",
  icon: "✨",
  category: "writing",
  slug: "fancy-text-generator",
  seo: {
    title: "Fancy Text Generator – Copy and Paste Fonts for Instagram",
    description: "Convert text into 26 copy-and-paste fonts: bold, italic, cursive script, Gothic, bubble, small caps, strikethrough and more, for Instagram bios, X and TikTok.",
    keywords: [
      "fancy text generator",
      "font generator",
      "copy and paste fonts",
      "instagram fonts",
      "cursive font generator",
      "bold text generator",
      "italic text generator",
      "gothic font generator",
      "bubble text",
      "strikethrough text",
      "small caps generator",
      "unicode text converter",
    ],
    og: {
      title: "Fancy Text Generator – Copy and Paste Fonts for Instagram",
      description: "Convert text into 26 copy-and-paste fonts: bold, italic, cursive script, Gothic, bubble, small caps, strikethrough and more, for Instagram bios, X and TikTok.",
      url: `${siteConfig.url}/tools/writing/fancy-text-generator`,
    },
    howToSteps: [
      { name: "Type your text", text: "Enter or paste the words you want to style, such as a name, a bio line or a caption." },
      { name: "Browse the styles", text: "Every style updates as you type, from bold and italic to script, Gothic, bubble and strikethrough." },
      { name: "Copy a style", text: "Click Copy next to the one you like; it goes to your clipboard as plain text." },
      { name: "Paste it anywhere", text: "Paste it into an Instagram or TikTok bio, a post on X, a Discord name or a message, where it keeps its look." },
    ],
    faq: [
      { q: "How does a fancy text generator work?", a: "It swaps each letter for a look-alike Unicode character, such as 𝐀 (Mathematical Bold Capital A) or Ⓐ (Circled Latin Capital A). These are ordinary characters rather than a font, so they keep their style wherever plain text can be pasted." },
      { q: "Where can I use these fonts?", a: "In most places that accept text: Instagram, TikTok and X bios and posts, Facebook, Discord, WhatsApp and many games. A few sites strip or block unusual characters in usernames, and older devices may show empty boxes for symbols they lack." },
      { q: "Why do some letters or numbers stay plain?", a: "Unicode has no styled version of every character. Italic, script and Gothic have no digits, superscript lacks a few capitals, subscript covers only some lowercase letters, and accented letters and punctuation are left as they are." },
      { q: "Are fancy fonts accessible?", a: "Not very. Screen readers may read each character by its name, like \"mathematical bold capital H\", or skip it, and the text is harder to find with search. Use styled text for a few words of decoration, not for whole posts or important information." },
      { q: "Will fancy text hurt my SEO or hashtags?", a: "Search engines and hashtag search treat 𝐡𝐞𝐥𝐥𝐨 as different characters from hello, so styled words may not be found. Keep keywords, hashtags and your name in plain text." },
    ],
  },
};
