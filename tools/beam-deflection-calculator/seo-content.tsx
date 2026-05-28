export default function BeamDeflectionCalculatorSEO() {
  return (
    <section className="mt-16 prose prose-gray max-w-none text-sm text-gray-600 space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 not-prose">About the Beam Deflection Calculator</h2>
      <p>
        The <strong>Beam Deflection Calculator</strong> is a free, browser-based structural engineering tool that
        computes beam deflection, slope, support reactions, bending moment, and shear force using
        Euler–Bernoulli beam theory. It supports simply supported, cantilever, fixed-end, and overhanging
        beams under point loads, uniformly distributed loads (UDL), and applied moments.
      </p>

      <h3 className="text-lg font-semibold text-gray-800 not-prose">Key Formulas Used</h3>
      <ul className="list-disc pl-5 space-y-1 not-prose">
        <li><strong>Simply Supported – Center Point Load:</strong> δ_max = PL³ / (48EI)</li>
        <li><strong>Simply Supported – UDL:</strong> δ_max = 5wL⁴ / (384EI)</li>
        <li><strong>Cantilever – End Point Load:</strong> δ_max = PL³ / (3EI)</li>
        <li><strong>Cantilever – UDL:</strong> δ_max = wL⁴ / (8EI)</li>
        <li><strong>Fixed Beam – Center Point Load:</strong> δ_max = PL³ / (192EI)</li>
        <li><strong>Fixed Beam – UDL:</strong> δ_max = wL⁴ / (384EI)</li>
      </ul>

      <h3 className="text-lg font-semibold text-gray-800 not-prose">What is Beam Deflection?</h3>
      <p>
        Beam deflection is the displacement of a structural beam from its original position when subjected
        to external loads. Engineers must calculate deflection to ensure beams remain within acceptable
        serviceability limits — typically L/360 for floor beams and L/240 for roof beams per AISC and
        building codes. Excessive deflection can cause cracking, misalignment, and structural failure.
      </p>

      <h3 className="text-lg font-semibold text-gray-800 not-prose">Supported Beam Types</h3>
      <ul className="list-disc pl-5 space-y-1 not-prose">
        <li><strong>Simply Supported Beam:</strong> Pinned at both ends, free to rotate. Most common in bridges and floor systems.</li>
        <li><strong>Cantilever Beam:</strong> Fixed at one end, free at the other. Used in balconies, overhangs, and brackets.</li>
        <li><strong>Fixed Beam:</strong> Both ends are fully restrained. Stiffer than simply supported — deflects less under the same load.</li>
        <li><strong>Overhanging Beam:</strong> Extends beyond one or both supports. Common in crane girders and continuous structures.</li>
      </ul>

      <h3 className="text-lg font-semibold text-gray-800 not-prose">Material Properties</h3>
      <p>
        The calculator includes preset elastic moduli for common engineering materials: Steel (200 GPa),
        Aluminum (69 GPa), Concrete (30 GPa), and Wood (12 GPa). A custom material option lets you enter
        any elastic modulus in GPa or ksi for specialized applications.
      </p>

      <h3 className="text-lg font-semibold text-gray-800 not-prose">Who Uses This Tool?</h3>
      <p>
        Mechanical engineers, civil engineers, structural engineers, architecture students, industrial
        fabricators, and machine designers use beam deflection calculators daily to verify structural
        designs, check code compliance, and estimate material requirements without specialized software.
      </p>
    </section>
  );
}
