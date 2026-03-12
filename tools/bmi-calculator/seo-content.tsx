export default function BmiCalculatorSEO() {
  return (
    <>
      {/* How to Use Section */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Calculate Your Ideal BMI Instantly
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Simple Instructions
            </h3>
            <ol className="space-y-3 text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">1</span>
                <span><strong>Select Measurement Units:</strong> Use the convenient switch to alternate directly between the Imperial system (ft, in, lbs) or Metric scale (cm, kg).</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">2</span>
                <span><strong>Input Basic Vitals:</strong> Enter your core height and weight safely. These metrics process instantly on your device giving you hyper-responsive results.</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">3</span>
                <span><strong>Observe Instant Analysis:</strong> Review the overarching data outputs determining exactly where your ratio mathematically falls on the universal BMI baseline.</span>
              </li>
            </ol>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Data Analyzed
            </h3>
            <ul className="space-y-2 text-gray-600" style={{ fontFamily: "var(--font-body)" }}>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Discover your precise Body Mass Index integer (e.g., 22.45)
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Determine your universal medical weight status category
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Access simulated sliding scale models to manipulate target weights
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                View optimal mathematical "ideal weight" variables
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              How is my Body Mass Index originally calculated?
            </h3>
            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Body Mass Index formally utilizes a standardized medical equation representing the relationship determining an individual's weight against their height ratio. Simply put, it calculates your raw mass measured in kilograms formally divided by your height measured accurately in squared meters to gauge natural tissue mass proportional density.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              What defines a healthy BMI range?
            </h3>
            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              According to formal baseline medical models, any mathematical calculation landing broadly between 18.5 parameters and 24.9 parameters indicates a properly proportioned baseline categorized as Normal Healthy Weight against cardiovascular variables. Metrics underneath 18.5 lean into being medically Underweight, whereas scoring 25 and over categorizes formal Overweight parameters.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Can using Imperial and Metric systems change results?
            </h3>
            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Never. Because Body Mass Index operates uniformly based strictly off converted scale data logic, adjusting the inputs out from Centimeters directly over to Feet/Inches automatically runs the precise calculation utilizing equivalent baseline proportions. A 23.5 Metric result equals a 23.5 Imperial rating perfectly.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Are my submitted results saved externally?
            </h3>
            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Absolutely not. Our responsive utility leverages pure Client-Side JavaScript functionality, meaning everything securely executes locally strictly onto the computer CPU currently interpreting the data points. There is never any invasive database aggregation, tracking collection protocols, or active server connections. 
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Why Use Our Utility Model?
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-4xl mb-3">🛠️</div>
            <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>Interactive Sliding Scale</h3>
            <p className="text-gray-600 text-sm" style={{ fontFamily: "var(--font-body)" }}>Experiment dynamically utilizing the touch-friendly real-time simulator parameter; immediately mapping how a target loss/gain scenario directly impacts the integer ratios instantly.</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">📂</div>
            <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>Auto History Log</h3>
            <p className="text-gray-600 text-sm" style={{ fontFamily: "var(--font-body)" }}>Leverage the discrete browser-sided Local Storage interface which actively snapshots your recent variable inputs into an organized list securely—ideal for progressive fitness milestones mapping.</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">🛡️</div>
            <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>Robust Formula Estimates</h3>
            <p className="text-gray-600 text-sm" style={{ fontFamily: "var(--font-body)" }}>Utilizes standard medical Devine and Robinson proportional estimating functions underneath the primary interface to provide a comprehensive dual estimate target determining potential optimum body mass configurations.</p>
          </div>
        </div>
      </section>
    </>
  );
}
