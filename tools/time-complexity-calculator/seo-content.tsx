export default function TimeComplexitySEO() {
  return (
    <>
      <section className="mt-12 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Time Complexity Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Three Analysis Modes
            </h3>
            <ol className="space-y-3 text-gray-600 leading-relaxed">
              {[
                ["Pattern Detector", "Describe your algorithm in plain English (e.g. 'nested loop', 'binary search', 'merge sort'). The tool auto-detects the Big-O complexity with an explanation."],
                ["Loop Analyzer", "Select the number of nested loops and recursion type from dropdowns. The tool calculates the resulting complexity — great for interview practice."],
                ["Growth Comparator", "Select multiple complexities to see their growth rates side-by-side on the chart. Adjust the input size slider to see how they diverge."],
                ["History", "Save analyses to browser history for review. Click any entry to reload it into the detector."],
              ].map(([title, desc], i) => (
                <li key={i} className="flex items-start">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0 font-semibold">
                    {i + 1}
                  </span>
                  <span><strong>{title}:</strong> {desc}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Key Features
            </h3>
            <ul className="space-y-2 text-gray-600">
              {[
                "Keyword-based Big-O pattern detection",
                "Loop + recursion configuration mode",
                "Interactive growth comparison chart",
                "All 8 Big-O complexities explained",
                "Real-world analogies for each complexity",
                "Pseudo-code examples for each pattern",
                "Operations count at any input size n",
                "Quick algorithm presets (sort, search, etc.)",
                "Export analysis as TXT",
                "Analysis history saved in browser",
                "Color-coded complexity reference table",
                "Mobile-friendly canvas chart",
              ].map((f, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Big-O Complexity Quick Reference
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Complexity</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">n=10</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">n=100</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">n=1,000</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Rating</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["O(1)", "Constant", "1", "1", "1", "Excellent"],
                ["O(log n)", "Logarithmic", "3", "7", "10", "Excellent"],
                ["O(n)", "Linear", "10", "100", "1,000", "Good"],
                ["O(n log n)", "Linearithmic", "33", "664", "9,966", "Good"],
                ["O(n²)", "Quadratic", "100", "10,000", "1,000,000", "Fair"],
                ["O(n³)", "Cubic", "1,000", "1,000,000", "1B", "Poor"],
                ["O(2ⁿ)", "Exponential", "1,024", "~10³⁰", "∞", "Terrible"],
                ["O(n!)", "Factorial", "3.6M", "~10¹⁵⁷", "∞", "Catastrophic"],
              ].map(([c, name, n10, n100, n1000, rating]) => (
                <tr key={c} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-mono font-semibold text-primary">{c}</td>
                  <td className="py-2.5 px-4">{name}</td>
                  <td className="py-2.5 px-4 font-mono">{n10}</td>
                  <td className="py-2.5 px-4 font-mono">{n100}</td>
                  <td className="py-2.5 px-4 font-mono">{n1000}</td>
                  <td className="py-2.5 px-4 font-semibold">{rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Common Algorithms and Their Complexities
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Algorithm</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Best Case</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Average Case</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Worst Case</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Space</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Binary Search", "O(1)", "O(log n)", "O(log n)", "O(1)"],
                ["Linear Search", "O(1)", "O(n)", "O(n)", "O(1)"],
                ["Bubble Sort", "O(n)", "O(n²)", "O(n²)", "O(1)"],
                ["Merge Sort", "O(n log n)", "O(n log n)", "O(n log n)", "O(n)"],
                ["Quick Sort", "O(n log n)", "O(n log n)", "O(n²)", "O(log n)"],
                ["Heap Sort", "O(n log n)", "O(n log n)", "O(n log n)", "O(1)"],
                ["Hash Table Lookup", "O(1)", "O(1)", "O(n)", "O(n)"],
                ["Recursive Fibonacci", "O(1)", "O(2ⁿ)", "O(2ⁿ)", "O(n)"],
              ].map(([algo, best, avg, worst, space]) => (
                <tr key={algo} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-semibold text-gray-800">{algo}</td>
                  <td className="py-2.5 px-4 font-mono text-green-600">{best}</td>
                  <td className="py-2.5 px-4 font-mono text-primary">{avg}</td>
                  <td className="py-2.5 px-4 font-mono text-red-600">{worst}</td>
                  <td className="py-2.5 px-4 font-mono text-gray-500">{space}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "What is Big-O notation?",
              a: "Big-O notation describes the upper bound of an algorithm's time or space complexity as input size grows. It focuses on the dominant term and ignores constants, giving a machine-independent way to compare algorithm efficiency.",
            },
            {
              q: "What is the difference between best, average, and worst case?",
              a: "Best case (Ω) is the minimum operations, average case (Θ) is the expected operations, and worst case (O) is the maximum. Big-O typically describes worst case. For example, quicksort is O(n log n) on average but O(n²) worst case with bad pivots.",
            },
            {
              q: "Why is O(log n) so efficient?",
              a: "Logarithmic algorithms halve the problem space at each step. For n = 1,000,000, O(log n) only needs ~20 steps, while O(n) needs 1,000,000. This is why binary search is vastly superior to linear search on sorted data.",
            },
            {
              q: "When is O(n²) acceptable?",
              a: "Quadratic complexity is acceptable for small inputs (n < 1,000 in most cases). Bubble sort or insertion sort are fine for small arrays and have low constant factors. For large datasets, O(n log n) algorithms like merge sort are required.",
            },
            {
              q: "How do I reduce exponential complexity?",
              a: "Dynamic programming (memoization or tabulation) eliminates redundant recursive calls. Fibonacci changes from O(2ⁿ) to O(n) with memoization. Greedy algorithms and approximations can also replace exact exponential solutions for NP-hard problems.",
            },
          ].map(({ q, a }, i) => (
            <div key={i} className={i < 4 ? "border-b border-gray-100 pb-6" : ""}>
              <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: "var(--font-heading)" }}>{q}</h3>
              <p className="text-gray-600 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Who Uses This Tool?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "🎓", title: "CS Students", desc: "Learn Big-O visually for data structures and algorithms courses with interactive growth comparisons." },
            { icon: "💼", title: "Interview Candidates", desc: "Practice complexity analysis for FAANG and top-tier coding interviews with instant feedback." },
            { icon: "⚙️", title: "Software Engineers", desc: "Analyze algorithm choices during code review and performance optimization discussions." },
            { icon: "🏆", title: "Competitive Programmers", desc: "Quickly verify time complexity constraints before submitting solutions to competitive programming judges." },
            { icon: "🤖", title: "ML Engineers", desc: "Estimate training and inference complexity for model architectures and data preprocessing pipelines." },
            { icon: "📚", title: "CS Instructors", desc: "Use the visual chart to teach Big-O growth intuitively in classroom or remote learning settings." },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="bg-gray-50 border border-gray-100 rounded-lg p-5">
              <div className="text-2xl mb-2">{icon}</div>
              <h3 className="font-semibold text-gray-800 mb-1" style={{ fontFamily: "var(--font-heading)" }}>{title}</h3>
              <p className="text-sm text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
