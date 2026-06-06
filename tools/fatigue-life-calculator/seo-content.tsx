export default function FatigueLifeCalculatorSEO() {
  return (
    <section className="mt-16 pt-12 border-t border-gray-200 prose prose-gray max-w-none">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Fatigue Life Calculator – Estimate Cycles to Failure
      </h2>
      <p className="text-gray-600 mb-4">
        Fatigue failure is responsible for the majority of mechanical component failures in engineering. This free fatigue life
        calculator helps engineers, designers, and students estimate how many stress cycles a component can withstand before
        failure using proven methods including the <strong>Basquin equation</strong>, <strong>S-N curve method</strong>, and
        <strong> Miner&apos;s Rule</strong> for cumulative damage analysis.
      </p>

      <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">What Is Fatigue Life?</h3>
      <p className="text-gray-600 mb-4">
        Fatigue life refers to the number of stress cycles a material or component can endure before failure occurs due to the
        initiation and propagation of cracks. Unlike static loading, cyclic loading — even below the yield strength — can cause
        progressive damage over time. Engineers use fatigue analysis to ensure components in bridges, aircraft, automotive
        parts, and industrial machinery operate safely within their design life.
      </p>

      <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">Calculation Methods Explained</h3>

      <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Basquin Equation (Stress-Life Method)</h4>
      <p className="text-gray-600 mb-3">
        The Basquin equation relates the alternating stress amplitude to the number of cycles to failure:
      </p>
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4 font-mono text-sm text-gray-800">
        σa = σ&apos;f × (2N)^b
        <br />
        Rearranged: N = 0.5 × (σa / σ&apos;f)^(1/b)
      </div>
      <p className="text-gray-600 mb-4">
        Where σa is the stress amplitude, σ&apos;f is the fatigue strength coefficient, N is the cycles to failure, and b is
        the fatigue strength exponent (typically −0.05 to −0.15 for metals).
      </p>

      <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-2">S-N Curve Method</h4>
      <p className="text-gray-600 mb-4">
        The S-N (Stress-Number) curve is an empirical plot of stress amplitude versus cycles to failure for a given material.
        This calculator uses embedded material data for steel, aluminum, titanium, and copper to interpolate expected fatigue
        life at a given stress level.
      </p>

      <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Miner&apos;s Rule (Cumulative Damage)</h4>
      <p className="text-gray-600 mb-3">
        Miner&apos;s Rule handles variable amplitude loading by accumulating damage from multiple stress blocks:
      </p>
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4 font-mono text-sm text-gray-800">
        D = Σ(n_i / N_i)
        <br />
        Failure predicted when D ≥ 1
      </div>
      <p className="text-gray-600 mb-4">
        Each load block contributes a damage fraction n/N, where n is the applied cycles and N is the cycles to failure at
        that stress level. When the cumulative damage D reaches 1.0, fatigue failure is predicted.
      </p>

      <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">Material Properties Used</h3>
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm text-gray-600 border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-50 text-gray-700">
              <th className="p-3 text-left font-semibold">Material</th>
              <th className="p-3 text-left font-semibold">σ&apos;f (MPa)</th>
              <th className="p-3 text-left font-semibold">b</th>
              <th className="p-3 text-left font-semibold">Endurance Limit (MPa)</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-gray-100">
              <td className="p-3">Steel</td>
              <td className="p-3">900</td>
              <td className="p-3">−0.12</td>
              <td className="p-3">250</td>
            </tr>
            <tr className="border-t border-gray-100">
              <td className="p-3">Aluminum</td>
              <td className="p-3">400</td>
              <td className="p-3">−0.11</td>
              <td className="p-3">140</td>
            </tr>
            <tr className="border-t border-gray-100">
              <td className="p-3">Titanium</td>
              <td className="p-3">800</td>
              <td className="p-3">−0.10</td>
              <td className="p-3">350</td>
            </tr>
            <tr className="border-t border-gray-100">
              <td className="p-3">Copper</td>
              <td className="p-3">300</td>
              <td className="p-3">−0.10</td>
              <td className="p-3">70</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">Practical Applications</h3>
      <ul className="list-disc list-inside text-gray-600 space-y-1 mb-4">
        <li>Structural component design in aerospace and automotive engineering</li>
        <li>Bridge and civil infrastructure life assessment</li>
        <li>Rotating machinery shaft and gear fatigue analysis</li>
        <li>Pressure vessel and pipeline inspection planning</li>
        <li>Maintenance scheduling based on predicted service life</li>
        <li>Product design validation for consumer goods under cyclic loading</li>
      </ul>

      <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">Frequently Asked Questions</h3>

      <h4 className="text-base font-semibold text-gray-800 mt-4 mb-1">
        What is the difference between the Basquin equation and S-N curve method?
      </h4>
      <p className="text-gray-600 mb-3">
        The Basquin equation is an analytical model parameterized by σ&apos;f and b, while the S-N curve method uses
        empirical test data. In practice this calculator uses Basquin to generate the S-N curve, so both methods are
        mathematically equivalent when using the same material parameters.
      </p>

      <h4 className="text-base font-semibold text-gray-800 mt-4 mb-1">
        What does the endurance limit mean?
      </h4>
      <p className="text-gray-600 mb-3">
        The endurance limit (or fatigue limit) is the stress amplitude below which a material can theoretically sustain an
        infinite number of cycles without fatigue failure. For steel this is typically around 250 MPa; aluminum does not have
        a true endurance limit.
      </p>

      <h4 className="text-base font-semibold text-gray-800 mt-4 mb-1">
        How does the safety factor affect the result?
      </h4>
      <p className="text-gray-600 mb-4">
        The safety factor divides the calculated fatigue life, giving a conservative (lower) design life. A safety factor of
        1.5 means the component is expected to last 1.5× longer than the minimum required life under the applied loading.
      </p>
    </section>
  );
}
