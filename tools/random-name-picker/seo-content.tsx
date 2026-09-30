import ToolFaq from "@/components/ToolFaq";
import { randomNamePickerConfig } from "./config";

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
  // Same steps and questions as the HowTo / FAQPage schema
  const { howToSteps, faq } = randomNamePickerConfig.seo;

  return (
    <>

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

        <ToolFaq items={faq} />

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
