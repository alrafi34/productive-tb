import { siteConfig } from "@/config/site";

export const toolConfig = {
  slug: "upside-down-text-generator",
  name: "Upside-Down Text Generator",
  description: "Flip text upside down (ʇxǝʇ uʍop ǝpᴉsdn) or mirror it with Unicode characters you can paste anywhere, and turn flipped text back to normal.",
  category: "writing",
  icon: "🙃",
  seo: {
    title: "Upside Down Text Generator – Flip & Mirror Text Online",
    description: "Flip text upside down or mirror it with Unicode letters you can paste into Instagram, TikTok, X or Discord, and turn flipped text back to normal.",
    keywords: [
      "upside down text generator",
      "upside down text",
      "flip text",
      "upside down letters",
      "mirror text generator",
      "backwards text",
      "flip text upside down",
      "upside down font",
      "reverse text generator",
      "upside down text copy and paste",
    ],
    og: {
      title: "Upside Down Text Generator – Flip & Mirror Text Online",
      description: "Flip text upside down or mirror it with Unicode letters you can paste into Instagram, TikTok, X or Discord, and turn flipped text back to normal.",
      url: `${siteConfig.url}/tools/writing/upside-down-text-generator`,
    },
    howToSteps: [
      { name: "Type your text", text: "Enter the words to flip; the upside-down version appears as you type." },
      { name: "Choose how to flip", text: "Pick upside-down (turned 180°, read from the other end), mirror (flipped left to right) or no reverse (letters turned but kept in their original order)." },
      { name: "Adjust the options", text: "Choose whether to flip punctuation such as ! and ?, keep spaces and keep line breaks; each line is flipped on its own." },
      { name: "Copy and paste", text: "Copy the result into a post, bio, username or message, or switch to the other tab to turn upside-down text back into normal text." },
    ],
    faq: [
      { q: "How does upside-down text work?", a: "It is not a font. Each letter is swapped for a Unicode character that looks like it turned 180°, such as ɐ for a, ǝ for e and ʇ for t, and the order of the letters is reversed so the whole line reads correctly when turned over. Because they are ordinary characters, they stay upside down wherever you paste them." },
      { q: "Where can I paste upside-down text?", a: "Almost anywhere that accepts text: Instagram and TikTok bios and captions, X posts, Facebook, Discord, WhatsApp, email and documents. Some usernames and game names only allow basic letters and will reject the special characters." },
      { q: "Why do some letters or numbers look slightly off?", a: "Unicode has no true upside-down version of every letter, so close look-alikes are used: ᄅ for 2 and ㄣ for 4 come from Korean and Chinese scripts, and ᴉ is a turned i. They may look a little different depending on the font and device." },
      { q: "What is the difference between upside-down and mirror text?", a: "Upside-down text is turned 180°, so it reads from the other end when the screen is rotated: Hello becomes oꞁꞁǝH. Mirror text is flipped left to right, like writing seen in a mirror, using reversed letters such as ɘ and Я where they exist." },
      { q: "Can I turn upside-down text back to normal?", a: "Yes. Paste it into the Upside-Down → Text tab and each character is turned back and put in reading order again, line by line." },
      { q: "Is upside-down text accessible?", a: "Not really. Screen readers read the characters by their Unicode names or skip them, so people using assistive technology won't understand the message. Use it for a playful word or two, not for important information." },
    ],
  },
};
