import ToolFaq from "@/components/ToolFaq";
import { tableToMarkdownConfig } from "./config";

const strengths = [
  {
    title: "Accurate parsing from real data sources",
    text: "Handle spreadsheet and delimited text with auto-detection plus manual delimiter control.",
  },
  {
    title: "Header and structure flexibility",
    text: "Switch between first-row headers, generated headers, or custom labels based on your dataset.",
  },
  {
    title: "Publishing-ready formatting controls",
    text: "Tune alignment, readability format, escaping, and backticks before sending output to docs platforms.",
  },
  {
    title: "Faster validation workflow",
    text: "Compare markdown source with rendered preview and export when everything looks correct.",
  },
];

const optionGuide = [
  {
    option: "Header Mode",
    use: "Decide whether first row is a header, auto-generate headers, or set custom names.",
  },
  {
    option: "Delimiter Control",
    use: "Use auto-detection or force tab/comma/pipe/space parsing for consistent column splitting.",
  },
  {
    option: "Column Alignments",
    use: "Assign left, center, or right alignment to each column in final markdown syntax.",
  },
  {
    option: "Pretty Format",
    use: "Create cleaner fixed-width markdown source that is easier to read and maintain.",
  },
  {
    option: "Escape Special Characters",
    use: "Protect markdown tables from rendering issues caused by symbols like pipes and brackets.",
  },
  {
    option: "Wrap in Backticks",
    use: "Render each cell as inline code to preserve technical values and literal strings.",
  },
];

const useCases = [
  {
    title: "GitHub README tables",
    detail: "Convert spreadsheet snippets into markdown tables for repositories and open-source docs.",
  },
  {
    title: "Technical documentation",
    detail: "Prepare API references, config matrices, and product specs in markdown-first docs systems.",
  },
  {
    title: "Content operations",
    detail: "Move structured data from sheet-based workflows into CMS or publishing pipelines.",
  },
  {
    title: "Knowledge-base updates",
    detail: "Standardize internal tables for wiki pages, runbooks, and team documentation.",
  },
  {
    title: "Report publishing",
    detail: "Quickly publish tables from CSV exports into markdown reports and summaries.",
  },
  {
    title: "Developer handoff",
    detail: "Share aligned, readable markdown tables for pull requests and architecture notes.",
  },
];

const mistakesToAvoid = [
  "Using the wrong delimiter when source rows contain mixed separators.",
  "Treating data rows as headers by accident and losing first-row values.",
  "Skipping escape mode for content that contains markdown control symbols.",
  "Forgetting alignment review for number-heavy columns that should be right-aligned.",
  "Copying output without checking rendered preview for structural issues.",
];

export default function SEOContent() {
  // Same steps and questions as the HowTo / FAQPage schema
  const { howToSteps, faq } = tableToMarkdownConfig.seo;

  return (
    <>

      <div className="max-w-4xl mx-auto mt-12 space-y-8">
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            Table to Markdown Converter for Faster Documentation and Cleaner Publishing Workflows
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)" }}>
            This free <strong>Table to Markdown Converter</strong> helps you turn spreadsheet-style data into valid markdown tables in seconds.
            It is designed for documentation teams, developers, content editors, and anyone publishing structured data in markdown.
          </p>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            Instead of manually writing separators and alignment markers, you can parse, format, preview, and export from one interface.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            Why This Tool Performs Better Than Basic Online Converters
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
            Many converters only generate basic output. This one gives full control needed for real documentation standards.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            How to Use Table to Markdown
          </h2>
          <ol className="space-y-4 text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            {howToSteps.map(({ text: step }, index) => (
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
            Conversion Option Guide
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600" style={{ fontFamily: "var(--font-body)" }}>
            {optionGuide.map((item) => (
              <div key={item.option} className="rounded-lg border border-gray-100 p-4 bg-gray-50">
                <p className="font-semibold text-gray-900">{item.option}</p>
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
            Common Table Conversion Mistakes to Avoid
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

        <ToolFaq items={faq} />

        <section className="bg-gray-50 rounded-2xl border border-gray-200 p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            Convert Spreadsheet Data into Reliable Markdown Tables Without Manual Formatting
          </h2>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            With delimiter intelligence, alignment control, header flexibility, and preview-first validation, this tool helps
            you publish cleaner markdown tables faster across technical and content workflows.
          </p>
        </section>
      </div>
    </>
  );
}
