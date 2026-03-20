const faqItems = [
  {
    question: "What does a salary calculator do?",
    answer:
      "A salary calculator converts annual salary into monthly, weekly, daily, and hourly income estimates so you can compare offers and plan budgets faster.",
  },
  {
    question: "How is hourly pay calculated from annual salary?",
    answer:
      "Hourly pay is estimated by dividing annual salary by 52 weeks and then dividing by work hours per week. Formula: Hourly = Annual / 52 / Hours per Week.",
  },
  {
    question: "Can I customize work hours and work days in this tool?",
    answer:
      "Yes. You can set custom hours per week and days per week to reflect part-time, full-time, shift-based, or freelance schedules.",
  },
  {
    question: "Is this salary converter useful for freelancers and contractors?",
    answer:
      "Yes. Freelancers can use it to convert target annual income into practical daily and hourly rates for project pricing and negotiation.",
  },
  {
    question: "Why are my results different from payroll checks?",
    answer:
      "This calculator estimates gross pay conversions. Payroll checks include deductions like tax, retirement, insurance, and other withholdings.",
  },
  {
    question: "Why is this salary calculator better than many basic calculators?",
    answer:
      "This page combines real-time conversion, custom schedule inputs, precision control, multi-currency formatting, copy tools, and local history in one workflow.",
  },
  {
    question: "Does this tool calculate net salary after tax?",
    answer:
      "No. This tool focuses on gross salary conversion. Use a dedicated tax or take-home pay calculator for net paycheck estimation.",
  },
  {
    question: "Is this salary calculator free and private?",
    answer:
      "Yes. It is free to use and runs in your browser. Saved settings/history are stored locally and can be cleared anytime.",
  },
  {
    question: "Can I use this for job offer comparisons?",
    answer:
      "Yes. You can enter different salary values, save scenarios, and compare monthly, weekly, daily, and hourly equivalents quickly.",
  },
  {
    question: "What is a good hourly rate from annual salary?",
    answer:
      "A good rate depends on industry, location, experience, and benefits. This tool helps you standardize numbers so comparisons are more objective.",
  },
];

const howToSteps = [
  "Enter your annual salary amount.",
  "Set your work hours per week.",
  "Set your work days per week.",
  "Select preferred currency and decimal precision.",
  "Review monthly, weekly, daily, and hourly values instantly.",
  "Copy hourly or full summary values when needed.",
  "Save salary scenarios in local history for quick comparison.",
];

const strengths = [
  {
    title: "Real-time conversion workflow",
    text: "Results update immediately as you change salary or schedule assumptions, making scenario testing much faster than spreadsheet setup.",
  },
  {
    title: "Schedule-aware calculations",
    text: "Unlike static converters, this tool lets you adjust both work hours and days per week for more realistic hourly and daily estimates.",
  },
  {
    title: "Practical output controls",
    text: "Use precision options, copy-ready outputs, and multi-currency formatting to fit reports, proposals, and personal planning.",
  },
  {
    title: "Local history and settings",
    text: "Save salary entries and preferred configuration in-browser, then load scenarios quickly while comparing offers or rates.",
  },
];

const examples = [
  {
    title: "Example 1: Full-time offer",
    input: "Annual = $60,000, Hours/Week = 40, Days/Week = 5",
    output: "Monthly = $5,000, Weekly = $1,153.85, Daily = $230.77, Hourly = $28.85",
  },
  {
    title: "Example 2: Senior role",
    input: "Annual = $120,000, Hours/Week = 40, Days/Week = 5",
    output: "Monthly = $10,000, Weekly = $2,307.69, Daily = $461.54, Hourly = $57.69",
  },
  {
    title: "Example 3: Part-time schedule",
    input: "Annual = $45,000, Hours/Week = 30, Days/Week = 4",
    output: "Hourly and daily rates increase relative to lower scheduled hours.",
  },
  {
    title: "Example 4: Contractor target",
    input: "Annual target = $90,000, Hours/Week = 35, Days/Week = 5",
    output: "Use hourly and daily values to quote projects consistently.",
  },
  {
    title: "Example 5: Reduced workweek",
    input: "Annual = $80,000, Hours/Week = 32, Days/Week = 4",
    output: "Compare effective hourly pay versus a 40-hour baseline.",
  },
  {
    title: "Example 6: Offer A vs Offer B",
    input: "A = $95,000 at 45h/week, B = $88,000 at 38h/week",
    output: "Convert both to hourly values for apples-to-apples evaluation.",
  },
];

const mistakesToAvoid = [
  "Comparing annual salaries without normalizing work hours.",
  "Ignoring unpaid overtime impact on effective hourly pay.",
  "Treating gross salary as take-home income.",
  "Skipping total compensation factors like bonus and benefits.",
  "Using one salary period only instead of checking multiple views.",
];

export default function SalaryCalculatorSEO() {
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
    name: "How to use the salary calculator",
    description:
      "Convert annual salary to monthly, weekly, daily, and hourly pay using custom work schedule settings.",
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
            Salary Calculator Online for Annual, Monthly, Weekly, Daily, and Hourly Pay Conversion
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)" }}>
            This free <strong>Salary Calculator</strong> converts annual salary into practical pay views: monthly,
            weekly, daily, and hourly. It is useful for job seekers, employees, freelancers, and hiring managers
            who need quick compensation comparisons.
          </p>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            Users searching for "annual to hourly calculator", "salary converter", "wage calculator", and
            "hourly pay from salary" usually need immediate clarity. This page combines conversion logic,
            usage guidance, examples, and structured FAQ in one place.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            Why This Salary Calculator Is Better Than Many Basic Salary Converters
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
            Many calculators only provide one conversion. This one is designed for iterative comparison and decision-making.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            How to Use the Salary Calculator
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
          <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            Salary Conversion Formulas Used
          </h2>
          <pre className="p-4 bg-gray-900 text-green-400 rounded-lg text-sm overflow-x-auto">
{`Monthly = Annual / 12
Weekly = Annual / 52
Daily = Weekly / Work Days per Week
Hourly = Weekly / Work Hours per Week`}
          </pre>
          <p className="mt-4 text-sm text-gray-600" style={{ fontFamily: "var(--font-body)" }}>
            These formulas estimate gross pay conversion. They do not include taxes, deductions, bonuses, or variable overtime.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            Worked Salary Conversion Examples
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600" style={{ fontFamily: "var(--font-body)" }}>
            {examples.map((example) => (
              <div key={example.title} className="rounded-lg border border-gray-100 p-4 bg-gray-50">
                <p className="font-semibold text-gray-900">{example.title}</p>
                <p className="mt-1">{example.input}</p>
                <p className="mt-1 font-medium text-gray-700">{example.output}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            Common Use Cases
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-600" style={{ fontFamily: "var(--font-body)" }}>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Job offer comparison</h3>
              <p className="text-sm leading-relaxed">Standardize salaries into hourly and daily values to compare offers with different workloads.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Freelance and consulting rates</h3>
              <p className="text-sm leading-relaxed">Convert target annual income into practical billable hourly and daily quotes.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Compensation planning</h3>
              <p className="text-sm leading-relaxed">Translate salary figures into monthly and weekly cash-flow expectations.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Negotiation preparation</h3>
              <p className="text-sm leading-relaxed">Use normalized pay rates to discuss compensation with stronger numeric context.</p>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            Mistakes to Avoid When Comparing Salaries
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
            Compare Salaries Faster With a Structured, Conversion-First Workflow
          </h2>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            If you need a practical and indexing-friendly <strong>salary conversion calculator</strong>, this page is designed
            to do more than a one-line result. It combines clear formulas, schedule-aware logic, reusable scenarios,
            and structured SEO content to support both users and search engines.
          </p>
        </section>
      </div>
    </>
  );
}
