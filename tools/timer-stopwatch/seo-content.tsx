export default function TimerStopwatchSEO() {
  return (
    <>
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Professional Timing Tools for Every Task
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              High-Precision Stopwatch
            </h3>
            <p className="text-gray-600 mb-4" style={{ fontFamily: "var(--font-body)" }}>
              Our stopwatch is built for accuracy. Using `performance.now()`, it avoids the common drift issues found in standard JavaScript timers, making it perfect for sports, speed-cubing, or scientific measurements.
            </p>
            <ul className="space-y-3 text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              <li className="flex items-start">
                <span className="text-primary mr-2">✦</span>
                <span><strong>Lap Analysis:</strong> Instantly see your fastest, slowest, and average lap times for detailed performance tracking.</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✦</span>
                <span><strong>Keyboard Shortcuts:</strong> Control the timer without your mouse. Use Space to toggle and L to record laps.</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Powerful Countdown Timers
            </h3>
            <p className="text-gray-600 mb-4" style={{ fontFamily: "var(--font-body)" }}>
              Whether you're managing a kitchen, a workout, or a coding sprint, our multi-timer support allows you to keep track of multiple tasks simultaneously.
            </p>
            <ul className="space-y-2 text-gray-600" style={{ fontFamily: "var(--font-body)" }}>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Visual Progress: Circular indicators for at-a-glance status.
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Smart Notifications: Audio and visual alerts when time is up.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Is this timer accurate?
            </h3>
            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Yes. We use the High Resolution Time API (`performance.now()`) to measure the precise passage of time regardless of browser event loop congestion.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Can I run multiple countdowns?
            </h3>
            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Absolutely. You can add as many countdown timers as you need, label them, and run them concurrently. Each has its own progress tracker and alarm.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
