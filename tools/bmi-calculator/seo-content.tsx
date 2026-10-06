import ToolFaq from "@/components/ToolFaq";
import { toolConfig } from "./config";

export default function BmiCalculatorSEO() {
  const { howToSteps, faq } = toolConfig.seo;


  return (
    <>

      {/* ── 1. Introduction ── */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a BMI Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>BMI calculator</strong> is a free health screening tool that computes your Body Mass Index from
            your height and weight. BMI is the most widely used metric for classifying adult weight status — it is
            referenced by the World Health Organization, the CDC, and healthcare providers in every country as a
            first-pass indicator of whether a person's weight relative to their height falls within a healthy range.
          </p>
          <p>
            The challenge with most online BMI calculators is that they return a single number and stop there. That
            number — say, 27.4 — is not actionable on its own. You need context: What category does that place you in?
            How far is it from the healthy range? How much would you need to weigh to reach a healthy BMI at your
            height? What does that translate to in actual kilograms or pounds?
          </p>
          <p>
            This calculator answers all of those questions in one place. Beyond the BMI score, it shows your{" "}
            <strong>BMI category</strong>, the <strong>healthy weight range for your exact height</strong>, and{" "}
            <strong>ideal weight estimates</strong> using the clinically established Devine and Robinson formulas.
            It supports both metric (kg/cm) and imperial (lb/ft/in) units and requires
            no account or sign-up.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How BMI Is Calculated
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            BMI uses one of two equivalent formulas depending on your unit system. Both produce the same result — the
            calculator converts internally so switching units never changes your BMI value.
          </p>
          <div className="grid md:grid-cols-2 gap-4 my-4">
            <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4">
              <p className="text-sm font-medium text-gray-500 mb-1">Metric Formula</p>
              <p className="font-mono text-base text-gray-900 font-semibold">BMI = weight (kg) ÷ height (m)²</p>
              <p className="text-xs text-gray-500 mt-2">Example: 70 kg ÷ (1.75 m)² = 22.9</p>
            </div>
            <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-4">
              <p className="text-sm font-medium text-gray-500 mb-1">Imperial Formula</p>
              <p className="font-mono text-base text-gray-900 font-semibold">BMI = (weight (lb) × 703) ÷ height (in)²</p>
              <p className="text-xs text-gray-500 mt-2">Example: (154 lb × 703) ÷ 69² = 22.7</p>
            </div>
          </div>
          <p>
            The <strong>healthy weight range</strong> is derived by back-solving the formula: the minimum healthy
            weight at your height equals 18.5 × height(m)², and the maximum equals 24.9 × height(m)². The{" "}
            <strong>ideal weight estimates</strong> use the Devine and Robinson formulas — both are based on height
            in inches above 5 feet and are widely used in clinical pharmacology for drug dosing calculations.
          </p>
        </div>
      </section>

      {/* ── 3. Step-by-Step Usage ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the BMI Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Step-by-Step Guide</h3>
            <ol className="space-y-4 text-gray-600 leading-relaxed">
              {howToSteps.map(({ name: title, text: desc }, i) => (
                <li key={i} className="flex items-start">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">{i + 1}</span>
                  <span><strong>{title}:</strong> {desc}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>What This Calculator Provides</h3>
            <ul className="space-y-2 text-gray-600">
              {[
                "BMI score to 1 decimal place",
                "WHO category: Underweight, Normal, Overweight, Obese",
                "Color-coded visual scale showing your position",
                "Healthy weight range (min–max kg or lb) for your height",
                "Ideal weight via Devine formula (clinical reference)",
                "Ideal weight via Robinson formula (clinical reference)",
                "Weight simulator slider — preview BMI at target weights",
                "Local history log for tracking changes over time",
                "Metric and imperial — switch anytime without data loss",
                "Private: your inputs are not collected or stored",
              ].map((f, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-green-500 flex-shrink-0">✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>


      {/* ── 4. Use Cases ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Real-World Use Cases
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: "Setting a Realistic Weight-Loss Goal",
              scenario: "A 5 ft 8 in (173 cm) person weighing 210 lbs (95 kg) has a BMI of 31.9 — Class I Obesity. They use the healthy weight range output to find that reaching a BMI of 24.9 requires a weight of 164 lbs (74 kg). The weight simulator shows that losing just 20 lbs (9 kg) would bring them to 190 lbs — a BMI of 28.9, out of the obese range and into overweight. That intermediate milestone is psychologically more achievable than the full 46-lb target.",
            },
            {
              title: "Pre-Appointment Health Screening",
              scenario: "A person scheduling their annual physical checks their BMI the day before so they can have an informed conversation with their doctor. They calculate a BMI of 26.2 — borderline overweight — and note their healthy weight range is about 115–154 lbs for their 5 ft 6 in height. Armed with this context, they ask their doctor about waist circumference and cholesterol as additional risk indicators rather than just hearing their BMI read out in the appointment.",
            },
            {
              title: "Fitness Plan Progress Tracking",
              scenario: "Someone starting a 12-week training program checks their BMI at the start (29.1), at week 4 (28.3), week 8 (27.6), and week 12 (26.8). Using the built-in history log, they can see the trend clearly. The simulator shows they need to drop another 8 kg to reach a healthy BMI — which becomes the goal for their next training block.",
            },
            {
              title: "Clinical Drug Dosing Reference",
              scenario: "A pharmacist or medical student uses the Devine and Robinson ideal weight outputs as a quick cross-reference when verifying weight-based drug dosing calculations. Both formulas are well-established in pharmacology — the calculator surfaces both so the clinician can apply whichever protocol their institution uses, with the values available in both kg and lb.",
            },
            {
              title: "Evaluating Underweight Risk",
              scenario: "A parent notices their adult child looks noticeably thin after a stressful year. They use the calculator together — at 5 ft 4 in and 100 lbs, the BMI comes out at 17.2, classified as Underweight. The healthy weight range shows they need to be between 108 and 145 lbs. This concrete range helps frame a constructive conversation about nutrition and prompts a GP visit.",
            },
            {
              title: "Insurance and Health Assessment Forms",
              scenario: "Many health insurance applications, employer wellness programs, and gym membership intake forms ask for BMI. Rather than calculating manually or using a formula from memory, someone fills in their height and weight here, gets the BMI to one decimal place, and copies it directly into the form — confident the number is accurate.",
            },
          ].map(({ title, scenario }) => (
            <div key={title} className="bg-gray-50 border border-gray-100 rounded-lg p-5">
              <h3 className="font-semibold text-gray-800 mb-2 text-sm" style={{ fontFamily: "var(--font-heading)" }}>{title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{scenario}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. BMI Reference Table ── */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          BMI Categories &amp; Healthy Weight Reference
        </h2>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">BMI Range</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Category</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Risk of related disease (WHO)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Below 18.5",  "Underweight",      "Low, but the risk of other clinical problems rises"],
                ["18.5 – 24.9", "Normal weight",    "Average"],
                ["25.0 – 29.9", "Overweight",       "Increased"],
                ["30.0 – 34.9", "Obesity class I",  "Moderate"],
                ["35.0 – 39.9", "Obesity class II", "Severe"],
                ["40.0+",       "Obesity class III","Very severe"],
              ].map(([range, category, risk]) => (
                <tr key={range} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-mono font-semibold text-primary">{range}</td>
                  <td className="py-2.5 px-4 font-semibold text-gray-800">{category}</td>
                  <td className="py-2.5 px-4 text-gray-600 text-xs">{risk}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs text-gray-500 mt-3">
            Source: World Health Organization adult BMI classification (Technical Report Series 894); the US CDC
            uses the same cut-offs for adults. These categories do not apply to children and teens, who are
            assessed with BMI-for-age percentiles.
          </p>
        </div>

        <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
          Healthy Weight Range by Height
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Height (cm)</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Height (ft/in)</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Min Healthy Weight</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Max Healthy Weight</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["155 cm", "5 ft 1 in",  "44.4 kg / 97.9 lb",  "59.8 kg / 131.8 lb"],
                ["160 cm", "5 ft 3 in",  "47.4 kg / 104.4 lb", "63.7 kg / 140.4 lb"],
                ["165 cm", "5 ft 5 in",  "50.3 kg / 110.9 lb", "67.7 kg / 149.3 lb"],
                ["170 cm", "5 ft 7 in",  "53.5 kg / 117.9 lb", "71.9 kg / 158.5 lb"],
                ["175 cm", "5 ft 9 in",  "56.7 kg / 125.0 lb", "76.3 kg / 168.2 lb"],
                ["180 cm", "5 ft 11 in", "59.9 kg / 132.1 lb", "80.7 kg / 177.9 lb"],
                ["185 cm", "6 ft 1 in",  "63.3 kg / 139.5 lb", "85.2 kg / 187.8 lb"],
                ["190 cm", "6 ft 3 in",  "66.8 kg / 147.2 lb", "89.8 kg / 197.9 lb"],
              ].map(([cm, ft, min, max]) => (
                <tr key={cm} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-mono text-gray-800">{cm}</td>
                  <td className="py-2.5 px-4 text-gray-600 text-xs">{ft}</td>
                  <td className="py-2.5 px-4 font-semibold text-gray-700 text-xs">{min}</td>
                  <td className="py-2.5 px-4 font-semibold text-gray-700 text-xs">{max}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-4">
          * Healthy weight range calculated using WHO BMI thresholds of 18.5 (minimum) and 24.9 (maximum). Values rounded to one decimal place.
        </p>
      </section>

      {/* ── 6. FAQ ── */}
      <ToolFaq items={faq} />

      {/* ── Medical Disclaimer ── */}
      <section className="mt-8 bg-amber-50 rounded-xl border border-amber-100 p-6">
        <h2 className="text-base font-semibold text-amber-900 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
          Medical Disclaimer
        </h2>
        <p className="text-sm text-amber-800 leading-relaxed">
          BMI is a population-level screening indicator, not a clinical diagnosis. Results from this calculator are
          for informational purposes only and do not constitute medical advice. If your BMI result is outside the
          normal range, or if you have any health concerns, consult a qualified healthcare professional before making
          changes to your diet, exercise routine, or treatment plan.
        </p>
      </section>
    </>
  );
}
