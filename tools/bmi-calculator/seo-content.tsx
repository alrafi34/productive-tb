export default function BmiCalculatorSEO() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is this BMI calculator free to use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. It is a free online BMI calculator with no account required."
        }
      },
      {
        "@type": "Question",
        name: "Does metric or imperial mode change the final BMI?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Unit conversion is handled automatically, so your BMI remains mathematically equivalent."
        }
      },
      {
        "@type": "Question",
        name: "What is considered a healthy BMI range?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "For most adults, a BMI between 18.5 and 24.9 is considered the normal range."
        }
      },
      {
        "@type": "Question",
        name: "Can BMI tell me my exact body fat percentage?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. BMI is a screening metric based on height and weight, not a direct body fat measurement."
        }
      },
      {
        "@type": "Question",
        name: "Is my data uploaded to a server?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Calculations run in your browser. Saved history is stored locally on your device."
        }
      },
      {
        "@type": "Question",
        name: "Should I use BMI alone to make health decisions?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Use BMI as a starting point, then combine it with other indicators and professional medical guidance."
        }
      }
    ]
  };

  return (
    <div className="mt-12 max-w-4xl mx-auto space-y-8 text-gray-700">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Free BMI Calculator: Check Body Mass Index Online
        </h2>
        <p className="leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)" }}>
          This free BMI Calculator helps you calculate Body Mass Index in seconds using either metric (cm, kg) or
          imperial (ft, in, lb) units. Enter your height and weight to get an instant BMI score, your BMI category,
          a healthy weight range, and practical estimates for ideal body weight. If you are looking for a reliable
          online BMI calculator that is fast, clear, and mobile-friendly, this tool is built for exactly that.
        </p>
        <p className="leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
          People search for terms like &quot;calculate BMI online,&quot; &quot;BMI chart,&quot; &quot;healthy weight range calculator,&quot;
          and &quot;BMI calculator metric and imperial.&quot; This page combines all of those needs in one place without
          complicated steps, popups, or forced sign-up.
        </p>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How BMI Is Calculated
        </h2>
        <p className="leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)" }}>
          BMI (Body Mass Index) estimates body weight relative to height. It is widely used as a screening measure
          for adults. The calculator uses the standard formula:
        </p>
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 text-sm font-mono text-gray-800 mb-4">
          BMI = weight (kg) / [height (m)]^2
        </div>
        <p className="leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)" }}>
          For imperial inputs, your values are converted internally so you get the same accurate BMI value you would
          get in metric mode. A BMI of 23.4 remains 23.4 regardless of the unit system.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              BMI Categories Used
            </h3>
            <ul className="space-y-1 text-sm" style={{ fontFamily: "var(--font-body)" }}>
              <li>Underweight: below 18.5</li>
              <li>Normal weight: 18.5 to 24.9</li>
              <li>Overweight: 25.0 to 29.9</li>
              <li>Obesity: 30.0 and above</li>
            </ul>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Extra Outputs You Get
            </h3>
            <ul className="space-y-1 text-sm" style={{ fontFamily: "var(--font-body)" }}>
              <li>Healthy weight range based on your height</li>
              <li>Ideal weight estimates using Devine and Robinson formulas</li>
              <li>Visual BMI scale to understand your current position</li>
              <li>Instant recalculation as inputs change</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use This BMI Calculator
        </h2>
        <ol className="space-y-3 leading-relaxed list-decimal list-inside" style={{ fontFamily: "var(--font-body)" }}>
          <li>Select your preferred unit system: metric or imperial.</li>
          <li>Enter your current height and weight.</li>
          <li>Review your BMI value and category instantly.</li>
          <li>Check your healthy weight range for your height.</li>
          <li>Use the weight simulator slider to test target weight scenarios.</li>
          <li>Optionally save results in local history for progress tracking.</li>
        </ol>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Why This BMI Calculator Is Better Than Many Basic Alternatives
        </h2>
        <p className="leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)" }}>
          Many BMI tools online return only one number and stop there. This tool goes further so users can take action,
          not just view a score.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              What You Get Here
            </h3>
            <ul className="space-y-1 text-sm" style={{ fontFamily: "var(--font-body)" }}>
              <li>Dual units with clean conversion between metric and imperial</li>
              <li>BMI category and a color-coded visual scale</li>
              <li>Healthy weight range based on your exact height</li>
              <li>Ideal weight estimates using recognized formulas</li>
              <li>Interactive simulation to preview possible BMI changes</li>
              <li>Local browser history for repeat check-ins</li>
            </ul>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Why It Matters for SEO and User Value
            </h3>
            <ul className="space-y-1 text-sm" style={{ fontFamily: "var(--font-body)" }}>
              <li>Comprehensive content answers more long-tail search intents</li>
              <li>Clear educational context improves topical relevance</li>
              <li>Practical, feature-rich output increases dwell time</li>
              <li>Simple UX lowers bounce from confusing calculator pages</li>
              <li>Fast in-browser calculations support mobile performance</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Who Should Use a BMI Calculator?
        </h2>
        <p className="leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)" }}>
          A BMI calculator is useful for adults who want a quick health screening number, set a realistic weight goal,
          or track trends during a fitness plan. It can be especially helpful when combined with related tools such as
          BMR, body fat, and daily calorie calculators.
        </p>
        <p className="leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
          If your BMI is outside the normal range, use the result as a starting point for discussion with a qualified
          healthcare professional. BMI is a screening indicator, not a diagnosis.
        </p>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Important Limitations of BMI
        </h2>
        <p className="leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)" }}>
          BMI is useful, but it does not measure body composition directly. It cannot distinguish muscle mass from fat
          mass, and it does not include waist circumference, metabolic markers, or medical history.
        </p>
        <ul className="space-y-2 text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
          <li>Very muscular individuals may get a higher BMI without excess body fat.</li>
          <li>Older adults may have normal BMI with lower muscle mass.</li>
          <li>Pregnancy, edema, or certain medical conditions can affect interpretation.</li>
          <li>Children and teens require age- and sex-specific BMI percentile charts.</li>
        </ul>
      </section>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-5">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-1" style={{ fontFamily: "var(--font-heading)" }}>
              Is this BMI calculator free to use?
            </h3>
            <p className="text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Yes. It is a free online BMI calculator with no account required.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-1" style={{ fontFamily: "var(--font-heading)" }}>
              Does metric or imperial mode change the final BMI?
            </h3>
            <p className="text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              No. Unit conversion is handled automatically, so your BMI remains mathematically equivalent.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-1" style={{ fontFamily: "var(--font-heading)" }}>
              What is considered a healthy BMI range?
            </h3>
            <p className="text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              For most adults, a BMI between 18.5 and 24.9 is considered the normal range.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-1" style={{ fontFamily: "var(--font-heading)" }}>
              Can BMI tell me my exact body fat percentage?
            </h3>
            <p className="text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              No. BMI is a screening metric based on height and weight, not a direct body fat measurement.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-1" style={{ fontFamily: "var(--font-heading)" }}>
              Is my data uploaded to a server?
            </h3>
            <p className="text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Calculations run in your browser. Saved history is stored locally on your device.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-1" style={{ fontFamily: "var(--font-heading)" }}>
              Should I use BMI alone to make health decisions?
            </h3>
            <p className="text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Use BMI as a starting point, then combine it with other indicators and professional medical guidance.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
