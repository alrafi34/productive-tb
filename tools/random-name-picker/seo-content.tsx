const faqItems = [
  {
    question: "What is a random name picker?",
    answer:
      "A random name picker selects one or more winners from a list using a randomized selection process so each valid entry has a fair chance.",
  },
  {
    question: "Why is this tool better than basic random picker tools?",
    answer:
      "It combines file import, duplicate filtering, multi-winner drawing, optional winner removal, animated reveal, history tracking, and TXT/CSV export in one workflow.",
  },
  {
    question: "Can I pick multiple winners in one draw?",
    answer:
      "Yes. Set the number of winners and the tool will select up to that many names from the current list.",
  },
  {
    question: "Can I remove duplicates before drawing?",
    answer:
      "Yes. Enable duplicate removal to ensure repeated names do not increase selection weight.",
  },
  {
    question: "What does remove winner after pick do?",
    answer:
      "When enabled, selected winners are removed from the list so future rounds cannot pick the same names again.",
  },
  {
    question: "Can I import a list from TXT or CSV?",
    answer:
      "Yes. You can upload TXT or CSV files and the tool parses names into the participant list automatically.",
  },
  {
    question: "Can I export winners and draw history?",
    answer:
      "Yes. Winners can be downloaded as TXT and history can be exported as CSV with round and timestamp details.",
  },
  {
    question: "Is the selection process fair?",
    answer:
      "The tool shuffles the list using a Fisher-Yates style approach and draws from that randomized order.",
  },
  {
    question: "Does this tool keep a history of rounds?",
    answer:
      "Yes. It records winner name, round number, and time so you can audit and share draw outcomes.",
  },
  {
    question: "Is my participant data private?",
    answer:
      "Yes. Name processing and drawing happen in your browser without requiring server-side submission.",
  },
];

const howToSteps = [
  "Paste names (one per line) or import a TXT/CSV file.",
  "Set options like number of winners, duplicate removal, and remove-winner-after-pick.",
  "Click Pick Winner to run the draw with optional animation.",
  "Review winners, then copy or download the results.",
  "Use winner history for multi-round tracking and export CSV when needed.",
];

const strengths = [
  {
    title: "Complete draw workflow in one interface",
    text: "From participant input to winner export, everything is handled without switching tools.",
  },
  {
    title: "Fairness controls for real-world draws",
    text: "Duplicate filtering and winner-removal rules help run cleaner, more transparent selections.",
  },
  {
    title: "Round-based history and audit trail",
    text: "Each draw is logged with round and timestamp, making events easier to validate and report.",
  },
  {
    title: "Flexible import and export actions",
    text: "Load participant files quickly and export outcomes in TXT or CSV for records and announcements.",
  },
];

const optionGuide = [
  {
    option: "Number of Winners",
    use: "Choose how many winners to draw per round based on your giveaway or classroom format.",
  },
  {
    option: "Remove Duplicates",
    use: "Keep each unique participant as a single entry to avoid accidental weighting.",
  },
  {
    option: "Remove Winner After Pick",
    use: "Prevent repeat winners across rounds when running phased selections.",
  },
  {
    option: "Animation Enabled",
    use: "Display animated name cycling before final result for event-style presentation.",
  },
  {
    option: "Shuffle List",
    use: "Randomize participant order before drawing if you want a refreshed visual list.",
  },
  {
    option: "Import File",
    use: "Load names from TXT or CSV to save time with larger participant sets.",
  },
  {
    option: "Winner History",
    use: "Track previous rounds and export audit data as CSV for documentation.",
  },
  {
    option: "Copy and Download",
    use: "Share winners instantly by clipboard copy or save outputs as files.",
  },
];

const useCases = [
  {
    title: "Giveaways and raffle campaigns",
    detail: "Draw winners transparently from social, community, or newsletter participant lists.",
  },
  {
    title: "Classroom participation",
    detail: "Select students fairly for questions, activities, and group leadership roles.",
  },
  {
    title: "Team games and events",
    detail: "Pick captains, task owners, and challenge participants without bias.",
  },
  {
    title: "Webinar and live stream engagement",
    detail: "Run real-time winner announcements with animation and quick result sharing.",
  },
  {
    title: "Office rotation and assignments",
    detail: "Randomize responsibility allocation for shifts, reviews, or presentation order.",
  },
  {
    title: "Community moderation workflows",
    detail: "Select random feedback reviewers or beta testers from member pools.",
  },
];

const mistakesToAvoid = [
  "Leaving duplicate entries enabled when fairness requires one chance per person.",
  "Requesting more winners than available unique participants.",
  "Forgetting to enable winner removal during multi-round elimination formats.",
  "Skipping history export when you need an auditable event record.",
  "Importing CSV files with extra separators without validating parsed names.",
];

export default function RandomNamePickerSEOContent() {
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
    name: "How to use the random name picker",
    description:
      "Add participant names, configure winner rules, run random draws, and export results and history.",
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

      <div className="max-w-4xl mx-auto mt-12 space-y-8">
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            Random Name Picker for Fair Winner Selection, Multi-Round Draws, and Export-Ready Results
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)" }}>
            This free <strong>Random Name Picker</strong> helps you choose one or multiple winners from participant lists quickly and transparently.
            It is useful for giveaways, classrooms, team activities, and any decision where unbiased random selection matters.
          </p>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            Instead of manual draws, you get duplicate control, winner-removal logic, round history, and export tools in one practical interface.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            Why This Tool Is Better Than Basic Name Pickers
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
            Basic tools often only pick one name. This tool supports operational needs like imports, history, and structured exports.
          </p>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            How to Use the Random Name Picker
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
            Option Guide
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
            Common Mistakes to Avoid in Random Draws
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
            Run Fairer Draws with Better Controls, Better Transparency, and Better Record Keeping
          </h2>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            With import flexibility, draw rules, winner history, and export-ready outputs, this random picker helps you manage selections more confidently than basic one-click alternatives.
          </p>
        </section>
      </div>
    </>
  );
}
