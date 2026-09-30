import ToolFaq from "@/components/ToolFaq";
import { toolConfig } from "./config";

const comparisonPoints = [
  {
    title: "Built for real workflows, not one-off calculations",
    text: "You can calculate, copy, adjust precision, switch notation style, and save recent results without leaving the page.",
  },
  {
    title: "Handles practical exponent cases",
    text: "Supports positive powers, zero powers, negative powers, and fractional exponents in one place instead of requiring multiple tools.",
  },
  {
    title: "Clear learning support",
    text: "Optional expansion steps help students understand repeated multiplication for integer exponents.",
  },
  {
    title: "Fast and private browser execution",
    text: "No sign-up, no wait time, and no dependency on external calculator apps for everyday exponent operations.",
  },
];

const exponentRules = [
  { rule: "x^a * x^b = x^(a+b)", meaning: "When multiplying same base, add exponents." },
  { rule: "x^a / x^b = x^(a-b)", meaning: "When dividing same base, subtract exponents." },
  { rule: "(x^a)^b = x^(ab)", meaning: "Power of a power multiplies exponents." },
  { rule: "x^0 = 1 (x != 0)", meaning: "Any non-zero base to exponent 0 equals 1." },
  { rule: "x^-n = 1 / x^n", meaning: "Negative exponent gives reciprocal value." },
  { rule: "x^(1/n) = n-th root of x", meaning: "Fractional exponent represents roots." },
];

export default function ToolSEOContent() {
  // Same steps and questions as the HowTo / FAQPage schema
  const { howToSteps, faq } = toolConfig.seo;

  return (
    <>

      <div className="mt-12 space-y-8">
        <section className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            Exponent Calculator Online for Powers, Negative Exponents, and Fractional Powers
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)" }}>
            This free <strong>Exponent Calculator</strong> helps you calculate powers in the form x^y quickly and accurately.
            Whether you need a basic power value like 3^4, a reciprocal power like 10^-2, or a root-style input like 16^0.5,
            the result updates instantly as you type. It is useful for students, teachers, engineers, developers, financial
            modelers, and anyone who needs fast exponent math without manual errors.
          </p>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            Many users search for terms like power calculator, x to the y calculator, negative exponent calculator, or
            fractional exponent calculator. This page is built to cover those intent variations in one focused tool with
            readable output, formatting controls, and an easy interface that works across desktop and mobile.
          </p>
        </section>

        <section className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            Why This Exponent Calculator Is Better Than Typical Online Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {comparisonPoints.map((point) => (
              <div key={point.title} className="rounded-xl border border-gray-100 bg-gray-50/60 p-5">
                <h3 className="text-lg font-medium text-gray-900 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                  {point.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                  {point.text}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            In short, this is not just a result box. It is a practical exponent workflow that combines calculation, result
            formatting, clarity features, and history support in one interface.
          </p>
        </section>

        <section className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            How to Use the Exponent Calculator
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

        <section className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            Exponent Rules and Formula Reference
          </h2>
          <div className="overflow-x-auto rounded-xl border border-gray-100">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-3 border-b border-gray-100 text-gray-900">Rule</th>
                  <th className="text-left p-3 border-b border-gray-100 text-gray-900">Meaning</th>
                </tr>
              </thead>
              <tbody>
                {exponentRules.map((item) => (
                  <tr key={item.rule} className="border-b border-gray-100 last:border-b-0">
                    <td className="p-3 font-mono text-primary">{item.rule}</td>
                    <td className="p-3 text-gray-600">{item.meaning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-5 rounded-xl bg-gray-50 border border-gray-100 p-4 text-gray-600 text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            <p><strong>Core formula:</strong> x^y means multiplying x by itself y times when y is a positive integer.</p>
            <p className="mt-2"><strong>Example:</strong> 2^5 = 2 x 2 x 2 x 2 x 2 = 32.</p>
          </div>
        </section>

        <section className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            Worked Exponent Examples
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600" style={{ fontFamily: "var(--font-body)" }}>
            <div className="rounded-lg border border-gray-100 p-4 bg-gray-50">
              <p><strong>Positive exponent:</strong> 3^4 = 81</p>
              <p className="mt-1">Expanded: 3 x 3 x 3 x 3</p>
            </div>
            <div className="rounded-lg border border-gray-100 p-4 bg-gray-50">
              <p><strong>Negative exponent:</strong> 5^-2 = 1 / 25 = 0.04</p>
              <p className="mt-1">Reciprocal of 5^2</p>
            </div>
            <div className="rounded-lg border border-gray-100 p-4 bg-gray-50">
              <p><strong>Fractional exponent:</strong> 16^0.5 = 4</p>
              <p className="mt-1">Equivalent to square root of 16</p>
            </div>
            <div className="rounded-lg border border-gray-100 p-4 bg-gray-50">
              <p><strong>Zero exponent:</strong> 12^0 = 1</p>
              <p className="mt-1">Any non-zero base raised to zero equals one</p>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            Common Use Cases for Power Calculations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-600" style={{ fontFamily: "var(--font-body)" }}>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Education and exam preparation</h3>
              <p className="leading-relaxed text-sm">
                Quickly verify homework, classroom examples, and practice questions related to exponent rules and scientific notation.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Science and engineering calculations</h3>
              <p className="leading-relaxed text-sm">
                Evaluate growth, decay, scaling, and unit formulas where exponential values appear frequently.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Finance and compounding scenarios</h3>
              <p className="leading-relaxed text-sm">
                Estimate repeated multiplication effects in interest modeling and time-based projection work.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Programming and data workflows</h3>
              <p className="leading-relaxed text-sm">
                Validate power computations for scripts, formulas, and transformations without switching to another app.
              </p>
            </div>
          </div>
        </section>

        <ToolFaq items={faq} />
      </div>
    </>
  );
}
