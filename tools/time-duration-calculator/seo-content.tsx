const faqItems = [
  {
    question: "How is this time duration calculator better than many other calculators?",
    answer:
      "Many tools only return one value or fail on overnight ranges. This calculator gives live results, supports overnight shifts automatically, offers optional seconds precision, and shows detailed totals in hours, minutes, and seconds in one place.",
  },
  {
    question: "Can I calculate time across midnight?",
    answer:
      "Yes. If your end time is earlier than your start time, the tool treats it as next-day time. For example, 22:30 to 06:15 is calculated as 7 hours and 45 minutes.",
  },
  {
    question: "Does this tool support seconds?",
    answer:
      "Yes. Enable seconds precision to enter HH:MM:SS values and get second-level duration output for sports, production, lab work, and detailed timing tasks.",
  },
  {
    question: "Can I use this as a work hours or shift duration calculator?",
    answer:
      "Yes. It works well for shift planning, attendance checks, overtime estimates, and daily time tracking. Quick presets and swap controls help speed up repeated calculations.",
  },
  {
    question: "Is my time data stored or sent to a server?",
    answer:
      "Calculations are processed in your browser. Recent history is stored locally on your device for convenience, and your inputs are not required to be sent to a backend for calculation.",
  },
  {
    question: "What time format should I use?",
    answer:
      "Use 24-hour format. Enter HH:MM for standard mode or HH:MM:SS when seconds precision is enabled.",
  },
  {
    question: "Can I copy results quickly?",
    answer:
      "Yes. Use the copy button to copy the main duration result and paste it directly into timesheets, reports, chat messages, or planning notes.",
  },
];

const howToSteps = [
  "Enter your start time.",
  "Enter your end time.",
  "Enable seconds precision if needed.",
  "Read instant duration plus total hours, minutes, and seconds.",
  "Copy or save the result for later use.",
];

export default function TimeDurationCalculatorSEO() {
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
    name: "How to calculate time duration between two times",
    description:
      "Use this online time duration calculator to find hours, minutes, and seconds between start and end times, including overnight shifts.",
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
          Time Duration Calculator: Calculate Hours, Minutes, and Seconds Between Two Times
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
          <p>
            Use this free <strong>Time Duration Calculator</strong> to calculate the exact difference between two times in
            seconds, minutes, and hours. Whether you need a simple <strong>hours and minutes calculator</strong>, an
            <strong> elapsed time calculator</strong>, or an <strong>overnight shift time calculator</strong>, this tool gives
            a clear answer instantly.
          </p>
          <p>
            Unlike many basic time calculators, this page is built for practical daily use. You can switch seconds precision
            on or off, swap start and end times in one click, copy results, and keep recent calculations ready for quick
            reuse. It is helpful for payroll prep, shift tracking, class planning, sports timing, event schedules, and
            productivity workflows.
          </p>
          <p>
            If you are searching for terms like <strong>time difference between two times</strong>,
            <strong> work hours calculator</strong>, <strong>shift duration calculator</strong>, or
            <strong> calculate time interval online</strong>, this tool is designed to solve exactly that problem with a fast,
            accurate, and privacy-friendly experience.
          </p>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Why This Time Duration Calculator Is Better Than Many Other Tools
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-lg border border-gray-100 p-5 bg-gray-50/60">
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Built for real time-tracking scenarios
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Many calculators only handle same-day inputs clearly. This tool detects overnight ranges automatically, which is
              essential for night shifts, late events, and cross-midnight schedules.
            </p>
          </div>

          <div className="rounded-lg border border-gray-100 p-5 bg-gray-50/60">
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Instant output without friction
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Results update as you type, so you do not need extra steps to see the answer. This makes repeated calculations
              faster when you are checking multiple time ranges.
            </p>
          </div>

          <div className="rounded-lg border border-gray-100 p-5 bg-gray-50/60">
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              More useful output in one view
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              You get readable duration text plus total hours, total minutes, and total seconds at the same time. That is
              useful for reports, timesheets, billing notes, and data entry workflows.
            </p>
          </div>

          <div className="rounded-lg border border-gray-100 p-5 bg-gray-50/60">
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Privacy-first and no signup required
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              The calculation runs in your browser, and your recent entries stay local to your device. You can use the tool
              instantly without account creation or unnecessary setup.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Calculate Time Duration Between Start and End Time
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Step-by-step guide
            </h3>
            <ol className="space-y-3 text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">1</span>
                <span><strong>Set the start time:</strong> Choose when the activity began.</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">2</span>
                <span><strong>Set the end time:</strong> Choose when the activity finished.</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">3</span>
                <span><strong>Enable seconds when needed:</strong> Use HH:MM:SS for precision tasks.</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">4</span>
                <span><strong>Read the results instantly:</strong> See formatted duration plus totals.</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">5</span>
                <span><strong>Copy or save your result:</strong> Reuse output in timesheets or plans.</span>
              </li>
            </ol>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Helpful built-in actions
            </h3>
            <ul className="space-y-2 text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Swap start and end times instantly
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Use quick presets such as work day and half day
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Detect and mark overnight duration automatically
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Keep recent calculations in local history
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Copy final duration with one click
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Who Uses This Time Difference Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Employees and freelancers
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Calculate daily work duration, shift windows, and overtime-ready time intervals.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              HR and operations teams
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Validate schedule blocks and compare start/end ranges quickly during roster planning.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Students and educators
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Plan study sessions, exam duration, and class activity timings without manual calculations.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Event and meeting planners
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Measure segment lengths and schedule transitions for smoother event execution.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Sports and fitness users
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Use seconds precision to track workouts, intervals, lap timing, and training sessions.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Anyone needing quick elapsed time math
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Replace manual subtraction with a reliable online duration calculator for daily productivity.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Time Duration Examples
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-lg p-5">
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Standard office shift
            </h3>
            <div className="space-y-2 text-gray-600" style={{ fontFamily: "var(--font-body)" }}>
              <div className="flex justify-between items-center">
                <span className="text-sm">Start:</span>
                <span className="font-mono font-semibold text-gray-900">09:30</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">End:</span>
                <span className="font-mono font-semibold text-gray-900">17:45</span>
              </div>
              <div className="flex justify-between items-center border-t border-gray-200 pt-2">
                <span className="text-sm font-semibold">Duration:</span>
                <span className="font-mono font-bold text-primary">8 hours, 15 minutes</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-5">
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Overnight shift
            </h3>
            <div className="space-y-2 text-gray-600" style={{ fontFamily: "var(--font-body)" }}>
              <div className="flex justify-between items-center">
                <span className="text-sm">Start:</span>
                <span className="font-mono font-semibold text-gray-900">22:15</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">End:</span>
                <span className="font-mono font-semibold text-gray-900">06:45</span>
              </div>
              <div className="flex justify-between items-center border-t border-gray-200 pt-2">
                <span className="text-sm font-semibold">Duration:</span>
                <span className="font-mono font-bold text-primary">8 hours, 30 minutes</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-5">
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Class or session block
            </h3>
            <div className="space-y-2 text-gray-600" style={{ fontFamily: "var(--font-body)" }}>
              <div className="flex justify-between items-center">
                <span className="text-sm">Start:</span>
                <span className="font-mono font-semibold text-gray-900">14:00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">End:</span>
                <span className="font-mono font-semibold text-gray-900">15:30</span>
              </div>
              <div className="flex justify-between items-center border-t border-gray-200 pt-2">
                <span className="text-sm font-semibold">Duration:</span>
                <span className="font-mono font-bold text-primary">1 hour, 30 minutes</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-5">
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Seconds-precision timing
            </h3>
            <div className="space-y-2 text-gray-600" style={{ fontFamily: "var(--font-body)" }}>
              <div className="flex justify-between items-center">
                <span className="text-sm">Start:</span>
                <span className="font-mono font-semibold text-gray-900">08:15:30</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">End:</span>
                <span className="font-mono font-semibold text-gray-900">10:45:45</span>
              </div>
              <div className="flex justify-between items-center border-t border-gray-200 pt-2">
                <span className="text-sm font-semibold">Duration:</span>
                <span className="font-mono font-bold text-primary">2 hours, 30 minutes, 15 seconds</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Calculation Logic and Accuracy
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
          <p>
            The duration is calculated by converting start and end times into seconds, subtracting start from end, and then
            converting the result back into hours, minutes, and seconds for display.
          </p>
          <p>
            For overnight scenarios, if end time is earlier than start time, the tool adds 24 hours to complete the correct
            next-day calculation. This prevents negative results and reflects real-world shift behavior.
          </p>
          <p>
            When seconds precision is disabled, the result is shown at minute-level output; when enabled, the tool displays
            full second-level detail for higher accuracy.
          </p>
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
