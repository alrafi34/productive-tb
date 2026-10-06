import { siteConfig } from "@/config/site";

export const toolConfig = {
  slug: "markdown-previewer",
  name: "Markdown Previewer",
  description: "Write Markdown and see it rendered live with GitHub Flavored Markdown: tables, task lists, code blocks and more, then export clean HTML.",
  category: "writing",
  icon: "📝",
  seo: {
    title: "Markdown Previewer – Live Editor & Markdown to HTML",
    description: "Write Markdown and see it rendered as you type, with GitHub Flavored Markdown tables, task lists and code blocks. Export HTML; cheat sheet included.",
    keywords: [
      "markdown previewer",
      "markdown editor online",
      "markdown to html",
      "markdown viewer",
      "live markdown preview",
      "github flavored markdown",
      "markdown cheat sheet",
      "markdown table",
      "readme editor",
      "md to html converter",
    ],
    og: {
      title: "Markdown Previewer – Live Editor & Markdown to HTML",
      description: "Write Markdown and see it rendered as you type, with GitHub Flavored Markdown tables, task lists and code blocks. Export HTML; cheat sheet included.",
      url: `${siteConfig.url}/tools/writing/markdown-previewer`,
    },
    howToSteps: [
      { name: "Write or paste Markdown", text: "Type in the editor, paste a README or notes, or load a .md file; a sample document shows the main features." },
      { name: "Check the preview", text: "The right-hand pane renders the Markdown as you type, including tables, task lists, strikethrough, code blocks and links." },
      { name: "Switch the layout", text: "Use Preview Only to read the document full width, and switch back to edit." },
      { name: "Export", text: "Copy the generated HTML, download it as a styled HTML page, or save your text as a .md file." },
    ],
    faq: [
      { q: "What is Markdown?", a: "A plain-text formatting syntax created by John Gruber in 2004. You mark up text with simple symbols, such as # for a heading, **bold** and - for a list item, and a converter turns it into HTML. It is used for README files, documentation, notes apps, chat and forums." },
      { q: "What is GitHub Flavored Markdown?", a: "GFM is the dialect GitHub uses, built on the CommonMark standard. It adds tables, task lists (- [ ] and - [x]), strikethrough (~~text~~) and automatic links for bare URLs. This previewer renders GFM, so README files look much as they will on GitHub." },
      { q: "How do I make a table in Markdown?", a: "Separate columns with | and put a line of dashes under the header row: | Name | Price | on the first line, | --- | ---: | on the second, then one row per line. A colon on the right of the dashes right-aligns the column, on both sides centres it." },
      { q: "How do I add a line break without a new paragraph?", a: "End the line with two spaces or a backslash (\\) before pressing Enter. A single Enter joins the lines into one paragraph, and an empty line starts a new paragraph." },
      { q: "Can I use HTML inside Markdown?", a: "Yes, most Markdown renderers accept inline HTML such as <kbd>, <sup> or <details>. For safety this previewer removes scripts, event handlers and javascript: links from the output." },
      { q: "Is my document stored or uploaded?", a: "No. We do not collect or store what you enter." },
    ],
  },
};
