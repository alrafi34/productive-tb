import ToolFaq from "@/components/ToolFaq";
import { averageCalculatorConfig } from "./config";

const H2 = "text-2xl font-semibold text-gray-900";
const HEADING = { fontFamily: "var(--font-heading)" };
const SECTION = "mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8";

/* One small data set, three kinds of "average". */
const SAMPLE = [2, 3, 3, 5, 7, 10, 40];

export default function AverageCalculatorSEO() {
  const { howToSteps, faq } = averageCalculatorConfig.seo;
  const sum = SAMPLE.reduce((a, b) => a + b, 0);

  return (
    <>
      <section className={`mt-12 ${SECTION.replace("mt-8 ", "")}`}>
        <h2 className={`${H2} mb-4`} style={HEADING}>What This Average Calculator Does</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            Paste or type a list of numbers and the calculator returns the <strong>average (arithmetic
            mean)</strong> as you type, together with the <strong>count, sum, minimum, maximum, median, mode, range
            and standard deviation</strong>. Tick <strong>Weighted average</strong> to give values different weights.
            Values can be separated by commas, spaces, tabs or new lines, and figures like 1,000 or $25 are read as
            numbers, so a row or column copied from Excel or Google Sheets works as it is.
          </p>
          <p>
            Use it for grades, prices, expenses, scores or measurements. The count is worth a glance: anything
            that is not a number, such as a header word, is skipped, so it tells you how many values were really
            averaged.
          </p>
        </div>
      </section>

      <section className={SECTION}>
        <h2 className={`${H2} mb-6`} style={HEADING}>How to Find the Average</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <ol className="space-y-4 text-gray-600 leading-relaxed">
            {howToSteps.map(({ name: title, text: desc }, i) => (
              <li key={i} className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">{i + 1}</span>
                <span><strong>{title}:</strong> {desc}</span>
              </li>
            ))}
          </ol>
          <div className="bg-gray-50 border border-gray-100 rounded-lg p-5">
            <h3 className="font-semibold text-gray-800 mb-2" style={HEADING}>The formula</h3>
            <p className="font-mono text-sm text-gray-900 mb-3">Average = (x₁ + x₂ + … + xₙ) ÷ n</p>
            <p className="text-sm text-gray-600">
              Example: 12, 18, 20 and 30 add up to 80. There are 4 numbers, so the average is 80 ÷ 4 = 20.
            </p>
          </div>
        </div>
      </section>

      <section className={SECTION}>
        <h2 className={`${H2} mb-4`} style={HEADING}>Mean, Median and Mode</h2>
        <p className="text-gray-600 leading-relaxed mb-4">
          &quot;Average&quot; usually means the mean, but it is not the only way to describe a typical value. For
          the numbers {SAMPLE.join(", ")}:
        </p>
        <ul className="space-y-2 text-gray-600 leading-relaxed list-disc ml-5">
          <li><strong>Mean</strong> = {sum} ÷ {SAMPLE.length} = {(sum / SAMPLE.length).toFixed(2)}. The single large value, 40, pulls it up.</li>
          <li><strong>Median</strong> = 5, the middle value of the sorted list. It ignores how extreme 40 is.</li>
          <li><strong>Mode</strong> = 3, the value that appears most often.</li>
        </ul>
        <p className="text-gray-600 leading-relaxed mt-4">
          When a few values are far from the rest, as with incomes or house prices, the median is often the
          fairer summary. When some values count more than others, such as a final exam worth 60% of a grade, tick
          Weighted average and enter the weights.
        </p>
      </section>

      <ToolFaq items={faq} />
    </>
  );
}
