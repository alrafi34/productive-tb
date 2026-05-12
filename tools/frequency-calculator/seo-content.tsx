export default function FrequencyCalculatorSEO() {
  return (
    <div className="mt-16 max-w-4xl mx-auto space-y-12 pb-12">
      
      {/* Main Content Section */}
      <section className="prose prose-gray max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          About Frequency Calculator
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          The <strong>Frequency Calculator</strong> is a fast, browser-based engineering utility that calculates frequency from time period or time period from frequency using the fundamental physics relationship f = 1/T. This free online tool is essential for electronics students, electrical engineers, signal processing professionals, and anyone working with AC circuits, oscillators, or periodic signals.
        </p>
        <p className="text-gray-700 leading-relaxed">
          By providing instant calculations with step-by-step explanations, this calculator helps users quickly convert between frequency and time period without manual calculation, reducing errors and saving time during circuit design, signal analysis, and educational projects.
        </p>
      </section>

      {/* How It Works */}
      <section className="prose prose-gray max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          How the Frequency Calculator Works
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Frequency and time period have an inverse relationship. Frequency (f) represents the number of cycles per second, measured in Hertz (Hz), while time period (T) represents the duration of one complete cycle, measured in seconds. The calculator implements the fundamental formulas to convert between these two quantities.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Simply enter either the frequency or time period, select your preferred units, and the calculator instantly computes the corresponding value along with detailed calculation steps.
        </p>
      </section>

      {/* Formula Section */}
      <section className="bg-blue-50 border border-blue-100 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3">
          Frequency & Time Period Formulas
        </h3>
        <div className="space-y-4">
          <div>
            <div className="bg-white p-4 rounded-lg border border-blue-200 font-mono text-sm mb-2">
              f = 1 / T
            </div>
            <p className="text-gray-700 text-sm">Calculate frequency from time period</p>
          </div>
          <div>
            <div className="bg-white p-4 rounded-lg border border-blue-200 font-mono text-sm mb-2">
              T = 1 / f
            </div>
            <p className="text-gray-700 text-sm">Calculate time period from frequency</p>
          </div>
        </div>
        <p className="text-gray-700 text-sm mt-4 mb-3">
          Where:
        </p>
        <ul className="text-gray-700 text-sm space-y-1">
          <li><strong>f</strong> = Frequency (Hz, kHz, MHz)</li>
          <li><strong>T</strong> = Time Period (s, ms, µs)</li>
        </ul>
      </section>

      {/* Examples */}
      <section className="prose prose-gray max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Real-World Examples
        </h2>
        <div className="grid md:grid-cols-2 gap-6 not-prose">
          <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-2">Example 1: 50 Hz AC Power</h3>
            <div className="text-sm text-gray-700 space-y-1">
              <p><strong>Input:</strong> T = 0.02 seconds</p>
              <p><strong>Output:</strong> f = 50 Hz</p>
              <p className="text-xs text-gray-600 mt-2">Standard AC frequency in Europe, Asia, and many other countries.</p>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-2">Example 2: 60 Hz AC Power</h3>
            <div className="text-sm text-gray-700 space-y-1">
              <p><strong>Input:</strong> f = 60 Hz</p>
              <p><strong>Output:</strong> T = 0.0167 seconds</p>
              <p className="text-xs text-gray-600 mt-2">Standard AC frequency in North America and parts of South America.</p>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-2">Example 3: 1 kHz Audio Signal</h3>
            <div className="text-sm text-gray-700 space-y-1">
              <p><strong>Input:</strong> T = 1 millisecond</p>
              <p><strong>Output:</strong> f = 1000 Hz (1 kHz)</p>
              <p className="text-xs text-gray-600 mt-2">Common audio test frequency used in electronics and acoustics.</p>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-2">Example 4: 1 MHz Radio Signal</h3>
            <div className="text-sm text-gray-700 space-y-1">
              <p><strong>Input:</strong> f = 1 MHz</p>
              <p><strong>Output:</strong> T = 1 microsecond</p>
              <p className="text-xs text-gray-600 mt-2">Medium wave radio frequency used in AM broadcasting.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="prose prose-gray max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Common Applications
        </h2>
        <ul className="space-y-2 text-gray-700">
          <li>✓ <strong>AC Circuit Analysis:</strong> Calculate frequency of AC power systems and electrical grids</li>
          <li>✓ <strong>Signal Processing:</strong> Analyze periodic signals in audio, radio, and communication systems</li>
          <li>✓ <strong>Oscillator Design:</strong> Design and verify oscillator circuits with specific frequencies</li>
          <li>✓ <strong>Timer Circuits:</strong> Calculate timing parameters for 555 timers and other timing circuits</li>
          <li>✓ <strong>PWM Control:</strong> Determine PWM frequencies for motor control and power electronics</li>
          <li>✓ <strong>Audio Engineering:</strong> Work with audio frequencies and waveform periods</li>
          <li>✓ <strong>Physics Education:</strong> Learn and demonstrate wave properties and periodic motion</li>
        </ul>
      </section>

      {/* Important Considerations */}
      <section className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Important Considerations
        </h3>
        <div className="space-y-3 text-gray-700 text-sm">
          <p><strong>Unit Conversion:</strong> The calculator supports multiple units for both frequency (Hz, kHz, MHz) and time period (s, ms, µs). Always verify your input and output units match your application requirements.</p>
          <p><strong>Precision:</strong> For high-frequency signals or very short time periods, use higher decimal precision to maintain accuracy. The calculator supports up to 8 decimal places.</p>
          <p><strong>Valid Range:</strong> Both frequency and time period must be positive values greater than zero. The calculator will show an error for invalid inputs.</p>
          <p><strong>Scientific Notation:</strong> For very large or very small values, the calculator automatically uses scientific notation for better readability.</p>
        </div>
      </section>

      {/* Benefits */}
      <section className="prose prose-gray max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Benefits of Using This Calculator
        </h2>
        <ul className="space-y-2 text-gray-700">
          <li>✓ <strong>Instant Results:</strong> Get immediate calculations without manual math</li>
          <li>✓ <strong>Bidirectional Conversion:</strong> Convert from frequency to period or period to frequency</li>
          <li>✓ <strong>Multiple Units:</strong> Support for Hz, kHz, MHz and seconds, milliseconds, microseconds</li>
          <li>✓ <strong>Adjustable Precision:</strong> Choose decimal precision from 2 to 8 places</li>
          <li>✓ <strong>Step-by-Step Explanation:</strong> Understand the calculation process with detailed breakdowns</li>
          <li>✓ <strong>Preset Examples:</strong> Quick access to common frequency values</li>
          <li>✓ <strong>History Tracking:</strong> Save and recall previous calculations</li>
          <li>✓ <strong>Export Reports:</strong> Generate detailed calculation reports for documentation</li>
          <li>✓ <strong>Free & Browser-Based:</strong> No installation or registration required</li>
        </ul>
      </section>

      {/* FAQ Section */}
      <section className="prose prose-gray max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Frequently Asked Questions
        </h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              What is the relationship between frequency and time period?
            </h3>
            <p className="text-gray-700">
              Frequency and time period have an inverse relationship: f = 1/T and T = 1/f. This means that as frequency increases, time period decreases, and vice versa. For example, a 50 Hz signal has a time period of 0.02 seconds (20 milliseconds).
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              What units can I use for frequency and time period?
            </h3>
            <p className="text-gray-700">
              The calculator supports Hz (Hertz), kHz (kilohertz), and MHz (megahertz) for frequency, and seconds (s), milliseconds (ms), and microseconds (µs) for time period. You can select your preferred units for both input and output.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              How do I calculate frequency from time period?
            </h3>
            <p className="text-gray-700">
              To calculate frequency from time period, use the formula f = 1/T. For example, if the time period is 0.02 seconds, the frequency is 1/0.02 = 50 Hz. The calculator performs this calculation instantly when you enter the time period value.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              What is the frequency of standard AC power?
            </h3>
            <p className="text-gray-700">
              Standard AC power frequency varies by region. In Europe, Asia, Africa, and Australia, it's 50 Hz (time period = 0.02 seconds). In North America, parts of South America, and some other regions, it's 60 Hz (time period = 0.0167 seconds).
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              How precise should my calculations be?
            </h3>
            <p className="text-gray-700">
              The required precision depends on your application. For general AC power calculations, 2-3 decimal places are sufficient. For high-frequency signals, audio engineering, or precision timing circuits, use 6-8 decimal places to maintain accuracy.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Can I use this calculator for audio frequencies?
            </h3>
            <p className="text-gray-700">
              Yes! The calculator works for any frequency range, including audio frequencies (20 Hz to 20 kHz). It's useful for analyzing audio waveforms, designing audio circuits, and understanding musical note frequencies.
            </p>
          </div>
        </div>
      </section>

      {/* Related Topics */}
      <section className="prose prose-gray max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Related Electronics Topics
        </h2>
        <div className="grid md:grid-cols-2 gap-4 not-prose text-sm">
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Wavelength</h4>
            <p className="text-gray-600">Distance traveled by a wave during one complete cycle</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Angular Frequency</h4>
            <p className="text-gray-600">Rate of change of phase angle, ω = 2πf</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Reactance</h4>
            <p className="text-gray-600">Opposition to AC current by capacitors and inductors, frequency-dependent</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Resonance</h4>
            <p className="text-gray-600">Natural frequency at which a circuit oscillates with maximum amplitude</p>
          </div>
        </div>
      </section>

    </div>
  );
}
