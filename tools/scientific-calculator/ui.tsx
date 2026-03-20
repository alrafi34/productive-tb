"use client";

import { useEffect, useMemo, useState } from "react";
import {
  evaluateExpression,
  formatNumber,
  saveToHistory,
  getHistory,
  clearHistory,
  exportHistoryAsJSON,
  generateRandomNumber,
  factorial,
} from "./logic";
import { AngleMode, CalculationHistory, MemoryState } from "./types";
import ScientificCalculatorSEO from "./seo-content";
import RelatedTools from "@/components/RelatedTools";

const SCIENTIFIC_ROWS = [
  ["sin", "cos", "tan", "log", "ln"],
  ["asin", "acos", "atan", "sqrt", "^"],
  ["π", "e", "x²", "x!", "e^x"],
  ["10^x", "(", ")", ".", "C"],
] as const;

export default function ScientificCalculatorUI() {
  const [display, setDisplay] = useState<string>("0");
  const [expression, setExpression] = useState<string>("");
  const [angleMode, setAngleMode] = useState<AngleMode>("deg");
  const [memory, setMemory] = useState<MemoryState>({ value: 0 });
  const [history, setHistory] = useState<CalculationHistory[]>([]);
  const [showHistory, setShowHistory] = useState<boolean>(true);
  const [copied, setCopied] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const currentExpr = useMemo(() => expression || display || "0", [expression, display]);

  const appendToken = (value: string) => {
    setError("");
    setExpression((prev) => {
      if ((prev === "" || prev === "0") && /^\d$/.test(value)) {
        setDisplay(value);
        return value;
      }

      const next = prev ? `${prev}${value}` : value;
      setDisplay(next);
      return next;
    });
  };

  const appendFunction = (fn: string) => {
    setError("");
    setExpression((prev) => {
      const next = `${prev}${fn}(`;
      setDisplay(next);
      return next;
    });
  };

  const appendOperator = (operator: string) => {
    setError("");
    setExpression((prev) => {
      if (!prev && operator !== "-") return prev;

      const normalized = prev || "0";
      const next = /[+\-×÷^]$/.test(normalized)
        ? `${normalized.slice(0, -1)}${operator}`
        : `${normalized}${operator}`;
      setDisplay(next);
      return next;
    });
  };

  const handleClear = () => {
    setDisplay("0");
    setExpression("");
    setError("");
  };

  const handleBackspace = () => {
    setError("");
    setExpression((prev) => {
      if (!prev || prev.length <= 1) {
        setDisplay("0");
        return "";
      }
      const next = prev.slice(0, -1);
      setDisplay(next);
      return next;
    });
  };

  const evaluateAndSet = (sourceExpr: string, saveHistoryItem = true) => {
    const { result, error: evalError } = evaluateExpression(sourceExpr, angleMode);

    if (evalError) {
      setError(evalError);
      return;
    }

    const formatted = formatNumber(result);
    setDisplay(formatted);
    setExpression(formatted);
    setError("");

    if (saveHistoryItem) {
      saveToHistory(sourceExpr, formatted);
      setHistory(getHistory());
    }
  };

  const handleEquals = () => {
    if (!currentExpr || currentExpr === "0") return;
    evaluateAndSet(currentExpr, true);
  };

  const applyUnaryFunction = (operation: "x2" | "factorial" | "exp" | "tenPow") => {
    const { result, error: evalError } = evaluateExpression(currentExpr, angleMode);

    if (evalError) {
      setError(evalError);
      return;
    }

    let output = 0;
    if (operation === "x2") {
      output = result * result;
    } else if (operation === "factorial") {
      if (!Number.isInteger(result) || result < 0) {
        setError("Factorial requires a non-negative integer");
        return;
      }
      output = factorial(result);
    } else if (operation === "exp") {
      output = Math.exp(result);
    } else {
      output = Math.pow(10, result);
    }

    if (!Number.isFinite(output)) {
      setError("Invalid calculation");
      return;
    }

    const formatted = formatNumber(output);
    setDisplay(formatted);
    setExpression(formatted);
    setError("");
  };

  const handleRandom = () => {
    const randomValue = formatNumber(generateRandomNumber(0, 100));
    setDisplay(randomValue);
    setExpression(randomValue);
    setError("");
  };

  const handleMemoryAdd = () => {
    const { result, error: evalError } = evaluateExpression(currentExpr, angleMode);
    if (evalError) {
      setError(evalError);
      return;
    }
    setMemory((prev) => ({ value: prev.value + result }));
    setError("");
  };

  const handleMemorySubtract = () => {
    const { result, error: evalError } = evaluateExpression(currentExpr, angleMode);
    if (evalError) {
      setError(evalError);
      return;
    }
    setMemory((prev) => ({ value: prev.value - result }));
    setError("");
  };

  const handleMemoryRecall = () => {
    const recalled = formatNumber(memory.value);
    setDisplay(recalled);
    setExpression(recalled);
    setError("");
  };

  const handleMemoryClear = () => {
    setMemory({ value: 0 });
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(""), 1800);
  };

  const loadFromHistory = (item: CalculationHistory) => {
    setExpression(item.expression);
    setDisplay(item.expression);
    setShowHistory(true);
  };

  const handleClearHistory = () => {
    clearHistory();
    setHistory([]);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key >= "0" && e.key <= "9") {
        appendToken(e.key);
        return;
      }

      if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
        appendOperator(e.key === "*" ? "×" : e.key === "/" ? "÷" : e.key);
        return;
      }

      if (e.key === "Enter" || e.key === "=") {
        e.preventDefault();
        handleEquals();
        return;
      }

      if (e.key === "Escape") {
        handleClear();
        return;
      }

      if (e.key === "Backspace") {
        e.preventDefault();
        handleBackspace();
        return;
      }

      if (e.key === "." || e.key === "(" || e.key === ")") {
        appendToken(e.key);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentExpr, angleMode]);

  const baseBtn =
    "rounded-lg font-semibold transition-all active:scale-95 shadow-sm border border-gray-200 bg-white text-gray-800 hover:bg-gray-50";
  const operatorBtn =
    "rounded-lg font-semibold transition-all active:scale-95 shadow-sm bg-orange-500 hover:bg-orange-600 text-white";
  const functionBtn =
    "rounded-lg font-semibold text-sm transition-all active:scale-95 shadow-sm bg-blue-500 hover:bg-blue-600 text-white";

  return (
    <>
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900" style={{ fontFamily: "var(--font-heading)" }}>
                Scientific Calculator
              </h2>
              <p className="text-sm text-gray-600 mt-1" style={{ fontFamily: "var(--font-body)" }}>
                Advanced calculator with trigonometry, logs, exponents, memory, and keyboard support.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setAngleMode(angleMode === "deg" ? "rad" : "deg")}
                className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-all ${
                  angleMode === "deg"
                    ? "bg-primary border-primary text-white"
                    : "bg-white border-gray-200 text-gray-700 hover:border-gray-300"
                }`}
              >
                {angleMode === "deg" ? "DEG" : "RAD"}
              </button>
              <button
                onClick={() => setShowHistory((prev) => !prev)}
                className="px-4 py-2 rounded-lg text-sm font-semibold border bg-white border-gray-200 text-gray-700 hover:border-gray-300"
              >
                {showHistory ? "Hide History" : "Show History"}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            <div className="xl:col-span-8">
              <div className="rounded-2xl border border-gray-100 bg-white p-5">
                <div className="rounded-xl p-5 mb-4 bg-gray-50 min-h-[120px] flex flex-col justify-end">
                  <div className="text-xs text-gray-500 font-mono break-all min-h-[18px]">{expression || " "}</div>
                  <div className="text-4xl font-black text-gray-900 font-mono break-all mt-1">{display}</div>
                  {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
                </div>

                <div className="grid grid-cols-5 gap-2 mb-4">
                  <button onClick={handleMemoryClear} className={`${functionBtn} py-2`}>MC</button>
                  <button onClick={handleMemoryRecall} className={`${functionBtn} py-2`}>MR</button>
                  <button onClick={handleMemoryAdd} className={`${functionBtn} py-2`}>M+</button>
                  <button onClick={handleMemorySubtract} className={`${functionBtn} py-2`}>M-</button>
                  <button onClick={handleRandom} className={`${functionBtn} py-2`}>RND</button>
                </div>

                {SCIENTIFIC_ROWS.map((row, rowIdx) => (
                  <div key={rowIdx} className="grid grid-cols-5 gap-2 mb-2">
                    {row.map((item) => {
                      if (item === "C") {
                        return (
                          <button
                            key={item}
                            onClick={handleClear}
                            className="rounded-lg font-semibold transition-all active:scale-95 shadow-sm bg-red-500 hover:bg-red-600 text-white py-3"
                          >
                            C
                          </button>
                        );
                      }

                      if (item === "x²") {
                        return (
                          <button key={item} onClick={() => applyUnaryFunction("x2")} className={`${functionBtn} py-3`}>
                            x²
                          </button>
                        );
                      }

                      if (item === "x!") {
                        return (
                          <button key={item} onClick={() => applyUnaryFunction("factorial")} className={`${functionBtn} py-3`}>
                            x!
                          </button>
                        );
                      }

                      if (item === "e^x") {
                        return (
                          <button key={item} onClick={() => applyUnaryFunction("exp")} className={`${functionBtn} py-3`}>
                            e^x
                          </button>
                        );
                      }

                      if (item === "10^x") {
                        return (
                          <button key={item} onClick={() => applyUnaryFunction("tenPow")} className={`${functionBtn} py-3`}>
                            10^x
                          </button>
                        );
                      }

                      if (item === "(") {
                        return (
                          <button key={item} onClick={() => appendToken("(")} className={`${baseBtn} py-3`}>
                            (
                          </button>
                        );
                      }

                      if (item === ")") {
                        return (
                          <button key={item} onClick={() => appendToken(")")} className={`${baseBtn} py-3`}>
                            )
                          </button>
                        );
                      }

                      if (item === ".") {
                        return (
                          <button key={item} onClick={() => appendToken(".")} className={`${baseBtn} py-3`}>
                            .
                          </button>
                        );
                      }

                      if (item === "^") {
                        return (
                          <button key={item} onClick={() => appendOperator("^")} className={`${functionBtn} py-3`}>
                            x^y
                          </button>
                        );
                      }

                      if (["sin", "cos", "tan", "log", "ln", "asin", "acos", "atan", "sqrt"].includes(item)) {
                        return (
                          <button key={item} onClick={() => appendFunction(item)} className={`${functionBtn} py-3`}>
                            {item === "sqrt" ? "√" : item}
                          </button>
                        );
                      }

                      return (
                        <button key={item} onClick={() => appendToken(item)} className={`${functionBtn} py-3`}>
                          {item}
                        </button>
                      );
                    })}
                  </div>
                ))}

                <div className="grid grid-cols-4 gap-2 mt-4">
                  <button onClick={handleBackspace} className={`${operatorBtn} py-4`}>⌫</button>
                  <button onClick={() => appendOperator("÷")} className={`${operatorBtn} py-4`}>÷</button>
                  <button onClick={() => appendOperator("×")} className={`${operatorBtn} py-4`}>×</button>
                  <button onClick={() => appendOperator("-")} className={`${operatorBtn} py-4`}>-</button>

                  {["7", "8", "9"].map((num) => (
                    <button key={num} onClick={() => appendToken(num)} className={`${baseBtn} py-4 text-lg`}>
                      {num}
                    </button>
                  ))}
                  <button onClick={() => appendOperator("+")} className={`${operatorBtn} py-4`}>+</button>

                  {["4", "5", "6"].map((num) => (
                    <button key={num} onClick={() => appendToken(num)} className={`${baseBtn} py-4 text-lg`}>
                      {num}
                    </button>
                  ))}
                  <button onClick={handleEquals} className="row-span-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-bold text-xl transition-all active:scale-95 shadow-sm">
                    =
                  </button>

                  {["1", "2", "3"].map((num) => (
                    <button key={num} onClick={() => appendToken(num)} className={`${baseBtn} py-4 text-lg`}>
                      {num}
                    </button>
                  ))}

                  <button onClick={() => appendToken("0")} className={`${baseBtn} py-4 text-lg col-span-2`}>
                    0
                  </button>
                  <button onClick={() => appendToken(".")} className={`${baseBtn} py-4 text-lg`}>
                    .
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
                  <button
                    onClick={() => copyToClipboard(display, "result")}
                    className={`py-3 rounded-lg font-semibold transition-all ${
                      copied === "result"
                        ? "bg-emerald-600 text-white"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                    }`}
                  >
                    {copied === "result" ? "Copied" : "Copy Result"}
                  </button>
                  <button
                    onClick={() => copyToClipboard(currentExpr, "expr")}
                    className={`py-3 rounded-lg font-semibold transition-all ${
                      copied === "expr"
                        ? "bg-emerald-600 text-white"
                        : "bg-blue-50 border border-blue-100 text-blue-700 hover:bg-blue-100"
                    }`}
                  >
                    {copied === "expr" ? "Copied" : "Copy Expression"}
                  </button>
                </div>
              </div>
            </div>

            <div className="xl:col-span-4 flex flex-col gap-4">
              <div className="rounded-xl border border-gray-100 p-4 bg-gray-50">
                <p className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-1">Memory Value</p>
                <p className="text-2xl font-black text-gray-900 font-mono">{formatNumber(memory.value)}</p>
              </div>

              <div className="rounded-xl border border-gray-100 p-4 bg-white">
                <p className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-2">Quick Reference</p>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>π = 3.1415926535</p>
                  <p>e = 2.7182818284</p>
                  <p>Mode: {angleMode === "deg" ? "Degrees" : "Radians"}</p>
                  <p>Power operator: <code>^</code></p>
                </div>
              </div>

              {showHistory && (
                <div className="rounded-xl border border-gray-100 overflow-hidden bg-white">
                  <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-800">History</p>
                    <div className="flex gap-2">
                      {history.length > 0 && (
                        <>
                          <button
                            onClick={() => exportHistoryAsJSON(history)}
                            className="text-xs px-2.5 py-1 rounded bg-blue-100 text-blue-700 font-semibold hover:bg-blue-200"
                          >
                            Export
                          </button>
                          <button
                            onClick={handleClearHistory}
                            className="text-xs px-2.5 py-1 rounded bg-red-100 text-red-700 font-semibold hover:bg-red-200"
                          >
                            Clear
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {history.length > 0 ? (
                    <div className="divide-y divide-gray-100 max-h-80 overflow-y-auto">
                      {history.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => loadFromHistory(item)}
                          className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors"
                        >
                          <p className="text-xs text-gray-500 font-mono break-all">{item.expression}</p>
                          <p className="text-sm font-semibold text-gray-900 font-mono mt-1">= {item.result}</p>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="px-4 py-8 text-sm text-gray-500">No history yet.</div>
                  )}
                </div>
              )}

              <div className="rounded-xl border border-blue-200 p-4 bg-blue-50">
                <p className="text-sm font-semibold text-blue-900">Keyboard Shortcuts</p>
                <p className="text-xs text-blue-800 mt-1">
                  Use `0-9`, `+`, `-`, `*`, `/`, `(`, `)`, `.`, `Enter`, `Esc`, and `Backspace`.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ScientificCalculatorSEO />

      <RelatedTools
        currentTool="scientific-calculator"
        tools={["percentage-calculator", "matrix-calculator", "average-calculator"]}
      />
    </>
  );
}
