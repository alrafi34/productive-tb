import React from "react";

export default function MatrixCalculatorSEOContent() {
  return (
    <div className="max-w-4xl mx-auto mt-16 space-y-12">

      {/* ── 1. Introduction ── */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          What Is a Matrix Calculator?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            A <strong>matrix calculator</strong> is a free online tool that performs linear algebra
            operations on matrices — addition, subtraction, multiplication, determinant, inverse, and
            transpose — instantly in your browser. It answers the question that comes up in every
            linear algebra course, engineering simulation, and data science workflow:{" "}
            <em>what is the result of this matrix operation, and did I set it up correctly?</em>
          </p>
          <p>
            The challenge with manual matrix calculations is that errors compound. A single wrong
            entry in a 3×3 matrix multiplication propagates through all nine output cells. Checking
            by hand takes as long as the original calculation. This <strong>online matrix
            calculator</strong> gives the correct result in real time as you type — you see errors
            before they go into your homework, report, or codebase.
          </p>
          <p>
            This tool is built for <strong>students solving linear algebra assignments, engineers
            performing system analysis and simulations, data scientists verifying small matrix
            operations before coding them, teachers demonstrating matrix concepts in class, and
            anyone preparing for CCNA, engineering, or mathematics certifications</strong> that
            include matrix problems. Supports matrices up to 20×20, six operations, CSV export,
            calculation history, and real-time dimension validation. Browser-based, free, no signup.
          </p>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          How Matrix Operations Work
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            Each operation follows a specific mathematical rule. The calculator validates dimension
            compatibility before computing and flags mismatches immediately so you know exactly what
            to fix.
          </p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg px-6 py-5 my-4 space-y-3">
            <p className="text-sm font-medium text-gray-500">Core Operation Formulas</p>
            <div className="space-y-2 font-mono text-sm text-gray-900">
              <p><span className="font-semibold">Addition / Subtraction</span>: C[i][j] = A[i][j] ± B[i][j] &nbsp;(requires A and B same dimensions)</p>
              <p><span className="font-semibold">Multiplication</span>: C[i][j] = Σ A[i][k] × B[k][j] &nbsp;(requires cols(A) = rows(B))</p>
              <p><span className="font-semibold">Determinant (2×2)</span>: det(A) = a·d − b·c</p>
              <p><span className="font-semibold">Determinant (n×n)</span>: LU decomposition → product of diagonal of U</p>
              <p><span className="font-semibold">Inverse</span>: A⁻¹ via Gauss-Jordan elimination &nbsp;(requires det(A) ≠ 0)</p>
              <p><span className="font-semibold">Transpose</span>: Aᵀ[i][j] = A[j][i] &nbsp;(m×n becomes n×m)</p>
            </div>
          </div>
          <ul className="space-y-1 text-gray-600">
            <li>• <strong>Dimension rule for multiplication</strong> — if A is m×n and B is n×p, the result C is m×p. The inner dimensions must match.</li>
            <li>• <strong>Singular matrix</strong> — a matrix with det = 0 has no inverse. The calculator will flag this rather than return a nonsensical result.</li>
            <li>• <strong>Square matrices only</strong> — determinant and inverse require n×n matrices. Transpose works on any dimensions.</li>
            <li>• <strong>Precision</strong> — results are computed with full floating-point precision and displayed to 4 decimal places.</li>
          </ul>
        </div>
      </section>

      {/* ── 3. Step-by-Step ── */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          How to Use the Matrix Calculator
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <ol className="space-y-5 text-gray-600">
            {[
              ["Select an Operation", "Choose from the six operation tabs: Addition, Subtraction, Multiplication, Determinant, Inverse, or Transpose. The input panel updates to show how many matrices are required — single-matrix operations (determinant, inverse, transpose) show only Matrix A; two-matrix operations show both A and B."],
              ["Enter Matrix A", "Click into each cell and type a numeric value. Use the + buttons to add rows or columns, and the × buttons to remove them. You can also click 'Load Example' to populate a pre-built matrix for quick testing. Values update the result in real time as you type."],
              ["Enter Matrix B (if required)", "For addition, subtraction, and multiplication, fill in Matrix B. The calculator shows a dimension hint below each matrix so you can see at a glance whether the dimensions are compatible for the selected operation before you finish entering values."],
              ["Read the Result", "The result appears instantly in the output panel, formatted as a matrix table. For determinant, a single scalar is returned. For inverse and multiplication, the full result matrix is shown with values rounded to 4 decimal places."],
              ["Copy or Export", "Click Copy to copy the result as CSV-formatted text for pasting into Excel or Google Sheets. Click Download CSV to save the result matrix as a file. The calculation is also saved automatically to the history panel — click any history entry to reload that calculation."],
            ].map(([title, desc], i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex-shrink-0 bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
                  {i + 1}
                </span>
                <span><strong>{title}:</strong> {desc}</span>
              </li>
            ))}
          </ol>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Tool Features</h3>
            <ul className="space-y-2 text-gray-600">
              {[
                "6 operations: add, subtract, multiply, det, inverse, transpose",
                "Real-time calculation as you type",
                "Dynamic matrix sizing — add/remove rows and columns",
                "Dimension compatibility validation",
                "Load example matrices for quick testing",
                "Copy result as CSV to clipboard",
                "Download result as CSV file",
                "Calculation history (last 20 saved locally)",
                "Supports matrices up to 20×20",
                "Results to 4 decimal places",
                "Browser-based — no signup required",
                "Works on mobile and tablet",
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

      {/* ── 4. Use Cases ── */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Real-World Use Cases
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: "Linear Algebra Homework Verification",
              scenario: "A student manually multiplies two 3×3 matrices and gets C[1][2] = 14. They enter both matrices into the calculator and the result shows C[1][2] = 17. The discrepancy pinpoints exactly which row-column dot product they computed wrong — they spot a sign error in the middle term and correct the homework before submitting.",
            },
            {
              title: "Solving a System of Linear Equations",
              scenario: "An engineering student has a system of 3 equations with 3 unknowns expressed as Ax = b. They enter the 3×3 coefficient matrix A, compute its inverse A⁻¹, then multiply A⁻¹ × b in a second operation to get x. The calculator returns x = [2, −1, 4] in under 10 seconds — confirming the solution without any Gaussian elimination by hand.",
            },
            {
              title: "Verifying Code Output (Data Science)",
              scenario: "A data scientist writes a NumPy matrix multiplication in Python and gets an unexpected result. They enter the same two matrices into the calculator to get a known-correct reference. The calculator returns a different result — the developer discovers they had the operand order reversed (A @ B instead of B @ A) in their code, which is the root cause of the bug.",
            },
            {
              title: "Structural Engineering Stiffness Matrix",
              scenario: "A civil engineering student is computing the global stiffness matrix for a 4-node truss by adding four 4×4 element stiffness matrices. They enter each addition step-by-step into the calculator, verifying the accumulated sum after each matrix is added. The history panel stores each intermediate result so they can backtrack if a subsequent step produces an unexpected value.",
            },
            {
              title: "Teacher Demonstration in Class",
              scenario: "A linear algebra professor projects the matrix calculator on screen during a lecture on matrix inverses. They enter a 3×3 matrix, show the determinant result (non-zero, so invertible), then switch to Inverse mode to show the inverse matrix. They verify the result by multiplying A × A⁻¹ in a third step — showing live that the product is the 3×3 identity matrix.",
            },
            {
              title: "Graphics Transformation Matrix Check",
              scenario: "A game developer is building a 3D rotation system and needs to verify that their 3×3 rotation matrix R is orthogonal — meaning R × Rᵀ should equal the identity matrix. They enter R, compute Rᵀ using Transpose mode, then multiply R × Rᵀ. The result shows the identity matrix (with small floating-point noise near 0), confirming the rotation matrix is correct.",
            },
          ].map(({ title, scenario }) => (
            <div key={title} className="bg-gray-50 border border-gray-100 rounded-lg p-5">
              <h3 className="font-semibold text-gray-800 mb-2">{title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{scenario}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. Tips & Mistakes ── */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Tips & Common Mistakes
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">💡 Pro Tips</h3>
            <ul className="space-y-4 text-gray-600">
              {[
                ["Chain operations using history", "The calculator saves the last 20 calculations. After computing A⁻¹, click the history entry to reload it as Matrix A, then enter b as Matrix B and multiply — solving Ax = b in two linked steps without re-entering any values."],
                ["Check the determinant before attempting inversion", "Run Determinant mode first on any matrix you plan to invert. If det = 0, the matrix is singular and has no inverse — the inversion step will fail. Knowing this upfront saves time and tells you the underlying system of equations has no unique solution."],
                ["Use Load Example to understand operation behavior", "If you are unsure what an operation does, click Load Example to populate pre-built matrices, run the operation, and inspect the output. The examples are designed to produce clean integer results that make the operation logic easy to follow."],
                ["Verify multiplication order explicitly", "Matrix multiplication is not commutative — A × B ≠ B × A in general. If your result looks wrong, swap the matrices and run again. The calculator shows which matrix is A and which is B clearly, so the order is always unambiguous."],
                ["Download CSV for large results", "For large matrix results (4×4 and above), the CSV download formats the output cleanly for import into Excel or Google Sheets where you can apply conditional formatting to spot patterns or outliers in the result matrix."],
              ].map(([title, text]) => (
                <li key={title as string} className="flex items-start gap-2">
                  <span className="mt-0.5 flex-shrink-0">💡</span>
                  <span><strong>{title}:</strong> {text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Common Mistakes</h3>
            <ul className="space-y-4 text-gray-600">
              {[
                ["Confusing dimension requirements for multiplication", "For A × B, the number of columns in A must equal the number of rows in B. A 2×3 matrix can multiply a 3×4 matrix (result is 2×4) but cannot multiply a 2×3 matrix. The calculator shows the dimension mismatch error immediately — read the hint below each matrix before entering values."],
                ["Attempting to invert a non-square matrix", "Only square matrices (same number of rows and columns) have determinants and inverses. A 3×4 matrix cannot be inverted. If your matrix is rectangular and you need a pseudo-inverse, that is a different operation not covered by this calculator."],
                ["Expecting a zero determinant to produce an inverse", "A matrix with determinant = 0 is singular and has no inverse. This is a mathematical impossibility, not a tool limitation. If your system of equations leads to a singular coefficient matrix, the system either has no solution or infinitely many solutions."],
                ["Treating floating-point results as exact", "Very small non-zero values like 0.0000 or −0.0001 in an inverse or multiplication result are floating-point rounding artifacts, not exact mathematical values. When verifying A × A⁻¹ = I, expect near-zero off-diagonal entries, not perfect zeros."],
              ].map(([title, text]) => (
                <li key={title as string} className="flex items-start gap-2">
                  <span className="text-red-400 mt-0.5 flex-shrink-0">✕</span>
                  <span><strong>{title}:</strong> {text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── 6. Operation Reference Table ── */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Matrix Operations Reference
        </h2>

        <h3 className="text-base font-semibold text-gray-700 mb-3">Operation Rules & Dimension Requirements</h3>
        <div className="overflow-x-auto mb-8">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Operation</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Matrices Needed</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Dimension Requirement</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Result Dimensions</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Algorithm Used</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Addition",     "A and B", "A and B must be m×n (identical)", "m×n",    "Element-wise sum"],
                ["Subtraction",  "A and B", "A and B must be m×n (identical)", "m×n",    "Element-wise difference"],
                ["Multiplication","A and B", "cols(A) must equal rows(B)",      "m×p",    "Row × column dot products"],
                ["Determinant",  "A only",  "A must be square (n×n)",           "Scalar", "LU decomposition"],
                ["Inverse",      "A only",  "A must be square, det(A) ≠ 0",     "n×n",    "Gauss-Jordan elimination"],
                ["Transpose",    "A only",  "Any dimensions",                   "n×m",    "Row/column swap"],
              ].map(([op, matrices, req, result, algo]) => (
                <tr key={op} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-semibold text-primary">{op}</td>
                  <td className="py-3 px-4 text-gray-600">{matrices}</td>
                  <td className="py-3 px-4 font-mono text-xs text-gray-700">{req}</td>
                  <td className="py-3 px-4 font-mono text-xs">{result}</td>
                  <td className="py-3 px-4 text-xs text-gray-500">{algo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="text-base font-semibold text-gray-700 mb-3">Worked Examples</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Operation</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Input</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Output</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                ["Addition",      "[[1,2],[3,4]] + [[5,6],[7,8]]",            "[[6,8],[10,12]]"],
                ["Multiplication","[[1,2],[3,4]] × [[2,0],[1,2]]",            "[[4,4],[10,8]]"],
                ["Determinant",   "[[1,2],[3,4]]",                            "det = (1×4 − 2×3) = −2"],
                ["Inverse",       "[[1,2],[3,4]]",                            "[[-2,1],[1.5,-0.5]]"],
                ["Transpose",     "[[1,2,3],[4,5,6]]  (2×3)",                 "[[1,4],[2,5],[3,6]]  (3×2)"],
                ["Verify A×A⁻¹", "[[1,2],[3,4]] × [[-2,1],[1.5,-0.5]]",     "[[1,0],[0,1]]  (identity)"],
              ].map(([op, input, output]) => (
                <tr key={op} className="hover:bg-gray-50">
                  <td className="py-2.5 px-4 font-semibold text-primary">{op}</td>
                  <td className="py-2.5 px-4 font-mono text-xs text-gray-700">{input}</td>
                  <td className="py-2.5 px-4 font-mono text-xs font-semibold">{output}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── 7. FAQ ── */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "What is a matrix calculator?",
              a: "A matrix calculator is a free online tool that performs standard linear algebra operations on matrices — addition, subtraction, multiplication, determinant, inverse, and transpose — without requiring any software installation. It is used by students checking homework, engineers verifying system analysis, data scientists debugging code, and teachers demonstrating operations in class.",
            },
            {
              q: "How is matrix multiplication calculated?",
              a: "Each element C[i][j] of the result matrix is the dot product of row i of Matrix A and column j of Matrix B — you sum the products of each corresponding pair of values. For A (m×n) and B (n×p), the result has dimensions m×p. The inner dimensions must match: the number of columns in A must equal the number of rows in B. The calculator validates this before computing.",
            },
            {
              q: "What is a matrix determinant and when do I need it?",
              a: "The determinant is a single scalar value computed from a square matrix. For a 2×2 matrix [[a,b],[c,d]], det = a×d − b×c. For larger matrices the calculator uses LU decomposition. The determinant tells you whether a matrix is invertible (det ≠ 0) or singular (det = 0). It also appears in Cramer's rule for solving linear systems and in computing eigenvalues.",
            },
            {
              q: "What does matrix inversion do and when can it fail?",
              a: "Matrix inversion finds A⁻¹ such that A × A⁻¹ = I (the identity matrix). It can only be performed on square matrices with a non-zero determinant. If det(A) = 0, the matrix is singular and has no inverse — this means the corresponding system of linear equations either has no solution or infinitely many. The calculator uses Gauss-Jordan elimination and returns an error if the matrix is singular.",
            },
            {
              q: "What is the difference between a matrix calculator and a matrices calculator?",
              a: "There is no functional difference — 'matrix calculator' and 'matrices calculator' refer to the same type of tool. 'Matrices' is simply the plural of 'matrix'. Both searches look for an online tool that performs operations on one or more matrices, which is exactly what this tool does.",
            },
            {
              q: "Can I use this as a matrix solver for systems of equations?",
              a: "Yes. To solve Ax = b, first compute A⁻¹ using Inverse mode, then multiply A⁻¹ × b using Multiplication mode. The result vector x is the solution to the system. This works as long as A is square and invertible (det ≠ 0). If A is singular, the system has no unique solution.",
            },
            {
              q: "What is the maximum matrix size supported?",
              a: "The calculator supports matrices up to 20×20. Operations on large matrices (10×10 and above) may take slightly longer to display since the result has up to 400 cells, but all processing happens client-side in your browser so no network time is involved. For most homework and engineering use cases, matrices are 3×3 to 6×6.",
            },
            {
              q: "How accurate are the results?",
              a: "All calculations use full JavaScript floating-point precision (64-bit IEEE 754). Results are displayed rounded to 4 decimal places for readability. Very small non-zero values (like 0.0000 or −0.0001) in inverse or multiplication results are floating-point rounding artifacts and can be treated as zero in most practical contexts.",
            },
            {
              q: "Can I perform multiple operations in sequence?",
              a: "Yes. The history panel saves your last 20 calculations. After computing A⁻¹, click that history entry to reload the result as Matrix A, then enter another matrix as B and multiply — chaining operations without re-entering values. This is useful for multi-step problems like verifying A × A⁻¹ = I or solving systems step by step.",
            },
            {
              q: "Is my data private when using this calculator?",
              a: "Yes. All matrix operations run entirely in your browser using JavaScript. Your matrix values are never transmitted to any server, stored in any database, or accessible to anyone other than you. Calculation history is stored only in your browser's localStorage.",
            },
          ].map(({ q, a }, i) => (
            <div key={i} className={i < 9 ? "border-b border-gray-100 pb-6" : ""}>
              <h3 className="font-semibold text-gray-800 mb-2">{q}</h3>
              <p className="text-gray-600 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 8. Who Uses This ── */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
          Who Uses This Calculator?
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "🎓", title: "Linear Algebra Students", desc: "Verify homework calculations, check exam practice problems, and understand where a manual calculation went wrong by comparing step outputs against the reference result." },
            { icon: "⚙️", title: "Engineers", desc: "Perform system analysis, compute stiffness matrices for structural problems, solve sets of simultaneous equations, and verify transformation matrices for mechanical and electrical simulations." },
            { icon: "🧮", title: "Data Scientists & ML Engineers", desc: "Verify small matrix operations before implementing them in NumPy, TensorFlow, or PyTorch — catching operand order issues, dimension mismatches, and sign errors before they enter production code." },
            { icon: "👩‍🏫", title: "Teachers & Professors", desc: "Demonstrate matrix operations live in class with real-time results, show students exactly why a singular matrix can't be inverted, and verify worked examples before including them in assignments." },
            { icon: "🎮", title: "Game & Graphics Developers", desc: "Verify 3D rotation, translation, and projection matrices. Confirm that transformation matrices are orthogonal, check that composed transforms produce the expected result, and debug rendering pipeline issues." },
            { icon: "📊", title: "Operations Research Students", desc: "Solve linear programming basis matrices, compute tableau inverses for the simplex method, and verify transition matrices for Markov chain problems in probability and statistics courses." },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="bg-gray-50 border border-gray-100 rounded-lg p-5">
              <div className="text-2xl mb-2">{icon}</div>
              <h3 className="font-semibold text-gray-800 mb-1">{title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
