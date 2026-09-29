import ToolFaq from "@/components/ToolFaq";
import { macroCalculatorConfig } from "./config";

export default function MacroCalculatorSEO() {
  // Same steps and questions as the HowTo / FAQPage schema
  const { howToSteps, faq } = macroCalculatorConfig.seo;

  const card = "mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8";
  const h2 = "text-2xl font-semibold text-gray-900 mb-4";

  return (
    <>
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>How Your Macros Are Calculated</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>Macronutrients are the three nutrients that supply calories: protein, carbohydrate and fat. The calculator estimates how many calories you burn a day, adjusts for your goal, then divides the calories between the three according to the diet you choose.</p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4 font-mono text-sm text-gray-900 space-y-2">
            <p><span className="font-semibold">BMR (men)</span> = 10 × kg + 6.25 × cm − 5 × age + 5</p>
            <p><span className="font-semibold">BMR (women)</span> = 10 × kg + 6.25 × cm − 5 × age − 161</p>
            <p><span className="font-semibold">Maintenance (TDEE)</span> = BMR × activity factor (1.2 – 1.9)</p>
            <p><span className="font-semibold">Grams</span> = Calories × % ÷ 4 for protein and carbs, ÷ 9 for fat</p>
          </div>
          <p>BMR uses the Mifflin–St Jeor equation (1990), recommended by the Academy of Nutrition and Dietetics as the most accurate of the common formulas.</p>
        </div>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>Macro Splits</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200"><th className="text-left py-2 px-3 font-semibold text-gray-700">Diet</th><th className="text-right py-2 px-3 font-semibold text-gray-700">Protein</th><th className="text-right py-2 px-3 font-semibold text-gray-700">Carbs</th><th className="text-right py-2 px-3 font-semibold text-gray-700">Fat</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {([["Balanced", "30%", "40%", "30%"], ["High protein", "40%", "30%", "30%"], ["Low carb", "40%", "20%", "40%"], ["Keto", "25%", "5%", "70%"], ["High carb (endurance)", "20%", "55%", "25%"]] as string[][]).map((r) => (
                <tr key={r[0]} className="hover:bg-gray-50"><td className="py-1.5 px-3 text-left text-gray-900 text-xs">{r[0]}</td><td className="py-1.5 px-3 text-right text-gray-700 text-xs">{r[1]}</td><td className="py-1.5 px-3 text-right text-gray-700 text-xs">{r[2]}</td><td className="py-1.5 px-3 text-right text-gray-700 text-xs">{r[3]}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-500 mt-4">Percentages of daily calories. Choose Custom in the calculator for any other split.</p>
      </section>

      <section className={card}>
        <h2 className={h2} style={{ fontFamily: "var(--font-heading)" }}>How to Use the Macro Calculator</h2>
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
