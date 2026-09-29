import { siteConfig } from "@/config/site";

export const toolConfig = {
  slug: "list-prefix-suffix",
  name: "Add Prefix and Suffix to Lines",
  description: "Add text to the start or end of every line, number a list, or turn lines into Markdown bullets, checklists, quoted CSV values or HTML list items.",
  category: "writing",
  icon: "📝",
  seo: {
    title: "Add Prefix and Suffix to Each Line – List Formatter",
    description: "Add text before or after every line of a list: bullets, numbers, quotes and commas for SQL or JSON, Markdown checklists or HTML <li> tags.",
    keywords: [
      "add prefix to each line",
      "add suffix to each line",
      "add text to beginning of each line",
      "add text to end of each line",
      "add quotes to each line",
      "add comma to each line",
      "list formatter",
      "number lines online",
      "line prefix suffix tool",
      "convert list to comma separated",
    ],
    og: {
      title: "Add Prefix and Suffix to Each Line – List Formatter",
      description: "Add text before or after every line of a list: bullets, numbers, quotes and commas for SQL or JSON, Markdown checklists or HTML <li> tags.",
      url: `${siteConfig.url}/tools/writing/list-prefix-suffix`,
    },
    howToSteps: [
      { name: "Paste your list", text: "Paste one item per line, from a spreadsheet column, a document or a text file; Windows and Mac line breaks both work." },
      { name: "Choose a template or type your own", text: "Pick Markdown bullet, numbered list, checklist, quote, code comment, CSV, quoted list or HTML <li>, or type any prefix and suffix yourself." },
      { name: "Fine-tune the list", text: "Turn on numbering with a start number and separator, remove empty lines, trim spaces, and drop the trailing comma from the last line." },
      { name: "Copy the result", text: "The formatted list updates as you type; copy it or download it as a TXT file." },
    ],
    faq: [
      { q: "How do I add quotes and commas to each line?", a: "Choose the \"Quoted\", list template. It wraps every line in double quotes and adds a comma, leaving the comma off the last line: apples, bananas and cherries become \"apples\", \"bananas\", \"cherries\", ready to paste into a JSON array, a Python list or a SQL IN (...) clause. For SQL, which uses single quotes, type ' as the prefix and ', as the suffix." },
      { q: "How do I number every line of a list?", a: "Tick Enable numbering or pick the Numbered List template. You can start from any number and choose 1. 1) 1- or 1: as the style. Empty lines are skipped, so the numbers stay in sequence." },
      { q: "Can I add a prefix to lines in Excel or Google Sheets instead?", a: "Yes, with a formula: =\"- \"&A1 in Excel or Google Sheets adds a prefix, and =A1&\",\" adds a suffix; then fill the formula down. This tool is quicker for a one-off list and keeps line breaks and blank lines as they are." },
      { q: "What happens to blank lines?", a: "They are kept blank, without a prefix, suffix or number, so a list split into groups keeps its layout. Tick Remove empty lines to drop them altogether." },
      { q: "How do I make a Markdown checklist?", a: "Use the Checklist template, which starts every line with - [ ] . GitHub, GitLab, Obsidian and many other Markdown editors show these as tick boxes; change [ ] to [x] to mark an item done." },
      { q: "Is my list uploaded anywhere?", a: "No. Everything happens in your browser, so the list never leaves your device." },
    ],
  },
};
