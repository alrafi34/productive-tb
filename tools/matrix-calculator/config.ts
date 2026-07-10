import { siteConfig } from "@/config/site";

export const matrixCalculatorConfig = {
  slug: "matrix-calculator",
  name: "Matrix Calculator",
  description: "Perform matrix operations including addition, subtraction, multiplication, determinant, inverse, and transpose. Supports matrices up to 20×20 with CSV export and calculation history.",
  category: "math",
  icon: "🔢",
  free: true,
  backend: false,
  relatedTools: [
    "combinatorics-calculator",
    "scientific-calculator",
    "percentage-calculator",
    "dataset-split-calculator",
    "confusion-matrix-calculator",
  ],
  seo: {
    title: "Matrix Calculator — Free Online Matrix Operations Tool | Productive Toolbox",
    description: "Calculate matrix addition, multiplication, determinant, inverse, and transpose instantly. Free online matrix calculator with CSV export. Browser-based, no signup.",
    keywords: [
      "matrix calculator",
      "online matrix calculator",
      "matrices calculator",
      "matrix operations calculator",
      "matrix solver",
      "matrix calc",
      "matrix multiplication calculator",
      "matrix determinant calculator",
      "matrix inverse calculator",
      "matrix transpose calculator",
      "linear algebra calculator",
      "matrix addition calculator",
      "matrix subtraction calculator",
      "free matrix calculator",
      "matrix calculator online",
      "3x3 matrix calculator",
      "2x2 matrix calculator",
      "matrix inversion calculator",
      "solve matrix equations",
      "matrix math calculator",
      "gauss jordan calculator",
      "determinant calculator",
      "inverse matrix online",
    ],
    openGraph: {
      title: "Matrix Calculator — Free Online Matrix Operations Tool",
      description: "Calculate matrix addition, multiplication, determinant, inverse, and transpose instantly. Browser-based, free, no signup.",
      type: "website",
      url: `${siteConfig.url}/tools/math/matrix-calculator`,
    },
    og: {
      title: "Matrix Calculator — Free Online Matrix Operations Tool",
      description: "Calculate matrix addition, multiplication, determinant, inverse, and transpose instantly. Browser-based, free, no signup.",
      url: `${siteConfig.url}/tools/math/matrix-calculator`,
    },
    howToSteps: [
      {
        name: "Select an Operation",
        text: "Choose from the six operation tabs: Addition, Subtraction, Multiplication, Determinant, Inverse, or Transpose. The input panel updates to show whether one or two matrices are required for the selected operation.",
      },
      {
        name: "Enter Matrix A",
        text: "Click into each cell and type a numeric value. Use the + buttons to add rows or columns and the × buttons to remove them. Click Load Example to populate a pre-built matrix. Values update the result in real time as you type.",
      },
      {
        name: "Enter Matrix B (if required)",
        text: "For addition, subtraction, and multiplication, fill in Matrix B. A dimension hint appears below each matrix showing whether the current dimensions are compatible with the selected operation.",
      },
      {
        name: "Read the Result",
        text: "The result appears instantly in the output panel as a formatted matrix. For determinant, a scalar is returned. Results are rounded to 4 decimal places.",
      },
      {
        name: "Copy or Export",
        text: "Click Copy to copy the result as CSV for pasting into Excel or Google Sheets. Click Download CSV to save the file. The calculation is saved automatically to the history panel — click any entry to reload it.",
      },
    ],
    faq: [
      {
        q: "What is a matrix calculator?",
        a: "A matrix calculator is a free online tool that performs standard linear algebra operations on matrices including addition, subtraction, multiplication, determinant, inverse, and transpose without requiring any software installation. It is used by students checking homework, engineers verifying system analysis, data scientists debugging code, and teachers demonstrating operations in class.",
      },
      {
        q: "How is matrix multiplication calculated?",
        a: "Each element C[i][j] of the result is the dot product of row i of Matrix A and column j of Matrix B. For A sized m by n and B sized n by p, the result has dimensions m by p. The number of columns in A must equal the number of rows in B. The calculator validates this before computing.",
      },
      {
        q: "What is a matrix determinant and when do I need it?",
        a: "The determinant is a scalar value computed from a square matrix. For a 2x2 matrix with values a, b, c, d, the determinant equals a times d minus b times c. It tells you whether a matrix is invertible (non-zero determinant) or singular (zero determinant). It also appears in solving linear systems via Cramer's rule.",
      },
      {
        q: "What does matrix inversion do and when can it fail?",
        a: "Matrix inversion finds A inverse such that A times A inverse equals the identity matrix. It requires a square matrix with a non-zero determinant. If the determinant is zero, the matrix is singular and has no inverse, meaning the corresponding system of equations has no unique solution. The calculator uses Gauss-Jordan elimination and returns an error for singular matrices.",
      },
      {
        q: "What is the difference between a matrix calculator and a matrices calculator?",
        a: "There is no functional difference. Matrices is simply the plural of matrix. Both terms refer to the same type of tool that performs operations on one or more matrices. This tool covers all standard operations in a single interface.",
      },
      {
        q: "Can I use this as a matrix solver for systems of equations?",
        a: "Yes. To solve Ax equals b, first compute A inverse using Inverse mode, then multiply A inverse by b using Multiplication mode. The result vector x is the solution to the system. This works as long as A is square and invertible.",
      },
      {
        q: "What is the maximum matrix size supported?",
        a: "The calculator supports matrices up to 20 by 20. All processing happens client-side in your browser so no network time is involved. For most homework and engineering use cases matrices are 3 by 3 to 6 by 6.",
      },
      {
        q: "How accurate are the results?",
        a: "All calculations use full JavaScript floating-point precision (64-bit IEEE 754). Results display to 4 decimal places. Very small non-zero values in inverse or multiplication results are floating-point rounding artifacts and can be treated as zero in most practical contexts.",
      },
      {
        q: "Can I perform multiple operations in sequence?",
        a: "Yes. The history panel saves your last 20 calculations. After computing an inverse, click that history entry to reload the result as Matrix A, then enter another matrix and multiply. This lets you chain operations without re-entering any values.",
      },
      {
        q: "Is my data private when using this calculator?",
        a: "Yes. All matrix operations run entirely in your browser using JavaScript. Your matrix values are never transmitted to any server, stored in any database, or accessible to anyone other than you. Calculation history is stored only in your browser's localStorage.",
      },
    ],
  },
};
