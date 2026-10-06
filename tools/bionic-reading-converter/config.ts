import { siteConfig } from "@/config/site";

export const bionicReadingConverterConfig = {
  name: "Bionic Reading Converter",
  slug: "bionic-reading-converter",
  description: "Bold the first letters of every word, Bionic Reading style, with adjustable emphasis, and copy the result as rich text, HTML or Markdown.",
  category: "text",
  icon: "👁️",
  seo: {
    title: "Bionic Reading Converter – Bold the Start of Every Word",
    description: "Turn any text into Bionic Reading style: the first part of each word in bold, with adjustable emphasis. Copy as rich text, HTML or Markdown. What research says.",
    keywords: [
      "bionic reading converter",
      "bionic reading",
      "bionic reading generator",
      "bionic text",
      "bold first letters of words",
      "bionic reading free",
      "adhd reading tool",
      "speed reading",
      "fixation reading",
      "does bionic reading work",
    ],
    og: {
      title: "Bionic Reading Converter – Bold the Start of Every Word",
      description: "Turn any text into Bionic Reading style: the first part of each word in bold, with adjustable emphasis. Copy as rich text, HTML or Markdown. What research says.",
      url: `${siteConfig.url}/tools/writing/bionic-reading-converter`,
    },
    howToSteps: [
      { name: "Paste your text", text: "Paste an article, email or study notes, or upload a text file." },
      { name: "Set the emphasis", text: "Choose how much of each word is bold, from about a third to most of the word; 40–50% is typical, and you can leave short words like 'the' and 'of' plain." },
      { name: "Adjust the display", text: "Change the font size, line height and theme until the preview is comfortable to read." },
      { name: "Copy or export", text: "Copy the result as rich text for Word or Google Docs, as HTML for a web page or as Markdown, or download it." },
    ],
    faq: [
      { q: "What is Bionic Reading?", a: "A typographic style, introduced by Swiss designer Renato Casutt, that prints the first part of every word in bold. The idea is that the bold letters act as fixation points, so the eye can skim and the brain fills in the rest of the word." },
      { q: "Does Bionic Reading make you read faster?", a: "The evidence says not on average. Peer-reviewed reading studies published since the style went viral in 2022, and large informal reading-speed tests, found no meaningful gain in speed or comprehension compared with normal text. Some people simply find it more pleasant or easier to stay focused, so it is worth trying on yourself." },
      { q: "Does Bionic Reading help with ADHD or dyslexia?", a: "Some readers with ADHD report that the bold anchors help them keep their place, but there is no solid research showing a benefit for ADHD or dyslexia. For dyslexia, larger text, more spacing between letters and lines, and familiar sans-serif fonts have more support." },
      { q: "How much of each word should be bold?", a: "Around half is the usual setting: in 'reading', the first three letters (rea) are bold at 40% and the first four (read) at 50%. Less bold looks calmer; more bold is heavier to read. This tool rounds up, so every word gets at least one bold letter." },
      { q: "Can I use Bionic Reading in Word, Google Docs or Kindle?", a: "Copy the result as rich text and paste it into Word, Google Docs or an email and the bold is kept. For e-readers, export HTML and convert it to an e-book with a tool such as Calibre." },
      { q: "Is my text sent anywhere?", a: "No. We do not collect or store what you enter." },
    ],
  },
};
