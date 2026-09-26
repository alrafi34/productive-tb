import { celsiusToFahrenheitConverterConfig } from "./config";

export default function ToolSEOContent() {
  // Same questions and steps as the FAQPage / HowTo schema
  const faqItems = celsiusToFahrenheitConverterConfig.seo.faq;
  const howToSteps = celsiusToFahrenheitConverterConfig.seo.howToSteps;

  const everyday: [string, string, string][] = [
    ["Weather: a mild spring day", "15 °C", "59 °F"],
    ["Weather: a hot summer day", "30 °C", "86 °F"],
    ["Home thermostat", "21 °C", "69.8 °F"],
    ["Normal body temperature", "37 °C", "98.6 °F"],
    ["Fever threshold", "38 °C", "100.4 °F"],
    ["Oven for cakes", "180 °C", "356 °F (set 350 °F)"],
    ["Oven for roasting", "200 °C", "392 °F (set 400 °F)"],
    ["Freezer", "−18 °C", "−0.4 °F (≈ 0 °F)"],
  ];

  return (
    <>
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How to Convert Celsius to Fahrenheit
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            To convert <strong>Celsius to Fahrenheit</strong>, multiply by 9/5 (or 1.8) and add 32. To go the other
            way, <strong>Fahrenheit to Celsius</strong>, subtract 32 and divide by 1.8.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4">
            <div className="space-y-1.5 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">°F</span> = °C × 9/5 + 32</p>
              <p><span className="font-semibold">°C</span> = (°F − 32) × 5/9</p>
              <p className="text-gray-500 text-xs mt-2">Example: 25 °C × 1.8 = 45; 45 + 32 = <span className="text-green-600 font-semibold">77 °F</span></p>
              <p className="text-gray-500 text-xs">Example: 68 °F − 32 = 36; 36 ÷ 1.8 = <span className="text-green-600 font-semibold">20 °C</span></p>
            </div>
          </div>
          <p>
            The two scales measure the same thing with different zero points and step sizes. Water freezes at 0 °C
            (32 °F) and boils at 100 °C (212 °F) at sea level, so 100 Celsius degrees span the same range as 180
            Fahrenheit degrees. That ratio, 180/100 = 9/5, is where the 1.8 in the formula comes from, and the 32 is
            the offset between the two freezing points.
          </p>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use This Converter
        </h2>
        <ol className="space-y-4 text-gray-600 leading-relaxed">
          {howToSteps.map(({ name, text }, i) => (
            <li key={name} className="flex items-start">
              <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">{i + 1}</span>
              <span><strong>{name}:</strong> {text}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Everyday Temperatures in °C and °F
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-2 px-3 font-semibold text-gray-700">Situation</th>
                <th className="text-right py-2 px-3 font-semibold text-gray-700">Celsius</th>
                <th className="text-right py-2 px-3 font-semibold text-gray-700">Fahrenheit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {everyday.map(([situation, c, f]) => (
                <tr key={situation} className="hover:bg-gray-50">
                  <td className="py-2 px-3 text-gray-700 text-xs">{situation}</td>
                  <td className="py-2 px-3 text-right font-mono text-gray-600 text-xs">{c}</td>
                  <td className="py-2 px-3 text-right font-mono font-semibold text-gray-900 text-xs">{f}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-2">
          * Oven dials and recipes round to the nearest 25 °F or 10 °C, so a recipe&apos;s 180 °C and 350 °F are the same setting.
        </p>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Tips &amp; Common Mistakes
        </h2>
        <ul className="space-y-3 text-gray-600 leading-relaxed">
          {[
            "Multiply before adding. 20 °C is 20 × 1.8 + 32 = 68 °F, not (20 + 32) × 1.8 = 93.6 °F.",
            "Subtract before dividing going the other way. 98.6 °F is (98.6 − 32) ÷ 1.8 = 37 °C.",
            "A temperature change converts without the 32: a rise of 10 °C is a rise of 18 °F.",
            "For a quick weather estimate, double the Celsius value and add 30. Use the exact formula for cooking, medicine and science.",
            "Kelvin has no degree sign and starts at absolute zero: K = °C + 273.15.",
          ].map((tip) => (
            <li key={tip} className="flex items-start gap-2">
              <span className="text-primary font-bold flex-shrink-0 mt-0.5">💡</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {faqItems.map(({ q, a }, i) => (
            <div key={q} className={i < faqItems.length - 1 ? "border-b border-gray-100 pb-6" : ""}>
              <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>{q}</h3>
              <p className="text-gray-600 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
