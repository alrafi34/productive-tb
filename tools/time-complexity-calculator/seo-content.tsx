import ToolFaq from "@/components/ToolFaq";
import { timeComplexityCalculatorConfig } from "./config";

export default function TimeComplexitySEO() {
  // Same questions as the FAQPage schema
  const { faq } = timeComplexityCalculatorConfig.seo;
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

      <ToolFaq items={faq} />

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
