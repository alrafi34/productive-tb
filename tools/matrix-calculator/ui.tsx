"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  performOperation,
  matrixToCSV,
  parseMatrix,
  debounce,
  saveToHistory,
  getHistory,
  clearHistory,
  exportAsCSV,
  EXAMPLE_MATRICES,
  MatrixOperation,
  MatrixResult,
  CalculationHistory
} from "./logic";
import MatrixCalculatorSEOContent from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

export default function MatrixCalculatorUI() {
  const [matrixA, setMatrixA] = useState<number[][]>([[1, 2], [3, 4]]);
  const [matrixB, setMatrixB] = useState<number[][]>([[5, 6], [7, 8]]);
  const [operation, setOperation] = useState<MatrixOperation>('add');
  const [result, setResult] = useState<MatrixResult | null>(null);
  const [history, setHistory] = useState<CalculationHistory[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'matrixA' | 'matrixB'>('matrixA');

  // Load history on mount
  useEffect(() => {
    setHistory(getHistory());
    performCalculation(matrixA, matrixB, operation);
  }, []);

  // Perform calculation
  const performCalculation = useCallback((a: number[][], b: number[][], op: MatrixOperation) => {
    const calcResult = performOperation(op, a, b);
    setResult(calcResult);
    
    if (calcResult.success) {
      saveToHistory(op, a, calcResult, b);
      setHistory(getHistory());
    }
  }, []);

  // Debounced calculation
  const debouncedCalculate = useCallback(
    debounce((a: number[][], b: number[][], op: MatrixOperation) => {
      performCalculation(a, b, op);
    }, 300),
    [performCalculation]
  );

  // Handle matrix cell change
  const handleCellChange = (matrix: number[][], row: number, col: number, value: string) => {
    const newMatrix = matrix.map(r => [...r]);
    const num = parseFloat(value) || 0;
    newMatrix[row][col] = num;
    
    if (matrix === matrixA) {
      setMatrixA(newMatrix);
      debouncedCalculate(newMatrix, matrixB, operation);
    } else {
      setMatrixB(newMatrix);
      debouncedCalculate(matrixA, newMatrix, operation);
    }
  };

  // Add row
  const addRow = (matrix: number[][], isMatrixA: boolean) => {
    const cols = matrix[0]?.length || 2;
    const newMatrix = [...matrix, Array(cols).fill(0)];
    if (isMatrixA) {
      setMatrixA(newMatrix);
      debouncedCalculate(newMatrix, matrixB, operation);
    } else {
      setMatrixB(newMatrix);
      debouncedCalculate(matrixA, newMatrix, operation);
    }
  };

  // Remove row
  const removeRow = (matrix: number[][], row: number, isMatrixA: boolean) => {
    if (matrix.length <= 1) return;
    const newMatrix = matrix.filter((_, i) => i !== row);
    if (isMatrixA) {
      setMatrixA(newMatrix);
      debouncedCalculate(newMatrix, matrixB, operation);
    } else {
      setMatrixB(newMatrix);
      debouncedCalculate(matrixA, newMatrix, operation);
    }
  };

  // Add column
  const addColumn = (matrix: number[][], isMatrixA: boolean) => {
    const newMatrix = matrix.map(row => [...row, 0]);
    if (isMatrixA) {
      setMatrixA(newMatrix);
      debouncedCalculate(newMatrix, matrixB, operation);
    } else {
      setMatrixB(newMatrix);
      debouncedCalculate(matrixA, newMatrix, operation);
    }
  };

  // Remove column
  const removeColumn = (matrix: number[][], col: number, isMatrixA: boolean) => {
    if (matrix[0]?.length <= 1) return;
    const newMatrix = matrix.map(row => row.filter((_, j) => j !== col));
    if (isMatrixA) {
      setMatrixA(newMatrix);
      debouncedCalculate(newMatrix, matrixB, operation);
    } else {
      setMatrixB(newMatrix);
      debouncedCalculate(matrixA, newMatrix, operation);
    }
  };

  // Load example
  const loadExample = (key: keyof typeof EXAMPLE_MATRICES, isMatrixA: boolean) => {
    const matrix = EXAMPLE_MATRICES[key];
    if (isMatrixA) {
      setMatrixA(matrix);
      debouncedCalculate(matrix, matrixB, operation);
    } else {
      setMatrixB(matrix);
      debouncedCalculate(matrixA, matrix, operation);
    }
  };

  // Handle operation change
  const handleOperationChange = (op: MatrixOperation) => {
    setOperation(op);
    performCalculation(matrixA, matrixB, op);
  };

  // Copy to clipboard
  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  // Load from history
  const loadFromHistory = (item: CalculationHistory) => {
    setMatrixA(item.matrixA);
    if (item.matrixB) setMatrixB(item.matrixB);
    setOperation(item.operation);
    performCalculation(item.matrixA, item.matrixB || item.matrixA, item.operation);
    setShowHistory(false);
  };

  const needsSecondMatrix = ['add', 'subtract', 'multiply'].includes(operation);
  const resultMatrix = result?.result;
  const resultScalar = result?.scalar;

  return (
    <>
      <div className="max-w-7xl mx-auto">
        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🔢</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Matrix Calculator</h3>
              <p className="text-sm text-blue-800">
                Perform matrix operations including addition, multiplication, inversion, determinant, and transpose. All calculations happen locally in your browser.
              </p>
            </div>
          </div>
        </div>

        {/* Operation Selection */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            Select Operation
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            {(['add', 'subtract', 'multiply', 'determinant', 'inverse', 'transpose'] as MatrixOperation[]).map((op) => (
              <button
                key={op}
                onClick={() => handleOperationChange(op)}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  operation === op
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                {op.charAt(0).toUpperCase() + op.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Matrix Input Panels */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Matrix A */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              Matrix A ({matrixA.length}x{matrixA[0]?.length || 0})
            </h2>

            {/* Matrix Input Table */}
            <div className="overflow-x-auto mb-4">
              <table className="w-full border-collapse">
                <tbody>
                  {matrixA.map((row, i) => (
                    <tr key={i}>
                      {row.map((val, j) => (
                        <td key={`${i}-${j}`} className="p-1">
                          <input
                            type="number"
                            value={val}
                            onChange={(e) => handleCellChange(matrixA, i, j, e.target.value)}
                            className="w-16 px-2 py-1 border border-gray-300 rounded text-sm text-center focus:outline-none focus:border-primary"
                            step="0.1"
                          />
                        </td>
                      ))}
                      <td className="p-1">
                        <button
                          onClick={() => removeRow(matrixA, i, true)}
                          disabled={matrixA.length <= 1}
                          className="px-2 py-1 bg-red-100 hover:bg-red-200 disabled:opacity-40 text-red-700 rounded text-xs font-semibold transition-colors"
                        >
                          ✕
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Matrix Controls */}
            <div className="flex flex-wrap gap-2 mb-4">
              <button
                onClick={() => addRow(matrixA, true)}
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold transition-colors"
              >
                + Row
              </button>
              <button
                onClick={() => addColumn(matrixA, true)}
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold transition-colors"
              >
                + Column
              </button>
              <button
                onClick={() => removeColumn(matrixA, matrixA[0].length - 1, true)}
                disabled={matrixA[0]?.length <= 1}
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-40 text-gray-700 rounded-lg text-sm font-semibold transition-colors"
              >
                - Column
              </button>
            </div>

            {/* Example Matrices */}
            <div className="text-sm">
              <label className="block text-gray-600 font-semibold mb-2">Load Example:</label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => loadExample('identity2x2', true)}
                  className="px-2 py-1 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded text-xs font-semibold transition-colors"
                >
                  Identity 2x2
                </button>
                <button
                  onClick={() => loadExample('example2x2', true)}
                  className="px-2 py-1 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded text-xs font-semibold transition-colors"
                >
                  Example 2x2
                </button>
                <button
                  onClick={() => loadExample('example3x3', true)}
                  className="px-2 py-1 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded text-xs font-semibold transition-colors"
                >
                  Example 3x3
                </button>
              </div>
            </div>
          </div>

          {/* Matrix B (if needed) */}
          {needsSecondMatrix && (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                Matrix B ({matrixB.length}x{matrixB[0]?.length || 0})
              </h2>

              {/* Matrix Input Table */}
              <div className="overflow-x-auto mb-4">
                <table className="w-full border-collapse">
                  <tbody>
                    {matrixB.map((row, i) => (
                      <tr key={i}>
                        {row.map((val, j) => (
                          <td key={`${i}-${j}`} className="p-1">
                            <input
                              type="number"
                              value={val}
                              onChange={(e) => handleCellChange(matrixB, i, j, e.target.value)}
                              className="w-16 px-2 py-1 border border-gray-300 rounded text-sm text-center focus:outline-none focus:border-primary"
                              step="0.1"
                            />
                          </td>
                        ))}
                        <td className="p-1">
                          <button
                            onClick={() => removeRow(matrixB, i, false)}
                            disabled={matrixB.length <= 1}
                            className="px-2 py-1 bg-red-100 hover:bg-red-200 disabled:opacity-40 text-red-700 rounded text-xs font-semibold transition-colors"
                          >
                            ✕
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Matrix Controls */}
              <div className="flex flex-wrap gap-2 mb-4">
                <button
                  onClick={() => addRow(matrixB, false)}
                  className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold transition-colors"
                >
                  + Row
                </button>
                <button
                  onClick={() => addColumn(matrixB, false)}
                  className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold transition-colors"
                >
                  + Column
                </button>
                <button
                  onClick={() => removeColumn(matrixB, matrixB[0].length - 1, false)}
                  disabled={matrixB[0]?.length <= 1}
                  className="px-3 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-40 text-gray-700 rounded-lg text-sm font-semibold transition-colors"
                >
                  - Column
                </button>
              </div>

              {/* Example Matrices */}
              <div className="text-sm">
                <label className="block text-gray-600 font-semibold mb-2">Load Example:</label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => loadExample('identity2x2', false)}
                    className="px-2 py-1 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded text-xs font-semibold transition-colors"
                  >
                    Identity 2x2
                  </button>
                  <button
                    onClick={() => loadExample('example2x2', false)}
                    className="px-2 py-1 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded text-xs font-semibold transition-colors"
                  >
                    Example 2x2
                  </button>
                  <button
                    onClick={() => loadExample('example3x3', false)}
                    className="px-2 py-1 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded text-xs font-semibold transition-colors"
                  >
                    Example 3x3
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Result Panel */}
        {result && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              Result
            </h2>

            {result.success ? (
              <>
                {resultMatrix ? (
                  <>
                    <div className="overflow-x-auto mb-4">
                      <table className="border-collapse">
                        <tbody>
                          {resultMatrix.map((row, i) => (
                            <tr key={i}>
                              {row.map((val, j) => (
                                <td key={`${i}-${j}`} className="border border-gray-300 px-4 py-2 text-center font-mono text-sm">
                                  {typeof val === 'number' ? (Math.abs(val) < 1e-10 ? 0 : val.toFixed(4)) : val}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => copyToClipboard(matrixToCSV(resultMatrix), 'result')}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                          copiedType === 'result'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                        }`}
                      >
                        {copiedType === 'result' ? '✓ Copied' : '📋 Copy Result'}
                      </button>
                      <button
                        onClick={() => exportAsCSV(resultMatrix, `matrix-${operation}-result`)}
                        className="px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-lg text-sm font-semibold transition-colors"
                      >
                        📥 Download CSV
                      </button>
                    </div>
                  </>
                ) : resultScalar !== undefined ? (
                  <>
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-4">
                      <div className="text-sm text-blue-600 mb-1">Result</div>
                      <div className="text-3xl font-bold text-blue-900 font-mono">
                        {Math.abs(resultScalar) < 1e-10 ? 0 : resultScalar.toFixed(4)}
                      </div>
                    </div>

                    <button
                      onClick={() => copyToClipboard(resultScalar.toString(), 'result')}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                        copiedType === 'result'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                      }`}
                    >
                      {copiedType === 'result' ? '✓ Copied' : '📋 Copy Result'}
                    </button>
                  </>
                ) : null}
              </>
            ) : (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                ❌ {result.error}
              </div>
            )}
          </div>
        )}

        {/* History */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800" style={{ fontFamily: "var(--font-heading)" }}>
              Calculation History (Last 20)
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold transition-colors"
              >
                {showHistory ? 'Hide' : 'Show'}
              </button>
              {history.length > 0 && (
                <button
                  onClick={() => {
                    clearHistory();
                    setHistory([]);
                  }}
                  className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-sm font-semibold transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {showHistory && (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {history.length > 0 ? (
                history.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => loadFromHistory(item)}
                    className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer border border-gray-200"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-primary capitalize">
                        {item.operation}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(item.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      {item.matrixA.length}x{item.matrixA[0]?.length} {item.matrixB ? `+ ${item.matrixB.length}x${item.matrixB[0]?.length}` : ''}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center py-8 text-gray-500">No history yet</p>
              )}
            </div>
          )}
        </div>
      </div>

      <MatrixCalculatorSEOContent />
      <RelatedTools
        currentTool="matrix-calculator"
        tools={["percentage-calculator", "discount-calculator", "aspect-ratio-calculator"]}
      />
    </>
  );
}
