export default function TimeDurationCalculatorSEO() {
  return (
    <>
      {/* How to Use Section */}
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Calculate Time Duration
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Simple Instructions
            </h3>
            <ol className="space-y-3 text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">1</span>
                <span><strong>Enter Start Time:</strong> Use the time picker or type the start time in HH:MM format.</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">2</span>
                <span><strong>Enter End Time:</strong> Select or type the end time. The calculator handles overnight durations automatically.</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">3</span>
                <span><strong>View Results:</strong> Duration is calculated instantly in hours, minutes, and optionally seconds.</span>
              </li>
            </ol>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              What You Can Do
            </h3>
            <ul className="space-y-2 text-gray-600" style={{ fontFamily: "var(--font-body)" }}>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Calculate work hours and overtime
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Handle overnight shifts automatically
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Include seconds for precise timing
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Swap start and end times quickly
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Save and reload recent calculations
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Copy results to clipboard
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Examples Section */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Example Calculations
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-lg p-5">
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Standard Work Day
            </h3>
            <div className="space-y-2 text-gray-600" style={{ fontFamily: "var(--font-body)" }}>
              <div className="flex justify-between items-center">
                <span className="text-sm">Start:</span>
                <span className="font-mono font-semibold text-gray-900">09:30</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">End:</span>
                <span className="font-mono font-semibold text-gray-900">17:45</span>
              </div>
              <div className="flex justify-between items-center border-t border-gray-200 pt-2">
                <span className="text-sm font-semibold">Duration:</span>
                <span className="font-mono font-bold text-primary">8 hours, 15 minutes</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-5">
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Overnight Shift
            </h3>
            <div className="space-y-2 text-gray-600" style={{ fontFamily: "var(--font-body)" }}>
              <div className="flex justify-between items-center">
                <span className="text-sm">Start:</span>
                <span className="font-mono font-semibold text-gray-900">22:15</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">End:</span>
                <span className="font-mono font-semibold text-gray-900">06:45</span>
              </div>
              <div className="flex justify-between items-center border-t border-gray-200 pt-2">
                <span className="text-sm font-semibold">Duration:</span>
                <span className="font-mono font-bold text-primary">8 hours, 30 minutes</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-5">
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Meeting Duration
            </h3>
            <div className="space-y-2 text-gray-600" style={{ fontFamily: "var(--font-body)" }}>
              <div className="flex justify-between items-center">
                <span className="text-sm">Start:</span>
                <span className="font-mono font-semibold text-gray-900">14:00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">End:</span>
                <span className="font-mono font-semibold text-gray-900">15:30</span>
              </div>
              <div className="flex justify-between items-center border-t border-gray-200 pt-2">
                <span className="text-sm font-semibold">Duration:</span>
                <span className="font-mono font-bold text-primary">1 hour, 30 minutes</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-5">
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Precise Timing
            </h3>
            <div className="space-y-2 text-gray-600" style={{ fontFamily: "var(--font-body)" }}>
              <div className="flex justify-between items-center">
                <span className="text-sm">Start:</span>
                <span className="font-mono font-semibold text-gray-900">08:15:30</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">End:</span>
                <span className="font-mono font-semibold text-gray-900">10:45:45</span>
              </div>
              <div className="flex justify-between items-center border-t border-gray-200 pt-2">
                <span className="text-sm font-semibold">Duration:</span>
                <span className="font-mono font-bold text-primary">2h 30m 15s</span>
              </div>
            </div>
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
              How does the calculator handle overnight durations?
            </h3>
            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              When the end time is earlier than the start time, the calculator automatically assumes the end time is on the next day. For example, from 22:00 to 02:00 is calculated as 4 hours, not -20 hours. An overnight indicator appears when this happens.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Can I include seconds in my calculation?
            </h3>
            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Yes! Enable the "Include seconds precision" option to input times with seconds (HH:MM:SS format) and see results with second-level accuracy. This is useful for precise timing needs like sports events or scientific measurements.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              What formats can I use for time input?
            </h3>
            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              The calculator accepts standard 24-hour format (HH:MM or HH:MM:SS). You can use the time picker for easy selection or type directly. The tool validates your input and shows an error if the format is incorrect.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              How accurate are the calculations?
            </h3>
            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Calculations are precise to the second when seconds are enabled, or to the minute when disabled. The tool uses standard time arithmetic and handles all edge cases including midnight crossings and 24-hour boundaries correctly.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Is my calculation data stored anywhere?
            </h3>
            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              No. All calculations happen entirely in your browser. The only data stored is your recent calculation history, which is saved locally in your browser's storage for your convenience. Nothing is sent to any server.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Why Use Our Time Calculator?
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>Instant Results</h3>
            <p className="text-gray-600 text-sm" style={{ fontFamily: "var(--font-body)" }}>
              Duration is calculated in real-time as you select times. No button clicks needed.
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">🌙</div>
            <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>Overnight Support</h3>
            <p className="text-gray-600 text-sm" style={{ fontFamily: "var(--font-body)" }}>
              Automatically handles night shifts and durations that cross midnight without any extra steps.
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">🔒</div>
            <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>100% Private</h3>
            <p className="text-gray-600 text-sm" style={{ fontFamily: "var(--font-body)" }}>
              All calculations run in your browser. Your time data never leaves your device.
            </p>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Common Use Cases
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center" style={{ fontFamily: "var(--font-heading)" }}>
              <span className="text-2xl mr-2">💼</span>
              Work Hours Tracking
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Calculate daily work hours, overtime, and shift durations. Perfect for employees, freelancers, and managers tracking time.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center" style={{ fontFamily: "var(--font-heading)" }}>
              <span className="text-2xl mr-2">🎬</span>
              Event Planning
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Plan event schedules, calculate session lengths, and manage time slots for conferences, meetings, or performances.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center" style={{ fontFamily: "var(--font-heading)" }}>
              <span className="text-2xl mr-2">🏃</span>
              Sports & Fitness
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Track workout durations, race times, and training sessions. Use seconds precision for accurate athletic timing.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center" style={{ fontFamily: "var(--font-heading)" }}>
              <span className="text-2xl mr-2">📚</span>
              Study & Education
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Calculate study session lengths, exam durations, and class times. Useful for students and educators managing schedules.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
