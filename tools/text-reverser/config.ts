import { siteConfig } from "@/config/site";

export const toolConfig = {
  slug: "text-reverser",
  name: "Text Reverser",
  description: "Reverse letters, words, sentences, or paragraphs instantly online. Five reversal modes in one free browser-based tool.",
  category: "writing",
  icon: "🔄",
  free: true,
  backend: false,
  relatedTools: [
    "word-counter",
    "case-converter",
    "text-to-slug-generator",
    "duplicate-line-remover",
    "character-counter",
  ],
  seo: {
    title: "Text Reverser — Reverse Words, Sentences & Text Online | Productive Toolbox",
    description: "Reverse letters, words, sentences, or paragraphs instantly. Free online text reverser with 5 modes — word reverser, sentence reverser, and more. No signup.",
    keywords: [
      "text reverser",
      "text reverser online",
      "reverse text online",
      "word reverser",
      "sentence reverser",
      "reverse words online",
      "reverse letters online",
      "upside down text decoder online",
      "reverse each word",
      "reverse sentence order",
      "reverse paragraph order",
      "mirror text generator",
      "reverse string online",
      "free text reverser",
      "reverse text tool",
      "text manipulation tool",
      "reverse writing tool",
      "backwards text generator",
      "flip text online",
      "reverse text generator",
      "text transformation tool",
      "online text reverser no signup",
    ],
    openGraph: {
      title: "Text Reverser — Reverse Words, Sentences & Text Online",
      description: "Reverse letters, words, sentences, or paragraphs instantly. Five modes in one free browser-based tool.",
      type: "website",
      url: `${siteConfig.url}/tools/writing/text-reverser`,
    },
    og: {
      title: "Text Reverser — Reverse Words, Sentences & Text Online",
      description: "Reverse letters, words, sentences, or paragraphs instantly. Five modes in one free browser-based tool.",
      url: `${siteConfig.url}/tools/writing/text-reverser`,
    },
    howToSteps: [
      {
        name: "Paste or Type Your Text",
        text: "Enter any text into the input field — a single word, a sentence, a paragraph, or multiple paragraphs. The tool accepts any length of text and begins processing immediately.",
      },
      {
        name: "Choose a Reversal Mode",
        text: "Select one of five modes: Reverse Letters, Reverse Words, Reverse Each Word, Reverse Sentences, or Reverse Paragraphs. Each mode applies a different algorithm and produces a different output from the same input.",
      },
      {
        name: "Read the Output",
        text: "The reversed text appears instantly in the output panel. Live word and character counts update below both panels to confirm the transformation preserved the correct number of elements.",
      },
      {
        name: "Switch Modes to Compare",
        text: "Click any other mode to see how the same input transforms differently without re-entering text. All five modes share the same input so you can compare outputs side by side.",
      },
      {
        name: "Copy or Download",
        text: "Click the copy button to send the reversed output to your clipboard, or use the download button to save it as a .txt file for larger batches or content you need to keep.",
      },
    ],
    faq: [
      {
        q: "What is a text reverser?",
        a: "A text reverser is a free online tool that transforms text by changing the order of its characters, words, sentences, or paragraphs depending on which reversal mode you select. It is used for puzzle creation, creative writing, social media styling, developer string testing, and educational demonstrations.",
      },
      {
        q: "What is the difference between reversing letters and reversing words?",
        a: "Reversing letters mirrors the entire string character by character — Hello World becomes dlroW olleH. Reversing words keeps every letter in its correct position within its word but flips the order of the words themselves — Hello World becomes World Hello. The two modes produce completely different outputs and serve different purposes.",
      },
      {
        q: "What does reverse each word do?",
        a: "Reverse Each Word reverses the letters inside every individual word while leaving the words in their original sequence. Hello World becomes olleH dlroW — both words are individually mirrored but the word order stays the same. This is useful for cipher-style puzzles and stylized text where word shape is preserved but letters are scrambled.",
      },
      {
        q: "How does the sentence reverser work?",
        a: "The sentence reverser splits the input on sentence-ending punctuation marks (periods, exclamation marks, question marks), reverses the order of those segments, and rejoins them. Each sentence must end with a punctuation mark for the split to work correctly. Unpunctuated text will be treated as a single sentence and returned unchanged.",
      },
      {
        q: "Can I use this as an upside down text decoder online?",
        a: "For character-mirrored text, yes. Paste the reversed string and select Reverse Letters to restore the original, since Reverse Letters is its own inverse. True upside-down Unicode text using flipped Unicode characters is a different technique and requires a separate tool.",
      },
      {
        q: "Is a word reverser the same as a text reverser?",
        a: "A word reverser specifically reverses word order. A text reverser is the broader category that includes word reversal as one of several modes alongside letter reversal, each-word reversal, sentence reversal, and paragraph reversal. This tool covers all modes in a single interface.",
      },
      {
        q: "Can this tool reverse long text documents?",
        a: "Yes. There is no hard character limit for typical use. Paste multi-paragraph text for sentence or paragraph reversal, or long strings for letter and word modes. All operations run client-side in your browser so processing is instant regardless of length. Download the output as a .txt file for large batches.",
      },
      {
        q: "Does the tool work for non-English text?",
        a: "The letter and word reversal modes work for any language since they operate on Unicode characters and whitespace boundaries. Sentence reversal depends on standard punctuation which may not apply to all scripts. For right-to-left languages the visual effect of letter reversal will differ from left-to-right languages.",
      },
      {
        q: "Can I use reversed text for security or obfuscation?",
        a: "No. Text reversal is a trivial transformation that any person or program can instantly reverse. It provides zero security and should not be used to obscure sensitive information. It is appropriate for puzzles, games, creative styling, and developer testing only.",
      },
      {
        q: "Is my text private when using this tool?",
        a: "Yes. All processing happens entirely in your browser using JavaScript. The text you enter is never transmitted to any server, stored in any database, or accessible to anyone other than you.",
      },
    ],
  },
};
