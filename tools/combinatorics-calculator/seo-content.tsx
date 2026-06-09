export default function CombinatoricsCalculatorSEO() {
  return (
    <section className="mt-16 space-y-10 text-sm text-gray-600 leading-relaxed">

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">What Is Combinatorics?</h2>
        <p>
          Combinatorics is the branch of mathematics that studies counting, arrangement, and selection
          of objects. It underpins probability theory, algorithm analysis, cryptography, statistics,
          and competitive programming. The two most fundamental operations are permutations (ordered
          arrangements) and combinations (unordered selections).
        </p>
        <p className="mt-3">
          This calculator uses exact BigInt arithmetic — no floating-point rounding — so results for
          factorials and combinations are always precise regardless of size.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Core Formulas</h2>
        <pre className="bg-gray-50 border border-gray-200 rounded-lg p-4 font-mono text-xs overflow-x-auto">
{`Factorial              n! = n × (n−1) × … × 2 × 1        0! = 1

Permutation (nPr)      n! ÷ (n−r)!
  5P2 = 5! ÷ 3! = 120 ÷ 6 = 20

Combination (nCr)      n! ÷ (r! × (n−r)!)
  10C3 = 10! ÷ (3! × 7!) = 3628800 ÷ 30240 = 120

Perm w/ Repetition     nʳ
  3^4 = 81

Comb w/ Repetition     (n+r−1)! ÷ (r! × (n−1)!)
  C(5+3−1, 3) = C(7, 3) = 35

Circular Permutation   (n−1)!
  6 people round a table: (6−1)! = 120

Multiset Permutation   n! ÷ (a! × b! × c! × …)
  MISSISSIPPI (11 letters): 11! ÷ (4! × 4! × 2! × 1!) = 34650`}
        </pre>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Permutation vs Combination</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-4 py-3 border border-gray-200 font-semibold text-gray-700">Property</th>
                <th className="text-left px-4 py-3 border border-gray-200 font-semibold text-gray-700">Permutation</th>
                <th className="text-left px-4 py-3 border border-gray-200 font-semibold text-gray-700">Combination</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Order matters?",  "Yes",             "No"],
                ["Formula",        "n! ÷ (n−r)!",     "n! ÷ (r!(n−r)!)"],
                ["ABC ≠ BAC?",     "Yes",             "No (same)"],
                ["Example",        "PIN codes, races", "Lottery, committees"],
                ["Notation",       "nPr or P(n,r)",   "nCr, C(n,r), or ⁿCᵣ"],
                ["Always ≥ nCr?",  "Yes (by r! factor)", "Base case"],
              ].map(([prop, perm, comb]) => (
                <tr key={prop as string} className="hover:bg-gray-50">
                  <td className="px-4 py-2.5 border border-gray-200 font-semibold text-gray-800">{prop}</td>
                  <td className="px-4 py-2.5 border border-gray-200 text-gray-600">{perm}</td>
                  <td className="px-4 py-2.5 border border-gray-200 text-gray-600">{comb}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Real-World Applications</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">Lottery probability</h3>
            <p>
              A 6-from-49 lottery requires choosing 6 numbers from 49 without order. The number of
              possible tickets is C(49, 6) = 13,983,816. Your probability of winning = 1 / 13,983,816.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">Password security</h3>
            <p>
              A 4-digit PIN using digits 0–9 with repetition allowed has 10^4 = 10,000 possibilities.
              A 4-character password from 62 alphanumeric characters has 62^4 = 14,776,336 combinations.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">Algorithm analysis</h3>
            <p>
              Combinatorics is central to Big-O analysis. Sorting n elements requires at least
              log₂(n!) comparisons — this is where Ω(n log n) lower bound for comparison-based
              sorting comes from.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">Machine learning</h3>
            <p>
              Hyperparameter grid search explores combinations of settings. For 5 parameters each
              with 4 options, a full grid has 4^5 = 1,024 configurations — combinatorics explains
              why random search is often preferred.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">Circular seating problems</h3>
            <p>
              Arranging n people around a circular table: (n−1)! because one person is fixed as
              a reference point, eliminating rotationally identical arrangements.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Pascal's Triangle and Binomial Coefficients</h2>
        <p>
          Combinations nCr are the entries of Pascal's Triangle. Each entry equals the sum of the two
          entries directly above it. Row n contains C(n,0) through C(n,n). This relationship underlies
          the Binomial Theorem: (a+b)^n = Σ C(n,k) × a^(n−k) × b^k.
        </p>
        <pre className="bg-gray-50 border border-gray-200 rounded-lg p-4 font-mono text-xs overflow-x-auto mt-3">
{`n=0:         1
n=1:        1  1
n=2:       1  2  1
n=3:      1  3  3  1
n=4:     1  4  6  4  1
n=5:    1  5 10 10  5  1`}
        </pre>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {[
            {
              q: "Why is 0! = 1?",
              a: "By convention and mathematical consistency. The number of ways to arrange zero objects is exactly one — the empty arrangement. This also makes the permutation and combination formulas work correctly at edge cases like C(n, 0) = 1.",
            },
            {
              q: "What is the difference between permutation with and without repetition?",
              a: "Without repetition (standard nPr): once an item is selected it cannot be selected again. With repetition: each selection is independent and any item can appear multiple times. Example — a 4-digit PIN from digits 0–9 with repetition = 10^4 = 10,000. Without repetition = P(10,4) = 5,040.",
            },
            {
              q: "When do I use combination with repetition?",
              a: "Use it when selecting from a set of types where you can pick the same type multiple times and order doesn't matter. Classic example: choosing 3 ice cream scoops from 5 flavors (you can repeat flavors). Answer: C(5+3−1, 3) = C(7,3) = 35.",
            },
            {
              q: "How large can n be before results become unreliable?",
              a: "This calculator uses JavaScript BigInt for exact integer arithmetic, so results are mathematically precise for any n up to 1000. Beyond that, numbers have hundreds or thousands of digits and are displayed in scientific notation.",
            },
            {
              q: "What is a multiset permutation?",
              a: "A multiset permutation counts arrangements of a collection where some objects are identical. For example, the word MISSISSIPPI has 11 letters with repetitions: M×1, I×4, S×4, P×2. Distinct arrangements = 11! ÷ (1! × 4! × 4! × 2!) = 34,650.",
            },
            {
              q: "What is the relationship between nCr and nPr?",
              a: "nPr = nCr × r! — a permutation is a combination with the r selected items then arranged in all possible orders. Equivalently, nCr = nPr ÷ r!, dividing by r! removes the order.",
            },
          ].map(({ q, a }) => (
            <div key={q}>
              <h3 className="font-semibold text-gray-800 mb-1">{q}</h3>
              <p>{a}</p>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
