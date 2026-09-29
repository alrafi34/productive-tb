import { siteConfig } from "@/config/site";

export const anagramFinderConfig = {
  id: "anagram-finder",
  slug: "anagram-finder",
  name: "Anagram Finder",
  description: "Find every English word you can make from a set of letters, with true anagrams listed first, and check whether two words or phrases are anagrams.",
  category: "writing",
  icon: "🔤",
  seo: {
    title: "Anagram Finder – Find Words from Letters & Unscramble",
    description: "Type letters to find all anagrams and every word you can make from them, sorted by length, with ? for blank tiles. Also checks if two phrases are anagrams.",
    keywords: [
      "anagram finder",
      "anagram solver",
      "word unscrambler",
      "unscramble letters",
      "words from letters",
      "anagram maker",
      "anagram checker",
      "scrabble word finder",
      "wordle helper",
      "is it an anagram",
    ],
    og: {
      title: "Anagram Finder – Find Words from Letters & Unscramble",
      description: "Type letters to find all anagrams and every word you can make from them, sorted by length, with ? for blank tiles. Also checks if two phrases are anagrams.",
      url: `${siteConfig.url}/tools/writing/anagram-finder`,
    },
    howToSteps: [
      { name: "Type your letters", text: "Enter a word or a set of scrambled letters, up to 15; add ? for each blank tile that can be any letter." },
      { name: "Read the anagrams", text: "Words that use every letter are shown first, then all shorter words grouped by length, with common words before rare ones." },
      { name: "Set the shortest word", text: "Choose 2, 3, 4 or 5 letters as the minimum length to hide very short words." },
      { name: "Check two phrases", text: "Below the finder, enter two words or phrases to see whether they are anagrams, with a letter-by-letter comparison, or check one word against a list." },
    ],
    faq: [
      { q: "What is an anagram?", a: "A word or phrase made by rearranging all the letters of another, using each letter exactly once. Listen, silent, enlist, tinsel and inlets are all anagrams of each other, and 'dormitory' is an anagram of 'dirty room'." },
      { q: "How do I unscramble letters into words?", a: "Type the letters in the box and the finder lists every word in its 63,000-word English dictionary that can be spelled with them. Words that use all the letters are shown first; for 'stressed' that is desserts, followed by 7-letter words such as deserts and dresses." },
      { q: "Can I use it for Scrabble, Words With Friends or Wordle?", a: "Yes. Enter your rack and use ? for a blank tile: c?t finds act, cat, cot, cut and tic. The dictionary is a general English word list rather than an official Scrabble dictionary, so check unusual words against the list your game uses." },
      { q: "Does it find anagrams made of several words?", a: "It finds single words. For phrase anagrams, such as 'astronomer' and 'moon starer', use the checker below the finder to test a phrase you have in mind; it ignores spaces, punctuation and capital letters." },
      { q: "What is the difference between an anagram and a palindrome?", a: "An anagram rearranges letters into a different word (evil → live). A palindrome reads the same forwards and backwards (level, racecar), so reversing it gives the same word rather than a new one." },
      { q: "Which dictionary does the anagram finder use?", a: "The SCOWL English word lists, common to rare levels 10 to 50, including American and British spellings. Proper nouns, abbreviations and words with apostrophes are left out." },
    ],
  },
};
