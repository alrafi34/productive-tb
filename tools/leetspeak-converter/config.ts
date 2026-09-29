import { siteConfig } from "@/config/site";

export const leetspeakConverterConfig = {
  id: "leetspeak-converter",
  slug: "leetspeak-converter",
  name: "Leetspeak (1337) Converter",
  description: "Translate text to 1337 leetspeak at three levels, from simple number swaps to full symbol art, or decode leet back to plain text.",
  category: "writing",
  icon: "🤖",
  seo: {
    title: "Leetspeak Translator – Text to 1337 and Back",
    description: "Translate text to leetspeak (1337) in light, standard or hardcore style, or decode 1337 back to English. Includes a full leet alphabet chart.",
    keywords: [
      "leetspeak translator",
      "leetspeak converter",
      "1337 translator",
      "leet speak generator",
      "text to leetspeak",
      "leetspeak alphabet",
      "1337 decoder",
      "hacker text",
      "leet speak meaning",
      "l33t",
    ],
    og: {
      title: "Leetspeak Translator – Text to 1337 and Back",
      description: "Translate text to leetspeak (1337) in light, standard or hardcore style, or decode 1337 back to English. Includes a full leet alphabet chart.",
      url: `${siteConfig.url}/tools/writing/leetspeak-converter`,
    },
    howToSteps: [
      { name: "Type your text", text: "Enter the words you want to translate; the result updates as you type." },
      { name: "Pick a style", text: "Choose light (a few number swaps: H4ck3r), standard (numbers for ten letters) or hardcore (symbols for every letter: #4(|<3|2), or a gamer, hacker or meme preset." },
      { name: "Add variety if you like", text: "Turn on random mode to mix alternatives such as @ or 4 for A, or remove spaces for a denser look." },
      { name: "Decode or copy", text: "Switch to decode mode to turn leet back into readable text, then copy the result or download it as a TXT file." },
    ],
    faq: [
      { q: "What is leetspeak?", a: "Leetspeak, or 1337, is a way of writing English that swaps letters for numbers and symbols that look alike, such as 3 for E, 4 for A and 7 for T. The name comes from 'elite', written 31337 or 1337, and it started on 1980s bulletin board systems and hacker and gaming communities." },
      { q: "What does 1337 mean?", a: "1337 is 'leet' spelled with numbers (1 = L, 3 = E, 7 = T), short for 'elite'. It describes someone skilled, originally a hacker or gamer, and has since become a playful internet in-joke." },
      { q: "What is the leetspeak alphabet?", a: "There is no single official version. The most common number swaps are A = 4, B = 8, E = 3, G = 6, I = 1, L = 1, O = 0, S = 5, T = 7 and Z = 2. Advanced leet uses symbol groups for every letter, such as |-| for H, |\\/| or /\\/\\ for M and \\/\\/ for W; the chart on this page lists them." },
      { q: "Why can't leetspeak always be decoded perfectly?", a: "Several letters share the same symbol: 1 can mean I or L, and digits in the original text (like 2026) look the same as letter swaps. The decoder reads 1 as i and turns every recognised symbol into a letter, so check names and numbers by eye." },
      { q: "Is leetspeak good for passwords?", a: "Not on its own. Password crackers try common substitutions such as P@55w0rd automatically, so they add little strength. A long passphrase of random words, or a password manager, protects you far better." },
      { q: "Where is leetspeak used today?", a: "Mostly for fun and style: gamer tags, usernames, jokes about hackers, retro internet themes and puzzles. Some words from leet culture, like pwned, n00b and w00t, have passed into everyday gaming slang." },
      { q: "Is my text sent to a server?", a: "No. Translation happens in your browser, so nothing you type is uploaded." },
    ],
  },
};
