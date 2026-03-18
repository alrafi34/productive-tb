const faqItems = [
  {
    question: "How is this age calculator different from other age calculators?",
    answer:
      "Most age tools stop at years and months. This one also gives total lifetime stats, next birthday countdown, weekday of birth, zodiac signs, milestone tracking, and batch DOB calculation with CSV export.",
  },
  {
    question: "Does this age calculator handle leap years and month-length differences?",
    answer:
      "Yes. The calculation uses calendar-aware year, month, and day math so leap years and varying month lengths are reflected in the output.",
  },
  {
    question: "Can I calculate age on a past or future date?",
    answer:
      "Yes. Change the comparison date to any valid date to see how old someone was or will be at that point in time.",
  },
  {
    question: "Can I calculate many ages at once?",
    answer:
      "Yes. Use Batch mode to paste multiple birth dates (one per line), then export the results as CSV.",
  },
  {
    question: "How do I see the number of days I have lived?",
    answer:
      "Enter your date of birth and read the Lifetime Statistics panel. It includes total days, weeks, hours, and minutes lived.",
  },
  {
    question: "Is my date of birth stored on your servers?",
    answer:
      "No. Calculations run in your browser, so date inputs are not sent to a backend for processing.",
  },
];

const howToSteps = [
  "Enter your date of birth.",
  "Keep today's date or set a custom comparison date.",
  "Read your exact age in years, months, and days.",
  "Review lifetime totals, next birthday countdown, and milestones.",
  "Use Batch mode and export CSV when you need multiple results.",
];

export default function AgeCalculatorSEO() {
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
    name: "How to use the age calculator",
    description:
      "Calculate exact age from date of birth, compare with any date, and review lifetime statistics and next birthday countdown.",
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

      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Age Calculator From Date of Birth (DOB)
        </h2>
        <p className="text-gray-600 leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)" }}>
          Use this free online age calculator to find exact age in years, months, and days from a date of birth.
          You can also compare against any custom date to check age at a specific point in the past or future.
        </p>
        <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
          Beyond basic age output, the tool includes total lifetime statistics, next birthday countdown, milestone
          dates, weekday of birth, western and Chinese zodiac, and bulk DOB processing in batch mode.
        </p>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Why This Age Calculator Is Different
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-lg border border-gray-100 p-5 bg-gray-50/60">
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Calendar-accurate age math
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Handles leap years and real month lengths instead of rough day division.
            </p>
          </div>
          <div className="rounded-lg border border-gray-100 p-5 bg-gray-50/60">
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Compare with any date
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Most tools only calculate for today. This one works for past and future comparison dates too.
            </p>
          </div>
          <div className="rounded-lg border border-gray-100 p-5 bg-gray-50/60">
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Rich outputs, not just one number
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Includes days lived, next birthday countdown, milestones, zodiac profile, and age progress tracking.
            </p>
          </div>
          <div className="rounded-lg border border-gray-100 p-5 bg-gray-50/60">
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Batch mode with CSV export
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Paste multiple birth dates and export results, which is useful for school, HR, and admin workflows.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Age Calculator
        </h2>
        <ol className="space-y-4 text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
          <li className="flex items-start">
            <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">1</span>
            <span><strong>Enter date of birth.</strong> Select the DOB from the date picker.</span>
          </li>
          <li className="flex items-start">
            <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">2</span>
            <span><strong>Set comparison date.</strong> Keep today selected or choose any custom date.</span>
          </li>
          <li className="flex items-start">
            <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">3</span>
            <span><strong>Read exact age result.</strong> View years, months, and days instantly.</span>
          </li>
          <li className="flex items-start">
            <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">4</span>
            <span><strong>Review detailed panels.</strong> Check lifetime totals, next birthday, and milestones.</span>
          </li>
          <li className="flex items-start">
            <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">5</span>
            <span><strong>Use batch mode if needed.</strong> Paste multiple DOB values and export CSV output.</span>
          </li>
        </ol>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Common Use Cases
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Personal age checks
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Find your exact age and track upcoming birthday countdowns.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Forms and eligibility
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Validate age for registrations, admissions, and policy checks.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              School and office lists
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Process multiple birth dates at once in batch mode and export results to CSV.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Milestone planning
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Track 1,000-day, 10,000-day, and major birthday milestones for planning and reminders.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {faqItems.map((item) => (
            <div key={item.question}>
              <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                {item.question}
              </h3>
              <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
