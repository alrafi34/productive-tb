import ToolFaq from "@/components/ToolFaq";
import { oneRepMaxCalculatorConfig } from "./config";

export default function OneRepMaxSEO() {
  // Same steps and questions as the HowTo / FAQPage schema
  const { howToSteps, faq } = oneRepMaxCalculatorConfig.seo;

  const card = "mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8";
  const h2 = "text-2xl font-semibold text-gray-900 mb-4";

  return (
    <>
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>The One-Rep Max Formulas</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>Your one-rep max (1RM) is the heaviest weight you can lift once with good form. Rather than testing it directly, you can estimate it from a harder set of several reps; each formula below was fitted to data from lifters and gives slightly different results.</p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 font-mono text-sm text-gray-900 space-y-2">
            <p><span className="font-semibold">Epley</span> = w × (1 + r ÷ 30)</p>
            <p><span className="font-semibold">Brzycki</span> = w × 36 ÷ (37 − r)</p>
            <p><span className="font-semibold">Lander</span> = 100 × w ÷ (101.3 − 2.67123 × r)</p>
            <p><span className="font-semibold">Lombardi</span> = w × r<sup>0.10</sup></p>
            <p><span className="font-semibold">Mayhew</span> = 100 × w ÷ (52.2 + 41.9 × e<sup>−0.055r</sup>)</p>
            <p><span className="font-semibold">O&apos;Conner</span> = w × (1 + 0.025 × r)</p>
            <p><span className="font-semibold">Wathan</span> = 100 × w ÷ (48.8 + 53.8 × e<sup>−0.075r</sup>)</p>
          </div>
          <p>w is the weight lifted and r the number of reps. Example: 225 lb for 5 reps gives an estimated 1RM of about 260 lb (Epley 262.5 lb, Brzycki 253.1 lb).</p>
        </div>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>Percentage of 1RM and Typical Reps</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200"><th className="text-left py-2 px-3 font-semibold text-gray-700">% of 1RM</th><th className="text-right py-2 px-3 font-semibold text-gray-700">Reps</th><th className="text-right py-2 px-3 font-semibold text-gray-700">Typical use</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {([["95%", "2", "Maximal strength"], ["90%", "3–4", "Strength"], ["85%", "5–6", "Strength"], ["80%", "7–8", "Strength and size"], ["75%", "9–10", "Muscle growth"], ["70%", "11–12", "Muscle growth"], ["65%", "14–16", "Endurance, technique"], ["60%", "17–20", "Warm-up, technique"]] as string[][]).map((r) => (
                <tr key={r[0]} className="hover:bg-gray-50"><td className="py-1.5 px-3 text-left text-gray-900 text-xs">{r[0]}</td><td className="py-1.5 px-3 text-right text-gray-700 text-xs">{r[1]}</td><td className="py-1.5 px-3 text-right text-gray-700 text-xs">{r[2]}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-500 mt-4">Approximate; the reps you can manage at a given percentage vary with the lift and the lifter.</p>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>How to Use the One Rep Max Calculator</h2>
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
