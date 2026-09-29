import ToolFaq from "@/components/ToolFaq";
import { gpaCalculatorConfig } from "./config";
import { GRADES } from "./logic";

export default function GpaCalculatorSEO() {
  // Same steps and questions as the HowTo / FAQPage schema
  const { howToSteps, faq } = gpaCalculatorConfig.seo;

  const card = "mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8";
  const h2 = "text-2xl font-semibold text-gray-900 mb-4";
  const percent: Record<string, string> = {
    "A+": "97–100", A: "93–96", "A-": "90–92", "B+": "87–89", B: "83–86", "B-": "80–82",
    "C+": "77–79", C: "73–76", "C-": "70–72", "D+": "67–69", D: "63–66", "D-": "60–62", F: "Below 60",
  };

  return (
    <>
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>How GPA Is Calculated</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>Your grade point average (GPA) is the average of your grade points, weighted by how many credits each course is worth, so a 4-credit class counts for more than a 2-credit one.</p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 font-mono text-sm text-gray-900 space-y-2">
            <p>Quality points = grade points × credits</p>
            <p>GPA = total quality points ÷ total credits</p>
          </div>
          <p>A weighted GPA adds a bonus to the grade points of harder classes before averaging, usually +0.5 for honors and +1.0 for AP, IB or dual-enrollment college classes. Schools differ: some weight only certain classes, some cap the bonus, and colleges often recalculate your GPA their own way when you apply.</p>
        </div>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>Letter Grades on the 4.0 Scale</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200"><th className="text-left py-2 px-3 font-semibold text-gray-700">Letter</th><th className="text-right py-2 px-3 font-semibold text-gray-700">Percentage</th><th className="text-right py-2 px-3 font-semibold text-gray-700">Grade points</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {GRADES.map((g) => (
                <tr key={g.letter} className="hover:bg-gray-50"><td className="py-1.5 px-3 text-left text-gray-900 text-xs">{g.letter}</td><td className="py-1.5 px-3 text-right text-gray-700 text-xs">{percent[g.letter]}</td><td className="py-1.5 px-3 text-right text-gray-700 text-xs">{g.points.toFixed(1)}{g.letter === "A+" ? " (4.3 at some schools)" : ""}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-500 mt-4">A common US scale; the percentage cut-offs are set by each school or teacher.</p>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>How to Use the GPA Calculator</h2>
        <ol className="space-y-3 text-gray-600 leading-relaxed">
          {howToSteps.map(({ name, text }, i) => (
            <li key={name} className="flex items-start">
              <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">{i + 1}</span>
              <span><strong>{name}:</strong> {text}</span>
            </li>
          ))}
        </ol>
      </section>

      <ToolFaq items={faq} />
    </>
  );
}
