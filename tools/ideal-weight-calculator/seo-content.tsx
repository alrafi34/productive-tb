import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ideal Weight Calculator – Check Healthy Weight for Your Height | Productive Toolbox",
  description: "Free online Ideal Weight Calculator. Enter your height and optionally age/gender to get recommended healthy weight range instantly in your browser. Copy results easily.",
  keywords: [
    "ideal weight calculator",
    "healthy weight calculator",
    "ideal weight for height",
    "weight calculator",
    "healthy weight range",
    "devine formula",
    "robinson formula",
    "miller formula",
    "broca index",
    "ideal weight chart"
  ],
  openGraph: {
    title: "Ideal Weight Calculator - Healthy Weight for Your Height",
    description: "Calculate your ideal weight range using multiple formulas. Instant results with support for metric and imperial units.",
    type: "website",
    url: "/tools/ideal-weight-calculator"
  }
};

export default function IdealWeightCalculatorSEO() {
  return (
    <div className="mt-12 max-w-4xl mx-auto space-y-8 text-gray-700">
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>About Ideal Weight Calculator</h2>
        <p className="text-base leading-relaxed mb-4">
          The Ideal Weight Calculator is a comprehensive tool designed to help you determine your healthy weight range based on your height and gender. Using multiple scientifically-backed formulas, this calculator provides personalized recommendations to support your health and fitness goals.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: "var(--font-heading)" }}>How It Works</h3>
        <p className="text-base leading-relaxed mb-4">
          Simply enter your height in either metric (cm) or imperial (ft/in) units, select your gender, and the calculator will instantly compute your ideal weight using four different formulas: Devine, Robinson, Miller, and Broca. You can also optionally enter your current weight to see how it compares to the recommended range.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Formulas Explained</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Devine Formula</h4>
            <p className="text-sm text-gray-600">
              The most widely used formula in medical practice. For males: 50 + 2.3 × (height in inches - 60). For females: 45.5 + 2.3 × (height in inches - 60).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Robinson Formula</h4>
            <p className="text-sm text-gray-600">
              A more conservative estimate. For males: 52 + 1.9 × (height in inches - 60). For females: 49 + 1.7 × (height in inches - 60).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Miller Formula</h4>
            <p className="text-sm text-gray-600">
              Offers a middle ground between other formulas. For males: 56.2 + 1.41 × (height in inches - 60). For females: 53.1 + 1.36 × (height in inches - 60).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Broca Index</h4>
            <p className="text-sm text-gray-600">
              A quick estimate formula: Height (cm) - 100, with a ±10% range for flexibility.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Key Features</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex gap-2">
            <span className="text-primary font-bold">✓</span>
            <span>Multiple formula options for comprehensive analysis</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary font-bold">✓</span>
            <span>Support for both metric and imperial units</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary font-bold">✓</span>
            <span>Real-time calculations as you type</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary font-bold">✓</span>
            <span>Compare current weight with recommended ranges</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary font-bold">✓</span>
            <span>Easy copy-to-clipboard functionality</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary font-bold">✓</span>
            <span>100% client-side processing - no data stored</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary font-bold">✓</span>
            <span>Mobile-friendly responsive design</span>
          </li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Why Use This Calculator?</h3>
        <p className="text-base leading-relaxed mb-4">
          Maintaining a healthy weight is crucial for overall wellness. This calculator helps you:
        </p>
        <ul className="space-y-2 text-sm text-gray-600 ml-4">
          <li>• Set realistic weight goals based on your height</li>
          <li>• Track progress toward your ideal weight range</li>
          <li>• Understand different weight estimation methods</li>
          <li>• Make informed decisions about your health</li>
          <li>• Share results with healthcare professionals</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: "var(--font-heading)" }}>Important Notes</h3>
        <p className="text-sm text-gray-600 mb-3">
          This calculator provides estimates based on mathematical formulas and should not replace professional medical advice. Ideal weight varies based on factors like muscle mass, bone density, and overall fitness level. Always consult with a healthcare provider for personalized recommendations.
        </p>
      </section>
    </div>
  );
}
