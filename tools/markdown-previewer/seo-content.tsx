const faqItems = [
  {
    question: "What is a Markdown previewer?",
    answer:
      "A Markdown previewer converts Markdown input into rendered HTML so you can check formatting before publishing.",
  },
  {
    question: "Why is this tool better than basic markdown converters?",
    answer:
      "It combines live preview, split or preview-only layout, file loading, stats, and export options in one practical workflow.",
  },
  {
    question: "Can I convert markdown to HTML instantly?",
    answer:
      "Yes. The preview updates as you edit, so you can see rendered HTML output in real time.",
  },
  {
    question: "What Markdown elements are supported?",
    answer:
      "It supports headings, emphasis, strikethrough, inline code, code blocks, links, images, blockquotes, lists, task lists, and horizontal rules.",
  },
  {
    question: "Can I load an existing .md file?",
    answer:
      "Yes. You can load a local Markdown file and continue editing or previewing it in the tool.",
  },
  {
    question: "Can I copy rendered output?",
    answer:
      "Yes. The copy action copies rendered HTML output so you can paste it into compatible workflows.",
  },
  {
    question: "Can I download both markdown and html files?",
    answer:
      "Yes. You can download your source as MD and export a complete HTML file version.",
  },
  {
    question: "Does the previewer show writing stats?",
    answer:
      "Yes. It shows word count, character count, lines, headings, links, and code block totals.",
  },
  {
    question: "Is this markdown previewer free?",
    answer: "Yes. It is free to use without account registration.",
  },
  {
    question: "Is my markdown content private?",
    answer:
      "Yes. Processing is browser-based and does not require uploading your content to external servers.",
  },
];

const howToSteps = [
  "Write or paste Markdown into the editor.",
  "Use split mode or preview-only mode based on your workflow.",
  "Review live HTML rendering and stats while editing.",
  "Load a .md file if you want to continue from an existing draft.",
  "Copy rendered HTML or download MD and HTML files.",
];

const strengths = [
  {
    title: "Live markdown rendering",
    text: "See format changes immediately so editing and QA are faster.",
  },
  {
    title: "Useful layout controls",
    text: "Switch between split and preview-only views for writing or review sessions.",
  },
  {
    title: "Practical export workflow",
    text: "Copy rendered output or download both source markdown and final HTML.",
  },
  {
    title: "Built-in content stats",
    text: "Track words, lines, headings, links, and code blocks while drafting.",
  },
];

const syntaxGuide = [
  {
    syntax: "Headings and paragraphs",
    use: "Structure documentation and long-form content with clear hierarchy.",
  },
  {
    syntax: "Bold, italic, strikethrough",
    use: "Apply emphasis and editorial styling in technical or content docs.",
  },
  {
    syntax: "Inline code and fenced code blocks",
    use: "Render code sections clearly for developer-focused documentation.",
  },
  {
    syntax: "Links and images",
    use: "Preview references, resources, and visual content placement.",
  },
  {
    syntax: "Lists and task lists",
    use: "Create checklists, steps, and structured bullet content quickly.",
  },
  {
    syntax: "Blockquotes and horizontal rules",
    use: "Separate sections and highlight quoted content cleanly.",
  },
];

const useCases = [
  {
    title: "README drafting",
    detail: "Write and validate GitHub-ready docs before committing.",
  },
  {
    title: "Knowledge base authoring",
    detail: "Prepare help articles with headings, code samples, and task lists.",
  },
  {
    title: "Technical documentation reviews",
    detail: "Check Markdown formatting consistency before publishing.",
  },
  {
    title: "Blog and CMS workflows",
    detail: "Convert markdown drafts into clean rendered HTML for publication.",
  },
  {
    title: "Team collaboration prep",
    detail: "Export MD/HTML versions for handoff between writers and developers.",
  },
  {
    title: "Markdown learning practice",
    detail: "Experiment with syntax and get immediate visual feedback.",
  },
];

const mistakesToAvoid = [
  "Publishing without checking rendered output for broken structure.",
  "Forgetting to verify links and image references in preview.",
  "Mixing inconsistent heading levels across long documents.",
  "Skipping task list and code block validation before export.",
  "Copying source markdown when your target requires rendered HTML.",
];

export default function MarkdownPreviewerSEOContent() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to use the Markdown Previewer",
    description:
      "Write Markdown, preview rendered HTML, review stats, then copy or download output.",
    step: howToSteps.map((step) => ({
      "@type": "HowToStep",
      text: step,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      <div className="mt-12 space-y-8">
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            Markdown Previewer for Faster Documentation, Cleaner Formatting, and Safer Publishing
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)" }}>
            This free <strong>Markdown Previewer</strong> helps you write Markdown and inspect rendered output in one place.
            It is useful for developers, technical writers, students, and content teams.
          </p>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            Instead of switching between separate editor and renderer tools, you can draft, preview, validate, and export
            your work through a single workflow.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            Why This Tool Is Better Than Basic Alternatives
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {strengths.map((point) => (
              <div key={point.title} className="rounded-lg border border-gray-100 p-5 bg-gray-50/60">
                <h3 className="text-lg font-medium text-gray-900 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                  {point.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                  {point.text}
                </p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-5" style={{ fontFamily: "var(--font-body)" }}>
            Basic converters only return output. This one adds layout control, metrics, file loading, and export flow.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            How to Use the Markdown Previewer
          </h2>
          <ol className="space-y-4 text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            {howToSteps.map((step, index) => (
              <li key={step} className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            Supported Syntax Guide
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600" style={{ fontFamily: "var(--font-body)" }}>
            {syntaxGuide.map((item) => (
              <div key={item.syntax} className="rounded-lg border border-gray-100 p-4 bg-gray-50">
                <p className="font-semibold text-gray-900">{item.syntax}</p>
                <p className="mt-1">{item.use}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            Practical Use Cases
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600" style={{ fontFamily: "var(--font-body)" }}>
            {useCases.map((item) => (
              <div key={item.title} className="rounded-lg border border-gray-100 p-4 bg-gray-50">
                <p className="font-semibold text-gray-900">{item.title}</p>
                <p className="mt-1">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            Common Markdown Preview Mistakes to Avoid
          </h2>
          <ul className="space-y-3 text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            {mistakesToAvoid.map((mistake) => (
              <li key={mistake} className="flex items-start gap-3">
                <span className="mt-1 text-red-500">-</span>
                <span>{mistake}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqItems.map((item) => (
              <div key={item.question}>
                <h3 className="text-lg font-medium text-gray-900 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                  {item.question}
                </h3>
                <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-gray-50 rounded-2xl border border-gray-200 p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            Preview Markdown Faster and Publish Cleaner Documentation with More Confidence
          </h2>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            With live rendering, export options, and structural stats, this tool helps teams reduce formatting mistakes
            and ship better Markdown content.
          </p>
        </section>
      </div>
    </>
  );
}
